import path from "node:path";
import { fileURLToPath } from "node:url";
import { routeTask, routingContext, routingProtocol, referenceReadPlan } from "../routing.mjs";
import { nativeKitEdits, observeKitEdit } from "../kit-monitor.mjs";

export const TARGET_VERSION = "2026.7.1-2";
const pluginRoot = fileURLToPath(new URL("../../", import.meta.url));

export default {
  id: "verikit",
  name: "VeriKit",
  description: "HarmonyOS Kit selection and task-relevant reference routing",
  register(api) {
    // This host intentionally has no runtime during metadata-only CLI discovery.
    if (api.registrationMode === "cli-metadata") return;
    if (api.runtime?.version !== TARGET_VERSION) {
      throw new Error(`VeriKit requires OpenClaw ${TARGET_VERSION}; found ${api.runtime?.version ?? "unknown"}.`);
    }
    if (api.pluginConfig?.enabled === false) return;

    api.on("before_prompt_build", async (event, ctx) => {
      // Newer harnesses can expose the current request explicitly. Empty text
      // is intentional (e.g. an image-only turn), and must not fall back to history.
      const prompt = typeof event.currentUserMessage === "string" ? event.currentUserMessage : event.prompt;
      if (typeof prompt !== "string" || !prompt.trim()) return;
      try {
        const result = await routeTask(pluginRoot, prompt);
        const context = routingContext(result, pluginRoot);
        ctx?.hookInvocation?.assertActive();
        if (context) return { prependContext: context, appendSystemContext: routingProtocol(pluginRoot, result) };
      } catch { /* Preserve native execution when routing fails or times out. */ }
    }, { timeoutMs: 20000 });

    api.on("before_tool_call", async (event, ctx) => {
      if (api.pluginConfig?.monitorEdits === false) return;
      const edits = nativeKitEdits(event);
      if (!edits.length) return;
      try {
        const sessions = api.runtime.agent?.session;
        if (!sessions || !ctx.sessionKey) return;
        const config = api.runtime.config?.current?.() ?? api.config;
        const agentId = ctx.agentId ?? "main";
        const storePath = sessions.resolveStorePath(config?.session?.store, { agentId });
        const entry = await sessions.getSessionEntry({ sessionKey: ctx.sessionKey, agentId, storePath, readConsistency: "latest" });
        if (!entry?.sessionId || ctx.sessionId && ctx.sessionId !== entry.sessionId) return;
        const transcript = sessions.resolveSessionFilePath(entry.sessionId, entry, { agentId, sessionsDir: path.dirname(storePath) });
        for (const input of edits) {
          input.cwd = entry.spawnedCwd || entry.spawnedWorkspaceDir || api.runtime.agent?.resolveAgentWorkspaceDir?.(config, agentId);
          input.transcript_path = transcript;
          await observeKitEdit(input, { pluginRoot });
        }
      } catch { /* Log-only monitor: never rewrite or block a native tool call. */ }
    }, { timeoutMs: 1000 });

    api.registerTool({
      name: "verikit_route",
      label: "VeriKit",
      description: "Rank HarmonyOS Kits, match composition recipes, and find reference docs for a task. Read the returned SKILL.md and reference paths with the native read tool before coding.",
      parameters: { type: "object", additionalProperties: false, required: ["task"], properties: {
        task: { type: "string", minLength: 1, description: "HarmonyOS development task (up to 4000 Unicode code points)." },
      } },
      async execute(_id, args) {
        try {
          const result = await routeTask(pluginRoot, args?.task);
          return { content: [{ type: "text", text: JSON.stringify({
            ...result, catalog_root: path.join(pluginRoot, "skills"), read_plan: referenceReadPlan(result, pluginRoot),
          }) }] };
        } catch (error) {
          return { isError: true, content: [{ type: "text", text: `VeriKit routing failed: ${error.code ?? error.message}` }] };
        }
      },
    }, { optional: true });
  },
};

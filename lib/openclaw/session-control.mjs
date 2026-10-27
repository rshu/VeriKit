import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";

export function createSessionControl(api) {
  const pending = new Map();

  // Serialize initialization, commands and compaction for the same session.
  function withSession(target, action) {
    const key = JSON.stringify([target.sessionKey, target.sessionId]);
    const operation = (pending.get(key) ?? Promise.resolve()).catch(() => {}).then(action);
    pending.set(key, operation);
    return operation.finally(() => { if (pending.get(key) === operation) pending.delete(key); });
  }

  function settings() {
    const config = api.runtime.config?.current?.() ?? api.config;
    const entry = config?.plugins?.entries?.verikit;
    const options = entry?.config ?? api.pluginConfig ?? {};
    return {
      enabled: config?.plugins?.enabled !== false && entry?.enabled !== false && options.enabled !== false,
      defaultSession: options.defaultSession === true,
    };
  }

  async function identity(ctx) {
    const sessionKey = ctx?.sessionKey;
    if (typeof sessionKey !== "string" || !sessionKey.trim()) return;
    let sessionId = ctx.sessionId;
    if (!sessionId) {
      const sessions = api.runtime.agent?.session;
      if (!sessions) return;
      const config = api.runtime.config?.current?.() ?? api.config;
      const agentId = ctx.agentId ?? sessionKey.match(/^agent:([^:]+):/)?.[1] ?? "main";
      const storePath = sessions.resolveStorePath(config?.session?.store, { agentId });
      sessionId = (await sessions.getSessionEntry({ sessionKey, agentId, storePath, readConsistency: "latest" }))?.sessionId;
    }
    if (typeof sessionId === "string" && sessionId.trim()) return { sessionKey, sessionId };
  }

  function stateFile(target) {
    const stateDir = api.runtime.state?.resolveStateDir();
    if (typeof stateDir !== "string" || !path.isAbsolute(stateDir)) throw new Error("OpenClaw state directory is unavailable.");
    // Hash both identities: /new can reuse the key while rotating the session ID.
    const key = createHash("sha256").update(JSON.stringify([target.sessionKey, target.sessionId])).digest("hex");
    return path.join(stateDir, "verikit", "sessions", `${key}.json`);
  }

  async function read(target) {
    let raw;
    try { raw = await fs.readFile(stateFile(target), "utf8"); }
    catch (error) { if (error.code === "ENOENT") return; throw error; }
    const record = JSON.parse(raw);
    if (record?.version !== 1 || record.sessionKey !== target.sessionKey || record.sessionId !== target.sessionId
      || typeof record.enabled !== "boolean" || record.source !== undefined && !["default", "session"].includes(record.source)) {
      throw new Error("Invalid VeriKit session state.");
    }
    // Records written before initial defaults were persisted are explicit switches.
    return { enabled: record.enabled, source: record.source ?? "session" };
  }

  async function write(target, enabled, { ifAbsent = false, source = "session" } = {}) {
    const file = stateFile(target);
    if (enabled === undefined) {
      await fs.rm(file, { force: true });
      return;
    }
    await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
    const temporary = `${file}.${randomUUID()}.tmp`;
    try {
      await fs.writeFile(temporary, JSON.stringify({ version: 1, ...target, enabled, source }) + "\n", { mode: 0o600, flag: "wx" });
      if (ifAbsent) {
        // Publish a complete record without replacing a newer explicit command.
        try { await fs.link(temporary, file); }
        catch (error) { if (error.code !== "EEXIST") throw error; }
      } else await fs.rename(temporary, file);
    } finally {
      await fs.rm(temporary, { force: true });
    }
  }

  async function initialize(target, defaultSession) {
    const saved = await read(target);
    if (saved) return saved;
    await write(target, defaultSession, { ifAbsent: true, source: "default" });
    return read(target);
  }

  async function status(ctx) {
    const config = settings();
    const target = await identity(ctx);
    if (!target) return { enabled: false, source: "unavailable", defaultSession: config.defaultSession };
    const saved = await withSession(target, () => initialize(target, config.defaultSession));
    return {
      enabled: config.enabled && saved.enabled,
      source: config.enabled ? saved.source : "global",
      defaultSession: config.defaultSession,
    };
  }

  function describe(value) {
    const source = { global: "全局禁用", session: "当前会话设置", default: "会话初始默认值", unavailable: "无法识别当前会话" }[value.source];
    return `VeriKit：${value.enabled ? "开启（可用" : "关闭（不可用"}；来源：${source}；defaultSession=${value.defaultSession}）。`;
  }

  return {
    status,
    async start(event, ctx) {
      const config = settings();
      const target = await identity({ ...ctx, sessionKey: ctx?.sessionKey ?? event.sessionKey, sessionId: ctx?.sessionId ?? event.sessionId });
      if (target) await withSession(target, () => initialize(target, config.defaultSession));
    },
    async command(ctx) {
      const action = ctx.args?.trim().toLowerCase() || "status";
      if (!["on", "off", "status"].includes(action)) return { text: "用法：/verikit-session on | off | status" };
      try {
        if (!settings().enabled) return { text: describe(await status(ctx)) };
        const target = await identity(ctx);
        if (!target) return { text: "VeriKit 不可用：无法识别当前会话，未更改设置。请在已创建的 OpenClaw 会话中使用 /verikit-session。" };
        if (action === "status") return { text: describe(await status(target)) };
        await withSession(target, () => write(target, action === "on"));
        return { text: describe(await status(target)) };
      } catch (error) {
        return { text: `VeriKit 会话设置读取或保存失败：${error.message}` };
      }
    },
    async reset(ctx) {
      // Never resolve a missing old ID to a newly created session during reset.
      if (ctx?.sessionKey && ctx?.sessionId) {
        const target = { sessionKey: ctx.sessionKey, sessionId: ctx.sessionId };
        await withSession(target, () => write(target, undefined));
      }
    },
    async afterCompaction(event, ctx) {
      const previousSessionId = event.previousSessionId;
      if (!ctx?.sessionKey || !ctx?.sessionId || !previousSessionId || previousSessionId === ctx.sessionId) return;
      const previous = { sessionKey: ctx.sessionKey, sessionId: previousSessionId };
      const saved = await withSession(previous, () => read(previous));
      if (!saved) return;
      const target = { sessionKey: ctx.sessionKey, sessionId: ctx.sessionId };
      await withSession(target, async () => {
        const current = await read(target);
        if (current?.source === "session") return;
        await write(target, saved.enabled, { source: saved.source });
      });
    },
  };
}

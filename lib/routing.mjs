import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { readFileSync, existsSync } from "node:fs";

const execute = promisify(execFile);
export const ROUTE_TIMEOUT_MS = 15000;

// The curated recipe itself identifies async/await as ArkTS's role. Lexical
// search on a long implementation request can instead rank an XML/timer FAQ.
// Add a task guide without changing the ranker's scores or approved Kit list.
const RECIPE_REFERENCE_GUIDES = {
  "local-persistence": {
    arkts: [{ path: "references/异步并发 (Promise和async_await).md", reason: "The local-persistence recipe uses ArkTS Promise/async/await around asynchronous storage and flushing." }],
  },
};

function skillReadSteps(file) {
  try {
    const lines = readFileSync(file, "utf8").match(/[^\n]*\n|[^\n]+$/g) ?? [];
    const steps = [];
    let offset = 1, count = 0, bytes = 0;
    for (const line of lines) {
      const size = Buffer.byteLength(line);
      if (count && (count >= 100 || bytes + size > 32 * 1024)) {
        steps.push({ path: file, offset, limit: count });
        offset += count; count = 0; bytes = 0;
      }
      count++; bytes += size;
    }
    if (count) steps.push({ path: file, offset, limit: count });
    return steps.length ? steps : [{ path: file }];
  } catch { return [{ path: file }]; }
}

// These are navigation aids for candidates, never an inferred user selection.
// Keep a row even when deep search has no hits: the SKILL index is the fallback.
export function referenceReadPlan(result, pluginRoot) {
  // Long requests can crowd the explicitly named recipe out of the top three
  // matches. A name still supplies navigation; it never supplies user approval.
  const namedRecipes = typeof result?.task === "string" ? result.task.toLowerCase().match(/[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? [] : [];
  const recipeIds = new Set([...(result?.compositions ?? []).map(recipe => recipe.id), ...namedRecipes.filter(id => Object.hasOwn(RECIPE_REFERENCE_GUIDES, id))]);
  const kits = new Set([
    ...(result?.top ?? []).filter(kit => !kit.disqualified).map(kit => kit.name),
    ...(result?.bundle ?? []), ...Object.keys(result?.deep_references ?? {}),
  ]);
  return [...kits].filter(kit => typeof kit === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(kit)).map(kit => {
    const hints = [...recipeIds].flatMap(id => RECIPE_REFERENCE_GUIDES[id]?.[kit] ?? [])
      .map(hint => ({ ...hint, path: path.join(pluginRoot, "skills", kit, hint.path) })).filter(hint => existsSync(hint.path));
    const ranked = (result?.deep_references?.[kit] ?? []).filter(ref =>
      typeof ref.path === "string" && /^references\/.+\.md$/.test(ref.path) &&
      !ref.path.includes("\\") && !ref.path.split("/").some(part => part === ".." || part === ".")
    ).map(ref => path.join(pluginRoot, "skills", kit, ref.path));
    return {
      kit,
      skill: path.join(pluginRoot, "skills", kit, "SKILL.md"),
      skill_reads: skillReadSteps(path.join(pluginRoot, "skills", kit, "SKILL.md")),
      task_reference_hints: hints,
      reference_candidates: [...new Set([...hints.map(hint => hint.path), ...ranked])].slice(0, 2),
    };
  });
}

export function routingProtocol(pluginRoot, result) {
  return [
    "<verikit-protocol>",
    "Apply this workflow when the current turn contains <verikit-routing>.",
    "For a new task without an explicit user-approved Kit selection, your entire reply must present Kit options and ask the user to choose, then STOP and wait for their next message.",
    "Do not create files, write or edit code, or call apply_patch before that choice. A ranker score, recipe recommendation, or Kit name in reference material is NOT user approval.",
    "Show top ranked Kits, matched recipe bundles, and an option to specify other Kits. For conflicts follow routing.directive; never silently substitute Kits.",
    "If the user has already selected Kit(s) for this task, honor that choice and proceed without asking again.",
    "Before implementing, successfully read every selected Kit's SKILL.md and at least one task-relevant reference document for each selected Kit that has references.",
    "Maintain a separate read checklist for EACH user-selected Kit: (1) SKILL.md read successfully; (2) a task-relevant references/*.md read successfully. Complete BOTH checks for EVERY selected Kit before the first write, edit, apply_patch, or other code-producing call.",
    "A SKILL.md, reference title/path, routing result, or another Kit's reference does not satisfy check (2). Supporting and language Kits need their own reference reads too. Wait for successful read results before submitting code tools; do not batch pending reads with writes. Failed reads do not count.",
    `Catalog root: ${JSON.stringify(path.join(pluginRoot, "skills"))}.`,
    "Resolve SKILL.md as <catalog root>/<kit>/SKILL.md and deep_references paths relative to that Kit's directory. If the selection has no returned references, use its SKILL.md reference index.",
    "The read plan below lists candidate paths, NOT approved Kits or completed reads. Apply only the user's selection; never add a Kit just because it has a row. Choose references relevant to the implementation from the candidates or the SKILL.md index; the first search hit is not automatically relevant. For a selected Kit missing from the plan, use its SKILL.md index.",
    "Prefer task_reference_hints when their recipe fits the user's feature: their reasons identify the Kit's role in that feature. A high-scoring FAQ about an unrelated API does not satisfy task relevance. Hints are navigation only, not a change to ranking or user selection.",
    "For each selected Kit, execute ALL its skill_reads ranges with the native read tool (adapt argument names to that host). These small, contiguous ranges cover SKILL.md without the host's usual 50KB truncation.",
    "Then read at least ONE chosen task-relevant reference TO THE END for EACH selected Kit. Start that reference read without an artificial line limit; if the host caps it, continue at the returned offset until EOF. A preview of its first 60 lines or its introductory section does NOT complete the reference checklist. Prefer a concise relevant reference. Do not read every candidate or exhaust unrelated reference documents. After the selected Kits' checklist is complete, implement the task.",
    ...(result ? ["<verikit-read-plan>", JSON.stringify(referenceReadPlan(result, pluginRoot)), "</verikit-read-plan>"] : []),
    "Use the host's native file-reading tool; no Claude-specific Skill tool is required. Failed reads do not count as reading the documentation.",
    "</verikit-protocol>",
  ].join("\n");
}

// Keep the shipped, self-contained ranker authoritative for every host.
export async function routeTask(pluginRoot, task, { timeoutMs = ROUTE_TIMEOUT_MS } = {}) {
  if (typeof task !== "string" || !task.trim()) throw new Error("task must be a non-empty string.");
  const prompt = Array.from(task).slice(0, 4000).join("");
  // Host adapters must rank the same catalog that their read plan points at.
  // Keep the standalone CLI's override support, but do not inherit a different
  // project's discovery/sidecar paths into an installed plugin invocation.
  const env = { ...process.env,
    VERIKIT_SKILL_ROOT: pluginRoot,
    VERIKIT_CONTRACTS_DIR: path.join(pluginRoot, "dist/contracts"),
    VERIKIT_MANIFESTS_DIR: path.join(pluginRoot, "dist/manifests"),
    VERIKIT_COMPOSITIONS_FILE: path.join(pluginRoot, "dist/compositions/recipes.json"),
  };
  const { stdout } = await execute(process.execPath, [
    path.join(pluginRoot, "dist", "verikit-cli.js"), "route", "--task", prompt,
    "--top", "5", "--compose", "--deep", "--refs", "5",
  ], { cwd: pluginRoot, env, timeout: timeoutMs, killSignal: "SIGKILL", maxBuffer: 4 * 1024 * 1024, windowsHide: true });
  const result = JSON.parse(stdout);
  if (!Array.isArray(result.top) || typeof result.routing?.status !== "string") {
    throw new Error("VeriKit returned an incomplete routing result.");
  }
  return result;
}

export function routingContext(result, pluginRoot) {
  if (!result.routing?.status || result.routing.status === "uncertain") return undefined;
  // BM25 is normalized against the current catalog: unrelated Chinese text
  // can still produce a 0.5 top score with zero authored trigger matches.
  // Shared nouns such as "city name" also match authored clauses. A trigger
  // alone needs development intent; recipes and explicit SDK/Kit names suffice.
  // Manual route results keep their original scores and candidates.
  const top = result.top?.find(candidate => !candidate.disqualified);
  const task = typeof result.task === "string" ? result.task : "";
  const normalized = task.toLowerCase().replace(/[^a-z0-9]/g, "");
  const namesKit = top?.name && normalized.includes(top.name.toLowerCase().replace(/[^a-z0-9]/g, ""));
  const namesPlatform = /\b(?:HarmonyOS|OpenHarmony|ArkTS|ArkUI|ArkData)\b|鸿蒙|@(?:kit|ohos|hms)\./iu.test(task);
  const developmentIntent = /开发|实现|集成|接入|编写|代码|应用|程序|功能|接口|组件|页面|按钮|权限|调试|构建|调用|监听|订阅|渲染|\b(?:app|application|sdk|api|develop|implement|integrate|build|code|module|component|render)\b/iu.test(task);
  if (!result.compositions?.length && !(top?.positiveHits > 0 && developmentIntent) && !namesPlatform && !namesKit) return undefined;
  return [
    "<verikit-routing>", JSON.stringify(result), "</verikit-routing>",
    routingProtocol(pluginRoot, result),
  ].join("\n");
}

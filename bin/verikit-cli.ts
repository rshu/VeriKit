#!/usr/bin/env -S npx tsx
/**
 * `verikit` CLI — the bridge between Claude Code (which fires hooks as shell
 * commands) and @skillcontract/core (which is in-process TypeScript).
 *
 * Commands:
 *   verikit list-skills [--root <dir>]
 *     Discover and parse SKILL.md files. Emit one JSON line per skill with
 *     {name, description, hasContract, useWhenCount}.
 *
 *   verikit route --task <text> [--root <dir>] [--top <n>] [--compose] [--deep] [--refs <k>]
 *     Rank all skills against the task description. Emit a JSON object with
 *     {task, top: [{name, combinedScore, triggerScore, bm25Score, disqualified}]}.
 *     With --compose, also match curated composition recipes and a typed-
 *     chaining bundle; adds {compositions, chains, bundle, bundle_source,
 *     recommendation, provenance} and the authoritative routing block
 *     {routing: {status, top, recipes, top_in_recipe, directive}}.
 *     `routing.directive` is the authoritative no-silent-pick channel: on
 *     status:"conflict" it instructs the agent to ask the human to choose
 *     among recipe[recommended]/top-k/specify-own rather than auto-picking.
 *     `recommendation` mirrors `routing.directive` verbatim for back-compat.
 *     With --deep, run the second-stage ranker on every relevant Kit
 *     (top-1 ranker pick PLUS every Kit in the recipe bundle when --compose
 *     matched). Adds {deep_references: { [kit]: [{path, title, score}, ...] },
 *     deep_references_no_manifest?: string[]}.
 *     The UserPromptSubmit hook and /verikit-route slash command both
 *     invoke route with all three on by default (--top 5 --compose --deep --refs 5).
 *
 *   verikit verify --skill <name> --output <text> [--root <dir>]
 *     Run a skill's postconditions over a captured output. Emit
 *     {skill, satisfied: boolean, results: [{statement, passed, reason}]}.
 *
 * Defaults: --root resolves to $VERIKIT_SKILL_ROOT or, failing that,
 * the bundled `./skills` directory.
 */

import { resolve, dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import {
  discoverSkillFiles,
  parseSkillFile,
  loadSidecarContracts,
  SkillRanker,
  verifySkill,
  rankReferences,
  matchCompositions,
  findLinearChains,
  recipeStatus,
  type ParsedSkill,
  type TaskContext,
  type ReferenceDoc,
  type Composition,
} from "@skillcontract/core"
import { classifyConflict, band, topKits, type RankedLike, type RecipeMatchLike } from "./conflict.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Where this script lives. In dev that's `bin/`; after `npm run build` the
// bundled `verikit-cli.js` lives in `dist/` alongside copied `skills/`
// and `contracts/`. We resolve both layouts.
const SELF_DIR = __dirname
const PLUGIN_ROOT = resolve(__dirname, "..")

/**
 * Directories to try as the skill-discovery root, in priority order.
 * `discoverSkillFiles` appends "/skills" itself, so each candidate must be
 * the *parent* of a `skills/<kit>/SKILL.md` tree.
 *   1. explicit --root flag
 *   2. $VERIKIT_SKILL_ROOT
 *   3. SELF_DIR        — after build: dist/ (has dist/skills/ from the copy step)
 *   4. PLUGIN_ROOT     — in dev: packages/claude-code-plugin/ (has the skills symlink)
 */
function skillRootCandidates(rootArg?: string): string[] {
  return [rootArg, process.env.VERIKIT_SKILL_ROOT, SELF_DIR, PLUGIN_ROOT].filter(
    (p): p is string => !!p,
  )
}

/**
 * Directories to try for sidecar contract JSON files, in priority order.
 * Each is passed straight to `loadSidecarContracts` (flat layout: *.json
 * directly inside).
 *   1. $VERIKIT_CONTRACTS_DIR
 *   2. SELF_DIR/contracts        — after build: dist/contracts/
 *   3. PLUGIN_ROOT/contracts     — alternate layout
 *   4. PLUGIN_ROOT/../verikit/contracts — dev workspace sibling
 */
function contractsDirCandidates(): string[] {
  return [
    process.env.VERIKIT_CONTRACTS_DIR,
    join(SELF_DIR, "contracts"),
    join(PLUGIN_ROOT, "contracts"),
    join(PLUGIN_ROOT, "..", "verikit", "contracts"),
  ].filter((p): p is string => !!p)
}

/** Directories to try for per-Kit reference manifests (parallel to contracts). */
function manifestsDirCandidates(): string[] {
  return [
    process.env.VERIKIT_MANIFESTS_DIR,
    join(SELF_DIR, "manifests"),
    join(PLUGIN_ROOT, "manifests"),
    join(PLUGIN_ROOT, "..", "verikit", "manifests"),
  ].filter((p): p is string => !!p)
}

interface ReferenceManifest {
  format: string
  skill: string
  references: ReferenceDoc[]
}

/** Load a Kit's reference manifest from the first candidate dir that has it. */
async function loadReferenceManifest(kit: string): Promise<ReferenceManifest | null> {
  for (const dir of manifestsDirCandidates()) {
    const p = join(dir, `${kit}.json`)
    if (!existsSync(p)) continue
    try {
      const m = JSON.parse(await readFile(p, "utf-8")) as ReferenceManifest
      if (Array.isArray(m.references)) return m
    } catch {
      // try next candidate
    }
  }
  return null
}

/**
 * Candidate paths for the composition-recipes file.
 *
 * Note: VERIKIT_COMPOSITIONS_FILE (and the VERIKIT_*_DIR vars above)
 * are *trusted-operator configuration* — they let you point the CLI at a
 * different catalog. They are read from the process environment, which in
 * a hook context is whatever the host runtime (Claude Code / OpenCode)
 * passes through; that's the operator's environment, not user-supplied
 * input. Recipe/manifest *content* is treated like any skill-catalog
 * content — the `path`/`notes` fields flow into the agent's context, so a
 * tampered catalog is a catalog-trust problem, the same as a malicious
 * SKILL.md. The manifest builder basename()s reference filenames as a
 * defense in depth; beyond that, don't point these vars at untrusted dirs.
 */
function compositionsFileCandidates(): string[] {
  return [
    process.env.VERIKIT_COMPOSITIONS_FILE,
    join(SELF_DIR, "compositions", "recipes.json"),
    join(PLUGIN_ROOT, "compositions", "recipes.json"),
    join(PLUGIN_ROOT, "..", "verikit", "compositions", "recipes.json"),
  ].filter((p): p is string => !!p)
}

interface CompositionsFile {
  format?: string
  /** File-level provenance / trust policy — surfaced verbatim in `route --compose` output. */
  provenance?: Record<string, unknown>
  compositions: Composition[]
}

/** Load the curated recipes + their file-level provenance, from the first candidate path that has them. */
async function loadCompositions(): Promise<{ compositions: Composition[]; provenance?: Record<string, unknown> }> {
  for (const p of compositionsFileCandidates()) {
    if (!existsSync(p)) continue
    try {
      const f = JSON.parse(await readFile(p, "utf-8")) as CompositionsFile
      if (Array.isArray(f.compositions)) return { compositions: f.compositions, provenance: f.provenance }
    } catch {
      // try next
    }
  }
  return { compositions: [] }
}

// ---------------------------------------------------------------- args

interface ParsedArgs {
  command: string
  flags: Map<string, string>
  positional: string[]
}

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2)
  const command = args[0] ?? ""
  const flags = new Map<string, string>()
  const positional: string[] = []
  for (let i = 1; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith("--")) {
      const next = args[i + 1]
      if (next !== undefined && !next.startsWith("--")) {
        flags.set(a.slice(2), next)
        i++
      } else {
        flags.set(a.slice(2), "true")
      }
    } else {
      positional.push(a)
    }
  }
  return { command, flags, positional }
}

function fail(msg: string, code = 1): never {
  process.stderr.write(`verikit: ${msg}\n`)
  process.exit(code)
}

// ---------------------------------------------------------------- skill discovery

async function loadSkills(rootArg: string | undefined): Promise<ParsedSkill[]> {
  // Try each skill-root candidate until discovery returns something. This
  // lets the same binary work from `dist/` (built/bundled), from the dev
  // workspace, or from an explicit --root.
  let skills: ParsedSkill[] = []
  let usedRoot = ""
  for (const root of skillRootCandidates(rootArg)) {
    const files = await discoverSkillFiles([root])
    if (files.length === 0) continue
    const parsed: ParsedSkill[] = []
    for (const file of files) {
      try {
        const skill = await parseSkillFile(file)
        if (skill.name) parsed.push(skill)
      } catch (err) {
        process.stderr.write(
          `verikit: failed to parse ${file}: ${(err as Error).message}\n`,
        )
      }
    }
    if (parsed.length > 0) {
      skills = parsed
      usedRoot = root
      break
    }
  }
  if (skills.length === 0) {
    process.stderr.write(
      `verikit: no skills found under any of: ${skillRootCandidates(rootArg).join(", ")}\n`,
    )
    return skills
  }
  process.stderr.write(`verikit: discovered ${skills.length} skill(s) under ${usedRoot}\n`)

  // Attach sidecar contracts from the first candidate directory that has any.
  // A failure to load contracts must NOT abort a session that already loaded
  // skills successfully — the skills are still usable as the H1 baseline
  // (name + description), the router just won't score them.
  for (const dir of contractsDirCandidates()) {
    try {
      const stats = await loadSidecarContracts(skills, dir)
      if (stats.scanned > 0) {
        process.stderr.write(
          `verikit: loaded ${stats.attached}/${stats.scanned} sidecar contract(s) from ${dir}` +
            (stats.orphaned.length > 0 ? ` (${stats.orphaned.length} orphaned)` : "") +
            (stats.errors.length > 0 ? ` (${stats.errors.length} rejected: ${stats.errors[0]?.error})` : "") +
            "\n",
        )
        break
      }
    } catch (err) {
      process.stderr.write(
        `verikit: sidecar load failed for ${dir}: ${(err as Error).message}\n`,
      )
    }
  }
  return skills
}

// ---------------------------------------------------------------- commands

async function cmdListSkills(args: ParsedArgs) {
  const skills = await loadSkills(args.flags.get("root"))
  for (const s of skills) {
    const out = {
      name: s.name,
      description: s.description.slice(0, 200),
      hasContract: !!s.contract,
      useWhenCount: s.contract?.use_when.length ?? 0,
    }
    process.stdout.write(JSON.stringify(out) + "\n")
  }
}

async function cmdRoute(args: ParsedArgs) {
  const task = args.flags.get("task") ?? ""
  if (!task) fail("--task is required")
  const top = parseInt(args.flags.get("top") ?? "5", 10)
  const deep = args.flags.has("deep")
  const compose = args.flags.has("compose")
  const refsK = parseInt(args.flags.get("refs") ?? "5", 10)
  // --top-k: how many high-confidence Kit options to offer on a conflict
  // (option 2 of the human-choice menu). Small by design: default 3, clamp 1–5.
  const topKArg = Math.min(5, Math.max(1, parseInt(args.flags.get("top-k") ?? "3", 10) || 3))
  const skills = await loadSkills(args.flags.get("root"))
  if (skills.length === 0) {
    process.stdout.write(JSON.stringify({ task, top: [], warning: "no skills found" }) + "\n")
    return
  }
  const ranker = new SkillRanker(skills)
  const ctx: TaskContext = { instruction: task, files: [] }
  // Rank the full corpus once; keep all of it for chaining, slice for display.
  const rankedAll = ranker.rank(ctx)
  const ranked = rankedAll.slice(0, top)
  const out: Record<string, unknown> = {
    task,
    skill_count: skills.length,
    top: ranked.map((r) => ({
      name: r.name,
      combinedScore: Number(r.combinedScore.toFixed(4)),
      triggerScore: Number(r.triggerScore.toFixed(4)),
      bm25Score: Number(r.bm25Score.toFixed(4)),
      disqualified: r.disqualified,
      positiveHits: r.trigger.positiveHits,
      totalPositive: r.trigger.totalPositive,
      negativeHits: r.trigger.negativeHits,
      matchedClauses: r.trigger.matchedClauses,
    })),
  }

  // --compose: multi-skill output. A feature task usually needs several
  // Kits; we surface, in priority order: (1) any matching curated recipe
  // (deprecated ones are skipped), (2) inferred I/O-typed chains, (3) a
  // fallback bundle from the kit ranking. Plus a plain-language
  // `recommendation` so the agent knows which to trust, and `provenance`
  // so it knows how mature the recipes are.
  if (compose) {
    const { compositions, provenance } = await loadCompositions()
    if (provenance) out.provenance = provenance

    const recipeMatches = matchCompositions(task, compositions, { minScore: 0.5, maxResults: 3 })
    out.compositions = recipeMatches.map((m) => ({
      id: m.composition.id,
      name: m.composition.name,
      skills: m.composition.skills,
      notes: m.composition.notes,
      lifecycle: recipeStatus(m.composition),
      score: m.score,
    }))
    const chains = findLinearChains(rankedAll, { minScore: 0.3, maxChains: 5 })
    out.chains = chains.map((c) => ({
      skills: c.skills.map((s) => s.name),
      score: Number(c.totalScore.toFixed(4)),
      reason: c.reason,
    }))

    const TOP_HIGH = 0.4 // shipping single-Kit confidence floor (unchanged)
    const cls = classifyConflict(
      ranked as unknown as RankedLike[],
      recipeMatches as unknown as RecipeMatchLike[],
      TOP_HIGH,
    )
    const maturity = cls.recipe
      ? recipeStatus(recipeMatches[0].composition)
      : null

    // Option 2 of the conflict menu: up to `topKArg` HIGH-confidence Kits
    // (band "high", score >= 0.6). Empty when none clear the bar — we never
    // offer low/medium-confidence Kits as a "high-confidence" choice.
    const HIGH_CONF = 0.6
    const kitOpts = topKits(ranked as unknown as RankedLike[], HIGH_CONF, topKArg)

    // Authoritative, non-auto-picking block. The agent reads `routing`.
    // `routing.directive` is the spec §5 authoritative no-silent-pick channel;
    // `recommendation` mirrors it verbatim for back-compat.
    const routing: Record<string, unknown> = {
      status: cls.status,
      top: cls.top ? { name: cls.top.name, combinedScore: Number(cls.top.combinedScore.toFixed(4)), band: band(cls.top.combinedScore) } : null,
      top_k: kitOpts.map((k) => ({ name: k.name, combinedScore: Number(k.combinedScore.toFixed(4)), band: band(k.combinedScore) })),
      recipes: cls.recipe ? [{ id: cls.recipe.id, skills: cls.recipe.skills, score: Number(cls.recipe.score.toFixed(4)), band: band(cls.recipe.score), maturity }] : [],
      top_in_recipe: cls.top_in_recipe,
    }

    let directive: string
    if (cls.status === "conflict") {
      const kitMenu = kitOpts.length
        ? kitOpts.map((k) => `${k.name} (${k.combinedScore.toFixed(2)})`).join(", ")
        : null
      const option2 = kitMenu
        ? `  2. One of the top high-confidence Kits: ${kitMenu} (single-Kit choices, see routing.top_k).\n`
        : `  2. (no high-confidence single Kit alternative this time.)\n`
      directive =
        `CONFLICT: the curated recipe and the top-ranked Kit disagree. Do NOT silently pick. ` +
        `Ask the human to choose one of:\n` +
        `  1. Recipe bundle "${cls.recipe!.id}" [${cls.recipe!.skills.join(", ")}] — recommended (curated multi-Kit answer; maturity: ${maturity}).\n` +
        option2 +
        `  3. Specify the Kit(s) yourself.\n` +
        `Wait for the human's selection, then proceed with exactly that. Do not override their choice. Note: deep_references below reflect the top-ranked Kit only until the human picks.`
      out.bundle = cls.top ? [cls.top.name] : []
      out.bundle_source = "ask-human"
    } else if (cls.status === "agree") {
      directive =
        `Recipe "${cls.recipe!.id}" [${cls.recipe!.skills.join(", ")}] — the top-ranked Kit (${cls.top?.name}) is part of it. Proceed with the recipe bundle. Recipe maturity: ${maturity}.`
      out.bundle = cls.recipe!.skills
      out.bundle_source = "recipe"
    } else if (cls.status === "single_kit") {
      directive =
        `No curated recipe matched; single-Kit task: use ${cls.top!.name} (score ${cls.top!.combinedScore.toFixed(2)}). Reference docs in \`deep_references\`.`
      out.bundle = [cls.top!.name]
      out.bundle_source = "top-kit"
    } else {
      directive =
        `Uncertain — no recipe matched and the top Kit (${cls.top?.name ?? "none"}, score ${(cls.top?.combinedScore ?? 0).toFixed(2)}) is a weak match. Browse the harmonyos-sdk-skill meta-index, or ask the user to clarify the feature.`
      out.bundle = []
      out.bundle_source = "none"
    }
    routing.directive = directive
    out.routing = routing
    out.recommendation = directive
  }

  // --deep: second-stage ranker over the relevant reference manifests.
  // The relevant kits are the top-1 ranker pick PLUS every kit in the recipe
  // bundle (when --compose matched a recipe). The output is a map keyed by
  // kit name so the agent (or the hook consumer) can see the task-ranked
  // top-K references for each kit in the selected bundle, not just the top-1.
  if (deep && ranked.length > 0) {
    const targets: string[] = []
    const seen = new Set<string>()
    const pushTarget = (k: string) => { if (k && !seen.has(k)) { seen.add(k); targets.push(k) } }
    pushTarget(ranked[0].name)
    if (Array.isArray(out.bundle)) for (const k of out.bundle as string[]) pushTarget(k)

    const deepRefs: Record<string, ReturnType<typeof rankReferences>> = {}
    const missing: string[] = []
    for (const kit of targets) {
      const manifest = await loadReferenceManifest(kit)
      if (manifest) {
        deepRefs[kit] = rankReferences(task, manifest.references, { topK: refsK })
      } else {
        // arkts / arkui / arkdata sometimes don't have a per-Kit manifest
        // (they're language-level, not Kits with reference docs). Record but
        // don't fail the call.
        missing.push(kit)
      }
    }
    out.deep_references = deepRefs
    if (missing.length > 0) out.deep_references_no_manifest = missing
  }

  process.stdout.write(JSON.stringify(out) + "\n")
}

async function cmdVerify(args: ParsedArgs) {
  const skillName = args.flags.get("skill")
  if (!skillName) fail("--skill is required")

  // --output text from flag, OR @-prefix means read from file, OR if "-" read stdin
  let output = args.flags.get("output") ?? ""
  if (output === "-") {
    output = await readStdin()
  } else if (output.startsWith("@")) {
    output = await readFile(output.slice(1), "utf-8")
  }
  if (!output) fail("--output is required (use '-' for stdin or @path for a file)")

  const skills = await loadSkills(args.flags.get("root"))
  const skill = skills.find((s) => s.name === skillName)
  if (!skill) fail(`unknown skill: ${skillName}`)
  if (!skill.contract || skill.contract.postconditions.length === 0) {
    process.stdout.write(
      JSON.stringify({
        skill: skillName,
        satisfied: true,
        results: [],
        note: "no postconditions declared",
      }) + "\n",
    )
    return
  }

  const result = await verifySkill(
    skill.name,
    skill.contract.postconditions,
    {
      text: output,
      safetyTier: skill.contract.safety_tier,
    },
    { mode: "gated" },
  )
  process.stdout.write(JSON.stringify({ skill: skill.name, ...result }) + "\n")
}

function readStdin(): Promise<string> {
  return new Promise((resolveP, rejectP) => {
    let buf = ""
    process.stdin.setEncoding("utf-8")
    process.stdin.on("data", (chunk) => (buf += chunk))
    process.stdin.on("end", () => resolveP(buf))
    process.stdin.on("error", rejectP)
  })
}

// ---------------------------------------------------------------- entry

function printHelp() {
  process.stdout.write(`verikit — VeriKit CLI for Claude Code

Commands:
  verikit list-skills [--root <dir>]
  verikit route --task <text> [--root <dir>] [--top <n>] [--compose] [--deep] [--refs <k>]
  verikit verify --skill <name> --output <text>|@file|- [--root <dir>]

The hook and slash command run \`route\` with \`--top 5 --compose --deep --refs 5\`
by default — top-K kits, matched recipe bundle, and the top-K task-relevant
references for every relevant Kit, all in one call.

Environment:
  VERIKIT_SKILL_ROOT     Default skill discovery root (overrides bundled ./skills).
  VERIKIT_CONTRACTS_DIR  Override sidecar-contracts directory.
  VERIKIT_MANIFESTS_DIR  Override reference-manifests directory.
`)
}

async function main() {
  const args = parseArgs(process.argv)
  switch (args.command) {
    case "list-skills":
      return cmdListSkills(args)
    case "route":
      return cmdRoute(args)
    case "verify":
      return cmdVerify(args)
    case "":
    case "help":
    case "--help":
    case "-h":
      printHelp()
      return
    default:
      fail(`unknown command: ${args.command}`)
  }
}

main().catch((err) => {
  process.stderr.write(`verikit: ${(err as Error).message}\n`)
  process.exit(1)
})

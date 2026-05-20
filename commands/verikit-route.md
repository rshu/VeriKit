---
name: verikit-route
description: Run the full VeriKit selection strategy against a task — top-K HarmonyOS Kits, matched recipe bundle, and the task-relevant top-5 references per relevant Kit.
---

You are about to run the VeriKit router against the user's task description.

Invoke the bundled `verikit` CLI with the full default selection strategy: top-K Kits, matched composition recipe bundle, and second-stage references for every relevant Kit. Prefer the built bundle (`dist/verikit-cli.js`, plain `node`); fall back to the TS source via `npx tsx` only if the bundle is absent (a dev checkout that hasn't run `npm run build`):

```bash
if [ -f "${CLAUDE_PLUGIN_ROOT}/dist/verikit-cli.js" ]; then
  node "${CLAUDE_PLUGIN_ROOT}/dist/verikit-cli.js" route --task "$ARGUMENTS" --top 5 --compose --deep --refs 5
else
  npx --yes tsx "${CLAUDE_PLUGIN_ROOT}/bin/verikit-cli.ts" route --task "$ARGUMENTS" --top 5 --compose --deep --refs 5
fi
```

The CLI emits a single JSON line with:

- `task`: the input
- `skill_count`: total Kits discovered
- `top`: up to 5 candidates with `name`, `combinedScore`, `triggerScore`, `bm25Score`, `disqualified` flag, matched positive/negative trigger clauses — the single-Kit view
- `compositions`: matched recipes (each with `id`, `skills`, `notes`, `lifecycle`, `score`) — the multi-Kit view
- `bundle` / `bundle_source` / `recommendation`: the recommended Kit set (recipe-derived or top-Kit-derived) and a plain-language hedge
- `deep_references`: a map of Kit name → top-5 task-relevant reference docs (path + title + snippet) for the top-1 Kit and every Kit in the bundle

After running, summarize for the user: which Kits to load, which recipe (if any) governs, and which reference docs to read first. Call out any disqualified Kits. If the top combined score is below 0.5 and no recipe matched, note the low confidence explicitly.

The Kit catalog defaults to the plugin's bundled `skills/` directory. To target a different root, set `VERIKIT_SKILL_ROOT` in the environment before running the command.

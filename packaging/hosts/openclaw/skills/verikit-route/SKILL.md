---
name: verikit-route
description: Select HarmonyOS Kits and reference docs for a development task using the bundled VeriKit ranker. Use before implementing HarmonyOS or ArkTS SDK features, or when the user asks which Kit to use.
---

Call the `verikit_route` tool with `{"task":"<the user's HarmonyOS development task>"}`.
VeriKit is disabled by default unless `config.defaultSession` is true or the user
has enabled this session with `/verikit on`. If the tool reports that VeriKit is
disabled, respect that setting: do not retry or impose the Kit-selection workflow.
The user can inspect it with `/verikit status` or restore the configured default
with `/verikit default`.

The result contains ranked `top` Kits, matched `compositions`, the `routing` decision,
`bundle`, and `deep_references`. The `catalog_root` is the installed plugin's Kit directory.

Before coding, present the top Kits, any matched recipe, and an option to specify a Kit
list. Honor an existing user selection. For `routing.status == "conflict"`, follow
`routing.directive`: ask the user to choose and wait; never silently replace their Kits.
For `uncertain`, explain the low confidence and clarify the feature instead of treating
the result as an authoritative recommendation.

Read `<catalog_root>/<selected-kit>/SKILL.md` using the native `read` tool, then read
the relevant `deep_references` paths relative to that Kit's directory. If the user's
choice has no returned references, use its SKILL.md reference index. The `read_plan`
provides absolute candidate paths, not a user selection or evidence of reading.
For EACH selected Kit, complete two separate checks before the first code tool:
successfully read its SKILL.md AND a task-relevant reference. Supporting/language
Kits require their own references too; one Kit's docs cannot cover another Kit.
Use all `skill_reads` ranges for a selected Kit's complete SKILL.md. Then choose
one task-relevant reference to EOF: start without a line limit, then continue at
the host's returned offset if capped. A short preview does not complete it. Do not
exhaust every candidate or unrelated reference. Wait for successful read results
before writing code.
OpenClaw does not require a Claude `Skill(...)` call or a shell command.

If `verikit_route` is unavailable, ask the operator to allow that tool for the active
agent in the OpenClaw tool settings. Automatic prompt routing remains advisory.

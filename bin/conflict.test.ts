import { test } from "node:test"
import assert from "node:assert/strict"
import { classifyConflict, oldPolicyBundle, band } from "./conflict.js"

const r = (name: string, combinedScore: number, disqualified = false) => ({ name, combinedScore, disqualified })
const rec = (id: string, skills: string[], score: number) => ({ composition: { id, skills }, score })

test("agree: recipe matched and ranker-top is in recipe.skills", () => {
  const c = classifyConflict([r("notification-kit", 0.6), r("ability-kit", 0.3)], [rec("notif-action", ["notification-kit", "ability-kit"], 0.7)], 0.4)
  assert.equal(c.status, "agree")
  assert.equal(c.top_in_recipe, true)
})

test("conflict: recipe matched but ranker-top NOT in recipe.skills", () => {
  const c = classifyConflict([r("push-kit", 0.55)], [rec("notif-action", ["notification-kit", "ability-kit"], 0.7)], 0.4)
  assert.equal(c.status, "conflict")
  assert.equal(c.top_in_recipe, false)
})

test("single_kit: no recipe, confident top", () => {
  const c = classifyConflict([r("arkdata", 0.5)], [], 0.4)
  assert.equal(c.status, "single_kit")
})

test("uncertain: no recipe, weak top", () => {
  const c = classifyConflict([r("arkdata", 0.2)], [], 0.4)
  assert.equal(c.status, "uncertain")
})

test("disqualified top is skipped when choosing the ranker top", () => {
  const c = classifyConflict([r("x", 0.9, true), r("arkdata", 0.5)], [], 0.4)
  assert.equal(c.status, "single_kit")
  assert.equal(c.top?.name, "arkdata")
})

test("oldPolicyBundle reproduces the pre-change cascade", () => {
  assert.deepEqual(oldPolicyBundle([r("push-kit", 0.9)], [rec("notif-action", ["notification-kit"], 0.6)], 0.4), { bundle: ["notification-kit"], source: "recipe" })
  assert.deepEqual(oldPolicyBundle([r("arkdata", 0.5)], [], 0.4), { bundle: ["arkdata"], source: "top-kit" })
  assert.deepEqual(oldPolicyBundle([r("arkdata", 0.2)], [], 0.4), { bundle: [], source: "none" })
})

test("band: fixed ordinal cuts, not probabilities", () => {
  assert.equal(band(0.8), "high")
  assert.equal(band(0.45), "medium")
  assert.equal(band(0.2), "low")
})

/**
 * Pure top-k <-> recipe conflict classifier (HITL #3). Single source of
 * truth: imported by verikit-cli.ts (product) AND the bench conflict harness
 * (eval). No @skillcontract/core dependency — operates on already-computed
 * ranked + recipeMatches arrays.
 */

/** Minimal structural shapes (subset of the real ranker/recipe types). */
export interface RankedLike { name: string; combinedScore: number; disqualified?: boolean }
export interface RecipeMatchLike { composition: { id: string; skills: string[] }; score: number }

export type ConflictStatus = "agree" | "single_kit" | "conflict" | "uncertain"

export interface ConflictResult {
  status: ConflictStatus
  top: { name: string; combinedScore: number } | null
  recipe: { id: string; skills: string[]; score: number } | null
  top_in_recipe: boolean
}

/**
 * Ordinal confidence band. FIXED cuts derived from the shipping constants'
 * provenance (TOP_HIGH=0.4 single-kit confidence; recipe minScore=0.5).
 * Ordinal ONLY — NOT a probability, and NOT tuned to any eval set.
 */
export function band(score: number): "high" | "medium" | "low" {
  if (score >= 0.6) return "high"
  if (score >= 0.4) return "medium"
  return "low"
}

/** The ranker's chosen top = first non-disqualified entry (mirrors verikit-cli). */
function pickTop(ranked: RankedLike[]): RankedLike | null {
  return ranked.find((r) => !r.disqualified) ?? null
}

/**
 * 4-status detector. `topHigh` is the single-kit confidence floor (the
 * shipping TOP_HIGH=0.4). Recipe presence = caller already filtered by the
 * shipping minScore (0.5) when building recipeMatches.
 */
export function classifyConflict(
  ranked: RankedLike[],
  recipeMatches: RecipeMatchLike[],
  topHigh: number,
): ConflictResult {
  const topKit = pickTop(ranked)
  const top = topKit ? { name: topKit.name, combinedScore: topKit.combinedScore } : null
  const topRecipe = recipeMatches.length > 0 ? recipeMatches[0] : null
  const recipe = topRecipe ? { id: topRecipe.composition.id, skills: topRecipe.composition.skills, score: topRecipe.score } : null
  const topInRecipe = !!(topRecipe && topKit && topRecipe.composition.skills.includes(topKit.name))

  let status: ConflictStatus
  if (topRecipe) status = topInRecipe ? "agree" : "conflict"
  else if (topKit && topKit.combinedScore >= topHigh) status = "single_kit"
  else status = "uncertain"

  return { status, top, recipe, top_in_recipe: topInRecipe }
}

/**
 * The top-`k` non-disqualified Kits at or above `topHigh` confidence,
 * best-first (input is assumed ranker-sorted). Powers option 2 of the HITL
 * conflict menu ("the high-confidence Kit options"); returns fewer than `k`
 * when fewer Kits clear the floor — never pads with low-confidence Kits.
 */
export function topKits(ranked: RankedLike[], topHigh: number, k: number): { name: string; combinedScore: number }[] {
  return ranked
    .filter((r) => !r.disqualified && r.combinedScore >= topHigh)
    .slice(0, k)
    .map((r) => ({ name: r.name, combinedScore: r.combinedScore }))
}

/**
 * The PRE-change auto-pick (reference for the held-out contrast in the eval).
 * Reproduces verikit-cli's old cascade exactly: recipe wins if matched;
 * else confident top; else none.
 */
export function oldPolicyBundle(
  ranked: RankedLike[],
  recipeMatches: RecipeMatchLike[],
  topHigh: number,
): { bundle: string[]; source: "recipe" | "top-kit" | "none" } {
  const topKit = pickTop(ranked)
  const topRecipe = recipeMatches.length > 0 ? recipeMatches[0] : null
  if (topRecipe) return { bundle: topRecipe.composition.skills, source: "recipe" }
  if (topKit && topKit.combinedScore >= topHigh) return { bundle: [topKit.name], source: "top-kit" }
  return { bundle: [], source: "none" }
}

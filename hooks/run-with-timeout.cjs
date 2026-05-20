#!/usr/bin/env node
/**
 * Cross-platform wrapper for `timeout <ms> <cmd> [args...]`.
 *
 * `timeout(1)` is GNU coreutils. Linux + WSL + Git-Bash typically have it;
 * macOS does NOT (only `gtimeout` if you `brew install coreutils`). The
 * VeriKit UserPromptSubmit hook needs to bound how long the routing CLI
 * can run, but `timeout 15 node ...` fails silently on macOS — the hook
 * then emits `{"continue": true}` and routing is silently disabled.
 *
 * This wrapper uses `node`'s built-in AbortController + child_process. node
 * is already a hard prerequisite of the hook (it runs node twice for the
 * prompt parse + JSON envelope), so there's no new dependency. CommonJS
 * (`.cjs`) so it loads regardless of the nearest package.json's `"type"`.
 *
 * Behavior:
 *   - Inherits the child's stdout and stderr to ours, so a parent shell's
 *     command substitution captures the child's stdout unchanged.
 *   - On timeout: SIGTERMs the child, exits 124 (matches GNU `timeout`).
 *   - On launch failure (cmd not found): exits 127 (matches POSIX).
 *   - On normal exit: forwards the child's exit code (or 128+signal).
 *
 * Usage:
 *   node run-with-timeout.cjs <timeout-ms> <cmd> [args...]
 */

"use strict"

const { spawn } = require("node:child_process")

const args = process.argv.slice(2)
if (args.length < 2) {
  console.error("usage: run-with-timeout.cjs <timeout-ms> <cmd> [args...]")
  process.exit(2)
}
const timeoutMs = Number(args[0])
if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
  console.error(`run-with-timeout: invalid timeout-ms: ${args[0]}`)
  process.exit(2)
}
const cmd = args[1]
const rest = args.slice(2)

const child = spawn(cmd, rest, { stdio: ["ignore", "inherit", "inherit"] })

let timedOut = false
const t = setTimeout(() => {
  timedOut = true
  // SIGTERM first; if the child doesn't die in 1s, SIGKILL. Mirrors GNU `timeout`'s
  // --kill-after grace period without making it configurable.
  child.kill("SIGTERM")
  setTimeout(() => {
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL")
  }, 1000).unref()
}, timeoutMs)

child.on("error", (err) => {
  // Most commonly: ENOENT — cmd is not on PATH. Match POSIX 127.
  clearTimeout(t)
  process.stderr.write(`run-with-timeout: ${cmd} failed to launch: ${err.message}\n`)
  process.exit(127)
})

child.on("exit", (code, signal) => {
  clearTimeout(t)
  if (timedOut) process.exit(124) // GNU timeout convention
  if (signal) process.exit(128 + (process.binding ? 15 : 15))
  process.exit(code ?? 1)
})

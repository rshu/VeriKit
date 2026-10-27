#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

// Explicit configuration path: running a build never changes a live host.
export async function configureOpenClaw({ configPath, pluginRoot = fileURLToPath(new URL("../", import.meta.url)), toolAgent } = {}) {
  if (!configPath) throw new Error("An explicit --config <openclaw.json> path is required.");
  configPath = path.resolve(configPath);
  pluginRoot = await fs.realpath(path.resolve(pluginRoot));
  const manifest = JSON.parse(await fs.readFile(path.join(pluginRoot, "openclaw.plugin.json"), "utf8"));
  const pkg = JSON.parse(await fs.readFile(path.join(pluginRoot, "package.json"), "utf8"));
  const main = typeof manifest.main === "string" ? path.resolve(pluginRoot, manifest.main) : null;
  const realMain = main && await fs.realpath(main);
  const relative = realMain && path.relative(pluginRoot, realMain);
  if (manifest.id !== "verikit" || !relative || path.isAbsolute(relative) || relative === ".." || relative.startsWith(`..${path.sep}`)
    || !pkg.openclaw?.extensions?.includes(manifest.main) || !(await fs.stat(realMain)).isFile()) {
    throw new Error("Use the built VeriKit OpenClaw package with matching manifest.main and openclaw.extensions.");
  }
  const original = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(original);
  const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
  if (!object(config)) throw new Error("OpenClaw config must be an object.");
  config.plugins ??= {};
  const plugins = config.plugins;
  if (!object(plugins) || plugins.enabled === false) throw new Error("The host plugin system must be enabled.");
  plugins.load ??= {};
  plugins.entries ??= {};
  if (!object(plugins.load) || !object(plugins.entries) || plugins.allow !== undefined &&
    (!Array.isArray(plugins.allow) || plugins.allow.some(value => typeof value !== "string"))) {
    throw new Error("Invalid plugins.load, plugins.entries or plugins.allow.");
  }
  plugins.load.paths ??= [];
  if (!Array.isArray(plugins.load.paths) || plugins.load.paths.some(value => typeof value !== "string")) throw new Error("plugins.load.paths must be an array of paths.");
  if (!plugins.load.paths.some(value => path.resolve(value) === pluginRoot)) plugins.load.paths.push(pluginRoot.replaceAll("\\", "/"));
  // Missing/empty allow means open policy in this host. Turning it into a
  // singleton whitelist would disable unrelated, already-enabled plugins.
  if (plugins.allow?.length && !plugins.allow.includes("verikit")) plugins.allow.push("verikit");
  plugins.entries.verikit ??= {};
  const entry = plugins.entries.verikit;
  if (!object(entry)) throw new Error("plugins.entries.verikit must be an object.");
  entry.hooks ??= {};
  entry.config ??= {};
  if (!object(entry.hooks) || !object(entry.config)) throw new Error("VeriKit hooks/config must be objects.");
  entry.enabled = true;
  entry.config.enabled = true;
  entry.config.defaultSession ??= false;
  entry.hooks.allowPromptInjection = true;

  if (toolAgent !== undefined) {
    const agent = config.agents?.list?.find(value => value.id === toolAgent);
    if (!agent) throw new Error(`Configured agent not found: ${toolAgent}`);
    agent.tools ??= {};
    if (!object(agent.tools)) throw new Error("Agent tools must be an object.");
    // Agent alsoAllow replaces the global list, so inherit it when absent.
    const alsoAllow = agent.tools.alsoAllow ?? config.tools?.alsoAllow ?? [];
    if (!Array.isArray(alsoAllow) || alsoAllow.some(value => typeof value !== "string")) throw new Error("tools.alsoAllow must be an array of tool names.");
    agent.tools.alsoAllow = [...alsoAllow];
    if (!agent.tools.alsoAllow.includes("verikit_route")) agent.tools.alsoAllow.push("verikit_route");
  }
  if (JSON.stringify(JSON.parse(original)) === JSON.stringify(config)) return { changed: false, configPath, pluginRoot };
  const suffix = `${Date.now()}-${randomUUID()}`;
  const backupPath = `${configPath}.verikit-${suffix}.bak`;
  const temporary = `${configPath}.verikit-${suffix}.tmp`;
  try {
    await fs.writeFile(temporary, JSON.stringify(config, null, 2) + "\n", { mode: 0o600, flag: "wx" });
    if (await fs.readFile(configPath, "utf8") !== original) throw new Error("Config changed during setup; close the host and retry.");
    await fs.writeFile(backupPath, original, { mode: 0o600, flag: "wx" });
    await fs.rename(temporary, configPath);
  } finally {
    await fs.rm(temporary, { force: true });
  }
  return { changed: true, configPath, pluginRoot, backupPath };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const { values } = parseArgs({ options: {
      config: { type: "string" }, "plugin-root": { type: "string" }, "tool-agent": { type: "string" }, help: { type: "boolean" },
    } });
    if (values.help) console.log("node scripts/configure-openclaw.mjs --config <openclaw.json> [--plugin-root <built-package>] [--tool-agent <agent-id>]");
    else console.log(JSON.stringify(await configureOpenClaw({ configPath: values.config, pluginRoot: values["plugin-root"], toolAgent: values["tool-agent"] }), null, 2));
  } catch (error) {
    console.error(`verikit setup: ${error.message}`);
    process.exitCode = 1;
  }
}

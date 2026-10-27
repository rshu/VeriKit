#!/usr/bin/env node
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { configureOpenClaw } from "./configure-openclaw.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

export async function installMA({ hostRoot, configPath, packageRoot, toolAgent = "main", force = false } = {}) {
  if (!hostRoot || !configPath) throw new Error("Explicit --host-root <MA directory> and --config <openclaw.json> are required.");
  hostRoot = path.resolve(hostRoot);
  configPath = path.resolve(configPath);
  packageRoot = await fs.realpath(packageRoot ?? (existsSync(path.join(root, "openclaw.plugin.json")) ? root : path.join(root, "dist/verikit-openclaw")));
  const cliRoot = path.join(hostRoot, "resources/openclaw");
  const host = JSON.parse(await fs.readFile(path.join(cliRoot, "package.json"), "utf8"));
  if (host.version !== "2026.7.1-2") throw new Error("VeriKit requires MA's OpenClaw 2026.7.1-2.");
  const manifest = JSON.parse(await fs.readFile(path.join(packageRoot, "openclaw.plugin.json"), "utf8"));
  if (manifest.id !== "verikit") throw new Error("Use the built VeriKit OpenClaw package.");
  const config = JSON.parse(await fs.readFile(configPath, "utf8"));
  if (!config.agents?.list?.some(agent => agent.id === toolAgent)) throw new Error(`Configured agent not found: ${toolAgent}`);

  // Keep the native install and our registration on the same explicit profile.
  const stateDir = path.dirname(configPath);
  const result = spawnSync(process.execPath, [path.join(cliRoot, "openclaw.mjs"), "plugins", "install",
    ...(force ? ["--force"] : []), packageRoot], {
    env: { ...process.env, OPENCLAW_STATE_DIR: stateDir, OPENCLAW_CONFIG_PATH: configPath },
    stdio: "inherit", windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Plugin installation failed (${result.status ?? result.signal}); configuration registration was not run.`);
  try {
    return await configureOpenClaw({ configPath, pluginRoot: path.join(stateDir, "extensions/verikit"), toolAgent });
  } catch (error) {
    throw new Error(`Plugin files were installed, but configuration registration failed: ${error.message}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const { values } = parseArgs({ options: {
      "host-root": { type: "string" }, config: { type: "string" }, package: { type: "string" },
      "tool-agent": { type: "string" }, force: { type: "boolean" }, help: { type: "boolean" },
    } });
    if (values.help) console.log("node scripts/install-ma.mjs --host-root <MA directory> --config <openclaw.json> [--package <built-package>] [--tool-agent <agent-id>] [--force]");
    else {
      const result = await installMA({ hostRoot: values["host-root"], configPath: values.config,
        packageRoot: values.package, toolAgent: values["tool-agent"], force: values.force });
      console.log("VeriKit installed and registered for MA. Restart MA to load it.");
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error(`verikit MA install: ${error.message}`);
    process.exitCode = 1;
  }
}

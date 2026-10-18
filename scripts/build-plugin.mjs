#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { buildPlugin, HOSTS } from "../lib/plugin-builder.mjs";

const sourceRoot = fileURLToPath(new URL("../", import.meta.url));
try {
  const { values } = parseArgs({ options: { all: { type: "boolean" }, host: { type: "string" }, help: { type: "boolean" } } });
  if (values.help) {
    console.log("npm run build:plugins | npm run build:plugin -- --host <claude|codeagent|openclaw>");
  } else {
    if (values.all && values.host) throw new Error("Use either --all or --host.");
    const hosts = values.all ? HOSTS : [values.host ?? JSON.parse(await fs.readFile(path.join(sourceRoot, "plugin-target.json"), "utf8")).host];
    for (const host of hosts) console.log(await buildPlugin({ host, sourceRoot, outputRoot: path.join(sourceRoot, "dist") }));
  }
} catch (error) {
  console.error(`verikit build: ${error.message}`);
  process.exitCode = 1;
}

import { promises as fs } from "node:fs";
import path from "node:path";

export const HOSTS = Object.freeze(["claude", "codeagent", "openclaw"]);
const DECLARATIONS = Object.freeze({
  claude: { rootEnv: "CLAUDE_PLUGIN_ROOT", manifestDir: ".claude-plugin" },
  codeagent: { rootEnv: "CODEAGENT3_PLUGIN_ROOT", manifestDir: ".cac-plugin" },
});
const RUNTIME_FILES = ["verikit-cli.js", "contracts", "manifests", "compositions"];

function contains(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function bootstrap(host, entry, { inlineRoot = false } = {}) {
  const { rootEnv, manifestDir } = DECLARATIONS[host];
  // Root paths remain data, including spaces, Unicode and shell metacharacters.
  const source = [
    "const fs=require('node:fs'),p=require('node:path'),u=require('node:url');",
    `const value=${inlineRoot ? "process.argv[1]" : `process.env.${rootEnv}`};`,
    `if(!value)throw Error('Missing absolute ${rootEnv}');`,
    "const native=process.platform==='win32'?value.replace(/^\\/([a-zA-Z])\\//,(_,drive)=>drive+':/'):value;",
    `if(!p.isAbsolute(native))throw Error('Missing absolute ${rootEnv}');`,
    "const root=fs.realpathSync(native);",
    `if(JSON.parse(fs.readFileSync(p.join(root,'${manifestDir}/plugin.json'),'utf8')).name!=='verikit')throw Error('Invalid VeriKit plugin root');`,
    `const entry=p.join(root,'${entry}');`,
    `process.argv=[process.argv[0],entry,...process.argv.slice(${inlineRoot ? 2 : 1})];`,
    "import(u.pathToFileURL(entry).href).catch(e=>{console.error(e.message);process.exitCode=1});",
  ].join("");
  return `node -e "${source}"${inlineRoot ? ` "\${${rootEnv}}"` : ""}`;
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

export async function buildPlugin({ host, sourceRoot, outputRoot }) {
  if (!HOSTS.includes(host)) throw new Error(`Plugin host must be one of: ${HOSTS.join(", ")}.`);
  const source = await fs.realpath(path.resolve(sourceRoot));
  await fs.mkdir(path.resolve(outputRoot), { recursive: true });
  const output = await fs.realpath(path.resolve(outputRoot));
  const artifactRoot = path.join(output, `verikit-${host}`);
  if (contains(artifactRoot, source)) throw new Error("Plugin output must not replace the source tree or its ancestors.");
  const existing = await fs.lstat(artifactRoot).catch(error => {
    if (error.code !== "ENOENT") throw error;
  });
  if (existing && (!existing.isDirectory() || existing.isSymbolicLink())) throw new Error("Plugin output must be a dedicated directory, not a file or symlink.");

  // Validate committed input before touching an existing artifact.
  for (const entry of ["skills", "LICENSE", "README.md", ".claude-plugin/plugin.json", ...RUNTIME_FILES.map(name => `runtime/${name}`)]) {
    await fs.access(path.join(source, entry));
  }
  const pkg = JSON.parse(await fs.readFile(path.join(source, "package.json"), "utf8"));
  const manifest = JSON.parse(await fs.readFile(path.join(source, ".claude-plugin/plugin.json"), "utf8"));
  const stage = await fs.mkdtemp(path.join(output, `.verikit-${host}-`));
  try {
    await fs.mkdir(path.join(stage, "dist"));
    for (const entry of RUNTIME_FILES) await fs.cp(path.join(source, "runtime", entry), path.join(stage, "dist", entry), { recursive: true });
    for (const entry of ["skills", "LICENSE"]) await fs.cp(path.join(source, entry), path.join(stage, entry), { recursive: true });
    await fs.mkdir(path.join(stage, "lib"));
    for (const entry of ["routing.mjs", "kit-monitor.mjs"]) await fs.copyFile(path.join(source, "lib", entry), path.join(stage, "lib", entry));

    delete pkg.scripts;
    pkg.bin = { verikit: "./dist/verikit-cli.js" };
    pkg.files = ["dist", "skills", "lib", "README.md", "LICENSE"];
    if (host === "openclaw") {
      pkg.name = "@verikit/openclaw-plugin";
      pkg.description = "VeriKit — HarmonyOS Kit selection for OpenClaw 2026.7.1-2.";
      pkg.engines = { node: ">=22.22.3 <23 || >=24.15.0 <25 || >=25.9.0" };
      pkg.peerDependencies = { openclaw: "2026.7.1-2" };
      pkg.peerDependenciesMeta = { openclaw: { optional: true } };
      pkg.openclaw = {
        extensions: ["./lib/openclaw/entry.mjs"],
        // The pinned host normalizes numeric correction releases to 2026.7.1.
        compat: { pluginApi: "2026.7.1" },
        build: { openclawVersion: "2026.7.1-2", pluginSdkVersion: "2026.7.1-2" },
      };
      pkg.files.push("openclaw.plugin.json");
      const native = JSON.parse(await fs.readFile(path.join(source, "packaging/hosts/openclaw/openclaw.plugin.json"), "utf8"));
      native.version = pkg.version;
      await fs.cp(path.join(source, "lib/openclaw"), path.join(stage, "lib/openclaw"), { recursive: true });
      // Keep the CLI's 101-entry catalog unchanged. The host also discovers the
      // routing skill, but it is outside the directory scanned by the ranker.
      await fs.cp(path.join(source, "packaging/hosts/openclaw/skills"), path.join(stage, "host-skills"), { recursive: true });
      native.skills.push("./host-skills");
      await writeJson(path.join(stage, "openclaw.plugin.json"), native);
      pkg.files.push("host-skills");
      await fs.copyFile(path.join(source, "docs/openclaw.md"), path.join(stage, "README.md"));
      await fs.mkdir(path.join(stage, "scripts"));
      await fs.copyFile(path.join(source, "scripts/configure-openclaw.mjs"), path.join(stage, "scripts/configure-openclaw.mjs"));
      await fs.copyFile(path.join(source, "scripts/install-ma.mjs"), path.join(stage, "scripts/install-ma.mjs"));
      pkg.files.push("scripts");
    } else {
      const { manifestDir } = DECLARATIONS[host];
      if (host === "codeagent") {
        pkg.name = "@verikit/codeagent-plugin";
        pkg.description = "VeriKit — HarmonyOS Kit selection for CodeAgent.";
      }
      await fs.mkdir(path.join(stage, manifestDir));
      manifest.version = pkg.version;
      await writeJson(path.join(stage, manifestDir, "plugin.json"), manifest);
      const marketplace = JSON.parse(await fs.readFile(path.join(source, ".claude-plugin/marketplace.json"), "utf8"));
      marketplace.description = `VeriKit ${host} plugin marketplace.`;
      marketplace.plugins[0] = { ...marketplace.plugins[0], name: manifest.name, version: manifest.version, description: manifest.description };
      await writeJson(path.join(stage, manifestDir, "marketplace.json"), marketplace);
      await fs.mkdir(path.join(stage, "hooks"));
      await fs.copyFile(path.join(source, "hooks/run-hook.mjs"), path.join(stage, "hooks/run-hook.mjs"));
      const hooks = JSON.parse(await fs.readFile(path.join(source, "hooks/hooks.json"), "utf8"));
      for (const [event, rows] of Object.entries(hooks.hooks)) {
        const name = event === "UserPromptSubmit" ? "user-prompt-submit" : "pre-tool-use";
        for (const row of rows) for (const hook of row.hooks) hook.command = `${bootstrap(host, "hooks/run-hook.mjs")} "${name}"`;
      }
      await writeJson(path.join(stage, "hooks/hooks.json"), hooks);
      await fs.mkdir(path.join(stage, "commands"));
      await fs.writeFile(path.join(stage, "commands/verikit-route.md"), [
        "---", "name: verikit-route", "description: Rank HarmonyOS Kits, composition recipes and task-relevant references.",
        "allowed-tools: Bash, PowerShell", "---", "",
        "Run the bundled router against the user's task:", "", "```sh",
        `${bootstrap(host, "dist/verikit-cli.js", { inlineRoot: true })} route --task "$ARGUMENTS" --top 5 --compose --deep --refs 5`,
        "```", "", "Summarize top Kits, matched recipes, and deep_references. Follow routing.directive; ask for the user's choice on a conflict.",
        "Honor an existing selection. Read each selected Kit's SKILL.md and relevant reference docs under this plugin's skills directory before coding.", "",
      ].join("\n"));
      await fs.copyFile(path.join(source, "README.md"), path.join(stage, "README.md"));
      await fs.mkdir(path.join(stage, "docs"));
      await fs.copyFile(path.join(source, "docs/openclaw.md"), path.join(stage, "docs/openclaw.md"));
      pkg.files.push("docs");
      pkg.files.push(manifestDir, "hooks", "commands");
    }
    await writeJson(path.join(stage, "package.json"), pkg);
    await fs.rm(artifactRoot, { recursive: true, force: true });
    await fs.rename(stage, artifactRoot);
    return artifactRoot;
  } finally {
    await fs.rm(stage, { recursive: true, force: true });
  }
}

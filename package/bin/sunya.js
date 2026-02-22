#!/usr/bin/env node
/**
 * Sunya - Static analysis for EVM smart contracts
 * Cross-platform: Linux, macOS, Windows
 */

import { execSync, spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { platform } from "node:os";
import * as readline from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWindows = platform() === "win32";

const CONFIG_FILE = process.env.SUNYA_CONFIG || "sunya.config.json";
let CONTRACTS_DIR = process.env.SUNYA_CONTRACTS_DIR || "./contracts";

function resolveConfig() {
  const cfgPath = join(process.cwd(), CONFIG_FILE);
  if (existsSync(cfgPath)) {
    try {
      const raw = readFileSync(cfgPath, "utf8");
      const m = raw.match(/"contractsDir"\s*:\s*"([^"]+)"/);
      if (m) CONTRACTS_DIR = m[1].replace(/^\.\//, "");
    } catch (_) {}
  }
}

function printUsage() {
  console.log(`Sunya - Static analysis for EVM smart contracts

Usage: sunya scan [dir]
       sunya install
       sunya uninstall [-y]

  scan [dir]     Analyze .sol files in dir (default: ./contracts or ./src)
  install        Ensure Slither is installed
  uninstall     Remove sunya from your system
  uninstall -y  Remove without prompting

Environment:
  SUNYA_CONTRACTS_DIR  Directory to scan (default: ./contracts)
  SUNYA_CONFIG         Config file (default: sunya.config.json)
`);
}

function runAsync(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, {
      stdio: opts.silent ? "pipe" : "inherit",
      shell: isWindows,
      ...opts,
    });
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Exit ${code}`))));
  });
}

function findSolFiles(dir, max = 200) {
  const out = [];
  function walk(d) {
    if (out.length >= max) return;
    try {
      for (const e of readdirSync(d)) {
        const p = join(d, e);
        if (statSync(p).isDirectory() && !e.startsWith(".")) walk(p);
        else if (e.endsWith(".sol")) out.push(p);
      }
    } catch (_) {}
  }
  walk(dir);
  return out;
}

async function runUninstall(yes) {
  const selfPath = process.argv[1];
  const toRemove = [selfPath];

  // If we're the .js in share/sunya, also remove the wrapper in ~/.local/bin
  const home = process.env.HOME || process.env.USERPROFILE;
  if (home && (selfPath.includes("share/sunya") || selfPath.includes("share\\sunya")) && selfPath.endsWith("sunya.js")) {
    const wrapper = join(home, ".local", "bin", "sunya");
    if (existsSync(wrapper)) toRemove.push(wrapper);
  }
  // Windows: remove the .cmd launcher
  if (isWindows && home) {
    const winWrapper = join(home, "AppData", "Local", "sunya", "bin", "sunya.cmd");
    if (existsSync(winWrapper)) toRemove.push(winWrapper);
  }

  if (!yes) {
    console.log("This will remove:", toRemove.join(", "));
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const reply = await new Promise((res) => rl.question("Continue? [y/N] ", res));
    rl.close();
    if (!/^[yY]/.test(reply)) {
      console.log("Cancelled.");
      return;
    }
  }

  for (const p of toRemove) {
    try {
      unlinkSync(p);
      console.log(`Removed ${p}`);
    } catch (e) {
      console.error(`Failed to remove ${p}:`, e.message);
    }
  }
}

async function runInstall() {
  console.log("Installing Slither...");
  const attempts = [
    ["uv", ["pip", "install", "--system", "slither-analyzer"]],
    ["uv", ["pip", "install", "slither-analyzer"]],
    ["pip3", ["install", "slither-analyzer"]],
    ["pip", ["install", "slither-analyzer"]],
  ];
  for (const [cmd, args] of attempts) {
    try {
      await runAsync(cmd, args, { silent: true });
      console.log("Done. Run 'sunya scan' to analyze contracts.");
      return;
    } catch (_) {}
  }
  console.error("Failed to install Slither. Ensure Python and pip are installed.");
  console.error("  macOS: brew install python3");
  console.error("  Ubuntu: sudo apt install python3 python3-pip");
  console.error("  Windows: Install Python from python.org");
  process.exit(1);
}

async function runScan(dir) {
  resolveConfig();
  const d = dir || CONTRACTS_DIR;
  const candidates = [d, "./contracts", "./src"];
  let target = null;
  for (const c of candidates) {
    if (existsSync(c) && statSync(c).isDirectory()) {
      target = c;
      break;
    }
  }
  if (!target) {
    console.error("No contracts directory found (tried ./contracts, ./src)");
    process.exit(1);
  }

  const files = findSolFiles(target);
  if (files.length === 0) {
    console.log("No .sol files found in", target);
    return;
  }

  console.log(`Found ${files.length} Solidity file(s) in ${target}\n`);

  const slitherCmd = isWindows ? "slither" : "slither";
  let hasSlither = false;
  try {
    execSync(isWindows ? `where ${slitherCmd}` : `command -v ${slitherCmd}`, { stdio: "pipe", encoding: "utf8" });
    hasSlither = true;
  } catch (_) {}

  if (!hasSlither) {
    console.log("Slither not found. Run: sunya install");
    return;
  }

  console.log("Running Slither...");
  const p = spawn(slitherCmd, [target], { stdio: "inherit", shell: isWindows });
  await new Promise((res) => p.on("close", res));
  console.log("\nScan complete.");
}

async function main() {
  const cmd = process.argv[2] || "scan";
  const arg = process.argv[3];

  switch (cmd) {
    case "scan":
      await runScan(arg);
      break;
    case "install":
      await runInstall();
      break;
    case "uninstall":
      await runUninstall(arg === "-y" || arg === "--yes");
      break;
    case "-h":
    case "--help":
      printUsage();
      break;
    default:
      console.error(`Unknown command: ${cmd}`);
      printUsage();
      process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

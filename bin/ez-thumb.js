#!/usr/bin/env node
/**
 * ez-thumb CLI
 *
 * Installs the ez-thumb Claude Code skill into either the user-global
 * directory (~/.claude/skills/ez-thumb/) or the current project's
 * .claude/skills/ez-thumb/ directory.
 *
 * The skill is self-configuring: /ez-thumb-onboard writes the operator's
 * channel profile, chosen data source, and competitor corpus back into the
 * installed skill directory. Because of that, `update` preserves those files
 * by default so an upgrade never wipes an operator's onboarding.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'ez-thumb';
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const SKILL_SRC = path.join(PACKAGE_ROOT, 'skill');
const PKG = require(path.join(PACKAGE_ROOT, 'package.json'));

// Files written by /ez-thumb-onboard. Preserved across `update`.
const OPERATOR_DATA = [
  path.join('context', 'channel-profile.md'),
  path.join('context', 'data-source.md'),
  'reference'
];

function userClaudeDir() {
  return path.join(os.homedir(), '.claude');
}

function projectClaudeDir() {
  return path.join(process.cwd(), '.claude');
}

function resolveSkillTarget(opts) {
  const base = opts.project ? projectClaudeDir() : userClaudeDir();
  return path.join(base, 'skills', SKILL_NAME);
}

function resolveCommandsDir(opts) {
  const base = opts.project ? projectClaudeDir() : userClaudeDir();
  return path.join(base, 'commands');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (entry.isFile()) fs.copyFileSync(s, d);
  }
}

function rmrf(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function stashOperatorData(target) {
  const stash = fs.mkdtempSync(path.join(os.tmpdir(), 'ez-thumb-stash-'));
  let saved = 0;
  for (const rel of OPERATOR_DATA) {
    const from = path.join(target, rel);
    if (!fs.existsSync(from)) continue;
    const to = path.join(stash, rel);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
    saved += 1;
  }
  return { stash, saved };
}

function restoreOperatorData(stash, target) {
  let restored = 0;
  for (const rel of OPERATOR_DATA) {
    const from = path.join(stash, rel);
    if (!fs.existsSync(from)) continue;
    const to = path.join(target, rel);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
    restored += 1;
  }
  rmrf(stash);
  return restored;
}

function isConfigured(target) {
  const ds = path.join(target, 'context', 'data-source.md');
  if (!fs.existsSync(ds)) return false;
  return !/status:\s*unconfigured/i.test(fs.readFileSync(ds, 'utf8'));
}

function commandStubs() {
  return {
    'ez-thumb.md': `---
name: ez-thumb
description: Package a YouTube video into a title plus thumbnail concepts, scored against the Four Cs and against your own competitor corpus. Run /ez-thumb-onboard first.
---

This command routes to the \`ez-thumb\` skill (task \`package\`).

If the skill has not been onboarded yet, run \`/ez-thumb-onboard\` first.
If the skill is not installed at all:

    npx ez-thumb install
`,
    'ez-thumb-onboard.md': `---
name: ez-thumb-onboard
description: One-time setup for ez-thumb. Builds your channel profile, picks how competitors get discovered (vidIQ MCP or your own list), pulls their top thumbnails through the Apify MCP, reads every image, and writes all of it back into the skill.
---

This command routes to the \`ez-thumb\` skill (task \`onboard\`).

Run this once. After it finishes, use \`/ez-thumb\` for every video.
`
  };
}

function writeCommandStubs(opts) {
  const dir = resolveCommandsDir(opts);
  fs.mkdirSync(dir, { recursive: true });
  const stubs = commandStubs();
  for (const [name, body] of Object.entries(stubs)) {
    fs.writeFileSync(path.join(dir, name), body);
  }
  return { dir, count: Object.keys(stubs).length };
}

function removeCommandStubs(opts) {
  const dir = resolveCommandsDir(opts);
  let removed = 0;
  for (const name of Object.keys(commandStubs())) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      removed += 1;
    }
  }
  return { dir, removed };
}

function install(opts) {
  const target = resolveSkillTarget(opts);
  const exists = fs.existsSync(target);

  if (exists && !opts.force) {
    console.error(
      `[ez-thumb] Skill already installed at:\n  ${target}\n\n` +
        `Run with --update to upgrade (your onboarding is preserved), or --uninstall to remove.`
    );
    process.exitCode = 1;
    return;
  }

  let stash = null;
  let saved = 0;
  if (exists && opts.force) {
    if (!opts.clean) ({ stash, saved } = stashOperatorData(target));
    rmrf(target);
  }

  copyDir(SKILL_SRC, target);

  let restored = 0;
  if (stash) restored = restoreOperatorData(stash, target);

  console.log('[ez-thumb] Skill installed:');
  console.log(`  ${target}`);
  if (saved > 0) {
    console.log(`[ez-thumb] Preserved ${restored} onboarding item(s): profile, data source, corpus.`);
    console.log('           Use --clean with --update to wipe them and start over.');
  }

  if (opts.withCommands) {
    const result = writeCommandStubs(opts);
    console.log(`[ez-thumb] Command stubs written (${result.count}):`);
    console.log(`  ${result.dir}`);
  }

  console.log('');
  console.log('Done. Restart Claude Code, then:');
  if (isConfigured(target)) {
    console.log('  /ez-thumb              package a video (already onboarded)');
  } else {
    console.log('  /ez-thumb-onboard      one time, builds your competitor corpus');
    console.log('  /ez-thumb              every video after that');
  }
  console.log('');
  console.log('Needs at minimum: the Apify MCP, for pulling competitor thumbnails.');
  console.log('Optional: vidIQ MCP for auto competitor discovery. Run `npx ez-thumb doctor` for the checklist.');
}

function uninstall(opts) {
  const target = resolveSkillTarget(opts);
  let removedSkill = false;

  if (fs.existsSync(target) && isConfigured(target) && !opts.force) {
    console.error(
      `[ez-thumb] This install is onboarded. Removing it deletes your channel profile and competitor corpus.\n` +
        `  ${target}\n\n` +
        `Re-run with --force to confirm:  npx ez-thumb uninstall --force`
    );
    process.exitCode = 1;
    return;
  }

  if (fs.existsSync(target)) {
    rmrf(target);
    removedSkill = true;
  }

  const cmdResult = opts.withCommands ? removeCommandStubs(opts) : { removed: 0 };

  if (!removedSkill && cmdResult.removed === 0) {
    console.log(`[ez-thumb] Nothing to uninstall at ${target}`);
    return;
  }
  if (removedSkill) console.log(`[ez-thumb] Removed skill: ${target}`);
  if (cmdResult.removed > 0) {
    console.log(`[ez-thumb] Removed ${cmdResult.removed} command stub(s) from ${cmdResult.dir}`);
  }
}

function where(opts) {
  console.log(resolveSkillTarget(opts));
}

function status(opts) {
  const target = resolveSkillTarget(opts);
  if (!fs.existsSync(target)) {
    console.log(`ez-thumb v${PKG.version}\n  not installed at ${target}\n  run: npx ez-thumb install`);
    return;
  }
  const configured = isConfigured(target);
  console.log(`ez-thumb v${PKG.version}`);
  console.log(`  installed:  ${target}`);
  console.log(`  onboarded:  ${configured ? 'yes' : 'no  (run /ez-thumb-onboard)'}`);

  const refDir = path.join(target, 'reference');
  if (fs.existsSync(refDir)) {
    const sets = fs
      .readdirSync(refDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    if (sets.length) {
      console.log(`  corpus:     ${sets.join(', ')}`);
      const dated = sets
        .map((s) => (s.match(/^(\d{4}-\d{2}-\d{2})/) || [])[1])
        .filter(Boolean)
        .sort();
      const newest = dated[dated.length - 1];
      if (newest) {
        const days = Math.floor((Date.now() - Date.parse(newest)) / 86400000);
        let verdict = 'fresh';
        if (days > 90) verdict = 'STALE, run /ez-thumb refresh';
        else if (days > 60) verdict = 'aging, consider /ez-thumb refresh';
        console.log(`  age:        ${days} days (${verdict})`);
      }
    } else {
      console.log('  corpus:     none yet');
    }
  }
}

function doctor(opts) {
  const target = resolveSkillTarget(opts);
  console.log(`ez-thumb v${PKG.version} - readiness check\n`);

  const installed = fs.existsSync(target);
  console.log(`  ${installed ? 'OK     ' : 'MISSING'}  skill installed${installed ? '' : '   ->  npx ez-thumb install'}`);
  if (installed) {
    const configured = isConfigured(target);
    console.log(`  ${configured ? 'OK     ' : 'TODO   '}  onboarded${configured ? '' : '        ->  run /ez-thumb-onboard inside Claude Code'}`);
  }

  console.log('');
  console.log('  MCP servers (ez-thumb cannot probe these from the CLI, check inside Claude Code):');
  console.log('');
  console.log('    REQUIRED  apify   pulls competitor videos, stats, and thumbnail URLs');
  console.log('                      https://apify.com  ->  API token  ->  add the Apify MCP');
  console.log('');
  console.log('    OPTIONAL  vidiq   auto-discovers who your competitors actually are');
  console.log('                      skip it and you just name your competitors yourself');
  console.log('');
  console.log('    OPTIONAL  any image generator MCP (Higgsfield, or vidIQ thumbnail gen)');
  console.log('                      without one you still get concepts, layouts, and copy-paste prompts');
  console.log('');
  console.log('Inside Claude Code, run /ez-thumb-onboard and it will verify each of these live.');
}

function help() {
  console.log(`ez-thumb v${PKG.version}  -  YouTube thumbnail and title packaging for Claude Code

Onboard once. It learns your niche from real competitor thumbnails,
then packages every video against that evidence instead of generic advice.

Usage:
  npx ez-thumb <command> [flags]

Commands:
  install         Install skill to ~/.claude/skills/${SKILL_NAME}/
  update          Upgrade in place, keeping your onboarding data
  uninstall       Remove skill from the target directory
  status          Show install state, onboarding state, and corpus age
  doctor          Print the MCP readiness checklist
  where           Print the target install path and exit
  --help, -h      Show this message
  --version, -v   Show version

Flags:
  --project       Install into ./.claude/ instead of ~/.claude/
  --with-commands Also write /${SKILL_NAME} and /${SKILL_NAME}-onboard slash command stubs
  --clean         With --update: also wipe profile, data source, and corpus
  --force         With --uninstall: confirm deleting an onboarded install

Examples:
  npx ez-thumb install --with-commands
  npx ez-thumb status
  npx ez-thumb update

Once installed:
  /${SKILL_NAME}-onboard    one time
  /${SKILL_NAME}            every video

Repo:  https://github.com/charlesdove977/ez-thumb
More:  https://www.charlieautomates.com/
`);
}

function parseArgs(argv) {
  const opts = { project: false, withCommands: false, force: false, clean: false };
  let cmd = null;
  for (const arg of argv) {
    if (arg === '--project') opts.project = true;
    else if (arg === '--with-commands' || arg === '--commands') opts.withCommands = true;
    else if (arg === '--update' || arg === '--force' || arg === '-f') opts.force = true;
    else if (arg === '--clean') opts.clean = true;
    else if (arg === '--help' || arg === '-h') cmd = '__help';
    else if (arg === '--version' || arg === '-v') cmd = '__version';
    else if (!arg.startsWith('-') && cmd === null) cmd = arg;
  }
  return { cmd, opts };
}

function main() {
  const { cmd, opts } = parseArgs(process.argv.slice(2));
  switch (cmd) {
    case 'install': install(opts); return;
    case 'update': opts.force = true; install(opts); return;
    case 'uninstall': uninstall(opts); return;
    case 'status': status(opts); return;
    case 'doctor': doctor(opts); return;
    case 'where': where(opts); return;
    case '__version': console.log(PKG.version); return;
    case '__help':
    case null:
    default: help(); return;
  }
}

main();

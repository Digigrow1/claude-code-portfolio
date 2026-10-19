// Shared rules for which files the FileChanged code-review hook watches and reviews.
import { execFileSync } from 'node:child_process';
import path from 'node:path';

export const REVIEWABLE_EXTENSIONS = new Set([
  '.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx',
  '.css', '.html', '.json',
  '.conf', '.yml', '.yaml', '.sh', '.ps1',
]);
export const REVIEWABLE_BASENAMES = new Set(['Dockerfile']);
export const SKIPPED_BASENAMES = new Set(['package-lock.json']);
export const SKIPPED_DIRS = ['node_modules/', 'dist/', '.git/', '.claude/worktrees/', '.claude/reviews/'];
export const MAX_FILE_BYTES = 150 * 1024;
const MAX_WATCHED_FILES = 2000;

export function projectDir(input = {}) {
  return path.resolve(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd());
}

// Repo-relative POSIX path, or null when the file is outside the project.
export function toRelative(root, absPath) {
  const rel = path.relative(root, path.resolve(absPath));
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return rel.split(path.sep).join('/');
}

export function isReviewable(relPath) {
  if (!relPath) return false;
  const normalized = relPath.replace(/\\/g, '/');
  if (SKIPPED_DIRS.some((dir) => normalized.startsWith(dir) || normalized.includes(`/${dir}`))) return false;
  const base = path.posix.basename(normalized);
  if (SKIPPED_BASENAMES.has(base)) return false;
  return REVIEWABLE_BASENAMES.has(base) || REVIEWABLE_EXTENSIONS.has(path.posix.extname(base).toLowerCase());
}

// Tracked files plus untracked files that are not gitignored.
export function listReviewableFiles(root) {
  let out;
  try {
    out = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return [];
  }
  return [...new Set(out.split('\0'))]
    .filter(isReviewable)
    .slice(0, MAX_WATCHED_FILES)
    .map((rel) => path.join(root, rel));
}

export async function readStdinJson() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8').trim();
  return text ? JSON.parse(text) : {};
}

// Set on the reviewer's own `claude -p` process so its hooks never re-trigger a review.
export const RECURSION_GUARD_ENV = 'CLAUDE_FILE_REVIEW_ACTIVE';
// Set to 1 in your shell (or settings.local.json "env") to switch the review hook off.
export const DISABLE_ENV = 'CLAUDE_FILE_REVIEW_DISABLED';

export function hookDisabled() {
  return process.env[RECURSION_GUARD_ENV] === '1' || process.env[DISABLE_ENV] === '1';
}

#!/usr/bin/env node
// SessionStart + FileChanged hook: tells Claude Code which files to watch for FileChanged.
// A FileChanged matcher only accepts literal filenames in the project root, so the
// watch list for the whole source tree is supplied dynamically through `watchPaths`.
// Re-running on every FileChanged picks up files created since the session started.
import { hookDisabled, listReviewableFiles, projectDir, readStdinJson } from './lib/reviewable.mjs';

if (hookDisabled()) process.exit(0);

let input = {};
try {
  input = await readStdinJson();
} catch {
  // Malformed input: still emit a watch list based on the environment.
}

const hookEventName = input.hook_event_name === 'FileChanged' ? 'FileChanged' : 'SessionStart';
const watchPaths = listReviewableFiles(projectDir(input));

process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName, watchPaths } }));

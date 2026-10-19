# 0011. Automated code review on file change (Claude Code hook)

- **Date:** 2026-10-19
- **Status:** Accepted
- **Phase:** all

## Context
Every changed source file should get a code review, whether Claude, a script or the user's editor made the change. Claude Code's `FileChanged` hook fires on any on-disk change, but it has these limits:
- Its `matcher` only registers literal filenames in the project root. It has no globs.
- It supports only `command`, `http` and `mcp_tool` hooks, not `agent` hooks.
- It can't block the change.

## Decision
- **Subagent:** `.claude/agents/code-reviewer.md` defines a read-only reviewer that has only the Read, Grep and Glob tools and uses the `sonnet` model. It loads `CLAUDE.md` and the relevant ADRs, reviews the whole file with the diff as the focus, and reports only verified findings. Its output format starts with a parseable `VERDICT:` line.
- **Watch list:** `.claude/hooks/watch-source-files.mjs` runs on `SessionStart` and on every `FileChanged`. It returns `watchPaths` for every tracked or untracked, non-ignored source/config file, as filtered by `.claude/hooks/lib/reviewable.mjs`.
- **Review:** `.claude/hooks/review-changed-file.mjs` is an async `FileChanged` hook. It does the following:
  - debounces bursts of saves (4 s);
  - skips content that matches `HEAD` or was already reviewed (sha256);
  - runs at most 2 reviews at once;
  - runs `claude -p --agent code-reviewer` with hooks disabled, an environment-variable recursion guard, and `dontAsk` permission mode;
  - writes the report to `.claude/reviews/<path>.md` (gitignored);
  - returns a summary as `systemMessage`, which Claude reads on its next turn.
- Hook scripts are Node (`.mjs`) in exec form (`command: node`, `args: [...]`). Node is required on the host anyway, the folder path contains spaces, and `jq` isn't installed.

## Alternatives considered
- **`PostToolUse` on `Write|Edit` with an `agent` hook:** this is simpler, but it misses changes made by `Bash` or by an editor, and it blocks Claude while the review runs.
- **A literal-filename `FileChanged` matcher:** it can't cover the source tree without listing every file by hand.

## Consequences
- Each reviewed change costs one headless Claude run, about 20–30 s. Reviews run in the background.
- Turn the hook off with `CLAUDE_FILE_REVIEW_DISABLED=1` (shell or `.claude/settings.local.json` `env`), or from the `/hooks` menu. Choose a different model with `CLAUDE_FILE_REVIEW_MODEL`.
- A file created mid-session joins the watch list the next time any watched file changes, or at the next session start.
- `.claude/` is in `.dockerignore`, so worktrees and review output never enter the image build context.

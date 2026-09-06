# dev-methodology preferences (user answers — change only when the user does)
commit: claude-allowed
push-branch: claude-allowed
create-pr: claude-allowed
merge-pr: human-only          # and a merge onto main is a blocking wait anyway
feature-merge: squash         # matches history: PRs land on main as one commit "(#N)"
workstream-merge: squash
tracking: none                # no issue per change; the PR body carries the why
reviewers: none               # never guessed — requesting review notifies a human
assignee: @me
labels: documentation         # only label in this repo that fits docs work
# repo labels available: bug, documentation, duplicate, enhancement,
# good first issue, help wanted, invalid, question, wontfix
model-strategy: current-everywhere   # S/M only so far

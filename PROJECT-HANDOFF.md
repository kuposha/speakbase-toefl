# Speakbase handoff

## 2026-11-25 — Task 01, package 1.1

Status: Task 01 IN_PROGRESS; vocabulary/navigation package AUTO_TESTED and PUSHED.

- Commit: 91dbe710ea4a5a234df9d3b44f89b32d1ed4a681. Local and origin/main matched after push.
- Preserved a local backup of the 28 pre-existing modified/new files outside the repository before editing.
- Integrated dictionary: 1,840 cards, 1,814 unique expressions, 23 categories. Review schedule: 1/3/7/14/30/60 days. Mastered cards with scheduled reviews now remain eligible for review and show review controls/date. Explicitly marking a word mastered schedules a 30-day review. Legacy mastered cards without a schedule remain unchanged.
- Search, category, filter and pagination are retained when updating a word. Updated cache versions and corrected a stray literal backslash-n in CSS.
- Committed related prior navigation/UI changes, tests and the existing preview compose configuration; preview tunnel was not started.
- Passed: grammar content/manual-review integrity, vocabulary (including executable review-cycle regression), interface, mobile compatibility, learning system, AI review interface, diff check. Browser mobile-header regression passed for both profiles at six widths (320–430px), including mastered review at 30 to 60 days.
- Real authenticated accounts and physical phones were not tested. GitHub Pages deployment requires separate verification.

## Next concrete package (1.2)

Review the existing uncommitted AI-engine changes (app.py, Dockerfile, compose, README, notices). Validate the grammar-review endpoint, auth, input limits, error handling and license constraints; use mocked tests without downloading models or starting a public tunnel. Preserve unrelated changes. Commit only verified files. Then review exam Listening/Writing changes, source matrices and remaining documentation. Do not restart the 91-lesson audit or begin task 02 until task 01 is accounted for.

Remaining pre-existing work: 15 modified tracked files plus 4 untracked files immediately after package 1.1. Never discard user work or publish secrets. Real account/device QA and independent editorial review remain open.

## Grammar priority override — 2026-11-25

User explicitly moved B1, A2, A1, source review, practice coverage, daily integration and TOEFL linking ahead of the pending task 01 cleanup. Preserve all unrelated dirty files. Continue with B1-04.

B1-01 (36641b6), B1-02 and B1-03 (654e1a2) have expanded theory, original 24 closed tasks each, open-task rubrics and matching runtime/Markdown snapshots. GR-02 theory text was checked; GR-03/GR-05, source exercise pages, visual review and learner acceptance are still pending. Keep PARTIAL in the manual review log. The new engine archives old draft answers when reviewed content version changes. Bulk browser and content-integrity tests passed; no real-account testing. Remote main matched 654e1a2. Next: B1-04 through B1-22, then A2 and A1, then source/coverage checks across all levels, daily route migration and TOEFL links. Never equate structural QA with editorial approval.

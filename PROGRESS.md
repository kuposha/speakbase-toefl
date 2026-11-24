# Speakbase progress

- [x] Keep existing local checkout and local exam changes.
- [x] Calendar selects a dated topic and preserves other lesson drafts.
- [x] Validate all scheduled dates for both profiles and 790 minutes per full week.
- [ ] Dedicated lesson content and exercises for all calendar dates.
- [ ] Complete and review banks for all four skills and 24 unique full-length mocks.
- [ ] Browser regression, microphone, two-account auth and storage isolation.
- [ ] Publish and verify final GitHub Pages deployment.

## Grammar enrichment
- Added one distinct Russian usage note with examples and common pitfalls to all 46 units.
- Connected notes to the lesson theory and correction screens.
- Validated all 92 Reading/Writing lesson build combinations and keyed choices in Node.
- Full exercise variety, individual content review and browser scenarios remain open.

## Exercises and storage
- Integrated Sentence Building and Answer Expansion into all 46 topics and checked both lesson variants (92 builds).
- Connected new recordings to the existing private user-files bucket and namespaced the local cache by account.
- Confirmed the project has two Auth users and inspected owner-only progress and Storage policies.
- Verified media save/download and separation with mocked Storage. Real login, microphone and cross-device sync remain unverified.

## Release verification
- Dated lessons rotate source material by date and record the intended lesson date on completion.
- Added test-course.cjs. All 1,616 date/profile/skill combinations passed six-stage and answer-key checks.
- The dated route reaches 100 Reading texts for each profile and 51/54 Listening scripts for Marina/Vladlen. Listening scripts include speech synthesis.
- GitHub API returned 404 for the Pages configuration. Final publishing, real account/browser tests and the 24 full-length forms remain open.

## Exam studio continuation (2026-11-24)
- Repaired incomplete Reading source; added 72 original short academic passages and connected the bank. 24 fixed-route Reading sections, 50 questions each (1,200 distinct source/question pairs).
- Added 24 Writing sections, 12 items each (240 sentence tasks, 24 email prompts, 24 academic discussions); added word-selection controls and text fallback.
- Added first Listening section (47 questions; all four task types; 22 generated English WAV files, single synthetic voice). Remaining 23 Listening sections are not yet written.
- Existing Speaking bank: 24 sections of 11 items, 264 WAV files. Reading, Writing and Speaking each have 24 sections at planned length; one complete 120-item fixed-route mock. These are unofficial practice tasks, not an adaptive ETS simulator or official scoring.
- Added test-exam-data.cjs; all 1,799 distinct item checks and WAV file checks passed. test-exam-browser.cjs passed: 1 complete mock, 73 sections, 1,799 answers through UI, simulated microphone recording and reload, timer expiry, zero page errors. Real accounts and physical microphone not verified. Academic materials still need editorial/difficulty review.
- Latest work is local, not published. Next: 23 Listening banks and audio, real-account/browser QA, course content review, regression, publication.
- Regression: fixed schedule screen not updating immediately after saving. Re-ran test-browser.cjs: both synthetic profiles passed eight screens, all 404 dates each, schedule editing, materials, reload, Speaking, audio and answer history; 46 complete lessons and 2,942 UI transitions. test-exam-browser.cjs re-run also passed Listening playback and interactive word controls; all 1,799 responses, zero page errors. Pages packaging succeeded. No real Supabase logins tested; latest revision remains local.

## Complete fixed-route practice release (2026-11-24)
- [x] 24/24 full fixed-route variants; 2,880 distinct items, 96 sections, 696 distinct Listening scripts (MP3), 264 Speaking recordings (WAV).
- [x] Full-route one-use audio; separate section practice supports replay; review distinguishes skipped items.
- [x] Automated content checks: all 46 grammar topics with explanatory notes, 1,616 date/skill combinations, all exam keys and file references.
- [x] Browser run: 24 full forms, 96 sections, 2,880 submitted answers, MP3 playback, one-use persistence after reload, synthetic microphone recording and playback, timer expiry, zero page errors.
- [x] Physical microphone: actual browser media stream and nonempty WebM/Opus recording; sample not retained or uploaded.
- [x] Supabase configuration audit: two personal confirmed profiles, owner-only progress/storage policies, private user-files bucket. Real sign-in and cross-device sync require authorized account access and remain unverified.
- [ ] Independent editorial and psychometric calibration of the entire bank (not a validated ETS adaptive exam).
- [ ] Confirm deployment of this revision on GitHub Pages.


## QA continuation (2026-11-24)
- Installed Playwright Core globally on the development machine (no project dependency changes).
- Fixed local browser-test server allowlist/MIME handling for the existing favicon.svg; this removed a false 404 regression.
- Re-ran content, course and exam data tests successfully: 46 grammar units; 808 date/skill combinations per profile; 100 Reading and 120 Listening source counts per profile; 24/24 fixed-route forms with 2,880 distinct exam items.
- Re-ran local browser regression successfully in Edge: both synthetic profiles, 46 lessons, 2,942 UI transitions, schedule editing, reload, audio and history; no favicon or page errors.
- Re-ran exam browser test successfully: 24 forms, 96 sections, 2,880 responses, audio playback, persisted state, simulated microphone and timer expiry; no browser errors.
- Re-ran public-site browser test successfully: published site returned HTTP 200 and passed desktop (1440px) and mobile (390px) checks, including 24-form bank and auth gate.
- Packaged pages locally; all test suites listed above passed.
- Fixed test harness committed and pushed: 29a8c4b. Working tree clean.
- Real Supabase authentication/cross-device sync cannot be verified in this run: disposable QA credentials are not configured (QA_ACCOUNTS absent). No real credentials requested or exposed. Editorial/psychometric calibration remains outstanding.

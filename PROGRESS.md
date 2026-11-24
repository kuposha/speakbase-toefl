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


## Calendar topic coverage correction (2026-11-24)
- Marina's dated calendar previously began at grammar unit index 3, so the 404-day route only exposed 43 of 46 topics. Changed the calendar progression to include the entire 46-topic sequence for both profiles; catalog/progress state remains separate.
- Strengthened test-course.cjs to assert all 46 topics are scheduled for each profile across the full 404-date span.
- Strengthened test-browser.cjs to assert 46 unique calendar topics for each profile.
- Both profiles now pass coverage: 404 dates, 46 topics, 808 date/skill builds each. Browser regression passed for both profiles; Marina also completed all 46 lesson catalog flows.


## Auth and content QA (2026-11-24)
- Added test-content-quality.cjs: all banks passed completeness, uniqueness, key presence and distribution, scrambled token bank, and audio checks. Reading answer-position distribution 118/123/112/127; Listening 283/282/280/283.
- Spot-reviewed selected forms (1, 6, 12, 18, 24) across Reading/Listening and sampled Writing prompts. Answer/source alignment passed for sampled items; Listening rationales are often generic. This is sampling, not full independent editorial review.
- Live Supabase project active/healthy. RLS enabled on learning_progress with owner-only SELECT/INSERT/UPDATE; private user-files bucket has owner-folder policies for all four operations.
- Auth inventory: 4 users (registered + QA fixture per profile), all confirmed. Sign-in history exists but does not prove fresh login. 3 progress rows. QA_ACCOUNTS env missing, so real auth/sync browser test cannot run without disposable credentials.
- Supabase advisors: no performance/health issues; security warning leaked-password protection disabled.
- Full regression after review: 24 forms/2,880 answers, both synthetic profiles, public HTTP 200 desktop/mobile, all content banks and audio; no browser JS errors.
- Added QA-REPORT.md. Remaining: fresh real login/recovery, cross-device sync, authenticated mic upload/download, full editorial review, leaked-password protection, verify Pages deployment SHA.


## Deployment SHA verification (2026-11-24)
- GitHub Pages deployment for 4a11fdc succeeded. Normalized downloaded published files course.js, style.css, app.js and index.html match local files. Public smoke tests returned HTTP 200 on 1440px and 390px.
- The Pages workflow now runs test-content-quality.cjs before deploying.


## Learner feedback fixes (2026-11-24)
- Daily lesson screen now identifies weekday/date, today's grammar topic, and daily practice focus.
- Grammar topic step is now a structured lecture block with topic overview, explanatory note, example, application prompt, contextual example, and expandable examples/typical errors before exercises.
- Multiple-choice questions now generate four unique options with deterministic shuffling; course regression checks every scheduled lesson for option count, uniqueness, and answer-key presence.
- Checked answers now have explicit green/red status and answer highlighting; incorrect closed-answer tasks show the correct answer separately.
- `test-course.cjs` passed for both profiles: 808 date/skill combinations, 46 scheduled grammar topics each. Content QA, exam data, and course-content tests passed. Browser QA was run with Edge and Playwright Core installed in a temporary QA folder: 46 lessons and 2,942 UI transitions for Marina; both profiles passed screen, schedule, materials, reload, Speaking, audio, and history checks. Daily lecture, four-option MCQs, red incorrect feedback, and correct-answer display were verified.


## Release-readiness status (2026-11-24)
- Current 2026 TOEFL fixed-route mock studio: 24 complete 120-item variants (Reading 50 / Listening 47 / Writing 12 / Speaking 11), 90 minutes of section base timing, with explicit disclosure that this is not ETS adaptive delivery or official scoring.
- Removed the old 34-task / 60-minute legacy simulation from the visible TOEFL page to avoid presenting two conflicting mock formats.
- Dashboard progress now reports 46-lesson course completion separately from practice activity. New exam-studio answers are included in skill activity; only objectively keyed answers contribute to accuracy, while open Writing/Speaking responses remain unscored.
- Latest regression: goal-progress, practice bank/browser, exam browser, main browser for both profiles, interface and mobile compatibility passed. See QA-REPORT.md and WORK-REPORT.md.
- Still required before calling the product fully ready: real two-account auth/recovery/sync and authenticated Storage tests; independent editorial/psychometric review; open-response self-review rubrics; Supabase leaked-password protection; explicit release approval, deployment and public verification.

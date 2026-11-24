# Speakbase QA report — 24 November 2026

## Verified
- Supabase project status: ACTIVE_HEALTHY; project region eu-central-1.
- Public progress table has RLS enabled, user_id primary key and FK to auth.users. SELECT/INSERT/UPDATE policies constrain rows to auth.uid() = user_id; UPDATE also checks WITH CHECK.
- Private Storage bucket user-files: public=false. SELECT/INSERT/UPDATE/DELETE policies require authenticated owner UUID to match first folder segment.
- Auth user inventory: 4 users total for Speakbase profile metadata (one registered account and one QA fixture per profile); all email-confirmed. Sign-in history exists for 2 Marina-profile users and 1 Vladlen-profile user. Progress rows: 3 total. This is configuration/account evidence, not a successful fresh login test.
- Supabase security advisor: one warning, leaked-password protection disabled. Performance and health advisors report no findings.
- QA_ACCOUNTS env is absent; test-cloud-browser.cjs cannot run without disposable fixture credentials. No passwords were retrieved, exposed, or changed. Real fresh sign-in and cross-device sync remain unverified.

## Exam content checks
- Reading: 1,200 items across 24 forms; 720 Complete the Words gaps, 120 Read in Daily Life, 360 Read an Academic Passage. All choices unique per item, answer present, answer positions distributed 118/123/112/127.
- Listening: 1,128 items, 696 unique scripts/audio files; 408 Choose a Response, 240 Conversation, 192 Announcement, 288 Academic Talk. Keys are balanced 283/282/280/283. All audio files passed MP3 signature/size checks.
- Writing: 288 items; 240 Build a Sentence, 24 Email and 24 Academic Discussion. Each email/discussion prompt is unique across forms. Sentence token banks are scrambled.
- Speaking: 264 distinct prompts and 264 valid WAV files.
- Spot review sampled forms 1, 6, 12, 18 and 24 across Reading/Listening plus Writing prompts. The sampled keys were aligned with source text and options; explanations are adequate but some Listening rationales are generic. This is sampling, not an independent review of every item.
- Fixed-route practice is not an ETS adaptive test and its scores are not official TOEFL scores.

## Regression tests
- test-exam-browser.cjs: 24 full forms, 96 sections, 2,880 answers through UI, audio playback, simulated microphone record/reload, timer expiry, no JS errors.
- test-browser.cjs: both synthetic profiles, 404 dates/46 topics, 46 lesson flows for Marina, 2,942 UI transitions, schedule/material/audio/history checks.
- test-public.cjs: deployed URL HTTP 200, desktop 1440 and mobile 390.
- test-content-quality.cjs and test-exam-data.cjs: all content banks, keys, audio, lengths, uniqueness. test-course.cjs: 808 date/skill builds per profile and 46 topics each.

## Remaining release checks
1. Fresh sign-in using both real accounts and recovery flow.
2. Real two-device progress sync and owner/peer isolation using authenticated sessions.
3. Confirm microphone capture in each real account and cloud upload/download (previous physical mic test was performed outside authenticated account flow).
4. Full independent editorial review; this report includes only automated checks and spot sampling.
5. Enable leaked-password protection in Supabase Auth settings.
6. Deployment verification: GitHub Actions Pages deployment for commit 4a11fdc succeeded. Downloaded published course.js, style.css, app.js and index.html and compared with local copies after normalizing CRLF; all matched. Public-site smoke test passed HTTP 200 on desktop 1440px and mobile 390px.


## Learner feedback pass — 24 November 2026
- Daily lessons show the weekday/date, the grammar topic being studied, and the daily skill focus being trained.
- Daily grammar step is structured as a lecture: overview, existing explanatory notes, example, application prompt, contextual example, and expandable practice examples/common errors.
- MCQs in the course now offer 4 unique choices with deterministic shuffle. Automated course audit checks 4 choices, unique values, and key presence across all calendar combinations for both profiles.
- Answer feedback now styles correct answers green and incorrect answers red, and explicitly displays the correct form after an incorrect closed task.
- Automated: `test-course.cjs`, `test-content-quality.cjs`, `test-exam-data.cjs`, and `test-content.cjs` passed. Browser UI QA ran locally in Edge with temporary Playwright Core: both profiles passed screen, schedule, materials, reload, Speaking, audio, and history checks; Marina completed 46 grammar lessons and 2,942 UI transitions. Targeted daily-lesson tests confirmed date/topic labels, four options, red wrong-answer styling, correct answer display, and lecture content. A whitespace-normalization bug in generated options and a guarded audio-playback error callback were fixed during QA.


## Practice trainer and calendar regression — 24 November 2026
- Replaced the repeated generic free-practice generator with the curated skill banks already present in the project.
- A ten-task Listening session now uses ten different recordings and rotates through the 100-script bank; Speaking selects ten different topics and rotates; Reading selects distinct source texts; Writing filters the selected A2/B1/B2 bank and only exact-matches Build a Sentence. Open Writing responses are not marked wrong merely because they differ from a model sentence.
- Grammar practice rotates through its level-specific topic bank instead of restarting at the same first items.
- Added `test-practice-bank.cjs`; all five skills passed ten-task, uniqueness, rotation, answer-format and level-filter checks.
- Full content regressions passed: `test-content.cjs`, `test-course.cjs`, `test-content-quality.cjs`, `test-exam-data.cjs`.
- Browser regression passed for both profiles: 404 dates, 46 grammar topics, lesson resume, calendar selection, themes, schedule, materials, Speaking, audio and history; no browser errors. Updated the browser test to account for the intentionally collapsed calendars. Expanded plan calendar now keeps the selected-day topic and lesson action visible.
- Interface, mobile compatibility, mobile header (320–430 px), grammar lecture, vocabulary and goal-progress tests passed. Updated stale cache-version/theme assertions in the test harness to match the current committed interface.
- This is a technical variety and routing improvement, not an independent CEFR or TOEFL difficulty calibration.
- Added `test-practice-browser.cjs`; real browser flow passed for all five skill-bank builders and Listening playback gate, answer submission, four-choice display, feedback and next-recording rotation.
- Re-ran `test-exam-browser.cjs` after the trainer changes: 24/24 full forms, 96 sections, 2,880 answers through the UI, 264 Speaking audio files, synthetic microphone recording/persistence/reload, timer expiry, zero browser errors.


## Continuation check — 24 November 2026
- No source changes; re-ran existing suites on the uncommitted working tree.
- Passed: test-content, test-content-quality, test-course, test-exam-data, test-goal-progress, test-practice-bank, test-vocabulary, test-interface, test-mobile-compat, test-mobile-header (320–430 px, both profiles), test-grammar-lecture (46/46), test-practice-browser.
- test-browser.cjs passed: both profiles, 404 dates / 46 topics each; Marina 46 complete lessons and 2,850 UI transitions; screens, themes, resume, schedule edit, materials, reload, Speaking, audio, history.
- test-exam-browser.cjs passed: 24/24 forms, 96 sections, 2,880 answers via UI, 264 Speaking audio files, synthetic microphone record/reload, timer expiry, zero browser errors.
- test-public.cjs fails only because the published site predates the local vocabulary/practice build (local changes intentionally not deployed). Re-run after publication.
- Not verified (manual): real sign-in of both accounts and password recovery, two-device sync and user isolation, real microphone capture/Storage upload in an authenticated account, Supabase leaked-password protection, independent editorial/CEFR review.


## Topic filter and CEFR labelling — 24 November 2026
Findings (confirmed before the change):
- The practice form offered six topics (Campus life, Technology, Study habits, Studying abroad, Team projects, Free time) but `buildPracticeSet()` ignored the chosen topic for every skill.
- None of the practice banks carries a topic or category field. Reading (100 items), Listening (200), Speaking (201) and Writing (100) only have a per-item title; Writing titles are task types (Email, Discussion, Build a Sentence). Only one UI topic ("Technology") equals a bank label, and only for 3 Speaking prompts. Mapping the six UI topics onto bank items would have meant inventing labels, so it was not done.
- Reading, Listening and Speaking items have no `level`; the UI showed the selected level as if it were the task's CEFR level. Writing (A2 28 / B1 36 / B2 36) and Grammar (level → unit range) do carry markup.

Changes (`app.js`, `index.html` cache version `20261124-topic-filter`):
- Topic selection for Speaking, Listening, Reading and Writing now uses only the bank's own labels (item title without the numeric suffix; for Writing the task type). The topic list in the form is built from the bank with item counts; the default is "any topic — mixed practice".
- If the chosen label has fewer than ten items, all of them are used first and the rest is filled with the normal mixed rotation (Writing keeps its level filter; Listening/Reading keep distinct recordings/texts in the mixed part). The learner sees a notice before the session ("only N of 10 on this topic, the rest is mixed practice" / "no tasks for this topic, mixed practice"). Each task carries `topicMatch`.
- Grammar selection logic is unchanged (the topic select is disabled with an explanation; topic follows the level).
- Level is stored with `levelSource`: `marked` for Writing/Grammar, `target` for Reading/Listening/Speaking. The history list, task header, answer feedback and review show "цель B2" for target levels. The form labels the field "Целевой уровень" and explains that these tasks are not CEFR-marked and the level does not affect selection. Bank items were not modified.

Tests:
- `test-practice-bank.cjs` extended: options come only from bank labels and cover every item; Speaking "Technology" gives 3 on-topic + 7 mixed with notice; Listening "Plant roots" 2 + 8 from other recordings; Reading "Urban gardens" 1 + 9; Writing "Build a Sentence" B1 fully on-topic without notice, Writing "Email" A2 equals the real bank count and keeps the level filter; unknown topic ("Campus life") falls back to mixed with notice; no topic gives no report; rotation with filter; target-level labelling for Reading/Listening/Speaking and unchanged markup for Writing/Grammar; Grammar output identical for any topic value.
- `test-practice-browser.cjs` extended: partial-match notice is displayed, draft keeps three on-topic Speaking tasks, form shows bank topics with default "mixed", level label/hint per skill, Grammar topic select disabled.
- `test-interface.cjs` and `test-mobile-compat.cjs`: expected `app.js` cache version updated.

Limitations:
- With the existing banks the topic filter is narrow: most labels cover 1–3 items (Reading 1, Listening 2, Speaking 3), so a ten-task session on a single topic is mixed for most choices. Writing task types (Build a Sentence 60 items, Email and Discussion 20 each) are the only labels that can fill a session. Real topic coverage needs a topic field in the banks, which requires new editorial work and was not invented here.
- The daily plan/editor (`editPlan`, plan rows), the numbered daily lessons and mock exams still use their own level labels (plan rows and mock questions show an assigned level); these were outside this change and are not claimed as CEFR-calibrated.


## Release-readiness pass — 24 November 2026
- Removed the legacy 34-task / 60-minute mock interface from the TOEFL page. The page now exposes the current 2026 fixed-route exam studio only; legacy functions remain in source for compatibility but are no longer presented as a second exam.
- Reworked the dashboard percentage so it represents only completion of the 46-lesson course. Practice accuracy and mock attempts no longer inflate a synthetic readiness score.
- Practice progress now includes recorded answers from the new exam studio, mapped to Reading, Listening, Writing and Speaking. Objective accuracy is calculated only for keyed responses; open Writing/Speaking responses are counted separately and are not labelled correct or incorrect automatically.
- Added regression coverage for transparent course completion, exam-answer inclusion, section mapping, full-route attempt counting and duplicate lesson protection.
- Refreshed cache keys for `app.js` and `exam-studio.js`.
- Passed: `test-goal-progress.cjs`, `test-practice-bank.cjs`, `test-practice-browser.cjs`, `test-exam-browser.cjs` (24/24 forms, 96 sections, 2,880 UI answers, 264 Speaking audio files, synthetic microphone persistence, zero browser errors), `test-browser.cjs` (both profiles, 404 dates / 46 topics, 46 grammar lessons and 2,850 UI transitions), `test-interface.cjs`, `test-mobile-compat.cjs`, `node --check` and `git diff --check`.
- Remaining: real authenticated two-account / cross-device QA; independent review and rubric-based evaluation of open responses; full editorial review and psychometric calibration; adaptive routing (current mocks are fixed-route); Supabase leaked-password protection; deployment and public smoke test after release.
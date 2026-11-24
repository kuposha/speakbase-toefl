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
6. Deployment verification: GitHub Actions Pages deployment for commit b36ba3c succeeded. Downloaded published app.js, exam-studio.js, exam-reading-data.js, cloud.js and index.html and compared with local copies after normalizing CRLF; all matched byte-for-byte normalized. Public-site smoke test passed HTTP 200 on desktop 1440px and mobile 390px.


## Learner feedback pass — 24 November 2026
- Daily lessons show the weekday/date, the grammar topic being studied, and the daily skill focus being trained.
- Daily grammar step is structured as a lecture: overview, existing explanatory notes, example, application prompt, contextual example, and expandable practice examples/common errors.
- MCQs in the course now offer 4 unique choices with deterministic shuffle. Automated course audit checks 4 choices, unique values, and key presence across all calendar combinations for both profiles.
- Answer feedback now styles correct answers green and incorrect answers red, and explicitly displays the correct form after an incorrect closed task.
- Automated: `test-course.cjs`, `test-content-quality.cjs`, `test-exam-data.cjs`, and `test-content.cjs` passed. Browser UI suite was unavailable in this checkout due to missing `playwright-core`; visual behavior still requires user/browser confirmation after deployment.

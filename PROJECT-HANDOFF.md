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

## B1 editorial pass completed

All 22 B1 lessons (B1-01 through B1-22) now have reviewed 1.1-draft runtime snapshots, matching Markdown, 24 individually authored closed tasks with per-option rationales and one tailored open task each. Totals: 528 closed and 22 open tasks. Selected GR-02 theory and selected GR-05 descriptors were consulted; full source-page, exercise-page and scan verification is NOT complete. Keep PARTIAL status until those checks and learner acceptance are done. Browser bulk QA passed; dedicated B1 test validates all snapshots and archived old draft answers for every B1 lesson. No real accounts or physical phones were tested. Daily/TOEFL integration remains pending. Next: A2-01 through A2-18 editorial review; then A1, remaining source/practice coverage checks, daily route integration and TOEFL linking. Preserve unrelated dirty AI/exam/documentation work.

## A2 editorial pass — first package

A2-01 through A2-03: expanded Russian theory, 72 individually authored closed tasks and 3 open tasks with rubrics; runtime snapshots and Markdown updated. GR-02 Units 5–6 theory text directly consulted (PDF pp. 22 and 24; printed pp. 10 and 12). Additional sources, exercise pages, visual verification and learner acceptance pending. Status PARTIAL. Next: A2-04 future forms, then A2-05–06 Present Perfect. Preserve unrelated uncommitted changes.

## A2 second package

A2-04 through A2-06 editorial pass: future forms, Present Perfect Simple, Present Perfect vs Past Simple. 72 closed tasks with separate rationales and 3 open rubrics, matching Markdown and runtime. GR-02 Units 19–23, 7–8 and 13–14 theory text directly consulted. Full additional source, exercise-page, visual and learner verification pending; PARTIAL. A2 total: 6/18. Next A2-07–09. Unrelated work preserved.

## A2 third package

A2-07 through A2-09 editorial pass: core modals, comparatives and superlatives. 72 individually authored closed questions and 3 open rubrics, matching runtime snapshots and Markdown. GR-02 selected theory text Units 26–33, 37 and 105–108 directly consulted (PDF pp. 64–78 even, 86, 222–228 even); other sources, exercise-page/visual verification and learner acceptance pending; PARTIAL. A2 total: 9/18. Next A2-10–12, confirm curriculum titles before editing. Preserve unrelated work. Daily route and TOEFL linking remain pending.

## A2 fourth package

A2-10 through A2-12 editorial pass: determiners and quantifiers, adverbs, basic gerund and infinitive patterns. 72 original closed tasks and 3 open rubrics, matching runtime and Markdown. GR-02 selected theory text Units 85–91, 99–104, 109–111, 53–59 consulted. Additional source/exercise-page/visual and learner acceptance pending; PARTIAL. A2 total: 12/18. Next A2-13–15, confirm curriculum titles. Preserve unrelated changes; daily route and TOEFL linking still pending.

## A2 fifth package

A2-13 through A2-15 editorial pass: question forms and introductory embedded questions, defining relative clauses, Zero and First Conditional. 72 original closed tasks with separate option explanations and 3 open rubrics, matching Markdown and runtime. GR-02 selected theory text Units 49–50, 92–94, 25 and 38 directly consulted (PDF pp. 110, 112, 196, 198, 200, 62, 88); Zero Conditional general-truth/habitual explanation is author-supplemented, additional source alignment pending. Exercise-page, visual and learner acceptance pending; PARTIAL. A2 total: 15/18. Next A2-16–18. Preserve unrelated work; daily route and TOEFL linking remain pending.

## A2 sixth package — editorial pass complete

A2-16 through A2-18: time clauses, reason/purpose/result, prepositions and dependent patterns, core phrasal verbs. 72 original closed tasks with individual option explanations and 3 open rubrics; Markdown and runtime snapshots match. Selected GR-02 theory text inspected: Units 25, 64, 113–116, 121–145. Full additional sources, exercise pages, visual review, pronunciation audio and learner acceptance remain pending; PARTIAL, not source-verified. A2 editorial pass: 18/18; B1: 22/22; combined 40 lessons, 960 closed questions and 40 open rubrics. Next A1-01 onward: confirm exact remaining 16 new lesson IDs and approved A1-05 baseline before editing. Preserve unrelated work and real account progress. Daily integration and TOEFL task linking are pending separate stages.

## A1 first package

A1-03, A1-04 and A1-06 editorial pass: be negatives/questions/short answers, singular/plural nouns and a/an, Present Simple negatives and questions. GR-01 Essential Grammar in Use (2017 Russian edition) selected theory Units 1–2, 6–8, 66–69 directly inspected; GR-02 Units 2, 71, 79 also consulted. 72 original closed questions with individual explanations and 3 open rubrics. Full exercise-page, additional source, visual, audio and learner verification pending; PARTIAL. A1 new lessons: 3/16. Existing A1-01, A1-02 and A1-05 unchanged. Next A1-07–09. Preserve unrelated work and real account data. Daily/TOEFL linking remains pending.

## A1 second package

A1-07–09: have/have got, there is/are, possessives and demonstratives. 72 original closed questions with separate explanations, 3 open rubrics, GR-01 selected theory Units 10, 38–39, 59, 61–63, 65, 75 consulted; full sources, exercises, visual/audio and learner review pending. A1 new lessons 6/16; next A1-10–19. PARTIAL.

## A1 third package

A1-10–12: countability and basic quantities, adjectives and adverbs, frequency and word order. 72 original closed questions and 3 open rubrics. GR-01 selected theory Units 67–69, 77–87, 95–96 consulted. Full sources, exercise pages, visual/audio and learner verification pending. A1 new lessons 9/16. Next A1-13–19. PARTIAL.

## A1 fourth package

A1-13–15: Present Continuous, Present Simple vs Continuous, can/cannot and core modality. 72 original closed tasks and 3 open rubrics; GR-01 selected theory Units 4–9, 31–34 inspected. Full additional source, exercise-page, visual/audio and learner verification pending. A1 new lessons 12/16. Next A1-16–19. PARTIAL.

## A1 final package — editorial pass complete

A1-16–19: imperatives and suggestions, basic conjunctions, time/place prepositions, introductory Past Simple. 96 original closed tasks with separate explanations and 4 open rubrics. GR-01 selected theory Units 11–13, 36, 98, 103–110 inspected. A1 new lessons 16/16; A1-01, A1-02 and approved A1-05 unchanged. A2 18/18; B1 22/22. Combined editorial pass: 56 new lessons, 1344 closed items and 56 open rubrics. Full additional-source alignment, exercise-page checks, visual/audio and learner verification still pending (PARTIAL). B2/C1 remain preliminary. Next: consolidate source/QA evidence, finish B2/C1 manual review where necessary, daily grammar integration and TOEFL linking. Preserve unrelated work and account data.

## C1 second editorial pass, package 1

C1-01–03: negative inversion, inverted conditionals, clefts/fronting/emphatic do. Visually reopened GR-03 theory Units 84, 98–100 (PDF pp. 192, 220, 222, 224). Replaced repetitive generated practice with 72 individually authored questions and 3 open rubrics; fixed the erroneous Should + raised key and expanded coverage. Existing prior source evidence retained. Full GR-05 and learner acceptance remain pending. Editorial pass: C1 3/14; combined A1–B1/C1 59 lessons. Next C1-04–06. No real-account changes.

## C1 second editorial pass, package 2

C1-04–06: non-finite clauses, nominalisation, complex noun phrases and prepositions. Reopened GR-03 rendered theory Units 58–59, 93, 101 (PDF pp. 140, 142, 210, 226); previous exercise-page evidence retained. 72 individually authored closed items and 3 open rubrics, runtime snapshots match Markdown. Removed ambiguous explanation for/of forced-choice item; added explicit semantic contrasts, logical-subject and voice controls, preservation of agency and uncertainty. GR-05, full exercise-source coverage and learner acceptance pending. C1 deep editorial pass 6/14; total 62/91. Next C1-07–09. Preserve unrelated files and real-account data.

## C1 second editorial pass, package 3

C1-07–09: advanced passive/causatives, reporting and academic attribution, modality and hedging. GR-03 rendered theory Units 17–19, 24–25, 36, 39, 102 visually reopened (PDF pp. 58, 60, 62, 72, 74, 96, 102, 228); GR-02 Unit 46 theory text inspected PDF p. 104. Other source rows and exercise checks retain their previous evidence status. 72 original closed tasks with distinct option rationales and 3 open rubrics; runtime snapshots match Markdown. Replaced repeated templates with coverage of relative time, reporting complement restrictions, causative agency, mandative subjunctive, evidential scope and distinction of past absence of obligation. GR-05, remaining source and learner acceptance pending. C1 deep editorial pass 9/14; combined 65/91. Next C1-10–14, then B2. Preserve unrelated changes and actual accounts.

## Editorial continuation C1-10 through C1-14

Updated runtime, snapshots, lecture notes and review log. Preserved previous-version answers through the existing lesson migration. Selected GR-05 descriptors checked; outstanding source and acceptance gates remain open.

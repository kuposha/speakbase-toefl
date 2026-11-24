# WORK-REPORT — Speakbase, 24 ноября 2026

## Состояние на начало сессии
- `git status`: изменены QA-REPORT.md, README.md, app.js, index.html, test-browser.cjs, test-grammar-lecture.cjs, test-interface.cjs, test-mobile-compat.cjs; новые test-practice-bank.cjs, test-practice-browser.cjs. Это незакоммиченная работа предыдущей сессии (банки практики вместо generic-генератора). Всё сохранено, ничего не откатывалось и не перезаписывалось. Commit/push/deploy не делались.

## Что сделано в этой сессии
- Проверен git status/diff (изменения app.js: ротация Speaking/Listening/Reading/Writing/Grammar по банкам, версия кэша `practice-bank` в index.html).
- Исходный код проекта в этой сессии НЕ менялся: реальных новых дефектов в проверенных областях не найдено.
- Прогнаны проверки (результаты ниже).

## Результаты проверок (запущены локально, Node)
Прошли (exit 0):
- test-content, test-content-quality (24 формы: Reading 1200, Listening 1128 + 1128 аудио, Writing 288, Speaking 264 + 264 WAV), test-course (808 комбинаций дата/навык на профиль, 46 тем), test-exam-data (24/24 полных форм), test-goal-progress, test-practice-bank, test-vocabulary.
- Браузерные: test-interface, test-mobile-compat, test-mobile-header (320–430 px, оба профиля), test-grammar-lecture (46/46), test-practice-browser (5 навыков по 10 уникальных заданий, Listening-плеер, обратная связь).

Не пройдено / ожидаемо:
- test-public: падает на «published app must load the personal vocabulary build» — опубликованный сайт старее локальной версии (локальные изменения не опубликованы по условиям задачи). После публикации тест нужно перезапустить.

Долгие прогоны завершились успешно (exit 0, получены фактические результаты):
- test-browser.cjs: оба профиля, по 404 даты и 46 тем; у Марины 46 полных уроков, 2850 UI-переходов; девять экранов, темы, возобновление сессии, редактирование расписания, материалы, перезагрузка, Speaking, аудио, история ответов — без ошибок.
- test-exam-browser.cjs: 24/24 форм, 96 секций, 2880 ответов через UI, 264 аудиофайла Speaking, синтетическая запись микрофона (сохранение, перезагрузка, декодирование), истечение таймера, browserErrors: [].

## Остаток работ (требуют владельца)
1. Реальный вход обоих аккаунтов (Марина, Владлен) и сценарий восстановления пароля; test-cloud-browser.cjs требует QA_ACCOUNTS (отсутствует).
2. Реальная синхронизация на двух устройствах, изоляция данных пользователей под авторизованными сессиями.
3. Запись с микрофона в реальном аккаунте и загрузка/скачивание из Storage.
4. Включить leaked-password protection в Supabase Auth (единственное предупреждение advisor). Настройки безопасности Supabase не менялись.
5. Независимая редакторская/CEFR-проверка контента (только автоматические проверки и выборочный просмотр); соответствие TOEFL iBT 2026 — структурное, не оценка ETS.
6. Публикация (после вашего разрешения): закоммитить текущие изменения, задеплоить, перезапустить test-public.

## Измённые файлы в этой сессии
- WORK-REPORT.md (создан).


---

# Сессия 3 — фильтр по теме и честное отображение CEFR (24 ноября 2026)
(Заметка «исходный код не менялся» выше относится к первой сессии; в этой сессии код менялся.)

## Подтверждённые недостатки
1. `buildPracticeSet()` игнорировал выбранную тему для всех навыков. В банках Reading/Listening/Speaking/Writing нет поля темы; есть только название задания (у Writing это тип задания). Шесть тем интерфейса (Campus life, Technology, Study habits, Studying abroad, Team projects, Free time) не соответствуют меткам банков, кроме «Technology» (3 задания Speaking). Присваивать темы заданиям не стал.
2. Для Reading/Listening/Speaking в интерфейсе выбранный уровень показывался как уровень самого задания, хотя у этих заданий нет `level`. Размеченные: Writing (A2 28 / B1 36 / B2 36) и Grammar (уровень задаёт диапазон тем).

## Что сделано
- Фильтр по теме работает по собственным меткам банка (название задания без числового суффикса; у Writing — тип задания). Список тем в форме строится из банка со счётчиками, по умолчанию «Любая — смешанная практика».
- Недостаточно заданий по теме: сначала берутся все заданные по теме, остальное добирается обычной смешанной ротацией (Writing сохраняет фильтр по уровню; Listening/Reading — разные записи/тексты). Перед сессией показывается сообщение: «нашлось только N из 10, остальные — смешанная практика» либо «в банке нет заданий, подобрана смешанная практика». У каждого задания есть `topicMatch`.
- Grammar не изменён по логике (поле темы отключено с пояснением).
- Уровень хранится с `levelSource` (`marked` — Writing/Grammar, `target` — остальные). В истории, заголовке задания, обратной связи и разборе ответа для целевого уровня выводится «цель B2». В форме поле называется «Целевой уровень» с пояснением; для Writing/Grammar — «Уровень». Сами задания не менялись.
- Версия кэша `app.js` в `index.html`: `20261124-topic-filter`.

## Изменённые файлы (в этой сессии)
- app.js, index.html
- test-practice-bank.cjs, test-practice-browser.cjs (расширены), test-interface.cjs, test-mobile-compat.cjs (версия кэша)
- QA-REPORT.md, WORK-REPORT.md
- Резервные копии файлов до правок: `C:\Users\Marina\Desktop\Speakbase-dev\backup-before-topic-filter\` (вне репозитория; можно удалить).

## Результаты тестов (фактические, exit 0)
test-practice-bank (новые проверки фильтра, fallback, уровней), test-practice-browser (новые проверки уведомления и формы), test-interface, test-mobile-compat, test-content, test-content-quality, test-course, test-exam-data, test-goal-progress, test-vocabulary, test-grammar-lecture, test-mobile-header, test-browser (оба профиля, 404 даты, 46 тем), test-exam-browser (24/24 формы, 2880 ответов, browserErrors: []). `git diff --check`: замечаний нет (только предупреждения LF→CRLF).
test-public по-прежнему не проходит до публикации (опубликована старая версия).

## Остаточные ограничения / следующие шаги
- Фильтр узкий: у большинства меток 1–3 задания (Reading 1, Listening 2, Speaking 3), поэтому на 10 заданий тема почти всегда добирается смешанно (честно сообщается). Полноценная тематика требует поля темы в банках — это редакторская работа владельца, не выдумывалась.
- Не затронуто: редактор плана/строки плана, нумерованные ежедневные уроки и пробные экзамены — там уровни по-прежнему назначаются, а не размечены; это нужно решать отдельно.
- Из прежних пунктов остаются ручные проверки: вход обоих аккаунтов и восстановление пароля, синхронизация на двух устройствах, микрофон и Storage в реальном аккаунте, leaked-password protection в Supabase, независимая проверка контента.
- Публикация — только после вашего разрешения.


# Release-readiness continuation — 24 November 2026

## Changes made in this pass
- `exam-studio.js`: removed the legacy page-3 view from the new TOEFL 2026 exam studio. The old 34-task / 60-minute simulation was still appended underneath the new 120-task / 90-minute fixed-route exam selector. It is no longer shown as a second exam.
- `app.js`: replaced the blended 0–100 readiness-like score with a transparent course-completion percentage (46 scheduled lessons only). The dashboard no longer treats activity volume and old mock accuracy as proof of TOEFL readiness.
- `app.js`: added `trackedPracticeRows()` to include saved answers from new exam-studio history in per-skill tracking. Objective accuracy uses only responses with an answer key; open Writing/Speaking responses remain unscored and visible as open work.
- `test-goal-progress.cjs`: expanded coverage for course-only completion, full exam history inclusion, section-to-skill mapping and duplicate lesson protection.
- `test-exam-browser.cjs`: added a regression assertion that the legacy 34-task / 60-minute simulation is not displayed.
- `index.html`, `test-interface.cjs`, `test-mobile-compat.cjs`: refreshed app and exam-studio cache keys to `20261124-release-readiness`.

## Verification
- Passed: `test-goal-progress.cjs`, `test-practice-bank.cjs`, `test-practice-browser.cjs`, `test-exam-browser.cjs`, `test-browser.cjs`, `test-interface.cjs`, `test-mobile-compat.cjs`.
- Browser exam: 24/24 full forms, 96 sections, 2,880 answers through the UI, 264 Speaking recordings, synthetic microphone recording/persistence/reload, zero browser errors.
- Both profile browser regressions passed: 404 dates, 46 topics, 46 grammar lessons, 2,850 UI transitions per profile flow.
- `node --check` passed for changed JS and tests; `git diff --check` passed (only Git LF/CRLF informational warnings).

## Release blockers / next work
1. Real sign-in and password recovery for both registered accounts; cross-device sync and isolation; authenticated microphone upload/download.
2. Add transparent self-review rubrics for Writing and Speaking; no automatic ETS-equivalent scoring is available in this static app.
3. Independently review all 24 forms and course materials for authenticity, ambiguity, difficulty progression and rationale quality; automated uniqueness/key checks are not enough.
4. Keep fixed-route practice clearly distinguished from ETS adaptive delivery; adaptive routing is not implemented.
5. Configure Supabase leaked-password protection and verify Pages deployment SHA after explicit release approval.

No commit, push or deployment was performed.
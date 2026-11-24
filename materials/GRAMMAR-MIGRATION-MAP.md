# Speakbase — аудит текущих 46 грамматических уроков и карта миграции

**Статус:** аудит структуры и тематического покрытия завершён; содержимое приложения не изменялось.
**Основа:** `course-data.js`, `grammar-notes.js`, `course.js`, `GRAMMAR-SOURCE-MAP.md`, `GRAMMAR-CURRICULUM-A1-C1.md`.
**Цель:** связать все старые темы с 94 целевыми блоками A1–C1, выявить пробелы и определить безопасную стратегию переноса прогресса.

## 1. Итог аудита

- В текущем `course-data.js` ровно **46** элементов `units`; порядок и заголовки проверены непосредственно по исполняемому массиву.
- Для всех 46 индексов найдены соответствующие записи в `grammarNotes`, `grammarDeepDive`, `grammarTranslations`, `contextualGrammar` и `rewrites`.
- Для всех 46 тем существует банк `grammarPractice`; объём банка — от **20 до 32 заданий на тему**. Наличие заданий подтверждено программно, но это не означает, что каждое задание уже прошло отдельную редакторскую проверку.
- Следовательно, сейчас есть содержательная основа для всех 46 тем: краткое правило, расширенное объяснение, перевод, контекстное задание, переформулирование и практика. Глубина, полнота и точность этих материалов требуют отдельной проверки при переписывании уроков.
- Новая программа содержит **94 блока**: A1 — 19, A2 — 18, B1 — 22, B2 — 21, C1 — 14. Старые 46 тем не покрывают программу полностью: часть тем нужно разделить, часть объединить, значительную часть базового A1 и академического B2/C1 — создать заново.

### Редакционная поправка к curriculum

Проверка строк с ID в `GRAMMAR-CURRICULUM-A1-C1.md` подтвердила 19 строк A1 и 94 строки в сумме. В заголовке раздела A1 ранее было ошибочно указано «18 блоков», а в принципах — «93 блока». Эти две подписи исправлены на «19» и «94» соответственно. Это ошибка счёта в тексте, не изменение состава программы.

## 2. Как устроены текущие уроки и почему нельзя просто заменить массив

Сейчас тема адресуется числовым индексом массива `units` (0–45), а не постоянным ID. Индекс используется в нескольких местах:

- `db.course.unit` — текущая позиция последовательного курса;
- `session.unit` и сохранённые/возобновляемые сессии — тема текущего занятия;
- `grammarDone` — массив индексов отмеченных тем;
- `activeGrammarTopic` — индекс открытой темы в библиотеке;
- `grammarPractice[unit]`, `grammarNotes[unit]`, `grammarDeepDive[unit]` и связанные массивы — параллельные банки, индекс которых должен совпадать с `units`;
- расписание на дату вычисляет тему через `scheduledUnit()` и обращается к `units[index]`;
- карточки библиотеки и подписи CEFR вычисляют уровень по диапазонам индексов.

Существующая разметка уровней также устарела: индексы 0–11 показываются как A2, 12–29 как B1, 30–45 как B2. Это техническое разбиение, а не проверенная CEFR-классификация. При миграции уровень должен задаваться явным полем целевого блока; старые подписи нельзя переносить как достоверный уровень.

История `reports` в основном сохраняет название темы текстом, но активная сессия и отметки изучения используют индексы. В `courseState()` начальные позиции по умолчанию также заданы индексами: Марина — 3 (Past Simple), Владлен — 0 (Present Simple).

Состояние курса входит в `db`; локально оно сохраняется в профильном хранилище, а синхронизация аккаунта сохраняет состояние обучения в `learning_progress.state`. Поэтому изменение индексов без миграции затронет не только отображение курса, но и продолжение сессий, отметки и синхронизируемый прогресс.

**Запрет на небезопасную миграцию:** не менять порядок `units`, не вставлять новые темы в середину и не перенумеровывать существующие индексы до внедрения совместимого слоя миграции и тестов восстановления состояния.

## 3. Таблица миграции: старые 46 тем → новая программа

Обозначения:
- **Разделить** — старый урок содержит несколько разных учебных целей, которые должны стать отдельными блоками.
- **Объединить** — содержание старых уроков образует одну связанную последовательность или один целевой блок; задания можно распределить по частям.
- **Сохранить** — тема уже соответствует самостоятельному целевому блоку, но содержание всё равно проходит source review.
- **Переработать** — старый урок превращается в диагностику/повторение либо служит лишь частичным материалом.
- «Частично» означает, что в старом уроке есть только часть содержания нового блока; это не считается полным покрытием.

| Старый № | Текущая тема | Решение | Целевые блоки curriculum | Аудиторский вывод |
|---:|---|---|---|---|
| 1 | Present Simple | Разделить | A1-05, A1-06; частично A1-12 | Утверждения, вопросы и отрицания должны быть разнесены по этапам; частотность — отдельная цель. |
| 2 | Present Continuous | Сохранить | A1-13 | Подходит для формы и основных употреблений; расширить временные ситуации и изменения. |
| 3 | Simple vs Continuous | Сохранить | A1-14 | Оставить отдельный контраст после изучения обеих форм; проверить state verbs и контекст. |
| 4 | Past Simple | Разделить | A1-19, A2-01 | В текущем материале есть полная форма Past Simple; в новой последовательности нужен ранний ввод и отдельное закрепление вопросов/отрицаний/irregular verbs. |
| 5 | Past Simple · закрепление | Переработать | A2-01 (повторение/диагностика) | Не самостоятельная грамматическая тема. Перенести полезные задания в диагностику, retrieval practice и интервальное повторение; отдельный блок не создавать. |
| 6 | Past Continuous | Сохранить | A2-02 | Соответствует отдельной цели; дополнить временной рамкой и контрастом с состояниями. |
| 7 | Past Simple vs Past Continuous | Сохранить | A2-03 | Сохранить как контраст фона, процесса и завершённого события. |
| 8 | Present Perfect | Сохранить | A2-05 | Сохранить опыт/результат; не перегружать темами длительности, которые относятся к B1-01. |
| 9 | Future forms | Разделить | A2-04, B1-04 | Текущий урок уже упоминает going to, will, Present Continuous и расписания; future continuous/perfect и future-in-the-past должны быть отдельными частями B1-04. |
| 10 | Modal verbs | Разделить | A1-15, A2-07, B1-09; частично B2-03/C1-09 | Отделить базовую способность/разрешение от обязанности, совета, вероятности и продвинутых оттенков модальности. |
| 11 | Articles | Разделить | A1-04, B2-11 | Текущая тема даёт только базовую опору. Нужны отдельные этапы a/an, the, zero article, generic/reference и контекст выбора. |
| 12 | Prepositions | Разделить | A1-18, A2-17, B2-19; частично C1-06 | Не один список: базовые время/место/движение, зависимые сочетания и сложные prepositional phrases — разные цели. |
| 13 | First Conditional | Объединить | A2-15 | Объединить в блоке с Zero Conditional (№26), сохранив ясное различие закономерности и реального будущего условия. |
| 14 | Second Conditional | Сохранить | B1-05 | Сохранить после базовых реальных условий; раскрыть гипотетическое значение, were и советы. |
| 15 | Countable and uncountable | Разделить | A1-10, A2-10; частично B2-09/B2-12 | Базовая countability и quantity — A1; расширенные determiners/quantifiers и сложные noun phrases — выше. |
| 16 | Quantifiers | Разделить | A1-10, A2-10, B2-12 | Текущий урок смешивает базовые и расширенные значения; распределить по уровню и контексту. |
| 17 | Comparatives | Сохранить | A2-08, частично B1-22 | Базовые сравнения оставить в A2; comparative clauses, modifiers и the… the… перенести в B1-22. |
| 18 | Superlatives | Сохранить | A2-09 | Сохранить как самостоятельный блок; расширить one of the…, by far и сложные noun phrases позднее. |
| 19 | Adverbs | Разделить | A1-11, A1-12, A2-11, B2-13, C1-13 | Слишком широкая тема: adjective/adverb, frequency и позиция, manner/time/degree, viewpoint/stance и emphasis должны изучаться раздельно. |
| 20 | Present Perfect vs Past Simple | Сохранить | A2-06 | Сохранить как отдельный выбор времени по контексту и связи с настоящим. |
| 21 | Present Perfect Continuous | Сохранить | B1-01 | Сохранить; обязательно сравнивать с Present Perfect Simple, а не учить только формулу. |
| 22 | Past Perfect | Сохранить | B1-02 | Сохранить; объяснять временную перспективу и случаи, когда Past Simple достаточно. |
| 23 | Past Perfect Continuous | Сохранить | B1-03 | Сохранить; сравнить длительность процесса и факт/результат. |
| 24 | Future Continuous | Объединить | B1-04 | Перенести в общий последовательный блок будущих форм; оставить отдельную практику внутри блока. |
| 25 | Future Perfect | Объединить | B1-04 | Перенести в B1-04; обязательно противопоставить future perfect и future continuous, by и until. |
| 26 | Zero Conditional | Объединить | A2-15 | Объединить с №13 на уровне учебного блока, но оставить отдельные упражнения и контрастные примеры. |
| 27 | Third Conditional | Сохранить | B1-06 | Сохранить после Second Conditional; проверить модальные варианты результата и контрфактический смысл. |
| 28 | Mixed Conditionals | Объединить/расширить | B2-01 | Объединить в одной последовательности с №39 Wish/If only, но не смешивать разные модели в одном упрощённом правиле. |
| 29 | Passive Voice | Разделить | B1-07, B2-04, C1-07 | Базовые времена и выбор агента — B1; modal/reporting passive и impersonal structures — B2/C1. |
| 30 | Passive with Modals | Объединить/расширить | B2-04, частично C1-07 | Встроить после базового passive; расширить reporting/impersonal passive. |
| 31 | Reported Speech | Разделить | B1-11, B2-05, C1-08 | Statements/backshift — B1; reporting verbs и сложные reporting structures — B2/C1. |
| 32 | Reported Questions | Разделить | B1-12, частично B1-16 | Отделить reported questions от самостоятельной темы indirect questions; добавить requests/commands в B1-12. |
| 33 | Relative Clauses | Разделить | A2-14, B1-14, B2-07 | Defining — A2; non-defining — B1; сложные relative/preposition/participle patterns — B2. |
| 34 | Non-defining Relative Clauses | Объединить/расширить | B1-14, B2-21 | Содержательно объединить с общей системой relative clauses; пунктуацию отработать отдельной целью B2-21. |
| 35 | Gerunds and Infinitives | Объединить/разделить | A2-12, B1-13, C1-12 | Сформировать одну последовательность verb complementation с этапами по частотности и сложности. |
| 36 | Verb Patterns | Объединить/разделить | A2-12, B1-13, C1-12 | Объединить учебную архитектуру с №35, но не сливать все модели в один урок: object + infinitive и meaning changes требуют отдельной практики. |
| 37 | Modal Deduction | Разделить | B1-09, B1-10, B2-03, C1-09 | Текущий блок содержит базовую степень уверенности; развести present deduction, past deduction и продвинутую модальность. |
| 38 | Past Modal Deduction | Объединить/расширить | B1-10, B2-03, C1-09 | Встроить в системную последовательность modal deduction; сохранить отдельную практику modal + have + V3. |
| 39 | Wish and If Only | Объединить/расширить | B2-01 | Объединить последовательность с mixed conditionals №28, но оставить отдельные функции: unreal present, regret, wish + would. |
| 40 | Used to and Be Used to | Сохранить | B1-15 | Сохранить; отдельно различать used to do, be used to doing и get used to doing. |
| 41 | Question Tags | Сохранить | B1-16 | Сохранить; добавить интонацию, прагматические функции и особые шаблоны. |
| 42 | Indirect Questions | Объединить/расширить | A2-13, B1-16 | Начальное знакомство — A2; системная вежливая форма, subject/object questions и tags — B1. |
| 43 | Concession and Contrast | Разделить | A1-17, B1-17, B1-18, B2-14, C1-10 | От простых but/although до уступительных конструкций, linking и correlative patterns. |
| 44 | Cause and Result | Разделить | A1-17, A2-16, B1-17, B1-18, B2-14 | Развести базовую причину, time clauses, purpose/result, межфразовую связность и академический контраст. |
| 45 | Inversion | Разделить | B2-17, C1-01, C1-02, C1-03, C1-10 | Старый урок главным образом покрывает negative inversion. Fronting, clefts, inverted conditionals и emphatic structures требуют новых уроков. |
| 46 | Participle Clauses | Разделить | B1-21, B2-07, B2-08, C1-04 | От простых reduced clauses к complex non-finite/perfect participle clauses и контролю dangling modifiers. |

## 4. Обратная проверка: каждый целевой блок учтён

Ниже перечислены все 94 целевых ID. «Полное ядро» означает, что в старой теме уже есть основная конструкция; это не означает, что старое объяснение готово к публикации. «Частично» означает, что старый урок даёт лишь заготовку. «Нет» — блок придётся написать как новую тему.

| Целевой ID | Тема | Старые темы-источники | Покрытие |
|---|---|---|---|
| A1-01 | Sentence building and basic word order | — | Нет |
| A1-02 | Subject pronouns and verb be — affirmative | — | Нет |
| A1-03 | Be — negatives, questions and short answers | — | Нет |
| A1-04 | Singular/plural nouns and a/an | №11 Articles; №15 Countable and uncountable | Частично |
| A1-05 | Present Simple — affirmative | №1 Present Simple | Полное ядро |
| A1-06 | Present Simple — negatives and questions | №1 Present Simple | Полное ядро |
| A1-07 | Have / have got | — | Нет |
| A1-08 | There is / there are | — | Нет |
| A1-09 | Possessives and demonstratives | — | Нет |
| A1-10 | Countable/uncountable nouns and basic quantity | №15 Countable and uncountable; №16 Quantifiers | Частично |
| A1-11 | Adjectives and basic adverbs | №19 Adverbs | Частично |
| A1-12 | Adverbs of frequency and basic word order | №1 Present Simple; №19 Adverbs | Частично |
| A1-13 | Present Continuous — form and core uses | №2 Present Continuous | Полное ядро |
| A1-14 | Present Simple vs Present Continuous | №3 Simple vs Continuous | Полное ядро |
| A1-15 | Can / can't and basic modality | №10 Modal verbs | Частично |
| A1-16 | Imperatives and let's | — | Нет |
| A1-17 | Basic conjunctions and simple clauses | №43 Concession and Contrast; №44 Cause and Result | Частично |
| A1-18 | Basic prepositions and time/place phrases | №12 Prepositions | Частично |
| A1-19 | Past Simple — first introduction | №4 Past Simple | Частично |
| A2-01 | Past Simple — regular/irregular verbs, questions and negatives | №4 Past Simple; №5 Past Simple reinforcement | Полное ядро |
| A2-02 | Past Continuous | №6 Past Continuous | Полное ядро |
| A2-03 | Past Simple vs Past Continuous | №7 Past Simple vs Past Continuous | Полное ядро |
| A2-04 | Future: going to, will, Present Continuous | №9 Future forms | Полное ядро |
| A2-05 | Present Perfect Simple — experience and result | №8 Present Perfect | Полное ядро |
| A2-06 | Present Perfect vs Past Simple | №20 Present Perfect vs Past Simple | Полное ядро |
| A2-07 | Core modals: obligation, advice, permission, possibility | №10 Modal verbs | Полное ядро |
| A2-08 | Comparatives | №17 Comparatives | Полное ядро |
| A2-09 | Superlatives | №18 Superlatives | Полное ядро |
| A2-10 | Determiners and quantifiers | №15 Countable and uncountable; №16 Quantifiers | Полное ядро |
| A2-11 | Adverbs of manner, time, degree and sequence | №19 Adverbs | Частично |
| A2-12 | Basic gerund and infinitive patterns | №35 Gerunds and Infinitives; №36 Verb Patterns | Полное ядро |
| A2-13 | Question forms and indirect questions — introduction | №32 Reported Questions; №42 Indirect Questions | Частично |
| A2-14 | Defining relative clauses | №33 Relative Clauses | Полное ядро |
| A2-15 | Zero and First Conditional | №13 First Conditional; №26 Zero Conditional | Полное ядро |
| A2-16 | Time clauses and basic reason/purpose/result | №43 Concession and Contrast; №44 Cause and Result | Частично |
| A2-17 | Prepositions and dependent patterns — introduction | №12 Prepositions | Частично |
| A2-18 | Phrasal verbs — core patterns | — | Нет |
| B1-01 | Present Perfect Continuous | №21 Present Perfect Continuous | Полное ядро |
| B1-02 | Past Perfect Simple | №22 Past Perfect | Полное ядро |
| B1-03 | Past Perfect Continuous | №23 Past Perfect Continuous | Полное ядро |
| B1-04 | Future forms and future-in-the-past | №9 Future forms; №24 Future Continuous; №25 Future Perfect | Частично |
| B1-05 | Second Conditional | №14 Second Conditional | Полное ядро |
| B1-06 | Third Conditional | №27 Third Conditional | Полное ядро |
| B1-07 | Passive Voice — core tenses and agent | №29 Passive Voice | Полное ядро |
| B1-08 | Causative have/get something done | — | Нет |
| B1-09 | Modals for obligation, advice and probability | №10 Modal verbs; №37 Modal Deduction | Частично |
| B1-10 | Modal deduction in present and past | №37 Modal Deduction; №38 Past Modal Deduction | Полное ядро |
| B1-11 | Reported statements | №31 Reported Speech | Полное ядро |
| B1-12 | Reported questions, requests and commands | №32 Reported Questions | Частично |
| B1-13 | Verb patterns and meaning changes | №35 Gerunds and Infinitives; №36 Verb Patterns | Полное ядро |
| B1-14 | Non-defining relative clauses | №33 Relative Clauses; №34 Non-defining Relative Clauses | Полное ядро |
| B1-15 | Used to, be used to, get used to | №40 Used to and Be Used to | Полное ядро |
| B1-16 | Question tags, auxiliary verbs and indirect questions | №32 Reported Questions; №41 Question Tags; №42 Indirect Questions | Частично |
| B1-17 | Adverbial clauses: reason, purpose, result and contrast | №43 Concession and Contrast; №44 Cause and Result | Частично |
| B1-18 | Discourse markers and paragraph linking | №43 Concession and Contrast; №44 Cause and Result | Частично |
| B1-19 | Noun phrases, determiners and agreement | №15 Countable and uncountable; №16 Quantifiers | Частично |
| B1-20 | Phrasal verbs and dependent prepositions | №12 Prepositions | Частично |
| B1-21 | Participle clauses and reduced relatives — introduction | №46 Participle Clauses | Полное ядро |
| B1-22 | Advanced comparison and modifiers | №17 Comparatives; №18 Superlatives | Частично |
| B2-01 | Mixed Conditionals, wish and if only | №28 Mixed Conditionals; №39 Wish and If Only | Полное ядро |
| B2-02 | Advanced condition markers | №13 First Conditional; №26 Zero Conditional | Частично |
| B2-03 | Advanced modality and modal perfect | №10 Modal verbs; №37 Modal Deduction; №38 Past Modal Deduction | Частично |
| B2-04 | Passive with modals and reporting passive | №29 Passive Voice; №30 Passive with Modals | Частично |
| B2-05 | Reporting verbs and reporting structures | №31 Reported Speech | Частично |
| B2-06 | Advanced causative and linking verbs | — | Нет |
| B2-07 | Complex relative and participle clauses | №33 Relative Clauses; №34 Non-defining Relative Clauses; №46 Participle Clauses | Частично |
| B2-08 | Non-finite clauses and clause reduction | №46 Participle Clauses | Частично |
| B2-09 | Complex noun phrases and compound nouns | №11 Articles; №15 Countable and uncountable; №16 Quantifiers | Частично |
| B2-10 | Subject–verb agreement in complex structures | — | Нет |
| B2-11 | Advanced articles and reference | №11 Articles | Частично |
| B2-12 | Advanced quantifiers and determiners | №15 Countable and uncountable; №16 Quantifiers | Частично |
| B2-13 | Adverb position, degree, focus and viewpoint | №19 Adverbs | Частично |
| B2-14 | Concession, contrast and complex linking | №43 Concession and Contrast; №44 Cause and Result | Частично |
| B2-15 | Cleft clauses and information focus | — | Нет |
| B2-16 | Ellipsis, substitution and pronoun reference | — | Нет |
| B2-17 | Fronting and inversion — introduction | №45 Inversion | Частично |
| B2-18 | Hedging and stance in academic English | №10 Modal verbs | Частично |
| B2-19 | Complex prepositions and dependent patterns | №12 Prepositions | Частично |
| B2-20 | Nominalisation and academic style — introduction | — | Нет |
| B2-21 | Punctuation in complex sentences | №34 Non-defining Relative Clauses; №43 Concession and Contrast; №44 Cause and Result | Частично |
| C1-01 | Negative inversion and advanced inversion | №45 Inversion | Полное ядро |
| C1-02 | Inverted and ellipted conditionals | — | Нет |
| C1-03 | Advanced cleft clauses, fronting and emphasis | — | Нет |
| C1-04 | Advanced non-finite clauses | №46 Participle Clauses | Частично |
| C1-05 | Nominalisation and abstract noun phrases | — | Нет |
| C1-06 | Complex noun phrases and prepositions | №12 Prepositions | Частично |
| C1-07 | Advanced passive, impersonal and causative structures | №29 Passive Voice; №30 Passive with Modals | Частично |
| C1-08 | Advanced reporting and academic citation language | №31 Reported Speech | Частично |
| C1-09 | Nuanced modality, hedging and stance | №10 Modal verbs; №37 Modal Deduction; №38 Past Modal Deduction | Частично |
| C1-10 | Advanced concession and correlative structures | №43 Concession and Contrast; №45 Inversion | Частично |
| C1-11 | Textual reference, cohesion, substitution and ellipsis | — | Нет |
| C1-12 | Advanced verb complementation | №35 Gerunds and Infinitives; №36 Verb Patterns | Частично |
| C1-13 | Advanced adverbial phrases and emphasis | №19 Adverbs | Частично |
| C1-14 | Academic grammar synthesis and editing | — | Нет |

## 5. Пробелы, требующие новых уроков

### A1 — фундамент, которого сейчас почти нет
- Sentence structure, word order, subject pronouns и полный блок be.
- Have/have got, there is/are, possessives/demonstratives.
- Imperatives/let's и простые связки.
- Базовые noun forms, plural, countability и articles должны быть собраны в последовательность, а не рассыпаны по старым темам.

### A2 — недостающие или неполные области
- Phrasal verbs как отдельная тема.
- Вопросительные модели и indirect questions требуют более раннего введения.
- Time clauses и расширенные conjunction patterns.
- Разделение базовых и продвинутых verb patterns и prepositions.

### B1 — темы без полноценной старой основы
- Causative have/get.
- Subject–verb agreement и сложные noun phrases.
- Phrasal verbs; paragraph-level discourse markers.
- Расширенные reported requests/commands и reduced relatives.

### B2/C1 — академический уровень почти полностью требует нового авторского материала
- Causative/linking verbs и сложное согласование.
- Cleft clauses, fronting, ellipsis/substitution.
- Hedging, stance, nominalisation, academic reporting и textual reference.
- Inverted conditionals, advanced non-finite clauses и академическое редактирование.

Старые уроки по модальным глаголам, наречиям, предлогам и инверсии дают отдельные опорные элементы, но не закрывают продвинутые цели.

## 6. Безопасная стратегия миграции прогресса

### Обязательные правила реализации

1. Ввести постоянный `curriculumId` вида `A1-01`, `A2-01` и т. д. для каждого нового блока. Не использовать позицию в массиве как постоянную идентичность урока.
2. Сохранить таблицу соответствий `legacyUnitIndex → curriculumId(s)` из этого документа. Старые индексы 0–45 остаются читаемыми для уже сохранённых данных до завершения миграции.
3. Для текущей незавершённой сессии сохранить `session.id`, `pos`, `answers`, `draft`, `started`, `lessonDate`, `audioId` и все данные заданий. При миграции определить `curriculumId` для её старого `unit`; если старую тему разделили, продолжить текущую сессию по исходному содержимому, а не подменять задания новой темой.
4. `grammarDone` нельзя механически преобразовать в отметки всех блоков, полученных из старой темы. Для разделённых тем старая отметка означает «старый урок пройден», а не доказанное освоение каждого нового блока. Хранить legacy completion отдельно либо давать частичное диагностическое признание.
5. `activeGrammarTopic`, `db.course.unit`, `session.unit`, `calendarSessions` и запланированные занятия переводить через явную таблицу соответствий. Не полагаться на совпадение индексов.
6. Историю `reports` и `db.h` сохранить без удаления. Старые названия и результаты должны оставаться доступны; новые отчёты должны записывать постоянный `curriculumId` дополнительно к отображаемому названию.
7. Учитывать независимость аккаунтов: миграция должна быть идемпотентной и выполняться внутри состояния конкретного пользователя. Не переносить прогресс Марины в состояние Владлена или наоборот.
8. Сохранить стартовые состояния по смыслу: текущая позиция Марины (legacy index 3, Past Simple) и Владлена (legacy index 0, Present Simple) должна получить явно выбранные целевые ID, а не случайно совпасть с новыми индексами.
9. Перед записью новой схемы сделать резервную копию старого `db.course` и провести тест миграции на копиях обоих профилей, включая сессию посередине урока и сохранённый аудиоответ.
10. Только после тестов переключать каталог, расписание, прогресс, аналитику и повторение на новые ID. Старый массив и адаптер совместимости удалять не раньше подтверждённой миграции всех существующих данных.

### Критерии приёмки миграции

- Все 94 блока имеют уникальный постоянный ID и корректный CEFR level.
- Ни один старый индекс не указывает на другую тему без явной записи миграции.
- Восстанавливается активная сессия на прежнем вопросе с тем же ответом и аудио.
- Старые отметки изучения и отчёты не исчезают и не превращаются ошибочно в полное освоение новых блоков.
- Данные двух аккаунтов остаются независимыми после локального сохранения и cloud sync.
- Повторный запуск миграции не дублирует отметки и не меняет результаты.

## 7. Источниковая проверка перед написанием новых уроков

- Точные тематические units GR-02/GR-03 для каждой темы указаны в `GRAMMAR-SOURCE-MAP.md` и curriculum. Постранично проверены только выбранные ключевые разделы GR-02, перечисленные в source map; это не равно постраничной проверке всех 94 тем.
- GR-03 — скан. Перед написанием конкретного урока нужно визуально открыть его целевые страницы и зафиксировать точные страницы PDF/печатные страницы, если различимы.
- GR-01 — базовая опора A1–A2; конкретные страницы и правила фиксировать при подготовке каждого урока.
- GR-05 подтверждает уровневые наблюдения, но не является источником подробных объяснений.
- Для nominalisation, части academic stance и других тем C1 нужно проверить достаточность GR-03; при нехватке объяснительного материала добавить надёжный справочник. Пунктуационный источник GR-06 требует проверки библиографических данных и конкретного раздела.
- Наличие старого объяснения или упражнения не является доказательством правильности: каждое правило, пример, ключ и дистрактор нужно заново проверить по источнику и языковому употреблению.

## 8. Решение по текущему этапу

**Аудит и карта миграции завершены на уровне структуры, покрытия и рисков сохранения прогресса.** В приложение не вносились изменения: ни грамматические объяснения, ни упражнения, ни порядок 46 старых тем не переписывались.

Следующий этап — утвердить целевую последовательность и схему постоянных ID/совместимости, затем отдельно подготовить миграцию данных и только после этого менять грамматическое содержимое Speakbase.

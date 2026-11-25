/* Topic-specific overrides for closely related grammar blocks.
   Each profile narrows a broad family to the actual scope of its curriculum ID. */
const familyProfiles = {
  possessive: {
    base: 'nouns',
    profile: {
      label: 'possessives and demonstratives',
      core: 'Possessive determiners перед существительным показывают принадлежность (my book); possessive pronouns заменяют всю именную группу (the book is mine). Demonstratives this/that/these/those указывают на предмет с учётом числа и дистанции.',
      form: 'Possessive determiners: my, your, his, her, its, our, their + noun. Possessive pronouns: mine, yours, his, hers, ours, theirs — самостоятельно, без следующего noun. Demonstratives: this/that + singular noun; these/those + plural noun.',
      selection: 'Сначала проверь, стоит ли после формы существительное. Если да — нужен determiner (my); если существительное уже названо или понятно — pronoun (mine). Затем выбери this/these для близкого и that/those для более далёкого референта.',
      contrast: 'This is my book — my определяет book. This book is mine — mine заменяет my book. Its не имеет апострофа в притяжательном значении; it’s обычно означает it is/it has. Their и they’re также различаются.',
      boundary: 'Не добавляй apostrophe-s к possessive determiners: hers, ours, yours пишутся без апострофа. His может быть и determiner, и pronoun. Its отличается от it’s. This/that могут быть местоимениями без noun и determiners перед noun.',
      pronunciation: 'В устной речи possessive forms часто безударны; логическое ударение может выделять владельца (MY book, not yours). This/these отличаются конечным звонким /z/ у these.',
      traps: [
        ['This book is my.','This book is mine.','После be без существительного нужна possessive pronoun, а не determiner.'],
        ['These is our keys.','These are our keys.','These указывает на plural noun и требует are.'],
        ['The dog is wagging it’s tail.','The dog is wagging its tail.','Its без апострофа — притяжательная форма; it’s = it is/it has.']
      ],
      examples: [
        ['This is my notebook; that one is yours.','Это моя тетрадь; та — твоя.','my стоит перед noun, yours заменяет noun phrase.'],
        ['These results are ours.','Эти результаты наши.','These согласуется с plural noun; ours — possessive pronoun.'],
        ['Their laboratory is near ours.','Их лаборатория находится рядом с нашей.','Their — determiner, ours — pronoun.'],
        ['The company changed its policy.','Компания изменила свою политику.','Its — притяжательная форма без апострофа.']
      ],
      toefl: 'В Writing и Reading следи за ясностью reference: possessive forms должны однозначно указывать на владельца, а this/that — на конкретный предмет или идею.'
    }
  },
  frequency: {
    base: 'adverb',
    profile: {
      label: 'adverbs of frequency and basic word order',
      core: 'Adverbs of frequency показывают, насколько регулярно происходит действие. Их позиция зависит от типа сказуемого: с обычным смысловым глаголом наречие обычно стоит перед ним; с be — после be; с вспомогательным глаголом — после первого auxiliary.',
      form: 'Subject + frequency adverb + main verb (I usually study). Subject + be + frequency adverb (She is often late). Subject + auxiliary + frequency adverb + main verb (They have never visited it). Sometimes/usually также могут стоять в начале или конце предложения.',
      selection: 'Найди тип сказуемого. Если это обычный глагол — поставь always/usually/often/sometimes/never перед ним. Если be — после be. Если есть auxiliary — после первого вспомогательного глагола, но перед смысловым.',
      contrast: 'I usually work here — перед смысловым work. I am usually busy — после am. I have usually finished by six — после have. Sometimes может стоять в начале/конце; always и never в нейтральной фразе обычно имеют более фиксированную позицию.',
      boundary: 'Frequency adverbs не заменяют точное time phrase. Sometimes допускает несколько позиций, но перенос может менять фокус. Never уже содержит отрицательное значение и обычно не сочетается с дополнительным not в стандартной конструкции.',
      pronunciation: 'В речи usually, often и sometimes могут редуцироваться. Ударение на always/never усиливает категоричность. Слушай место наречия относительно be/auxiliary.',
      traps: [
        ['I go always to the library.','I always go to the library.','С обычным смысловым глаголом наречие частотности обычно ставится перед ним.'],
        ['She often is tired.','She is often tired.','С be frequency adverb обычно следует после глагола.'],
        ['They have never saw it.','They have never seen it.','После have нужен V3; наречие стоит после первого auxiliary.']
      ],
      examples: [
        ['The laboratory usually opens at eight.','Лаборатория обычно открывается в восемь.','Usually стоит перед смысловым глаголом.'],
        ['The results are often inconsistent.','Результаты часто противоречивы.','Often стоит после be.'],
        ['Researchers have rarely observed this effect.','Исследователи редко наблюдали этот эффект.','Rarely стоит после have.'],
        ['Sometimes the data change unexpectedly.','Иногда данные неожиданно меняются.','Sometimes допускает начальную позицию.']
      ],
      toefl: 'Frequency adverbs помогают точно описывать закономерности и ограничения. В академическом тексте различай usually, often, generally, rarely и never: они выражают разную частотность и силу утверждения.'
    }
  },
  presentContinuous: {
    base: 'continuous',
    profile: {
      label: 'Present Continuous',
      core: 'Present Continuous описывает действие, происходящее сейчас, или временную ситуацию вокруг текущего периода. Он не ограничен буквальным моментом речи: действие может происходить сегодня/на этой неделе, даже если сейчас человек его не выполняет.',
      form: 'Subject + am/is/are + verb-ing. Отрицание: subject + am/is/are + not + V-ing. Вопрос: am/is/are + subject + V-ing? Spelling: remove final -e (make → making), double final consonant in suitable stressed CVC forms (run → running), -ie → -ying (lie → lying).',
      selection: 'Ищи процесс вокруг настоящего момента или временную ситуацию, ограниченную текущим периодом. Сопоставь с Present Simple для привычек и устойчивых фактов. Проверь, допускает ли глагол progressive meaning.',
      contrast: 'I work in a bank — постоянный факт/работа. I am working from home this week — временная ситуация. She reads every evening — привычка. She is reading now — процесс в момент речи.',
      boundary: 'Stative verbs в основных значениях (know, believe, own) обычно не используют Continuous. Некоторые глаголы меняют значение: think (opinion / consider), have (possess / activity), see (perceive / meet). Future arrangements и раздражение with always изучаются отдельно.',
      pronunciation: 'Слабая форма be должна оставаться слышимой; окончание -ing обычно содержит /ɪŋ/. Не пропускай auxiliary: They working — неверно.',
      traps: [
        ['She is study now.','She is studying now.','После be в Present Continuous используется V-ing.'],
        ['I am knowing the answer.','I know the answer.','Know в значении знания обычно stative и не употребляется в Continuous.'],
        ['They working this week.','They are working this week.','Continuous требует am/is/are перед V-ing.']
      ],
      examples: [
        ['The team is testing a new procedure today.','Сегодня команда тестирует новую процедуру.','Временный процесс вокруг настоящего.'],
        ['I am studying from home this week.','На этой неделе я занимаюсь из дома.','Временная ситуация, не обязательно действие в эту секунду.'],
        ['The temperature is rising gradually.','Температура постепенно повышается.','Изменение, развивающееся сейчас.'],
        ['She is considering two possible explanations.','Она рассматривает два возможных объяснения.','Think/consider допускает progressive в значении процесса обдумывания.']
      ],
      toefl: 'Present Continuous помогает описывать процессы и временные ситуации в Speaking/Listening. В Writing отличай временное наблюдение от общего научного факта.'
    }
  },
  simpleContinuous: {
    base: 'continuous',
    profile: {
      label: 'Present Simple vs Present Continuous',
      core: 'Present Simple представляет действие как привычку, факт или устойчивое состояние. Present Continuous показывает процесс, временную ситуацию или изменение вокруг настоящего момента. Выбор определяется тем, как говорящий представляет ситуацию.',
      form: 'Present Simple: I/you/we/they + base verb; he/she/it + -s/-es. Present Continuous: am/is/are + V-ing. Контраст в одном контексте: She works at the library, but today she is working at home.',
      selection: 'Спроси себя: это обычная закономерность/регулярность или процесс/временная ситуация? Затем проверь тип глагола: stative verbs в основном значении обычно требуют Simple, но могут менять значение в Continuous.',
      contrast: 'I think it is useful — мнение (stative). I am thinking about the problem — процесс обдумывания. He has a car — владение. He is having lunch — действие. The water boils at 100°C — научный факт; the water is boiling — процесс сейчас.',
      boundary: 'Always в Present Continuous может выражать раздражение (He is always interrupting), но этот оттенок не нужно переносить на нейтральное описание привычки. Временные маркеры — подсказки, а не единственное правило.',
      pronunciation: 'Слушай разницу base verb и am/is/are + -ing; в беглой речи be редуцируется, но не исчезает. Окончание третьего лица -s в Present Simple может быть слабым.',
      traps: [
        ['She is working here every day. (neutral regular habit)','She works here every day.','Регулярная привычка в нейтральном контексте — Present Simple.'],
        ['I am believing the explanation.','I believe the explanation.','Believe в значении мнения/убеждения обычно stative.'],
        ['Look! The child plays in the road.','Look! The child is playing in the road.','Look! указывает на наблюдаемый процесс сейчас.']
      ],
      examples: [
        ['The institute conducts surveys every year.','Институт проводит опросы каждый год.','Регулярная деятельность — Present Simple.'],
        ['The institute is conducting a survey this month.','В этом месяце институт проводит опрос.','Временная деятельность — Present Continuous.'],
        ['The model predicts a gradual increase.','Модель предсказывает постепенный рост.','Общая функция модели.'],
        ['The model is predicting a higher value today.','Сегодня модель прогнозирует более высокое значение.','Временный результат/процесс в текущем контексте.']
      ],
      toefl: 'Этот контраст важен при описании общих закономерностей и текущих тенденций. В Academic Discussion не выдавай временное наблюдение за универсальный факт.'
    }
  },
  introPast: {
    base: 'past',
    profile: {
      label: 'first introduction to Past Simple',
      core: 'Past Simple обозначает завершённое событие или состояние в прошлом. В этом вводном блоке фокус ограничен утвердительными формами was/were и частотными правильными/неправильными глаголами; полный набор вопросов и отрицаний изучается далее на A2.',
      form: 'Be: I/he/she/it was; you/we/they were. Regular verbs: base + -ed (worked, visited). Irregular verbs имеют отдельную форму V2 (went, saw, had, made). В утвердительной форме не используется did перед V2.',
      selection: 'Найди законченный прошлый период/событие или состояние. Если нужен глагол be, выбери was/were по subject. Для обычного глагола используй V2; не добавляй -ed к нерегулярной форме.',
      contrast: 'She was tired — прошлое состояние с be. She visited the museum — завершённое действие с V2. They were at home — plural be. They went home — irregular past verb.',
      boundary: 'В этом блоке отрабатывается только первое утвердительное знакомство. Did questions, didn’t negatives, полная орфография -ed и произношение трёх вариантов окончания подробно разбираются на A2-01.',
      pronunciation: 'Частотные irregular V2 нужно узнавать на слух. Окончание -ed не всегда образует отдельный слог: его произношение зависит от конечного звука основы.',
      traps: [
        ['Yesterday she go to college.','Yesterday she went to college.','Go — неправильный глагол; Past Simple V2 — went.'],
        ['They was at home.','They were at home.','Were согласуется с you/we/they и plural subject.'],
        ['He visit the museum last week.','He visited the museum last week.','Правильный глагол получает -ed в Past Simple.']
      ],
      examples: [
        ['The lecture was interesting.','Лекция была интересной.','Прошлое состояние с be.'],
        ['We visited the university last year.','Мы посетили университет в прошлом году.','Завершённое событие в прошлом.'],
        ['She went to the library after class.','Она пошла в библиотеку после занятий.','Irregular verb go → went.'],
        ['They were students in 2022.','В 2022 году они были студентами.','Were согласуется с plural subject.']
      ],
      toefl: 'Past Simple нужен для рассказа о прошлом опыте и последовательности событий в Speaking. Этот вводный блок не заменяет полную систему Past Simple на A2.'
    }
  },
  pastContinuous: {
    base: 'continuous',
    profile: {
      label: 'Past Continuous',
      core: 'Past Continuous показывает действие, которое было в процессе в определённый момент прошлого. Важен временной срез: действие уже происходило и ещё не было представлено как завершённое событие.',
      form: 'Subject + was/were + V-ing. I/he/she/it was; you/we/they were. Отрицание: was/were + not + V-ing. Вопрос: was/were + subject + V-ing?',
      selection: 'Определи прошлый момент или период, внутри которого действие продолжалось. Сравни Past Simple, если хочешь представить действие как завершённый факт, а Past Continuous — как процесс в выбранной точке.',
      contrast: 'At eight, I was reading — процесс в моменте. I read the report yesterday — завершённый факт. When the phone rang, I was reading — звонок как короткое событие прерывает процесс.',
      boundary: 'Past Continuous не означает автоматически, что действие длилось долго; главное — перспектива процесса относительно прошлого момента. Stative verbs в основном значении обычно не используются в continuous.',
      pronunciation: 'Was/were часто редуцируются, но остаются грамматическим центром; -ing произносится как /ɪŋ/. Не теряй was/were в Listening.',
      traps: [
        ['At nine yesterday, they was working.','At nine yesterday, they were working.','Plural subject they требует were.'],
        ['I were studying when she called.','I was studying when she called.','I требует was, не were.'],
        ['At noon, we were discuss the results.','At noon, we were discussing the results.','После was/were в continuous нужна V-ing.']
      ],
      examples: [
        ['At noon, the researchers were collecting samples.','В полдень исследователи собирали образцы.','Процесс в конкретный прошлый момент.'],
        ['I was preparing the report when the power went out.','Я готовил отчёт, когда отключилось электричество.','Длительный фон + короткое завершённое событие.'],
        ['The students were waiting outside the laboratory.','Студенты ждали снаружи лаборатории.','Процесс в прошлом.'],
        ['Was the team working at midnight?','Команда работала в полночь?','Вопрос строится перестановкой was перед subject.']
      ],
      toefl: 'Past Continuous полезен для описания фона и последовательности событий в Speaking/Listening. В пересказе различай процесс и отдельное событие.'
    }
  },
  pastContrast: {
    base: 'past',
    profile: {
      label: 'Past Simple vs Past Continuous',
      core: 'Past Simple представляет завершённое событие или последовательность действий. Past Continuous показывает процесс, который уже шёл в выбранный момент прошлого. В рассказе Past Continuous часто задаёт фон, а Past Simple сообщает, что произошло.',
      form: 'Past Simple: V2 / was-were. Past Continuous: was/were + V-ing. Частая модель: Past Continuous + when + Past Simple; while часто вводит процесс, но выбор не определяется одним союзом.',
      selection: 'Найди временную точку: действие было в процессе или представляется как завершённое событие? Затем выстрой последовательность: фон/процесс, короткое событие, предшествующее действие.',
      contrast: 'I was walking home when it started to rain — процесс был прерван. I walked home after class — завершённая последовательность. While I was reading, my phone rang — while clause задаёт фон.',
      boundary: 'When может вводить и короткое событие, и длительный процесс; while также не является механическим маркером continuous. Иногда оба времени возможны с разной перспективой.',
      pronunciation: 'Слушай auxiliary was/were и окончание -ing: они показывают процесс. Past Simple часто звучит короче и завершённее; маркеры времени помогают, но решает контекст.',
      traps: [
        ['I was walked home when it rained.','I was walking home when it started to rain.','Continuous требует was + V-ing; walked — Past Simple.'],
        ['While she cooked, the phone was ringing once.','While she was cooking, the phone rang.','Фон — Past Continuous; короткое единичное событие — Past Simple.'],
        ['When I was arriving, he watched TV.','When I arrived, he was watching TV.','Завершённое прибытие задаёт момент, просмотр был процессом.']
      ],
      examples: [
        ['The team was analysing the data when the server failed.','Команда анализировала данные, когда сервер отказал.','Процесс interrupted коротким событием.'],
        ['She submitted the report and left the office.','Она отправила отчёт и ушла из офиса.','Последовательность завершённых действий.'],
        ['While the lecturer was speaking, students were taking notes.','Пока преподаватель говорил, студенты делали заметки.','Два параллельных процесса.'],
        ['I noticed the error while I was checking the figures.','Я заметил ошибку, пока проверял цифры.','Короткое обнаружение на фоне процесса.']
      ],
      toefl: 'Контраст помогает точно пересказывать лекции, эксперименты и личные события. Не смешивай фон и событие в одном временном ряду.'
    }
  },
  presentPerfect: {
    base: 'perfect',
    profile: {
      label: 'Present Perfect Simple — experience and result',
      core: 'Present Perfect Simple связывает прошлое действие с настоящей точкой отсчёта. В этом блоке фокус — жизненный/учебный опыт и текущий результат, а не конкретная дата завершённого прошлого.',
      form: 'Subject + have/has + past participle (V3). Have с I/you/we/they; has с he/she/it. Частые маркеры: ever, never, just, already, yet, so far. Вопрос: Have/Has + subject + V3?',
      selection: 'Спроси, важен ли опыт к настоящему моменту или результат виден сейчас. Если называешь конкретный завершённый момент (yesterday, in 2022), обычно нужен Past Simple.',
      contrast: 'I have visited Rome — опыт к настоящему. I visited Rome in 2022 — завершённое прошлое с датой. She has just finished — свежий результат; she finished an hour ago — конкретное прошлое время.',
      boundary: 'Present Perfect обычно не соединяется с конкретным завершённым past-time marker. Have/has должны согласовываться с subject, а после них нужен V3. Для состояния/длительности часто возможен Present Perfect Simple.',
      pronunciation: 'Have/has часто редуцируются; в Listening не пропускай вспомогательный глагол, иначе можно спутать Present Perfect и Past Simple.',
      traps: [
        ['I have seen her yesterday.','I saw her yesterday.','Yesterday задаёт завершённый момент прошлого; нужен Past Simple.'],
        ['She has went home.','She has gone home.','После has нужен V3: gone, не went.'],
        ['Have you ever went abroad?','Have you ever been abroad?','После have нужен V3; для опыта поездок естественно been.']
      ],
      examples: [
        ['The team has completed three trials so far.','Команда завершила три испытания на данный момент.','Результат в текущем/незавершённом периоде.'],
        ['Have you ever used this software?','Ты когда-нибудь пользовался этим программным обеспечением?','Опыт к настоящему моменту.'],
        ['She has just submitted the application.','Она только что отправила заявку.','Недавнее действие с текущим результатом.'],
        ['We have not received the final data yet.','Мы ещё не получили итоговые данные.','Yet в отрицании связывает ожидание с настоящим.']
      ],
      toefl: 'Present Perfect помогает говорить об опыте и текущих результатах. В академическом тексте сопоставляй completed period и evidence available now.'
    }
  },
  perfectVsPast: {
    base: 'perfect',
    profile: {
      label: 'Present Perfect vs Past Simple',
      core: 'Present Perfect связывает прошлое с настоящей точкой отсчёта; Past Simple представляет действие как завершённое в прошлом времени. Важно, закрыт ли временной период и сохраняется ли связь с настоящим.',
      form: 'Present Perfect: have/has + V3. Past Simple: V2; отрицания/вопросы: did + base verb. Present Perfect часто сочетается с ever/never/just/already/yet/so far; Past Simple — с yesterday/last year/in 2020/ago.',
      selection: 'Определи временную рамку. Если она закончена и указана/подразумевается — Past Simple. Если говоришь об опыте или результате к настоящему моменту без конкретного законченного времени — Present Perfect.',
      contrast: 'I have worked here for three years — работа продолжается до настоящего. I worked there for three years — период завершён. Have you finished? — важен результат сейчас. Did you finish yesterday? — конкретный прошлый момент.',
      boundary: 'Маркеры времени — подсказки, но не заменяют смысловой анализ. Американский английский иногда использует Past Simple там, где BrE предпочитает Present Perfect, особенно с just/already/yet; сохраняй вариант последовательным.',
      pronunciation: 'Различай слабое have/has от Past Simple без auxiliary в утвердительном предложении. В вопросах did и have дают разные временные перспективы.',
      traps: [
        ['I have visited the museum last year.','I visited the museum last year.','Last year — законченный период, нужен Past Simple.'],
        ['Did you ever visit London? (neutral life-experience question)','Have you ever visited London?','Для опыта к настоящему в нейтральной модели используется Present Perfect.'],
        ['She has lived here in 2019.','She lived here in 2019.','In 2019 указывает на завершённый прошлый период.']
      ],
      examples: [
        ['The researchers published the report in 2022.','Исследователи опубликовали отчёт в 2022 году.','Завершённое время — Past Simple.'],
        ['The researchers have published five reports so far.','Исследователи опубликовали пять отчётов на данный момент.','Накопленный результат к настоящему.'],
        ['Have you finished the analysis?','Ты закончил анализ?','Важен текущий результат.'],
        ['When did the experiment begin?','Когда начался эксперимент?','Вопрос о конкретном прошлом моменте.']
      ],
      toefl: 'При пересказе исследований указывай, когда событие завершилось и почему его результат важен сейчас. Это помогает не смешивать факты с текущими выводами.'
    }
  },
  comparative: {
    base: 'comparison',
    profile: {
      label: 'Comparatives',
      core: 'Comparative degree сопоставляет два объекта или состояния по одному признаку. Структура должна ясно называть критерий сравнения и объект, с которым проводится сравнение.',
      form: 'Short adjective/adverb: -er + than (faster than); longer forms: more + adjective/adverb + than (more reliable than). Equality: as + adjective/adverb + as. Irregular: good/better, bad/worse, far/farther/further.',
      selection: 'Если сравниваешь два объекта — выбери comparative + than. Если степень одинакова — as…as. Проверь, не используется ли аналитическая и синтетическая форма одновременно.',
      contrast: 'More reliable than — сравнительная степень; the most reliable — высшая степень в группе; as reliable as — равенство. Much/far/slightly усиливают comparative, но не superlative.',
      boundary: 'Spelling changes: big → bigger, happy → happier, careful → more careful. Некоторые двухсложные adjectives допускают варианты в зависимости от слова/регистра; проверяй нормативную форму.',
      pronunciation: 'Than часто редуцируется; -er произносится кратко. В предложении выделяй сравнительный признак, чтобы слушатель понял, что именно сравнивается.',
      traps: [
        ['This method is more easier.','This method is easier.','Не используй more вместе с синтетическим -er.'],
        ['The result is better as before.','The result is better than before.','Comparative обычно требует than, если сравнение выражено.'],
        ['This sample is as larger as the other.','This sample is as large as the other.','В as…as используется base adjective, не comparative.']
      ],
      examples: [
        ['The second method is more reliable than the first.','Второй метод надёжнее первого.','More + adjective + than.'],
        ['This sample is slightly larger than the control.','Этот образец немного больше контрольного.','Slightly усиливает comparative.'],
        ['The two systems are as efficient as each other.','Две системы одинаково эффективны.','As…as выражает равенство.'],
        ['The revised version performs better.','Обновлённая версия работает лучше.','Irregular comparative better.']
      ],
      toefl: 'Comparatives полезны при описании данных, методов и альтернатив. Называй критерий сравнения и не используй stronger/larger без основания.'
    }
  },
  superlative: {
    base: 'comparison',
    profile: {
      label: 'Superlatives',
      core: 'Superlative degree выделяет один элемент как имеющий максимальную или минимальную степень признака внутри определённой группы. Без группы сравнения утверждение может быть неполным или преувеличенным.',
      form: 'Short adjective: the + -est; longer adjective: the most + adjective; least + adjective. Irregular: good/best, bad/worst, far/farthest/furthest. One of the + superlative + plural noun.',
      selection: 'Определи группу, внутри которой выделяется элемент. Используй the + superlative; если говоришь об одном из нескольких лидеров, используй one of the + superlative + plural noun.',
      contrast: 'The fastest method — один самый быстрый в группе. Faster than — сравнение двух. One of the most effective methods — один из ряда наиболее эффективных, после one of the требуется plural noun.',
      boundary: 'Не складывай -est и most одновременно. Possessives и demonstratives могут заменять the в некоторых структурах (my best result). Выбор самой группы должен быть логически оправдан.',
      pronunciation: 'The может редуцироваться, а главное ударение часто падает на adjective. У -est конечный кластер не добавляет отдельный слог.',
      traps: [
        ['The most fastest method.','The fastest method.','Не используй most вместе с -est.'],
        ['It is one of the best solution.','It is one of the best solutions.','После one of the + superlative нужен plural noun.'],
        ['This is fastest method in the group.','This is the fastest method in the group.','В нейтральной конструкции обычно требуется the перед superlative.']
      ],
      examples: [
        ['This is the most reliable estimate in the study.','Это самая надёжная оценка в исследовании.','Superlative выделяет элемент в группе.'],
        ['It is one of the most important findings.','Это один из наиболее важных выводов.','One of the + superlative + plural noun.'],
        ['The shortest route passes through the centre.','Самый короткий маршрут проходит через центр.','Short adjective + -est.'],
        ['The least expensive option is not always the best.','Самый недорогой вариант не всегда лучший.','Least выражает минимальную степень.']
      ],
      toefl: 'В академических ответах используй superlative только при ясной группе сравнения и достаточных доказательствах; иначе формулировка может звучать чрезмерно категорично.'
    }
  },
  modalCan: {
    base: 'modal',
    profile: {
      label: 'Can / can’t and basic modality',
      core: 'Can/can’t выражает способность, разрешение и простую возможность, а также используется в просьбах. Значение определяется контекстом; после can всегда стоит base verb без to.',
      form: 'Subject + can + base verb. Отрицание: cannot/can’t + base verb. Вопрос: Can + subject + base verb? Краткие ответы: Yes, I can / No, I can’t.',
      selection: 'Определи функцию: ability (умеет), permission (можно), possibility (возможно) или request (просьба). В формальном тексте для некоторых контекстов may/be able to могут быть точнее.',
      contrast: 'She can swim — способность. Can I leave? — разрешение. It can be difficult — общая возможность. Could you help? — более мягкая/вежливая просьба.',
      boundary: 'Can не имеет окончания -s в третьем лице; после него не ставится to. Для некоторых будущих/перфектных форм используются be able to, но это не меняет базовую модель can.',
      pronunciation: 'Can в утверждении часто безударен и редуцируется; can’t обычно получает большее ударение. Различай их на слух по гласному и контексту.',
      traps: [
        ['She can to drive.','She can drive.','После modal can используется bare infinitive без to.'],
        ['He cans speak English.','He can speak English.','Can не получает -s в третьем лице.'],
        ['Can you to help me?','Can you help me?','После can в вопросе также используется base verb.']
      ],
      examples: [
        ['The software can process large files.','Программа может обрабатывать большие файлы.','Способность/возможность системы.'],
        ['Can I use this room?','Можно мне воспользоваться этой комнатой?','Запрос разрешения.'],
        ['This approach can reduce costs.','Этот подход может снизить затраты.','Потенциальная возможность.'],
        ['Could you repeat the last point?','Не могли бы вы повторить последний пункт?','Could смягчает просьбу.']
      ],
      toefl: 'Can/could помогают формулировать возможности, ограничения и вежливые просьбы. В академическом тексте уточняй, выражаешь ли способность, возможность или доказанный факт.'
    }
  },
  modalCore: {
    base: 'modal',
    profile: {
      label: 'core modals: obligation, advice, permission and possibility',
      core: 'Модальные глаголы выражают обязанность, необходимость, совет, разрешение и возможность. Выбор зависит от силы требования, источника обязанности и степени уверенности.',
      form: 'Must + base; have to + base; should/ought to + base; can/could/may/might + base. Have to меняется по лицу/времени; core modals не получают -s. Mustn’t = запрет; don’t have to = отсутствие необходимости.',
      selection: 'Сначала оцени силу: правило/обязанность, практическая необходимость, рекомендация, разрешение или вероятность. Затем проверь, кто является источником требования и насколько говорящий уверен.',
      contrast: 'You must wear a helmet — сильное требование. You have to wear one — внешняя необходимость. You should check the source — совет. You don’t have to attend — отсутствие обязанности. You mustn’t enter — запрет.',
      boundary: 'May/can могут выражать разрешение, но регистр различается. Could/might могут выражать возможность или вежливость. Needn’t/don’t have to не означают запрет. После core modal используется bare infinitive.',
      pronunciation: 'Слабые формы модальных глаголов часто редуцируются; ударение на must/should/might меняет силу высказывания. В Listening фиксируй отрицание.',
      traps: [
        ['You mustn’t attend; it is optional.','You don’t have to attend; it is optional.','Mustn’t — запрет; don’t have to — нет необходимости.'],
        ['She should to revise the draft.','She should revise the draft.','После should используется bare infinitive.'],
        ['He cans use the equipment.','He can use the equipment.','Can не получает -s; форма согласования не меняется.']
      ],
      examples: [
        ['Participants must sign the consent form.','Участники обязаны подписать форму согласия.','Сильное требование.'],
        ['You should verify the citation.','Тебе следует проверить ссылку.','Совет.'],
        ['The method may produce different results.','Метод может давать разные результаты.','Возможность.'],
        ['Visitors do not have to book in advance.','Посетителям не обязательно бронировать заранее.','Отсутствие необходимости.']
      ],
      toefl: 'Модальность критична для точности аргумента: различай обязательство, совет, возможность и разрешение. Не усиливай утверждение beyond evidence.'
    }
  },
  articlesAdvanced: {
    base: 'nouns',
    profile: {
      label: 'advanced articles and reference',
      core: 'Выбор a/an, the и zero article зависит от countability, уникальности/определённости референта, generic reference и того, известен ли объект из контекста. Артикль сигнализирует, как читатель должен интерпретировать существительное.',
      form: 'A/an + singular countable noun при неопределённом/первом представлении. The + noun при идентифицируемом референте (specific, unique, shared knowledge, superlative). Zero article часто используется с generic plural/uncountable nouns, названиями языков/предметов и устойчивыми институциональными выражениями.',
      selection: 'Определи тип noun и значение: generic или specific; countable singular или plural/uncountable; unique/shared reference или новый неопределённый объект. Затем проверь, не делает ли контекст референт определённым уже при первом упоминании.',
      contrast: 'A researcher contacted the laboratory — неопределённый исследователь, конкретная лаборатория. Researchers need funding — generic plural без article. The researchers in this study — определённая группа. Research is essential — uncountable abstract reference.',
      boundary: 'Abstract nouns могут быть countable или uncountable в зависимости от значения (experience, education, research). Institutional expressions (at school / at the school) различаются по функции. Geographical names имеют много устойчивых исключений, которые нужно учить по группам.',
      pronunciation: 'A/an/the обычно безударны; the может иметь сильную форму перед гласным для акцента. В Listening артикль короткий, но меняет generic/specific reference.',
      traps: [
        ['The research is important in general.','Research is important in general.','Generic uncountable abstract reference обычно требует zero article.'],
        ['A information was collected.','Information was collected.','Information неисчисляемое и не допускает a/an без measure phrase.'],
        ['The researchers need funding in general.','Researchers need funding in general.','Generic plural noun обычно используется без the.']
      ],
      examples: [
        ['Research into renewable energy has expanded.','Исследования в области возобновляемой энергетики расширились.','Generic/abstract uncountable reference.'],
        ['The research conducted at this university was extensive.','Исследование, проведённое в этом университете, было обширным.','Specific reference через defining modifier.'],
        ['A scientist proposed a new explanation.','Учёный предложил новое объяснение.','Первое неопределённое представление countable noun.'],
        ['The explanation was later tested.','Позже это объяснение проверили.','Повторное, уже идентифицируемое reference.']
      ],
      toefl: 'Articles and reference влияют на точность и ясность академического текста. Различай generic statements и конкретные исследования/результаты, а не применяй правило первого упоминания механически.'
    }
  }
};

const familyDrills = {
  possessive: [
    ['This is ___ laptop.','my','mine','me','Перед noun нужен possessive determiner my.'],
    ['This laptop is ___.','mine','my','I','Без существительного используется possessive pronoun mine.'],
    ['___ keys are on the desk. (the keys belong to them)','Their','They','Them','Their стоит перед noun и обозначает принадлежность.'],
    ['The blue notebooks are ___. (we)','ours','our','us','Ours заменяет our notebooks.'],
    ['___ are my documents here.','These','This','Those','These указывает на близкие предметы во множественном числе.'],
    ['___ building across the street is the library.','That','These','This','That указывает на один объект на расстоянии.'],
    ['The cat is cleaning ___ paws.','its','it’s','it','Притяжательная форма its пишется без апострофа.']
  ],
  frequency: [
    ['She ___ checks the figures before sending a report.','always','is always','always is','С обычным смысловым глаголом always обычно ставится перед ним.'],
    ['The laboratory is ___ closed on Sundays.','usually','usually is','usual','С be frequency adverb обычно стоит после глагола.'],
    ['They have ___ reported this effect.','never','never have','not never','С auxiliary have наречие ставится после первого вспомогательного глагола.'],
    ['___, the team meets to review the results.','Sometimes','Sometimely','Some time','Sometimes может стоять в начале предложения.'],
    ['I ___ forget to save the file.','rarely','am rarely','rarely am','С обычным глаголом rarely стоит перед смысловым verb.'],
    ['The students are ___ late for the lecture.','often','often are','oftening','С be often ставится после are.'],
    ['How ___ do you update the database?','often','usual','many times often','How often спрашивает о частоте действия.']
  ],
  presentContinuous: [
    ['The researchers ___ a new method this week.','are testing','test','is testing','Временная деятельность в текущий период: are + V-ing.'],
    ['I ___ for the exam at the moment.','am preparing','prepare','am prepare','Действие сейчас: am + V-ing.'],
    ['The temperature ___ gradually.','is increasing','increase','has increasing','Изменение в процессе выражается Present Continuous.'],
    ['She ___ the results right now.','is reviewing','reviews every week','is review','Right now указывает на процесс; is + V-ing.'],
    ['We ___ from home this month.','are working','work always','is working','Временная ситуация вокруг настоящего использует are working.'],
    ['He ___ a new language this semester.','is learning','learns every day','is learn','Временный учебный процесс в текущем периоде.'],
    ['Why ___ the computer ___?','is / restarting','does / restarting','are / restart','Вопрос с singular subject: is + subject + V-ing.']
  ],
  simpleContinuous: [
    ['The library usually ___ at eight.','opens','is opening','open','Обычное расписание/регулярный факт выражается Present Simple.'],
    ['Look! The students ___ the experiment.','are starting','start every day','starts','Наблюдаемый процесс сейчас: are starting.'],
    ['I ___ what you mean.','understand','am understanding','understands','Understand в значении понимания обычно stative.'],
    ['This week, the team ___ a different procedure.','is using','uses every week','use','Временная ситуация вокруг настоящего требует Continuous.'],
    ['Water ___ at 100°C at standard pressure.','boils','is boiling','boil','Общая научная закономерность выражается Present Simple.'],
    ['She ___ about the problem right now.','is thinking','thinks always','think','Think в значении обдумывания допускает Continuous.'],
    ['He ___ in Helsinki, but this month he ___ in Turku.','lives / is staying','is living / stays','live / stay','Постоянное место жительства — Simple; временное пребывание — Continuous.']
  ],
  introPast: [
    ['Yesterday, the lecture ___ very interesting.','was','were','is','Lecture — singular subject; Past Simple be = was.'],
    ['My friends ___ at the university in 2022.','were','was','are','Plural subject friends требует were.'],
    ['We ___ the museum last weekend.','visited','visit','visiting','Regular verb в Past Simple получает -ed.'],
    ['She ___ to college by bus yesterday.','went','goed','go','Go — irregular verb; V2 = went.'],
    ['The experiment ___ at noon.','started','start','starting','Завершённое прошлое событие — started.'],
    ['I ___ a useful book last month.','read','readed','reading','Read — irregular verb; written form совпадает, pronunciation changes.'],
    ['They ___ tired after the long trip.','were','was','be','Plural subject they требует were.']
  ],
  pastContinuous: [
    ['At 9 p.m., I ___ the report.','was writing','wrote every day','were writing','Past Continuous: I was + V-ing.'],
    ['The students ___ notes during the lecture.','were taking','was taking','took now','Plural subject students требует were + V-ing.'],
    ['At midnight, the server ___ correctly.','was not working','did not working','were not work','Отрицание Past Continuous: was not + V-ing.'],
    ['___ the team ___ at noon?','Was / working','Did / working','Were / works','Team здесь singular; вопрос строится was + subject + V-ing.'],
    ['The children ___ outside when it started to rain.','were playing','played at that moment','was playing','Длительный фон в прошлом выражается were playing.'],
    ['She ___ when the phone rang.','was studying','studied every day','were studying','She — singular; процесс до короткого события.'],
    ['What ___ you ___ at 8 o’clock?','were / doing','did / doing','was / do','You требует were; вопрос Past Continuous = were + subject + V-ing.']
  ],
  pastContrast: [
    ['The team ___ the data when the computer stopped.','was analysing','analysed every day','were analyse','Процесс был прерван событием; singular team + was analysing.'],
    ['While I ___, my phone rang.','was reading','read yesterday','am reading','Длительный процесс на фоне события — Past Continuous.'],
    ['The alarm ___ while the researchers were working.','rang','was ringing continuously (single event)','rings','Короткое завершённое событие использует Past Simple.'],
    ['They ___ the building and then took a taxi.','left','were leaving at the moment','leave','Последовательность завершённых событий — Past Simple.'],
    ['At the time of the accident, the driver ___ too fast.','was driving','drove yesterday','drives','Процесс в момент прошлого события — Past Continuous.'],
    ['When the lecture ended, the students ___.','left','were leave','was leaving','Завершённое событие после окончания лекции — Past Simple.'],
    ['I noticed the mistake while I ___ the figures.','was checking','checked every week','am checking','Проверка была процессом, на фоне которого произошло обнаружение.']
  ],
  presentPerfect: [
    ['Have you ever ___ this software?','used','use','using','После have нужен V3; вопрос об опыте к настоящему.'],
    ['The team has just ___ the second trial.','completed','complete','completing','Has just + V3 выражает недавнее завершение.'],
    ['We have not received the results ___.','yet','yesterday','last week','Yet часто используется в отрицаниях Present Perfect.'],
    ['She has ___ visited three countries.','already','yesterday','ago','Already подчёркивает завершённый к настоящему результат/опыт.'],
    ['They have never ___ abroad.','been','go','went','После have never нужен V3; been abroad описывает опыт.'],
    ['How many reports have you ___ so far?','written','write','wrote','После have используется V3 written.'],
    ['The researcher has ___ submitted the paper.','just','last Monday','in 2020','Just указывает на недавнее завершение с текущей связью.']
  ],
  perfectVsPast: [
    ['I ___ the report yesterday.','finished','have finished','had finish','Yesterday — завершённое время; Past Simple.'],
    ['I ___ three reports so far this month.','have finished','finished yesterday','have finish','So far this month связывает результат с текущим периодом.'],
    ['When ___ the experiment begin?','did','has','have','Вопрос о конкретном прошлом моменте использует did + base verb.'],
    ['Have you ever ___ the procedure?','tried','try','tried it yesterday','Ever спрашивает об опыте к настоящему; нужен V3.'],
    ['She ___ here from 2019 to 2022.','worked','has worked','has work','Период завершился в прошлом; Past Simple.'],
    ['She ___ here since 2019.','has worked','worked yesterday','has work','Since 2019 связывает длительность с настоящим.'],
    ['They have not completed the task ___.','yet','last Friday','two days ago','Yet указывает, что ожидаемое завершение ещё не произошло к настоящему.']
  ],
  comparative: [
    ['The revised model is ___ than the previous one.','more accurate','most accurate','accurater','Accurate — длинное прилагательное; comparative = more accurate.'],
    ['The second route is ___ than the first.','shorter','shortest','more short','Короткое adjective short образует comparative через -er.'],
    ['This sample is as large ___ the control sample.','as','than','like','Равенство строится as + adjective + as.'],
    ['The updated system is much ___ efficient.','more','most','many','Much усиливает comparative; используется more efficient.'],
    ['The results were ___ than expected.','worse','worst','more bad','Bad имеет irregular comparative worse.'],
    ['The second explanation is slightly ___ convincing.','less','least','few','Less выражает меньшую степень прилагательного.'],
    ['The northern route is farther ___ the centre.','from','than','as','Farther from обозначает расстояние от точки.']
  ],
  superlative: [
    ['This is the ___ reliable estimate in the study.','most','more','much','Reliable — длинное adjective; superlative = the most reliable.'],
    ['It was the ___ day of the year.','hottest','hotter','most hot','Hot образует superlative с удвоением consonant и -est.'],
    ['She is one of the best ___ in the department.','researchers','researcher','research','После one of the + superlative нужен plural countable noun.'],
    ['This is the ___ expensive option.','least','less','little','Least выражает минимальную степень.'],
    ['Of the three methods, this one is ___.','the fastest','faster','fast','Сравнение внутри группы из трёх требует superlative.'],
    ['The ___ important result was reported first.','most','more','many','Most образует высшую степень длинного прилагательного.'],
    ['Which of these solutions is the ___?','best','better','good','Best — irregular superlative от good.']
  ],
  modalCan: [
    ['My sister ___ speak three languages.','can','cans','can to','Can выражает способность и не получает -s.'],
    ['___ I use this computer?','Can','Do can','Am','Can в начале вопроса выражает просьбу/разрешение.'],
    ['This approach ___ reduce the cost.','can','cans','can to','Can + base verb выражает возможность.'],
    ['He ___ drive yet; he is only sixteen.','can’t','doesn’t can','can’t to','Отрицание can образуется can’t + base verb.'],
    ['Could you ___ that point again?','explain','to explain','explains','После could в вежливой просьбе используется bare infinitive.'],
    ['The device ___ store large files.','can','is can','cans','Can выражает функциональную возможность устройства.'],
    ['___ they join the meeting remotely?','Can','Do can','Are can','Вопрос с can строится инверсией can перед subject.']
  ],
  modalCore: [
    ['Employees ___ wear safety glasses in the laboratory.','must','must to','musts','Must выражает обязательное правило; после него bare infinitive.'],
    ['You ___ submit the application today; tomorrow is acceptable.','do not have to','must not','cannot to','Do not have to означает отсутствие необходимости.'],
    ['You ___ enter this area without permission.','must not','do not have to','might','Must not выражает запрет.'],
    ['You ___ check the data before drawing a conclusion.','should','should to','shoulds','Should выражает совет; после него base form.'],
    ['Visitors ___ leave their bags at reception.','have to','has to','must to','Have to выражает внешнюю необходимость; visitors — plural.'],
    ['___ I ask a question?','May','Must to','Should to','May в формальном контексте запрашивает разрешение.'],
    ['The method ___ produce different results in some conditions.','might','must to','might to','Might выражает возможность, не категоричный факт.']
  ],
  articlesAdvanced: [
    ['___ research into renewable energy has expanded.','—','A','The always','Generic uncountable research обычно используется без article.'],
    ['The research conducted at this university was ___.','extensive','an extensive','extensively','После was в этой модели нужен adjective complement.'],
    ['A scientist proposed a new explanation. ___ explanation was later tested.','The','A','—','Повторное идентифицируемое упоминание использует the.'],
    ['___ researchers need reliable funding.','—','The all','A','Generic plural noun обычно используется без article.'],
    ['The equipment in this laboratory ___ expensive.','is','are','be','Equipment обычно неисчисляемое singular noun.'],
    ['She studies ___ history of modern Europe.','the','a','— always','Перед specific noun phrase с уточнением the может указывать на определённую область/курс.'],
    ['We need ___ information about the sample.','—','an','a','Information неисчисляемое; без measure phrase не используется a/an.']
  ]
};

module.exports = { familyProfiles, familyDrills };

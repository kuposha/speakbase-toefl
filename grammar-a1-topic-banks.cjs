/* A1 lesson banks authored against the exact scope of each block. */
const q = (prompt, answer, wrong1, wrong2, why, wrong1Why, wrong2Why) =>
  [prompt, answer, wrong1, wrong2, why, wrong1Why, wrong2Why];

module.exports = {
  "A1-04": {
    base: "nouns",
    skillTarget: "plural-nouns-and-a-an",
    profile: {
      label: "singular and plural nouns; a/an",
      core: "В этой теме ученик учится различать одно и несколько исчисляемых существительных, образовывать регулярное множественное число и выбирать a/an перед существительным в единственном числе. Выбор a/an зависит от начального звука, а не только от буквы.",
      form: "Обычно plural = noun + -s (book → books). После -s, -ss, -sh, -ch, -x часто добавляется -es (bus → buses, box → boxes). Согласная + y меняется на -ies (city → cities); гласная + y сохраняется (boy → boys). A/an + singular countable noun: a bag, an apple.",
      selection: "Сначала определи число существительного. Перед одним неопределённым исчисляемым предметом нужен a/an; с plural noun артикль a/an не используется. Затем произнеси начало следующего слова: a university начинается со звука /j/, an hour — с гласного звука.",
      contrast: "A book — одна книга; books — несколько книг; some books — неопределённое количество книг. A/an не выбирается по первой букве: важен звук. Не смешивай множественное число с possessive apostrophe.",
      boundary: "Есть неправильные формы (child → children, person → people, man → men). Часть существительных неисчисляемые и не образует обычный plural (advice, information, furniture); подробно это будет в A1-10. Не каждое окончание -o требует -es.",
      pronunciation: "Окончание plural -s может произноситься /s/ или /z/, а -es после шипящего часто образует дополнительный слог /ɪz/. A/an выбираются по звуку: a European city, an honest answer.",
      traps: [
        ["two childs", "two children", "Child имеет неправильную форму plural children.", "Добавление обычного -s не создаёт форму children."],
        ["an university", "a university", "University начинается с согласного звука /j/, поэтому используется a.", "An употребляется перед начальным гласным звуком, а не перед буквой u автоматически."],
        ["three boxs", "three boxes", "После x для обычного plural добавляется -es.", "Box в единственном числе не подходит после числительного three."]
      ],
      examples: [
        ["I bought a notebook and two pens.", "Я купил(а) блокнот и две ручки.", "A стоит перед singular noun; pens имеет plural -s."],
        ["There are three buses outside.", "Снаружи стоят три автобуса.", "Bus образует plural buses."],
        ["She gave me an interesting book.", "Она дала мне интересную книгу.", "Interesting начинается с гласного звука."],
        ["The children are in the classroom.", "Дети находятся в классе.", "Child имеет irregular plural children."]
      ],
      toefl: "Точность числа и артикля нужна в Writing — Build a Sentence и в собственных ответах; plural endings помогают также корректно распознавать число на слух."
    },
    drills: [
      q("I have ___ new notebook.", "a", "an", "some", "Перед одним неопределённым singular countable noun нужен a; notebook начинается с согласного звука.", "An выбирается перед гласным звуком; notebook начинается с /n/.", "Some обычно не заменяет a в этой модели с одним singular noun."),
      q("There are four ___ in the classroom.", "desks", "desk", "deskes", "После числительного four требуется plural noun; desk образует plural через -s.", "Desk в singular не согласуется с числительным four.", "После k не требуется -es; стандартная форма — desks."),
      q("We saw ___ elephant at the zoo.", "an", "a", "the", "Elephant начинается с гласного звука, поэтому нужен an.", "A употребляется перед начальным согласным звуком.", "The обозначает определённый референт; предложение вводит один неопределённый объект."),
      q("The children put their ___ on the shelf.", "bags", "bag", "bagies", "Their указывает на несколько сумок в данном контексте; plural bag + s.", "Bag в единственном числе не согласуется с контекстом нескольких предметов.", "У bag перед окончанием стоит согласная g, поэтому добавляется -s, а не -ies."),
      q("One city, two ___.", "cities", "citys", "cityes", "Согласная перед конечной y меняется на -ies: city → cities.", "Citys нарушает правило согласная + y.", "После y здесь не добавляется -es; y меняется на i."),
      q("He waited for ___ hour.", "an", "a", "some", "В hour буква h не произносится; слово начинается с гласного звука.", "A требует начального согласного звука, которого в hour нет.", "Some не используется перед singular countable noun в этой конструкции."),
      q("There are two ___ near the station.", "buses", "bus", "busies", "Bus образует plural через -es после звука /s/.", "После two требуется plural.", "Busies — другая форма, не plural существительного bus.")
    ]
  },
  "A1-06": {
    base: "present",
    skillTarget: "present-simple-negatives-questions",
    profile: {
      label: "Present Simple negatives and questions",
      core: "В Present Simple обычный смысловой глагол строит отрицание и общий вопрос с помощью do/does. В утвердительной форме окончание -s принадлежит смысловому глаголу после he/she/it; в вопросе и отрицании оно находится на does, поэтому основной глагол возвращается к начальной форме.",
      form: "Negative: subject + do/does + not + base verb. Question: Do/Does + subject + base verb? Short answer: Yes, subject + do/does; No, subject + don't/doesn't. После does/doesn't не добавляй -s к смысловому глаголу.",
      selection: "Для I/you/we/they используй do/don't; для he/she/it и singular noun — does/doesn't. Найди подлежащее до выбора вспомогательного глагола. Be не использует do-support: Are you ready? — No, I'm not.",
      contrast: "She works here — affirmative, окончание -s на works. Does she work here? — вопрос, -s находится на does. She doesn't work here — отрицание. Нельзя написать Does she works или She doesn't works.",
      boundary: "Do может быть вспомогательным и смысловым глаголом: What do you do? В вопросах с be, modal verbs и некоторых wh-subject questions модель отличается. Эти случаи не следует сводить к одному шаблону.",
      pronunciation: "Do/does и отрицательные формы часто безударны. В разговорной речи don't и doesn't сокращаются; не пропускай вспомогательный глагол в вопросе и не добавляй лишний слог к основному глаголу.",
      traps: [
        ["Does Anna works here?", "Does Anna work here?", "После does смысловой глагол стоит в base form.", "Окончание -s уже выражено во вспомогательном does; второй маркер не нужен."],
        ["He don't like coffee.", "He doesn't like coffee.", "Для he используется doesn't.", "Don't — форма для I/you/we/they; he требует does."],
        ["Where she lives?", "Where does she live?", "Вопрос о месте с обычным смысловым глаголом требует does + subject + base form.", "В нейтральном вопросе с lives нельзя просто убрать auxiliary."]
      ],
      examples: [
        ["Do your classmates study English?", "Твои одногруппники изучают английский?", "Do согласуется с plural subject classmates."],
        ["My brother doesn't drive to work.", "Мой брат не ездит на работу на машине.", "Doesn't используется с he/my brother; drive остаётся в base form."],
        ["Where does the lesson start?", "Где начинается урок?", "Does ставится перед subject; start не получает -s."],
        ["We don't eat dinner at college.", "Мы не ужинаем в колледже.", "Для we используется don't."]
      ],
      toefl: "Порядок слов и auxiliary verbs особенно важны в Writing — Build a Sentence. В Speaking точные вопросы и отрицания помогают формулировать ответы без пропуска грамматического элемента."
    },
    drills: [
      q("___ your sister work on Saturdays?", "Does", "Do", "Is", "Sister — singular third-person subject; вопрос строится с does + base verb.", "Do используется с I/you/we/they и plural subjects.", "Is используется с be, а work здесь — обычный смысловой глагол."),
      q("My friends ___ live near the college.", "don't", "doesn't", "aren't", "Friends — plural; отрицание Present Simple использует don't + base verb.", "Doesn't требуется после he/she/it или singular subject.", "Aren't — форма be, но live здесь обычный смысловой глагол."),
q("What time ___ the bus leave?","does","do","is","The bus is a singular third-person subject; a Present Simple question needs does + base verb leave.","Do is used with plural subjects and I/you/we/they.","Is is used with be or continuous structures, not the ordinary verb leave."),
      q("He doesn't ___ computer games every evening.", "play", "plays", "playing", "После doesn't используется base form play.", "Plays дублирует окончание третьего лица, уже выраженное в doesn't.", "После does not требуется base form, а не V-ing."),
      q("___ they usually have lunch at home?", "Do", "Does", "Are", "They требует do в Present Simple question.", "Does используется с singular third-person subject.", "Are используется с be или Continuous, но здесь have — смысловой глагол."),
      q("Anna ___ not understand the question.", "does", "do", "is", "С Anna используется does not; основной глагол understand остаётся в base form.", "Do не согласуется с Anna как singular subject.", "Is not understand — неверная модель для обычного Present Simple verb."),
      q("What time ___ your lessons finish?", "do", "does", "are", "Lessons — plural subject; вопрос строится с do.", "Does используется с singular subject.", "Are не является auxiliary для finish в Present Simple.")
    ]
  },
  "A1-10": {
    base: "quantifier",
    skillTarget: "countable-uncountable-basic-quantity",
    profile: {
      label: "countable and uncountable nouns; basic quantity",
      core: "Исчисляемые существительные можно считать по отдельности: one apple, two apples. Неисчисляемые обычно обозначают вещество, массу или абстрактное понятие: water, rice, information. От этого зависит форма существительного и выбор many/much, a few/a little, some/any.",
      form: "Many + plural countable noun; much + uncountable noun; a few + plural countable; a little + uncountable. Some чаще используется в утвердительных предложениях, any — в вопросах и отрицаниях. A lot of может сочетаться с plural countable и uncountable nouns.",
      selection: "Сначала проверь, можно ли назвать отдельные единицы без measure phrase. Затем выбери many/a few для countable plural или much/a little для uncountable. В обычных утвердительных фразах some и a lot of часто звучат естественнее, чем much.",
      contrast: "How many books? — книги считаются. How much water? — вода не считается отдельными единицами. A few apples означает несколько яблок; a little milk — немного молока. Few/little без a обычно подчёркивают недостаточность.",
      boundary: "Countability может меняться по значению: coffee как напиток обычно uncountable, но two coffees может означать две порции. Для отдельных единиц неисчисляемого используем a piece of information или a glass of water. Не образуй informations или furnitures.",
      pronunciation: "Слушай окончания plural -s, особенно в сочетаниях a few books. Quantifier часто несёт логическое ударение: HOW much, a FEW. В быстрой речи some может редуцироваться.",
      traps: [
        ["many water", "much water", "Water в значении вещества — uncountable, поэтому much.", "Many требует plural countable noun."],
        ["three informations", "three pieces of information", "Information обычно uncountable; для единиц нужен measure phrase.", "Добавление -s к information не образует стандартный plural."],
        ["a little apples", "a few apples", "Apples — plural countable noun, поэтому a few.", "A little используется с uncountable nouns."]
      ],
      examples: [
        ["There are a few chairs in the room.", "В комнате есть несколько стульев.", "Chairs — plural countable noun."],
        ["We need a little water.", "Нам нужно немного воды.", "Water — uncountable noun."],
        ["Do you have any questions?", "У тебя есть вопросы?", "Any обычно используется в нейтральном вопросе."],
        ["She has a lot of homework today.", "Сегодня у неё много домашней работы.", "Homework — uncountable; a lot of подходит."]
      ],
      toefl: "Countability и quantifiers влияют на точность Reading и Writing. В академических ответах важно различать число отдельных объектов и количество вещества/данных/информации."
    },
    drills: [
      q("How ___ oranges do we need?", "many", "much", "little", "Oranges — plural countable noun; вопрос о количестве строится с how many.", "Much используется с uncountable nouns.", "Little выражает небольшое количество uncountable noun и не подходит перед oranges."),
      q("There isn't ___ juice in the bottle.", "much", "many", "a few", "Juice в значении напитка — uncountable; в отрицании естественно much.", "Many требует plural countable noun.", "A few используется с plural countable nouns."),
      q("I bought ___ bananas for breakfast.", "some", "any", "much", "В утвердительном предложении с plural countable noun some обозначает неопределённое количество.", "Any чаще используется в вопросах и отрицаниях в таком нейтральном контексте.", "Much не сочетается с plural countable bananas."),
      q("Is there ___ cheese in the fridge?", "any", "many", "a few", "Cheese здесь uncountable; any уместно в вопросе о наличии.", "Many используется с plural countable nouns.", "A few требует plural countable noun."),
      q("We have only ___ eggs, so buy more.", "a few", "a little", "much", "Eggs — plural countable noun; a few обозначает небольшое число.", "A little используется с uncountable nouns.", "Much не используется с plural countable eggs."),
      q("How ___ flour is needed for the cake?", "much", "many", "few", "Flour — uncountable; нужен how much.", "Many используется с plural countable nouns.", "Few относится к plural countable nouns и без существительного здесь не подходит."),
      q("There are ___ books on the table.", "a lot of", "much", "a little", "A lot of сочетается с plural countable books.", "Much используется с uncountable nouns.", "A little используется с uncountable nouns.")
    ]
  },
  "A1-11": {
    base: "adverb",
    skillTarget: "basic-adjectives-and-adverbs",
    profile: {
      label: "adjectives and basic adverbs",
      core: "Прилагательное описывает существительное или подлежащее после linking verb: a quiet room, the room is quiet. Наречие часто описывает, как выполняется действие: speak clearly, drive carefully. Форма зависит от функции в предложении, а не от русского перевода.",
      form: "Adjective + noun: a careful student. Subject + be/linking verb + adjective: The student is careful. Main verb + adverb: The student works carefully. Многие наречия образуются adjective + -ly (slow → slowly), но есть исключения: good → well, fast → fast, hard → hard.",
      selection: "Определи, какое слово описывается. Если это noun или subject после be/seem/look, обычно нужен adjective. Если описывается действие, обычно нужен adverb. После linking verbs вроде look, feel, sound используется adjective, когда описывается состояние/качество.",
      contrast: "She is careful — careful описывает человека. She works carefully — carefully описывает действие. He is good at maths — adjective после be. He sings well — adverb описывает sings. Hard и hardly имеют разные значения.",
      boundary: "Не все слова на -ly являются наречиями (friendly, lovely — adjectives). Некоторые формы совпадают (fast, hard, early). После feel/look/sound нельзя автоматически ставить наречие: The music sounds beautiful.",
      pronunciation: "В парах adjective/adverb ударение обычно остаётся на корне, но окончание -ly произносится отчётливо. Не добавляй -ly механически ко всем прилагательным.",
      traps: [
        ["She speaks English clear.", "She speaks English clearly.", "Clearly описывает действие speaks и является наречием.", "Clear — adjective; для нейтрального описания manner здесь нужно adverb."],
        ["The soup tastes deliciously.", "The soup tastes delicious.", "После linking verb taste описывается soup, поэтому нужен adjective.", "Deliciously описывало бы способ выполнения действия, а не качество супа."],
        ["He works hardly every day.", "He works hard every day.", "Hard означает «усердно»; hardly означает «почти не».", "Hardly меняет смысл и не означает «с большим усердием»."]
      ],
      examples: [
        ["It is a comfortable chair.", "Это удобный стул.", "Comfortable описывает существительное chair."],
        ["The chair looks comfortable.", "Стул выглядит удобным.", "После linking verb looks используется adjective."],
        ["She answered the question correctly.", "Она правильно ответила на вопрос.", "Correctly описывает действие answered."],
        ["The students worked hard.", "Студенты усердно работали.", "Hard — наречие с той же формой, что adjective."]
      ],
      toefl: "Точный выбор adjective/adverb делает описания и аргументы яснее в Writing; в Reading он помогает понимать, к какому элементу относится характеристика."
    },
    drills: [
      q("The new classroom is ___.", "bright", "brightly", "brightness", "После is описывается classroom; нужен adjective bright.", "Brightly — adverb и не используется как subject complement здесь.", "Brightness — noun, а после is в этой модели требуется adjective."),
      q("Please speak ___ during the presentation.", "clearly", "clear", "clearness", "Clearly описывает действие speak; нужен adverb of manner.", "Clear — adjective, не модифицирует глагол speak в этой модели.", "Clearness — noun, не наречие."),
      q("It was a ___ answer.", "correct", "correctly", "correction", "Перед noun answer нужен adjective correct.", "Correctly — adverb, он не определяет noun.", "Correction — noun и не подходит как attributive adjective."),
      q("The children listened ___.", "carefully", "careful", "carefulness", "Carefully описывает действие listened.", "Careful — adjective; для manner нужен adverb.", "Carefulness — noun, не модифицирует глагол."),
      q("The flowers smell ___.", "wonderful", "wonderfully", "wonder", "Smell здесь linking verb; качество цветов описывает adjective.", "Wonderfully описывало бы способ совершения действия smell, а не их качество.", "Wonder — noun/verb, не adjective complement."),
      q("My brother can run very ___.", "fast", "fastly", "fastness", "Fast — стандартная форма и adjective, и adverb; fastly не является обычным вариантом.", "Fastly не используется как стандартное наречие manner.", "Fastness — noun, не adverb."),
      q("She is a ___ driver.", "careful", "carefully", "carefulness", "Перед noun driver нужно adjective careful.", "Carefully — adverb и не определяет noun driver.", "Carefulness — noun.")
    ]
  },
  "A1-17": {
    base: "clause",
    skillTarget: "basic-coordinating-conjunctions",
    profile: {
      label: "basic conjunctions and simple clauses",
      core: "Союзы соединяют слова и простые предложения и показывают отношение между идеями. На A1 основной фокус — добавление (and), контраст (but), выбор (or) и причина (because). Союз выбирается по логической связи, а не по позиции в русском предложении.",
      form: "Clause + and + clause; clause + but + clause; clause + or + clause; because + subject + verb. Because of + noun phrase — другая модель и не является целью этого урока.",
      selection: "Спроси, как связаны две мысли: вторая добавляет информацию, противопоставляет, предлагает выбор или объясняет причину? Используй and, but, or или because соответственно.",
      contrast: "I was tired, but I studied — контраст. I studied because I had a test — причина. I can read or listen — выбор. I opened the book and started reading — последовательность/добавление.",
      boundary: "Не соединяй самостоятельные предложения одной запятой без союза. Не путай because + clause с because of + noun phrase. Более сложные союзы уступки, времени и цели будут изучаться отдельно.",
      pronunciation: "Союзы обычно безударны и связываются с соседними словами. Логическое ударение падает на важную информацию, а пауза помогает услышать границу двух clauses.",
      traps: [
        ["I stayed home because the rain.", "I stayed home because it was raining.", "Because вводит clause с subject и verb; перед noun phrase используется because of.", "Вариант без глагола не образует придаточную clause после because."],
        ["I like tea but coffee.", "I like tea and coffee.", "В нейтральном значении перечисления нужен and.", "But обозначает контраст, которого здесь нет."],
        ["Do you want water and juice? (one choice)", "Do you want water or juice?", "Or предлагает выбор между альтернативами.", "And соединяет оба предмета, а не предлагает выбор."]
      ],
      examples: [
        ["I study English and Italian.", "Я изучаю английский и итальянский.", "And добавляет второй предмет."],
        ["The room is small, but it is comfortable.", "Комната маленькая, но удобная.", "But выражает контраст."],
        ["We can walk or take a bus.", "Мы можем пойти пешком или поехать на автобусе.", "Or предлагает альтернативы."],
        ["I went to bed early because I was tired.", "Я лёг(ла) спать рано, потому что устал(а).", "Because вводит причину с subject и verb."]
      ],
      toefl: "Связки помогают делать ответы в Writing и Speaking логичными: добавлять аргумент, показывать контраст и ясно объяснять причину."
    },
    drills: [
      q("I wanted to go for a walk, ___ it started to rain.", "but", "and", "because", "Вторая часть противопоставляет план фактическому событию; нужен but.", "And только добавляет информацию и не показывает контраст.", "Because вводит причину, но здесь отношение противопоставления."),
      q("We stayed at home ___ we were tired.", "because", "but", "or", "Because вводит причину и clause we were tired.", "But обозначает контраст, а не причину.", "Or предлагает выбор, которого в предложении нет."),
      q("Would you like tea ___ coffee?", "or", "and", "because", "Or предлагает выбор между двумя напитками.", "And соединяет оба напитка, а не задаёт выбор.", "Because не может выражать альтернативу в этой конструкции."),
      q("She opened the window ___ turned on the fan.", "and", "but", "because", "And соединяет два последовательных действия.", "But выражает контраст, которого здесь нет.", "Because требует придаточную причину, а turned on the fan — второе действие."),
      q("I like this phone, ___ it is too expensive.", "but", "or", "because", "But показывает контраст между симпатией и высокой ценой.", "Or обозначает выбор, а не противопоставление.", "Because не соединяет две идеи с отношением контраста."),
      q("He took an umbrella ___ it was raining.", "because", "and", "or", "Because объясняет причину, по которой он взял зонт.", "And только добавляет информацию и не обозначает причину.", "Or выражает выбор, а не причину."),
      q("You can do the exercise now ___ after dinner.", "or", "but", "because", "Or соединяет две альтернативы по времени.", "But выражает контраст, а не выбор.", "Because требует причину, а не альтернативу.")
    ]
  },
  "A1-18": {
    base: "preposition",
    skillTarget: "basic-time-and-place-prepositions",
    profile: {
      label: "basic prepositions of time and place",
      core: "Предлоги связывают существительное или местоимение с другими элементами предложения и уточняют время, место или положение. В этом блоке изучаются базовые сочетания at/on/in для времени и места, а также несколько частотных prepositions of place.",
      form: "Time: at + clock time (at 9), on + day/date (on Monday), in + month/year/part of day (in June, in 2026, in the morning). Place: at + точка/учреждение (at the station), in + внутри/город/страна (in the room, in Helsinki), on + поверхность (on the table).",
      selection: "Для времени определи масштаб: точный час — at; день/дата — on; месяц, год или часть дня — in. Для места представь отношение: внутри — in, на поверхности — on, точка/место назначения — at.",
      contrast: "At school — в школе как в учреждении/месте деятельности; in the school — внутри здания. On the table — на поверхности; in the box — внутри. At 8 — конкретный час; on Friday — день; in winter — сезон.",
      boundary: "Есть устойчивые выражения и исключения: at night, at the weekend (BrE) / on the weekend (AmE), in the morning, on time, in time. Предлоги нельзя переводить дословно с русского; сложное управление будет в A2-17.",
      pronunciation: "Короткие предлоги часто безударны и редуцируются перед существительным. В Listening слушай всё сочетание целиком: at the station, in the morning, on Monday.",
      traps: [
        ["at Monday", "on Monday", "С днём недели используется on.", "At употребляется с точным временем или некоторыми устойчивыми выражениями, но не с днём недели."],
        ["in 9 o'clock", "at 9 o'clock", "С точным временем на часах используется at.", "In применяется с более широким периодом, не с точным часом."],
        ["The keys are in the table.", "The keys are on the table.", "On обозначает положение на поверхности стола.", "In означает внутри; ключи лежат на поверхности."]
      ],
      examples: [
        ["The lesson starts at ten.", "Урок начинается в десять.", "At используется с точным временем."],
        ["We have an exam on Tuesday.", "Во вторник у нас экзамен.", "On используется с днём недели."],
        ["She was born in 2008.", "Она родилась в 2008 году.", "In используется с годом."],
        ["The phone is in my bag.", "Телефон в моей сумке.", "In показывает, что предмет находится внутри."]
      ],
      toefl: "Предлоги помогают точно понимать временные и пространственные отношения в Reading и Listening, а их устойчивые сочетания важны для точности Writing."
    },
    drills: [
      q("The film starts ___ 7:30.", "at", "on", "in", "At употребляется с точным временем на часах.", "On ставится перед днями и датами.", "In используется с месяцами, годами и более широкими периодами."),
      q("Our English class is ___ Wednesday.", "on", "at", "in", "On используется с днём недели.", "At не употребляется с обычным днём недели в этом значении.", "In используется с месяцами и годами, а не с Wednesday."),
      q("My birthday is ___ November.", "in", "on", "at", "In используется с месяцем.", "On ставится перед датой или днём недели.", "At используется с точным временем и некоторыми устойчивыми выражениями."),
      q("The notebook is ___ the desk.", "on", "in", "at", "On показывает положение на поверхности стола.", "In означает внутри предмета/пространства.", "At указывает точку/место, но не положение на поверхности."),
      q("They live ___ Finland.", "in", "on", "at", "С названием страны используется in.", "On не употребляется с названием страны для обозначения проживания.", "At здесь не подходит для страны как территории проживания."),
      q("The children are playing ___ the garden.", "in", "on", "at", "In показывает, что дети находятся внутри/на территории сада.", "On обозначает поверхность или линию, но не пространство сада.", "At было бы точкой или местом встречи, а здесь важна территория."),
      q("We usually travel to college ___ bus.", "by", "on", "with", "Устойчивое выражение для способа передвижения — by bus.", "On bus не является стандартной моделью для нейтрального обозначения транспорта.", "With bus обычно означает «с автобусом», а не способ передвижения.")
    ]
  },
  "A1-03":{base:"be",skillTarget:"be-negative-questions-short-answers",profile:{
label:"verb be — negatives, questions and short answers",
core:"Be используется для описания состояния, личности, возраста, происхождения и местонахождения. В отрицании not ставится после am/is/are; в общем вопросе be переносится перед subject. Короткий ответ повторяет be, а не заменяет его do.",
form:"Affirmative: I am; he/she/it is; you/we/they are. Negative: am not / isn't / aren't. Question: Am/Is/Are + subject? Short answer: Yes, subject + be; No, subject + be + not.",
selection:"Найди subject и выбери am/is/are. Для вопроса вынеси be перед subject; для отрицания добавь not. В коротком ответе используй тот же be, который нужен subject.",
contrast:"She is from Spain. — She isn't from Spain. Is she from Spain? — Yes, she is. Не говори *Does she be…? и не повторяй полную положительную форму в short answer.",
boundary:"В стандартном английском am not обычно не сокращается в утвердительно-отрицательную форму; aren't I? используется в вопросительном tag. Be отличается от обычных глаголов: для него не нужен do-support.",
pronunciation:"Сокращения I'm, he's, aren't и isn't частотны в речи. Слушай auxiliary в коротком ответе: Yes, she is / No, she isn't.",
traps:[
["Does he be tired?","Is he tired?","Be образует вопрос инверсией am/is/are без do-support.","Does используется с обычными смысловыми глаголами, но не с be."],
["They isn't ready.","They aren't ready.","They требует are; отрицание — are not / aren't.","Isn't согласуется с he/she/it и singular subject."],
["Yes, he does. (answering Is he ready?)","Yes, he is.","Короткий ответ повторяет be из вопроса.","Does используется как auxiliary для обычного Present Simple verb, а не для be."]
],
examples:[
["I am a student at the university.","Я студент(ка) университета.","I согласуется с am."],
["The classrooms aren't empty.","Аудитории не пустые.","Plural subject classrooms требует are; отрицание aren't."],
["Are your friends at home?","Твои друзья дома?","Вопрос начинается с are перед subject."],
["No, they aren't.","Нет.","Short answer повторяет are и отрицательную форму."]
],
toefl:"Be часто используется для определения, характеристики и местонахождения в Writing — Build a Sentence, а точные короткие ответы полезны для Speaking interview."
},drills:[
q("My classmates ___ not in the library today.","are","is","am","Classmates is plural; negative be uses are not.","Is is singular and does not agree with classmates.","Am is used with I, not a plural third-person subject."),
q("___ your new teacher from Canada?","Is","Are","Does","Teacher is singular; be question uses Is before the subject.","Are is plural/you form and does not agree with singular teacher.","Does is used with ordinary verbs, not be."),
q("The computer ___ very old, but it still works.","is","are","am","The computer is singular; use is before an adjective.","Are does not agree with singular computer.","Am is used with I."),
q("We ___ not late for the lesson.","are","is","be","We takes are; the negative is are not.","Is is third-person singular.","Be is the base form and cannot serve as the finite present verb here."),
q("Is Daniel at college? — Yes, he ___.","is","does","are","The short answer repeats is from the question and agrees with he.","Does is not used in a short answer to a be question.","Are does not agree with he."),
q("Are the students ready? — No, they ___.","aren't","isn't","don't","Students/they is plural; the negative short answer uses aren't.","Isn't is singular.","Don't is used with ordinary verbs, not be."),
q("___ I in the correct classroom?","Am","Is","Do","The first-person singular question form of be is Am I…?","Is is used with he/she/it or a singular noun.","Do is not used to form questions with be.")
]},
"A1-07":{base:"have",skillTarget:"have-have-got-possession",profile:{
label:"have and have got — possession and relationships",
core:"Have and have got describe possession, relationships and characteristics. Have got is especially common in British English; have is used widely in both British and American English. The negative and question forms depend on which pattern is chosen.",
form:"Have got: subject + have/has got; negative haven't/hasn't got; question Have/Has + subject + got? Have: subject + have/has; negative don't/doesn't have; question Do/Does + subject + have?",
selection:"Сначала выбери pattern: have got или have. Не смешивай их: после Does ставь have, а после Has в pattern have got — got. В third person singular используйте has/has got.",
contrast:"She has got a bicycle. / She has a bicycle. Has she got a bicycle? / Does she have a bicycle? She hasn't got one. / She doesn't have one.",
boundary:"Have для приёма пищи, занятий и событий (have breakfast, have a shower) обычно строит вопрос/отрицание с do-support. Это отличается от possession have got. В прошедшем времени was/were not используется got.",
pronunciation:"Have got часто сокращается в речи: I've got, she's got, haven't got. В американском английском possession have без got тоже очень частотен.",
traps:[
["Does she has a car?","Does she have a car?","После does смысловой глагол остаётся в base form have.","Has дублирует третье лицо, уже выраженное во вспомогательном does."],
["Has he a computer? (in this target pattern)","Has he got a computer?","В модели have got вопрос строится Has + subject + got.","Для полного have без got в нейтральном современном шаблоне вопрос чаще Do/Does + subject + have."],
["They hasn't got a dog.","They haven't got a dog.","They требует have, отрицание — haven't.","Hasn't используется с he/she/it и singular subject."]
],
examples:[
["I have got two younger brothers.","У меня есть два младших брата.","I + have got."],
["She doesn't have a driving licence.","У неё нет водительских прав.","Отрицание have без got: doesn't + base form have."],
["Have you got any questions?","У тебя есть вопросы?","Вопрос строится Have + subject + got."],
["Does your college have a gym?","В твоём колледже есть спортзал?","Have без got использует do-support."]
],
toefl:"Have и have got полезны для описания участников, ресурсов и условий в Speaking; важно не смешивать две грамматические модели."
},drills:[
q("My sister ___ got a new laptop.","has","have","is","Third-person singular sister takes has got.","Have is used with I/you/we/they.","Is does not form possession with got."),
q("___ your parents got a car?","Have","Has","Do","Parents is plural; have got question begins with Have.","Has is used with singular third-person subject.","Do belongs to the have pattern without got; this question includes got."),
q("He doesn't ___ any free time on weekdays.","have","has","got","After doesn't the main verb is base form have.","Has duplicates the third-person marker already carried by does.","Got cannot follow doesn't directly in this pattern."),
q("We ___ got a large garden.","have","has","are","We takes have got.","Has is used with he/she/it.","Are is a form of be, not the have got pattern."),
q("Does Anna ___ a bicycle?","have","has","got","Does + subject + base form have is the question pattern without got.","Has duplicates third-person marking after does.","Got cannot follow does directly in the no-got pattern."),
q("I ___ not got my keys with me.","have","has","am","The negative have got form for I is have not got / haven't got.","Has is third-person singular.","Am is be and does not express possession here."),
q("___ Mark got a younger sister?","Has","Does","Have","Has + singular subject + got forms the have got question.","Does is used with have without got; got is already present in this question.","Have does not agree with singular Mark.")
]},
"A1-08":{base:"there",skillTarget:"there-is-there-are-basic",profile:{
label:"there is / there are — existence and quantity",
core:"There is/there are introduces the existence or presence of something. The verb agrees with the noun phrase that follows: singular or uncountable nouns use is; plural nouns use are.",
form:"There is + singular countable noun / uncountable noun. There are + plural countable noun. Negative: there isn't / there aren't. Question: Is there…? / Are there…? Short answers repeat is/are.",
selection:"Посмотри на noun phrase после there. Если предмет один или noun неисчисляемый — is; если предметов несколько — are. В вопросе переставь is/are перед there.",
contrast:"There is a book on the desk (one). There are two books (plural). It is a book describes an identified object; there is a book introduces its existence.",
boundary:"В разговорном английском встречается there's + plural noun, но в письменной учебной норме сохраняй согласование there are. Для количества используйте some/any, но не a/an перед uncountable noun.",
pronunciation:"There is часто сокращается to there's; there are может произноситься слитно. В Listening различай singular is и plural are по контексту и следующему noun.",
traps:[
["There are a computer in the room.","There is a computer in the room.","A computer — singular noun phrase; use there is.","Are requires plural subject."],
["There is three chairs.","There are three chairs.","Three chairs is plural, so use are.","Is is singular and does not agree with plural chairs."],
["Is it any milk in the fridge?","Is there any milk in the fridge?","Вопрос о наличии строится Is there + noun phrase?","It не используется как формальный вводный subject существования в этой модели."]
],
examples:[
["There is a new café near the station.","Рядом со станцией есть новое кафе.","A new café — singular; is."],
["There are several books on the shelf.","На полке несколько книг.","Books — plural; are."],
["There isn't any water in the bottle.","В бутылке нет воды.","Water — uncountable; is not."],
["Are there any empty seats?","Есть свободные места?","Seats — plural; вопрос начинается Are there."]
],
toefl:"There is/are помогает корректно описывать расположение, данные, объекты и ресурсы в Speaking and Writing."
},drills:[
q("___ a post office next to the bank.","There is","There are","It are","A post office is singular; use there is.","There are requires a plural noun.","It are has incorrect agreement and is not the existence pattern."),
q("There ___ two windows in the classroom.","are","is","be","Two windows is plural; use are.","Is is singular.","Be is not a finite present form in this sentence."),
q("___ there any coffee left?","Is","Are","Do","Coffee is uncountable; the question uses Is there.","Are is used with plural countable noun phrases.","Do does not form this existence question."),
q("There ___ not enough chairs for everyone.","are","is","am","Chairs is plural; negative there are becomes there are not.","Is does not agree with plural chairs.","Am is only used with I."),
q("There is ___ information about the exam on the website.","some","a","many","Information is uncountable; some can introduce an unspecified amount.","A is used before singular countable nouns.","Many requires plural countable nouns."),
q("Are there any questions? — Yes, there ___.","are","is","do","The question uses are, so the short answer repeats are.","Is is singular.","Do is not used in short answers to there are."),
q("___ a lot of traffic in the city centre today.","There is","There are","It are","Traffic is uncountable; use there is.","There are requires a plural countable noun phrase.","It are is not a grammatical existential construction.")
]},
"A1-09":{base:"possessive",skillTarget:"possessive-determiners-pronouns-demonstratives",profile:{
label:"possessive determiners, possessive pronouns and demonstratives",
core:"Possessive determiners (my, your, his, her, its, our, their) stand before a noun. Possessive pronouns (mine, yours, his, hers, ours, theirs) replace a noun phrase. Demonstratives this/that/these/those identify near or distant singular/plural items.",
form:"Possessive determiner + noun: my book. Possessive pronoun alone: the book is mine. Demonstrative: this/that + singular noun; these/those + plural noun. Possessive 's: Maria's phone.",
selection:"Проверь, есть ли после пропуска существительное: перед noun используй my/your/their; без noun — mine/yours/theirs. Затем проверь число и расстояние: this/that singular, these/those plural.",
contrast:"This is my bag. This bag is mine. These shoes are ours. That is their car. Не ставь possessive pronoun непосредственно перед существительным.",
boundary:"His может быть и determiner, и pronoun (his book / the book is his). Its — possessive determiner without apostrophe; it's means it is/it has. Не смешивай its и it's.",
pronunciation:"This/these различаются по гласному и числу; that/those также. В Listening обращай внимание на форму demonstrative и существительное после него.",
traps:[
["This book is my.","This book is mine.","Без существительного после формы нужна possessive pronoun mine.","My — determiner и требует noun."],
["These is my keys.","These are my keys.","These обозначает несколько предметов и требует are.","Is используется с this/that или singular subject."],
["That are your bags.","Those are your bags.","Plural noun bags требует demonstrative those и are.","That относится к одному удалённому предмету и не согласуется с are."]
],
examples:[
["My brother studies engineering.","Мой брат изучает инженерное дело.","My стоит перед существительным brother."],
["This notebook is mine.","Эта тетрадь моя.","Mine заменяет my notebook."],
["Those are our classmates.","Вон те — наши одногруппники.","Those указывает на несколько удалённых людей."],
["The red bicycle is hers.","Красный велосипед её.","Hers используется самостоятельно, без существительного после."]
],
toefl:"Possessive reference помогает ясно связывать участников, объекты и идеи в Reading; точные determiners and pronouns важны для построения предложений."
},drills:[
q("Is this ___ umbrella?","your","yours","you","Перед существительным umbrella требуется possessive determiner your.","Yours заменяет существительное и не ставится перед umbrella.","You is a personal pronoun, not a possessive form."),
q("The blue backpack is ___.","mine","my","I","Без существительного после пропуска нужна possessive pronoun mine.","My — determiner и требует noun.","I — subject pronoun, не выражает принадлежность в этой позиции."),
q("___ are my keys here on the table.","These","This","That","Keys is plural and close to the speaker; use these.","This is singular.","That points to one distant item, not several nearby keys."),
q("Look at ___ building across the street.","that","those","these","Building is singular and distant; use that.","Those is plural.","These is plural and refers to nearby items."),
q("The students have finished ___ project.","their","theirs","them","Перед noun project требуется possessive determiner their.","Theirs replaces the noun phrase and cannot stand before project.","Them is an object pronoun, not a possessive determiner."),
q("This phone belongs to Maria. It is ___.","hers","her","she","Hers is a possessive pronoun used without a noun after it.","Her is a determiner before a noun or object pronoun.","She is a subject pronoun."),
q("The company changed ___ website last month.","its","it's","it","Its is the possessive determiner before website.","It's means it is/it has, not possession.","It is a subject/object pronoun and does not modify website.")
]},

"A1-12":{base:"frequency",skillTarget:"frequency-adverbs-basic-word-order",profile:{
label:"adverbs of frequency and basic word order",
core:"Adverbs of frequency show how often an action happens. In Present Simple, they usually stand before the main verb but after be. Expressions such as every day and once a week often stand at the end of the clause.",
form:"Subject + always/usually/often/sometimes/rarely/never + main verb. Subject + be + frequency adverb + complement. Time expression: subject + verb + object + once/twice a week/every day.",
selection:"Определи, является ли глагол be или обычным смысловым глаголом. Перед обычным глаголом ставь frequency adverb; после am/is/are — обычно после be.",
contrast:"She usually studies at night. She is usually tired after class. Не ставь usually в одну и ту же позицию механически после be и перед обычным глаголом.",
boundary:"Sometimes and usually can occur at the beginning or end for emphasis. Never is already negative in meaning; do not add don't in the same clause (*I don't never…).",
pronunciation:"Frequency adverbs часто безударны, но never/always могут получать смысловое ударение. В речи различай usually /ˈjuːʒuəli/ и sometimes /ˈsʌmtaɪmz/.",
traps:[
["She goes always to college by bus.","She always goes to college by bus.","Frequency adverb обычно стоит перед смысловым глаголом.","Always после полного дополнения звучит неестественно в нейтральном порядке слов."],
["He always is late.","He is always late.","С be frequency adverb обычно стоит после am/is/are.","Перед be обычно не ставится в нейтральной конструкции."],
["I don't never drink coffee.","I never drink coffee.","Never уже имеет отрицательное значение; дополнительное don't создаёт double negative.","Don't + never — двойное отрицание в стандартном английском."]
],
examples:[
["I usually walk to college.","Я обычно хожу в колледж пешком.","Usually стоит перед основным глаголом walk."],
["Our teacher is often busy.","Наш преподаватель часто занят.","Often ставится после be."],
["They sometimes study in the library.","Они иногда занимаются в библиотеке.","Sometimes стоит перед смысловым глаголом."],
["We have English lessons twice a week.","У нас занятия английским два раза в неделю.","Frequency phrase ставится в конце."]
],
toefl:"Adverbs of frequency помогают точно описывать привычки и повторяющиеся процессы в Speaking и Writing."
},drills:[
q("My brother ___ drinks coffee in the morning.","usually","is usually","usual","Usually stands before the main verb drinks.","Is usually adds an unnecessary be before an ordinary verb.","Usual is an adjective, not an adverb."),
q("The library is ___ quiet in the afternoon.","often","often is","oftenly","With be, the frequency adverb usually follows is.","Often is places the adverb before be in a marked/non-neutral position.","Oftenly is not a standard English adverb."),
q("We ___ go to the cinema on weekdays.","rarely","are rarely","rare","Rarely comes before the ordinary verb go.","Are rarely adds be where the ordinary verb needs no auxiliary.","Rare is an adjective, not the required adverb."),
q("She is ___ late for class; she arrives on time every day.","never","doesn't never","not never","Never expresses zero frequency and follows be.","Doesn't never creates double negative and uses do-support unnecessarily.","Not never is a nonstandard double negative."),
q("They have football practice ___ a week.","twice","two","second","Twice a week expresses frequency two times in one week.","Two needs a noun phrase such as two times.","Second is an ordinal, not a frequency expression."),
q("I ___ check my messages before breakfast.","sometimes","am sometimes","some time","Sometimes normally comes before the main verb check.","Am sometimes would require a be-complement, but check is an ordinary verb.","Some time means an amount/period of time, not frequency."),
q("Our lessons are ___ interesting.","usually","usual","use","Usually modifies the adjective interesting and follows be.","Usual is an adjective and needs a noun or other suitable complement.","Use is a verb/noun, not an adverb.")
]},
"A1-13":{base:"presentContinuous",skillTarget:"present-continuous-form-and-core-uses",profile:{
label:"Present Continuous — form and core uses",
core:"Present Continuous describes an action happening now or around the current period, and a temporary situation. It presents an action as in progress rather than as a routine or general fact.",
form:"Affirmative: subject + am/is/are + V-ing. Negative: subject + am/is/are + not + V-ing. Question: Am/Is/Are + subject + V-ing? Spelling: make → making; sit → sitting; lie → lying.",
selection:"Сначала найди subject и форму be, затем добавь -ing к смысловому глаголу. Используй Continuous для действия в процессе или временной ситуации, а не для обычной привычки.",
contrast:"I study English every day (routine). I am studying English now (in progress). She works in Helsinki (usual job). She is working from home this week (temporary).",
boundary:"Некоторые stative verbs (know, believe, want, need, understand) обычно не используются в Continuous в своём основном значении. Не добавляй -ing к be без auxiliary.",
pronunciation:"Окончание -ing произносится /ɪŋ/; не добавляй отдельный слог /g/. Сокращения I'm, he's, they're важны для Listening.",
traps:[
["She is study now.","She is studying now.","Present Continuous requires be + V-ing.","Study is the base form and cannot follow is in this construction."],
["They are play football.","They are playing football.","После are требуется V-ing.","Play без -ing не завершает Present Continuous."],
["I am knowing the answer.","I know the answer.","Know — stative verb, обычно используется в Present Simple.","Am knowing звучит неестественно для состояния знания."]
],
examples:[
["The students are taking a test now.","Сейчас студенты пишут тест.","Действие происходит в момент речи."],
["I am learning Italian this semester.","В этом семестре я изучаю итальянский.","Временная ситуация вокруг настоящего периода."],
["It is raining outside.","На улице идёт дождь.","Процесс в момент речи."],
["She isn't working today.","Сегодня она не работает.","Отрицание: is not + V-ing."]
],
toefl:"Present Continuous нужен, чтобы точно описывать происходящие сейчас события и временные изменения; это полезно для Listen and Repeat и Take an Interview."
},drills:[
q("The children ___ in the garden right now.","are playing","play","is playing","Right now signals an action in progress; plural subject requires are + V-ing.","Play is Present Simple and does not express the action in progress.","Is playing does not agree with plural subject children."),
q("I ___ for my English exam this week.","am preparing","prepare","is preparing","This week describes a temporary activity around now; use am preparing.","Prepare describes a general routine rather than the temporary current activity.","Is preparing does not agree with I."),
q("Look! The bus ___.","is coming","comes","are coming","Look signals an event happening now; bus is singular, so is coming.","Comes is Present Simple and would describe a schedule/habit.","Are coming does not agree with singular bus."),
q("We ___ not watching the film at the moment.","are","do","is","Present Continuous negative uses are not + V-ing with we.","Do not is used with ordinary Present Simple verbs, not Continuous.","Is does not agree with we."),
q("___ your sister studying in her room now?","Is","Does","Are","Present Continuous question with singular sister begins Is she…?","Does is used with ordinary Present Simple, not Continuous.","Are does not agree with singular sister."),
q("The baby is ___, so please be quiet.","sleeping","sleep","sleeps","After is, the main verb requires V-ing.","Sleep is the base form, not V-ing.","Sleeps is Present Simple."),
q("They are ___ a new project this month.","developing","develop","develops","Developing is the V-ing form after are.","Develop is the base form.","Develops is Present Simple and cannot follow are here.")
]},
"A1-14":{base:"simpleContinuous",skillTarget:"present-simple-vs-present-continuous",profile:{
label:"Present Simple vs Present Continuous",
core:"Present Simple describes habits, routines, general truths and stable situations. Present Continuous describes actions in progress now or temporary situations around the present. The time expression helps, but the meaning determines the choice.",
form:"Present Simple: subject + base verb (he/she/it + -s). Present Continuous: subject + am/is/are + V-ing. Negative and questions use do/does in Simple and be in Continuous.",
selection:"Спроси, является ли действие привычным/постоянным или происходящим/временным. Проверь stative verb: если глагол обозначает состояние, обычно нужен Present Simple.",
contrast:"She works at a hospital (job/routine). She is working from home this week (temporary). I know the answer (state). I am writing the answer now (action in progress).",
boundary:"Some verbs can be stative or dynamic depending on meaning: think (opinion / consider), have (possess / experience), see (perceive / meet). Learn the intended meaning, not a single fixed tense for every verb.",
pronunciation:"В вопросах do/does и am/is/are часто редуцируются; слушай наличие -ing и вспомогательного глагола. Конечное -s в Present Simple помогает распознавать third-person singular.",
traps:[
["She is going to college every day.","She goes to college every day.","Every day signals a routine; use Present Simple.","Present Continuous обычно не используется для регулярной ежедневной привычки."],
["I am knowing him well.","I know him well.","Know обозначает состояние и обычно стоит в Present Simple.","Am knowing неестественно для постоянного знания."],
["They play football now (action in progress).","They are playing football now.","Now + action in progress requires Present Continuous.","Play is Present Simple and suggests a habit or general fact."]
],
examples:[
["My brother studies programming every evening.","Мой брат изучает программирование каждый вечер.","Регулярная привычка — Present Simple."],
["He is studying for a test at the moment.","Сейчас он готовится к тесту.","Действие в процессе — Present Continuous."],
["Water boils at 100°C.","Вода кипит при 100°C.","Общий научный факт — Present Simple."],
["We are staying with our aunt this week.","На этой неделе мы живём у тёти.","Временная ситуация — Present Continuous."]
],
toefl:"Различие между routine и ongoing action полезно при описании расписаний, привычек и текущих процессов в TOEFL speaking and writing."
},drills:[
q("My father usually ___ to work by train.","goes","is going","go","Usually describes a routine; third-person singular uses goes.","Is going describes an action in progress or a planned journey, not the usual routine.","Go does not have the required -s with my father."),
q("Please be quiet. The baby ___.","is sleeping","sleeps","sleep","The action is happening now; use Present Continuous.","Sleeps would describe a habit or general fact.","Sleep is a base form and needs an auxiliary in Continuous."),
q("I ___ this word. What does it mean?","don't understand","am not understanding","doesn't understand","Understand is normally stative; use Present Simple negative with I.","Am not understanding is not the usual form for this state verb.","Doesn't does not agree with I."),
q("The shop ___ at nine every morning.","opens","is opening","open","Every morning indicates a regular schedule; use Present Simple with -s.","Is opening describes a temporary/current action, not a fixed routine.","Open lacks third-person singular -s."),
q("Look! Those children ___ across the road.","are running","run","runs","Look indicates an action in progress; those children is plural.","Run is Present Simple and does not describe the immediate action.","Runs is third-person singular and does not agree with children."),
q("She ___ in a café, but this month she ___ at the university library.","works / is working","is working / works","work / is work","Her regular job is works; this month's temporary arrangement is is working.","The order reverses the routine and temporary meanings.","Work lacks -s and is work is not a valid Continuous form."),
q("They ___ two languages fluently.","speak","are speaking","speaks","A stable ability/general fact uses Present Simple; they takes speak.","Are speaking suggests an action happening right now, not a stable ability.","Speaks does not agree with plural they.")
]},

"A1-15":{base:"modal",skillTarget:"can-cant-ability-permission-requests",profile:{
label:"can and can't — ability, permission and requests",
core:"Can/can't expresses ability, possibility and permission. Can is a modal verb: it does not change for he/she/it and is followed by the base form without to.",
form:"Affirmative: subject + can + base verb. Negative: subject + cannot/can't + base verb. Question: Can + subject + base verb? Short answer: Yes, subject can / No, subject can't.",
selection:"После can ставь обычную начальную форму глагола без to и без -s. Для вопроса перенеси can перед subject; для отрицания добавь not.",
contrast:"She can swim. She can't drive. Can she speak Italian? — Yes, she can. Don't use *can to swim or *she cans.",
boundary:"Can also asks for permission or makes informal requests: Can I open the window? More formal requests may use could, but the core structure remains modal + base verb. Don't confuse can with be able to in all tenses.",
pronunciation:"Can часто редуцируется до /kən/ в утвердительном предложении; can't сохраняет более заметный отрицательный компонент. Различай can/can't на слух.",
traps:[
["He cans speak English.","He can speak English.","Modal can не принимает окончание -s.","Can не меняется по лицам."],
["I can to swim.","I can swim.","После can используется bare infinitive без to.","To не ставится после modal can."],
["Can she speaks French?","Can she speak French?","После can основной глагол в base form.","Speaks добавляет окончание -s, которое не ставится после modal."]
],
examples:[
["I can use a computer.","Я умею пользоваться компьютером.","Can expresses ability."],
["My younger brother can't drive yet.","Мой младший брат пока не умеет водить.","Can't + base verb."],
["Can I borrow your pen?","Можно взять твою ручку?","Can вежливо запрашивает разрешение."],
["Can you help me with this exercise?","Ты можешь помочь мне с этим упражнением?","Can + subject + base verb forms a request."]
],
toefl:"Can/can't помогает ясно говорить о навыках, возможностях и просьбах в TOEFL Speaking."
},drills:[
q("My sister ___ play the piano very well.","can","cans","is can","Can is the modal for ability and does not change with she.","Cans incorrectly adds third-person -s to a modal.","Is can stacks be and a modal."),
q("I can ___ three languages.","speak","to speak","speaks","Can is followed by the bare infinitive speak.","To is not used after can.","Speaks is not used after a modal."),
q("___ you open the window, please?","Can","Do","Are","Can + subject + base verb forms a request.","Do is not used before the base verb in this modal question.","Are is the form of be and cannot be followed by open in this structure."),
q("He ___ drive yet; he is only sixteen.","can't","doesn't can","isn't can","Can't is the negative form of can.","Doesn't cannot be combined with modal can.","Isn't can is not grammatical."),
q("Can Anna swim? — Yes, she ___.","can","does","is","The short answer repeats the modal can.","Does is used in ordinary Present Simple short answers.","Is is a form of be, not the modal in the question."),
q("Students ___ use their phones during the exam; it is forbidden.","can't","can","don't can","Can't expresses prohibition in this context.","Can would give permission, the opposite meaning.","Don't can is not a grammatical negative modal form."),
q("___ I sit here, or is this seat taken?","Can","Am","Do","Can asks for permission.","Am is be and cannot be used before sit in this structure.","Do does not express permission in this modal question.")
]},
"A1-16":{base:"imperative",skillTarget:"imperatives-and-lets",profile:{
label:"imperatives and let's",
core:"Imperatives give instructions, directions, warnings and requests. The positive form uses the base verb without a subject; the negative form uses don't + base verb. Let's + base verb suggests doing something together.",
form:"Positive: base verb + object/complement. Negative: Don't + base verb. Polite request: Please + imperative. Suggestion: Let's + base verb; negative suggestion: Let's not + base verb.",
selection:"Определи, обращаешься ли ты напрямую к человеку или предлагаешь совместное действие. Для команды используй base verb; для предложения совместного действия — let's.",
contrast:"Open the book (instruction). Don't open the window (negative command). Let's start (shared suggestion). Let's not wait (negative suggestion).",
boundary:"Imperatives normally omit the subject you. Please softens a request but does not change the verb form. Do not confuse Let's with Let us in all formal contexts.",
pronunciation:"Imperatives часто выделяются интонацией; please смягчает команду. В разговоре let's произносится слитно, но в письме апостроф обязателен.",
traps:[
["To open your books.","Open your books.","Imperatives use the bare verb without to.","To-infinitive is not the imperative form."],
["Don't to touch the screen.","Don't touch the screen.","After don't in an imperative use the base verb without to.","To is not used after do not."],
["Let's to go home.","Let's go home.","After let's use the base verb.","To is not used after let's."]
],
examples:[
["Turn left at the traffic lights.","Поверните налево у светофора.","Positive imperative uses base verb."],
["Please wait outside.","Пожалуйста, подождите снаружи.","Please softens the request."],
["Don't forget your student card.","Не забудь студенческий билет.","Negative imperative = don't + base verb."],
["Let's review the answers together.","Давай вместе проверим ответы.","Let's suggests joint action."]
],
toefl:"Instructions and polite requests help in campus scenarios and interview responses; let's is useful for suggesting a shared plan."
},drills:[
q("___ your name at the top of the page.","Write","To write","Writes","The imperative uses the base verb Write.","To write is an infinitive, not a direct instruction.","Writes is third-person singular."),
q("___ touch the laboratory equipment without permission.","Don't","Doesn't","Not","Negative imperative begins with Don't + base verb.","Doesn't is a third-person present negative, not an imperative.","Not cannot form a negative command without do."),
q("Let's ___ the next exercise together.","do","to do","does","Let's is followed by a bare verb.","To is not used after let's.","Does is third-person singular, not the base form."),
q("Please ___ your phone during the presentation.","turn off","turns off","to turn off","Please + imperative uses the base verb phrase turn off.","Turns adds third-person -s.","To turn off is infinitive, not imperative."),
q("___ be late for the interview.","Don't","Not","Doesn't","Don't + base verb forms a negative command.","Not alone cannot form the imperative.","Doesn't is not used to address the listener directly."),
q("___ take a short break?","Let's","Do we","Are we","Let's take is a suggestion for a shared action.","Do we take forms a question about habit/schedule, not a suggestion.","Are we taking asks about a planned event, not the imperative suggestion form."),
q("Let's not ___ the answer before everyone has tried.","reveal","to reveal","reveals","Let's not + base verb.","To is not used after let's not.","Reveals incorrectly adds third-person -s.")
]},
"A1-19":{base:"past",skillTarget:"past-simple-introduction-affirmative",profile:{
label:"Past Simple — introduction to past events",
core:"Past Simple describes completed actions and states in the past. In affirmative sentences, regular verbs usually take -ed, while irregular verbs have individual V2 forms. The form is the same for all subjects.",
form:"Regular: work → worked; live → lived; study → studied. Irregular: go → went; have → had; see → saw. Be: I/he/she/it was; you/we/they were. Time phrases: yesterday, last week, two days ago, in 2020.",
selection:"Найди завершённое событие и точку в прошлом. Для обычного глагола выбери V2; затем проверь, regular ли это verb или irregular. Для be используй was/were.",
contrast:"I work every day (Present Simple). I worked yesterday (Past Simple). She is at home now; she was at home yesterday. Past Simple does not use -s for he/she/it.",
boundary:"This is the introductory affirmative block. Questions and negatives with did/didn't, irregular spelling patterns and more complex past narrative contrasts are expanded in A2-01/A2-02.",
pronunciation:"Окончание -ed имеет три произношения: /t/ after voiceless sounds, /d/ after voiced sounds, /ɪd/ after /t/ or /d/. Не произноси -ed как отдельный слог во всех случаях.",
traps:[
["She goed to college yesterday.","She went to college yesterday.","Go is irregular; its V2 is went.","Adding -ed to go does not produce the standard past form."],
["He studyed last night.","He studied last night.","Consonant + y changes to -ied: study → studied.","Studyed does not follow the spelling rule."],
["They was at the museum.","They were at the museum.","They takes were, not was.","Was is used with I/he/she/it."]
],
examples:[
["We watched a documentary yesterday.","Вчера мы посмотрели документальный фильм.","Regular verb watch + -ed."],
["I studied for three hours last night.","Вчера вечером я занимался(ась) три часа.","Consonant + y changes to -ied."],
["She went to the library after class.","После занятий она пошла в библиотеку.","Go is irregular: went."],
["They were tired after the trip.","После поездки они устали.","They agrees with were."]
],
toefl:"Past Simple is essential for describing completed experiences, events and examples in Speaking and Writing; accurate V2 forms help maintain a clear timeline."
},drills:[
q("We ___ a science documentary last night.","watched","watch","watching","Last night indicates a completed past event; regular watch takes -ed.","Watch is the base form, not past affirmative.","Watching is a participle/gerund, not the finite past verb."),
q("My cousin ___ to Italy in 2022.","travelled","travels","travel","In 2022 marks a completed past event; use V2 travelled.","Travels is Present Simple.","Travel is the base form."),
q("He ___ a new laptop last month.","bought","buyed","buys","Buy is irregular; its Past Simple form is bought.","Buyed incorrectly regularises an irregular verb.","Buys is Present Simple third-person singular."),
q("The students ___ excited before the competition.","were","was","are","Students is plural; past form of be is were.","Was is singular.","Are is present, not past."),
q("I ___ my grandparents two days ago.","visited","visit","visiting","Two days ago signals Past Simple; regular visit takes -ed.","Visit is the base form.","Visiting does not function as the finite verb."),
q("Maria ___ a beautiful photo during the trip.","took","taked","takes","Take is irregular; V2 is took.","Taked is not the standard form.","Takes is Present Simple."),
q("The lecture ___ at 10 a.m. yesterday.","started","starts","start","Yesterday indicates Past Simple; regular start takes -ed.","Starts is Present Simple third-person singular.","Start is the base form.")
]}
};


const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, value) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value, 'utf8');
};
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
const splitTable = line => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(clean);

function parseCurriculum() {
  return read('materials/GRAMMAR-CURRICULUM-A1-C1.md')
    .split(/\r?\n/)
    .filter(line => /^\| (?:A1|A2|B1|B2|C1)-\d\d \|/.test(line))
    .map(line => {
      const [id, title, outcome, sources] = splitTable(line);
      return { id, title: title.replace(/\*+/g,''), outcome, sources };
    });
}
function parseMigration() {
  const rows = read('materials/GRAMMAR-MIGRATION-MAP.md').split(/\r?\n/);
  const result = new Map();
  for (const line of rows) {
    if (!/^\| (?:A1|A2|B1|B2|C1)-\d\d \|/.test(line)) continue;
    const [id, , legacy, coverage] = splitTable(line);
    result.set(id, {
      legacyIds: [...legacy.matchAll(/№\s*(\d+)/g)].map(m => Number(m[1])-1),
      legacyText: legacy,
      coverage
    });
  }
  return result;
}
function parsePrerequisites() {
  const lines = read('materials/GRAMMAR-IMPLEMENTATION-SPEC.md').split(/\r?\n/);
  const result = new Map();
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith('| curriculumId |')) { inTable = true; continue; }
    if (inTable && !line.startsWith('|')) break;
    if (!inTable || /^\|\s*---/.test(line)) continue;
    const [id, prereq] = splitTable(line);
    if (!/^(A1|A2|B1|B2|C1)-\d\d$/.test(id)) continue;
    result.set(id, prereq === '—' || prereq === '-' ? [] : prereq.match(/(?:A1|A2|B1|B2|C1)-\d\d/g) || []);
  }
  return result;
}
function readLegacy() {
  const context = { console };
  vm.createContext(context);
  vm.runInContext(read('course-data.js') + '\nglobalThis.__lessonSource={units,grammarPractice,rewrites,extraGrammar};', context);
  return context.__lessonSource;
}

const FAMILY = {
  be: {
    label:'глагол be',
    core:'Be является самостоятельным глаголом и связкой. В настоящем времени форма зависит от подлежащего; в отрицании добавляется not, а в вопросе be обычно ставится перед подлежащим. В отличие от обычных смысловых глаголов, be не требует do-support.',
    form:'Утверждение: subject + am/is/are + complement. Отрицание: subject + am/is/are + not + complement. Общий вопрос: am/is/are + subject + complement? Краткий ответ сохраняет be: Yes, she is / No, they aren’t.',
    selection:'Сначала найди подлежащее. I → am; he/she/it и единственное число → is; you/we/they и множественное число → are. Для вопроса перемести форму be перед subject; для отрицания поставь not после be.',
    contrast:'Be строит собственные вопросы и отрицания: Is she ready? She isn’t ready. С обычными глаголами используется do/does: Does she work? Не смешивай эти модели.',
    boundary:'Время и лицо меняют форму be: am/is/are относятся к настоящему, was/were — к прошлому. Linking verbs вроде seem, become, remain могут вести себя похоже по смыслу, но не являются формами be.',
    pronunciation:'Слушай различие /æm/, /ɪz/ и вариантов are. В беглой речи формы и сокращения часто редуцируются; в вопросах интонация и ударение помогают услышать, что это вопрос.',
    traps:[['She don’t ready.','She isn’t ready.','В именной/прилагательной конструкции с be отрицание образуется через not после be, а не через do.'],['Are they students? — Yes, they are.','Are they students? — Yes, they are.','В кратком ответе повторяется вспомогательный глагол be; не нужен do.'],['He are late.','He is late.','Форма согласуется с подлежащим: he относится к третьему лицу единственного числа.']],
    examples:[
      ['The results are clear.','Результаты понятны.','are согласуется с множественным подлежащим.'],
      ['Is the room available?','Комната свободна?','Вопрос образуется перестановкой be перед subject.'],
      ['We are not certain.','Мы не уверены.','not ставится после are.'],
      ['The evidence is limited.','Доказательства ограничены.','evidence обычно неисчисляемое существительное в единственном числе.']
    ],
    toefl:'В Writing проверяй связки и согласование в коротких и сложных предложениях. В Speaking точные краткие формы помогают отвечать естественно и без пропуска обязательного глагола.'
  },
  nouns: {
    label:'существительные, число и артикли',
    core:'Форма существительного сообщает, говорим ли мы об одном предмете, нескольких предметах или о массе/понятии в целом. Артикль зависит не только от первой буквы, но и от исчисляемости, звука и того, известен ли референт собеседнику.',
    form:'Регулярное множественное число: noun + -s; после шипящих/свистящих часто -es; согласная + y → -ies. Есть нерегулярные формы (children, people, mice). A/an употребляется с исчисляемым существительным в единственном числе, когда референт не определён/упоминается впервые.',
    selection:'Сначала определи, можно ли считать существительное отдельными единицами. Затем проверь число. Для a/an слушай начальный звук: a university, an hour. Для the оцени, можно ли понять, о каком именно объекте идёт речь.',
    contrast:'A/an — один неопределённый исчисляемый предмет; the — определённый/уже известный референт; zero article часто используется для общих множественных и неисчисляемых значений. Не своди выбор к правилу «первое упоминание = a, второе = the»: контекст может делать референт определённым сразу.',
    boundary:'Существительные типа advice, information, equipment, furniture обычно неисчисляемые в стандартном английском. Для отдельных единиц используй выражения a piece of advice / two items of equipment. Некоторые слова меняют исчисляемость по смыслу (coffee, paper, experience).',
    pronunciation:'Окончание множественного числа -s/-es произносится как /s/, /z/ или /ɪz/ в зависимости от конечного звука основы; написание -es само по себе не гарантирует /ɪz/.',
    traps:[['an university','a university','Артикль выбирается по первому звуку: university начинается с /j/, согласного звука.'],['many informations','much information / several pieces of information','Information обычно неисчисляемое; нельзя образовать обычное множественное число с -s.'],['a hour','an hour','H в hour не произносится, поэтому слово начинается с гласного звука.']],
    examples:[
      ['We need some information.','Нам нужна информация.','information неисчисляемое.'],
      ['She bought an umbrella.','Она купила зонт.','an определяется начальным гласным звуком.'],
      ['The students opened their books.','Студенты открыли свои книги.','обычное множественное число получает -s.'],
      ['A university opened a new laboratory.','Один университет открыл новую лабораторию.','university начинается с согласного звука /j/.']
    ],
    toefl:'В Writing точность articles, plural forms и countability влияет на грамматическую ясность. В Reading распознавай разницу между общим и конкретным референтом.'
  },
  present: {
    label:'Present Simple',
    core:'Present Simple описывает регулярность, общие факты, состояния и устойчивые ситуации; некоторые глаголы речи/мыслительной деятельности также описывают текущий факт. Важен не только маркер времени, но и тип ситуации.',
    form:'Утверждение: I/you/we/they + base verb; he/she/it + verb-s/-es. Отрицание и вопрос строятся с do/does + base form; после does окончание -s остаётся у вспомогательного глагола и не дублируется на смысловом.',
    selection:'Ищи регулярность, расписание, общий факт или состояние. Наречия frequency часто помогают, но не являются обязательными. Для временного действия вокруг момента речи обычно нужен Present Continuous, если глагол допускает progressive.',
    contrast:'Present Simple представляет ситуацию как обычную/устойчивую; Present Continuous показывает её как процесс или временную ситуацию. State verbs обычно не используются в Continuous в базовом значении, но некоторые глаголы меняют значение.',
    boundary:'Не все состояния статичны во всех контекстах: think может означать opinion (обычно simple) или consider (continuous); have может обозначать possession (simple) или activity (have lunch, continuous). Расписания могут использовать Present Simple для будущего времени.',
    pronunciation:'Окончание третьего лица -s произносится /s/, /z/ или /ɪz/. В вопросах do/does часто безударны; не теряй вспомогательный глагол в беглой речи.',
    traps:[['She work every day.','She works every day.','В третьем лице единственного числа утвердительного Present Simple добавляется -s/-es.'],['Does he works here?','Does he work here?','После does смысловой глагол стоит в начальной форме.'],['I am agree.','I agree.','Agree — смысловой глагол; перед ним не нужен be.']],
    examples:[
      ['The study examines three variables.','Исследование рассматривает три переменные.','общая характеристика исследования.'],
      ['The library closes at six.','Библиотека закрывается в шесть.','расписание/регулярный факт.'],
      ['She does not work on Fridays.','Она не работает по пятницам.','does not + base form.'],
      ['How often do the results change?','Как часто меняются результаты?','вопрос о повторяемости.']
    ],
    toefl:'В Writing используй Present Simple для определения понятий, описания общих закономерностей и формулировки позиции. В Speaking он нужен для привычек, предпочтений и устойчивых фактов.'
  },
  continuous: {
    label:'Continuous aspect',
    core:'Continuous представляет действие как процесс вокруг определённого временного ориентира. В центре внимания — ход действия, временность или развитие, а не просто факт/повторяемость.',
    form:'Настоящее: am/is/are + V-ing. Прошлое: was/were + V-ing. Будущее: will be + V-ing. Perfect Continuous: have/has/had been + V-ing. Выбирай форму be по времени и согласованию; смысловой глагол получает -ing.',
    selection:'Определи временной ориентир: сейчас/период вокруг настоящего, момент в прошлом, момент в будущем или длительность до момента. Затем проверь, допускает ли смысловой глагол progressive aspect.',
    contrast:'Simple показывает факт/привычку/событие как целое; Continuous показывает процесс или временную рамку. Continuous не означает автоматически «прямо в эту секунду»: период может охватывать текущую неделю или временный проект.',
    boundary:'State verbs в основных значениях обычно не используются в Continuous (know, believe, own), однако часть глаголов допускает оба варианта с разницей значения (think, have, see, taste). -ing spelling включает удвоение согласной и удаление конечной -e по орфографическим правилам.',
    pronunciation:'В беглой речи формы be часто редуцируются, но должны оставаться слышимыми. Отделяй вспомогательный be от окончания -ing; не проглатывай /ŋ/ в нейтральном произношении.',
    traps:[['I am know the answer.','I know the answer.','Know в значении знания обычно stative и не требует Continuous.'],['They working now.','They are working now.','Continuous требует вспомогательную форму be.'],['She is study.','She is studying.','После be в Continuous нужна форма V-ing.']],
    examples:[
      ['The team is testing a new method this week.','На этой неделе команда тестирует новый метод.','временный процесс вокруг настоящего.'],
      ['At noon, the researchers were collecting samples.','В полдень исследователи собирали образцы.','процесс в конкретный момент прошлого.'],
      ['By this time tomorrow, I will be travelling.','Завтра в это время я буду в пути.','процесс в будущий момент.'],
      ['She has been studying for three hours.','Она занимается уже три часа.','длительность до настоящего.']
    ],
    toefl:'Continuous aspect помогает описывать процессы, изменения и ход эксперимента. В Listening важно распознавать временный процесс и длительность, а не только отдельные события.'
  },
  past: {
    label:'Past forms',
    core:'Past forms помещают событие или состояние в завершённый прошлый период либо показывают фон/процесс в определённый момент прошлого. Выбор зависит от временной перспективы и роли события в рассказе.',
    form:'Past Simple: V2 для утвердительной формы; did + base verb в вопросах и отрицаниях. Past be: was/were. Past Continuous: was/were + V-ing. Past Perfect: had + V3 для более раннего прошлого.',
    selection:'Сначала найди временную точку отсчёта. Если говоришь о завершённом событии в конкретном прошлом времени — Past Simple. Если показываешь процесс в этот момент — Past Continuous. Если одно событие предшествовало другому прошлому событию — Past Perfect может обозначить эту последовательность.',
    contrast:'Past Simple двигает рассказ вперёд; Past Continuous часто задаёт фон; Past Perfect отступает ещё дальше назад. Не ставь Past Perfect механически в каждом предложении с двумя прошлыми действиями: порядок может быть понятен из последовательности и без него.',
    boundary:'Неправильные глаголы требуют запоминания V2/V3. После did/didn’t всегда base form. Временные слова (yesterday, last year, by the time) помогают, но грамматическая перспектива определяется отношениями между событиями.',
    pronunciation:'Окончание -ed имеет три варианта: /t/, /d/, /ɪd/. /ɪd/ появляется после /t/ и /d/. Не произноси -ed как отдельный слог во всех глаголах.',
    traps:[['Did she went?','Did she go?','После did используется начальная форма, потому что прошедшее время уже выражено did.'],['They was waiting.','They were waiting.','Форма be согласуется с множественным подлежащим.'],['The film had began.','The film had begun.','После had нужен past participle V3.']],
    examples:[
      ['The researchers published the report last year.','Исследователи опубликовали отчёт в прошлом году.','завершённое событие в законченное время.'],
      ['At eight, the team was still working.','В восемь команда всё ещё работала.','процесс в прошлом моменте.'],
      ['By the time we arrived, the lecture had begun.','К моменту нашего приезда лекция уже началась.','более раннее прошлое.'],
      ['She did not attend the meeting.','Она не присутствовала на встрече.','did not + base form.']
    ],
    toefl:'Past forms важны в пересказе исследования, исторических процессов и личного опыта. В Writing следи за последовательностью временных точек и согласованием времён.'
  },
  future: {
    label:'Future reference',
    core:'Английский использует несколько форм для будущего. Выбор зависит от того, говорим ли мы о расписании, намерении, прогнозе, договорённости, решении в момент речи или действии, которое будет идти/завершится к будущей точке.',
    form:'Will + base form; be going to + base form; Present Continuous для договорённости; Present Simple для расписания. Future Continuous: will be + V-ing. Future Perfect: will have + V3. Future-in-the-past: was/were going to, would, was/were to и контекстные формы.',
    selection:'Различай намерение и доказательства (going to), спонтанное решение/предложение/прогноз (will), личную договорённость (Present Continuous) и официальное расписание (Present Simple). Для будущей временной точки используй Continuous; для завершения к дедлайну — Perfect.',
    contrast:'Will и going to могут оба говорить о будущем, но фокус различается; Present Continuous обычно предполагает уже организованную договорённость. Future Perfect отвечает на вопрос «что будет уже завершено к…», Future Continuous — «что будет происходить в…».',
    boundary:'После when, before, after, as soon as и if в придаточном времени/условия обычно используется Present Simple для будущего смысла, не will. Shall встречается в вопросах-предложениях и более формальных вариантах, но не заменяет все будущие формы.',
    pronunciation:'Сокращения ’ll и слабые формы вспомогательных глаголов часто редуцируются. В устной речи различай намерение, прогноз и договорённость не только по форме, но и по контексту.',
    traps:[['If it will rain, we will stay in.','If it rains, we will stay in.','В обычном first conditional после if используется Present Simple.'],['I will to call you.','I will call you.','После модального will нужен bare infinitive без to.'],['By Friday I will finish it already.','By Friday I will have finished it.','Для завершения к будущему сроку подходит Future Perfect.']],
    examples:[
      ['The conference starts at nine tomorrow.','Конференция начинается завтра в девять.','расписание.'],
      ['We are meeting the supervisor on Thursday.','Мы встречаемся с руководителем в четверг.','договорённость.'],
      ['Look at the clouds; it is going to rain.','Посмотри на облака: сейчас пойдёт дождь.','прогноз на основе признаков.'],
      ['By 2030, the project will have reached its target.','К 2030 году проект достигнет своей цели.','завершение к будущей точке.']
    ],
    toefl:'В Writing различай планы, прогнозы и предположения; в Academic Discussion используй модальные и будущие формы, чтобы не выдавать прогноз за факт.'
  },
  perfect: {
    label:'Perfect aspect',
    core:'Perfect aspect устанавливает связь между событием и точкой отсчёта. Важны не только «прошедшие действия», но и опыт к настоящему, текущий результат, длительность до момента или более раннее событие относительно другой точки.',
    form:'Present Perfect: have/has + V3. Past Perfect: had + V3. Future Perfect: will have + V3. Perfect Continuous добавляет been + V-ing и выдвигает длительность/процесс на первый план.',
    selection:'Спроси себя: к какой точке отсчёта относится результат/опыт? Есть ли законченное время вроде yesterday/last year? Важен ли факт/результат (Perfect Simple) или длительность процесса (Perfect Continuous)?',
    contrast:'Past Simple привязывает событие к законченному прошлому времени. Present Perfect связывает прошлое с настоящим и обычно не сочетается с конкретным завершённым маркером времени. Simple подчёркивает результат/факт; Continuous — деятельность/длительность.',
    boundary:'Не каждый глагол естественно используется в Perfect Continuous: state verbs обычно предпочитают Perfect Simple. For/since отвечают на разные вопросы: for — длительность, since — точка начала. Already/yet/just имеют позиционные и прагматические особенности.',
    pronunciation:'В устной речи have/has/had часто редуцируются, но V3 остаётся смысловым носителем. В Listening обращай внимание на вспомогательный глагол, иначе легко спутать Perfect и Past Simple.',
    traps:[['I have seen him yesterday.','I saw him yesterday.','Yesterday — законченное время, поэтому требуется Past Simple.'],['She has went home.','She has gone home.','После have/has требуется V3, а не V2.'],['I have been knowing her for years.','I have known her for years.','Know обычно stative; длительность выражается Present Perfect Simple.']],
    examples:[
      ['The team has completed three trials so far.','Команда уже завершила три испытания на данный момент.','результат в незавершённом периоде.'],
      ['I visited the laboratory in 2022.','Я посетил лабораторию в 2022 году.','конкретный завершённый прошлый период.'],
      ['She had left before the meeting started.','Она ушла до начала встречи.','более раннее прошлое.'],
      ['By June, they will have finished the study.','К июню они завершат исследование.','завершение к будущей точке.']
    ],
    toefl:'Perfect forms помогают точно описывать результаты исследований, накопленный опыт и временную последовательность. Не используй их ради «сложной грамматики», если связь с точкой отсчёта отсутствует.'
  },
  modal: {
    label:'модальность',
    core:'Модальные формы выражают не действие, а отношение говорящего к действию: возможность, способность, разрешение, необходимость, совет, вероятность, вывод, обязанность или критику.',
    form:'Core modal + bare infinitive. Отрицание: modal + not + base verb. Вопрос: modal + subject + base verb? Semi-modals (have to, be able to, need to, ought to) имеют собственные формы и правила.',
    selection:'Сначала определи функцию: внутреннее/внешнее обязательство, рекомендация, разрешение, способность или степень уверенности. Затем оцени силу высказывания и время. Для вывода о прошлом используются modal + have + V3.',
    contrast:'Must и have to могут выражать необходимость, но различаются оттенком источника/контекста; mustn’t — запрет, needn’t — отсутствие необходимости. Should — рекомендация, а не такая же сильная обязанность, как must.',
    boundary:'У модальных глаголов нет обычного -s в третьем лице; после core modal не ставится to. Could/might/may выражают разные оттенки возможности, а не точные проценты вероятности. Past deduction не равно обычному прошедшему времени.',
    pronunciation:'Безударные модальные формы могут редуцироваться; отрицательные формы и ударение меняют силу высказывания. В Speaking интонация помогает отличать совет от категоричного требования.',
    traps:[['She can to swim.','She can swim.','После core modal нужен bare infinitive.'],['You mustn’t come early (meaning “not necessary”).','You don’t have to come early.','Mustn’t — запрет; don’t have to — отсутствие обязанности.'],['He must have forget.','He must have forgotten.','Для вывода о прошлом нужна форма V3 после have.']],
    examples:[
      ['The results may indicate a trend.','Результаты могут указывать на тенденцию.','осторожная возможность.'],
      ['Participants must complete the form.','Участники должны заполнить форму.','обязательное требование.'],
      ['The team should repeat the experiment.','Команде следует повторить эксперимент.','совет/рекомендация.'],
      ['The lights are off; they must have left.','Свет выключен; должно быть, они ушли.','сильный вывод о прошлом.']
    ],
    toefl:'Модальность критична для академической осторожности: distinguish may suggest from proves, should from must, and likely from certain. Не преувеличивай выводы.'
  },
  comparison: {
    label:'сравнение и степень',
    core:'Сравнительные формы показывают различие между двумя объектами или ситуациями; превосходная степень выделяет один объект внутри группы. Выбор зависит от числа сравниваемых элементов и структуры прилагательного/наречия.',
    form:'Короткие прилагательные часто получают -er/-est; длинные используют more/most. Нерегулярные: good → better → best; bad → worse → worst. Равенство: as + adjective/adverb + as. Усилители: much/far/a lot + comparative.',
    selection:'Два объекта → comparative + than или as…as. Один объект среди группы → superlative, обычно the + -est/most. Проверь орфографию (big → bigger; happy → happier) и не удваивай показатель степени.',
    contrast:'More efficient than — сравнительная степень; the most efficient — превосходная; as efficient as — равенство. One of the + superlative + plural noun: one of the most important factors.',
    boundary:'Не все прилагательные одинаково образуют степени; некоторые допускают оба варианта с разницей регистра/ритма. Farther/further различаются в части значений; elder/eldest имеют ограничения. Не используйте more + -er одновременно.',
    pronunciation:'В сравнительных формах ударение часто падает на основу; -er и -est произносятся кратко. В беглой речи than может редуцироваться, но логическое сравнение должно оставаться ясным.',
    traps:[['more easier','easier','Не складывай аналитический и синтетический способ образования одной степени.'],['the most tallest','the tallest','Не используй two superlative markers одновременно.'],['This is one of the best solution.','This is one of the best solutions.','После one of the + superlative требуется существительное во множественном числе.']],
    examples:[
      ['The second method is more reliable than the first.','Второй метод надёжнее первого.','сравнение двух методов.'],
      ['This is the most detailed report in the set.','Это самый подробный отчёт в наборе.','выделение одного в группе.'],
      ['The two samples are as dense as each other.','Два образца одинаково плотные.','равенство.'],
      ['The new model is far more efficient.','Новая модель значительно эффективнее.','усилитель перед comparative.']
    ],
    toefl:'Сравнение полезно для Academic Discussion и письменного анализа данных. Указывай критерий сравнения и не используй superlative без понятной группы.'
  },
  quantifier: {
    label:'определители и количественные слова',
    core:'Quantifiers показывают количество, долю или охват. Выбор зависит от countability, числа и того, утверждаем ли мы наличие, отсутствие, достаточность или распределение.',
    form:'Many/few/a few + plural countable noun; much/little/a little + uncountable noun. Some часто используется в утверждениях и предложениях; any — в вопросах/отрицаниях и некоторых условных контекстах. All/most/both/either/neither/no/none имеют собственные модели.',
    selection:'Сначала определи тип существительного и число. Затем выбери значение: малое количество с положительным оттенком (a few/a little) или почти отсутствие (few/little), весь набор (all/whole) или один из двух (either/neither).',
    contrast:'A few = некоторое количество; few = почти нет. A little = некоторое количество; little = почти нет. Either относится к одному из двух, neither — ни к одному, both — к обоим. All относится ко всему набору, whole — к целому объекту.',
    boundary:'Some/any не имеют абсолютного правила «some только в утверждениях»; some возможен в предложениях/просьбах, а any — в значении «любой». None может употребляться с of; число глагола зависит от конструкции и референта.',
    pronunciation:'Слабые формы of и артиклей часто редуцируются; ударение на few/little/all/either может выделять контраст или уточнять количество.',
    traps:[['many information','much information / many pieces of information','Information обычно неисчисляемое.'],['I have few friends (meaning “some friends”).','I have a few friends.','Артикль a меняет значение: небольшое, но достаточное количество.'],['Both of the option','Both of the options','Both of требует plural noun или pronoun.']],
    examples:[
      ['There is little evidence for this claim.','Для этого утверждения мало доказательств.','little подчёркивает недостаточность.'],
      ['A few participants completed the survey.','Несколько участников завершили опрос.','a few — некоторое количество.'],
      ['Both methods produced similar results.','Оба метода дали похожие результаты.','both относится к двум.'],
      ['Neither explanation accounts for the data.','Ни одно из двух объяснений не объясняет данные.','neither + singular noun.']
    ],
    toefl:'Quantifiers важны для точного описания данных: few vs a few, much vs many, most vs almost all. Не преувеличивай долю и количество.'
  },
  adverb: {
    label:'прилагательные, наречия и их позиция',
    core:'Прилагательное обычно характеризует существительное или подлежащее после linking verb; наречие характеризует действие, признак, другое наречие или всё высказывание. Позиция влияет на фокус и значение.',
    form:'Adjective + noun; be/seem/become + adjective. Adverb часто образуется adjective + -ly, но есть исключения (fast, hard, late, well). Frequency adverbs обычно перед смысловым глаголом и после be; comment/viewpoint adverbs часто стоят в начале/конце.',
    selection:'Спроси, что именно описываешь: предмет/состояние (adjective) или способ действия/степень/позицию говорящего (adverb). Затем проверь тип глагола и позицию наречия.',
    contrast:'She is careful — описание человека; she works carefully — способ работы. Hard = усердно; hardly = почти не. Late = поздно; lately = в последнее время. Эти пары не взаимозаменяемы.',
    boundary:'Не все adverbs образуются через -ly. Good — adjective, well — чаще adverb; fast/hard/early могут быть и adjective, и adverb. Некоторые наречия меняют значение в зависимости от позиции (only, even, just, still).',
    pronunciation:'Окончание -ly обычно не создаёт отдельного слога, если не требует структура слова. Ударение в multi-syllable adverbs может отличаться от интуитивного; проверяй словарную форму.',
    traps:[['She speaks English fluent.','She speaks English fluently.','Нужно наречие, характеризующее глагол speaks.'],['He works hardly. (meaning “a lot”)','He works hard.','Hardly означает «почти не», а не «усердно».'],['She is happily.','She is happy.','После be в этой модели нужен adjective, описывающий subject.']],
    examples:[
      ['The participants responded quickly.','Участники ответили быстро.','наречие характеризует действие.'],
      ['The results are particularly important.','Результаты особенно важны.','наречие усиливает прилагательное.'],
      ['Usually, the sample remains stable.','Обычно образец остаётся стабильным.','наречие частотности/комментария в начале.'],
      ['The team has never reported this effect.','Команда никогда не сообщала об этом эффекте.','never стоит перед смысловым причастным глаголом.']
    ],
    toefl:'Наречия степени и осторожности помогают калибровать утверждение. В Writing ставь only, mainly, generally, particularly рядом с тем элементом, который они ограничивают.'
  },
  question: {
    label:'вопросительные конструкции',
    core:'В английских вопросах порядок слов зависит от роли спрашиваемого элемента и типа вопроса. Вспомогательный глагол несёт время/вопросительную структуру; при встроенном вопросе обычно возвращается обычный порядок statement.',
    form:'Yes/no: auxiliary + subject + main verb? Wh-question: wh-word + auxiliary + subject + verb? Subject question: wh-word выполняет роль subject, поэтому do-support обычно не нужен. Indirect question: introductory phrase + wh-word + subject + verb.',
    selection:'Определи, спрашиваешь ли ты о подлежащем, объекте, времени/месте/причине или задаёшь общий вопрос. Для вежливой косвенной формы не сохраняй инверсию прямого вопроса.',
    contrast:'Who called? — who является подлежащим; Who did you call? — who является объектом. Could you tell me where the station is? — embedded statement order, не where is the station.',
    boundary:'После do/does/did используется base form. Вопросы с be и модальными глаголами используют их собственную инверсию. В indirect questions знак вопроса зависит от главной части: I wonder where he lives. / Could you tell me where he lives?',
    pronunciation:'В yes/no questions часто используется восходящая интонация, но это не универсальный знак. В wh-questions интонация зависит от функции и контекста; делай логическое ударение на запрашиваемой информации.',
    traps:[['Where does she lives?','Where does she live?','После does используется base form.'],['Could you tell me where is the station?','Could you tell me where the station is?','В embedded question используется порядок утверждения.'],['Who did call you? (subject question)','Who called you?','Если wh-word — subject, do-support обычно не нужен.']],
    examples:[
      ['Which factor influenced the result?','Какой фактор повлиял на результат?','subject question: which factor — подлежащее.'],
      ['What did the researchers measure?','Что измеряли исследователи?','object question с did.'],
      ['Could you explain why the result changed?','Не могли бы вы объяснить, почему результат изменился?','indirect question с statement order.'],
      ['Do you know whether the data are complete?','Вы знаете, полны ли данные?','whether вводит косвенный общий вопрос.']
    ],
    toefl:'В Speaking умение формулировать точные вопросы поддерживает интервью и уточнение. В Writing правильный embedded word order важен для сложных предложений.'
  },
  relative: {
    label:'relative clauses',
    core:'Relative clause уточняет существительное или добавляет к нему дополнительную информацию. Выбор местоимения зависит от того, относится ли референт к человеку, вещи, месту или принадлежности и является ли информация необходимой.',
    form:'People: who/that; things: which/that; possession: whose; place: where; time: when. В defining clause object relative pronoun иногда опускается; subject pronoun обычно нельзя опускать. Non-defining clause отделяется запятыми и не использует that.',
    selection:'Определи, необходима ли информация для идентификации референта. Если да — defining; если это дополнительная вставка — non-defining. Затем найди функцию относительного местоимения внутри придаточного: subject, object или possessive.',
    contrast:'Defining: The book that I borrowed is useful — без clause непонятно, какая книга. Non-defining: My book, which I borrowed yesterday, is useful — дополнительная информация; нужны запятые, that не используется.',
    boundary:'Нельзя опускать subject relative pronoun. В formal style предлог может стоять перед whom/which; в разговорном английском он часто остаётся в конце clause. Reduced relatives требуют контроля логического субъекта.',
    pronunciation:'В разговорной речи object relative pronouns могут редуцироваться или опускаться, но в письменной речи проверяй структуру, чтобы не потерять роль subject/object.',
    traps:[['The scientist which discovered it','The scientist who discovered it','Для человека в обычной defining clause используется who/that, не which.'],['My car, that is old, ...','My car, which is old, ...','В non-defining clause используется which/who, не that.'],['The student lives here is my friend.','The student who lives here is my friend.','Subject relative pronoun нельзя просто опустить.']],
    examples:[
      ['The method that we tested produced stable results.','Метод, который мы проверили, дал стабильные результаты.','object pronoun можно опустить в defining clause.'],
      ['The researcher who led the project has published a paper.','Исследователь, руководивший проектом, опубликовал статью.','who — subject относительного придаточного.'],
      ['The laboratory, which opened in 2010, is expanding.','Лаборатория, открывшаяся в 2010 году, расширяется.','non-defining clause с запятыми.'],
      ['The student whose data were selected received a certificate.','Студент, чьи данные были выбраны, получил сертификат.','whose выражает принадлежность.']
    ],
    toefl:'Relative clauses помогают сжимать информацию в академическом тексте. В Reading распознавай, относится ли clause к ключевому существительному или добавляет побочную информацию.'
  },
  conditional: {
    label:'conditionals',
    core:'Conditional clauses связывают условие с результатом. Выбор типа зависит от того, является ли связь общей закономерностью, реальной возможностью, гипотезой настоящего/будущего или нереальным прошлым.',
    form:'Zero: if + present, present. First: if + present, will/can/may + base. Second: if + past, would/could/might + base. Third: if + past perfect, would/could/might have + V3. Mixed types связывают разные временные точки.',
    selection:'Определи временную перспективу и степень реальности. Не выбирай условный тип только по слову if; проверь, о чём говорит главная часть и является ли условие фактом, возможностью или воображаемым сценарием.',
    contrast:'First conditional — реальная/вероятная будущая ситуация; second — гипотеза или дистанцированное условие; third — контрфактическое прошлое. Mixed conditional показывает связь прошлого условия с настоящим результатом.',
    boundary:'В обычной if-clause не ставь will для простого будущего. Were возможно в гипотетических конструкциях; wish/if only имеют собственные модели. Inversion with had/were/should характерна для более формального регистра и не является обязательной.',
    pronunciation:'В устной речи if-clause может быть редуцирована; логическое ударение часто падает на условие или результат в зависимости от контраста. В Speaking не ускоряй условную часть так, чтобы потерять if или вспомогательный глагол.',
    traps:[['If it will rain, we will stay home.','If it rains, we will stay home.','В first conditional обычное будущее после if выражается Present Simple.'],['If I would have more time, ...','If I had more time, ...','Во втором типе условная часть использует past form, а would идёт в результате.'],['If I had known, I would come yesterday.','If I had known, I would have come yesterday.','Контрфактическое прошлое требует would have + V3.']],
    examples:[
      ['If the temperature rises, the reaction speeds up.','Если температура повышается, реакция ускоряется.','общая закономерность.'],
      ['If the data are confirmed, the team will publish the results.','Если данные подтвердят, команда опубликует результаты.','реальное будущее условие.'],
      ['If the sample were larger, the estimate would be more reliable.','Если бы выборка была больше, оценка была бы надёжнее.','гипотеза настоящего.'],
      ['If the team had checked the figures, it would have found the error.','Если бы команда проверила цифры, она бы обнаружила ошибку.','нереальное прошлое.']
    ],
    toefl:'Conditionals полезны для оценки последствий, ограничений и альтернативных объяснений. В академическом стиле ясно отделяй реальные выводы от гипотетических.'
  },
  clause: {
    label:'союзы и придаточные clauses',
    core:'Союзы связывают идеи, показывая добавление, причину, результат, цель, время, условие или уступку. Выбор зависит от типа связи и грамматической формы после союза.',
    form:'Coordinating conjunctions (and/but/or/so) соединяют равноправные элементы. Subordinators (because, although, when, if, while) вводят dependent clause. Purpose can use to-infinitive / in order to; result often uses so…that / such…that.',
    selection:'Сначала сформулируй логическую связь между частями, затем выбери союз и проверь, требует ли он clause или noun phrase/infinitive. Не ставь два союза для одной и той же связи без специальной структуры.',
    contrast:'Because + clause; because of + noun phrase. Although + clause; despite/in spite of + noun/-ing. So показывает результат, so that — цель/ожидаемый эффект. During + noun, while + clause.',
    boundary:'Союзы времени, относящиеся к будущему, обычно используют Present Simple в придаточной части. Пунктуация зависит от позиции dependent clause и регистра. Не все связки взаимозаменяемы: despite нельзя непосредственно соединять с полноценной clause без of.',
    pronunciation:'В длинных предложениях делай паузу и интонационное членение по смысловым группам. Слабые формы союзов редуцируются, но ударение часто падает на саму причину/контраст.',
    traps:[['Despite it was raining, ...','Although it was raining, ... / Despite the rain, ...','Despite вводит noun phrase или -ing, а although — clause.'],['Because of the train was late, ...','Because the train was late, ...','Because of не вводит полноценную finite clause.'],['When I will arrive, I’ll call.','When I arrive, I’ll call.','После time conjunction для будущего используется present form.']],
    examples:[
      ['Although the sample was small, the pattern was consistent.','Хотя выборка была небольшой, закономерность была устойчивой.','уступка с clause.'],
      ['The event was delayed because of technical problems.','Событие задержали из-за технических проблем.','because of + noun phrase.'],
      ['The team repeated the test so that it could verify the result.','Команда повторила тест, чтобы проверить результат.','цель.'],
      ['When the data arrive, the analysis will begin.','Когда данные поступят, анализ начнётся.','будущее значение с present form в time clause.']
    ],
    toefl:'Связки формируют логику Academic Discussion и Writing. Выбирай точное отношение, а не добавляй however/therefore механически в каждое предложение.'
  },
  preposition: {
    label:'предлоги и зависимые сочетания',
    core:'Предлог задаёт отношение места, времени, направления, причины или связи между словами. Во многих случаях выбор определяется устойчивой сочетаемостью, а не дословным переводом с русского.',
    form:'Time: at + точное время, on + день/дата, in + месяц/год/длительный период. Place: at (точка/событие), in (внутри области/помещения), on (поверхность/линия). Movement: to/into/onto/across/through и т.п. Dependent patterns изучаются как устойчивые chunks.',
    selection:'Определи значение отношения, затем проверь, является ли предлог частью устойчивой конструкции (depend on, interested in, responsible for) или обозначает реальное место/время/движение.',
    contrast:'In the room — внутри помещения; at the station — точка/место встречи; on the platform — поверхность/уровень. Arrive in a city, arrive at a place. По-русски один предлог может соответствовать нескольким английским.',
    boundary:'Некоторые слова имеют несколько возможных предлогов с разницей значения (good at, good for, good with). После предлога обычно используется noun/pronoun или -ing form, не bare infinitive.',
    pronunciation:'В речи предлоги часто безударны и редуцируются. В Listening распознавай их по связи с соседним словом; предлог может быть коротким, но менять смысл.',
    traps:[['interested on','interested in','Прилагательное interested требует устойчивого сочетания in.'],['at Monday','on Monday','Дни недели обычно сочетаются с on.'],['depend of','depend on','Глагол depend управляет предлогом on.']],
    examples:[
      ['The samples were stored at room temperature.','Образцы хранили при комнатной температуре.','at выражает условие/режим.'],
      ['The meeting takes place on Monday.','Встреча состоится в понедельник.','on + день.'],
      ['The researchers are interested in the result.','Исследователи заинтересованы в результате.','dependent adjective + preposition.'],
      ['The path runs through the forest.','Тропа проходит через лес.','through обозначает движение внутри/сквозь пространство.']
    ],
    toefl:'Точные предлоги особенно важны в Build a Sentence и академических noun phrases. Учите частотные сочетания блоками и фиксируйте свои повторяющиеся ошибки.'
  },
  phrasal: {
    label:'phrasal verbs и multi-word verbs',
    core:'Phrasal verb состоит из глагола и частицы, иногда предлога. Значение может быть буквальным или идиоматическим. Порядок объекта зависит от типа конструкции и того, является ли объект местоимением.',
    form:'Separable transitive: turn the machine off / turn off the machine; с местоимением — turn it off. Inseparable: look after the child, нельзя look the child after. Intransitive: the plane took off — объект не нужен.',
    selection:'Учи глагол вместе с частицей, значением, переходностью и порядком объекта. Если объект — местоимение, проверь, требуется ли позиция между глаголом и частицей.',
    contrast:'Look up a word / look it up (separable); look after a child (inseparable); get up (intransitive). Не всякое сочетание verb + preposition — phrasal verb; грамматическая модель определяется словарём и значением.',
    boundary:'Многие phrasal verbs имеют несколько значений и регистров. В академическом письме часто предпочтительнее нейтральная однословная альтернатива, но в повседневных контекстах phrasal verbs естественны.',
    pronunciation:'Частица может нести смысловое ударение; в некоторых сочетаниях ударение помогает отличать noun/verb forms (a record / to record). Слушай фразовый глагол как единый смысловой блок.',
    traps:[['turn off it','turn it off','У separable phrasal verbs object pronoun ставится между verb и particle.'],['look the child after','look after the child','Look after — inseparable.'],['The plane took off it.','The plane took off.','В этом значении take off — intransitive, без объекта.']],
    examples:[
      ['Please turn the equipment off before cleaning.','Пожалуйста, выключите оборудование перед очисткой.','separable transitive.'],
      ['The technician looked after the system.','Техник следил за системой.','inseparable construction.'],
      ['The aircraft took off at dawn.','Самолёт взлетел на рассвете.','intransitive phrasal verb.'],
      ['I looked the term up in the dictionary.','Я нашёл этот термин в словаре.','separable; noun object допускает обе позиции.']
    ],
    toefl:'Phrasal verbs чаще встречаются в повседневных ситуациях Listening/Speaking. Для Writing выбирай их по регистру и не заменяй ими точные академические термины.'
  },
  verbPattern: {
    label:'verb complementation и verb patterns',
    core:'После смыслового глагола следующая форма определяется не общим правилом «везде -ing» или «везде to», а лексической моделью и иногда изменением значения.',
    form:'Verb + -ing (enjoy doing); verb + to-infinitive (decide to do); verb + object + to-infinitive (ask someone to do); make/let + object + bare infinitive; preposition + -ing. Отдельные глаголы допускают обе формы.',
    selection:'Запоминай verb + pattern вместе. Если возможны -ing и to-infinitive, проверь, меняется ли значение (stop doing / stop to do; remember doing / remember to do; try doing / try to do).',
    contrast:'Stop doing = прекратить занятие; stop to do = остановиться, чтобы выполнить другое действие. Remember doing = помнить прошлый опыт; remember to do = не забыть выполнить. Try doing = попробовать метод; try to do = попытаться.',
    boundary:'Like/love/hate могут сочетаться с обеими формами с небольшими различиями фокуса. Need doing может иметь пассивный смысл в некоторых вариантах BrE; need to do — активная обязанность. Не обобщай одну модель на все глаголы.',
    pronunciation:'В беглой речи to часто редуцируется, а -ing сохраняет носовой финальный звук. Для Listening важно услышать форму дополнения после глагола, особенно если она меняет смысл.',
    traps:[['I enjoy to read.','I enjoy reading.','Enjoy требует -ing form.'],['He stopped to smoke (meaning “he quit smoking”).','He stopped smoking.','Stop + -ing означает прекращение самой деятельности.'],['They made him to wait.','They made him wait.','После make + object используется bare infinitive в активной конструкции.']],
    examples:[
      ['The researchers avoided repeating the same error.','Исследователи избегали повторения той же ошибки.','avoid + -ing.'],
      ['The team decided to extend the trial.','Команда решила продлить испытание.','decide + to-infinitive.'],
      ['The supervisor asked the students to revise the draft.','Руководитель попросил студентов пересмотреть черновик.','ask + object + to-infinitive.'],
      ['She stopped checking the data.','Она перестала проверять данные.','stop + -ing меняет смысл по сравнению со stop to check.']
    ],
    toefl:'Точные verb patterns важны для грамматической точности в Build a Sentence и письменных ответах. Учите глагол вместе с его дополнением и значением.'
  },
  passive: {
    label:'Passive Voice',
    core:'Passive переносит в позицию подлежащего объект действия или его результат. Он полезен, когда исполнитель неизвестен, неважен, очевиден или когда текст фокусируется на процессе/результате.',
    form:'Passive = appropriate form of be + past participle (V3). Время и аспект выражаются формой be; модальность: modal + be + V3; reporting passive: it is believed that… / subject + is believed to…',
    selection:'Спроси, кто/что является информационным фокусом. Если важен исполнитель и он известен, active обычно яснее. Если важен процесс, объект или результат — passive может быть предпочтительнее.',
    contrast:'Active: Researchers measured the temperature. Passive: The temperature was measured. Agent with by добавляется, если личность исполнителя важна; не нужно добавлять by researchers по привычке в каждом предложении.',
    boundary:'Не каждый глагол образует passive: нужны переходные значения с object. Stative/passive формы могут совпадать, поэтому анализируй значение. Get-passive более разговорный/динамический; be-passive нейтральнее и шире по регистру.',
    pronunciation:'Форма be может быть безударной, а смысловой центр — на past participle или агенте. В Listening не теряй вспомогательный глагол: он несёт время и модальность.',
    traps:[['The report was wrote.','The report was written.','После be в passive нужна V3.'],['The event was happened.','The event happened.','Happen непереходный и обычно не образует обычный passive.'],['The data must collected.','The data must be collected.','После modal passive требуется be + V3.']],
    examples:[
      ['The samples were stored at low temperatures.','Образцы хранили при низкой температуре.','Past Simple passive.'],
      ['The results have been confirmed.','Результаты были подтверждены.','Present Perfect passive.'],
      ['The form must be submitted by Friday.','Форма должна быть подана до пятницы.','modal passive.'],
      ['It is widely believed that the method is effective.','Широко распространено мнение, что метод эффективен.','impersonal reporting passive.']
    ],
    toefl:'Passive особенно уместен при описании методов, процедур и результатов исследований, но не заменяй им все active clauses: важны ясность и фокус.'
  },
  reporting: {
    label:'reported speech и reporting structures',
    core:'Reporting structures передают чужие слова, мысли, утверждения или позицию источника. Нужно контролировать время, местоимения, указатели времени, reporting verb и модель последующего дополнения.',
    form:'Reported statement: reporting verb + (that) + clause. Backshift часто происходит после past reporting verb, если перспектива сдвигается в прошлое. Reporting verb может управлять that-clause, object + to-infinitive или -ing.',
    selection:'Определи, передаёшь ли ты точные слова или содержание; актуально ли сообщение сейчас; кто говорит и кому; какой reporting verb точно выражает функцию (claim, admit, suggest, warn, deny, recommend).',
    contrast:'Say обычно не требует личного объекта без to; tell обычно требует объект: say that…, tell someone that…. Ask + if/whether для yes/no reported questions; wh-word + statement order для wh-questions.',
    boundary:'Backshift — тенденция, а не автоматическое правило. Если факт остаётся актуальным или сообщение описывает универсальную истину, настоящее время может сохраниться. Не переносить инверсию прямого вопроса в reported question.',
    pronunciation:'В устной речи reporting verbs несут отношение говорящего; различай neutral say/tell и глаголы позиции. Интонация помогает распознать прямую речь и цитату, но письменная форма должна сохранять ясный источник.',
    traps:[['She said me that…','She told me that… / She said that…','Tell требует object; say строится иначе.'],['He asked where was I.','He asked where I was.','В reported question используется statement word order.'],['The author suggested to repeat the test.','The author suggested repeating the test.','Suggest обычно требует -ing или that-clause с соответствующей формой.']],
    examples:[
      ['The authors state that the sample was too small.','Авторы утверждают, что выборка была слишком маленькой.','reporting statement в настоящем, поскольку текст всё ещё доступен/актуален.'],
      ['She said that she had completed the analysis.','Она сказала, что завершила анализ.','backshift относительно прошлого reporting verb.'],
      ['The supervisor asked whether the figures were accurate.','Руководитель спросил, точны ли цифры.','whether + statement order.'],
      ['The paper suggests repeating the experiment.','В статье предлагается повторить эксперимент.','suggest + -ing.']
    ],
    toefl:'Reporting verbs и stance нужны для paraphrase и ссылок на источники в Academic Discussion. Выбирай глагол, который точно отражает позицию автора, а не усиливает её.'
  },
  causative: {
    label:'causative and linking structures',
    core:'Causative конструкции показывают, что субъект организует, поручает или допускает действие, выполненное другим человеком/процессом. Linking verbs связывают subject с характеристикой или состоянием и могут управлять разными complements.',
    form:'Have something done: subject + have + object + V3. Get something done — близкая, часто менее формальная модель. Have/get someone to do something — другая структура, где человек выполняет действие. Linking verbs + adjective/noun/prepositional complement.',
    selection:'Определи, кто фактически выполняет действие. Если субъект организует услугу/результат, используй have/get + object + V3; если побуждает конкретного человека сделать действие, выбери have someone do или get someone to do.',
    contrast:'I had the device repaired = устройство починил специалист по моему заказу. I had the technician repair the device = я поручил технику выполнить работу. Linking verb (seem, remain, become) не равен causative.',
    boundary:'Have/get causative отличается от обычного have как possession и от passive. Get часто более разговорный; linking verbs могут выглядеть как action verbs в других значениях. Контекст и дополнение определяют модель.',
    pronunciation:'Causative have часто редуцируется в речи; различай have + object + V3 и have + person + base verb по структуре и контексту.',
    traps:[['I had my laptop repair.','I had my laptop repaired.','Causative have something done требует V3 после object.'],['I got the technician repair it.','I got the technician to repair it.','Get + person требует to-infinitive.'],['The problem became seriously.','The problem became serious.','После linking verb в этой модели требуется adjective complement.']],
    examples:[
      ['The university had the equipment inspected.','Университет организовал проверку оборудования.','have + object + V3.'],
      ['We got the software updated yesterday.','Мы организовали обновление ПО вчера.','get something done.'],
      ['The manager had the assistant prepare the file.','Менеджер поручил помощнику подготовить файл.','have + person + bare infinitive.'],
      ['The results remain uncertain.','Результаты остаются неопределёнными.','linking verb + adjective complement.']
    ],
    toefl:'Causative помогает точно описывать процедуры и услуги; linking verbs — формулировать интерпретации результатов без лишнего повторения глагола be.'
  },
  participle: {
    label:'participle and non-finite clauses',
    core:'Non-finite clauses сокращают придаточные и уплотняют информацию. Причастная форма показывает активное/пассивное отношение и временную перспективу, но логический субъект должен совпадать с тем, к чему относится оборот.',
    form:'Present participle: V-ing (active/simultaneous or reason); past participle: V3 (passive/result/state); perfect participle: having + V3 (earlier action). Passive perfect participle: having been + V3.',
    selection:'Найди скрытого логического субъекта оборота. Определи, активно ли он выполняет действие или подвергается ему; происходит ли действие одновременно с главным или раньше.',
    contrast:'Walking into the room, I noticed the chart — субъект walking = I. Walking into the room, the chart looked interesting — dangling modifier: chart не мог войти в комнату. Having completed the test показывает более раннее действие.',
    boundary:'Не сокращай clause, если субъект будет неясен или если временная/логическая связь потеряется. Некоторые -ed forms работают как adjectives; не всякая форма V-ing является participle clause (она может быть noun/gerund).',
    pronunciation:'В длинных non-finite clauses важно интонационное членение: короткая пауза после вводного оборота помогает слушателю восстановить связь с главным clause.',
    traps:[['Walking to class, the rain started.','Walking to class, I noticed the rain.','Dangling modifier: логический субъект walking отсутствует/не совпадает.'],['Having finish the test, ...','Having finished the test, ...','После having требуется V3.'],['The samples collecting yesterday…','The samples collected yesterday…','Для пассивного значения нужен past participle.']],
    examples:[
      ['Having reviewed the evidence, the team revised its conclusion.','Изучив доказательства, команда пересмотрела вывод.','perfect participle — действие раньше главного.'],
      ['The students waiting outside were invited in.','Студентов, ожидавших снаружи, пригласили войти.','reduced relative с активным значением.'],
      ['The data collected during the trial were analysed.','Данные, собранные во время испытания, проанализировали.','reduced relative с пассивным значением.'],
      ['Being unfamiliar with the method, the team requested guidance.','Поскольку команда не была знакома с методом, она попросила инструкцию.','причинный оттенок; субъект совпадает.']
    ],
    toefl:'Non-finite clauses повышают плотность академического текста, но перегруженные или dangling modifiers ухудшают ясность. Используй их только при однозначном субъекте.'
  },
  nounPhrase: {
    label:'noun phrases и agreement',
    core:'Noun phrase может включать head noun, determiners, premodifiers и postmodifiers. В длинной группе согласование определяется грамматическим ядром, а не ближайшим существительным.',
    form:'Determiner + modifiers + head noun + postmodifiers. Subject–verb agreement: найди head noun; prepositional phrase/relative clause обычно не меняет число ядра. Compound nouns и noun + noun требуют анализа смысловых отношений.',
    selection:'Найди основное существительное, которое задаёт число и согласование. Затем проверь, какие слова уточняют его слева и справа. Не позволяй близкому существительному внутри of-phrase перетянуть согласование.',
    contrast:'The list of items is long — head noun list (singular), не items. A number of students are… обычно plural; the number of students is… singular. Collective nouns могут различаться BrE/AmE и по смыслу группы/индивидов.',
    boundary:'Согласование с collective nouns и измерениями зависит от варианта английского и значения. Noun modifiers чаще стоят в единственном числе (a research project), но есть устойчивые исключения.',
    pronunciation:'В длинных noun phrases ударение часто помогает выделить head noun и смысловую границу. В аудировании не путай близкое plural noun в prepositional phrase с главным subject.',
    traps:[['The list of changes are extensive.','The list of changes is extensive.','Head noun list — единственное число.'],['A researchs project','A research project','Research обычно неисчисляемое и не получает plural -s в этом значении.'],['The results of the experiment shows…','The results of the experiment show…','Head noun results — множественное число.']],
    examples:[
      ['The results of the latest experiment are promising.','Результаты последнего эксперимента многообещающие.','head noun results, plural.'],
      ['A series of measurements was taken.','Была проведена серия измерений.','head noun series; здесь singular.'],
      ['The number of participants has increased.','Количество участников увеличилось.','the number of + plural noun, singular head.'],
      ['A number of participants have withdrawn.','Некоторые участники выбыли.','a number of выражает множество, plural agreement.']
    ],
    toefl:'Noun phrases позволяют компактно формулировать академические идеи. Agreement и ясные modifiers особенно важны в сложных предложениях Writing.'
  },
  agreement: {
    label:'subject–verb agreement',
    core:'Сказуемое согласуется с грамматическим ядром подлежащего, а не с ближайшим словом. В сложных noun phrases нужно отличать head noun от вставных групп и относительных придаточных.',
    form:'Singular head → singular verb; plural head → plural verb. Each/every/one/each of обычно требует singular agreement; and часто образует plural subject, но устойчивые пары/единые понятия могут быть singular. There is/are согласуется с реальным noun phrase по контексту/норме.',
    selection:'Убери мысленно prepositional phrases и дополнительные clauses; найди head noun; затем определи число и лицо. При коллективных существительных проверь смысл и разновидность английского.',
    contrast:'The quality of the samples is… (quality); the samples are… (samples). A number of cases are…; the number of cases is…. Neither of the answers is — в формальном согласовании часто singular, разговорное употребление может варьироваться.',
    boundary:'Collective nouns (team, government, family) могут принимать singular или plural agreement в зависимости от BrE/AmE и того, мыслится ли группа как единое целое или отдельные участники. В академическом тексте выбирай последовательный вариант.',
    pronunciation:'В устной речи окончания согласования могут быть редуцированы; не полагайся только на звучание -s. Находи head noun по структуре.',
    traps:[['The list of reasons are…','The list of reasons is…','Head noun list — singular.'],['Each of the participants have…','Each of the participants has…','Each задаёт singular agreement в стандартной конструкции.'],['The data is…','The data are… / data is… в зависимости от стиля и варианта','Data имеет вариативное согласование; в академическом контексте придерживайся выбранного style guide.']],
    examples:[
      ['The range of responses is wide.','Диапазон ответов широк.','head noun range.'],
      ['The responses from each group are different.','Ответы каждой группы различаются.','head noun responses.'],
      ['Each of the experiments was repeated.','Каждый эксперимент был повторён.','each of + plural noun с singular verb.'],
      ['A number of variables affect the outcome.','На результат влияют несколько переменных.','a number of + plural agreement.']
    ],
    toefl:'Agreement в сложных subject phrases — частая причина ошибок в Build a Sentence и Academic Discussion. Проверяй ядро подлежащего, а не ближайшее существительное.'
  },
  cleft: {
    label:'cleft clauses и information focus',
    core:'Cleft clauses перераспределяют информацию, чтобы выделить участника, действие, время, место или сам факт. Это инструмент информационной структуры, а не просто «сложная грамматика».',
    form:'It-cleft: It + be + focused element + that/who-clause. Wh-cleft: What + clause + be + focused element. Reversed wh-cleft: The thing/point/reason… is… . Выбор конструкции зависит от фокуса и регистра.',
    selection:'Определи, какую часть исходного сообщения нужно выделить как новую/контрастную информацию. Сохрани логическую связь и не создавай искусственный акцент, если нейтральный порядок уже ясен.',
    contrast:'It was the timing that caused the problem выделяет timing. What caused the problem was the timing выдвигает на первый план целый ответ. Fronting перемещает элемент, но не всегда создаёт ту же cleft structure.',
    boundary:'Cleft construction может быть грамматически правильной, но стилистически перегруженной. Не используй it-cleft в каждом предложении; в академическом тексте акцент должен отражать реальное противопоставление.',
    pronunciation:'Фокусный элемент часто получает ядерное ударение. В Speaking интонация должна поддерживать грамматический фокус; иначе выделение может звучать неестественно.',
    traps:[['It was the results what surprised us.','It was the results that surprised us.','В it-cleft обычно используется that/who, а не what.'],['What the study shows it is…','What the study shows is…','Wh-cleft не требует дополнительного it в этой структуре.'],['It is because the sample was small why…','The reason is that the sample was small.','Не смешивай две конкурирующие cleft patterns.']],
    examples:[
      ['It was the second trial that revealed the pattern.','Именно второе испытание выявило закономерность.','it-cleft выделяет trial.'],
      ['What the data demonstrate is a gradual change.','То, что показывают данные, — это постепенное изменение.','wh-cleft выделяет результат.'],
      ['It is the interaction between variables that matters most.','Важнее всего именно взаимодействие переменных.','фокус на факторе.'],
      ['What remains unclear is the cause of the decline.','Остаётся неясным то, что является причиной снижения.','wh-cleft с тематическим фокусом.']
    ],
    toefl:'Cleft clauses могут усилить контраст в аргументе, но в TOEFL важнее естественная и ясная организация идеи. Не жертвуй простотой ради искусственной сложности.'
  },
  ellipsis: {
    label:'ellipsis, substitution и reference',
    core:'Ellipsis опускает материал, который легко восстановить из контекста; substitution заменяет повторяемую единицу (one/ones, do, so, neither). Reference связывает местоимение или выражение с понятным референтом.',
    form:'One/ones заменяют countable noun; do so заменяет действие; so/neither участвуют в согласии/несогласии; ellipsis опускает повторяемую часть в parallel structures. Pronoun reference требует однозначного antecedent.',
    selection:'Найди, какая информация повторяется и может быть восстановлена. Проверь, совпадают ли число/исчисляемость у one/ones и понятен ли referent местоимения для читателя.',
    contrast:'I prefer the blue one — one заменяет singular countable noun. I like these ones — plural ones. So do I / Neither do I — auxiliary зависит от времени и конструкции. Do so заменяет действие, но не подходит во всех регистрах.',
    boundary:'One не заменяет неисчисляемые существительные в стандартной модели; для них используются выражения типа some/that. Эллипсис может быть естественным в диалоге, но в формальном письме опасен, если читатель не может восстановить пропуск.',
    pronunciation:'В разговорной речи ellipsis часто сопровождается короткими ответами и редукциями. В Listening восстанавливай опущенный материал из предыдущей реплики, не интерпретируй его как отсутствие смысла.',
    traps:[['I prefer the red ones (one item).','I prefer the red one.','Число one должно соответствовать заменяемому существительному.'],['So do I (after “I am tired”).','So am I.','В конструкции so + auxiliary повторяется вспомогательный глагол исходной фразы.'],['The first method was cheaper than the second did.','The first method was cheaper than the second.','Не добавляй do, если оно не заменяет опущенное действие.']],
    examples:[
      ['The first model is cheaper than the second.','Первая модель дешевле второй.','сравнительная clause с опущенным повтором.'],
      ['I prefer the smaller one.','Я предпочитаю тот, что поменьше.','one заменяет singular countable noun.'],
      ['The team revised the draft and did so carefully.','Команда пересмотрела черновик и сделала это тщательно.','do so заменяет действие.'],
      ['The data were incomplete, and so were the notes.','Данные были неполными, как и заметки.','so + auxiliary + subject.']
    ],
    toefl:'Reference и substitution поддерживают cohesion в Reading/Writing. Проверяй, можно ли однозначно определить, к какому noun или idea относится местоимение.'
  },
  inversion: {
    label:'inversion и fronting',
    core:'Inversion меняет обычный порядок subject–auxiliary ради грамматической структуры или акцента. Negative/limiting adverbials в начале формального предложения часто требуют инверсии; fronting может выносить элемент без той же модели.',
    form:'Negative adverbial + auxiliary + subject + main verb: Never have I seen…; Rarely does the method fail. Если auxiliary нет, добавляется do/does/did. Not only… but also может вызывать инверсию в первой части.',
    selection:'Определи, вынесен ли ограничительный/отрицательный элемент в начало. Если да, проверь необходимость инверсии. Если выносится обычный объект/обстоятельство для фокуса, не добавляй инверсию автоматически.',
    contrast:'Never have I seen this — negative inversion. This result, we did not expect — fronting/topicalisation без обязательной inversion. Only after the test did we notice… — инверсия после restrictive phrase в начале.',
    boundary:'В большинстве случаев inversion в этой функции формальна и стилистически маркирована. Не используй её с нейтральным adverbial без ограничения; в условных конструкциях инверсия with had/were/should имеет отдельные правила.',
    pronunciation:'В устной речи inversion часто получает сильное интонационное выделение; в академическом письме используй её редко и осознанно.',
    traps:[['Never I have seen…','Never have I seen…','После negative adverbial в начале требуется inversion.'],['Rarely the method fails.','Rarely does the method fail.','Если нет auxiliary, добавляется do-support и base form.'],['Only after we finished, we noticed…','Only after we finished did we notice…','Only + fronted adverbial требует inversion в главной части.']],
    examples:[
      ['Rarely do these findings appear in the literature.','Эти результаты редко встречаются в литературе.','negative/limiting adverbial + do-support.'],
      ['Never before had the team observed this effect.','Команда никогда прежде не наблюдала этот эффект.','Past Perfect inversion.'],
      ['Only after the second test did the pattern become clear.','Только после второго теста закономерность стала ясна.','inversion после only + adverbial.'],
      ['Not only did the method reduce cost, but it also improved accuracy.','Метод не только снизил стоимость, но и повысил точность.','inversion after not only.']
    ],
    toefl:'Inversion может добавить точный акцент, но экзаменационный ответ оценивается по ясности и естественности. Не используй редкую форму, если не уверен в структуре.'
  },
  hedging: {
    label:'hedging и stance',
    core:'Hedging калибрует силу утверждения: показывает вероятность, ограничение данных, осторожность интерпретации и позицию автора. Это не «неуверенность», а академическая точность.',
    form:'Модальные глаголы (may, might, could); stance verbs (appear, seem, suggest); adverbs (probably, potentially, generally); noun phrases (a possible explanation); reporting verbs (indicate, imply, demonstrate) с разной степенью силы.',
    selection:'Сопоставь силу языка с доказательствами. Если данные ограничены, избегай категоричных prove/always; если результат устойчив и хорошо подтверждён, не смягчай его без причины.',
    contrast:'The results prove X — сильное категоричное утверждение. The results suggest X — осторожная интерпретация. May indicate выражает возможность; is likely to — более сильную вероятность. Выбирай форму по evidence, не по красоте.',
    boundary:'Hedging не должно делать каждое предложение расплывчатым. Over-hedging скрывает позицию; under-hedging преувеличивает данные. Разные reporting verbs имеют разные оттенки и синтаксические модели.',
    pronunciation:'В устной академической речи ударение на may/might/likely и паузы могут калибровать степень уверенности. Не превращай каждую реплику в набор вводных слов.',
    traps:[['The data proves that… (small sample)','The data suggest that…','Сильный prove не соответствует ограниченной выборке.'],['It may possibly perhaps indicate…','It may indicate…','Не накапливай несколько hedges с одинаковой функцией.'],['The study suggests to improve…','The study suggests improving… / suggests that…','Suggest управляет определёнными моделями дополнения.']],
    examples:[
      ['The findings may indicate a regional difference.','Результаты могут указывать на региональное различие.','осторожная модальность.'],
      ['The pattern appears to be consistent across groups.','Похоже, закономерность устойчива между группами.','appear to + infinitive.'],
      ['One possible explanation is a change in sampling.','Одно из возможных объяснений — изменение выборки.','hedging в noun phrase.'],
      ['The evidence strongly suggests a link.','Данные убедительно указывают на связь.','сила утверждения соотнесена с evidence.']
    ],
    toefl:'Hedging особенно важно в Academic Discussion: выражай позицию уверенно, но не сильнее, чем позволяют основания. Используй may/suggest/likely точно и разнообразно.'
  },
  nominalisation: {
    label:'nominalisation и academic style',
    core:'Nominalisation превращает действие или качество в существительное и позволяет упаковывать сложные идеи в noun phrases. Она повышает плотность текста, но может делать его тяжёлым и скрывать исполнителя.',
    form:'Verb → noun (analyse → analysis; decide → decision); adjective → noun (accurate → accuracy). Nominal phrase может включать premodifiers и postmodifiers. Сохраняй article, number и agreement по head noun.',
    selection:'Выбирай nominal style, если фокус — процесс/результат/понятие и текст требует компактного академического регистра. Оставляй verbal clause, если важны агент, действие и простое объяснение.',
    contrast:'The team analysed the data — явный агент и действие. The analysis of the data revealed… — фокус на исследовании/результате. Не превращай каждое предложение в цепочку абстрактных существительных.',
    boundary:'У разных существительных могут быть разные значения и сочетаемость (development, investigation, increase). Некоторые nominalisations требуют of-phrase, другие — in/by/to. Слишком плотные noun strings ухудшают читаемость.',
    pronunciation:'Длинные производные слова часто меняют ударение относительно основы (PHOtograph / phoTOGraphy / photoGRAPHic). Проверяй словарное ударение и суффиксы.',
    traps:[['The analysis the data','the analysis of the data','Часто требуется of-phrase для указания объекта анализа.'],['an important improve','an important improvement','После adjective нужен noun, образованный корректным суффиксом.'],['The rapid increase of costs were…','The rapid increase in costs was…','Head noun increase — singular; устойчивое управление — increase in.']],
    examples:[
      ['The rapid expansion of the network increased access.','Быстрое расширение сети повысило доступность.','nominalisation expansion.'],
      ['The researchers analysed the results carefully.','Исследователи внимательно проанализировали результаты.','verbal style с ясным агентом.'],
      ['A comparison of the two methods revealed a difference.','Сравнение двух методов выявило различие.','noun phrase + of-complement.'],
      ['The implementation of the policy requires further evaluation.','Внедрение политики требует дальнейшей оценки.','плотная академическая noun phrase.']
    ],
    toefl:'Nominalisation помогает в академическом регистре, но не является целью само по себе. Предпочитай ясную verbal clause, когда она точнее и легче для чтения.'
  },
  punctuation: {
    label:'пунктуация и границы clauses',
    core:'Пунктуация отражает синтаксическую структуру и помогает читателю видеть границы independent/dependent clauses, relative information, introductory phrases и параллельных элементов.',
    form:'Independent clauses могут соединяться точкой, semicolon или comma + coordinating conjunction. Dependent clause в начале часто отделяется запятой; в конце — обычно без неё, если правила не требуют иного. Non-defining relative clause выделяется парными запятыми.',
    selection:'Сначала найди clauses и их subject/verb, затем определи, какая информация essential или supplementary. Не ставь comma только из-за длинной паузы при чтении.',
    contrast:'Comma splice: две independent clauses соединены только запятой. Исправление: full stop, semicolon или comma + and/but/so. Defining relative clause обычно без запятых; non-defining — с запятыми.',
    boundary:'Пунктуационные conventions могут различаться между style guides, особенно в serial comma и отдельных вводных конструкциях. Speakbase использует последовательную академическую норму; проверь требования конкретного задания.',
    pronunciation:'Паузы в речи помогают услышать смысловые группы, но запятая не всегда соответствует паузе. В письменной работе ориентируйся на грамматические границы, а не на дыхание.',
    traps:[['The study was short, it produced useful data.','The study was short, but it produced useful data.','Comma splice: нужны союз, точка или semicolon.'],['My brother who lives in Rome is a doctor. (if extra info)','My brother, who lives in Rome, is a doctor.','Дополнительная информация о конкретном брате выделяется парными запятыми.'],['Because the sample was small.','Because the sample was small, the result was uncertain.','Dependent clause без главной части — fragment, если не является осознанным ответом/заголовком.']],
    examples:[
      ['Although the sample was small, the pattern was clear.','Хотя выборка была небольшой, закономерность была ясна.','comma после начального dependent clause.'],
      ['The method was efficient; however, it was expensive.','Метод был эффективен; однако он был дорогим.','semicolon между independent clauses с conjunctive adverb.'],
      ['The participants, who were volunteers, signed consent forms.','Участники, которые были добровольцами, подписали согласия.','non-defining clause.'],
      ['The study was limited, but the results were informative.','Исследование было ограниченным, но результаты были информативными.','comma + coordinating conjunction.']
    ],
    toefl:'Пунктуация поддерживает читаемость email и Academic Discussion. Проверяй fragments, comma splices, clause boundaries и relative clauses при редактировании.'
  },
  cohesion: {
    label:'cohesion, reference и discourse',
    core:'Cohesion связывает предложения и абзацы так, чтобы читатель понимал, какие идеи развивают, уточняют, противопоставляют или обобщают предыдущие. Грамматическая связность включает reference, substitution, ellipsis и discourse markers.',
    form:'Reference: pronouns/demonstratives + clear antecedent. Substitution: one/ones, do so, so/neither. Linking: addition, contrast, cause, result, sequence, exemplification. Повтор ключевого термина иногда лучше неясного синонима.',
    selection:'Проверь, к чему относится каждое this/it/they/which; затем оцени логическую связь между предложениями. Выбирай marker по смыслу, не для декоративного разнообразия.',
    contrast:'This result может ссылаться на всю предыдущую мысль, но this без head noun иногда двусмысленно. However показывает контраст, therefore — следствие, moreover — добавление; они не взаимозаменяемы.',
    boundary:'Не начинай каждое предложение с firstly/furthermore/however. Логическая связь должна действительно существовать. Pronoun reference может быть грамматически возможной, но семантически неоднозначной.',
    pronunciation:'В устной речи coherence поддерживают паузы, логическое ударение и повтор ключевых слов; слишком частые fillers и discourse markers мешают естественному темпу.',
    traps:[['This shows it is important. (unclear “this”)','This pattern shows that the interaction is important.','Называй referent, если местоимение может быть двусмысленным.'],['Moreover, the results contradict the hypothesis. (when intended contrast)','However, the results contradict the hypothesis.','Moreover добавляет; however противопоставляет.'],['The first method is effective. It is cheaper. (unclear referent)','The first method is effective and is also cheaper.','Уточняй, к чему относится it, если в контексте несколько возможных объектов.']],
    examples:[
      ['The first method was faster. However, it required more equipment.','Первый метод был быстрее. Однако он требовал больше оборудования.','контраст.'],
      ['The sample was small; therefore, the findings should be interpreted cautiously.','Выборка была небольшой; поэтому результаты следует интерпретировать осторожно.','следствие.'],
      ['This pattern is consistent with the earlier observation.','Эта закономерность согласуется с предыдущим наблюдением.','reference через this + noun.'],
      ['The second approach is less costly. It also requires less time.','Второй подход дешевле. Он также требует меньше времени.','ясный antecedent.']
    ],
    toefl:'Cohesion важна для всех письменных ответов TOEFL. В Academic Discussion связывай собственную позицию с аргументом другого участника, не превращая текст в список connectors.'
  },
  editing: {
    label:'синтез и редактирование академической грамматики',
    core:'Редактирование проверяет не изолированную форму, а систему: согласование, временную перспективу, структуру clause, reference, register, cohesion и пунктуацию. Грамматическая сложность должна служить ясности сообщения.',
    form:'Уровень текста: цель и тезис → порядок идей → грамматические модели → reference/connectors → agreement/tense → punctuation → register. На уровне предложения проверяй subject–verb, verb complementation, modifiers и clause boundaries.',
    selection:'Сначала определи смысл, который автор хочет передать. Затем исправляй конструкцию с минимальным вмешательством; не меняй точный смысл ради более «сложной» формы.',
    contrast:'Редактирование ≠ усложнение. Простое точное предложение лучше перегруженной конструкции. Меняй форму только тогда, когда это устраняет ошибку, двусмысленность или неуместный регистр.',
    boundary:'Не все редакторские решения являются бинарными: article use, collective agreement, punctuation style и hedging могут зависеть от контекста/стандарта. Отмечай, что является ошибкой, а что — стилистическим предпочтением.',
    pronunciation:'Для устного редактирования слушай смысловые группы, согласование окончаний, ударение и паузы. Грамматически точная речь должна оставаться естественной и понятной.',
    traps:[['The results shows a clear effect.','The results show a clear effect.','Проверь head noun и agreement.'],['The study may proves…','The study may prove…','После modal используется base form.'],['The method, which was new was effective.','The method, which was new, was effective.','Non-defining clause требует парных запятых.']],
    examples:[
      ['The findings suggest that the revised method is more reliable.','Результаты показывают, что обновлённый метод надёжнее.','точная reporting structure и comparative.'],
      ['Although the sample was limited, the pattern was consistent.','Хотя выборка была ограничена, закономерность была устойчивой.','уступка с ясным agreement.'],
      ['The data were collected in three stages and analysed independently.','Данные были собраны в три этапа и проанализированы независимо.','passive и parallel structure.'],
      ['These results may indicate a broader trend, although further research is needed.','Эти результаты могут указывать на более широкую тенденцию, хотя нужны дальнейшие исследования.','hedging + concession.']
    ],
    toefl:'Используй этот урок как редакторский чек-лист для Email и Academic Discussion. Сначала содержание и логика, затем точность конструкции, затем стиль и пунктуация.'
  }
};

const FAMILY_BY_ID = {};
function set(family, ids) { ids.forEach(id => FAMILY_BY_ID[id] = family); }
set('be',['A1-03']);
set('nouns',['A1-04','A1-09']);
set('present',['A1-06','A1-12']);
set('continuous',['A1-13','A1-14','A2-02','A2-03']);
set('nounPhrase',['A1-07','A1-08','A1-10','B1-19','B2-09','C1-06']);
set('adverb',['A1-11','A2-11','B2-13','C1-13']);
set('modal',['A1-15','A2-07','B1-09','B1-10','B2-03','C1-09']);
set('clause',['A1-16','A1-17','A2-16','B1-17','B1-18','B2-14','C1-10']);
set('preposition',['A1-18','A2-17','B2-19']);
set('past',['A1-19','A2-01','A2-02','A2-03','B1-02','B1-03']);
set('future',['A2-04','B1-04']);
set('perfect',['A2-05','A2-06','B1-01','B1-02','B1-03']);
set('comparison',['A2-08','A2-09','B1-22']);
set('quantifier',['A1-10','A2-10','B2-12']);
set('verbPattern',['A2-12','B1-13','C1-12']);
set('question',['A2-13','B1-16']);
set('relative',['A2-14','B1-14','B2-07']);
set('conditional',['A2-15','B1-05','B1-06','B2-01','B2-02','C1-02']);
set('phrasal',['A2-18','B1-20']);
set('passive',['B1-07','B2-04','C1-07']);
set('causative',['B1-08','B2-06']);
set('modal',['B1-09','B1-10','B2-03','C1-09']);
set('reporting',['B1-11','B1-12','B2-05','C1-08']);
set('verbPattern',['B1-13','C1-12']);
set('relative',['B1-14']);
set('past',['B1-15']);
set('question',['B1-16']);
set('nounPhrase',['B1-19','B2-09']);
set('participle',['B1-21','B2-07','B2-08','C1-04']);
set('comparison',['B1-22']);
set('conditional',['B2-01','B2-02','C1-02']);
set('nounPhrase',['B2-09','B2-10']);
set('agreement',['B2-10']);
set('nouns',['B2-11']);
set('quantifier',['B2-12']);
set('adverb',['B2-13','C1-13']);
set('cleft',['B2-15','C1-03']);
set('ellipsis',['B2-16','C1-11']);
set('inversion',['B2-17','C1-01','C1-02','C1-10']);
set('hedging',['B2-18','C1-09']);
set('nominalisation',['B2-20','C1-05']);
set('punctuation',['B2-21']);
set('nounPhrase',['C1-06']);
set('reporting',['C1-08']);
set('cohesion',['C1-11']);
set('editing',['C1-14']);
set('passive',['C1-07']);
set('clause',['C1-10']);
set('cleft',['C1-03']);
set('agreement',['B2-10']);
set('preposition',['C1-06']);
set('verbPattern',['B2-06','B2-08','B2-20']);
set('conditional',['B2-01','C1-02']);
set('question',['A1-03','A2-13']);
set('be',['A1-03']);
set('nounPhrase',['A1-07','A1-08']);
set('nouns',['A1-09']);
set('imperative',['A1-16']);
set('conditional',['B1-05','B1-06']);
set('passive',['B1-07']);
set('modal',['A2-07','B1-09','B1-10']);
set('reported',['B1-11','B1-12']);
set('relative',['A2-14','B1-14']);
set('usedto',['B1-15']);
set('discourse',['B1-18','C1-11']);
set('agreement',['B2-10']);
set('cleft',['B2-15','C1-03']);
set('ellipsis',['B2-16']);
set('hedging',['B2-18']);
set('nominalisation',['B2-20','C1-05']);
set('punctuation',['B2-21']);
set('inversion',['C1-01','C1-02']);
set('nonfinite',['C1-04']);
set('reporting',['C1-08']);
set('concession',['C1-10']);
set('cohesion',['C1-11']);
set('adverb',['C1-13']);
set('editing',['C1-14']);

Object.assign(FAMILY, {
  imperative: {
    label:'imperatives and instructions',
    core:'Imperative обращается прямо к адресату: используется базовая форма глагола без выраженного subject you. Конструкция подходит для инструкций, команд, предупреждений, рецептов и простых предложений с let’s.',
    form:'Positive: base verb (+ object/complement). Negative: do not / don’t + base verb. Let’s + base verb предлагает совместное действие; let’s not + base verb запрещает/отклоняет его.',
    selection:'Определи, говоришь ли ты адресату, что сделать, чего не делать, или предлагаешь совместное действие. Для более вежливой инструкции добавляй please, could you или would you mind — это уже отдельный речевой выбор.',
    contrast:'Open the file — команда/инструкция. Let’s open the file — предложение сделать это вместе. You should open the file — совет с модальным глаголом и выраженным subject.',
    boundary:'Императив может иметь подразумеваемого адресата; иногда для усиления используется do (Do be careful). Don’t + base verb; не добавляй to. В инструкциях важны контекст и вежливость.',
    pronunciation:'В командах ударение на глаголе может звучать резко; please и мягкая интонация меняют прагматический тон.',
    traps:[['To open the file.','Open the file.','В обычном imperative используется base verb без to.'],['Don’t to touch it.','Don’t touch it.','После don’t используется base form.'],['Let’s to begin.','Let’s begin.','После let’s используется bare infinitive.']],
    examples:[['Check the figures before submitting.','Проверьте цифры перед отправкой.','положительный imperative.'],['Do not remove the label.','Не снимайте этикетку.','отрицательный imperative.'],['Let’s compare the two results.','Давайте сравним два результата.','предложение совместного действия.'],['Please read the instructions carefully.','Пожалуйста, внимательно прочитайте инструкции.','вежливый imperative.']],
    toefl:'Imperatives полезны для инструкций и практических писем, но в академическом аргументе обычно выбирай нейтральные просьбы/рекомендации, а не прямые команды.'
  },
  usedto: {
    label:'used to и привыкание',
    core:'Похожие формы used to do, be used to doing и get used to doing выражают разные отношения со временем: прежнюю привычку/состояние, привычность в настоящем или процесс привыкания.',
    form:'used to + base verb = регулярное прошлое/состояние, которого сейчас обычно нет. be used to + noun/V-ing = быть привыкшим. get used to + noun/V-ing = привыкать/становиться привычным.',
    selection:'Если говоришь о прошлой привычке — used to do. Если о состоянии привыкания — be used to. Если о процессе адаптации — get used to. В этих двух последних конструкциях to является предлогом, поэтому после него noun или -ing.',
    contrast:'I used to work nights — раньше работал по ночам. I am used to working nights — я привык работать по ночам. I am getting used to working nights — я привыкаю.',
    boundary:'Used to в отрицаниях/вопросах имеет вариативные формы (didn’t use to / usedn’t to в некоторых вариантах); would может описывать повторяющиеся действия в прошлом, но не всегда заменяет used to для состояний.',
    pronunciation:'В разговорной речи used to часто редуцируется до /ˈjuːstə/; различай used to do и be used to doing по вспомогательному be и форме -ing.',
    traps:[['I am used to wake up early.','I am used to waking up early.','В be used to слово to — предлог, после него используется -ing/noun.'],['I used to working here.','I used to work here.','Used to для прошлой привычки требует base verb.'],['I get used to work nights.','I get used to working nights.','После get used to также используется noun или -ing.']],
    examples:[['The town used to be much smaller.','Раньше город был гораздо меньше.','прошлое состояние.'],['Researchers are used to working with large datasets.','Исследователи привыкли работать с большими наборами данных.','состояние привыкания.'],['New students gradually get used to the schedule.','Новые студенты постепенно привыкают к расписанию.','процесс адаптации.'],['She didn’t use to enjoy public speaking.','Раньше ей не нравилось выступать публично.','отрицательная форма used to.']],
    toefl:'Эти формы полезны для сравнения прошлого и настоящего опыта в Speaking. Выбирай форму по временной перспективе, а не только по наличию слова to.'
  },
  agreement: {
    label:'agreement в сложных структурах',
    core:'Согласование в сложных предложениях определяется грамматическим ядром подлежащего. Длинные prepositional phrases, relative clauses, вложенные группы и количественные выражения могут отвлекать от head noun.',
    form:'Найди head noun; согласуй verb с его числом/лицом. В конструкциях each/every/one of обычно singular; a number of + plural noun — plural; the number of — singular. Collective nouns допускают вариативность по смыслу/варианту английского.',
    selection:'Временно убери все уточнения между subject и verb. Назови ядро одним словом, проверь его число, затем верни modifiers и проверь, что они не изменили грамматическую роль.',
    contrast:'The list of items is long (list). A number of items are missing (items). The number of items is rising (number). Контекст определяет, что является subject head.',
    boundary:'Data может трактоваться как plural или mass noun в современном употреблении; коллективные существительные различаются в BrE/AmE. В академическом тексте следуй выбранному style guide последовательно.',
    pronunciation:'В длинном подлежащем verb может отделяться от head noun несколькими словами. На письме проверяй структуру глазами, а на слух ориентируйся на грамматическую группу, а не ближайшее существительное.',
    traps:[['The quality of the samples are…','The quality of the samples is…','Head noun quality — singular.'],['Each of the results are…','Each of the results is…','Each задаёт единственное число.'],['A number of factors is important.','A number of factors are important.','A number of означает несколько и согласуется во множественном числе.']],
    examples:[['The quality of the measurements is high.','Качество измерений высокое.','ядро quality.'],['A number of participants were excluded.','Несколько участников исключили.','a number of + plural.'],['The number of errors has decreased.','Количество ошибок уменьшилось.','the number of — singular.'],['Each of the methods produces a different result.','Каждый из методов даёт разный результат.','each of + plural noun, singular verb.']],
    toefl:'Согласование с длинными subject phrases особенно важно для Build a Sentence и редактирования Writing. Ищи ядро подлежащего до выбора формы глагола.'
  }
});

set('reporting',['B1-11','B1-12','B2-05','C1-08']);
set('cohesion',['B1-18','C1-11']);
set('participle',['B1-21','B2-07','B2-08','C1-04']);
set('clause',['A1-17','A2-16','B1-17','B2-14','C1-10']);
set('imperative',['A1-16']);
set('usedto',['B1-15']);
set('agreement',['B2-10']);
set('editing',['C1-14']);
set('ellipsis',['B2-16']);
set('cleft',['B2-15','C1-03']);
set('nominalisation',['B2-20','C1-05']);
set('punctuation',['B2-21']);
set('hedging',['B2-18']);
set('inversion',['B2-17','C1-01','C1-02']);
set('passive',['B1-07','B2-04','C1-07']);
set('causative',['B1-08','B2-06']);
set('relative',['A2-14','B1-14','B2-07']);
set('conditional',['A2-15','B1-05','B1-06','B2-01','B2-02','C1-02']);
set('present',['A1-06','A1-12']);
set('nouns',['A1-04','A1-09','B2-11']);
set('nounPhrase',['A1-07','A1-08','B1-19','B2-09','B2-10','C1-06']);
set('preposition',['A1-18','A2-17','B2-19']);
set('phrasal',['A2-18','B1-20']);
set('question',['A2-13','B1-16']);
set('comparison',['A2-08','A2-09','B1-22']);
set('quantifier',['A1-10','A2-10','B2-12']);
set('adverb',['A1-11','A2-11','B2-13','C1-13']);
set('future',['A2-04','B1-04']);
set('perfect',['A2-05','A2-06','B1-01']);
set('past',['A1-19','A2-01','B1-02','B1-03']);
set('continuous',['A1-13','A1-14','A2-02','A2-03']);
set('modal',['A1-15','A2-07','B1-09','B1-10','B2-03','C1-09']);
set('verbPattern',['A2-12','B1-13','B2-06','C1-12']);
set('nounPhrase',['B2-09']);
set('agreement',['B2-10']);
set('passive',['B1-07','B2-04','C1-07']);
set('reporting',['B1-11','B1-12','B2-05','C1-08']);
set('causative',['B1-08','B2-06']);
set('hedging',['B2-18','C1-09']);
set('cleft',['B2-15','C1-03']);
set('ellipsis',['B2-16']);
set('inversion',['B2-17','C1-01']);
set('conditional',['C1-02']);
set('nominalisation',['B2-20','C1-05']);
set('punctuation',['B2-21']);
set('cohesion',['C1-11']);
set('editing',['C1-14']);
set('participle',['C1-04']);
set('verbPattern',['B1-13','C1-12']);
set('clause',['B1-17','B2-14','C1-10']);
set('preposition',['C1-06']);
set('adverb',['C1-13']);

const DRILLS = {
  be:[
    ['The students ___ ready for the presentation.','are','is','am','Множественное подлежащее students требует are.'],
    ['___ the equipment available today?','Is','Are','Does','Equipment обычно неисчисляемое singular noun; вопрос строится с is.'],
    ['The results ___ not conclusive.','are','is','does','Отрицание be строится как be + not; results — plural.'],
    ['Why ___ the sample considered unreliable?','is','does','are','Вопрос с пассивной формой be требует инверсии is перед singular subject.'],
    ['The findings ___ consistent across both groups.','are','is','has','Findings — plural subject, поэтому are.'],
    ['The room ___ not large enough for the session.','is','does','are','С room (единственное число) используется is; отрицание не требует do.'],
    ['___ you certain about the date?','Are','Do','Is','Be-question образуется перестановкой are перед you.']
  ],
  nouns:[
    ['We need ___ umbrella for the trip.','an','a','the','Umbrella начинается с гласного звука; при первом неопределённом упоминании нужен an.'],
    ['The laboratory has two ___ .','rooms','room','roomes','Обычное countable noun образует plural через -s.'],
    ['She gave me useful ___.','advice','advices','an advice','Advice обычно неисчисляемое существительное.'],
    ['It took ___ hour to complete the test.','an','a','the','В hour h не произносится; первый звук гласный.'],
    ['Several ___ were damaged during transport.','boxes','boxs','box','После x обычно добавляется -es.'],
    ['The university launched ___ new programme.','a','an','the','University начинается с согласного звука /j/, поэтому a.'],
    ['The research involved three different ___.','analyses','analysis','analysises','Analysis имеет нерегулярное множественное число analyses.']
  ],
  present:[
    ['The report usually ___ with a short summary.','begins','begin','is beginning','Обычная структура текста/регулярное описание; singular subject в Present Simple получает -s.'],
    ['The researchers ___ the data every month.','review','reviews','are review','Plural subject требует base form в Present Simple.'],
    ['She ___ not agree with the conclusion.','does','do','is','Отрицание Present Simple с she строится через does not + base verb.'],
    ['How often ___ the equipment require maintenance?','does','do','is','Equipment singular; вопрос требует does + base form.'],
    ['The article ___ three possible explanations.','offers','offer','is offer','The article — singular subject; в affirmative Present Simple нужен offers.'],
    ['Water ___ at 100°C at standard pressure.','boils','boil','is boiling','Общая научная закономерность выражается Present Simple.'],
    ['They ___ the results in the weekly meeting.','discuss','discusses','are discuss','They требует base form в Present Simple.']
  ],
  continuous:[
    ['The researchers ___ the samples right now.','are examining','examine','is examining','Right now указывает на процесс; plural subject requires are + V-ing.'],
    ['At noon yesterday, the team ___ the equipment.','was testing','is testing','were test','Past process with team as singular collective in this sentence: was + V-ing.'],
    ['This week, I ___ from home.','am working','work','worked','This week показывает временную ситуацию вокруг настоящего; am working.'],
    ['By this time tomorrow, they ___ the results.','will be presenting','presented','will presenting','Процесс в определённый будущий момент: will be + V-ing.'],
    ['She ___ the answer at the moment.','is considering','considers','is consider','Consider в значении обдумывания допускает Continuous.'],
    ['The temperature ___ gradually.','is increasing','increase','has increase','Изменение в процессе выражается Present Continuous.'],
    ['They ___ for the final results since Monday.','have been waiting','are wait','had waited','Длительность от прошлого до настоящего требует have been + V-ing.']
  ],
  past:[
    ['The team ___ the first trial last year.','completed','complete','has complete','Last year — завершённое прошлое время; нужен Past Simple.'],
    ['Did the participants ___ the form?','complete','completed','completing','После did используется base form.'],
    ['At eight, the students ___ for the exam.','were studying','was studying','are studying','Past Continuous: plural subject + were + V-ing.'],
    ['By the time we arrived, the lecture ___.','had started','has started','started already tomorrow','Более раннее событие относительно другого прошлого момента может выражаться Past Perfect.'],
    ['She ___ not attend the meeting yesterday.','did','does','was','Past Simple negative: did not + base verb.'],
    ['The report ___ published in 2020.','was','were','did','Passive Past Simple с singular subject требует was + V3.'],
    ['They ___ the problem before the deadline.','had identified','have identify','were identify','Past Perfect = had + V3 для более раннего прошлого.']
  ],
  future:[
    ['Look at those clouds. It ___ rain.','is going to','will to','is','Признаки в настоящем поддерживают прогноз be going to.'],
    ['The train ___ at 7:30 tomorrow.','leaves','will leaving','is leave','Расписание часто выражается Present Simple.'],
    ['We ___ the supervisor on Thursday; the meeting is booked.','are meeting','meet will','will meeting','Организованная договорённость выражается Present Continuous.'],
    ['By next month, the team ___ the project.','will have completed','will complete already','has completed','Завершение к будущей точке: will have + V3.'],
    ['At this time tomorrow, I ___ to the conference.','will be travelling','travelled','will travelling','Процесс в будущем моменте: will be + V-ing.'],
    ['I think the results ___ improve after the revision.','will','are going','will to','Прогноз/мнение часто выражается will + base form.'],
    ['When the data ___, we will begin the analysis.','arrive','will arrive','arrives tomorrow will','В time clause с будущим значением используется Present Simple.']
  ],
  perfect:[
    ['The team has already ___ the second test.','completed','complete','completing','После has нужен past participle V3.'],
    ['I ___ the researcher yesterday.','met','have met','had meet','Yesterday — завершённое время, используется Past Simple.'],
    ['By the time the meeting began, she ___ the report.','had finished','has finish','was finish','Завершение до другого прошлого события: Past Perfect.'],
    ['By June, the study ___ all required stages.','will have reached','will has reached','reached','Future Perfect: will have + V3 к будущей точке.'],
    ['They have been ___ the data for two hours.','analysing','analyse','analysed','Present Perfect Continuous: have been + V-ing.'],
    ['She has never ___ abroad.','travelled','travel','travelling','После has never используется V3.'],
    ['We have lived here ___ 2021.','since','for','during','Since обозначает точку начала периода.']
  ],
  modal:[
    ['All participants ___ sign the consent form.','must','must to','musts','После modal используется bare infinitive; must не получает -s.'],
    ['You ___ submit the form today; tomorrow is also acceptable.','do not have to','must not','cannot to','Отсутствие необходимости выражается do not have to, не запретом must not.'],
    ['The results ___ indicate a possible trend.','may','may to','mays','May + base form выражает возможность.'],
    ['The lights are off; the staff ___ have left.','must','must to','musts','Must have + V3 выражает сильный вывод о прошлом.'],
    ['You ___ check the source before citing it.','should','should to','shoulds','Should + base form выражает совет.'],
    ['The device ___ be damaged; it still works.','cannot','must not to','does not can','Cannot выражает невозможность/сильное отрицание предположения.'],
    ['Visitors ___ use the laboratory without permission.','must not','do not have to','might to','Must not выражает запрет.']
  ],
  comparison:[
    ['The second method is ___ than the first.','more reliable','most reliable','reliabler','Сравниваются два метода; длинное прилагательное использует more + adjective + than.'],
    ['This is the ___ accurate measurement in the set.','most','more','much','Высшая степень для accurate строится с the most.'],
    ['The two samples are as dense ___ each other.','as','than','like','Равенство: as + adjective + as.'],
    ['The new model is much ___ efficient.','more','most','many','Much может усиливать comparative.'],
    ['It is one of the most important ___.','factors','factor','factor’s','После one of the + superlative требуется plural noun.'],
    ['The results were ___ than expected.','worse','worst','more bad','Bad имеет irregular comparative worse.'],
    ['The smaller sample was ___ reliable.','less','least','few','Less + adjective выражает меньшую степень.']
  ],
  quantifier:[
    ['How ___ participants completed the survey?','many','much','little','Participants — исчисляемое plural noun; many.'],
    ['There is very ___ evidence for this claim.','little','few','many','Evidence обычно неисчисляемое; little.'],
    ['We interviewed ___ researchers who had used the method.','a few','a little','much','Researchers — plural countable noun; a few.'],
    ['___ of the two methods produced the same result.','Neither','Every','All','Для отрицания обоих из двух используется neither.'],
    ['The ___ report was reviewed by the committee.','whole','all','both','Whole обычно определяет singular countable noun with article/determiner.'],
    ['The results were consistent in ___ group.','both','every of','much','Both + plural noun относится к двум группам.'],
    ['There are ___ errors in the revised version than before.','fewer','less','little','Fewer используется с countable plural noun.']
  ],
  adverb:[
    ['The participants responded ___.','quickly','quick','quickness','Наречие manner характеризует responded.'],
    ['The explanation is ___ clear.','particularly','particular','particularity','Наречие степени усиливает adjective clear.'],
    ['She is a ___ careful researcher.','highly','high','height','Highly modifies adjective careful.'],
    ['The team has ___ reported this effect.','never','neverly','no','Frequency adverb обычно стоит перед смысловым participle.'],
    ['He works ___, not carelessly.','hard','hardly','hardness','Hard означает «усердно», hardly — «почти не».'],
    ['The sample was ___ small to support the claim.','too','enough','such','Too + adjective + to-infinitive выражает чрезмерную степень.'],
    ['The method is reliable ___ for small samples.','enough','too','very enough','Enough после adjective в этой структуре.']
  ],
  question:[
    ['Where ___ the participants recruited?','were','did','was','Вопрос с passive be: were + subject + V3.'],
    ['What ___ the researchers measure?','did','do','were','Вопрос о past action: did + subject + base form.'],
    ['Who ___ the report?','wrote','did write','was wrote','Who — subject; do-support обычно не нужен.'],
    ['Could you tell me where the laboratory ___?','is','is it','does it','Indirect question использует statement word order.'],
    ['Do you know whether the data ___ complete?','are','is','does','Data здесь plural; embedded yes/no question uses whether + statement order.'],
    ['How long ___ the experiment take?','did','was','has','Past question about duration uses did + base form.'],
    ['She asked me what I ___.','needed','did need','was need','Reported question uses statement order and past perspective.']
  ],
  relative:[
    ['The scientist ___ led the project received an award.','who','which','where','Who refers to a person and functions as subject.'],
    ['The method that we tested ___ effective.','was','were','be','Head noun method is singular.'],
    ['The report, ___ was published last month, is available online.','which','that','what','Non-defining relative clause uses which, not that.'],
    ['The student ___ data were selected received a certificate.','whose','who','which','Whose expresses possession.'],
    ['The article ___ I mentioned is now available.','that','whose','where','That can introduce a defining object relative clause.'],
    ['This is the laboratory ___ the samples were stored.','where','which','who','Where refers to place.'],
    ['The person to ___ I spoke was helpful.','whom','which','whose','Whom is object of the preposition in formal usage.']
  ],
  conditional:[
    ['If the temperature rises, the reaction ___.','speeds up','would speed up','sped up yesterday','Zero conditional expresses a general relationship using present forms.'],
    ['If the data are confirmed, the team ___ the paper.','will publish','would publish yesterday','publishes yesterday','First conditional: present in if-clause, will + base in result.'],
    ['If I had more time, I ___ another analysis.','would conduct','will conduct','would have conducted yesterday','Second conditional expresses a hypothetical present/future.'],
    ['If they had checked the figures, they ___ the error.','would have found','will find','would find now','Third conditional: unreal past condition and result.'],
    ['If I had accepted the offer, I ___ there now.','would be working','would have worked yesterday','will work','Mixed conditional: past condition with present result.'],
    ['Unless the sample is larger, the result may remain uncertain.','Unless','Despite','Although','Unless means if not and introduces a condition.'],
    ['Had the team known, it ___ earlier.','would have acted','will act','would act tomorrow','Inverted third conditional: Had + subject + V3.']
  ],
  clause:[
    ['___ the sample was small, the pattern was consistent.','Although','Despite','Because of','Although introduces a finite clause.'],
    ['The event was delayed ___ technical problems.','because of','because','although','Because of is followed by a noun phrase.'],
    ['The team repeated the test ___ verify the result.','to','because','despite','To-infinitive can express purpose.'],
    ['When the data ___, the analysis will begin.','arrive','will arrive','arrived yesterday','Future time clause uses present form.'],
    ['The result was unexpected, ___ the team repeated the trial.','so','although','despite','So introduces a result.'],
    ['___ the equipment was old, it remained reliable.','Although','Despite','Because of','Although + clause expresses concession.'],
    ['The researchers used a larger sample ___ the estimate would be more reliable.','so that','despite','because of','So that introduces purpose/result with a clause.']
  ],
  preposition:[
    ['The seminar begins ___ 9:30.','at','on','in','At is used with exact clock time.'],
    ['The report is due ___ Monday.','on','at','in','On is used with days.'],
    ['The samples were stored ___ the laboratory.','in','at','on','In indicates inside a room/building/area.'],
    ['She is interested ___ environmental policy.','in','on','at','Interested is followed by in.'],
    ['The outcome depends ___ several variables.','on','of','from','Depend takes the preposition on.'],
    ['The plane arrived ___ Helsinki at noon.','in','to','at','Arrive in is used with cities/countries.'],
    ['The path runs ___ the tunnel.','through','across','onto','Through means movement inside and from one side to the other.']
  ],
  phrasal:[
    ['Please turn ___ the device before cleaning it.','off','after','up to','Turn off means switch off.'],
    ['The technician looked ___ the equipment.','after','the equipment after','up','Look after means take care of and is inseparable.'],
    ['I need to look ___ this term.','up','it up in','after','Look up means search for information.'],
    ['She turned ___ the invitation.','down','the invitation down it','after','Turn down means reject.'],
    ['The plane took ___ at dawn.','off','up','after','Take off means leave the ground; here it is intransitive.'],
    ['The team carried ___ the experiment.','out','up','after','Carry out means conduct/perform.'],
    ['Please switch ___ the lights.','on','after','out of','Switch on means activate; separable with object.']
  ],
  verbPattern:[
    ['The researchers avoided ___ the same error.','repeating','to repeat','repeat','Avoid takes -ing.'],
    ['The team decided ___ the trial.','to extend','extending','extend','Decide takes to-infinitive.'],
    ['The supervisor asked the students ___ the draft.','to revise','revise','revising','Ask + object + to-infinitive.'],
    ['She stopped ___ because it was unhealthy.','smoking','to smoke','smoke','Stop + -ing means cease the activity.'],
    ['He stopped ___ a phone call.','to make','making','make','Stop + to-infinitive means pause another activity in order to do this.'],
    ['They made the assistant ___ the file.','prepare','to prepare','preparing','Make + object + bare infinitive in active voice.'],
    ['I remember ___ the document yesterday.','sending','to send','send','Remember + -ing refers to memory of a past action.']
  ],
  passive:[
    ['The samples were ___ at low temperature.','stored','storing','store','Passive: be + V3.'],
    ['The report has been ___ by the team.','approved','approve','approving','Present Perfect passive: has been + V3.'],
    ['The device must be ___ before use.','tested','testing','test','Modal passive: modal + be + V3.'],
    ['The new policy is believed ___ effective.','to be','being','be','Reporting passive with subject + is believed + to-infinitive.'],
    ['The results ___ published last week.','were','was','did','Plural subject + Past Simple be.'],
    ['The experiment can ___ repeated.','be','being','been','Modal + be + V3.'],
    ['The problem is being ___.','investigated','investigate','investigating','Present Continuous passive: is being + V3.']
  ],
  causative:[
    ['We had the computer ___.','repaired','repair','to repair','Have something done: have + object + V3.'],
    ['The manager got the technician ___ the system.','to update','update','updating','Get + person + to-infinitive.'],
    ['She had the assistant ___ the data.','check','to check','checking','Have + person + bare infinitive.'],
    ['The service had the documents ___.','translated','translate','translating','Documents receive the action, so use V3.'],
    ['The situation seems ___.','serious','seriously','seriousness','Linking verb seem takes adjective complement.'],
    ['The patient got his eyes ___.','tested','test','testing','Get something done describes arranging a service.'],
    ['The soup tastes ___.','good','well','goodly','Taste as linking verb takes adjective.']
  ],
  reporting:[
    ['The author stated that the results ___ significant.','were','are being','be','Past reporting verb often triggers backshift in a past reporting perspective.'],
    ['She told me that she ___ the paper.','had finished','has finish','will finished','Reported statement shifts perspective into the past; had + V3.'],
    ['He asked where the files ___.','were stored','were the files stored','did store','Reported question uses statement order.'],
    ['The paper suggests ___ the procedure.','revising','to revise','revise','Suggest commonly takes -ing or that-clause.'],
    ['The researcher denied ___ the data.','changing','to change','change','Deny takes -ing.'],
    ['She said that the result ___ still valid.','was','is being','be','Backshift is appropriate when reported from past perspective; context may allow present if still valid.'],
    ['They asked whether the sample ___ large enough.','was','was it','did','Whether introduces an embedded yes/no question with statement order.']
  ],
  participle:[
    ['___ the data, the team revised its conclusion.','Having reviewed','Have reviewed','Reviewing to','Perfect participle marks an earlier completed action.'],
    ['The samples ___ yesterday were analysed today.','collected','collecting','collect','Past participle creates a passive reduced relative.'],
    ['___ the instructions, she began the experiment.','Having read','Have read','Reading had','Having + V3 shows completion before the main action.'],
    ['The students ___ outside were invited in.','waiting','waited','were wait','Present participle creates an active reduced relative.'],
    ['The device, ___ in 2020, is no longer supported.','designed','designing','was design','Past participle expresses passive meaning.'],
    ['Walking home, ___ noticed the change.','I','the rain','the building','The implicit subject of the participle clause must match the main clause subject.'],
    ['___ by the results, the team repeated the trial.','Surprised','Surprising','Having surprise','Past participle expresses the affected state.']
  ],
  nounPhrase:[
    ['The quality of the measurements ___ high.','is','are','have','Head noun quality is singular; of-phrase does not control agreement.'],
    ['A number of participants ___ withdrawn.','have','has','is','A number of means several and takes plural agreement.'],
    ['The number of participants ___ increasing.','is','are','have','The number of is a singular subject.'],
    ['The university launched a ___ research project.','large-scale','largely-scale','large scales','Compound modifier is used before the noun.'],
    ['The results from the latest trial ___ promising.','are','is','was','Head noun results is plural.'],
    ['A series of tests ___ completed.','was','were','have','Series is singular in this phrase.'],
    ['The report on climate policy ___ several recommendations.','contains','contain','are contain','Head noun report is singular.']
  ],
  agreement:[
    ['The list of requirements ___ long.','is','are','have','Head noun list is singular.'],
    ['Each of the methods ___ a limitation.','has','have','are','Each requires singular agreement.'],
    ['A number of factors ___ the outcome.','affect','affects','is affect','A number of expresses several; plural agreement.'],
    ['The number of errors ___ decreased.','has','have','are','The number of is singular.'],
    ['The results of the analysis ___ consistent.','are','is','has','Head noun results is plural.'],
    ['Neither of the explanations ___ convincing.','is','are','have','Neither is normally singular in formal agreement.'],
    ['The team ___ divided in their opinions.','are','is','be','Collective noun agreement can vary by variety/meaning; plural here presents members as individuals (especially BrE).']
  ],
  cleft:[
    ['It was the second trial ___ revealed the pattern.','that','what','where','It-cleft uses that/who to introduce the identifying clause.'],
    ['What the study demonstrates ___ a gradual change.','is','are','be','Wh-cleft: what-clause functions as singular subject.'],
    ['It is the interaction ___ matters most.','that','what','where','That introduces the focused clause.'],
    ['What remains unclear ___ the cause of the decline.','is','are','does','Wh-clause is treated as singular.'],
    ['It was the timing ___ caused the difficulty.','that','what','when','It-cleft focuses timing.'],
    ['What the results show ___ that the effect is limited.','is','are','be','Wh-cleft with singular clause subject.'],
    ['It was not until the second test ___ the pattern became clear.','that','what','which','It was not until… that is a cleft emphasis pattern.']
  ],
  ellipsis:[
    ['I prefer the blue ___.','one','ones','it one','One substitutes for a singular countable noun.'],
    ['The first method is cheaper than the second ___.','is','does','has','The repeated adjective phrase can be omitted; the clause remains grammatical without an added auxiliary here.'],
    ['I agree with the proposal. — So ___ I.','do','am','have','So + auxiliary repeats the auxiliary from the original clause (agree → do).'],
    ['She has not finished, and neither ___ he.','has','does','is','Neither + auxiliary + subject mirrors the original auxiliary.'],
    ['The smaller samples were preferred to the larger ___.','ones','one','those one','Ones substitutes for plural countable noun.'],
    ['They promised to help and ___ so immediately.','did','made','were','Do so substitutes for the action; past auxiliary did.'],
    ['This explanation is clearer than the previous ___.','one','ones','it','One replaces a singular countable explanation.']
  ],
  inversion:[
    ['Never ___ such a result before.','have I seen','I have seen','did I saw','Negative adverbial at the beginning triggers auxiliary-subject inversion.'],
    ['Rarely ___ the equipment fail.','does','do','is','Equipment is singular; present simple inversion uses does + base form.'],
    ['Only after the test ___ the error become clear.','did','the team did','has did','Only + fronted adverbial triggers inversion in the main clause.'],
    ['Not only ___ the cost decrease, but accuracy also improved.','did','the cost did','was','Not only at the beginning triggers inversion.'],
    ['Hardly ___ the meeting started when the alarm rang.','had','the meeting had','did has','Hardly + past perfect inversion.'],
    ['Under no circumstances ___ the data be shared.','should','the data should','does','Negative/restrictive phrase at start triggers modal inversion.'],
    ['No sooner had the trial ended ___ the results were announced.','than','when','then','No sooner…than is the fixed correlative structure.']
  ],
  hedging:[
    ['The findings ___ indicate a possible trend.','may','must to','are definitely','May expresses possibility and appropriately hedges the claim.'],
    ['The evidence ___ that further research is needed.','suggests','proves certainly','is prove','Suggests presents a cautious interpretation.'],
    ['One ___ explanation is a change in sampling.','possible','possibly','possibility','Possible modifies the noun explanation.'],
    ['The pattern appears ___ consistent across groups.','to be','being to','be','Appear + to-infinitive.'],
    ['The results are ___ likely to reflect a sampling effect.','relatively','relative','relativity','Adverb modifies likely.'],
    ['This may ___ explain the difference.','partly','partial','part','Adverb modifies explain.'],
    ['The study provides ___ evidence of a link.','some','many','a few','Evidence is generally uncountable; some is appropriate.']
  ],
  nominalisation:[
    ['The ___ of the policy took several months.','implementation','implement','implementing of','The noun implementation is used as the head of the noun phrase.'],
    ['A detailed ___ of the data was conducted.','analysis','analyse','analytical','After a detailed, the noun analysis is required.'],
    ['The rapid ___ in costs affected the project.','increase','increasing','increased','A nominalisation functions as the head noun.'],
    ['The researchers decided to ___ the sample.','expand','expansion','expanding of','After to, use the base verb, not nominalisation.'],
    ['The report examines the ___ of the system.','reliability','reliably','rely','The noun reliability names a quality.'],
    ['Further ___ is required before publication.','evaluation','evaluate','evaluating to','Evaluation is a noun used as subject.'],
    ['The ___ of the method remains uncertain.','effectiveness','effective','effectively','Effectiveness is a nominal form.']
  ],
  punctuation:[
    ['The sample was small, ___ the pattern was consistent.','but','despite','because of','Comma + coordinating conjunction joins independent clauses.'],
    ['___ the study was limited, its findings were useful.','Although','Despite','Because of','Although introduces a finite clause.'],
    ['The method, ___ was developed recently, is efficient.','which','that','what','Supplementary relative clause is non-defining and uses which.'],
    ['The report was concise; ___, it covered all key points.','however','because','although','Conjunctive adverb can follow semicolon and a comma.'],
    ['Choose the punctuated non-defining clause.','The data, which were collected in May, were reviewed.','The data which were collected in May were reviewed.','The data, that were collected in May, were reviewed.','Non-defining relative clause is set off by commas and does not use that.'],
    ['The results were mixed, ___ more analysis was needed.','so','despite','although','So links the first clause to its result.'],
    ['Choose a grammatically complete sentence.','Because the sample was small, the conclusion was cautious.','Because the sample was small.','The sample was small, the conclusion was cautious.','The dependent clause needs a main clause; two independent clauses need correct joining.']
  ],
  cohesion:[
    ['The first method was faster. ___, it required more equipment.','However','Moreover','For example','The second statement contrasts with the first.'],
    ['The sample was limited; ___, the findings require caution.','therefore','nevertheless','in addition','Therefore introduces a consequence.'],
    ['The data were incomplete. This ___ the reliability of the conclusion.','reduced','those','which','This should refer clearly to the preceding fact; reduced is the appropriate verb.'],
    ['The revised model is more efficient. It also requires less time. Choose the best replacement for “It”.','The revised model','The data','The researchers','A pronoun/reference must point to the intended antecedent.'],
    ['The paper discusses two theories. The first explains motivation; the ___ focuses on social context.','second','other one of','another of','The paired reference first/second identifies the second theory.'],
    ['The explanation is plausible. ___, it is not supported by the current data.','Nevertheless','Therefore','For instance','Nevertheless signals contrast with the previous claim.'],
    ['The authors tested the method and ___ so under controlled conditions.','did','made','were','Do so substitutes for the action tested.']
  ],
  editing:[
    ['The results ___ a consistent pattern.','show','shows','is show','Plural subject results requires plural verb show.'],
    ['The study may ___ a limitation.','have','has','having','Modal may is followed by base form.'],
    ['The evidence suggests ___ the method again.','testing','to testing','test to','Suggest commonly takes an -ing complement.'],
    ['The findings, which ___ published recently, attracted attention.','were','was','has','Plural subject findings requires were in passive.'],
    ['If the team had checked the figures, it ___ the error.','would have found','will find','would found','Third conditional requires would have + V3.'],
    ['The report was concise; ___, it omitted important limitations.','however','therefore','moreover','Contrast is required between concision and omission.'],
    ['Choose the clearest academic sentence.','The findings suggest a possible link.','The findings definitely prove a link maybe.','The findings are perhaps certainly proving a link.','Use one calibrated hedge and a clear finite verb.']
  ]
};

function inferFamily(id, title) {
  if (FAMILY_BY_ID[id]) return FAMILY_BY_ID[id];
  const t = title.toLowerCase();
  if (/be\b|pronoun/.test(t)) return 'be';
  if (/noun|article|possessive|determiner/.test(t)) return 'nouns';
  if (/present simple|frequency/.test(t)) return 'present';
  if (/continuous/.test(t)) return 'continuous';
  if (/past/.test(t)) return 'past';
  if (/future/.test(t)) return 'future';
  if (/perfect/.test(t)) return 'perfect';
  if (/modal|modality/.test(t)) return 'modal';
  if (/compar/.test(t)) return 'comparison';
  if (/quantif/.test(t)) return 'quantifier';
  if (/adverb|modifier/.test(t)) return 'adverb';
  if (/question/.test(t)) return 'question';
  if (/relative/.test(t)) return 'relative';
  if (/conditional|wish/.test(t)) return 'conditional';
  if (/preposition/.test(t)) return 'preposition';
  if (/phrasal/.test(t)) return 'phrasal';
  if (/verb pattern|complementation/.test(t)) return 'verbPattern';
  if (/passive/.test(t)) return 'passive';
  if (/causative/.test(t)) return 'causative';
  if (/reporting|reported/.test(t)) return 'reporting';
  if (/participle|non-finite/.test(t)) return 'participle';
  if (/noun phrase|compound/.test(t)) return 'nounPhrase';
  if (/agreement/.test(t)) return 'agreement';
  if (/cleft|focus/.test(t)) return 'cleft';
  if (/ellipsis|substitution/.test(t)) return 'ellipsis';
  if (/inversion|fronting/.test(t)) return 'inversion';
  if (/hedging|stance/.test(t)) return 'hedging';
  if (/nominalisation/.test(t)) return 'nominalisation';
  if (/punctuation/.test(t)) return 'punctuation';
  if (/cohesion|reference/.test(t)) return 'cohesion';
  return 'editing';
}

Object.assign(FAMILY, {
  have: {
    label:'have / have got',
    core:'Have обозначает владение, характеристику, отношения и некоторые состояния. Have got часто используется для владения в разговорном BrE/международном английском. В других значениях have может быть обычным смысловым или вспомогательным глаголом.',
    form:'I/you/we/they have; he/she/it has. Have got: subject + have/has got. Вопросы/отрицания в Present Simple зависят от варианта и модели: Do you have…? / Have you got…?; don’t have / haven’t got.',
    selection:'Определи значение: possession/relationship/characteristic или activity/experience. Для possession возможны have и have got; для have breakfast/a meeting/a problem обычно используется have как смысловой глагол с do-support в вопросах.',
    contrast:'She has a car / She has got a car — владение. She is having lunch — действие/приём пищи, не possession. Have got обычно не используется для привычных повторяющихся действий и не имеет обычных форм Continuous в значении владения.',
    boundary:'Have got чаще встречается в разговорном английском и особенно в BrE; have как обычный глагол нейтрален и удобен для всех времён. Не путай have got для владения с Present Perfect have got = have obtained в контексте.',
    pronunciation:'Have и has часто редуцируются; got сохраняет ударение в have got. В коротких репликах различай I’ve got и I have.',
    traps:[['She have a new laptop.','She has a new laptop.','He/she/it требует has.'],['Do you have got a car?','Have you got a car? / Do you have a car?','Не смешивай две модели вопроса.'],['I am having two brothers.','I have two brothers.','В значении семейного отношения have обычно stative.']],
    examples:[['The laboratory has two entrances.','У лаборатории два входа.','have обозначает характеристику/наличие.'],['We have got enough time.','У нас достаточно времени.','have got для possession/availability.'],['Do you have any questions?','У вас есть вопросы?','have как основной глагол использует do-support.'],['She is having lunch at the moment.','Она сейчас обедает.','have в значении activity допускает Continuous.']],
    toefl:'Have используется для описания характеристик, ресурсов и опыта. Различай possession и activity, чтобы не строить stative forms в Continuous без основания.'
  },
  there: {
    label:'there is / there are',
    core:'There is/are вводит в сообщение новый объект или факт наличия/существования. В этой конструкции there — формальное подлежащее, а число согласуется с noun phrase, которое следует за be.',
    form:'There is + singular/uncountable noun; there are + plural noun. Past: there was/were; future: there will be. Questions/negatives строятся с be: Is there…? There aren’t…',
    selection:'Если сообщаешь, что что-то существует/находится где-то, используй there + be. Если предмет уже является темой предложения и ты описываешь его, используй обычное subject + be: The room is large.',
    contrast:'There is a book on the table — сообщаем о наличии книги. The book is on the table — говорим о конкретной уже известной книге. It is a book — идентифицируем предмет, а не вводим наличие.',
    boundary:'В формальном стандартном варианте there is/are согласуется с последующим noun phrase; в разговорной речи there’s иногда используется перед plural list, но для учебного письма используй there are.',
    pronunciation:'There’s часто сокращается; в беглой речи различай there is и their/they’re по контексту и произношению.',
    traps:[['There are a problem.','There is a problem.','Problem — singular noun.'],['There is many reasons.','There are many reasons.','Plural noun phrase требует are.'],['It is a new café near the station. (meaning “a café exists”)','There is a new café near the station.','Для представления нового объекта в контексте места используется there is.']],
    examples:[['There is a gap in the evidence.','В доказательствах есть пробел.','singular countable noun.'],['There are several possible explanations.','Есть несколько возможных объяснений.','plural noun.'],['There was little information available.','Доступно было мало информации.','past + uncountable noun.'],['There will be further tests next week.','На следующей неделе будут дополнительные тесты.','future existence.']],
    toefl:'There is/are помогает вводить новые факты и элементы описания в Email/Academic Discussion. Не путай existential there с указательным there «там».'
  }
});
set('have',['A1-07']);
set('there',['A1-08']);
set('nouns',['A1-04','A1-09','B2-11']);

DRILLS.have = [
  ['The department ___ enough equipment.','has','have','is have','Department — singular subject; have принимает форму has.'],
  ['___ you got a student card?','Have','Do','Are','В модели have got вопрос строится инверсией have перед subject.'],
  ['She ___ a meeting every Monday.','has','is having','have got','Регулярное занятие/расписание выражается have как основной глагол.'],
  ['We ___ lunch at the moment.','are having','have','has','Have lunch — activity, поэтому возможен Continuous.'],
  ['They ___ not got enough space.','have','do','are','Отрицание have got строится have not got.'],
  ['Does he ___ a driving licence?','have','has','having','После does используется base form have.'],
  ['I ___ two younger brothers.','have','am having','has got','Family relationship обычно выражается stative have.']
];
DRILLS.there = [
  ['___ a problem with the latest version.','There is','There are','It are','Problem — singular noun; there is introduces existence.'],
  ['___ several reasons for the delay.','There are','There is','It is','Plural noun several reasons требует are.'],
  ['There ___ little evidence to support the claim.','is','are','have','Evidence uncountable; singular be is used.'],
  ['___ any questions after the lecture?','Are there','Is there','Do there','Questions — plural; question form is are there.'],
  ['There ___ a meeting yesterday.','was','were','did','A meeting — singular; past form was.'],
  ['There will ___ two additional sessions.','be','is','are','After will use base form be.'],
  ['There ___ not enough time to repeat the test.','is','are','do','Time is uncountable; negative existential uses is not.']
];
DRILLS.imperative = [
  ['___ the instructions before starting.','Read','To read','Reads','Imperative uses the base verb with implied you.'],
  ['___ touch the hot surface.','Do not','Not to','Does not','Negative imperative uses do not + base form.'],
  ['Let’s ___ the results together.','review','to review','reviews','Let’s is followed by bare infinitive.'],
  ['Please ___ the form by Friday.','complete','completing','to complete','Polite imperative still uses base verb.'],
  ['Let’s not ___ the deadline.','miss','to miss','missing','Let’s not + base form.'],
  ['___ careful when handling the samples.','Be','Are','Being','Imperative of be is Be.'],
  ['Do ___ worry about the first draft.','not','no','doesn’t','Do not + base verb is the negative imperative.']
];
DRILLS.agreement = DRILLS.agreement || [
  ['The list of requirements ___ long.','is','are','have','Head noun list is singular.'],
  ['Each of the methods ___ a limitation.','has','have','are','Each requires singular agreement.'],
  ['A number of factors ___ the outcome.','affect','affects','is affect','A number of expresses several; plural agreement.'],
  ['The number of errors ___ decreased.','has','have','are','The number of is singular.'],
  ['The results of the analysis ___ consistent.','are','is','has','Head noun results is plural.'],
  ['Neither explanation ___ convincing.','is','are','have','Neither is singular in formal agreement.'],
  ['The quality of the measurements ___ high.','is','are','have','Head noun quality is singular.']
];
DRILLS.usedto = [
  ['I ___ live near the university, but I moved last year.','used to','am used to','get used to','Used to + base verb describes a past state/habit.'],
  ['She is used to ___ early.','working','work','worked','Be used to takes a noun or -ing form.'],
  ['They are getting used to ___ in a new city.','living','live','lived','Get used to describes adaptation; to is a preposition.'],
  ['He didn’t ___ coffee.','use to drink','used to drink','be used to drink','After didn’t use the base form use to.'],
  ['We are used to ___ with large datasets.','working','work','worked','Be used to + gerund.'],
  ['The process took time, but I got used to ___.','it','do it','to do it','Object pronoun can follow the preposition to.'],
  ['She ___ be shy when she was younger.','used to','is used to','gets used to','Past habit/state uses used to + base form.']
];
DRILLS.causative = DRILLS.causative || [
  ['We had the computer ___.','repaired','repair','to repair','Have something done: have + object + V3.'],
  ['The manager got the technician ___ the system.','to update','update','updating','Get + person + to-infinitive.'],
  ['She had the assistant ___ the data.','check','to check','checking','Have + person + bare infinitive.'],
  ['The service had the documents ___.','translated','translate','translating','Documents receive the action, so use V3.'],
  ['The situation seems ___.','serious','seriously','seriousness','Linking verb seem takes adjective complement.'],
  ['The patient got his eyes ___.','tested','test','testing','Get something done describes arranging a service.'],
  ['The soup tastes ___.','good','well','goodly','Taste as linking verb takes adjective.']
];
DRILLS.discourse = DRILLS.cohesion || [];
DRILLS.reporting = DRILLS.reporting || [];
DRILLS.nounPhrase = DRILLS.nounPhrase || [];
DRILLS.participle = DRILLS.participle || [];
DRILLS.clause = DRILLS.clause || [];
DRILLS.cleft = DRILLS.cleft || [];
DRILLS.ellipsis = DRILLS.ellipsis || [];
DRILLS.punctuation = DRILLS.punctuation || [];
DRILLS.nominalisation = DRILLS.nominalisation || [];
DRILLS.editing = DRILLS.editing || [];

const TOPIC_NOTES = {
  'A1-03':'Это прямое продолжение A1-02: сначала be + not, затем перестановка be перед subject и короткий ответ с повторением be. Не добавляй do к вопросам и отрицаниям с be.',
  'A1-04':'Сначала определи countability и число, затем выбирай a/an по начальному звуку, а не по букве. Множественное число имеет регулярные spelling patterns и исключения.',
  'A1-06':'Разведи do-support и смысловой глагол: does/did несёт время и согласование, после него смысловой глагол остаётся в base form.',
  'A1-07':'Сопоставь have как possession/relationship и have как activity. Have got — вариант для владения; have breakfast/a meeting — обычный смысловой глагол.',
  'A1-08':'There is/are вводит новый объект или факт наличия; it is описывает или идентифицирует уже известный объект. Согласование зависит от noun phrase после be.',
  'A1-09':'Различай possessive determiners (my, your) и possessive pronouns (mine, yours); demonstratives меняются по числу и дистанции.',
  'A1-10':'Countability влияет на число и выбор quantifier. Одна лексема может менять исчисляемость в зависимости от значения; учи слово в контексте.',
  'A1-11':'Сопоставь adjective как характеристику существительного/подлежащего и adverb как характеристику действия/признака. Проверь формы без -ly и пары hard/hardly.',
  'A1-12':'Покажи позицию frequency adverbs с обычными глаголами, be и вспомогательными глаголами. Only/always/never могут менять фокус в зависимости от позиции.',
  'A1-13':'Включи образование am/is/are + V-ing, spelling -ing и значения действия сейчас/временной ситуации вокруг настоящего.',
  'A1-14':'Главный контраст — привычка/состояние против процесса/временной ситуации. Разбери stative verbs и случаи, когда глагол меняет значение в Continuous.',
  'A1-15':'Раздели способность, разрешение, просьбу и возможность; после can/can’t используется bare infinitive. Сопоставь can и be able to только в пределах необходимого A1 scope.',
  'A1-16':'Покажи implied you, positive/negative imperatives, be-commands и let’s/let’s not. Обсуди, как please и интонация меняют прагматический тон.',
  'A1-17':'На A1 сосредоточься на добавлении, контрасте, выборе и причине: and/but/or/because. Не перегружай урок терминологией сложных придаточных.',
  'A1-18':'Учи at/on/in и базовые выражения места/движения как целые chunks. Не обещай дословного соответствия русским предлогам.',
  'A1-19':'Это вводный Past Simple: was/were и частотные глаголы в утвердительных сообщениях. Полный набор regular/irregular forms, did questions и negatives — A2-01.',
  'A2-01':'Полный Past Simple: regular/irregular V2, spelling и произношение -ed, did questions и didn’t negatives. После did всегда base form.',
  'A2-02':'Past Continuous показывает процесс в определённый момент прошлого; согласуй was/were с подлежащим и отличай процесс от факта.',
  'A2-03':'Сопоставь background/process в Past Continuous и completed event в Past Simple. When/while помогают, но не заменяют анализ временных отношений.',
  'A2-04':'Сопоставь will, going to, Present Continuous и Present Simple schedules по намерению, признакам прогноза, договорённости и расписанию.',
  'A2-05':'Фокус на опыте и результате Present Perfect: ever/never/just/already/yet и связь с настоящим. Не ставь конкретный завершённый past-time marker.',
  'A2-06':'Выбор между Present Perfect и Past Simple зависит от точки отсчёта и связи с настоящим, а не только от отдельного временного наречия.',
  'A2-07':'Различай обязанность, совет, разрешение и возможность. Особенно важно mustn’t (запрет) против don’t have to (нет необходимости).',
  'A2-08':'Сравнительная степень: -er/more, than, spelling, irregular forms и as…as. Не смешивай comparative и superlative.',
  'A2-09':'Superlative выделяет объект внутри группы; отработай the + -est/most и one of the + superlative + plural noun.',
  'A2-10':'Систематизируй quantifiers по countability, числу и смыслу: small amount, none, whole, both/either/neither.',
  'A2-11':'Разбери manner/time/degree/sequence adverbs и позицию наречий; проверь adjective/adverb, too/enough и частотные исключения.',
  'A2-12':'Не своди gerund/infinitive к правилу «после этого глагола всегда -ing». Учи частотные verb patterns и контекст выбора.',
  'A2-13':'Разведи yes/no, wh-, subject и object questions. Во встроенных вопросах после вводной фразы используй statement word order.',
  'A2-14':'Defining relative clauses дают необходимую информацию для идентификации. Object relative pronoun иногда опускается; subject pronoun — нет.',
  'A2-15':'Сопоставь zero conditional (general truth) и first conditional (реальная будущая возможность). Will обычно не ставится в if-clause.',
  'A2-16':'Разведи time clauses, reason, purpose и result. Проверь, вводит ли связка clause, noun phrase или infinitive.',
  'A2-17':'Свяжи предлоги времени/места/движения с устойчивыми сочетаниями adjective/verb + preposition; учи их как chunks.',
  'A2-18':'Phrasal verbs: значение particle, transitivity, separability и место object pronoun. Не учи только перевод глагола.',
  'B1-01':'Present Perfect Continuous выделяет длительность/недавнюю активность; сравни с Perfect Simple по фокусу на процессе и результате.',
  'B1-02':'Past Perfect Simple обозначает более раннее прошлое относительно прошлого ориентира. Не используй его механически при каждом рассказе о двух событиях.',
  'B1-03':'Past Perfect Continuous выделяет длительность до прошлого момента; сравни с Past Perfect Simple и учти stative verbs.',
  'B1-04':'Собери будущие формы в систему, добавив future continuous/perfect и future-in-the-past. Покажи by vs until и perspective from past.',
  'B1-05':'Second Conditional выражает гипотетическую ситуацию настоящего/будущего; форма past здесь маркирует дистанцированность, а не обычное прошлое.',
  'B1-06':'Third Conditional моделирует контрфактическое прошлое. Разбери would/could/might have + V3 и причинно-следственный смысл.',
  'B1-07':'Освой passive в основных временах, выбор агента и информационный фокус. Не образуй обычный passive от непереходных глаголов.',
  'B1-08':'Различай have/get something done, have someone do и get someone to do: кто организует действие, кто выполняет, что является объектом.',
  'B1-09':'Систематизируй степень обязанности, необходимости, совета и вероятности. Разделяй семантическую силу и грамматическую форму.',
  'B1-10':'Различай вывод о настоящем (must/might/can’t + base) и прошлом (modal + have + V3); объясняй степень уверенности.',
  'B1-11':'Reported statements: backshift, pronoun/time reference, say/tell и reporting perspective. Backshift — тенденция, не автоматическое правило.',
  'B1-12':'Reported questions, requests and commands: statement word order, if/whether, ask/tell/order + object + to-infinitive.',
  'B1-13':'Verb patterns и meaning changes: remember/forget, stop, try, regret, go on, need. Форма дополнения иногда меняет значение.',
  'B1-14':'Non-defining relative clauses добавляют supplementary information; commas обязательны, that обычно не используется.',
  'B1-15':'Сравни used to do, be used to doing и get used to doing. Отдельно объясни, когда would описывает повторяющиеся действия в прошлом.',
  'B1-16':'Свяжи question tags, auxiliaries и indirect questions; учитывай полярность, особые случаи и прагматическую интонацию.',
  'B1-17':'Различай reason, purpose, result и contrast clauses: because/because of, although/despite, so/so that.',
  'B1-18':'Discourse markers должны отражать настоящую логическую связь: sequence, addition, contrast, example, consequence и conclusion.',
  'B1-19':'Расширяй noun phrases и учи agreement по head noun; различай premodifiers/postmodifiers, determiners и compound nouns.',
  'B1-20':'Сопоставь phrasal verbs и dependent prepositions; обращай внимание на separability, pronoun placement и регистр.',
  'B1-21':'Введение в participle clauses/reduced relatives: активное -ing, пассивное -ed и совпадение логического субъекта.',
  'B1-22':'Усложни comparison: comparative clauses, modifiers (far/much/slightly), the… the… и as…as.',
  'B2-01':'Сопоставь mixed conditionals и wish/if only, не смешивая временные значения: прошлое условие может определять настоящий результат.',
  'B2-02':'Различай unless, provided/providing, as long as, in case и even if по логике условия и семантическим ограничениям.',
  'B2-03':'Продвинутая модальность: certainty, deduction, criticism, obligation и modal perfect. Сила формы должна соответствовать evidence.',
  'B2-04':'Modal passive и reporting/impersonal passive: modal + be + V3; it is said/believed that; subject + is said to.',
  'B2-05':'Reporting verbs и модели that/to/-ing; сопоставь claim, admit, deny, suggest, recommend, warn и их управление.',
  'B2-06':'Различай causative have/get, linking verbs и complex complements; один глагол может иметь разные модели/значения.',
  'B2-07':'Систематизируй complex relatives, preposition + relative pronoun и participle clauses; контролируй reference и punctuation.',
  'B2-08':'Non-finite clauses: to-infinitive, -ing/-ed, reduced clauses; контролируй субъект, временные отношения и dangling modifiers.',
  'B2-09':'Complex noun phrases: premodifiers, postmodifiers, compound nouns и порядок информации; сохраняй ясное head noun.',
  'B2-10':'Subject–verb agreement в сложных структурах: найди head noun, игнорируя отвлекающие of-phrases и relative clauses.',
  'B2-11':'Articles/reference: generic vs specific, abstract reference, zero article и связь с контекстом/discourse.',
  'B2-12':'Advanced quantifiers/determiners: all/whole, few/little, either/neither, no/none, not all/not every; согласование и оттенки значения.',
  'B2-13':'Adverb position, focus and viewpoint: stance/comment adverbs, scope и degree modifiers; позиция может менять интерпретацию.',
  'B2-14':'Сопоставь concession/contrast: although, even though, despite, whereas, while, nevertheless; clause vs phrase.',
  'B2-15':'It-clefts и wh-clefts выдвигают фокус; используй их, когда контраст/информационная структура действительно этого требует.',
  'B2-16':'Ellipsis/substitution/reference уменьшают повторы; контролируй antecedent, число, parallelism и recoverability.',
  'B2-17':'Fronting/inversion — средства фокуса и формального регистра; отличай topicalisation от обязательной negative inversion.',
  'B2-18':'Hedging and stance: may/might, appear/seem, suggest, likely, possible; калибруй утверждение по доказательствам.',
  'B2-19':'Complex prepositions и dependent patterns: устойчивые фразы, управление и семантические различия.',
  'B2-20':'Nominalisation: action/quality → noun phrase; сопоставляй компактный nominal style и ясный verbal style.',
  'B2-21':'Пунктуация complex sentences: comma splice, semicolon, relative clauses, introductory clauses и границы independent/dependent clauses.',
  'C1-01':'Negative inversion с never, hardly, no sooner, not only, under no circumstances; контролируй auxiliary и порядок.',
  'C1-02':'Inverted/ellipted conditionals: Had/Were/Should + subject; формальный регистр и точный временной смысл.',
  'C1-03':'Advanced clefts, fronting and emphasis; различай it-cleft, wh-cleft, topicalisation и emphatic do.',
  'C1-04':'Perfect/passive participle clauses, dangling modifiers и контроль логического субъекта/временной перспективы.',
  'C1-05':'Nominalisation и abstract noun phrases: плотность, управляемость, article choice, pre/postmodification и читаемость.',
  'C1-06':'Complex noun phrases и complex prepositions; точный порядок premodifiers/postmodifiers и управление предлогами.',
  'C1-07':'Advanced passive, impersonal and causative structures; нейтральный академический фокус, агент и reporting patterns.',
  'C1-08':'Academic reporting/citation language: reporting verbs, tense shifts, stance и точное представление позиции источника.',
  'C1-09':'Nuanced modality/hedging: вероятность, обязательство, критика, оценка и уверенность; сила формы соответствует evidence.',
  'C1-10':'Advanced concession и correlative structures; not only…but also, neither…nor, as…as, inversion и parallelism.',
  'C1-11':'Textual reference/cohesion: pronoun chains, demonstratives, substitution, ellipsis и однозначный antecedent.',
  'C1-12':'Advanced verb complementation: complex object/complement patterns, verbs of senses и различия значения.',
  'C1-13':'Advanced adverbial phrases, stance/degree/viewpoint и emphasis; контролируй scope и register.',
  'C1-14':'Синтез: редактируй связный академический текст на уровне грамматики, reference, register, cohesion и punctuation.'
};
function ensureFamilyDrills() {
  for (const [key, family] of Object.entries(FAMILY)) {
    if (Array.isArray(DRILLS[key]) && DRILLS[key].length) continue;
    const generated = [];
    (family.traps || []).forEach(([bad, good, why], index) => {
      const other = family.traps[(index + 1) % family.traps.length]?.[1] || family.examples[0][0];
      generated.push(['Выбери исправленный вариант: ' + bad, good, bad, other, why]);
    });
    (family.examples || []).forEach(([sentence, translation, why], index) => {
      const other = family.examples[(index + 1) % family.examples.length]?.[0] || sentence + ' (alternative)';
      generated.push(['Выбери пример, который правильно иллюстрирует правило: ' + family.label + '. ' + why, sentence, other, 'The sentence uses a different grammatical pattern.', why]);
    });
    DRILLS[key] = generated;
  }
  DRILLS.nounPhrase = DRILLS.agreement;
  DRILLS.discourse = DRILLS.cohesion;
}
function parseCEFR(id) { return id.split('-')[0]; }
function itemIdFor(group, index) {
  const prefix = {'Входная диагностика':'D','Управляемая практика':'G','Самостоятельная практика':'I','Выходная проверка':'E'}[group];
  return prefix + (index + 1);
}
function sourceRefsFor(topic) {
  const normalized = topic.sources.replaceAll('\u2013','-').replaceAll('\u2014','-');
  const refs = [];
  const chunks = normalized.split(';').map(clean).filter(Boolean);
  for (const chunk of chunks) {
    const match = /^((?:GR|EXT)-[0-9]{2})(?:\s+(.+))?$/.exec(chunk);
    if (!match) continue;
    const source = match[1];
    const detail = clean(match[2] || '');
    if (!detail) {
      refs.push(source);
      continue;
    }
    if (detail.startsWith('U')) {
      const list = detail.slice(1).split(',').map(clean).filter(Boolean);
      for (const token of list) {
        const range = /^([0-9]+)(?:-([0-9]+))?$/.exec(token);
        if (range) refs.push(source + ' U' + range[1] + (range[2] ? '-' + range[2] : ''));
      }
      continue;
    }
    // CEFR/corpus descriptors such as A1, A1-A2 or B2-C1.
    refs.push(source + ' ' + detail);
  }
  return [...new Set(refs)];
}
function sourcePageNavigation(ref) {
  const normalized = ref.replaceAll('\u2013','-').replaceAll('\u2014','-').trim();
  const parts = normalized.split(/\s+/);
  if (parts.length === 3 && parts[0] === 'GR-05' && /^P[0-9]+(?:-[0-9]+)?$/i.test(parts[2])) {
    const level = parts[1].toUpperCase();
    const levelIndex = JSON.parse(fs.readFileSync(path.join(root,'materials','source','EGP-PAGES.json'),'utf8'));
    if (!levelIndex[level]) return null;
    const pages = parts[2].slice(1).split('-').map(Number);
    const first = pages[0], last = pages.length > 1 ? pages[1] : pages[0];
    if (!Number.isInteger(first) || !Number.isInteger(last) || first < 1 || last > levelIndex[level].pages) return null;
    return 'PDF pages ' + first + (last !== first ? '-' + last : '') + ' (' + level + ' Grammar Requirements; corpus-based learner evidence)';
  }
  if (parts.length !== 2 || !['GR-01','GR-02','GR-03'].includes(parts[0]) || parts[1][0] !== 'U') return null;
  const range = parts[1].slice(1).split('-').map(Number);
  const first = range[0], last = range.length > 1 ? range[1] : range[0];
  if (!Number.isInteger(first) || !Number.isInteger(last)) return null;
  if (parts[0] === 'GR-01') {
    const startPage = 11 + 2 * first;
    const endPage = 11 + 2 * last + 1;
    return 'PDF pages ' + startPage + '-' + endPage + ' (Unit ' + first + (last !== first ? '-' + last : '') + ')';
  }
  if (parts[0] === 'GR-02') {
    const index = JSON.parse(fs.readFileSync(path.join(root,'materials','source','UNIT-PAGE-INDEX.json'),'utf8'));
    const units = new Map(index['GR-02'].units.map(unit => [unit.unit, unit]));
    const start = units.get(first), end = units.get(last);
    if (!start || !end) return null;
    return 'PDF pages ' + start.pdf_start + '-' + end.pdf_end + ' (Unit ' + first + (last !== first ? '-' + last : '') + ')';
  }
  const startPage = 24 + 2 * first;
  const endPage = 24 + 2 * last + 1;
  return 'PDF pages ' + startPage + '-' + endPage + ' (Unit ' + first + (last !== first ? '-' + last : '') + ')';
}
function makeOptionItem(q, group, itemId, family, extraDistractor) {
  const options = [];
  for (const option of [q.answer, q.wrong1, q.wrong2 || extraDistractor]) {
    if (option && !options.includes(String(option))) options.push(String(option));
  }
  for (const fallback of DRILLS[family]) {
    for (const option of [fallback[2], fallback[3]]) {
      if (options.length >= 3) break;
      if (option && !options.includes(String(option)) && option !== q.answer) options.push(String(option));
    }
    if (options.length >= 3) break;
  }
  if (options.length < 3) {
    for (const option of ['a different grammatical form','a form from another context','an unrelated construction']) {
      if (!options.includes(option)) options.push(option);
    }
  }
  const rationaleMap = {...(q.distractorRationales || {})};
  const wrongOptions = options.filter(option => option !== String(q.answer));
  if (wrongOptions[0] && !rationaleMap[wrongOptions[0]]) {
    rationaleMap[wrongOptions[0]] = q.wrong1Why || q.distractorWhy ||
      ('The option "' + wrongOptions[0] + '" does not follow the target structure: ' + q.why);
  }
  if (wrongOptions[1] && !rationaleMap[wrongOptions[1]]) {
    rationaleMap[wrongOptions[1]] = q.wrong2Why ||
      ('The option "' + wrongOptions[1] + '" is not appropriate in this context: ' + q.why);
  }
  return {
    id:itemId, group, prompt:q.prompt, options:options.slice(0,3), answer:String(q.answer),
    accepted:[String(q.answer)], why:q.why,
    distractorWhy:rationaleMap[wrongOptions[0]] || ('This option does not fit the target structure: ' + q.why),
    distractorRationales:rationaleMap,
    skillTarget:q.skillTarget || FAMILY[family]?.skillTarget || family,
    interactionType:'single-choice',
    difficulty:q.difficulty || 'controlled',
    sourceBasis:q.sourceBasis || 'Speakbase-authored example; exact source-page verification pending',
    contentVersion:'1.0-draft'
  };
}
function synthQuestions(family, topic, count) {
  const drills = DRILLS[family];
  const expanded = [];
  const skillTarget = FAMILY[family]?.skillTarget || family;
  drills.forEach((d) => {
    const [prompt, answer, wrong1, wrong2, why, wrong1Why, wrong2Why] = d;
    const sourceBasis = 'Speakbase-authored topic drill for ' + topic.id + '; editorial review pending';
    const base = {
      prompt,answer,wrong1,wrong2,why,skillTarget,sourceBasis,
      wrong1Why:wrong1Why || ('The option "'+wrong1+'" does not follow the target rule: '+why),
      wrong2Why:wrong2Why || ('The option "'+wrong2+'" fails a different part of the grammatical pattern: '+why)
    };
    expanded.push(base);
    const reasonWrong1 = 'The form is chosen only by translating the sentence word for word.';
    const reasonWrong2 = 'All forms with a similar translation can be used in the same structure.';
    expanded.push({
      prompt:'Choose the explanation that best describes this sentence: ' + prompt.replace('___', answer),
      answer:why,
      wrong1:reasonWrong1,
      wrong2:reasonWrong2,
      why:'The key grammatical point is: ' + why,
      distractorRationales:{
        [reasonWrong1]:'Translation alone does not explain the grammatical choice; the English structure and context must also be considered.',
        [reasonWrong2]:'Similar translations do not make forms interchangeable; the target structure and meaning determine the choice.'
      },
      skillTarget,sourceBasis:'Speakbase-authored reasoning check for '+topic.id+'; editorial review pending'
    });
    const editPrompt = prompt.includes('___')
      ? 'Correct the sentence: ' + prompt.replace('___', wrong1)
      : 'Select the grammatically correct version for this context: ' + prompt;
    expanded.push({
      prompt:editPrompt,
      answer:prompt.includes('___') ? prompt.replace('___', answer) : answer,
      wrong1:prompt.includes('___') ? prompt.replace('___', wrong2) : wrong1,
      wrong2:prompt.includes('___') ? prompt.replace('___', wrong1) : wrong2,
      why:'The correction follows this rule: ' + why,
      wrong1Why:wrong2Why || ('The option "'+wrong2+'" does not fit: '+why),
      wrong2Why:wrong1Why || ('The option "'+wrong1+'" does not fit: '+why),
      skillTarget,sourceBasis:'Speakbase-authored editing item for '+topic.id+'; editorial review pending'
    });
    const conceptWrong1 = 'The form is chosen only by translating the sentence word for word.';
    const conceptWrong2 = 'All forms with a similar translation can be used in the same structure.';
    expanded.push({
      prompt:'Which rule best explains the choice of "'+answer+'" in this sentence: '+prompt+'?',
      answer:why,
      wrong1:conceptWrong1,
      wrong2:conceptWrong2,
      why:'Rule check: ' + why,
      distractorRationales:{
        [conceptWrong1]:'Word-for-word translation does not account for English syntax, agreement or verb complementation.',
        [conceptWrong2]:'Forms with similar translations may have different grammatical roles and cannot automatically be interchanged.'
      },
      skillTarget,sourceBasis:'Speakbase-authored concept check for '+topic.id+'; editorial review pending'
    });
  });
  const result = [];
  for (let i=0; result.length<count; i++) {
    const q = expanded[i % expanded.length];
    result.push({...q, id:'S'+(i+1)});
  }
  return result;
}
function mappedQuestions(topic, migration, legacy, allTopics, family, count) {
  const map = migration.get(topic.id);
  if (!map || !map.legacyIds.length) return [];
  const selected = [];
  for (const legacyId of map.legacyIds) {
    const bank = legacy.grammarPractice[legacyId] || [];
    const related = allTopics.filter(t => migration.get(t.id)?.legacyIds.includes(legacyId));
    const position = related.findIndex(t => t.id === topic.id);
    const chunkSize = Math.ceil(bank.length / Math.max(1, related.length));
    const chunk = related.length > 1
      ? bank.slice(position * chunkSize, Math.min(bank.length, (position + 1) * chunkSize))
      : bank;
    for (const row of chunk) {
      if (!Array.isArray(row) || row.length < 3) continue;
      const rationale = FAMILY[family].core + ' В данном контексте ключ — "' + row[1] + '"; вариант "' + row[2] + '" нарушает целевую модель.';
      selected.push({
        prompt:String(row[0]), answer:String(row[1]), wrong1:String(row[2]),
        wrong2:null, why:rationale,
        distractorWhy:'Вариант "' + row[2] + '" не подходит: ' + rationale,
        skillTarget:family,
        sourceBasis:'Legacy practice bank topic ' + (legacyId + 1) + '; retained as draft material for ' + topic.id + '; key requires editorial review'
      });
    }
  }
  const seen = new Set();
  return selected.filter(q => {
    const key = clean(q.prompt).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).slice(0,count);
}
function buildPractice(topic, family, migration, legacy, allTopics) {
  const required = [
    ['Входная диагностика',4],['Управляемая практика',6],
    ['Самостоятельная практика',9],['Выходная проверка',5]
  ];
  const topicBank = TOPIC_BANKS[topic.id];
  const mapped = topicBank ? [] : mappedQuestions(topic,migration,legacy,allTopics,family,16);
  const synthetic = synthQuestions(family,topic,24);
  const unique = [];
  const seen = new Set();
  for (const question of [...mapped,...synthetic]) {
    const key = clean(question.prompt).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(question);
    if (unique.length === 24) break;
  }
  if (unique.length !== 24) throw new Error(topic.id+': unable to build 24 unique practice prompts');
  const questions = unique;
  const items = [];
  let offset = 0;
  for (const [group, size] of required) {
    for (let i=0; i<size; i++) {
      const q = questions[offset] || synthetic[(offset - mapped.length + synthetic.length) % synthetic.length];
      const item = makeOptionItem(q,group,itemIdFor(group,i),family);
      item.prompt = q.prompt;
      items.push(item);
      offset++;
    }
  }
  items.push({
    id:'W1', group:'Самостоятельное применение',
    prompt:'Напиши 4–6 собственных предложений, используя тему "' + topic.title + '". Примени конструкцию минимум в двух разных контекстах; одно предложение должно содержать объяснение, сравнение или дополнительную информацию. Не копируй примеры из конспекта.',
    open:true,
    rubric:[
      'Ответ содержит 4–6 законченных и релевантных предложений.',
      'Целевая конструкция используется в подходящих контекстах, а не механически.',
      'Формы согласованы с подлежащим, временем, значением и регистром.',
      'Использовано не менее двух различных лексических/смысловых контекстов.',
      'Нет повторяющейся ошибки, меняющей значение целевой конструкции.',
      'Порядок слов, связность и пунктуация позволяют однозначно понять мысль.'
    ],
    skillTarget:'Самостоятельное применение ' + family,
    interactionType:'open-production',
    difficulty:'transfer',
    sourceBasis:'Speakbase-authored open production; self-review rubric only until real AI feedback is connected',
    contentVersion:'1.0-draft'
  });
  return items;
}
function buildMarkdown(topic,family,migration,prerequisites) {
  const f=FAMILY[family], migrationInfo=migration.get(topic.id) || {coverage:'Нет',legacyText:'—'};
  const note=TOPIC_NOTES[topic.id] || ('В рамках этого блока изучается тема "'+topic.title+'": '+topic.outcome);
  const sources=sourceRefsFor(topic);
  const sourceRows=(sources.length?sources:['Source reference pending']).map(ref => {
    const page = sourcePageNavigation(ref);
    const navigation = page || (ref.startsWith('GR-01')
      ? 'Unit reference mapped; exact PDF pages need individual inspection.'
      : 'Consult the source register and level/topic section; exact page locator pending.');
    const status = page ? 'unit-page indexed; content review pending' : 'unit mapped; exact page review pending';
    return '| '+ref+' | '+navigation+' | Compare the rule, examples, restrictions and exercises against this lesson | '+status+' |';
  }).join('\n');
  const bt=String.fromCharCode(96);
  const topicConfig=TOPIC_BANKS[topic.id];
  const topicDrills=topicConfig?.drills || DRILLS[family];
  const authoredExamples=topicConfig?.profile?.examples?.length ? topicConfig.profile.examples : null;
  const authoredTraps=topicConfig?.profile?.traps?.length ? topicConfig.profile.traps : null;
  const examples=(authoredExamples || topicDrills.slice(0,4).map(x=>[x[0].replace(/___/g,x[1]),'Translation not yet verified; lesson remains a draft.',x[4] || topicConfig?.profile?.core || topic.title]))
    .map(x=>'| '+bt+x[0]+bt+' | '+x[1]+' | '+(x[2] || topicConfig?.profile?.core || topic.title)+' |').join('\n');
  const traps=(authoredTraps || topicDrills.slice(0,3).map(x=>[x[0].replace(/___/g,x[2]),x[0].replace(/___/g,x[1]),x[5] || x[4]]))
    .map(x=>'| '+bt+x[0]+bt+' | '+bt+x[1]+bt+' | '+x[2]+' |').join('\n');
  const pronunciation=topicConfig?.profile?.pronunciation || ('Topic-specific pronunciation practice for '+topic.title+': focus on weak forms, endings and sentence stress. Phonetic examples still require dictionary-audio verification.');
  const toeflTransfer=topicConfig?.profile?.toefl || ('TOEFL transfer for '+topic.title+': use the target structure to interpret syntax in Reading/Listening and construct clear sentences in Writing/Speaking. This is skill transfer, not a separate exam task.');
  const prereq=prerequisites.get(topic.id) || [];
  const familyDrill=topicDrills.slice(0,3).map((x,i)=>'- '+x[0]+' ? '+bt+x[1]+bt+'. '+x[3]).join('\n');
  return [
    '# Speakbase — '+topic.id+': '+topic.title,
    '',
    '**Curriculum ID:** '+bt+topic.id+bt+'  ',
    '**Уровень:** '+parseCEFR(topic.id)+'  ',
    '**Версия:** 1.0-draft  ',
    '**Статус:** drafted; exact source-page verification, editorial key review and learner test are pending  ',
    '**Предварительные темы:** '+(prereq.join(', ') || 'нет')+'  ',
    '**Связь со старым каталогом:** '+migrationInfo.coverage+' — '+migrationInfo.legacyText,
    '',
    '## 1. Результаты обучения',
    '',
    '- '+topic.outcome,
    '- Выбирать целевую форму по значению, структуре предложения и контексту.',
    '- Объяснять, почему близкая грамматическая форма меняет смысл или регистр.',
    '- Находить и исправлять типичные ошибки русскоязычных студентов.',
    '',
    '## 2. Источники и статус сверки',
    '',
    '| Source | PDF navigation | Lesson-specific checks | Status |',
    '|---|---|---|---|',
    sourceRows,
    '',
    'Unit/page locations are navigation aids only. They do not prove that the cited explanation, examples, restrictions and answer key have been checked for this lesson. Examples and explanations below are Speakbase-authored, not quotations from the textbook.',
    '',
    'Перед переводом этого урока в source-verified необходимо открыть целевые страницы конкретного издания, записать печатную и PDF-пагинацию, сверить ограничения и исключения. Для GR-03 со сканированными страницами обязательна визуальная проверка.',
    '',
    '## 3. Место темы и границы',
    '',
    note,
    '',
    'Старый каталог содержит: '+migrationInfo.legacyText+'. Его статус — '+migrationInfo.coverage+'. Старые отметки завершения не переносятся автоматически на новый постоянный ID. Тема рассматривается в уровне '+parseCEFR(topic.id)+' и не заменяет обязательные prerequisites.',
    '',
    '## 4. Полный конспект',
    '',
    '### 4.1. Основная идея и функция конструкции',
    '',
    f.core,
    '',
    'Тема этого блока — **'+topic.title+'**. Измеримая цель: '+topic.outcome,
    '',
    '### 4.2. Формирование и грамматическая модель',
    '',
    f.form,
    '',
    'Разбивай длинную конструкцию на части: subject, auxiliary/main verb, object/complement и обстоятельственные элементы. Не учи формулу без понимания роли каждой части. Если форма зависит от времени, числа, лица или регистра, фиксируй это явно.',
    '',
    '### 4.3. Как выбрать подходящую форму',
    '',
    f.selection,
    '',
    'Алгоритм выбора:',
    '1. Определи, какую мысль нужно передать: факт, процесс, результат, условие, оценку, отношение или информационный фокус.',
    '2. Найди грамматическое ядро предложения и нужные дополнения.',
    '3. Определи временную перспективу, число/лицо и регистр.',
    '4. Выбери модель, которая выражает смысл без искусственного усложнения.',
    '5. Проверь согласование, порядок слов и допустимую форму после вспомогательного глагола/предлога.',
    '',
    '### 4.4. Сравнение с близкими конструкциями',
    '',
    f.contrast,
    '',
    '| Что проверяем | Вопрос для выбора |',
    '|---|---|',
    '| Форма | Какие элементы обязательны и в каком порядке они стоят? |',
    '| Значение | Что именно меняется: время, длительность, реальность, степень уверенности или фокус? |',
    '| Контекст | Что уже известно собеседнику и каков регистр высказывания? |',
    '| Проверка | Если заменить форму близкой конструкцией, изменится ли смысл? Объясни, почему. |',
    '',
    '### 4.5. Примеры с переводом и объяснением',
    '',
    '| English | Перевод | Почему это подходит |',
    '|---|---|---|---|',
    examples,
    '',
    'Примеры составлены Speakbase. Они иллюстрируют грамматическую функцию, но не подменяют индивидуальную проверку всех возможных вариантов и исключений.',
    '',
    '### 4.6. Исключения, ограничения и границы употребления',
    '',
    f.boundary,
    '',
    'Не превращай наблюдение в абсолютное правило, если существуют варианты BrE/AmE, различия регистра или контекстные значения. В спорных случаях фиксируй конкретную норму и источник.',
    '',
    '### 4.7. Типичные ошибки русскоязычных студентов',
    '',
    traps,
    '',
    'Русский перевод помогает понять смысл, но не управляет английской формой напрямую. Проверяй роль каждого элемента и грамматическую модель английского предложения.',
    '',
    '### 4.8. Произношение и восприятие на слух',
    '',
    pronunciation,
    '',
    'Для аудирования распознавай слабые формы вспомогательных глаголов, окончания и границы смысловых групп. Не ориентируйся только на чтение по буквам.',
    '',
    '### 4.9. Академический английский и TOEFL-перенос',
    '',
    toeflTransfer,
    '',
    '- **Reading:** синтаксические связи, reference, modifiers и логические отношения.',
    '- **Listening:** tense/aspect, weak forms, modality, speaker stance и связи между идеями.',
    '- **Writing — Build a Sentence:** точность структуры, согласование, порядок слов и verb patterns.',
    '- **Writing — Email / Academic Discussion:** ясность, appropriate register, аргументация и cohesion.',
    '- **Speaking — Listen and Repeat / Take an Interview:** точность воспроизведения формы и самостоятельное применение.',
    '',
    'Это перенос навыка, а не полноценный экзаменационный пробник и не обещание конкретного балла.',
    '',
    '### 4.10. Примеры для управляемого разбора',
    '',
    familyDrill,
    '',
    'Для каждого примера назови целевой элемент, объясни форму, укажи, почему отвлекающий вариант неверен, и придумай собственное предложение с тем же правилом.',
    '',
    '### 4.11. Самопроверка',
    '',
    'Перед отправкой ответа проверь:',
    '1. Правильно ли определена функция конструкции?',
    '2. Согласована ли форма с подлежащим и временной перспективой?',
    '3. Не перенесён ли русский порядок слов напрямую?',
    '4. Не смешаны ли две похожие модели?',
    '5. Не сильнее ли утверждение, чем позволяют контекст и доказательства?',
    '',
    '### 4.12. Краткая памятка',
    '',
    '- **Фокус:** '+topic.title+'.',
    '- **Базовая модель:** '+f.form,
    '- **Ключ выбора:** '+f.selection,
    '- **Ограничение:** '+f.boundary,
    '- При редактировании выбирай наиболее ясную и точную форму, а не самую сложную.',
    '',
    '## 5. Практика',
    '',
    'В приложении практика разделена на входную диагностику, управляемые задания, самостоятельную практику и новую выходную проверку. Закрытые ответы получают rationale и разбор ошибки. Свободный текст сохраняется и оценивается по рубрике; до подключения и реальной проверки AI-движка система не выдаёт его за автоматическую AI-оценку.',
    '',
    '## 6. Интервальное повторение',
    '',
    'Повторяй не весь урок автоматически, а конкретную ошибку: выбор формы, согласование, word order, значение, регистр или пунктуацию. Новая попытка должна менять лексический контекст и формулировку, чтобы проверять перенос, а не запоминание одной строки.',
    '',
    '## 7. Технический статус',
    '',
    '- Постоянный ID: '+bt+topic.id+bt+'.',
    '- Прогресс хранится отдельно в course.grammarLessons["'+topic.id+'"].',
    '- Содержание и ключи имеют статус draft; источник page verification pending.',
    '- Предварительное выполнение порогов не равно окончательному mastered: нужны отсроченное повторение и learner review.'
  ].join('\n');
}
function toeflLinks(family, level) {
  const links = ['Writing: Build a Sentence'];
  const readingFamilies = ['relative','nounPhrase','agreement','cleft','ellipsis','cohesion','punctuation','participle','inversion','nominalisation','editing','clause','preposition'];
  const listeningFamilies = ['continuous','past','future','perfect','modal','question','reporting','phrasal','adverb','cohesion'];
  const speakingFamilies = ['be','present','imperative','modal','question','conditional','adverb','usedto'];
  if (readingFamilies.includes(family)) links.push('Reading: clause structure, reference, modifiers and logical relationships');
  if (listeningFamilies.includes(family)) links.push('Listening: tense/aspect, modality, weak forms and discourse cues');
  if (speakingFamilies.includes(family)) links.push('Speaking: Listen and Repeat / Take an Interview');
  if (['B1','B2','C1'].includes(level)) links.push('Writing: Academic Discussion');
  else links.push('Writing: Write an Email');
  return [...new Set(links)];
}
function buildConfig(topic,migration,prerequisites,legacy,allTopics) {
  const family=FAMILY_BY_ID[topic.id] || inferFamily(topic.id,topic.title);
  if(!FAMILY[family])throw new Error(topic.id+': missing theory family '+family);
  if(!DRILLS[family]?.length)throw new Error(topic.id+': missing drill family '+family);
  const items=buildPractice(topic,family,migration,legacy,allTopics);
  if(items.filter(x=>!x.open).length!==24)throw new Error(topic.id+': expected 24 closed tasks');
  if(items.filter(x=>x.open).length!==1)throw new Error(topic.id+': expected one open response');
  return {
    id:topic.id,level:parseCEFR(topic.id),sequence:topic.id,grammarFamily:family,
    questionBankSource:TOPIC_BANKS[topic.id] ? 'topic-specific-authored' : 'family-fallback',
    sourceVerification:'draft; table-of-contents mapping only; unit text and page verification pending',
    topicProfile:{
      label:FAMILY[family].label || topic.title,
      skillTarget:FAMILY[family].skillTarget,
      core:FAMILY[family].core,
      form:FAMILY[family].form,
      selection:FAMILY[family].selection,
      contrast:FAMILY[family].contrast,
      boundary:FAMILY[family].boundary,
      pronunciation:TOPIC_BANKS[topic.id]?.profile?.pronunciation || FAMILY[family].pronunciation || ('Topic-specific pronunciation practice for '+topic.title+'; verify phonetic examples against dictionary audio.'),
      examples:TOPIC_BANKS[topic.id]?.profile?.examples || [],
      traps:TOPIC_BANKS[topic.id]?.profile?.traps || [],
      toefl:TOPIC_BANKS[topic.id]?.profile?.toefl || FAMILY[family].toefl || ('TOEFL transfer for '+topic.title+': apply this structure to reading, listening, writing and speaking; this is skill transfer, not a separate exam task.')
    },
    title:topic.title,description:topic.outcome,
    cardDescription:'Теория, guided practice, самостоятельные задания и выходная проверка по постоянному ID '+topic.id+'.',
    eyebrow:'Полный урок программы '+topic.id+' · drafted',
    contentVersion:'1.0-draft',curriculumVersion:'1.0',
    prerequisites:prerequisites.get(topic.id)||[],
    outcomes:[topic.outcome,'Выбирать целевую конструкцию по контексту и смыслу.','Исправлять типичные ошибки и переносить правило в новый пример.'],
    sourceRefs:sourceRefsFor(topic),
    sourceStatus:'unit-mapped; page verification pending',
    status:'drafted',
    legacyCoverage:migration.get(topic.id)?.coverage||'Нет',
    toeflLinks:toeflLinks(FAMILY[family].baseFamily || family,parseCEFR(topic.id)),
    thresholds:{independent:7,exit:4,criticalIds:['E1','E2','E3']},
    groups:{independent:'Самостоятельная практика',exit:'Выходная проверка'},
    items,
    markdown:buildMarkdown(topic,family,migration,prerequisites),
    theoryEnd:'## 5.'
  };
}
function buildAll() {
  ensureFamilyDrills();
  const topics=parseCurriculum();
  const migration=parseMigration();
  const prerequisites=parsePrerequisites();
  const legacy=readLegacy();
  if(topics.length!==94)throw new Error('Expected 94 permanent curriculum blocks; found '+topics.length);
  if(migration.size!==94)throw new Error('Migration map must contain 94 IDs; found '+migration.size);
  if(prerequisites.size!==94)throw new Error('Prerequisite table must contain 94 IDs; found '+prerequisites.size);
  const ids=new Set(topics.map(t=>t.id));
  for(const topic of topics) {
    for(const required of prerequisites.get(topic.id)||[]) {
      if(!ids.has(required))throw new Error(topic.id+' references missing prerequisite '+required);
    }
  }
  const existing = new Set(['A1-01','A1-02','A1-05']);
  const generated = topics.filter(t=>!existing.has(t.id)).map(topic=>buildConfig(topic,migration,prerequisites,legacy,topics));
  const counts=Object.fromEntries(['A1','A2','B1','B2','C1'].map(level=>[level,generated.filter(x=>x.level===level).length]));
  if(generated.length!==91)throw new Error('Expected 91 new lesson blocks; found '+generated.length);
  const dir=path.join(root,'materials','grammar-lessons');
  fs.mkdirSync(dir,{recursive:true});
  for(const lesson of generated) {
    write(path.join('materials','grammar-lessons',lesson.id+'.md'),lesson.markdown);
  }
  for (const lesson of generated) {
    for (const item of lesson.items) {
      if (item.open || !Array.isArray(item.options) || item.options.length < 2) continue;
      const options = item.options.slice();
      const shift = (Number(String(item.id).replace(/\D/g,'')) + item.group.length) % options.length;
      item.options = options.slice(shift).concat(options.slice(0,shift));
      item.distractorRationales = item.distractorRationales || {};
      for (const option of item.options) {
        if (option !== item.answer && !item.distractorRationales[option]) item.distractorRationales[option] = item.distractorWhy || ('This option does not match the sentence context: '+item.why);
      }
    }
  }
  const payload='window.grammarBulkLessons = '+JSON.stringify(generated)+';\nwindow.grammarBulkCurriculumIds = '+JSON.stringify(topics.map(t=>t.id))+';\n';
  write('grammar-curriculum-bulk-data.js',payload);
  const report={
    generated:generated.length,
    byLevel:counts,
    items:generated.reduce((sum,x)=>sum+x.items.length,0),
    closed:generated.reduce((sum,x)=>sum+x.items.filter(i=>!i.open).length,0),
    open:generated.reduce((sum,x)=>sum+x.items.filter(i=>i.open).length,0),
    sourcePending:generated.length,
    legacyCoverage:Object.fromEntries(['Полное ядро','Частично','Нет'].map(s=>[s,generated.filter(x=>x.legacyCoverage===s).length]))
  };
  console.log(JSON.stringify(report,null,2));
}
const topicOverrides = require('./grammar-curriculum-overrides.cjs');
for (const [key, value] of Object.entries(topicOverrides.familyProfiles)) {
  FAMILY[key] = {...FAMILY[value.base], ...value.profile};
  DRILLS[key] = topicOverrides.familyDrills[key];
}
const TOPIC_BANKS = {
  ...require('./grammar-a1-topic-banks.cjs'),
  ...require('./grammar-a2-topic-banks.cjs'),
  ...require('./grammar-b1-topic-banks.cjs'),
  ...require('./grammar-b2-topic-banks.cjs'),
  ...require('./grammar-c1-topic-banks.cjs')
};
for (const [id, config] of Object.entries(TOPIC_BANKS)) {
  FAMILY[id] = {
    ...FAMILY[config.base],
    ...config.profile,
    skillTarget:config.skillTarget,
    baseFamily:config.base
  };
  DRILLS[id] = config.drills;
  FAMILY_BY_ID[id] = id;
}
Object.assign(FAMILY_BY_ID, {
  'A1-09':'possessive',
  'A1-12':'frequency',
  'A1-13':'presentContinuous',
  'A1-14':'simpleContinuous',
  'A1-15':'modalCan',
  'A1-19':'introPast',
  'A2-02':'pastContinuous',
  'A2-03':'pastContrast',
  'A2-05':'presentPerfect',
  'A2-06':'perfectVsPast',
  'A2-08':'comparative',
  'A2-09':'superlative',
  'A2-07':'modalCore',
  'B2-11':'articlesAdvanced'
});
buildAll();
// Lesson generation is complete here; post-generation review is tracked separately.


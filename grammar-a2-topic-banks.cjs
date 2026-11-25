const q=(prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why)=>[prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why];
module.exports = {
"A2-01":{base:"past",skillTarget:"past-simple-full",profile:{
label:"Past Simple: affirmative, negatives and questions",
core:"Past Simple описывает завершённые действия и состояния в прошлом. В утверждении используется V2; в вопросе и отрицании прошедшее выражается did/didn't, после которых основной глагол возвращается к base form.",
form:"Affirmative: subject + V2. Negative: subject + did not + base verb. Question: Did + subject + base verb? Be: was/were; be не использует did.",
selection:"Используй Past Simple для завершённого прошлого периода. Для обычного глагола выбери V2 в утверждении и did + base form в вопросе/отрицании.",
contrast:"She went home; Did she go home?; She didn't go home. После did/didn't основной глагол без окончания -ed и без V2.",
boundary:"Правильные глаголы добавляют -ed, неправильные имеют отдельную V2. Did не используется с be, modal verbs или другими auxiliary.",
skillTarget:"past-simple-full"
},drills:[
q("We ___ the museum last Saturday.","visited","visit","have visited","Last Saturday указывает на завершённое прошлое; нужен V2 visited.","Visit — base form, не выражает Past Simple в affirmative.","Present Perfect не сочетается с законченным маркером last Saturday в стандартном контексте."),
q("Did the students ___ the instructions?","understand","understood","understanding","После did используется base form understand.","Understood — V2; прошедшее уже выражено did.","После did требуется base form, а не -ing."),
q("Marta didn't ___ the email yesterday.","receive","received","receiving","После didn't используется base form receive.","Received — V2 и дублирует маркер прошлого.","Receiving не подходит после didn't."),
q("Where ___ you buy the tickets?","did","were","have","Вопрос с обычным глаголом buy в Past Simple строится с did.","Were — форма be, но buy здесь смысловой глагол.","Have потребовало бы V3 и изменило бы временную перспективу."),
q("The weather ___ cold during our trip.","was","were","did","Weather — singular noun; прошлая форма be — was.","Were согласуется с you/we/they и plural subject.","Did не используется как форма be перед adjective complement."),
q("They ___ to the conference by train.","went","go","have gone","В Past Simple irregular go принимает V2 went.","Go — base form.","Have gone требует auxiliary have и V3."),
q("___ your brother call you last night?","Did","Was","Has","Вопрос с обычным глаголом call в Past Simple строится с did.","Was — форма be, но call — обычный глагол.","Has потребовало бы Present Perfect, а last night — завершённое время.")
]},
"A2-04":{base:"future",skillTarget:"future-forms-basic",profile:{
label:"future forms: will, going to and present continuous",
core:"Will часто выражает решение в момент речи, предложение или прогноз. Be going to — существующее намерение и прогноз по признакам. Present Continuous — уже согласованная договорённость.",
form:"Will + base verb. Be going to + base verb. Present Continuous: am/is/are + V-ing для личной договорённости. Расписание может выражаться Present Simple.",
selection:"Спонтанное решение — will; план или прогноз по заметным признакам — going to; уже согласованная встреча — Present Continuous.",
contrast:"I'll answer the phone — решение сейчас. I'm going to study — намерение. We're meeting tomorrow — договорённость. The train leaves at eight — расписание.",
boundary:"Формы иногда пересекаются и могут иметь разные оттенки. После if/when в обычных будущих придаточных часто используется Present Simple.",
skillTarget:"future-forms-basic"
},drills:[
q("The phone is ringing. I ___ answer it.","will","am going","am","Спонтанное решение выражается will + base verb.","Am going требует to + base verb и обычно обозначает план.","Am alone не образует будущее время перед answer."),
q("Look at those dark clouds. It ___ rain.","is going to","will to","is","Видимые признаки поддерживают прогноз be going to.","После modal will не используется to.","Is без going to не образует нужную конструкцию."),
q("We ___ our cousins on Sunday; everything is arranged.","are visiting","will visiting","visit","Уже организованная договорённость выражается Present Continuous.","После will нужна другая модель: will be visiting.","Present Simple не так ясно передаёт личную договорённость."),
q("I think the new course ___ be popular.","will","is going","will to","Мнение или прогноз часто выражается will + base verb.","Is going требует going to + base verb.","После will не используется to."),
q("She has decided that she ___ study engineering.","is going to","will to","is","Решение уже принято; going to отражает намерение.","Will to нарушает модель modal + base verb.","Is без going to не завершает конструкцию."),
q("The train ___ at 6:45 tomorrow morning.","leaves","will leaving","is leave","Фиксированное расписание выражается Present Simple.","Will leaving пропускает be в Future Continuous и не подходит для расписания.","После is требуется V-ing, а не base form leave."),
q("I forgot my notebook. — Don't worry, I ___ lend you one.","will","am going","am","Предложение помощи в момент речи выражается will.","Am going не может стоять без to + base verb.","Am alone не образует будущее время перед lend.")
]},

"A2-10":{base:"quantifier",skillTarget:"determiners-quantifiers-a2",profile:{
label:"determiners and quantifiers",
core:"Determiners стоят перед существительным и уточняют охват: каждый, оба, ни один, большинство или меньшее количество. Выбор зависит от числа и исчисляемости.",
form:"Every + singular countable noun; each of + determiner + plural noun; both + plural noun; neither of + determiner + plural noun; most of + noun phrase; fewer + plural countable; less + uncountable.",
selection:"Проверь число и исчисляемость, затем значение: each/every, both/neither, most/few, fewer/less. Обрати внимание на согласование сказуемого.",
contrast:"Every student has a card; each of the students has a card. Both students are ready; neither of the two is ready. Fewer mistakes; less information.",
boundary:"Не используй every of. После each of и neither of в стандартной учебной модели обычно ставится singular verb; реальные варианты agreement могут зависеть от регистра и dialect.",
skillTarget:"determiners-quantifiers-a2"
},drills:[
q("___ applicant must sign the form individually.","Every","Many","Both","Every определяет singular noun applicant.","Many требует plural noun.","Both относится к двум или более элементам и требует plural noun."),
q("Each of the participants ___ a name badge before the ceremony yesterday.","received","receives","receiving","Each of + plural noun phrase takes a singular verb; yesterday requires Past Simple received.","Receives is present tense and does not match yesterday.","Receiving is non-finite and cannot serve as the sentence main verb."),
q("There were ___ errors in the second version than in the first.","fewer","less","little","Errors — plural countable noun; используется fewer.","Less стандартно используется с uncountable nouns в количественном значении.","Little используется с uncountable noun."),
q("___ of the two proposals was accepted.","Neither","Every","All","Neither of the two означает, что не принят ни один из двух.","Every of не является корректной конструкцией.","All не передаёт значение отрицания обоих."),
q("___ the students passed the final test; only three failed.","Most of","Much of","Every of","Most of + the + plural noun обозначает большинство группы.","Much of используется с uncountable noun.","Every of не является корректной конструкцией."),
q("We have very ___ time before the train leaves.","little","few","many","Time в этом значении uncountable; используется little.","Few используется с plural countable nouns.","Many используется с plural countable nouns."),
q("Both ___ were included in the final report.","methods","method","much method","Both требует plural countable noun methods.","Singular method не согласуется с both.","Much не используется перед plural countable noun.")
]},
"A2-11":{base:"adverb",skillTarget:"adverbs-manner-time-degree-sequence",profile:{
label:"adverbs of manner, time, degree and sequence",
core:"Наречия уточняют, как, когда, насколько или в какой последовательности происходит действие. Разные типы наречий имеют разные позиции.",
form:"Manner часто после verb/object; time часто в конце/начале; degree перед adjective/adverb; sequence markers first/then/finally организуют порядок идей.",
selection:"Определи функцию: manner (how), time (when), degree (to what extent), sequence (in what order). Затем найди слово, которое модифицируется.",
contrast:"She spoke clearly (manner); yesterday (time); very clearly (degree); first/then (sequence).",
boundary:"Не все слова на -ly являются наречиями; friendly — adjective. Enough обычно следует после adjective/adverb, very стоит перед gradable adjective/adverb.",
skillTarget:"adverbs-manner-time-degree-sequence"
},drills:[
q("The technician checked the equipment ___.","carefully","careful","carefulness","Carefully модифицирует checked и обозначает manner.","Careful — adjective; здесь требуется adverb.","Carefulness — noun."),
q("We received the final results ___.","yesterday","carefully","very","Yesterday отвечает на вопрос when.","Carefully отвечает на how, а не when.","Very — degree adverb и требует adjective/adverb после себя."),
q("The instructions were ___ clear.","extremely","extreme","extremity","Extremely — degree adverb перед adjective clear.","Extreme — adjective, а не adverb.","Extremity — noun."),
q("The first experiment was successful. ____, the team repeated it.","Then","Carefully","Very","Then обозначает следующий этап последовательности.","Carefully обозначает manner, не связывает этапы.","Very усиливает adjective/adverb и не вводит последовательность."),
q("The box was small ___ to fit under the desk.","enough","very","too much","Enough следует после adjective small.","Very ставится перед adjective и не выражает здесь достаточность для to-infinitive.","Too much используется с noun/uncountable quantity."),
q("She answered the question ___.","correctly","correct","correction","Correctly — adverb, характеризует действие answered.","Correct — adjective; для действия нужен adverb.","Correction — noun."),
q("Finally, the researchers ___ published their findings.","successfully","successful","success","Successfully — adverb, модифицирует published.","Successful — adjective и не модифицирует verb published.","Success — noun.")
]},

"A2-12":{base:"verbPattern",skillTarget:"gerund-infinitive-basic",profile:{
label:"basic gerund and infinitive patterns",
core:"После разных глаголов английский требует gerund (-ing) или to-infinitive. Выбор зависит от управляющего глагола; иногда смена формы меняет значение.",
form:"Enjoy/avoid/finish/suggest + V-ing. Want/decide/hope/promise/plan + to + base verb. После предлога перед глаголом используется V-ing.",
selection:"Найди глагол или предлог перед пропуском и проверь, какую форму он требует. Не переноси русскую модель напрямую.",
contrast:"I enjoy reading; I decided to read; I'm interested in learning. Stop doing и stop to do имеют разный смысл и изучаются позднее.",
boundary:"Некоторые глаголы допускают обе формы с разницей значения (remember, stop, try); здесь отрабатываются частотные однозначные patterns.",
skillTarget:"gerund-infinitive-basic"
},drills:[
q("We decided ___ the earlier train.","to take","taking","take","Decide обычно требует to-infinitive.","Taking — gerund и не соответствует complement pattern decide.","Bare infinitive без to не используется после decide."),
q("My friends enjoy ___ board games.","playing","to play","play","Enjoy требует gerund V-ing.","To play не соответствует pattern enjoy.","Bare infinitive не используется после enjoy."),
q("The students avoided ___ during the lecture.","talking","to talk","talk","Avoid требует gerund.","To talk не соответствует pattern avoid.","Bare infinitive не используется после avoid."),
q("I hope ___ the results tomorrow.","to receive","receiving","receive","Hope обычно требует to-infinitive.","Gerund receiving не является стандартным complement после hope.","Bare infinitive без to не используется после hope."),
q("She is interested in ___ abroad.","studying","to study","study","После preposition in требуется gerund.","To-infinitive не ставится непосредственно после предлога in.","Bare infinitive также не следует после preposition."),
q("They promised ___ us with the project.","to help","helping","help","Promise требует to-infinitive.","Gerund helping не соответствует pattern promise.","Bare infinitive без to не используется после promise."),
q("He finished ___ the report before lunch.","writing","to write","write","Finish требует gerund.","To-infinitive не используется после finish в этой модели.","Bare infinitive не соответствует pattern finish + V-ing.")
]},
"A2-13":{base:"question",skillTarget:"direct-and-indirect-questions",profile:{
label:"question forms and indirect questions — introduction",
core:"В прямом вопросе с обычным глаголом do/does/did обычно стоит перед subject. В косвенном вопросе используется порядок слов утвердительного предложения.",
form:"Direct: Wh-word + do/does/did + subject + base verb? Indirect: Could you tell me + wh-word + subject + verb? / Do you know if/whether + subject + verb?",
selection:"Определи прямой это вопрос или встроенный. В прямом вопросе нужна инверсия; после Could you tell me / Do you know — subject + verb order.",
contrast:"Where does she live?; Do you know where she lives?; Who called you? (subject question без do-support).",
boundary:"Who может быть подлежащим, и тогда do-support обычно не нужен. В embedded yes/no question используются if/whether.",
skillTarget:"direct-and-indirect-questions"
},drills:[
q("Where ___ your parents live?","do","does","are","Parents — plural subject; прямой Present Simple question требует do.","Does согласуется с singular third-person subject.","Are относится к be/continuous, но live здесь обычный глагол."),
q("Do you know where the nearest bank ___?","is","is it","does","Встроенный вопрос использует statement order: subject + is.","Is it — инверсия прямого вопроса, не embedded question.","Does требует base verb, но здесь predicate — be."),
q("Who ___ the first email?","sent","did send","was sent","Who — subject; используется Past Simple sent без do-support.","Did send добавляет ненужный auxiliary в subject question.","Was sent — passive и меняет смысл."),
q("Could you tell me what time the shop ___?","closes","does it close","close","В indirect question сохраняется subject + verb order; singular shop → closes.","Does it close — порядок прямого вопроса.","Close без -s не согласуется с singular subject."),
q("___ she speak French?","Does","Do","Is","She — third-person singular; вопрос требует does.","Do используется с I/you/we/they и plural subjects.","Is не используется с ordinary verb speak."),
q("I wonder whether the train ___ on time.","arrives","does it arrive","arrive","После whether в embedded clause используется statement order; singular train → arrives.","Does it arrive — direct question order.","Arrive без -s не согласуется с singular subject."),
q("What ___ at the end of the film?","happened","did happen","was happened","What является subject; вопрос строится без do-support.","Did happen добавляет ненужный auxiliary.","Was happened — неверная passive construction.")
]},

"A2-14":{base:"relative",skillTarget:"defining-relative-clauses",profile:{
label:"defining relative clauses",
core:"Defining relative clause уточняет, о каком человеке, предмете, месте или времени идёт речь. Она необходима для определения референта и обычно не отделяется запятыми.",
form:"Person: who/that. Thing: which/that. Possession: whose. Place: where. Time: when. Object relative pronoun in a defining clause can sometimes be omitted.",
selection:"Определи antecedent (person/thing/place/time), затем выбери relative word и проверь его синтаксическую роль. Subject pronoun нельзя опускать; object pronoun иногда можно.",
contrast:"The student who won — who is subject. The book (that) I read — that is object and can be omitted. The town where I grew up — place.",
boundary:"Non-defining clauses with commas and limits on that изучаются позже. Whose может относиться к людям, организациям и вещам.",
skillTarget:"defining-relative-clauses"
},drills:[
q("The teacher ___ helped me was very patient.","who","which","where","Who относится к человеку и является subject relative pronoun.","Which обычно относится к вещам/животным.","Where обозначает место."),
q("This is the phone ___ I bought yesterday.","that","who","whose","That вводит defining relative clause для вещи как object.","Who относится к людям.","Whose выражает принадлежность, но здесь нет следующего noun, который принадлежал бы телефону."),
q("The town ___ my grandparents live is very small.","where","who","whose","Where вводит relative clause места.","Who используется для людей.","Whose показывает принадлежность перед существительным."),
q("The girl ___ brother is in my class is from Italy.","whose","which","where","Whose показывает отношение принадлежности между girl и brother.","Which относится к вещам, не выражает здесь possessive relation.","Where обозначает место, а не принадлежность."),
q("The book (___) I borrowed was fascinating.","that","who","where","That может быть object relative pronoun и может опускаться.","Who относится к человеку.","Where относится к месту."),
q("The scientist ___ discovered the element received a prize.","who","which","when","Who является subject и относится к человеку.","Which здесь не относится к человеку.","When обозначает время."),
q("The day ___ we first met was very cold.","when","who","whose","When вводит относительное придаточное времени.","Who относится к человеку.","Whose выражает принадлежность.")
]},

"A2-15":{base:"conditional",skillTarget:"zero-first-conditionals",profile:{
label:"Zero and First Conditional",
core:"Zero Conditional описывает общие факты и закономерности. First Conditional описывает реальное или вероятное будущее условие и возможный результат.",
form:"Zero: If + Present Simple, Present Simple. First: If + Present Simple, will + base verb. If-clause может стоять в начале или конце.",
selection:"Определи: общая закономерность (zero) или конкретная будущая возможность (first). В обычном First Conditional не ставь will в if-clause.",
contrast:"If water reaches 100°C, it boils — general fact. If it rains tomorrow, we will stay home — likely future condition.",
boundary:"Unless means if not. Second/Third Conditional для более нереальных условий изучаются далее.",
skillTarget:"zero-first-conditionals"
},drills:[
q("If you heat water to 100°C, it ___.","boils","will boil","boil","Это общая закономерность; Zero Conditional использует Present Simple в обеих частях.","Will boil превращает высказывание в будущий прогноз, а не общее правило.","После it в Present Simple нужен boils."),
q("If I finish early, I ___ you.","will call","call yesterday","would called","Реальная будущая возможность: will + base verb в result clause.","Call yesterday содержит конфликт времени.","Would called — неверная форма и не First Conditional."),
q("If the temperature drops below zero, water ___.","freezes","will freeze tomorrow","would froze","Общее научное правило использует Present Simple.","Will freeze tomorrow превращает общее правило в отдельный прогноз.","Would froze — неверная форма modal + past."),
q("We will miss the train if we ___ now.","don't leave","won't leave","didn't left","В обычной if-clause First Conditional используется Present Simple negative.","Won't обычно не используется в стандартной if-clause.","Didn't left смешивает did + V2; Past Simple не соответствует будущему условию."),
q("Unless you ___, you will be late.","hurry","will hurry","don't hurry","Unless уже означает if not; здесь используется affirmative Present Simple hurry.","Will hurry не ставится в обычной будущей if-clause.","Don't hurry создаёт двойное отрицание по смыслу."),
q("If people exercise regularly, they often ___ better.","feel","will feels","felt yesterday","Общая закономерность выражается Present Simple feel.","Will feels смешивает modal will с окончанием third person.","Felt yesterday — Past Simple, не общее правило."),
q("If the library is open, we ___ there after class.","will study","study yesterday","would studied","Конкретный будущий результат — will + base verb.","Study yesterday содержит конфликт времени.","Would studied — грамматически неверная форма.")
]},

"A2-16":{base:"clause",skillTarget:"time-reason-purpose-result-clauses",profile:{
label:"time clauses and basic reason, purpose and result",
core:"Adverbial clauses показывают, когда, почему и с какой целью происходит действие или к какому результату оно приводит. Because вводит clause, because of — noun phrase; to-infinitive выражает цель.",
form:"Time: when/before/after/as soon as/until + clause. Reason: because + clause / because of + noun phrase. Purpose: to + infinitive / so that + clause. Result: so + clause.",
selection:"Определи логическую связь (время, причина, цель, результат) и проверь, что следует после союза: clause, noun phrase или infinitive.",
contrast:"Because it was late; because of the delay; we left early to catch the bus; we left early, so we caught the bus.",
boundary:"В time clause с будущим смыслом обычно используется Present Simple: when she arrives, not when she will arrive. Более сложные concession structures изучаются позднее.",
skillTarget:"time-reason-purpose-result-clauses"
},drills:[
q("We waited until the bus ___.","arrived","would arrive","arriving","Until вводит time clause; в завершённом прошлом используется Past Simple arrived.","Would arrive не требуется после until в этой временной структуре.","Gerund arriving не образует finite clause."),
q("She stayed at home because she ___ ill.","was","because of","be","Because вводит clause с subject she и finite verb was.","Because of — preposition phrase, не глагол.","Be — base form без auxiliary и не является finite verb."),
q("He left early ___ catch the first train.","to","because","so","To + infinitive выражает цель.","Because вводит причину и требует clause.","So вводит result clause, а не bare infinitive."),
q("The match was cancelled ___ the heavy rain.","because of","because","so that","Because of вводит noun phrase the heavy rain.","Because требует clause с subject + verb.","So that выражает цель и требует clause."),
q("As soon as the lecture ___, we will discuss the notes.","ends","will end","ending","В time clause о будущем используется Present Simple.","Will обычно не ставится в обычной time clause.","Ending не образует finite clause."),
q("The experiment failed, ___ the team repeated it.","so","because of","to","So вводит результат первой части.","Because of требует noun phrase и не связывает две finite clauses напрямую.","To-infinitive выражает цель, а не результат."),
q("We lowered the volume so that the baby ___ sleep.","could","to","because","So that вводит clause; could sleep выражает цель/возможный результат.","To не заменяет subject + finite verb после so that.","Because выражает причину, а не цель.")
]},

"A2-17":{base:"preposition",skillTarget:"common-dependent-prepositions",profile:{
label:"common dependent prepositions",
core:"Некоторые глаголы и прилагательные требуют устойчивого предлога. Его часто нельзя вывести из русского перевода; учи сочетания целиком: interested in, depend on, listen to, good at.",
form:"Adjective + preposition: interested in, good at, afraid of. Verb + preposition: listen to, depend on, belong to, wait for. После предлога перед глаголом используется V-ing.",
selection:"Найди управляющее слово, запомни его collocation и поставь нужный предлог. Если после предлога идёт глагол, используй gerund.",
contrast:"Listen to music; depend on evidence; interested in science; good at maths. Предлог нельзя выбирать только по русскому переводу.",
boundary:"У ряда слов есть несколько предлогов с разным значением/вариативностью. Этот блок покрывает частотные модели; сложные multi-word prepositions рассматриваются позже.",
skillTarget:"common-dependent-prepositions"
},drills:[
q("I am interested ___ environmental science.","in","on","at","Стандартное сочетание — interested in.","On не является управляющим предлогом после interested в этом значении.","At также не соответствует collocation interested in."),
q("The final result depends ___ the sample size.","on","of","to","Depend управляет предлогом on.","Of не используется после depend в этой модели.","To не является стандартным предлогом после depend."),
q("Please listen ___ the recording carefully.","to","at","for","Listen требует to перед объектом.","At не входит в стандартное управление listen.","For не подходит к объекту recording."),
q("My younger brother is good ___ drawing.","at","in","on","Good at используется перед activity/gerund.","In не является стандартным предлогом после good в этой модели.","On не выражает умение здесь."),
q("We are waiting ___ the results.","for","to","about","Wait for обозначает ожидание чего-либо.","Wait to обычно требует infinitive of action; перед noun results нужно for.","About не является стандартным управляющим предлогом wait."),
q("This old camera belongs ___ my grandfather.","to","with","for","Belong управляет предлогом to.","With не используется после belong в значении принадлежности.","For не выражает владельца."),
q("She is afraid ___ flying.","of","from","about","Стандартная модель — afraid of + noun/gerund.","From не является управляющим предлогом afraid в этом значении.","About не подходит к устойчивому выражению afraid of.")
]},

"A2-18":{base:"phrasal",skillTarget:"core-phrasal-verbs",profile:{
label:"phrasal verbs — core meanings and patterns",
core:"Phrasal verb состоит из глагола и particle; вместе они могут образовывать значение, которое не выводится из отдельных слов. Одни требуют object, другие употребляются без него.",
form:"Intransitive: The plane took off. Transitive separable: turn off the light / turn the light off. With pronoun object: turn it off. Inseparable: look after the child.",
selection:"Запоминай phrasal verb вместе со значением и управлением. Проверь, нужен ли object и можно ли поставить его между verb и particle. В separable phrasal verb pronoun обычно находится в середине.",
contrast:"Turn off the computer / turn the computer off / turn it off. Look after the child (not look the child after).",
boundary:"Не все multi-word verbs имеют одинаковое управление. Particle меняет значение, поэтому не переводи его автоматически буквально.",
skillTarget:"core-phrasal-verbs"
},drills:[
q("Please turn ___ the television before you leave.","off","after","into","Turn off means switch off; здесь требуется particle off.","After меняет значение на 'заботиться о' с другим verb.","Into не образует нужный phrasal verb с turn."),
q("Could you turn ___ off? The music is too loud.","it","off it","it off","В separable phrasal verb pronoun object ставится между verb и particle: turn it off.","Off it ставит pronoun после particle.","It off повторяет off после пропуска и нарушает порядок."),
q("The plane ___ at 8 a.m.","took off","took after","took up","Take off означает взлететь.","Take after означает быть похожим на родственника.","Take up означает начать занятие/занять место."),
q("She looks ___ her grandmother every weekend.","after","up","off","Look after означает присматривать за кем-либо.","Look up означает искать информацию/улучшаться.","Look off не выражает заботу в этой модели."),
q("He decided to give ___ smoking.","up","off","out","Give up + gerund означает отказаться от привычки.","Give off означает испускать запах/свет/тепло.","Give out означает раздавать или переставать работать."),
q("We ran ___ milk, so I went to the shop.","out of","after","into","Run out of означает исчерпать запас.","Run after означает преследовать.","Run into означает случайно встретить/столкнуться."),
q("Please put ___ the meeting until Friday.","off","up","out","Put off означает отложить мероприятие.","Put up означает разместить/предоставить жильё.","Put out означает тушить/производить.")
]},
"A2-02":{base:"pastContinuous",skillTarget:"past-continuous-forms-and-uses",profile:{
label:"Past Continuous — form, background and interrupted actions",
core:"Past Continuous presents an action as in progress at a particular time in the past. It often provides background for a shorter event or describes two simultaneous ongoing actions.",
form:"Subject + was/were + V-ing. Negative: was/were not + V-ing. Question: Was/Were + subject + V-ing? I/he/she/it → was; you/we/they → were.",
selection:"Найди прошлую точку времени и определи, было ли действие в процессе в этот момент. Для длительного фона используй was/were + V-ing; короткое событие, которое произошло, часто ставится в Past Simple.",
contrast:"I was reading when the phone rang. — процесс был прерван событием. While I was reading, my sister was cooking. — два процесса шли одновременно.",
boundary:"Stative verbs обычно не используются в Continuous. Past Continuous не означает автоматически, что действие было долгим; главное — представить его как процесс в выбранный прошлый момент.",
pronunciation:"Слушай was/were как auxiliary перед -ing. В быстрой речи was часто редуцируется; окончание -ing сохраняется как признак progressive aspect.",
traps:[
["They was waiting outside.","They were waiting outside.","Plural subject they requires were.","Was is used with I/he/she/it."],
["I was read when you called.","I was reading when you called.","Past Continuous requires was + V-ing.","Read is a base/past form, not the required -ing form."],
["She was knowing the answer.","She knew the answer.","Know is normally stative and is not used in Continuous in this meaning.","Was knowing is not the standard form for a state of knowledge."]
],
examples:[
["At eight yesterday, I was doing my homework.","Вчера в восемь я делал(а) домашнее задание.","Action in progress at a specific past time."],
["We were walking home when it started to rain.","Мы шли домой, когда начался дождь.","Longer background action + shorter Past Simple event."],
["While the teacher was speaking, the students were taking notes.","Пока преподаватель говорил, студенты делали записи.","Two simultaneous past processes."],
["He wasn't sleeping when I arrived.","Когда я пришёл(ла), он не спал.","Negative Past Continuous."]
],
toefl:"Past Continuous helps describe background, context and interrupted events in narrative Speaking and in written explanations."
},drills:[
q("At 9 p.m. yesterday, I ___ for my exam.","was studying","studied","am studying","A specific past time with an action in progress takes Past Continuous.","Studied presents the event as a completed past fact, not in progress at that time.","Am studying refers to the present."),
q("The children ___ outside when the storm began.","were playing","played","was playing","Children is plural and the ongoing background action takes were playing.","Played does not foreground the ongoing action before the interruption.","Was does not agree with plural children."),
q("While I ___ dinner, my brother was setting the table.","was cooking","cooked","am cooking","While introduces a background process; I takes was cooking.","Cooked presents a completed event rather than the ongoing parallel process.","Am cooking is present, not past."),
q("___ they waiting for the bus at that time?","Were","Was","Did","Past Continuous question with plural they begins Were.","Was is singular.","Did forms a Past Simple question and is not used with was/were + V-ing."),
q("She wasn't ___ when the alarm rang.","sleeping","sleep","slept","After wasn't, the main verb takes -ing.","Sleep is the base form; Past Continuous needs -ing.","Slept is V2 and cannot follow wasn't in this construction."),
q("What ___ you doing when I called?","were","was","did","You takes were in Past Continuous questions.","Was is used with I/he/she/it.","Did is not used with the progressive auxiliary structure."),
q("The sun ___ while we were driving through the mountains.","was setting","set","is setting","The sunset was in progress during the past drive; use was setting.","Set would present a completed event, not the ongoing background.","Is setting is present.")
]},
"A2-03":{base:"pastContrast",skillTarget:"past-simple-vs-past-continuous",profile:{
label:"Past Simple vs Past Continuous",
core:"Past Simple presents a past event as a completed whole. Past Continuous presents an action as in progress at a past time, often giving background or context for another event.",
form:"Past Simple: V2 / did + base verb. Past Continuous: was/were + V-ing. Common pattern: Past Continuous + when + Past Simple; while + Past Continuous for an ongoing background.",
selection:"Определи, что делает предложение: сообщает о завершённом событии или показывает процесс в конкретный момент прошлого. При двух действиях выбери фон и событие, которое произошло.",
contrast:"I was walking home when I saw an accident. Walking was in progress; saw is a completed event. While I was walking, it started to rain.",
boundary:"When and while do not mechanically determine the tense: meaning and aspect matter. Two completed events can both use Past Simple; two parallel processes can both use Past Continuous.",
pronunciation:"В Listening различай V2 и was/were + V-ing. Слабая форма was/were может быть короткой; временная связь often signalled by when/while and context.",
traps:[
["I watched TV when you were calling (meaning I was in the middle of it).","I was watching TV when you called.","Ongoing background uses Past Continuous; the interrupting completed call uses Past Simple.","Watched presents the action as complete rather than in progress."],
["While I cooked, the phone was ringing (one ring interrupted the cooking).","While I was cooking, the phone rang.","The cooking was ongoing; the phone rang as a shorter event.","Was ringing describes an ongoing ring, which changes the intended event focus."],
["They were arrive at six.","They arrived at six.","Arrive is a completed event and uses Past Simple V2.","Were arrive has no V-ing and cannot form Past Continuous."]
],
examples:[
["I was reading when the lights went out.","Я читал(а), когда погас свет.","Reading is the background process; went out is the completed event."],
["The students left after the lecture ended.","Студенты ушли после окончания лекции.","Two completed events in sequence use Past Simple."],
["While the lecturer was explaining the graph, someone asked a question.","Пока преподаватель объяснял график, кто-то задал вопрос.","Ongoing explanation + shorter question."],
["At midnight, the city was sleeping.","В полночь город спал.","Action/state framed as ongoing at a past time."]
],
toefl:"Aspect choice helps present event sequence clearly in Speaking responses and written narratives; it also supports comprehension of timeline relationships in Listening."
},drills:[
q("I ___ my notes when the teacher asked a question.","was reviewing","reviewed","am reviewing","Reviewing was in progress when the shorter question occurred.","Reviewed presents the action as completed before the interruption.","Am reviewing is present."),
q("The phone ___ while we were having dinner.","rang","was ringing for two hours","rings","The ring is presented as the event that occurred during the ongoing dinner.","Was ringing for two hours describes a prolonged process, not the intended short event.","Rings is Present Simple."),
q("While the researchers ___ the samples, the power went out.","were examining","examined","are examining","The examination was an ongoing background process.","Examined presents it as a completed whole, not the ongoing background.","Are examining is present."),
q("We ___ the museum and then went to a café.","visited","were visiting","are visiting","The two actions are completed events in sequence; use Past Simple.","Were visiting would focus on the process, not the completed visit in the sequence.","Are visiting is present."),
q("At this time yesterday, she ___ to Helsinki.","was travelling","travelled","travels","At this time yesterday frames an action in progress; use Past Continuous.","Travelled does not focus on the ongoing action at that past moment.","Travels is Present Simple."),
q("The students ___ when the fire alarm sounded.","were writing","wrote","write","Writing was in progress at the moment the alarm sounded.","Wrote presents a completed event, not an ongoing background process.","Write is the base form and present."),
q("After the lecture ___, everyone left the hall.","finished","was finishing","finishes","The lecture finishing is a completed event that precedes leaving; Past Simple is appropriate.","Was finishing changes the meaning to an event in progress.","Finishes is Present Simple.")
]},
"A2-05":{base:"presentPerfect",skillTarget:"present-perfect-experience-and-result",profile:{
label:"Present Perfect Simple — experience and present result",
core:"Present Perfect links a past event to the present. It can describe life experience without a finished time, a recent event with a present result, or a situation that began in the past and continues now.",
form:"Subject + have/has + V3. Negative: haven't/hasn't + V3. Question: Have/Has + subject + V3? Common markers: ever, never, just, already, yet, recently.",
selection:"Используй Present Perfect, когда важен опыт или результат сейчас и не назван завершённый прошлый момент. Не ставь его с yesterday, last year, in 2020 и другими finished-time expressions.",
contrast:"I have visited Rome (life experience, time unspecified). I visited Rome in 2022 (finished past time). She has lost her keys (present result: they are missing).",
boundary:"Present Perfect Continuous focuses on duration/process; Past Simple locates a completed event in finished past time. Some varieties of English differ in already/just usage, but core form remains have/has + V3.",
pronunciation:"Have/has часто редуцируются перед V3. В Listening формы she's gone / she's been могут звучать похоже, поэтому слушай participle and context.",
traps:[
["I have seen him yesterday.","I saw him yesterday.","Yesterday is a finished past time, so Past Simple is required.","Present Perfect does not normally combine with a definite finished past-time marker."],
["She have finished the task.","She has finished the task.","She takes has + V3.","Have is used with I/you/we/they."],
["Have you ever went abroad?","Have you ever been abroad?","Present Perfect question uses have + V3; be → been.","Went is V2, not V3, and does not follow have."]
],
examples:[
["I have never used this software before.","Я никогда раньше не пользовался(ась) этой программой.","Life experience up to the present."],
["The train has just arrived.","Поезд только что прибыл.","Recent event with present relevance."],
["Have you ever taken an online course?","Ты когда-нибудь проходил(а) онлайн-курс?","Ever asks about experience at any time in life."],
["She hasn't received the results yet.","Она ещё не получила результаты.","Yet in a negative sentence; the expected result is still pending."]
],
toefl:"Present Perfect is useful for describing personal experience and current results in Speaking and Writing; choose it only when the past event is linked to the present."
},drills:[
q("I ___ never ___ sushi.","have / tried","did / tried","has / try","Present Perfect with I: have + V3 tried.","Did requires the base form and expresses Past Simple, not life experience in this structure.","Has does not agree with I and try is not V3."),
q("She ___ just ___ the assignment.","has / submitted","have / submit","did / submitted","She takes has; just + V3 describes a recent result.","Have does not agree with she and submit is not the participle.","Did requires the base form and expresses a completed past event."),
q("Have you ever ___ to Japan?","been","went","go","Ever experience question uses have + V3; be → been.","Went is Past Simple, not V3.","Go is the base form."),
q("We haven't received the email ___.","yet","yesterday","last week","Yet is common in Present Perfect negative sentences for something expected but not received.","Yesterday is a finished past time and would require Past Simple.","Last week is a finished past period."),
q("My brother ___ his phone, so he can't call us.","has lost","lost last year","have lost","The present consequence (cannot call) makes Present Perfect appropriate; brother takes has.","Lost last year is a specific finished past time and conflicts with the current-result focus.","Have does not agree with singular brother."),
q("They ___ already ___ the new laboratory.","have / visited","has / visit","did / visited","They takes have + V3; already signals completion with present relevance.","Has does not agree with plural they and visit is not V3.","Did requires base form, not visited."),
q("I ___ my best friend in 2018.","met","have met","have meet","In 2018 is a finished past time, so use Past Simple met.","Present Perfect does not combine with a specific finished past-year marker.","Meet is not the V3 form after have.")
]},
"A2-06":{base:"perfectVsPast",skillTarget:"present-perfect-vs-past-simple",profile:{
label:"Present Perfect vs Past Simple",
core:"Past Simple places an event in a finished past period. Present Perfect connects a past event or experience to the present and does not normally specify a finished past time.",
form:"Past Simple: V2; negative/question: did + base verb. Present Perfect: have/has + V3; negative/question: haven't/hasn't + V3 or Have/Has + subject + V3.",
selection:"Сначала определи временную рамку. Finished time (yesterday, in 2019, last Monday) → Past Simple. Unspecified experience, recent result or unfinished period (today/this week, if still in progress) → Present Perfect.",
contrast:"I saw the film last night. I have seen the film before. She has written three emails today (today is still in progress). She wrote three emails yesterday (finished period).",
boundary:"Today/this week can take Past Simple if the period is viewed as finished in the speaker's context. Do not use Present Perfect simply because an action is recent; its link to the present matters.",
pronunciation:"Have/has can be weak forms; Past Simple has no auxiliary in affirmative clauses. Listen for have/has before V3 and time expressions.",
traps:[
["We have visited Paris last summer.","We visited Paris last summer.","Last summer is finished time; use Past Simple.","Present Perfect does not normally take a definite finished time phrase."],
["Have you saw this documentary?","Have you seen this documentary?","Present Perfect requires V3 seen after have.","Saw is V2, not V3."],
["Did she ever been to Spain?","Has she ever been to Spain?","Experience with ever uses Present Perfect have/has + V3.","Did requires base form and does not combine with been in this pattern."]
],
examples:[
["I bought this laptop two years ago.","Я купил(а) этот ноутбук два года назад.","Finished-time expression two years ago."],
["I have used this laptop for two years.","Я пользуюсь этим ноутбуком уже два года.","Period continues to the present."],
["Did you finish the report yesterday?","Ты закончил(а) отчёт вчера?","Finished past time requires did + base verb."],
["Have you finished the report yet?","Ты уже закончил(а) отчёт?","Current relevance; asking whether result is achieved now."]
],
toefl:"Accurate tense choice helps keep timelines clear in Speaking and Writing; use the time frame, not a simple 'recent/past' shortcut."
},drills:[
q("I ___ that professor at a conference in 2021.","met","have met","have meet","In 2021 is a finished past-time expression; Past Simple met is required.","Present Perfect does not normally combine with a specific finished year.","Have meet has an incorrect participle form."),
q("___ you ever ___ an academic conference?","Have / attended","Did / attended","Have / attend","Ever asks about life experience; use have + V3.","Did requires base verb and does not form this Present Perfect experience question.","Attend is base form, not V3."),
q("She ___ three papers this semester, and the semester is still in progress.","has written","wrote yesterday","has write","An unfinished current period can be linked to the present; use has + V3.","Wrote yesterday introduces a finished time not given in the sentence.","Write is not the V3 form."),
q("They ___ the results last Friday.","announced","have announced","have announce","Last Friday is finished time; use Past Simple announced.","Present Perfect does not normally combine with last Friday.","Have announce has the wrong participle."),
q("I ___ my keys, so I can't get into the flat.","have lost","lost them last week","has lost","The present consequence (cannot enter) links the past loss to now.","Lost them last week adds a finished time and changes the context.","Has does not agree with I."),
q("When ___ you ___ the application?","did / submit","have / submitted yesterday","did / submitted","When asks for a specific past time/event; use did + base form.","Present Perfect cannot combine with yesterday or a specific finished-time question in this context.","After did, use base form submit, not submitted."),
q("We ___ three tests so far today, and the working day is not over.","have completed","completed","have complete","So far today refers to an unfinished time period; Present Perfect describes the accumulated result up to now.","Completed is Past Simple and normally refers to a finished past time period.","Have complete has the wrong participle form; Present Perfect requires V3.")
]},

"A2-07":{base:"modal",skillTarget:"core-modals-obligation-advice-permission",profile:{
label:"core modal verbs — obligation, advice, permission and possibility",
core:"Modal verbs express ability, permission, advice, necessity and possibility. They are followed by a base verb without to and do not take third-person -s.",
form:"Can/could/may/might/must/should + base verb. Have to / don't have to uses do-support; mustn't expresses prohibition, while don't have to expresses no necessity.",
selection:"Определи силу значения: правило/обязанность, совет, разрешение или возможность. Затем выбери modal с подходящим значением и не добавляй to/-s к основному глаголу.",
contrast:"You must wear a badge (obligation). You should check the date (advice). You may leave now (permission). It might rain (possibility).",
boundary:"Must and have to can both express obligation; don't have to and mustn't are not interchangeable. Could/might/may express different degrees or contexts of possibility.",
traps:[
["She musts leave now.","She must leave now.","Modal verbs do not take third-person -s.","Must is unchanged across subjects."],
["You don't have to smoke here. (intended prohibition)","You mustn't smoke here.","Mustn't expresses prohibition.","Don't have to means there is no obligation, not that an action is forbidden."],
["He should to apologise.","He should apologise.","Should is followed by bare infinitive.","To is not used after a modal verb."]
],
examples:[
["All visitors must show identification.","Все посетители обязаны предъявить документ.","Must expresses a rule."],
["You should revise the vocabulary every day.","Тебе следует повторять лексику каждый день.","Should gives advice."],
["May I use your computer?","Можно воспользоваться твоим компьютером?","May requests permission formally."],
["The road might be closed after the storm.","После шторма дорога может быть закрыта.","Might expresses possibility."]
],
toefl:"Modal choice matters in Speaking and Writing because it distinguishes requirement, recommendation, permission and uncertainty."
},drills:[
q("You ___ wear a helmet on this construction site; it is a rule.","must","might","would","Must expresses a strong obligation imposed by a rule.","Might expresses possibility, not obligation.","Would does not state a current requirement."),
q("You ___ bring food; lunch will be provided.","don't have to","mustn't","can't to","Don't have to means bringing food is unnecessary.","Mustn't prohibits bringing food; that is not stated.","Can't to is ungrammatical."),
q("You ___ park here. This area is reserved for emergency vehicles.","mustn't","don't have to","might","Mustn't expresses prohibition.","Don't have to means optional, not forbidden.","Might expresses possibility, not a prohibition."),
q("You ___ ask the tutor for feedback; it may help you improve.","should","mustn't","can to","Should gives advice or recommendation.","Mustn't prohibits the action.","To is not used after modal can."),
q("___ I leave a little earlier today?","May","Must to","Should to","May is a polite request for permission.","Must to is ungrammatical.","Should to is ungrammatical and should gives advice, not permission."),
q("The results ___ be ready by Friday, but nobody is certain.","might","must","have to","Might expresses uncertain possibility.","Must is stronger certainty/obligation.","Have to expresses necessity, not uncertain prediction."),
q("Employees ___ wear their ID cards while inside the building.","have to","might to","shoulds","Have to expresses an external requirement.","To is not added after might and the full phrase is wrong.","Should does not take -s.")
]},
"A2-08":{base:"comparative",skillTarget:"comparatives-equality-and-less",profile:{
label:"comparatives — form, equality and difference",
core:"Comparatives compare two people, things or situations. Short adjectives commonly take -er, longer adjectives use more, and equality uses as ... as. Less ... than expresses a lower degree.",
form:"Short adjective + -er + than; more + long adjective + than; less + adjective + than; as + adjective + as. Spelling: big → bigger; happy → happier; nice → nicer.",
selection:"Проверь количество слогов и орфографию adjective, затем выбери -er или more. Для равенства используй as...as; для меньшей степени — less...than.",
contrast:"This route is shorter than the other one. This explanation is more detailed than the first. The task is as difficult as I expected. The second option is less expensive.",
boundary:"Some adjectives have irregular comparatives: good → better, bad → worse, far → farther/further. Avoid double comparison (*more easier).",
traps:[
["This book is more cheaper.","This book is cheaper.","Short adjective cheap takes -er; do not add more as well.","More + -er duplicates comparative marking."],
["My bag is as heavier as yours.","My bag is as heavy as yours.","Equality uses as + base adjective + as.","Heavier is comparative, not the base adjective required in as...as."],
["This result is gooder.","This result is better.","Good has the irregular comparative better.","Gooder is not the standard form."]
],
examples:[
["The second test was easier than the first.","Второй тест был легче первого.","Easy changes y to i + er."],
["This article is more informative than the video.","Эта статья информативнее видео.","Long adjective uses more."],
["The new library is as quiet as the old one.","Новая библиотека такая же тихая, как старая.","Equality uses as...as."],
["The train is less crowded today.","Сегодня поезд менее переполнен.","Less expresses a lower degree."]
],
toefl:"Comparatives support accurate comparisons of evidence, methods and trends in Reading and Writing."
},drills:[
q("The blue route is ___ than the red route.","shorter","more short","shortest","Short takes -er to form the comparative.","More short is not the standard form for this short adjective.","Shortest is a superlative and compares one item with a group."),
q("This explanation is ___ detailed than the previous one.","more","most","much","Detailed is a longer adjective; comparative uses more + adjective.","Most forms the superlative.","Much modifies a comparative but cannot replace more before detailed."),
q("My new phone is as light ___ yours.","as","than","like","Equality uses as + adjective + as.","Than introduces a comparative, not an equality structure.","Like is a preposition and does not complete as...as."),
q("The second exercise is ___ difficult than the first.","less","least","as","Less + adjective + than expresses a lower degree.","Least is a superlative.","As requires a second as, not than."),
q("The weather today is ___ than it was yesterday.","better","gooder","best","Good has the irregular comparative better.","Gooder is not the standard form.","Best is superlative."),
q("A train is usually ___ than a bus for this journey.","faster","more fast","fastest","Fast is a short adjective; comparative is faster.","More fast is nonstandard in this basic comparative pattern.","Fastest is superlative."),
q("The final task was ___ challenging than we expected.","more","most","much","Challenging uses more to form the comparative.","Most is superlative.","Much can modify more challenging but cannot replace more.")
]},
"A2-09":{base:"superlative",skillTarget:"superlatives-and-in-group-comparison",profile:{
label:"superlatives — the highest or lowest degree",
core:"Superlatives identify the highest or lowest degree within a group of three or more. Short adjectives commonly take -est, longer adjectives use most, and the definite article the is usually required.",
form:"the + adjective-est; the most + long adjective; the least + adjective. Irregular: good → the best; bad → the worst; far → the farthest/furthest.",
selection:"Определи, что сравнивается внутри группы. Используй the + -est for short adjectives and the most/least for longer adjectives. Проверь spelling and irregular forms.",
contrast:"This is the tallest building in the city. It is the most interesting chapter in the book. This is the least expensive option.",
boundary:"Some adjectives have irregular forms. A possessive determiner can replace the in some contexts (my best result). Do not use comparative than with superlative.",
traps:[
["She is tallest student in the group.","She is the tallest student in the group.","Superlative is normally introduced by the.","The article is missing before tallest."],
["This is the most easiest question.","This is the easiest question.","Easy takes -est; do not combine most with the inflected superlative.","Most duplicates the superlative marking."],
["It was the goodest performance.","It was the best performance.","Good has the irregular superlative best.","Goodest is not the standard form."]
],
examples:[
["Mount Everest is the highest mountain in the world.","Эверест — самая высокая гора в мире.","High forms highest."],
["This is the most useful reference book in the library.","Это самый полезный справочник в библиотеке.","Long adjective uses most."],
["It was the worst day of the trip.","Это был худший день поездки.","Bad has the irregular superlative worst."],
["That is the least complicated solution.","Это наименее сложное решение.","Least expresses the lowest degree."]
],
toefl:"Superlatives help identify the most significant result, strongest evidence or least effective method when summarising information."
},drills:[
q("This is ___ building in our town.","the tallest","tallest than","the most tall","Tall is a short adjective; superlative is the tallest.","Than is used with comparatives, not superlatives.","Most tall is not the usual superlative form for this short adjective."),
q("It was ___ interesting lecture of the whole course.","the most","more","the much","Interesting is a longer adjective; superlative uses the most.","More is comparative, not superlative.","Much cannot replace most in this construction."),
q("That was the ___ meal I have ever had.","best","better","goodest","Good has the irregular superlative best.","Better is comparative.","Goodest is not standard English."),
q("This is the ___ expensive option on the list.","least","less","little","Least + adjective expresses the lowest degree among options.","Less is comparative and usually pairs with than.","Little is a quantifier/adjective, not the superlative marker here."),
q("Who is ___ person in your family?","the oldest","older","the most old","Old forms the superlative oldest with the.","Older is comparative and normally compares two.","The most old is not the normal form for this short adjective."),
q("The final question was ___ difficult of all.","the least","less","little","The least expresses the lowest degree in a group.","Less is comparative, not superlative.","Little is not the superlative structure."),
q("This is ___ chapter in the textbook.","the most useful","more useful","usefulest","Useful forms the superlative with the most.","More useful is comparative.","Usefulest is not the standard form.")
]},

};

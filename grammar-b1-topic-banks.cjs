const q=(prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why)=>[prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why];
module.exports = {
"B1-02":{base:"past",skillTarget:"past-perfect-simple",profile:{
label:"Past Perfect Simple",
core:"Past Perfect Simple показывает, что действие завершилось до другой точки или события в прошлом. Он устанавливает временную перспективу 'раньше того прошлого момента', а не просто обозначает любое прошлое действие.",
form:"Subject + had + past participle (V3). Negative: had not + V3. Question: Had + subject + V3? Все лица используют had.",
selection:"Найди прошлую точку отсчёта. Если событие произошло раньше неё и важно подчеркнуть предшествование или результат к тому моменту, используй had + V3.",
contrast:"When we arrived, the lecture had started — лекция началась раньше приезда. When we arrived, the lecture started — последовательность событий без подчёркивания более раннего старта.",
boundary:"Не ставь Past Perfect автоматически при двух past events: Past Simple подходит, если последовательность ясна. Маркеры before/after часто сами показывают порядок; Past Perfect нужен для временного фокуса.",
skillTarget:"past-perfect-simple"
},drills:[
q("By the time the guests arrived, we ___ dinner.","had prepared","prepared tomorrow","have prepare","Dinner was prepared before the past arrival point; use had + V3.","Past Simple alone does not mark the earlier completion as clearly in this sentence.","Have + base form is not Present Perfect; the reference point is past."),
q("She realised that she ___ the wrong file.","had opened","has open","was open","Opening happened before the past moment of realisation.","Has open is an incorrect auxiliary + participle form.","Was open changes the verb to a state and does not express the earlier action."),
q("___ the train left before you reached the station?","Had","Did","Has","Past Perfect question is formed with Had + subject + V3.","Did would require a base-form main verb and does not mark the earlier-than-past relation.","Has is present perfect, not past reference."),
q("The researchers had not ___ the data before the deadline.","analysed","analyse","analysing","After had not, use past participle analysed.","Analyse is base form, not V3.","Analysing is gerund/participle, not the required complement."),
q("He couldn't enter because he ___ his access card.","had forgotten","has forgotten","was forget","Forgetting occurred before the past inability to enter.","Has forgotten uses present reference, not the past narrative point.","Was forget is not a valid past form."),
q("By 2010, the company ___ three new branches.","had opened","has opened","opens","By 2010 sets a past reference point; the openings were completed before it.","Has opened links the result to the present rather than a past reference point.","Opens is Present Simple."),
q("They ___ the experiment before the supervisor arrived.","had completed","have complete","were complete","Completion preceded the supervisor's arrival.","Have complete is an incorrect present perfect form.","Were complete is a state construction and does not express the earlier action.")
]},
"B1-03":{base:"past",skillTarget:"past-perfect-continuous",profile:{
label:"Past Perfect Continuous",
core:"Past Perfect Continuous подчёркивает длительность или процесс, который продолжался до определённого момента в прошлом. Часто важна причина или видимый результат к этой точке.",
form:"Subject + had been + V-ing. Negative: had not been + V-ing. Question: Had + subject + been + V-ing?",
selection:"Используй форму, когда важно показать, как долго процесс продолжался до прошлого момента, либо объяснить состояние/результат в той точке.",
contrast:"They had been waiting for an hour when the bus arrived — длительность процесса. They had waited for an hour — факт/итог ожидания без такого фокуса на процессе.",
boundary:"Stative verbs обычно не используются в Continuous в своём основном значении. Для завершённого количества/результата часто лучше Past Perfect Simple.",
skillTarget:"past-perfect-continuous"
},drills:[
q("She was tired because she ___ all night.","had been studying","had studied tomorrow","has been study","Длительный процесс до прошлого состояния выражается had been + V-ing.","Had studied не подчёркивает процесс/длительность так явно; tomorrow также противоречит прошлому контексту.","Has been study — неверная форма; после has been требуется V-ing и present reference."),
q("How long ___ they ___ before the train finally came?","had / been waiting","did / waited","have / been wait","Past Perfect Continuous question: had + subject + been + V-ing.","Did требует base form, а waited — past form.","Have been wait не соответствует ни времени, ни V-ing форме."),
q("The ground was wet because it ___ for hours.","had been raining","had rained tomorrow","has rain","Процесс дождя продолжался до прошлого наблюдения; had been raining.","Had rained tomorrow содержит конфликт времени и не оформляет continuous aspect.","Has rain — неверная форма."),
q("He ___ at the company for five years before he moved abroad.","had been working","has worked tomorrow","was work","Длительность процесса до past point: had been working.","Has worked не подходит к завершённой прошлой точке before he moved.","Was work нарушает модель be + V-ing."),
q("They had been discussing the issue when the manager ___.","arrived","had been arrive","arriving","Короткое событие arrived прерывает/обозначает точку процесса.","Had been arrive не является формой Continuous.","Arriving не образует finite clause."),
q("By midnight, I ___ for twelve hours.","had been driving","have driven","was drive","Длительность до past reference point — Past Perfect Continuous.","Have driven связывает опыт/результат с настоящим, а не с past reference point.","Was drive — неверная форма be + V-ing."),
q("The machine stopped because it ___ too quickly.","had been overheating","has overheat","was overheat","Процесс перегрева предшествовал остановке и объясняет её.","Has overheat — неверная форма present perfect.","Was overheat не содержит V-ing.")
]},
"B1-05":{base:"conditional",skillTarget:"second-conditional",profile:{
label:"Second Conditional",
core:"Second Conditional описывает воображаемую, маловероятную или нереальную ситуацию в настоящем/будущем и её возможный результат. Форма Past Simple обозначает дистанцию от реальности, а не обязательно прошлое время.",
form:"If + Past Simple, would + base verb. В условной части с be в формальном/стандартном учебном шаблоне часто используется were для всех лиц: If I were you…",
selection:"Спроси, считаешь ли ты ситуацию воображаемой или маловероятной сейчас/в будущем. Не используй would в обычной if-clause.",
contrast:"If I have time, I will call — реальная возможность (First). If I had more time, I would call — гипотетическая ситуация (Second).",
boundary:"В разговорной речи встречается was вместо were, особенно с I/he/she, но were широко используется в гипотетической конструкции If I were you. Third Conditional относится к нереальному прошлому.",
skillTarget:"second-conditional"
},drills:[
q("If I ___ closer to the university, I would walk there.","lived","live","would live","Second Conditional uses Past Simple in the if-clause for a hypothetical present situation.","Live is present form and suggests a real condition.","Would is not normally used in the if-clause of this pattern."),
q("If she were more confident, she ___ in public.","would speak","will spoke","speaks yesterday","Hypothetical result uses would + base verb.","Will spoke mixes future auxiliary with past form.","Speaks yesterday mixes present tense with a past marker."),
q("If I ___ you, I would check the figures again.","were","am","would be","The conventional hypothetical phrase is If I were you.","Am expresses a real present state, not the hypothetical pattern.","Would be belongs in the result clause, not after if in this pattern."),
q("They would travel more if they ___ enough money.","had","would have","have had","Second Conditional uses Past Simple had in the if-clause.","Would have is not used in the ordinary if-clause here.","Have had is Present Perfect and changes the time/reference."),
q("If the office were nearer, we ___ a taxi.","wouldn't need","won't needed","don't needed","Hypothetical result: would not + base verb.","Won't needed is not a valid verb form.","Don't needed mixes do-support with past form."),
q("What ___ you do if you won the scholarship?","would","will","did","The result clause of Second Conditional uses would + base verb.","Will suggests a more realistic First Conditional future.","Did is past simple and does not express the hypothetical result."),
q("If the weather ___ warmer, we could eat outside.","were","will be","would been","Were is the past form used for a hypothetical present condition.","Will be is not used in the if-clause of Second Conditional.","Would been is not a grammatical verb form.")
]},
"B1-06":{base:"conditional",skillTarget:"third-conditional",profile:{
label:"Third Conditional",
core:"Third Conditional описывает нереальное условие в прошлом и воображаемый результат, который уже не может измениться. Конструкция часто используется для сожаления, критики или анализа альтернативного исхода.",
form:"If + Past Perfect (had + V3), would have + V3. Возможны could have/might have + V3 для способности или менее уверенного возможного результата.",
selection:"Обе части относятся к прошлому, которое уже завершилось. Условная часть использует had + V3, результат — would/could/might have + V3.",
contrast:"If they had left earlier, they would have caught the train. Past Simple описывал бы реальные события, а не альтернативную прошлую ситуацию.",
boundary:"Не путай Third Conditional с Mixed Conditionals: если прошлое условие имеет результат в настоящем, структура меняется. Inversion Had they left… более формальна и разбирается отдельно.",
skillTarget:"third-conditional"
},drills:[
q("If we had booked earlier, we ___ a cheaper room.","would have found","will find","would find yesterday","Нереальный прошлый результат строится would have + V3.","Will find относится к будущему/реальному результату.","Would find без have не выражает Third Conditional past result."),
q("She would have passed the exam if she ___ more.","had studied","studied now","would have studied","Условная часть Third Conditional использует Past Perfect had studied.","Studied now не выражает более раннее нереальное условие.","Would have studied не ставится после if в обычной модели."),
q("If they ___ the warning, the accident might have been avoided.","had noticed","noticed tomorrow","would notice","Had noticed — Past Perfect в if-clause.","Noticed tomorrow противоречит прошлому контексту.","Would notice не используется в обычной if-clause Third Conditional."),
q("I ___ the mistake if I had checked the final page.","would have seen","will see","would see now","Результат нереального прошлого: would have seen.","Will see относится к будущему.","Would see now относится к гипотетическому настоящему, не к прошлому результату."),
q("If the team had tested the device, it ___ the defect.","could have detected","can detect","could detect now","Could have + V3 выражает возможный нереальный результат в прошлом.","Can detect — настоящее ability.","Could detect now — гипотетический настоящий результат, а не Third Conditional."),
q("They would not have missed the flight if they ___ on time.","had arrived","arrive","would arrive","If-clause требует Past Perfect had arrived.","Arrive — Present Simple, не нереальное прошлое.","Would arrive не ставится после if в обычной конструкции."),
q("If I had known about the change, I ___ you.","would have told","will tell","would tell now","Нереальное прошлое result: would have told.","Will tell — будущий результат.","Would tell now — гипотетический настоящий результат.")
]},

"B1-04":{base:"future",skillTarget:"future-in-the-past-and-perfect",profile:{
label:"future forms and future-in-the-past",
core:"Future-in-the-past описывает будущее событие относительно прошлой точки зрения: ожидание, план или прогноз, который существовал тогда. Частые модели — would, was/were going to, was/were about to и was/were due to.",
form:"Would + base verb for future from a past viewpoint. Was/were going to + base verb for past intention. Was/were about to + base verb for an imminent past event. Future Perfect: will have + V3.",
selection:"Найди точку зрения в прошлом, затем определи, передаётся ли план, обещание, близкое событие или завершение к будущему сроку.",
contrast:"She said she would call — future relative to past. She was going to call — earlier intention. She was about to call — action was imminent.",
boundary:"Would также выражает привычное прошлое и conditional meanings; интерпретируй по контексту. После would используется base verb.",
skillTarget:"future-in-the-past-and-perfect"
},drills:[
q("She promised that she ___ the following day.","would return","will returned","would have return","Would + base verb expresses future from a past viewpoint.","Will returned mixes future auxiliary and past form.","Would have return is malformed; Future Perfect would require have + V3 and a different meaning."),
q("They were going to leave, but the meeting ___.","ran late","would ran late","was run late","Past intention is interrupted by a past event; ran is Past Simple.","Would ran is not a valid verb form.","Was run late changes the meaning and is not the active event described."),
q("I knew the results ___ be announced soon.","would","will to","were","Would marks a future event viewed from a past point.","Will to is ungrammatical after the subject in reported past viewpoint.","Were cannot stand before base verb be in this construction."),
q("The train was due ___ at six.","to arrive","arriving","arrive","Be due is followed by to-infinitive.","Arriving does not complete the be due pattern.","Bare infinitive without to is not used after due."),
q("The guests were about ___ when the lights went out.","to arrive","arriving","arrive","Be about to + infinitive expresses an imminent event in the past.","Arriving does not follow about to.","Bare arrive requires to after about."),
q("By the end of the following month, the team ___ the project.","would have completed","would completed","will have complete","Would have + V3 shows completion by a future point viewed from the past.","Would completed omits have and V3 structure.","Will have complete is not the past viewpoint and has the wrong participle."),
q("He said he ___ help us if he had time.","would","will","would to","Reported future intention from a past viewpoint uses would + base verb.","Will does not shift the viewpoint back to the past here.","To is not used after modal would.")
]},
"B1-11":{base:"reporting",skillTarget:"reported-statements-and-backshift",profile:{
label:"reported statements",
core:"Reported statements передают содержание чужих слов без прямой цитаты. Reporting verb вводит reported clause; при past reporting verb время часто сдвигается назад, если контекст не сохраняет исходную временную точку.",
form:"Direct present → reported past; will → would; can → could; present perfect → past perfect (when backshift is needed). Say + clause; tell + object + clause.",
selection:"Проверь reporting verb и временную перспективу. Если reporting verb в прошлом, часто нужен backshift; затем измени pronouns, possessives и time expressions с учётом нового speaker/viewpoint.",
contrast:"She said, 'I am busy' → She said (that) she was busy. She told me (that) she was busy. Не говори *she told that… без object.",
boundary:"Backshift не обязателен, если информация всё ещё истинна или говорящий сознательно сохраняет исходное время. Контекст важнее механического превращения каждого глагола.",
skillTarget:"reported-statements-and-backshift"
},drills:[
q("Direct: 'I work from home.' → He said that he ___ from home.","worked","works","had worked tomorrow","В past reporting clause Present Simple обычно сдвигается в Past Simple.","Works сохраняет прямое настоящее без особой причины.","Had worked tomorrow смешивает past perfect с future time reference."),
q("Direct: 'We have finished.' → They said that they ___ finished.","had","have","would","Present Perfect часто сдвигается в Past Perfect after a past reporting verb.","Have не отражает обычный backshift в этом context.","Would не является формой Present Perfect backshift."),
q("Direct: 'I will call you.' → She said she ___ call me.","would","will to","had","Will обычно меняется на would в reported speech.","Will to содержит лишнее to after modal.","Had требует participle и не передаёт будущее обещание."),
q("He ___ me that the meeting was cancelled.","told","said","spoke","Tell требует indirect object (me) перед reported clause.","Say не используется с прямым object me без to.","Speak обычно не вводит reported clause с таким pattern."),
q("Anna said that she ___ tired.","was","is","has","Исходное am/is в reported statement обычно сдвигается в was after said.","Is может сохраняться, если факт остаётся актуальным, но в стандартном backshift item требуется was.","Has не соответствует adjective complement tired."),
q("Direct: 'I can swim.' → He said he ___ swim.","could","can to","would can","Can обычно сдвигается в could after a past reporting verb.","Can to is ungrammatical; modal is followed by base verb.","Would can stacks two modals and is ungrammatical."),
q("She said that the earth ___ around the sun.","moves","moved yesterday","would move","General truths can retain Present Simple after a past reporting verb.","Moved yesterday changes a permanent scientific fact to a past event.","Would move suggests a future prediction rather than a general truth.")
]},
"B1-12":{base:"reporting",skillTarget:"reported-questions-requests-commands",profile:{
label:"reported questions, requests and commands",
core:"Reported questions передают вопрос в форме embedded clause с порядком слов утвердительного предложения. Requests и commands обычно передаются через ask/tell + object + (not) to-infinitive.",
form:"Wh-question: asked + wh-word + subject + verb. Yes/no question: asked if/whether + subject + verb. Request/command: told/asked + object + (not) to + base verb.",
selection:"Определи тип исходной реплики. Вопрос — используйте statement word order и if/whether для yes/no. Просьба или команда — объект + to-infinitive; отрицание — not to-infinitive.",
contrast:"'Where do you live?' → He asked where I lived. 'Do you smoke?' → She asked if I smoked. 'Don't wait' → He told us not to wait.",
boundary:"Say обычно не вводит recipient перед инфинитивной просьбой; tell/ask требует object. Временной backshift зависит от временной точки и контекста.",
skillTarget:"reported-questions-requests-commands"
},drills:[
q("Direct: 'Where are you going?' → She asked me where I ___.","was going","was I going","am going","Reported question uses subject + verb order and backshift: I was going.","Was I going keeps direct-question inversion inside the reported clause.","Am going does not backshift after asked in this standard past report."),
q("Direct: 'Do you know the answer?' → He asked whether I ___ the answer.","knew","did I know","know","Yes/no reported question uses whether + subject + verb; know backshifts to knew.","Did I know is direct question order, not reported statement order.","Know is not backshifted in the given past-reporting context."),
q("The teacher told us ___ our phones away.","to put","putting","put","Tell + object + to-infinitive reports a command.","Putting does not follow the tell + object pattern.","Bare put needs to after the object in reported command."),
q("She asked me ___ the window.","to open","open","opening","Ask + object + to-infinitive reports a request.","Bare open is not used after asked me in this structure.","Opening does not complete the request pattern."),
q("He told the children ___ run in the corridor.","not to","to not to","don't","Negative command: told + object + not to + base verb.","To not to repeats the infinitive marker.","Don't is a direct imperative, not the reported-command form."),
q("Direct: 'Can you help me?' → She asked if I ___ help her.","could","can to","would can","Can usually backshifts to could in reported question.","Can to is ungrammatical.","Would can combines two modals."),
q("The guide asked visitors ___ touch the display.","not to","don't","not touching","A negative reported request uses ask + object + not to-infinitive.","Don't is the direct imperative form, not the reported-request complement.","Not touching is a gerund phrase and does not complete ask + object + infinitive.")
]},

"B1-13":{base:"verbPattern",skillTarget:"verb-patterns-meaning-change",profile:{
label:"verb patterns and meaning changes",
core:"Некоторые глаголы допускают gerund и to-infinitive, но выбор меняет значение. Remember, forget, stop, try и regret нужно учить вместе с контекстом и значением.",
form:"Remember/forget + V-ing = воспоминание о прошлом действии; + to-infinitive = помнить/забыть выполнить действие. Stop + V-ing = прекратить действие; stop + to-infinitive = остановиться, чтобы выполнить другое действие. Try + V-ing = эксперимент; try + to-infinitive = попытка.",
selection:"Сначала определи временную логику: действие уже произошло или ещё должно быть выполнено? Затем выясни, означает ли stop прекращение привычки или паузу ради другой цели; try — эксперимент или усилие.",
contrast:"I remembered locking the door — помню, что запер. I remembered to lock it — не забыл запереть. He stopped smoking — бросил курить. He stopped to smoke — остановился, чтобы покурить.",
boundary:"Не все gerund/infinitive verbs меняют смысл одинаково. Различия запоминаются лексически и проверяются через контекст, а не по одному общему правилу.",
skillTarget:"verb-patterns-meaning-change"
},drills:[
q("I remember ___ that film when I was a child.","watching","to watch","watch","Remember + V-ing refers to an action experienced in the past.","Remember to watch means remember a future/required action.","Bare infinitive watch is not the complement after remember in this pattern."),
q("Please remember ___ the front door before you leave.","to lock","locking","lock","Remember + to-infinitive means do not forget a required future action.","Remember locking would mean recall the past act of locking.","Bare lock does not follow remember in this structure."),
q("He stopped ___ because it was damaging his health.","smoking","to smoke","smoke","Stop + V-ing means discontinue the activity.","Stop to smoke means pause another activity in order to smoke.","Bare smoke is not the required complement."),
q("During the hike, we stopped ___ some water.","to drink","drinking","drink","Stop + to-infinitive means pause in order to perform another action.","Stop drinking means cease drinking, the opposite of the intended meaning.","Bare drink does not follow stop in this construction."),
q("If the app freezes, try ___ it again.","restarting","to restarting","restart","Try + V-ing suggests testing a possible solution.","To restarting combines two incompatible verb forms.","Bare restart is not the pattern used after try in this experiment meaning."),
q("She tried hard ___ the heavy suitcase, but she could not lift it.","to lift","lifting","lift","Try hard + to-infinitive expresses an effort to do something difficult.","Lifting after try suggests experimenting with an approach rather than making the explicit effort described by tried hard.","Bare lift does not complete the verb pattern after tried hard."),
q("We regret ___ you that your application was unsuccessful.","to inform","informing","inform","Regret + to-infinitive is used for a formal announcement of unwelcome news.","Regret informing would mean feeling sorry about having informed someone earlier.","Bare inform does not follow regret in this structure.")
]},
"B1-14":{base:"relative",skillTarget:"non-defining-relative-clauses",profile:{
label:"non-defining relative clauses",
core:"Non-defining relative clause adds extra information about an already identified person or thing. The main clause remains complete without it; commas mark the additional information.",
form:"Person: , who ... ,; thing: , which ... ,; possession: , whose ... ,; place: , where ... ,. That is not normally used in non-defining clauses.",
selection:"Проверь, нужен ли clause для идентификации noun. Если noun уже конкретен и clause только добавляет информацию, используй non-defining structure with commas.",
contrast:"My brother who lives in Oslo is a doctor — identifies which brother. My brother, who lives in Oslo, is a doctor — adds information about one already identified brother.",
boundary:"Non-defining relative pronoun is not normally omitted. Do not use that. In writing punctuation is essential to distinguish extra information from identifying information.",
skillTarget:"non-defining-relative-clauses"
},drills:[
q("My aunt, ___ lives in Canada, is visiting us.","who","that","where","Who introduces additional information about a person in a non-defining clause.","That is not normally used in non-defining relative clauses.","Where refers to a place, not a person."),
q("The old theatre, ___ was built in 1920, is being restored.","which","that","whose","Which introduces extra information about a thing.","That is not normally used after commas in a non-defining clause.","Whose expresses possession and needs a following noun."),
q("Our university library, ___ has recently been renovated, is open late.","which","that","who","Which refers to the library and introduces additional information.","That is not normally used in non-defining clauses.","Who refers to people."),
q("Professor Lee, ___ research focuses on climate change, gave the lecture.","whose","which","where","Whose expresses possession/association: the professor's research.","Which cannot function as the possessive determiner here.","Where refers to a place."),
q("We visited Kyoto, ___ many historic temples are located.","where","which","who","Where introduces additional information about a place.","Which would need a structure such as in which; the current clause needs a place adverb.","Who refers to a person."),
q("The conference, ___ takes place every spring, attracts researchers worldwide.","which","that","whose","Which introduces an additional clause about the conference.","That is not the normal relative pronoun in non-defining clauses.","Whose would require a possessed noun after it."),
q("My first laptop, ___ I bought at university, still works.","which","that","where","Which is used for an extra non-defining clause about a thing.","That is not normally used in a non-defining clause.","Where refers to a place, not the laptop.")
]},
"B1-16":{base:"question",skillTarget:"question-tags-auxiliaries-indirect-questions",profile:{
label:"question tags, auxiliary verbs and indirect questions",
core:"Question tags turn a statement into a request for confirmation. A positive statement normally takes a negative tag, and a negative statement takes a positive tag. The auxiliary and subject are repeated in the tag.",
form:"Positive statement + negative auxiliary + pronoun? Negative statement + positive auxiliary + pronoun? Use the same auxiliary/modal as the main clause. With Let's use shall we; with imperative often will you.",
selection:"Найди auxiliary в main clause. Если его нет, используй do/does/did. Затем поменяй полярность tag и выбери pronoun, соответствующий subject.",
contrast:"She is ready, isn't she? They haven't arrived, have they? You called, didn't you? Let's begin, shall we?",
boundary:"I am often takes aren't I? in a positive tag. Indefinite pronouns such as everyone/someone commonly take they in the tag. Intonation changes whether the speaker expects confirmation.",
skillTarget:"question-tags-auxiliaries-indirect-questions"
},drills:[
q("You have finished the report, ___?","haven't you","don't you","didn't you","Present Perfect auxiliary have is repeated in the negative tag.","Don't is a do-support form and ignores the auxiliary have.","Didn't refers to Past Simple, not the Present Perfect in the statement."),
q("She doesn't drive, ___?","does she","doesn't she","is she","A negative statement takes a positive tag; does is repeated.","Doesn't keeps the tag negative.","Is she uses be, but the main clause has does."),
q("They went home early, ___?","didn't they","haven't they","weren't they","Past Simple has no auxiliary in the statement, so use did in the tag.","Haven't is Present Perfect and changes the tense.","Weren't uses be, not the Past Simple auxiliary for went."),
q("Let's take a short break, ___?","shall we","will you","don't we","Let's suggestions take the tag shall we.","Will you is normally used with an imperative, not let's.","Don't we does not form the conventional tag for let's."),
q("Open the window, ___?","will you","shall we","do you","Imperatives commonly take will you? as a tag/request.","Shall we is used with let's.","Do you is not the conventional imperative tag."),
q("I'm next on the list, ___?","aren't I","amn't I","isn't I","The conventional positive tag for I am is aren't I?","Amn't I is not the standard form in most varieties of English.","Isn't I has incorrect subject-auxiliary agreement."),
q("Everyone enjoyed the lecture, ___?","didn't they","didn't he","weren't they","Everyone takes singular verb in the statement, but they is commonly used in the tag.","He assumes a gender not given and is not the neutral reference.","Weren't does not match the Past Simple verb enjoyed.")
]},

"B1-17":{base:"clause",skillTarget:"adverbial-clauses-reason-purpose-result-contrast",profile:{
label:"adverbial clauses: reason, purpose, result and contrast",
core:"Adverbial clauses connect a main clause with a reason, purpose, result or contrast. The connector determines both the logical relation and the grammatical structure that follows.",
form:"Reason: because/since/as + clause. Purpose: so that + subject + modal/verb; in order to + infinitive. Result: so + clause; such/so ... that + result clause. Contrast: although/whereas + clause; despite/in spite of + noun or gerund.",
selection:"Определи логическую связь, затем проверь тип complement. Although/because вводят clause; despite/because of — noun phrase or gerund; in order to — infinitive.",
contrast:"Although it was late, we continued. Despite the delay, we continued. We left early so that we could arrive on time. We left early in order to avoid traffic.",
boundary:"Не ставь although и but вместе в одной clause structure. Не путай so (result) с so that (purpose). Корректность зависит от того, что следует после connector.",
skillTarget:"adverbial-clauses-reason-purpose-result-contrast"
},drills:[
q("___ the sample was small, the pattern was consistent.","Although","Despite","Because of","Although introduces a finite clause with subject and verb.","Despite must be followed by a noun phrase or gerund, not a finite clause.","Because of also requires a noun phrase, not a clause."),
q("___ the heavy rain, the event continued.","Despite","Although","Because","Despite is followed by the noun phrase the heavy rain.","Although must introduce a finite clause.","Because also requires a finite clause with subject and verb."),
q("The team repeated the test so that it ___ verify the result.","could","to","because","So that introduces a clause; could verify expresses purpose.","To cannot replace a finite clause subject+verb after so that.","Because introduces reason, not purpose."),
q("The researchers used a control group in order ___ reduce bias.","to","that","for","In order to + base verb expresses purpose.","That does not complete the in order to pattern.","For would require a noun or gerund and a different construction."),
q("The evidence was incomplete, ___ the conclusion remained tentative.","so","although","despite","So introduces the result of the incomplete evidence.","Although introduces contrast and would need a clause structure with the right relation.","Despite requires a noun phrase or gerund, not a finite clause."),
q("The lecture was so complicated ___ many students asked for help.","that","because","although","So + adjective + that introduces a result clause.","Because introduces reason and does not complete the so ... structure.","Although introduces contrast, not the result clause required here."),
q("The method is effective, whereas the alternative ___ less reliable.","is","although","despite","Whereas introduces contrast between two clauses; the second needs finite verb is.","Although is a conjunction, but cannot replace the finite predicate.","Despite requires a noun phrase or gerund, not a finite clause.")
]},
"B1-18":{base:"cohesion",skillTarget:"discourse-markers-paragraph-linking",profile:{
label:"discourse markers and paragraph linking",
core:"Discourse markers make the relationship between sentences and ideas explicit: addition, contrast, concession, result, example or sequence. Their function must match the logical relationship, not merely the sentence position.",
form:"Addition: moreover/furthermore/in addition. Contrast: however/in contrast/on the other hand. Result: therefore/consequently/as a result. Example: for example/for instance. Concession: nevertheless/even so.",
selection:"Назови отношение между двумя идеями. Если вторая добавляет аргумент — moreover; противопоставляет — however/in contrast; выводит результат — therefore/as a result; приводит пример — for example.",
contrast:"The method is cheap. However, it is unreliable (contrast). It is cheap; therefore, it is popular (result). It is cheap. Moreover, it is easy to use (addition).",
boundary:"Discourse marker punctuation depends on syntax: sentence adverbials often follow a full stop or semicolon and take a comma. Do not join independent clauses with a comma alone.",
skillTarget:"discourse-markers-paragraph-linking"
},drills:[
q("The first method is inexpensive. ___, it requires little training.","Moreover","Therefore","Nevertheless","The second sentence adds another supporting advantage; moreover signals addition.","Therefore signals a result, not another independent advantage.","Nevertheless signals concession/contrast, which is not the intended relation."),
q("The sample was very small. ___, the findings should be treated cautiously.","Therefore","For example","Furthermore","The cautious interpretation follows as a result of the small sample.","For example introduces an illustration, not a conclusion.","Furthermore adds information rather than signalling a conclusion."),
q("The software is powerful. ___, it is difficult for beginners to use.","However","Consequently","For instance","The second sentence contrasts with the positive evaluation; however marks contrast.","Consequently marks result, not contrast.","For instance introduces an example, but no example is given."),
q("Several factors influenced the outcome. ___, temperature and humidity played a role.","For example","Nevertheless","Therefore","The second sentence illustrates the first with specific examples.","Nevertheless marks concession, not illustration.","Therefore marks a conclusion/result, not an example."),
q("The procedure is time-consuming. ___, it produces reliable results.","Nevertheless","In addition","As a result","The second point concedes a positive feature despite the disadvantage.","In addition simply adds an idea and misses the concessive relation.","As a result implies consequence rather than contrast."),
q("The study involved only twelve people; ___, its results cannot be generalised widely.","therefore","moreover","for example","The limited sample leads to a consequence: restricted generalisation.","Moreover signals addition, not consequence.","For example introduces an illustration."),
q("The control group received no treatment. ___, the experimental group received the new medication.","In contrast","As a result","For example","The two groups are directly contrasted.","As a result implies causation, not a contrast between groups.","For example would introduce an instance, not the contrasting group.")
]},
"B1-19":{base:"nounPhrase",skillTarget:"noun-phrase-head-and-agreement",profile:{
label:"noun phrases, determiners and agreement",
core:"В длинной noun phrase согласование определяется грамматическим ядром (head noun), а не ближайшим существительным внутри prepositional phrase. Determiners и modifiers помогают понять, какое именно существительное является главным.",
form:"The + adjective + head noun + of-phrase. Singular head → singular verb; plural head → plural verb. A number of + plural noun generally takes plural verb; the number of + plural noun takes singular verb.",
selection:"Найди главное существительное без отвлекающих modifiers и prepositional phrases. Затем согласуй verb с head noun, а determiner — с числом и значением.",
contrast:"The list of names is long — head = list. The names on the list are correct — head = names. A number of students are absent; the number of students is rising.",
boundary:"Collective nouns and expressions such as none/all/some may show agreement variation. This lesson concentrates on clear head-noun agreement and common determiner patterns.",
skillTarget:"noun-phrase-head-and-agreement"
},drills:[
q("The list of required documents ___ on the website.","is","are","have","The head noun is singular list; the of-phrase does not control agreement.","Are incorrectly agrees with the nearer plural noun documents.","Have cannot act as the singular linking verb required here."),
q("A number of students ___ applied for the scholarship.","have","has","is","A number of + plural noun normally takes plural agreement.","Has incorrectly treats number as the head in this expression.","Is does not agree with the plural subject and changes the predicate."),
q("The number of applicants ___ increased this year.","has","have","are","The grammatical head is number, singular; use has.","Have agrees with applicants, which is inside the of-phrase.","Are is plural and cannot agree with singular head number."),
q("One of the experiments ___ produced a different result.","has","have","are","The head of the subject is one; use singular has.","Have incorrectly agrees with experiments inside the of-phrase.","Are is plural and does not agree with one."),
q("The results of the final analysis ___ available online.","are","is","has","The head noun is results, plural; use are.","Is is singular and does not agree with results.","Has is singular and does not agree with plural head noun."),
q("Every one of the participants ___ received an ID card.","has","have","are","Every one is singular and takes has.","Have incorrectly agrees with participants rather than every one.","Are cannot serve as a plural verb for the singular subject."),
q("The quality of the printed images ___ poor.","is","are","have","Quality is the singular head noun; the of-phrase images does not control agreement.","Are incorrectly agrees with images inside the of-phrase.","Have is not the appropriate singular linking verb here.")
]},
"B1-20":{base:"phrasal",skillTarget:"phrasal-verbs-dependent-prepositions-b1",profile:{
label:"phrasal verbs and dependent prepositions",
core:"На этом уровне важно распознавать устойчивые multi-word verbs в учебных и рабочих контекстах, различать particle и dependent preposition и запоминать управление всей конструкции.",
form:"Carry out an experiment; look into a problem; come up with an idea; deal with a situation; put up with noise; look forward to + noun/V-ing. Inseparable patterns keep object after the preposition/particle.",
selection:"Определи значение по полному сочетанию, затем проверь управление. После preposition to в look forward to используется noun or V-ing, не infinitive.",
contrast:"We carried out the test (conducted it). We looked into the complaint (investigated it). I look forward to meeting you (to is a preposition).",
boundary:"Некоторые multi-word verbs are separable, others are inseparable; some include a true preposition rather than an adverb particle. Learn the pattern with its object and meaning.",
skillTarget:"phrasal-verbs-dependent-prepositions-b1"
},drills:[
q("The research team will carry ___ a series of interviews.","out","off","after","Carry out means conduct or perform an activity.","Carry off means succeed in doing something difficult or remove something.","Carry after is not the required multi-word verb."),
q("The committee agreed to look ___ the complaint.","into","up","off","Look into means investigate.","Look up means search for information or improve.","Look off does not mean investigate."),
q("We need to come ___ a better solution.","up with","up to","out of","Come up with means produce or think of an idea.","Come up to means approach or meet a standard.","Come out of means emerge from, not formulate."),
q("I look forward to ___ from you.","hearing","hear","to hear","In look forward to, to is a preposition and is followed by gerund.","Hear is a base verb and cannot follow a preposition directly.","To hear incorrectly treats the final to as an infinitive marker."),
q("The manager had to deal ___ several unexpected problems.","with","about","for","Deal with is the standard collocation meaning handle.","About does not follow deal in this meaning.","For changes the construction and is not the dependent preposition."),
q("She cannot put ___ the constant noise any longer.","up with","up to","out of","Put up with means tolerate.","Put up to means encourage someone to do something.","Out of does not form the verb meaning tolerate."),
q("The scientists carried ___ the experiment twice.","out","on","over","Carry out means perform/conduct an experiment.","Carry on means continue an activity, not conduct a particular experiment.","Carry over means transfer to another time or context.")
]},
"B1-21":{base:"participle",skillTarget:"participle-clauses-introduction",profile:{
label:"participle clauses and reduced relatives — introduction",
core:"Participle clauses сокращают относительные или обстоятельственные придаточные. Present participle (-ing) обычно показывает активное/одновременное действие; past participle (V3) — passive meaning или завершённый результат.",
form:"The students who are waiting outside → the students waiting outside. The report that was published yesterday → the report published yesterday. Having + V3 can mark an earlier completed action.",
selection:"Определи, выполняет ли antecedent действие или получает его. Проверь, совпадает ли логический субъект participle clause с subject основной части, чтобы избежать dangling modifier.",
contrast:"The woman waiting outside is my tutor (she waits). The documents signed yesterday are ready (documents were signed). Having finished the task, we went home (we finished first).",
boundary:"Participle clauses должны иметь понятный логический субъект. Временные и аспектуальные отношения зависят от формы; perfect/passive participle combinations и сложные non-finite clauses изучаются далее.",
skillTarget:"participle-clauses-introduction"
},drills:[
q("The students ___ outside the classroom are waiting for the teacher.","standing","stood","stand","Standing is an active present participle describing what the students are doing.","Stood is a past-tense verb and does not reduce the relative clause in this structure.","Stand is a finite base verb, not the reduced modifier."),
q("The documents ___ yesterday are on the desk.","signed","signing","sign","The documents receive the action; past participle signed gives passive meaning.","Signing would mean the documents are performing the action.","Sign is a base verb and cannot modify the noun in this reduced clause."),
q("___ the instructions, we started the task.","Having read","Have read","Reading had","Having + V3 shows the reading was completed before the next action.","Have read is a finite present perfect and cannot function as this introductory participle clause.","Reading had is not a grammatical participle construction."),
q("The woman ___ near the entrance is our new lecturer.","waiting","waited","wait","Waiting is an active participle clause equivalent to who is waiting.","Waited suggests passive/past meaning and does not fit the woman as the active waiter.","Wait is a finite/base verb, not a reduced modifier."),
q("The article ___ by the committee was published online.","approved","approving","approve","Approved is a past participle; the article receives the action.","Approving would imply the article performs approval.","Approve is a base verb, not the required participle."),
q("___ the deadline, the team submitted the report early.","Knowing","Known","Know","Knowing introduces an active participle clause with the team as the understood subject.","Known is a past participle and would need a passive meaning.","Know is a finite/base form and cannot introduce this modifier."),
q("The technician repaired the device, ___ the damaged part.","replacing","replaced","replace","Replacing gives an accompanying action performed by the technician.","Replaced would suggest passive/past meaning and lacks a clear subject in this supplement.","Replace is a base form, not a participle.")
]},
"B1-07":{base:"passive",skillTarget:"passive-core-tenses-and-agent",profile:{
label:"Passive Voice — core tenses and agent",
core:"Passive Voice выдвигает на первый план действие или объект действия, а не исполнителя. Он образуется с be в нужном времени + past participle (V3); агент с by указывается, когда важен.",
form:"Present Simple passive: am/is/are + V3. Past Simple: was/were + V3. Present Perfect: have/has been + V3. Future: will be + V3. Agent: by + noun/pronoun.",
selection:"Выбирай passive, когда важен результат/объект, исполнитель неизвестен, очевиден или несущественен. Согласуй be с subject и временем; основной глагол ставь в V3.",
contrast:"The team analysed the samples (active). The samples were analysed by the team (passive). Object active sentence becomes subject passive.",
boundary:"Не каждый глагол допускает passive; непереходные глаголы обычно не имеют direct object. Passive не заменяет active во всех случаях.",
skillTarget:"passive-core-tenses-and-agent"
},drills:[
q("The samples ___ in a secure laboratory yesterday.","were stored","stored","are store","Past Simple passive: were + V3; samples — plural.","Stored без be не образует полную passive construction.","Are store — неверная форма и настоящее время."),
q("The final report ___ every December.","is published","publishes by the team","is publish","Present Simple passive: is + V3; report — singular.","Publishes by the team смешивает active verb с by-agent.","После is требуется V3 published."),
q("The data have ___ by two independent teams.","been checked","checking","be checked","Present Perfect passive = have been + V3.","Checking не подходит после have в этой конструкции.","Be checked пропускает форму been."),
q("A new bridge ___ next year.","will be built","will build by engineers","is build","Future passive = will be + V3.","Will build by engineers использует active voice и неверно присоединяет agent.","После is требуется V3, но здесь речь о будущем."),
q("The first vaccine ___ in the nineteenth century.","was developed","developed by researchers","has develop","Past Simple passive: was + V3.","Developed без be не образует полную passive clause.","Has develop — неверная форма и не соответствует завершённому прошлому."),
q("The results ___ not discussed at the meeting.","were","did","was being","Plural subject results requires were not + V3.","Did не образует passive voice.","Was being is singular and would require a different continuation."),
q("The new policy was introduced ___ the university board.","by","with","from","By identifies the agent that performed the action.","With usually expresses instrument/accompaniment, not agent.","From signals source/origin, not performer.")
]},
"B1-08":{base:"causative",skillTarget:"causative-have-get-something-done",profile:{
label:"Causative have/get something done",
core:"Causative have/get something done показывает, что человек организовал услугу или поручил действие другому исполнителю; subject не выполняет работу лично.",
form:"Have + object + V3. Get + object + V3. Tense is carried by have/get: had the car repaired; is getting the roof fixed; will have the documents translated.",
selection:"Используй causative, когда субъект организует услугу/работу над объектом. После object нужна V3, а не base verb или V-ing.",
contrast:"I repaired my phone — я сам(а) починил(а). I had my phone repaired — я организовал(а) ремонт у другого человека.",
boundary:"Have someone do something и have something done — разные структуры: в первой после object идёт bare infinitive, во второй — V3. Causative также может описывать неприятный опыт.",
skillTarget:"causative-have-get-something-done"
},drills:[
q("We had the windows ___ last week.","cleaned","clean","cleaning","Have + object + V3 показывает, что услугу организовали.","Clean — base form, не past participle.","Cleaning — gerund, не V3."),
q("She is getting her laptop ___.","repaired","repair","repairing","Get + object + V3 обозначает, что ноутбук ремонтируют для неё.","Repair — base form, не V3.","Repairing не является нужной формой после object."),
q("They will have the documents ___ into English.","translated","translate","translating","Have + object + V3: documents translated.","Translate — base form, не past participle.","Translating — V-ing, не V3."),
q("I had my passport ___ before the trip.","renewed","renew","renewing","После object passport требуется V3 renewed.","Renew — base form.","Renewing не подходит после have + object."),
q("He got his suit ___ for the interview.","altered","alter","altering","Get + object + V3 означает, что костюм подогнали для него.","Alter — base form.","Altering — V-ing, не V3."),
q("We are having the kitchen ___.","renovated","renovate","renovating","Have + object + V3; kitchen — объект услуги.","Renovate — base form, отсутствует V3.","Renovating не завершает causative passive pattern."),
q("She had her phone ___ while she was travelling.","stolen","steal","stealing","Had something stolen describes an unpleasant event that happened to the subject.","Steal — base form, not V3.","Stealing — V-ing, not past participle.")
]},

"B1-09":{base:"modal",skillTarget:"modals-obligation-advice-probability",profile:{
label:"modals for obligation, advice and probability",
core:"Modal verbs express obligation, absence of necessity, prohibition, advice, permission and possibility. The choice changes the strength of the speaker's position.",
form:"Must/should/may/might/can + base verb. Have to requires do-support in questions/negatives. Don't have to = no necessity; mustn't = prohibition.",
selection:"Различай obligation (must/have to), advice (should), permission/possibility (may/can/might), prohibition (mustn't). Не считай mustn't и don't have to синонимами.",
contrast:"You mustn't park here — prohibited. You don't have to come — optional. You should check the source — advice.",
boundary:"Must and have to can be close in meaning but differ in speaker focus and context. Modal is followed by base verb without to or -s.",
skillTarget:"modals-obligation-advice-probability"
},drills:[
q("Visitors ___ wear safety glasses in this laboratory.","must","must to","musts","Must expresses a compulsory rule and takes a base verb.","To is not used after modal must.","Modal must does not take third-person -s."),
q("You ___ submit the form today; tomorrow is also acceptable.","don't have to","mustn't","can't to","Don't have to means there is no necessity to submit it today.","Mustn't means submitting it is prohibited.","Can't to is ungrammatical."),
q("You ___ enter the restricted area without permission.","mustn't","don't have to","might","Mustn't expresses prohibition.","Don't have to means optional, not forbidden.","Might expresses possibility, not a rule."),
q("You ___ check the source before citing it.","should","should to","shoulds","Should expresses advice and takes a base verb.","To is not used after should.","Modal should does not take -s."),
q("___ we have to register before the lecture?","Do","Must to","Are","Have to in a Present Simple question requires do-support.","Must to is ungrammatical.","Are does not form the question with have to."),
q("The museum ___ be open on Sundays, but check the website.","may","must to","may to","May expresses possibility and is followed by a base verb.","To is not used after modal must.","To is not used after may."),
q("You ___ bring your laptop; computers are provided.","don't have to","mustn't","shouldn't to","Don't have to expresses no necessity.","Mustn't would prohibit bringing a laptop, which is not the meaning.","Shouldn't to is ungrammatical.")
]},
"B1-10":{base:"modal",skillTarget:"modal-deduction-present-past",profile:{
label:"modal deduction in present and past",
core:"Modal deduction expresses a conclusion based on available evidence. Must indicates a strong positive inference; can't a strong negative inference; may/might/could a less certain possibility. Past deduction uses modal + have + V3.",
form:"Present: must/can't/may/might/could + base verb or be. Past: must/can't/may/might/could + have + V3.",
selection:"Оцени силу evidence и временную точку. Для настоящего — modal + base form; для вывода о прошлом — modal + have + V3.",
contrast:"She must be at work — strong inference now. She must have left — strong inference about a past event. She might have forgotten — less certain past possibility.",
boundary:"Must not usually expresses prohibition, not negative deduction; strong negative deduction is commonly can't. Context determines the degree of certainty.",
skillTarget:"modal-deduction-present-past"
},drills:[
q("The laboratory is dark and locked. The staff ___ have gone home.","must","can't","must to","The evidence strongly supports a positive inference about a completed departure: must have gone.","Can't would express the opposite strong negative inference.","To is not used after must."),
q("The student has not replied; she ___ be taking an exam.","might","mustn't","might have","Might be expresses a possible present explanation.","Mustn't expresses prohibition, not deduction.","Might have requires V3 and refers to a past event."),
q("The fire alarm is sounding and smoke is visible. The building ___ be safe to enter.","cannot","must","could not have","Visible smoke and an active alarm strongly support the negative deduction that the building is not safe to enter.","Must expresses the opposite strong positive deduction.","Could not have refers to a past event and requires a past participle."),
q("The ground is wet. It ___ have rained overnight.","must","must to","must be","Must have + V3 expresses a strong inference about a past event.","To is not used after modal must.","Must be describes a present state rather than the inferred past event."),
q("He looks exhausted. He ___ have slept very little.","may","may to","may be","May have slept expresses a possible explanation for a present state.","To is not used after modal may.","May be slept is not a valid past deduction form."),
q("The keys are missing. I ___ have left them at the office.","might","might to","might be","Might have left expresses a less certain possibility about a past action.","To is not used after modal might.","Might be is present possibility and does not express the past action."),
q("That explanation ___ be correct: it contradicts the recorded results.","can't","must","must have","Contradictory evidence supports the negative inference can't be correct.","Must expresses a strong positive inference.","Must have refers to a past event and requires a V3.")
]},
"B1-15":{base:"usedto",skillTarget:"used-to-would-be-get-used-to",profile:{
label:"used to, would, be used to and get used to",
core:"Used to describes past states or repeated habits that no longer apply. Would can describe repeated past actions but not normally past states. Be used to means be accustomed to; get used to means become accustomed to.",
form:"Used to + base verb. Would + base verb for repeated past actions. Be/get used to + noun or V-ing. Negative/question for used to: didn't use to / Did ... use to?",
selection:"Определи, говоришь ли ты о прошлом привычном факте, повторявшемся действии, текущем знакомстве с чем-либо или процессе привыкания.",
contrast:"I used to live in Rome (past state). I would walk there every day (repeated action). I'm used to waking up early (accustomed). I'm getting used to the new schedule (adapting).",
boundary:"Would is not normally used for past states such as live/know/be. After be/get used to, to is a preposition and takes a noun or gerund, not a bare infinitive.",
skillTarget:"used-to-would-be-get-used-to"
},drills:[
q("I ___ live near the sea, but now I live in the city.","used to","would","am used to","Used to describes a past state that is no longer true.","Would is not normally used for a past state such as live.","Am used to means accustomed now, not a former state."),
q("When we were children, we ___ play outside until dark.","would","were used to","get used to","Would can describe a repeated past action/habit.","Were used to means were accustomed to and normally takes noun/V-ing.","Get used to describes becoming accustomed, not repeated past action."),
q("She is used to ___ in a noisy office.","working","work","to work","Be used to + V-ing because to is a preposition.","Base work cannot follow the preposition to.","To work is an infinitive and is not the complement after be used to."),
q("It took me several weeks to get used to ___ early.","waking up","wake up","woke up","Get used to + V-ing expresses becoming accustomed to an activity.","Bare wake up does not follow preposition to.","Woke up is Past Simple, not the gerund complement."),
q("Did you ___ have a bicycle at school?","use to","used to","would","After did, use the base form use to.","Used to duplicates the past marker did.","Would does not form this question pattern for a past state of possession."),
q("I didn't ___ drink coffee, but now I have two cups a day.","use to","used to","would","After didn't, use the base form use to.","Used to duplicates the past marker didn't.","Would is not used in this negative pattern and is not the right description of a past state."),
q("He ___ know everyone in the village before he moved away.","used to","would","is used to","Used to describes a past state of knowing.","Would is not normally used with stative know in this meaning.","Is used to describes a present state of being accustomed.")
]},
"B1-01":{base:"perfect",skillTarget:"present-perfect-continuous-duration",profile:{
label:"Present Perfect Continuous — duration and ongoing activity",
core:"Present Perfect Continuous connects a process that began in the past with the present. It emphasizes duration, ongoing activity or visible present evidence of a recent process.",
form:"Subject + have/has been + V-ing. Negative: haven't/hasn't been + V-ing. Question: Have/Has + subject + been + V-ing? For duration use for/since/how long.",
selection:"Выбирай Present Perfect Continuous, если важен процесс или его длительность до настоящего момента. Для количества завершённых результатов часто используется Present Perfect Simple.",
contrast:"I have been studying for three hours (focus on process/duration). I have written three pages (focus on completed result/quantity).",
boundary:"Stative verbs (know, believe, own) usually avoid Continuous. Some dynamic verbs can use both forms with different focus. A recently finished activity may still use this tense if its evidence is visible now.",
pronunciation:"Have/has been часто редуцируется в речи; слушай последовательность auxiliary + been + -ing. For and since помогают распознать длительность, но смысл важнее marker.",
traps:[
["She has been study all morning.","She has been studying all morning.","Present Perfect Continuous requires have/has been + V-ing.","Study is the base form and cannot follow been in this structure."],
["I have been knowing him for years.","I have known him for years.","Know is normally stative and uses Present Perfect Simple.","Have been knowing is not the standard form for a continuing state of knowledge."],
["They have worked here for two hours and are still working (focus on ongoing process).","They have been working here for two hours.","Continuous emphasizes the ongoing activity and duration.","Present Perfect Simple is possible with some verbs, but the target meaning here foregrounds the process."]
],
examples:[
["I have been learning Italian since September.","Я учу итальянский с сентября.","Activity began in the past and continues now."],
["How long have you been waiting?","Как долго ты ждёшь?","Question focuses on duration."],
["The ground is wet because it has been raining.","Земля мокрая, потому что шёл дождь.","Recent process explains present evidence."],
["She hasn't been sleeping well recently.","В последнее время она плохо спит.","Negative continuing/recent pattern."]
],
toefl:"This aspect is useful for describing ongoing preparation, trends and processes in Speaking and Writing; keep it distinct from quantity-focused Present Perfect Simple."
},drills:[
q("I ___ English for two hours, and I am still studying.","have been practising","practised yesterday","has been practising","The activity began in the past and continues now; I takes have been + V-ing.","Practised yesterday is Past Simple and does not show continuation to the present.","Has does not agree with I."),
q("How long ___ you ___ for the exam?","have / been preparing","did / been preparing","has / prepare","Present Perfect Continuous question: have + subject + been + V-ing.","Did cannot combine with been preparing in this tense.","Has does not agree with you and prepare needs -ing."),
q("She is tired because she ___ all morning.","has been working","worked last month","have worked","The ongoing/recent process explains the current tiredness; she takes has been working.","Worked last month is a finished past event and does not explain the current process.","Have does not agree with she and the target emphasizes duration/process."),
q("They ___ in this laboratory since 2023.","have been working","are working yesterday","has been working","They takes have been + V-ing; since 2023 marks the starting point of a continuing activity.","Are working yesterday mixes present continuous with a past marker.","Has does not agree with they."),
q("I ___ well recently, so I feel tired.","haven't been sleeping","didn't been sleeping","hasn't been sleeping","Present Perfect Continuous negative: have not been + V-ing with I.","Didn't cannot be combined with been in this structure.","Hasn't does not agree with I."),
q("The children ___ outside for an hour.","have been playing","has been playing","played tomorrow","Plural subject children takes have been playing; for an hour marks duration.","Has does not agree with plural children.","Played tomorrow is an incorrect past/future combination."),
q("Which sentence focuses on the completed quantity rather than the ongoing process?","I have written five emails.","I have been writing all morning.","I have been writing five emails since nine.","Have written + number focuses on the completed quantity of emails.","Have been writing all morning focuses on activity duration.","Have been writing five emails since nine is possible, but it foregrounds the process over the completed quantity.")
]},
"B1-22":{base:"comparison",skillTarget:"advanced-comparatives-degree-modifiers",profile:{
label:"advanced comparison and degree modifiers",
core:"Advanced comparison uses intensifiers and quantifiers to express the size of a difference, parallel change and proportional relationships. The modifier must match the comparative form.",
form:"Much/far/a lot + comparative; slightly/a little + comparative; by far + superlative; no + comparative + than; the + comparative..., the + comparative....",
selection:"Определи, насколько велика разница, и выбери compatible modifier: much/far для сильной разницы, slightly/a little для небольшой, by far для выделения суперлатива.",
contrast:"The second model is far more reliable. The results are slightly better. The more carefully the data are collected, the more reliable the conclusion becomes.",
boundary:"Do not combine very with a comparative (*very better). By far usually modifies a superlative; no more than and not more than can have distinct meanings in context.",
pronunciation:"Stress often falls on the degree modifier when contrasting the size of a difference: MUCH better, SLIGHTLY higher, BY FAR the best.",
traps:[
["This version is very more accurate.","This version is much more accurate.","Much/far/a lot modify comparatives; very does not normally modify a comparative.","Very more combines two incompatible degree patterns."],
["The results are by far better.","The results are by far the best.","By far typically intensifies a superlative.","Better is comparative; by far is used here with the superlative."],
["The more you practise, better you become.","The more you practise, the better you become.","Correlative comparative requires the before both comparative clauses.","The second clause is missing the required the."]
],
examples:[
["The revised model is considerably more efficient than the original.","Пересмотренная модель значительно эффективнее исходной.","Considerably modifies a comparative phrase."],
["The second estimate is slightly lower.","Вторая оценка немного ниже.","Slightly marks a small difference."],
["This is by far the most reliable method.","Это безусловно самый надёжный метод.","By far intensifies the superlative."],
["The more evidence we collect, the clearer the pattern becomes.","Чем больше доказательств мы собираем, тем яснее становится закономерность.","The…the comparative expresses proportional change."]
],
toefl:"Advanced comparison supports precise synthesis of data and evidence in Reading/Writing and helps describe trends without exaggerating the size of a difference."
},drills:[
q("The revised model is ___ more accurate than the previous one.","far","very","most","Far can modify a comparative adjective to indicate a large difference.","Very cannot directly modify a comparative; use much more or far more.","Most forms a superlative and cannot fit before more accurate in this structure."),
q("The second result is ___ higher than the first, but the difference is small.","slightly","by far","most","Slightly expresses a small degree of difference and modifies the comparative higher.","By far emphasizes a large distinction and usually intensifies a superlative.","Most is a superlative marker, not the modifier for higher here."),
q("This is ___ the most comprehensive review available.","by far","much more","slightly","By far can intensify a superlative phrase.","Much more is used with a comparative, not before the superlative most comprehensive.","Slightly would understate rather than emphasize the superlative."),
q("The more carefully the data are checked, ___ reliable the conclusion becomes.","the more","more","the most","The…the comparative structure requires the before the second comparative phrase.","More omits the required correlative the.","The most is a superlative, not the comparative structure."),
q("The new sample is no ___ representative than the old one.","more","most","much","No more ... than is the comparative pattern.","Most is a superlative and does not fit no + comparative + than.","Much modifies a comparative but the structure requires more."),
q("The final estimate is a little ___ than the initial estimate.","lower","lowest","more low","A little modifies the comparative lower and signals a small difference.","Lowest is superlative.","More low is not the normal form for the short adjective low."),
q("Of the three proposals, this one is ___ the least expensive.","by far","far more","slightly more","By far intensifies the superlative least expensive.","Far more would create a comparative phrase and conflict with least expensive.","Slightly more is a comparative, not a modifier of a superlative.")
]}
};


const q=(prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why)=>[prompt,answer,wrong1,wrong2,why,wrong1Why,wrong2Why];
module.exports = {
"B2-01":{base:"conditional",skillTarget:"mixed-conditionals-wish-if-only",profile:{
label:"Mixed Conditionals, wish and if only",
core:"Mixed Conditional связывает условие и результат, относящиеся к разным временным точкам: прошлое условие может объяснять настоящее состояние, а гипотетическое настоящее — прошлый результат. Wish/if only выражают сожаление или желание изменить факт.",
form:"Past condition → present result: If + Past Perfect, would + base verb. Present condition → past result: If + Past Simple, would have + V3. Wish/if only + Past Simple for present unreality; + Past Perfect for past regret.",
selection:"Проверь время условия и время результата отдельно. Затем выбери соответствующую часть: Past Perfect для нереального прошлого, Past Simple для нереального настоящего, would have + V3 для прошлого результата.",
contrast:"If I had studied medicine, I would be a doctor now (past→present). If I were more careful, I wouldn't have made that mistake (present→past). I wish I had checked the date (past regret).",
boundary:"Would обычно не ставится в if-clause. Wish + would часто выражает раздражение или желание изменить поведение; это не то же самое, что wish + past/past perfect.",
skillTarget:"mixed-conditionals-wish-if-only"
},drills:[
q("If she had taken the earlier train, she ___ here now.","would be","would have been yesterday","will be","Past condition (had taken) leads to a present result (would be).","Would have been places the result in the past, not now.","Will be expresses a real future, not a mixed hypothetical."),
q("If I were more organised, I ___ the deadline yesterday.","wouldn't have missed","wouldn't miss now","won't miss","Present hypothetical condition has a past result: would not have + V3.","Wouldn't miss describes a present/future result, not yesterday.","Won't miss is a real future form."),
q("I wish I ___ the instructions before starting the task.","had read","read tomorrow","would read","Wish + Past Perfect expresses regret about an earlier past action.","Read tomorrow does not express past regret.","Would read expresses willingness/future change, not the past regret intended."),
q("If they had booked a table, we ___ in the queue now.","wouldn't be waiting","wouldn't have waited yesterday","won't wait","Past condition (had booked) explains the present situation (not waiting now).","Wouldn't have waited places the result in the past.","Won't wait is future, not a present result."),
q("If only he ___ so impatient; he could work better with the team.","weren't","hadn't been yesterday","wouldn't be tomorrow","If only + Past Simple expresses a wish about a present situation.","Hadn't been refers to a past regret, not the current character trait.","Wouldn't be is not the standard form for a present unreal wish here."),
q("I wish we ___ to a different city; then we would still live near the coast.","had moved","moved tomorrow","would move","Wish + Past Perfect expresses regret about a past move.","Moved tomorrow is a future fact and doesn't express regret.","Would move expresses willingness or future intention."),
q("If he weren't afraid of flying, he ___ us on the trip last month.","would have joined","would join now","will join","A present unreal condition (weren't afraid) has a hypothetical past result.","Would join gives a present/future result.","Will join is a real future form.")
]},
"B2-02":{base:"conditional",skillTarget:"advanced-condition-markers",profile:{
label:"advanced condition markers",
core:"Advanced condition markers express restrictions, sufficient conditions, unexpected conditions and hypothetical framing. They differ in meaning and in the clause or phrase they introduce.",
form:"Provided/providing that, on condition that, as long as + clause. In case + clause (precaution). Even if + clause (condition does not change result). Unless = if not. Supposing + clause introduces a hypothetical possibility.",
selection:"Определи логическую силу: условие обязательно, достаточно, допускается несмотря на обстоятельства или принимается мера предосторожности на случай события.",
contrast:"You may leave provided that you sign out (condition). Take a charger in case the battery runs low (precaution). Even if it rains, we will go (result remains).",
boundary:"In case is not interchangeable with if: it motivates preparation before a possible event. Unless already contains negation and should not normally be combined with another negative in the same condition.",
skillTarget:"advanced-condition-markers"
},drills:[
q("You can borrow the equipment ___ you return it by Friday.","provided that","even if","in case","Provided that introduces a necessary condition for permission.","Even if means the result remains true regardless of the condition.","In case expresses precaution, not a condition for granting permission."),
q("Take a printed map ___ your phone battery dies.","in case","unless","even if","In case introduces a possible future event for which preparation is made.","Unless means if not and changes the logic.","Even if means the outcome holds regardless; it does not express precaution."),
q("___ the cost increases, the project will continue.","Even if","Provided that","In case","Even if signals that the result remains the same despite the condition.","Provided that makes the condition a requirement for the result.","In case means as a precaution and does not fit this concessive condition."),
q("The contract is valid ___ both parties sign it.","on condition that","even if","in case","On condition that introduces a requirement that must be satisfied.","Even if removes the necessity of the condition.","In case expresses precaution rather than a binding condition."),
q("You may use the lab ___ you follow the safety rules.","as long as","in case","even though","As long as means provided that in this condition.","In case would mean use the lab as a precaution, not under a requirement.","Even though introduces a fact/concession, not a sufficient condition."),
q("___ you were offered the position, would you accept it?","Supposing","Unless","In case","Supposing introduces a hypothetical possibility for discussion.","Unless means if not and does not fit a hypothetical question here.","In case is used for precaution, not a hypothetical question."),
q("The team will not publish the data ___ the consent forms are complete.","unless","even if","in case","Unless means if not: publication is withheld if forms are incomplete.","Even if would mean publication proceeds regardless of whether the forms are complete.","In case is not the negative condition required here.")
]},
"B2-03":{base:"modal",skillTarget:"advanced-modality-modal-perfect",profile:{label:"advanced modality and modal perfect",
core:"Modality covers ability, possibility, deduction, obligation, absence of necessity, advice, expectation, requests and offers. Modal perfect forms evaluate past actions or events from a later viewpoint.",
form:"Can/could/be able to; must/can't + base verb or have + V3; may/might/could + base verb or have + V3; must/have to; mustn't vs needn't/don't have to; should/ought to/had better; needn't have vs didn't need to; mandative should/subjunctive.",
selection:"Identify the modal function and time reference. Distinguish evidence-based deduction from obligation, prohibition from no necessity, and specific past success from general ability. Choose perfect forms only when the meaning concerns an earlier event.",
contrast:"Must have left = strong deduction; might have left = possibility. Mustn't tell = prohibition; needn't tell = no necessity. Needn't have booked = booked but unnecessary; didn't need to book = occurrence unspecified.",
boundary:"Modal meanings are context-sensitive. Must can express obligation or deduction; should have can express regret/criticism; had better is situation-specific. Do not treat all modal perfects as past tense."
},drills:[
q("You ___ have brought a printed copy; the digital version was enough.","needn't","mustn't","couldn't","Needn't have + V3 means the action happened but was unnecessary.","Mustn't have does not express lack of necessity in this sense.","Couldn't have means impossibility, not unnecessary action."),
q("The results are inconsistent. It is possible that the team ___ have entered one value incorrectly.","may","must to","should","May have expresses a possible explanation without claiming certainty.","To is not used after modal may.","Should have usually expresses an unrealised obligation or criticism, not a neutral possibility in this context."),
q("You ___ have told me earlier; I could have helped.","should","should to","must","Should have + V3 expresses criticism or an unrealised advisable past action.","To is not used after should.","Must have expresses deduction, not advice/criticism in this context."),
q("The parcel isn't here. It ___ have been delivered to the wrong address.","might","might to","might be","Might have been delivered is a possibility about a past passive event.","To is not used after modal might.","Might be is present possibility and omits the past participle phrase."),
q("He ___ have known about the change; nobody informed him.","can't","must","should","Can't have known expresses a strong negative deduction about the past.","Must have known expresses the opposite positive deduction.","Should have known suggests obligation/expectation rather than evidence-based impossibility."),
q("They ___ have completed the task by now; they started only ten minutes ago.","can't","must","should","The short time makes completion highly implausible; can't have completed is a negative deduction.","Must have completed makes a strong positive deduction.","Should have completed expresses expectation rather than likelihood."),
q("You ___ tell anyone about the confidential results; disclosure is prohibited.","mustn't","needn't","don't have to","Mustn't expresses prohibition: do not disclose the information.","Needn't means disclosure is not necessary, not that it is forbidden.","Don't have to means there is no obligation; it does not prohibit the action.")
]},

"B2-04":{base:"passive",skillTarget:"passive-with-modals-and-reporting-passive",profile:{
label:"passive with modals and reporting passive",
core:"На более высоком уровне Passive Voice сочетается с modal verbs и reporting structures. Be сохраняет нужную форму, а основной глагол остаётся в V3; reporting passive позволяет выдвинуть на первый план утверждение или источник.",
form:"Modal passive: modal + be + V3. Modal perfect passive: modal + have been + V3. Reporting: It is believed that + clause; subject + is believed/said/expected + to-infinitive; to have + V3 for earlier action.",
selection:"Проверь modal, время и отношение двух действий. Для одновременного/общего сообщения используй to-infinitive; для более раннего события — to have + V3.",
contrast:"The team must complete the form → The form must be completed. People believe she left → She is believed to have left.",
boundary:"Reporting passive не означает, что сообщение достоверно; it is said/believed/reported отражает источник или распространённое утверждение. Не путай его с фактом, подтверждённым самим автором.",
skillTarget:"passive-with-modals-and-reporting-passive"
},drills:[
q("All applications must ___ by Friday.","be submitted","submit","have submit","Modal passive = must + be + V3.","Submit is active base form; the subject applications receive the action.","Have submit is not a valid modal passive construction."),
q("The missing documents should have ___ earlier.","been sent","sent","being sent","Modal perfect passive = should have been + V3.","Sent omits been and is not the complete passive sequence.","Being sent does not fit after should have in this perfect passive structure."),
q("It is widely believed that this species ___ extinct.","has become","is become","have became","This species is unambiguously singular; the present perfect is has become.","Is become is not a valid present perfect form.","Have became has incorrect agreement and participle form."),
q("The scientist is thought ___ the original samples.","to have destroyed","to destroy yesterday","that destroyed","To have + V3 marks an action earlier than the current reporting point.","To destroy does not mark the earlier completed event and the time phrase conflicts.","That destroyed cannot follow is thought in this subject + passive reporting pattern."),
q("The new procedure can ___ in small laboratories.","be used","use","be using","Modal passive is can + be + V3.","Use is active; the subject procedure receives the action.","Be using expresses progressive active meaning, not passive."),
q("The results are expected ___ next month.","to be published","to publish them","that publish","Expected + to-infinitive passive expresses an anticipated publication.","To publish them makes the results perform the action.","That publish does not complete the subject + reporting passive pattern."),
q("The old bridge may have ___ during the storm.","been damaged","damaged","being damaged","May have been + V3 is modal perfect passive.","Damaged omits been after may have.","Being damaged does not fit the modal perfect passive sequence.")
]},
"B2-05":{base:"reporting",skillTarget:"reporting-verbs-and-complement-patterns",profile:{
label:"reporting verbs and reporting structures",
core:"Reporting verbs encode not only speech but also the speaker's stance and the structure of reported content. Different verbs govern different complements: gerund, that-clause, object + infinitive, or object + preposition + gerund.",
form:"Suggest/recommend + V-ing or that-clause. Admit/deny + V-ing. Accuse + object + of + V-ing. Warn + object + against + V-ing. Persuade/encourage + object + to-infinitive. Insist + that-clause.",
selection:"Найди reporting verb и проверь его complement pattern. Нельзя автоматически использовать одну схему say/tell после каждого reporting verb.",
contrast:"She suggested changing the plan. He denied taking the file. They accused him of copying the answer. The tutor encouraged us to revise.",
boundary:"Некоторые verbs допускают несколько patterns с разными значениями (insist on doing / insist that…). Используй словарное управление вместе с контекстом и регистром.",
skillTarget:"reporting-verbs-and-complement-patterns"
},drills:[
q("The committee suggested ___ the deadline.","extending","to extend","extend","Suggest commonly takes a gerund or a that-clause; here gerund is required.","To extend does not fit the selected suggest + V-ing pattern.","Bare extend is not the complement form in this sentence."),
q("The student denied ___ the confidential file.","copying","to copy","copy","Deny is followed by a gerund when referring to an action.","To copy is not the standard complement after deny.","Bare copy is not used after deny in this structure."),
q("The journalist accused the official ___ misleading the public.","of","for","to","Accuse + object + of + V-ing is the standard pattern.","For does not govern the complement after accuse in this structure.","To would incorrectly introduce an infinitive rather than the required preposition pattern."),
q("The supervisor encouraged the interns ___ questions.","to ask","asking","ask","Encourage + object + to-infinitive: encouraged the interns to ask.","Asking omits the required to-infinitive marker after the object.","Bare ask is not the complement in this structure."),
q("The witness insisted ___ the truth.","on telling","to tell","tell","Insist on + gerund expresses persistence in performing an action.","To tell belongs to a different clause pattern and cannot follow this use of insist directly.","Bare tell is not licensed by insist in this structure."),
q("She warned us ___ the damaged staircase.","not to use","not using","to not using","Warn + object + (not) to-infinitive gives a warning/instruction.","Not using is a gerund and does not complete the warning pattern.","To not using mixes infinitive marker and gerund."),
q("The report recommends ___ its procedures before implementation.","reviewing","to review","review","Recommend can be followed by a gerund: recommends reviewing.","To review is not the standard complement in this construction without an object.","Bare review does not complete recommend + gerund here."),
]},
"B2-06":{base:"causative",skillTarget:"advanced-causative-and-linking-verbs",profile:{
label:"advanced causative and linking verbs",
core:"Advanced causative patterns distinguish arranging a service, persuading or requiring another person to act, and causing a state/change. The complement after have/get/make/let differs by construction.",
form:"Have + object + bare infinitive (have someone do). Get + object + to-infinitive (get someone to do). Make + object + bare infinitive; passive: be made + to-infinitive. Let + object + bare infinitive. Have/get something done = service.",
selection:"Определи, выполняет ли object действие сам или получает услугу. Затем выбери нужную форму: bare infinitive after have/make/let; to-infinitive after get; V3 for an arranged service.",
contrast:"I had the assistant print it. I got the assistant to print it. I had the document printed. The assistant was made to print it.",
boundary:"Make + object + bare infinitive in active becomes be made + to-infinitive in passive. Get can also mean obtain/understand; use context to select the pattern.",
skillTarget:"advanced-causative-and-linking-verbs"
},drills:[
q("The director had the assistant ___ the minutes.","prepare","to prepare","prepared","Have + object + bare infinitive: had the assistant prepare.","To prepare is used after get + object, not have + object in this causative pattern.","Prepared would be V3 and would require a different structure."),
q("We got the supplier ___ the damaged equipment.","to replace","replace","replacing","Get + object + to-infinitive expresses persuasion/arrangement.","Bare replace is not the complement after got + object.","Replacing is a gerund and does not complete the get + object causative."),
q("The delay made the passengers ___ for another hour.","wait","to wait","waiting","Make + object + bare infinitive in active voice.","To wait is used in passive be made to wait, not active made the passengers.","Waiting is not the bare infinitive complement after make."),
q("The employees were made ___ the safety procedure again.","to read","read","reading","Passive make requires to-infinitive: were made to read.","Bare read is used in active make + object + infinitive.","Reading is a gerund, not the complement after were made."),
q("The manager let us ___ early.","leave","to leave","leaving","Let + object + bare infinitive.","To leave is not used after let in the standard causative construction.","Leaving does not complete let + object + bare infinitive."),
q("I had my suit ___ before the ceremony.","altered","alter","altering","Have + object + V3 expresses arranging a service performed by someone else.","Alter is active base form and does not complete the causative service pattern.","Altering is not the required past participle."),
q("The new evidence caused the researchers ___ their conclusion.","to revise","revise","revising","Cause + object + to-infinitive.","Bare revise is not the standard complement after cause + object.","Revising does not complete the cause + object + to-infinitive pattern.")
]},
"B2-07":{base:"participle",skillTarget:"complex-relative-and-participle-clauses",profile:{
label:"complex relative and participle clauses",
core:"Complex relative clauses use prepositions, quantifiers and relative structures to link detailed information. Reduced participle clauses can compress the same information when the logical relationship and subject are clear.",
form:"Preposition + which/whom: in which, by whom, through which. Quantifier + of + whom/which: several of whom, some of which. Reduced relative: noun + V-ing/V3.",
selection:"Проверь antecedent, функцию relative word и preposition. В reduced clause проверь, active ли значение (-ing) или passive/result meaning (V3), и совпадает ли логический субъект.",
contrast:"The method by which the samples were analysed; the researcher to whom I spoke; the devices installed last year.",
boundary:"Preposition stranding and fronting vary by register. Some participle reductions can be ambiguous or create dangling modifiers; choose the explicit relative clause when reference is unclear.",
skillTarget:"complex-relative-and-participle-clauses"
},drills:[
q("The framework within ___ the study was conducted was established earlier.","which","who","whose","Which refers to the framework after a fronted preposition within.","Who refers to people.","Whose expresses possession and would need a following noun."),
q("The consultant to ___ we sent the report replied immediately.","whom","which","whose","Whom is the formal object form referring to a person after a preposition.","Which refers to things, not the consultant.","Whose shows possession, not the object of to."),
q("The survey included five hundred participants, many of ___ were international students.","whom","which","whose","Whom refers to people after many of.","Which refers to things.","Whose expresses possession and needs a noun."),
q("The devices ___ during the trial are now being inspected.","damaged","damaging","damage","Damaged is a passive participle: the devices received the action.","Damaging would imply the devices caused damage.","Damage is a base verb and does not form the reduced relative clause."),
q("The model, through ___ the data were processed, is described in Appendix B.","which","who","whose","Which refers to the model after the preposition through.","Who refers to people.","Whose expresses possession."),
q("The committee members, several of ___ had field experience, supported the proposal.","whom","which","where","Whom refers to people after several of.","Which refers to things.","Where refers to a place, not people."),
q("The report ___ by the external reviewers contains several corrections.","revised","revising","revise","Revised is a passive participle describing the report that received revision.","Revising would mean the report is performing the revision.","Revise is a base verb and cannot modify report in this clause.")
]},

"B2-08":{base:"participle",skillTarget:"non-finite-clauses-and-reduction",profile:{
label:"non-finite clauses and clause reduction",
core:"Non-finite clauses compress information by using infinitives, gerunds and participles rather than a fully inflected finite verb. Their subject and time relationship must be clear from the main clause.",
form:"Purpose: to + infinitive. Reason/time: V-ing. Earlier action: having + V3. Passive earlier action: having been + V3. Reduced passive clause: V3 phrase. Absolute constructions may include their own subject.",
selection:"Определи функцию non-finite clause и восстанови полную finite clause. Проверь логический субъект и относительное время; если действие завершилось раньше, используй perfect participle.",
contrast:"Having completed the survey, the team analysed the data. Having been warned, the visitors left. To avoid confusion, label every sample.",
boundary:"Non-finite clauses are concise but can create ambiguity or dangling modifiers. Use an explicit subject or finite clause when the logical subject is not obvious.",
skillTarget:"non-finite-clauses-and-reduction"
},drills:[
q("___ the survey, the researchers began analysing the results.","Having completed","Having complete","Completed having","Having + V3 marks an action completed before the main action.","Complete is the base form; perfect participle requires V3.","Completed having reverses the required order and is not a standard construction."),
q("___ by the sudden noise, the birds flew away.","Disturbed","Disturbing","Having disturb","Disturbed is a passive participle: the birds received the effect.","Disturbing would mean the birds caused the noise/disturbance.","Having disturb lacks the past participle and does not form a correct perfect clause."),
q("The team collected samples ___ to contamination.","to avoid","avoiding","avoided","To avoid expresses the purpose of collecting the samples.","Avoiding would describe an accompanying action and does not express the intended purpose clearly.","Avoided is a past participle and cannot express the purpose here."),
q("___ for several hours, the machine finally stopped.","Having operated","Having been operated","Operating it","The machine performed the operation for hours; active perfect participle is appropriate.","Having been operated would mean someone operated it, not that the machine itself ran.","Operating it introduces an object and changes the logical subject."),
q("The proposal, ___ by the committee, will be discussed tomorrow.","approved","approving","approve","Approved is a reduced passive relative clause: the proposal received approval.","Approving would imply the proposal approves something.","Approve is a base verb, not a reduced relative participle."),
q("Weather conditions ___, the flight departed on schedule.","having improved","improving them","improved having","The absolute construction has its own subject conditions and marks prior improvement.","Improving them introduces an object pronoun and changes the meaning.","Improved having is not a grammatical participle sequence."),
q("___ the instructions carefully, the technician avoided the error.","Following","Followed","To following","Following introduces an accompanying/reason participle clause with the technician as understood subject.","Followed would create passive meaning, but the technician performs the action.","To following incorrectly combines the infinitive marker with gerund.")
]},
"B2-09":{base:"nounPhrase",skillTarget:"complex-noun-phrases-and-compounds",profile:{
label:"complex noun phrases and compound nouns",
core:"Complex noun phrases condense information through noun modifiers, adjectives, participles and prepositional phrases. The head noun determines number and agreement; the order and hyphenation of modifiers affect clarity.",
form:"Determiner + adjective/participle modifiers + noun compounds + head noun + postmodifier (of-phrase/relative clause). Number compounds before a noun are typically hyphenated and singular: a five-year study.",
selection:"Найди head noun и последовательно определи, какие элементы модифицируют его до и после. Не принимай ближайшее noun modifier за ядро phrase.",
contrast:"A five-year research project — head = project. A project on renewable energy — head = project; postmodifier = on renewable energy. Research modifies project.",
boundary:"Overloaded noun phrases can reduce readability. Use hyphens in compound modifiers when needed for clarity; do not pluralise a noun modifier in standard compound noun patterns.",
skillTarget:"complex-noun-phrases-and-compounds"
},drills:[
q("The university launched a ___ research project.","five-year","five-years","five year old","A number + singular unit adjective is hyphenated before the noun: a five-year project.","Five-years incorrectly pluralises the noun modifier.","Five year old describes an age and is not the intended compound modifier."),
q("The report on renewable energy ___ published yesterday.","was","were","have","The head noun is report (singular); the on-phrase does not control agreement.","Were incorrectly agrees with energy/reports not the head.","Have is plural and does not agree with singular report."),
q("They opened a new ___ centre for marine biology.","research","researches","researching","Research functions as a noun modifier and remains singular in the compound.","Researches is not normally pluralised as a noun modifier here.","Researching is a participle and changes the structure."),
q("The recently ___ policy document contains new guidelines.","published","publishing","publish","Published is a past participle modifying document (the document was published).","Publishing would mean the document is publishing something.","Publish is a base verb and cannot act as a premodifier here."),
q("The main purpose of the climate report ___ to summarise current evidence.","is","are","have","The head noun purpose is singular; the of-phrase is a postmodifier.","Are incorrectly agrees with report/evidence rather than purpose.","Have does not fit the linking structure and is plural."),
q("The centre provides training for early-career ___ scientists.","environmental","environment","environmentally","Environmental is an adjective modifying scientists.","Environment is a noun and does not function as the adjective here.","Environmentally is an adverb and cannot directly modify the noun in this pattern."),
q("A three-month ___ of the new system is planned.","evaluation","evaluate","evaluating","Evaluation is the head noun required after the article and modifier.","Evaluate is a verb, not a noun head.","Evaluating is a gerund/participle and not the intended abstract noun.")
]},
"B2-10":{base:"agreement",skillTarget:"advanced-subject-verb-agreement",profile:{
label:"advanced subject–verb agreement",
core:"В сложных предложениях форма сказуемого определяется грамматическим ядром subject phrase и конструкцией. Длинные modifiers, of-phrases и coordinated subjects могут отвлекать от head noun.",
form:"The number of + plural noun → singular verb. A number of + plural noun → plural verb. Either/or and neither/nor often agree with the nearer subject. Not only…but also typically follows the nearest subject in agreement.",
selection:"Найди head noun и отдели его от prepositional phrases. В correlative pairs проверь ближайший элемент, если действует proximity agreement; затем согласуй singular/plural verb.",
contrast:"The number of applicants is rising. A number of applicants are waiting. Neither the manager nor the assistants were available (nearest subject plural).",
boundary:"Collective nouns and data may vary by style/dialect; follow the selected academic convention consistently. Meaning-based agreement can sometimes override a mechanical rule.",
skillTarget:"advanced-subject-verb-agreement"
},drills:[
q("Neither the director nor the assistants ___ available.","were","was","has been","With neither…nor, the verb commonly agrees with the nearer subject assistants (plural).","Was incorrectly agrees with the more distant singular noun director.","Has been is singular and does not agree with the nearer plural subject."),
q("Not only the students but also the lecturer ___ responsible for the results.","is","are","have","With not only…but also, agreement follows the nearer subject lecturer (singular).","Are incorrectly agrees with the more distant plural noun students.","Have is plural and cannot agree with singular lecturer."),
q("The number of applications ___ increased this year.","has","have","are","The head is number (singular), so use has.","Have incorrectly agrees with applications inside the of-phrase.","Are is plural and does not agree with singular head."),
q("A number of applications ___ still incomplete.","are","is","has","A number of + plural noun means several and normally takes plural agreement.","Is incorrectly treats number as the singular head in the different expression the number of.","Has is singular and does not agree with the plural subject."),
q("The findings from the latest experiment ___ significant.","are","is","has","The head noun findings is plural; the from-phrase does not control agreement.","Is is singular and conflicts with findings.","Has is singular and does not agree with plural findings."),
q("Either the laboratory manager or the technicians ___ responsible for locking the door.","are","is","has","With either…or, the verb agrees with the nearer subject technicians (plural).","Is agrees with the more distant singular noun manager.","Has is singular and does not agree with the nearer plural subject."),
q("A series of carefully controlled tests ___ been conducted.","has","have","are","The head noun series is singular in this expression; use has.","Have incorrectly agrees with tests inside the of-phrase.","Are does not form the present perfect passive and is plural.")
]},

"B2-13":{base:"adverb",skillTarget:"adverb-position-focus-viewpoint",profile:{
label:"adverb position, degree, focus and viewpoint",
core:"Adverb position affects scope and information focus. Focus adverbs such as only, even, just and particularly can change which element is restricted or emphasised; stance adverbs express the speaker's evaluation of a whole proposition.",
form:"Mid-position adverbs commonly precede the main verb but follow be/first auxiliary. Focus adverbs are placed close to the constituent they modify. Sentence adverbs often occur initially or parenthetically with commas.",
selection:"Определи scope: какое слово или утверждение ограничивается/усиливается? Поставь focus adverb рядом с этим элементом. Для stance adverb проверь, относится ли он ко всему proposition.",
contrast:"Only Maria reviewed the paper (nobody else). Maria only reviewed the paper (did nothing else). Maria reviewed only the paper (nothing else was reviewed).",
boundary:"Some adverbs allow more than one position with a change in focus or style. Avoid ambiguous placement when the intended scope matters in academic writing.",
skillTarget:"adverb-position-focus-viewpoint"
},drills:[
q("___ the final chapter discusses the limitations; the earlier chapters do not.","Only","Even","Almost","Only directly restricts the subject/focus to the final chapter.","Even adds unexpected emphasis, not the intended restriction.","Almost means nearly and does not restrict the set in this way."),
q("The findings were ___ statistically significant.","barely","bare","bareness","Barely is an adverb modifying the adjective phrase statistically significant.","Bare is an adjective and cannot modify the adjective phrase here.","Bareness is a noun."),
q("The team ___ agreed to revise the protocol, not to abandon it.","merely","mere","mereness","Merely modifies the verb phrase and limits the action to agreeing to revise.","Mere is an adjective and cannot modify agreed.","Mereness is a noun."),
q("___, the evidence does not support the stronger claim.","Arguably","Arguable","Argument","Arguably is a stance adverb modifying the whole proposition.","Arguable is an adjective, not a sentence adverb.","Argument is a noun."),
q("The participants were ___ informed about the risks.","fully","full","fullness","Fully is an adverb modifying informed.","Full is an adjective, not the required adverb.","Fullness is a noun."),
q("She ___ only reviewed the introduction; she did not edit it.","briefly","brief","briefness","Briefly modifies the action reviewed and gives its duration/manner.","Brief is an adjective and does not modify the verb directly.","Briefness is a noun."),
q("The results are ___ consistent with the earlier study.","broadly","broad","breadth","Broadly is an adverb of viewpoint/degree modifying consistent.","Broad is an adjective.","Breadth is a noun.")
]},
"B2-14":{base:"clause",skillTarget:"advanced-concession-contrast-linking",profile:{
label:"concession, contrast and complex linking",
core:"Advanced concession and contrast structures express an unexpected relationship between propositions. The connector determines clause structure, word order and emphasis.",
form:"Although/even though/though + finite clause. Despite/in spite of + noun phrase, pronoun or -ing. Despite/in spite of the fact that + clause. Even though = accepted fact/concession; even if = hypothetical condition. While/whilst may be concessive; whereas/while may contrast two situations. Adjective + though/as + subject + verb is emphatic.",
selection:"Choose the linker by meaning first, then check what follows it: a finite clause, noun phrase or -ing form. Separate concession from contrast, and an accepted fact from a hypothetical condition. Check clause position and register.",
contrast:"Although the evidence is limited, the conclusion remains useful. Despite the high cost, the method was adopted widely. Even though Matt does not speak Spanish, he should still visit Madrid. Even if Matt does not speak Spanish, he should still visit Madrid. Juan gets lots of homework, whereas Mia gets very little. Strange though it may seem, the result is consistent.",
boundary:"Despite is a preposition: do not put a finite clause directly after it. Use despite the fact that + clause when a clause is needed. Even though presents an accepted fact; even if presents a hypothetical condition. While/whilst can be concessive before or within the main clause, not after it. Whereas/while can contrast two situations. Nevertheless, much as, no matter how/what and degree-concessive however remain unverified extensions.",
skillTarget:"advanced-concession-contrast-linking"
},drills:[
q("___ the evidence was limited, the conclusion remained useful.","Although","Despite","Even if","Although introduces a finite clause with a subject and verb.","Despite is followed by a noun phrase or -ing form, not a finite clause.","Even if presents a hypothetical condition rather than an accepted fact."),
q("___ the high cost, the method was adopted widely.","Despite","Although","Even though","Despite is followed by the noun phrase the high cost.","Although and even though require a finite clause after them.","Even though cannot directly precede a noun phrase."),
q("We know Matt does not speak Spanish. ___ Matt does not speak Spanish, he should still visit Madrid. We do not know whether he speaks French. ___ he does not speak French, he should still visit Paris.","Even though; Even if","Even if; Even though","Whereas; Even if","Even though presents the known fact; even if introduces the hypothetical condition.","The two clauses reverse the fact/condition meanings.","Whereas contrasts situations and does not express the two required relationships."),
q("___ there is no evidence that Rob cheated, we were all astonished that he passed the exam.","While","Whereas","Even if","Concessive while introduces a clause that qualifies or conflicts with the main clause.","Whereas contrasts two situations; it does not express this unexpected concession.","Even if presents a hypothetical condition, not the evidence already described."),
q("Strange ___ it may seem, the result is consistent.","though","despite","even if","The emphatic pattern is adjective + though/as + subject + verb.","Despite is a preposition and cannot follow the adjective in this clause pattern.","Even if introduces a conditional clause, not this emphatic inversion pattern."),
q("Despite ___ the necessary qualifications, she did not get the job.","having","have","had","Despite is followed by a noun phrase or an -ing form; having completes the prepositional phrase.","Have is a finite/base verb and does not fit directly after the preposition here.","Had is a finite past form and cannot directly follow despite in this pattern."),
q("People reaching retirement age do not ___ wish to leave their jobs.","necessarily","necessary","necessity","Not necessarily means that something is not inevitable or not true in every case.","Necessary is an adjective and cannot modify wish in this structure.","Necessity is a noun and does not fit the adverb position."),
]},
"B2-15":{base:"cleft",skillTarget:"cleft-clauses-information-focus",profile:{
label:"cleft clauses and information focus",
core:"Cleft structures divide a sentence into a focused element and background information. They guide the reader/listener toward the information that answers a particular question or corrects an assumption.",
form:"It-cleft: It + be + focused element + who/that + clause. Wh-cleft: What + clause + be + focused element. All-cleft: All + clause + be + focused element.",
selection:"Определи, какой элемент нужно выделить: person, time, reason, object or action. Затем выбери it-cleft or wh-cleft and check the relative marker.",
contrast:"The second experiment revealed the pattern. → It was the second experiment that revealed the pattern. What the team needs is more time.",
boundary:"Clefts add emphasis and can sound marked if overused. Relative marker choice and agreement depend on the focused element and the construction.",
skillTarget:"cleft-clauses-information-focus"
},drills:[
q("It was the final experiment ___ revealed the unexpected pattern.","that","where","what","That introduces the cleft relative clause focused on the experiment.","Where refers to place, not the focused subject experiment.","What does not introduce this it-cleft construction."),
q("___ the team needs is a larger sample.","What","It","Which","What introduces the wh-cleft clause functioning as the subject.","It cannot introduce this free relative clause without a complement structure.","Which requires an antecedent and does not function as this free relative."),
q("It was Maria ___ identified the error, not Daniel.","who","which","where","Who focuses a person in an it-cleft.","Which is for things, not Maria.","Where refers to place."),
q("What surprised the reviewers ___ the lack of supporting data.","was","were","have","The wh-cleft subject clause is treated as singular here; use was.","Were incorrectly uses plural agreement with the complement data.","Have does not form the linking verb required."),
q("It was in 2021 ___ the laboratory introduced the new procedure.","that","where","who","That introduces the cleft clause focusing time.","Where is a relative adverb for place, not the time focus in this it-cleft.","Who refers to people."),
q("All I want ___ a clear explanation of the method.","is","are","be","All + clause as a singular focus takes is in this construction.","Are is plural and does not agree with the singular all-clause focus.","Be is a base form, not a finite linking verb."),
q("It was the funding shortage ___ prevented the project from continuing.","that","who","where","That introduces the it-cleft clause focusing a cause/thing.","Who is used for people.","Where refers to place.")
]},

"B2-17":{base:"inversion",skillTarget:"fronting-and-inversion-introduction",profile:{
label:"fronting and inversion — introduction",
core:"Fronting переносит элемент в начало для контраста или фокуса. В некоторых ограниченных или отрицательных начальных выражениях требуется subject–auxiliary inversion, аналогичная порядку слов в вопросе.",
form:"Negative/restrictive adverbial + auxiliary + subject + main verb: Rarely have we seen…; Only after the review did they publish…; Not until Monday did… . If no auxiliary exists, use do/does/did.",
selection:"Проверь, содержит ли начальная позиция negative/restrictive expression. Если да, найди auxiliary и поставь его перед subject; если вспомогательного нет, добавь do-support.",
contrast:"We had rarely seen this result. → Rarely had we seen this result. Only after the test did the team understand the issue.",
boundary:"Не всякое fronting вызывает inversion. После initial time/place phrases обычный порядок слов может сохраняться. Используй инверсию только в лицензирующих конструкциях.",
skillTarget:"fronting-and-inversion-introduction"
},drills:[
q("Rarely ___ such a convincing explanation.","have we heard","we have heard","did we have heard","Rarely in initial position triggers subject–auxiliary inversion: have we heard.","We have heard keeps normal statement order after negative initial adverb.","Did we have heard stacks auxiliaries and uses the wrong tense."),
q("Only after the second trial ___ the error.","did they identify","they identified","have they identify","Only after at the beginning triggers inversion; past simple needs did + subject + base verb.","They identified lacks inversion after the restrictive initial expression.","Have they identify mixes auxiliaries and uses the wrong verb form."),
q("Not until the report was published ___ the scale of the problem.","did we understand","we understood","had we understand","Not until in initial position triggers inversion; past simple uses did + subject + base form.","We understood keeps normal order and misses required inversion.","Had we understand has an incorrect participle form and does not match the intended tense."),
q("Under no circumstances ___ personal data be shared publicly.","should","we should","do should","Negative initial phrase triggers inversion: should + subject.","We should uses statement order, not inversion.","Do should incorrectly stacks do-support with modal should."),
q("Only then ___ that the original estimate was wrong.","did the team realise","the team realised","has the team realised","Only then triggers inversion; past simple uses did + subject + base verb.","The team realised keeps standard order.","Has the team realised changes tense and still does not match the intended past event."),
q("Seldom ___ a result so unexpected.","does a study produce","a study produces","a study does produce","Seldom is a negative/restrictive initial adverb requiring inversion; Present Simple uses does + subject + base verb.","A study produces keeps statement word order.","A study does produce is emphatic statement order, not inversion."),
q("Not only ___ the deadline, but they also failed to notify the client.","did they miss","they missed","had they miss","Not only at the beginning triggers inversion; past simple uses did + subject + base verb.","They missed does not invert after not only.","Had they miss has an incorrect past participle.")
]},
"B2-18":{base:"hedging",skillTarget:"academic-hedging-and-stance",profile:{
label:"hedging and stance in academic English",
core:"Hedging limits the strength or scope of a claim so that it matches the available evidence. It avoids presenting interpretations, tendencies and uncertain relationships as absolute facts.",
form:"Modal verbs (may/might/could); stance verbs (appear/seem/suggest); adverbs (possibly, arguably, likely); quantifiers (some, many, in certain cases); reporting phrases (the evidence suggests…).",
selection:"Сопоставь силу формулировки с силой evidence. Используй осторожную форму для ограниченных данных, correlation или интерпретации; не ослабляй общеизвестный факт без причины.",
contrast:"The results prove X — categorical. The results suggest X — cautious interpretation. X may contribute to Y — possibility, not established causation.",
boundary:"Hedging is not vagueness: it should state precisely what is uncertain and why. Too many hedges can make a sentence unclear; too few can overstate evidence.",
skillTarget:"academic-hedging-and-stance"
},drills:[
q("The findings ___ indicate a possible relationship between sleep and memory.","may","must","prove","May indicates possibility without claiming certainty.","Must expresses strong necessity/certainty and overstates limited evidence.","Prove is categorical and is too strong for a possible relationship."),
q("The observed pattern appears ___ with earlier research.","consistent","consistently","consistency","Appear + adjective complement: consistent.","Consistently is an adverb and does not complete the linking verb complement.","Consistency is a noun."),
q("The results ___ that further investigation is needed.","suggest","prove beyond doubt","guarantee","Suggest presents an evidence-based but cautious interpretation.","Prove beyond doubt is stronger than the described evidence supports.","Guarantee presents certainty and overstates a research interpretation."),
q("This difference is ___ attributable to sampling variation.","possibly","possible","possibility","Possibly is a stance adverb modifying attributable.","Possible is an adjective and would require a different syntax.","Possibility is a noun."),
q("The intervention might ___ improve attendance in some settings.","help","helps","to help","Might is followed by the base verb help.","Helps adds third-person -s after a modal, which is not allowed.","To help is an infinitive with an unnecessary to after might."),
q("These findings should be interpreted with ___.","caution","cautiously","cautious","With is followed by a noun phrase; caution is a noun.","Cautiously is an adverb, not a noun complement after with.","Cautious is an adjective and cannot stand alone as the object of with."),
q("The model is likely ___ perform better with a larger dataset.","to","that","for","Likely + to-infinitive expresses probability.","That would require a finite clause and different structure.","For does not complete likely + infinitive.")
]},
"B2-19":{base:"preposition",skillTarget:"complex-prepositions-and-dependent-patterns",profile:{
label:"complex prepositions and dependent patterns",
core:"Complex prepositions consist of more than one word and express formal relationships such as reference, cause, contrast, representation and compliance. Their complement is usually a noun phrase or gerund.",
form:"In light of + noun phrase; with regard to + noun phrase; in terms of + noun phrase; in accordance with + noun phrase; on behalf of + person/group; prior to + noun/gerund; by means of + noun phrase.",
selection:"Определи функцию выражения и проверь, подходит ли следующий complement. Не разбивай fixed preposition phrase и не заменяй её отдельным предлогом.",
contrast:"In light of the evidence — considering the evidence. Prior to publication — before publication. On behalf of the committee — representing the committee.",
boundary:"These phrases tend to be formal and should be used only where their exact meaning fits. Avoid stacking several heavy prepositional phrases in one sentence.",
skillTarget:"complex-prepositions-and-dependent-patterns"
},drills:[
q("___ the latest evidence, the policy was revised.","In light of","On behalf of","By means","In light of means considering the latest evidence.","On behalf of means representing someone, not considering evidence.","By means of introduces an instrument/method."),
q("The application must be submitted ___ the published guidelines.","in accordance with","in contrast to","on behalf of","In accordance with means following/compliant with the guidelines.","In contrast to expresses difference, not compliance.","On behalf of means representing an organisation/person."),
q("The director spoke ___ the entire research team.","on behalf of","in terms of","prior to","On behalf of means representing the team.","In terms of means with regard to/aspects of.","Prior to means before a time/event."),
q("The findings should be considered ___ their limitations.","in terms of","on behalf of","by means of","In terms of introduces the perspective/aspect for consideration.","On behalf of indicates representation, not analytical perspective.","By means of refers to a method or instrument."),
q("The procedure was changed ___ the safety review.","as a result of","in accordance with","in contrast to","As a result of expresses cause and is followed by noun phrase.","In accordance with means in compliance with, not cause.","In contrast to indicates difference, not consequence."),
q("All participants gave consent ___ the experiment began.","prior to","in light of","on behalf of","Prior to means before and is followed by the noun event.","In light of means considering, not before.","On behalf of indicates representation."),
q("The samples were transported ___ a temperature-controlled container.","by means of","with regard to","in spite of","By means of introduces the instrument/method of transport.","With regard to marks topic/reference, not means.","In spite of introduces concession, not instrument.")
]},
"B2-20":{base:"nominalisation",skillTarget:"nominalisation-academic-style-introduction",profile:{
label:"nominalisation and academic style — introduction",
core:"Nominalisation converts verbs or adjectives into nouns, allowing actions, processes and qualities to function as compact topics in academic discourse. It can improve cohesion but may also make prose dense or obscure agency.",
form:"Verb → noun (analyse → analysis, expand → expansion). Adjective → noun (accurate → accuracy). The noun can take determiners, modifiers and of-phrases: the rapid expansion of the city.",
selection:"Определи, нужно ли представить действие как процесс/концепцию или сохранить активный verb sentence. Проверь article, number, complement and clarity after nominalisation.",
contrast:"The company expanded rapidly → the rapid expansion of the company. Researchers analysed the data → the analysis of the data.",
boundary:"Do not nominalise every verb. Excessive noun phrases can hide the agent and reduce readability; prefer a finite verb when it makes the relationship clearer.",
skillTarget:"nominalisation-academic-style-introduction"
},drills:[
q("The rapid ___ of the city increased housing costs.","expansion","expand","expansive","Expansion is the noun form required after the adjective rapid and article the.","Expand is a verb, not the head noun.","Expansive is an adjective and does not name the process."),
q("The researchers analysed the results. → Their ___ of the results was detailed.","analysis","analyse","analytical","Analysis is the noun form of analyse.","Analyse is the base verb and cannot follow their as a noun head.","Analytical is an adjective, not the name of the process."),
q("The policy was implemented gradually. → The gradual ___ of the policy took two years.","implementation","implement","implementing","Implementation is the noun that names the process; it follows gradual.","Implement is a verb.","Implementing is a gerund, but the target nominalisation is the lexical noun implementation."),
q("Accurate measurement is essential. → The ___ of the measurements is essential.","accuracy","accurately","accurate","Accuracy is the noun form of accurate.","Accurately is an adverb.","Accurate is an adjective and does not complete the nominal head phrase."),
q("The organisation expanded internationally. → Its international ___ created new jobs.","expansion","expand","expansively","Expansion names the process and functions as the head noun.","Expand is a verb.","Expansively is an adverb."),
q("They decided to revise the protocol. → The ___ to revise the protocol was unanimous.","decision","decide","decisive","Decision is the noun form of decide.","Decide is a verb.","Decisive is an adjective."),
q("The system became more efficient. → The improvement in system ___ reduced costs.","efficiency","efficient","efficiently","Efficiency is the noun form needed after system.","Efficient is an adjective.","Efficiently is an adverb.")
]},
"B2-12":{base:"quantifier",skillTarget:"advanced-quantifiers-determiners",profile:{
label:"advanced quantifiers and determiners",
core:"Advanced quantifiers express proportion, approximate amount, distribution and limits. Their choice depends on countability, reference set and whether the statement concerns all, most, few, neither or a proportion.",
form:"A great deal of + uncountable noun; a large number of + plural countable noun; a proportion of + noun; hardly any + noun; few/a few + plural; little/a little + uncountable; all/both/none/neither + of + determiner/pronoun.",
selection:"Определи тип существительного, размер/охват группы и отношение говорящего. Различай few/little (недостаточно) и a few/a little (некоторое количество).",
contrast:"Few participants responded (almost none, negative tone). A few participants responded (some, positive/neutral). Little evidence exists (almost none). A little evidence exists (some).",
boundary:"Agreement after quantifier phrases depends on grammatical head and meaning; all/none/some can show variation. Avoid using quantifier + noun combinations that contradict countability.",
skillTarget:"advanced-quantifiers-determiners"
},drills:[
q("There is ___ evidence to support the claim, so no conclusion can be drawn.","hardly any","a great number of","a few","Hardly any expresses an almost zero quantity; evidence is uncountable.","A great number of requires a plural countable noun.","A few is used with plural countable nouns and suggests some quantity."),
q("A large number of applications ___ received after the deadline yesterday.","were","was","has been","A large number of + plural countable noun normally takes plural agreement; yesterday requires Past Simple passive were received.","Was incorrectly treats number as the singular head in this expression.","Has been is present perfect and does not match the finished past time marker yesterday."),
q("A great deal of research ___ been devoted to this question.","has","have","are","Research is uncountable and the head phrase takes singular agreement: has been.","Have is plural and does not agree with the uncountable noun phrase.","Are does not form the required present perfect passive."),
q("Only a small ___ of the respondents selected the final option.","minority","few","little","A small minority of is the standard noun phrase for a small proportion of a group.","Few is a quantifier and does not complete the noun phrase a small ___ of in this form.","Little is used with uncountable nouns, not as the proportion noun here."),
q("Very ___ applicants met all the requirements; the position remains vacant.","few","a few","little","Few emphasizes an insufficiently small number of plural countable applicants.","A few means some and does not carry the intended negative implication.","Little is used with uncountable nouns."),
q("We have ___ information about the latest revision, but enough to begin.","a little","a few","few","A little means some amount of uncountable information.","A few is used with plural countable nouns.","Few requires a plural countable noun."),
q("___ of the evidence was excluded because it was unreliable.","Much","Many","Few","Much of is used with the uncountable noun evidence.","Many of requires a plural countable noun or pronoun.","Few of also requires a plural countable reference.")
]},
"B2-16":{base:"ellipsis",skillTarget:"ellipsis-substitution-and-parallel-structures",profile:{
label:"ellipsis and substitution",
core:"Ellipsis omits words that are recoverable from context, while substitution replaces a repeated phrase with one, do, so, not or another pro-form. These devices reduce repetition without making reference unclear.",
form:"One/ones replace countable noun heads; do so substitutes a verb phrase; so/not can replace a clause after reporting verbs; auxiliary ellipsis in comparisons: I can, and she can too. Avoid omitting material needed for clarity.",
selection:"Найди, какой элемент повторяется и можно ли восстановить его однозначно. Для noun head используй one/ones; для verb phrase — do so; для clause after think/hope/expect — so/not where licensed.",
contrast:"I prefer the blue one (noun substitution). She promised to revise it and did so (verb phrase). I think so / I hope not (clause substitution).",
boundary:"Substitution is restricted by grammar and context. One/ones generally replace countable nouns, not uncountable mass nouns; do so is more formal than simply do it in many contexts.",
skillTarget:"ellipsis-substitution-and-parallel-structures"
},drills:[
q("I don't like the red folder. I'll take the blue ___.","one","ones","some","One substitutes for a singular countable noun folder.","Ones is plural and would refer to multiple folders.","Some does not substitute for one specific singular folder in this contrast."),
q("The first proposal was expensive, and the second ___ was impractical.","one","ones","do","One replaces the singular countable noun proposal.","Ones is plural, but the antecedent proposal is singular.","Do cannot replace a noun phrase."),
q("She promised to check the figures and ___ before the meeting.","did so","did one","made","Did so substitutes for the verb phrase check the figures.","Did one is not a standard substitute for a verb phrase.","Made changes the verb meaning and does not preserve the promised action."),
q("I expect the results will improve, and I hope ___.","so","one","do so","Hope so substitutes for the clause that the results will improve.","One substitutes for a countable noun, not a clause.","Do so substitutes for an action/verb phrase, not the proposition here."),
q("He said he would attend, but in the end he did ___.","not","no","none","Did not creates a negative elliptical clause with the omitted verb recoverable from context.","No is a determiner/adverb, not the required substitute after did.","None is a pronoun for a quantity/set, not a clause substitute."),
q("The newer model is lighter than the previous ___.","one","ones","do","One replaces singular countable noun model.","Ones is plural and the comparison is singular.","Do cannot replace the noun model."),
q("The committee approved the revised plan, and the board did ___ as well.","so","one","ones","Did so substitutes for approved the revised plan.","One replaces a singular countable noun.","Ones replaces plural countable nouns.")
]},
"B2-11":{base:"articles",skillTarget:"advanced-articles-reference-generic-specific",profile:{
label:"advanced articles and reference — generic and specific meaning",
core:"Advanced article choice depends on whether a noun phrase is specific or generic, identifiable to the reader, unique in context, or used to classify an institution, activity or abstract concept. Zero article can express a generic plural or uncountable meaning.",
form:"The + identifiable/specific/unique noun phrase. A/an + singular countable noun introduced or classified. Zero article with generic plural/uncountable nouns and many institutional/activity expressions (at university, go to bed, by bus).",
selection:"Определи, обозначает ли noun phrase конкретный identifiable referent or a general category. Затем проверь countability, singular/plural and whether an institutional expression refers to its primary function or physical building.",
contrast:"Students need sleep (generic uncountable). The students in this class need sleep (identified group). She is at university (institutional function, BrE). She is at the university (specific place/building).",
boundary:"Article choice can vary with dialect and lexicalised expressions. Some institutions take the in different varieties. Proper names and abstract nouns have exceptions; do not reduce article choice to 'first mention = a, second = the' in all contexts.",
traps:[
["The information is important for education in general. (generic meaning)","Information is important for education in general.","Generic uncountable nouns often take zero article.","The would make the reference specific/identifiable rather than generic."],
["A students need support.","Students need support.","Generic plural countable nouns take zero article.","A cannot precede a plural noun."],
["The life is complex. (general life)","Life is complex.","Abstract uncountable noun used generically takes zero article.","The would imply a specific identifiable life or concept."]
],
examples:[
["Technology has changed communication.","Технологии изменили коммуникацию.","Generic abstract concept, zero article."],
["The technology used in this experiment is expensive.","Технология, использованная в этом эксперименте, дорогая.","Specific identified technology takes the."],
["A university should support its students.","Университет должен поддерживать своих студентов.","Singular countable noun introduced as a member of the category takes a."],
["The university near the river has a new library.","В университете у реки новая библиотека.","Specific identifiable institution takes the."]
],
toefl:"Article choice affects precision in academic Reading and Writing: generic claims, specific evidence and institution references need distinct forms."
},drills:[
q("___ information is essential for making an informed decision.","Information","The information","An information","Information is uncountable and generic here, so it takes zero article.","The information would refer to specific identifiable information.","An cannot precede an uncountable noun in this meaning."),
q("___ Netherlands is known for its extensive cycling infrastructure.","The","A","Zero article","The is part of the established geographical name the Netherlands.","A is not used before the plural country name Netherlands.","The country name requires the definite article; zero article is not standard here."),
q("___ education can improve employment opportunities.","Education","The education","An education","Education is an abstract uncountable concept used generically.","The would make it a specific identified education system/experience.","An is not used with education in this uncountable generic sense."),
q("She is studying at ___ university in the north of the country.","a","the","an","The sentence introduces one non-specified university; use a.","The would refer to a university identifiable to the reader.","An is incorrect because university begins with a consonant /j/ sound."),
q("___ university we visited yesterday has a historic library.","The","A","Zero article","Yesterday's visit identifies a specific university, so use the.","A would introduce a non-specific member of the category.","Zero article is not used before this singular countable noun phrase."),
q("___ research into sleep patterns has increased in recent years.","Research","The research","A research","Research is uncountable and generic in this broad statement.","The would refer to specific research already identifiable.","A is not used with research in the generic uncountable sense."),
q("Children usually start ___ at the age of five.","school","the school","a school","Start school is the fixed expression for beginning formal education as an activity.","The school refers to a particular institution or building, not the general activity.","A school would mean one unspecified school as a place, not the conventional activity expression."),
]},
"B2-21":{base:"punctuation",skillTarget:"punctuation-complex-sentences-academic-writing",profile:{
label:"punctuation and complex academic sentences",
core:"Academic punctuation clarifies clause boundaries, relationships and information hierarchy. A comma alone cannot join two independent clauses; semicolons can link closely related independent clauses, colons introduce explanations/lists, and commas mark introductory or non-essential material.",
form:"Independent clause; independent clause. Independent clause: explanation/list. Introductory subordinate clause, main clause. Non-defining relative clause, set off with commas. Use commas in coordinate clauses where needed; avoid comma splices and run-ons.",
selection:"Найди finite clauses and determine whether each is independent or subordinate. Then choose punctuation that shows the relation without creating a comma splice or fragment.",
contrast:"Because the sample was small, the result was tentative (subordinate + main). The sample was small; the result was tentative (two independent clauses). The sample was small, so the result was tentative (coordinated clauses).",
boundary:"Punctuation conventions vary somewhat by style guide, especially serial comma and dash usage. The structural requirement remains: punctuation must reflect syntax, not simply pause length.",
traps:[
["The sample was small, the result was uncertain.","The sample was small; the result was uncertain.","A comma alone cannot join two independent clauses; use semicolon or conjunction.","The original comma splice joins two complete clauses without a coordinator."],
["The study included three groups; control, treatment A, and treatment B.","The study included three groups: control, treatment A, and treatment B.","A colon introduces the list explaining the preceding independent clause.","A semicolon is not the standard punctuation introducing a list in this structure."],
["Although the findings were promising. The sample was small.","Although the findings were promising, the sample was small.","Although introduces a subordinate clause that needs a main clause.","The original first sentence is a fragment because although-clause cannot stand alone."]
],
examples:[
["Because the sample was small, the authors avoided broad conclusions.","Поскольку выборка была небольшой, авторы избегали широких выводов.","Introductory subordinate clause is followed by a comma."],
["The sample was small; the confidence interval was wide.","Выборка была небольшой; доверительный интервал был широким.","Semicolon links closely related independent clauses."],
["The study had one limitation: the follow-up period was short.","У исследования было одно ограничение: период наблюдения был коротким.","Colon introduces the explanation."],
["The participants, who had completed the survey, received a certificate.","Участники, которые завершили опрос, получили сертификат.","Non-defining relative clause is enclosed in commas."]
],
toefl:"Accurate punctuation helps maintain clause clarity and sentence control in Academic Discussion and in any typed response; punctuation errors can obscure logical relationships."
},drills:[
q("Which punctuation mark is the conventional neutral choice for joining two closely related independent clauses when the second does not explain or introduce the first?","a semicolon","a comma","a colon","A semicolon joins two closely related independent clauses without a coordinating conjunction.","A comma alone would create a comma splice.","A colon normally introduces an explanation, illustration or elaboration, which the prompt explicitly rules out."),
q("The report had two aims___ to measure accuracy and to assess reliability.","two aims:","two aims,","two aims;","A colon introduces the list explaining the two aims.","A comma alone does not clearly introduce the explanatory list after a complete clause.","A semicolon is not the usual mark to introduce a list after a complete clause."),
q("Although the results were promising___ the sample was too small.","promising,","promising;","promising.","The introductory although-clause is subordinate and is followed by a comma before the main clause.","A semicolon cannot normally separate a subordinate clause from its main clause.","A full stop would leave the although-clause as a fragment."),
q("All 120 participants___ who had all completed the second survey___ received a follow-up email.","participants, / survey,","participants; / survey;","participants: / survey:","The noun phrase All 120 participants already identifies the complete group; the relative clause adds non-defining information and is set off by commas.","Semicolons do not normally enclose a non-defining relative clause within this sentence.","Colons do not mark a non-defining relative clause."),
q("The method was reliable, ___ it was expensive.","but",";","because of","But coordinates two independent clauses and marks contrast.","A semicolon alone could be possible but would require punctuation as a semicolon rather than comma + blank; the provided item tests conjunction choice.","Because of requires a noun phrase and does not connect two finite clauses in this structure."),
q("The initial results were consistent across all three groups; ___, the follow-up study produced a contradictory pattern.","nevertheless","therefore","for example","Nevertheless marks the contrast between the consistent initial results and the contradictory follow-up pattern.","Therefore signals a consequence, not the unexpected contrast presented here.","For example introduces an illustration, not a contrasting result."),
q("Which sentence avoids a comma splice?","The data were incomplete, so the analysis was postponed.","The data were incomplete, the analysis was postponed.","The data were incomplete, however the analysis was postponed.","So coordinates the two clauses with a conjunction and comma.","This joins two independent clauses with only a comma.","However is a sentence adverbial and needs stronger punctuation, such as a semicolon followed by however and a comma.")
]}
};

module.exports['B2-14'].profile.examples = [
  ['Although the evidence is limited, the conclusion remains useful.','Хотя доказательств мало, вывод остаётся полезным.','Although introduces a finite clause; the contrast is between limited evidence and a useful conclusion.'],
  ['Despite the high cost, the method was adopted widely.','Несмотря на высокую стоимость, метод получил широкое распространение.','Despite is followed by a noun phrase, not a finite clause.'],
  ['Even though Matt does not speak Spanish, he should still visit Madrid.','Хотя Мэтт не говорит по-испански, ему всё равно стоит посетить Мадрид.','Even though presents a known fact.'],
  ['Even if Matt does not speak Spanish, he should still visit Madrid.','Даже если Мэтт не говорит по-испански, ему всё равно стоит посетить Мадрид.','Even if presents a hypothetical condition.']
];
module.exports['B2-14'].profile.traps = [
  ['Even if Matt does not speak Spanish, he should still visit Madrid. (known fact)','Even though Matt does not speak Spanish, he should still visit Madrid.','Even though presents the known fact; even if presents a hypothetical condition.'],
  ['Although the high cost, the method was adopted widely.','Despite the high cost, the method was adopted widely.','Although requires a finite clause; despite takes a noun phrase.'],
  ['Whereas there is no evidence that Rob cheated, we were astonished.','While there is no evidence that Rob cheated, we were astonished.','The first clause expresses concession here; concessive while is the appropriate pattern in the checked unit.']
];
module.exports['B2-14'].profile.pronunciation = 'Practise sentence stress and connected-speech reductions in although, though, despite, while and whereas.';
module.exports['B2-14'].profile.toefl = 'In academic reading, identify whether the linker introduces a clause or noun phrase and track contrast. In writing, use concession to qualify a claim without weakening its logic.';
module.exports['B2-14'].drills.splice(5,1,q('The diesel model of the car, while ___ expensive, is better value for money.','more','most','much','While introduces a concessive qualification; more completes the comparative phrase.','Most is a superlative and changes the meaning.','Much cannot modify expensive in this comparative construction.'));

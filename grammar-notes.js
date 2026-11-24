const grammarNotes = [
'В утверждении с he/she/it добавь -s: she reads. После -sh/-ch обычно -es: he watches. После does глагол теряет -s: Does she read?',
'Проверь am/is/are перед -ing: The train is leaving. При удвоении согласной: run → running. Know обычно употребляется в простой форме.',
'Сравни привычку и временную ситуацию: I work in a library. This week I am working from home. Think может означать мнение или процесс размышления.',
'В утвердительной форме нужен прошедший глагол: We saw a fox. После did употребляй see. Be образует вопросы самостоятельно: Were you there?',
'Запоминай неправильные формы парами: bring → brought, teach → taught. В вопросе к подлежащему did обычно отсутствует: Who brought the map?',
'Was/were + -ing показывает процесс в конкретный момент: At six I was cooking. Состояние обычно выражай простой формой: I knew the answer.',
'Фон выражается длительной формой, отдельное событие — простой: While I was walking, the lights went out. While может связывать и два процесса.',
'Have/has + третья форма: She has written twice. С yesterday и last year обычно Past Simple. Yet обычно стоит в конце вопроса или отрицания.',
'Для намерения используй going to, для договорённости — Present Continuous: I am meeting Ana on Friday. Для расписания возможен Present Simple.',
'После модальных глаголов нужен инфинитив без to: She can swim. Must not — запрет, do not have to — отсутствие необходимости.',
'A/an зависит от звука: an hour, a university. The указывает на известный объект. Обобщение во множественном числе часто обходится без артикля.',
'In July, on Monday, at noon. Перед next/last/this время часто употребляется без предлога: next Monday. Отдельно учи сочетания depend on и interested in.',
'If + Present Simple, will + инфинитив: If it rains, we will stay. В придаточном условия для обычного будущего will не нужен.',
'If + Past Simple, would + инфинитив: If I had time, I would help. Were часто употребляют для гипотез: If I were you.',
'Advice и information обычно неисчисляемые: a piece of advice. Paper может означать материал или отдельную статью: some paper, two papers.',
'Few с исчисляемыми, little с неисчисляемыми. A few и a little подчёркивают наличие некоторого количества: We have a little time.',
'Short → shorter, useful → more useful, good → better. После сравнения используй than: The second route is much shorter than the first.',
'The most полезно с длинными прилагательными. Good → the best. В one of the best после прилагательного обычно множественное число.',
'Usually ставится перед смысловым глаголом, но после be: She is usually early. Hard означает усердно, hardly — едва.',
'In 2023 завершено, so far связано с настоящим: We visited in 2023. We have visited twice so far. For может сочетаться с обоими временами.',
'Have/has been + -ing подчёркивает длительность: I have been waiting for an hour. С know обычно Present Perfect Simple: I have known him for years.',
'Had + третья форма относит действие к моменту до другого прошлого события: They had left when I arrived. При ясной последовательности часто хватает Past Simple.',
'Had been + -ing показывает уже шедший процесс: The ground was wet because it had been raining. Had rained сообщает о факте дождя.',
'Will be + -ing: At eight we will be travelling. В вежливом вопросе форма помогает спросить о планах: Will you be using the room?',
'Will have + третья форма: By noon we will have finished. By обозначает крайний срок, until — продолжение до момента.',
'Для закономерности используй Present Simple в обеих частях: If you heat ice, it melts. When уместно для ожидаемой последовательности.',
'If + had + третья форма, would have + третья форма: If I had known, I would have called. Оба события относятся к воображаемому прошлому.',
'Прошлое условие может влиять на настоящее: If I had slept more, I would feel better now. Выбирай форму каждой части по её времени.',
'В пассиве be согласуется со временем: is made, was made, has been made. By вводит исполнителя, когда он важен.',
'Modal + be + третья форма: The form must be signed. Для прошлого предположения возможно might have been signed.',
'После said обычно that или сразу предложение. Told требует адресата: She told me. Если утверждение всё ещё актуально, сдвиг времени не всегда нужен.',
'В косвенном вопросе прямой порядок слов: He asked where I lived. Yes/no-вопросы вводятся if или whether.',
'Defining clause уточняет объект: The book that I borrowed was useful. Относительное местоимение можно опустить, когда оно дополнение.',
'Дополнительную информацию выделяй запятыми: Ada, who lives nearby, helped us. В таком обороте that не используется.',
'Enjoy требует -ing, decide — to + глагол. Stop talking — прекратить говорить, stop to talk — остановиться, чтобы поговорить.',
'Remind someone to do, suggest doing. После make в активе: They made us wait. В пассиве возвращается to: We were made to wait.',
'Must be — сильная уверенность, might be — возможность, cannot be — уверенность в невозможности. Must not обычно означает запрет.',
'Must have + третья форма выражает вывод о прошлом. Might have — возможность, cannot have — невозможность.',
'Wish + Past Simple выражает желание изменить настоящее: I wish I had more time. Wish + Past Perfect — сожаление о прошлом.',
'Used to live — прежняя привычка. Be used to living — привычность. Get used to living — процесс привыкания.',
'В обычном tag после утверждения отрицание: She is ready, isn’t she? После I am используется aren’t I? После Let’s — shall we?',
'Во вложенном вопросе подлежащее перед глаголом: Do you know when it starts? Для yes/no используй if или whether.',
'Although + предложение, despite + существительное или -ing. Despite the fact that тоже допускает полное предложение.',
'Because + предложение, because of + существительное. Therefore связывает вывод с предыдущим утверждением: It rained. Therefore, the match was delayed.',
'После Never или Rarely в начале поставь вспомогательный глагол перед подлежащим: Rarely do we see such results. Форма характерна для формального стиля.',
'В причастном обороте исполнитель должен совпадать с подлежащим: Walking home, I saw a fox. Пассивный оборот: Built in 1900, the bridge is still in use.'
];
// Each unit has a contextual written response with a form-specific explanation.
const contextualGrammar = [
 [
  "Use the verb in brackets: The ferry ___ twice an hour, even in winter. (leave)",
  "leaves",
  "Ferry — один паром. Для регулярного действия в третьем лице добавь -s."
 ],
 [
  "Complete with the present continuous: Wait outside; the nurse ___ the room. (clean)",
  "is cleaning",
  "Действие идёт сейчас. Для the nurse нужны is и форма cleaning."
 ],
 [
  "Complete the contrast: The fabric usually feels smooth, but today the tailor ___ it for hidden seams. (feel, present continuous)",
  "is feeling",
  "В первом случае feel описывает свойство ткани. Во втором это намеренное действие портного."
 ],
 [
  "Use the past simple: We ___ the launch from the hill last night. (see)",
  "saw",
  "Last night задаёт законченное время. У see неправильная форма saw."
 ],
 [
  "Complete the question: How much did the replacement part ___? (cost)",
  "cost",
  "Прошедшее время уже выражено did. После него нужна начальная форма cost."
 ],
 [
  "At 8:15 yesterday the two guides ___ the border on foot. (cross, past continuous)",
  "were crossing",
  "Two guides — множественное число. Were crossing показывает процесс в указанный момент."
 ],
 [
  "Complete the interrupted action: While I ___ the glass, a crack appeared. (polish, past continuous)",
  "was polishing",
  "Длительный фон выражен was polishing. Короткое событие выражено appeared."
 ],
 [
  "Give the present perfect form: So far the rescue crew ___ three boats back to shore. (bring)",
  "has brought",
  "So far связывает события с настоящим. Crew здесь рассматривается как одна команда. Третья форма bring — brought."
 ],
 [
  "Complete the spontaneous offer with will: Your bag looks heavy. I ___ it upstairs. (carry)",
  "will carry",
  "Решение помочь принято в момент разговора. После will идёт начальная форма."
 ],
 [
  "Correct only the modal phrase: Passengers must to keep their tickets. Write the two-word replacement.",
  "must keep",
  "После must не ставят частицу to."
 ],
 [
  "Supply one article: A volunteer found a key near the gate. She handed ___ key to reception.",
  "the",
  "Ключ уже представлен читателю, поэтому при повторном упоминании нужен the."
 ],
 [
  "Supply the preposition: The telescope will be ready ___ noon on Friday.",
  "at",
  "Точное время — at noon. Для дня используется on Friday."
 ],
 [
  "Use the present simple after unless: We will lose our seats unless the driver ___ soon. (arrive)",
  "arrives",
  "Unless значит «если не». В условии будущего времени нужен Present Simple."
 ],
 [
  "Use would: If the path were wider, cyclists ___ each other safely. (pass)",
  "would pass",
  "Нереальное условие дано в Past Simple. Его возможный результат выражается would + V."
 ],
 [
  "Replace the incorrect noun phrase with a phrase using piece: Could you give me an advice? Write only the replacement for an advice.",
  "a piece of advice",
  "Advice неисчисляемое. Чтобы назвать один совет, используй a piece of advice."
 ],
 [
  "Complete with a few or a little: Only ___ seats remained, so the club added another row.",
  "a few",
  "Seats можно посчитать. A few обозначает небольшое положительное число."
 ],
 [
  "Use a comparative: The repaired pump is ___ than the old one. (quiet)",
  "quieter",
  "После сравнительной степени для второго объекта используется than. Принятая здесь краткая форма — quieter."
 ],
 [
  "Use the superlative with the article: Of all the proposals, Lena's was ___. (convincing)",
  "the most convincing",
  "Для длинного прилагательного нужна конструкция the most + adjective."
 ],
 [
  "Use the adverb: The bell rang so ___ that even the people outside heard it. (loud, use -ly)",
  "loudly",
  "Наречие loudly описывает, как прозвучал звонок."
 ],
 [
  "Supply the past simple: The town ___ a record number of visitors in 2019. (attract)",
  "attracted",
  "In 2019 указывает на законченный период. Present Perfect здесь не подходит."
 ],
 [
  "Use the present perfect continuous: My hands are covered in clay because I ___ bowls all morning. (make)",
  "have been making",
  "Следы недавнего процесса видны сейчас. Для I нужны have been + V-ing."
 ],
 [
  "Use the past perfect: By the time we found the trail, the sun ___. (set)",
  "had set",
  "Закат произошёл раньше другого события в прошлом. Третья форма set совпадает с начальной."
 ],
 [
  "Use the past perfect continuous: The players were tired because they ___ since dawn. (practise, British spelling)",
  "had been practising",
  "Период тренировок длился до прошлого момента. После had been нужна форма practising."
 ],
 [
  "Use the future continuous: At this time tomorrow the band ___ outside the station. (perform)",
  "will be performing",
  "At this time tomorrow задаёт момент, когда действие будет в процессе."
 ],
 [
  "Use the future perfect: By the end of August our team ___ the final bridge inspection. (complete)",
  "will have completed",
  "By обозначает срок завершения в будущем. Используй will have и причастие прошедшего времени."
 ],
 [
  "State a general rule in the present simple: If the sensor detects smoke, the alarm ___. (ring)",
  "rings",
  "Это правило работы системы. В обеих частях уместен Present Simple."
 ],
 [
  "Use the third conditional: If the guide had checked the map, we ___ the turning. (not miss, full form)",
  "would not have missed",
  "Возможность в прошлом уже упущена. В результате нужен would not have + V3."
 ],
 [
  "Use would to describe the present result: If I had kept the receipt, I ___ able to return the shoes now. (be)",
  "would be",
  "Причина относится к прошлому, а результат — к настоящему, о чём говорит now."
 ],
 [
  "Use the past simple passive: Two mosaics ___ during repairs last spring. (discover)",
  "were discovered",
  "Мозаики обнаружили другие люди. Для множественного числа нужны were и третья форма глагола."
 ],
 [
  "Use the modal passive: All safety records must ___ until the inspection. (keep)",
  "be kept",
  "После must в пассиве идут be и причастие. Keep → kept."
 ],
 [
  "Report the words later, after the plan has changed: 'I will call on Tuesday.' She said that she ___ on Tuesday. (call, use would)",
  "would call",
  "Will превращается в would при согласовании времён. Подлежащее остаётся перед глаголом."
 ],
 [
  "Report the question: 'Where is the nearest exit?' They asked where the nearest exit ___. Use backshift.",
  "was",
  "В косвенном вопросе порядок слов прямой. При заданном сдвиге времени is переходит в was."
 ],
 [
  "Use a relative pronoun meaning possession: We interviewed the artist ___ sketch won the competition.",
  "whose",
  "Эскиз принадлежит художнику. Отношение принадлежности передаёт whose."
 ],
 [
  "Use a relative pronoun: The observatory, ___ opened in 1920, still welcomes visitors.",
  "which",
  "Между запятыми находится дополнительная информация о предмете. Здесь используется which."
 ],
 [
  "Use the correct form of wait: The passengers avoided ___ outside in the rain.",
  "waiting",
  "После avoid ставится герундий — waiting."
 ],
 [
  "Complete the infinitive: The curator persuaded the owner ___ the portrait. (lend)",
  "to lend",
  "Persuade строится по схеме persuade someone to do something."
 ],
 [
  "Make a strong negative deduction using can't: The lights are on, but that ___ our flat; ours is upstairs. (be)",
  "can't be",
  "Положение квартиры исключает предположение. Для уверенного отрицательного вывода подходит can't be."
 ],
 [
  "Use might have: I do not know where the parcel is. The courier ___ it next door. (leave)",
  "might have left",
  "Событие возможно, но не доказано. Для догадки о прошлом используй might have + V3."
 ],
 [
  "Use the past perfect: I wish I ___ a backup before the disk failed. (make)",
  "had made",
  "Сожаление касается уже случившегося. После wish используется Past Perfect."
 ],
 [
  "Use the -ing form: After a month on night shifts, I am used to ___ before noon. (sleep)",
  "sleeping",
  "В be used to слово to — предлог. После него возможен герундий."
 ],
 [
  "Complete the negative question tag: Nina has finished the survey, ___ she? Use a contraction.",
  "hasn't",
  "В основной части утвердительный Present Perfect. В теге повторяется вспомогательный has с отрицанием."
 ],
 [
  "Put the words in statement order: Do you know where ___? (does / the / stop / bus; omit the extra auxiliary and inflect the verb)",
  "the bus stops",
  "Внутри косвенного вопроса нет инверсии и does. Окончание -s возвращается к stops."
 ],
 [
  "Use despite or although: ___ the route was steep, everyone reached the top.",
  "Although",
  "После пропуска есть подлежащее и сказуемое. Although вводит целое предложение."
 ],
 [
  "Use because or because of: The concert ended early ___ a power cut.",
  "because of",
  "A power cut — именная группа. Перед ней подходит because of."
 ],
 [
  "Complete the inversion: Never before ___ the island experienced such severe flooding. Use the past perfect.",
  "had",
  "После начального Never before вспомогательный had ставится перед подлежащим."
 ],
 [
  "Use a perfect participle: ___ the figures twice, we sent the report. (check)",
  "Having checked",
  "Проверка завершилась раньше отправки. Оба действия выполняла одна и та же группа — we."
 ]
];
scenes.push(...[
 [
  "A film screening",
  "reserve a seat|забронировать место|We reserved two seats in the front row.;join a queue|встать в очередь|Late arrivals must join a queue.;sell out|распродаваться|Evening screenings often sell out.;print a ticket|распечатать билет|You can print a ticket at the desk.;show proof of age|показать документ с возрастом|Visitors may need to show proof of age.;stay for a discussion|остаться на обсуждение|Several viewers stayed for a discussion.",
  "Clerk: Your booking is for the outdoor screening. Visitor: But it's pouring. Has it been cancelled? Clerk: We've moved it to Hall B. Keep your original ticket. The discussion afterwards is cancelled because the director's train is delayed.",
  "What can the visitor still do with the original ticket?",
  "Watch the film indoors.",
  "Attend the discussion with the director.",
  "Choose any film next week."
 ],
 [
  "Returning a parcel",
  "keep the receipt|сохранить чек|Please keep the receipt for a month.;request a refund|запросить возврат денег|I requested a refund for the lamp.;cover the cost|покрыть расходы|The shop covered the cost of postage.;pack securely|надёжно упаковать|Pack the glass securely.;track a parcel|отследить посылку|You can track a parcel online.;meet a deadline|уложиться в срок|We posted the box early to meet the deadline.",
  "Customer: The lamp arrived with a broken base. Do I have to pay to send it back? Clerk: We usually charge for returns, but that rule only applies when someone changes their mind. I'll email you a prepaid label. Please wrap the base separately.",
  "Why is the customer getting a prepaid label?",
  "The item arrived damaged.",
  "The customer has changed their mind.",
  "The parcel was delivered late."
 ],
 [
  "Choosing a walking route",
  "follow a trail|идти по тропе|Follow the trail past the lake.;cross a stream|перейти ручей|We crossed a stream on flat stones.;take a shortcut|срезать путь|You can take a shortcut through the field.;reach a viewpoint|добраться до смотровой площадки|We reached the viewpoint before lunch.;lose your way|сбиться с пути|It is easy to lose your way in fog.;turn back|повернуть обратно|We turned back when the clouds thickened.",
  "Guide: The ridge trail is only three kilometres, but loose stones make it slow. The forest trail is longer and mostly flat. If you have to catch the noon bus, take the forest trail. Both paths end at the same stop.",
  "Why does the guide recommend the longer trail?",
  "Its surface makes it quicker to walk.",
  "It passes a different bus stop.",
  "It offers a better view of the ridge."
 ],
 [
  "Borrowing tools",
  "borrow a drill|взять дрель на время|Can I borrow a drill until Monday?;pay a deposit|внести залог|Members pay a deposit for large tools.;sign a form|подписать форму|Each borrower signs a form.;wear goggles|носить защитные очки|Wear goggles when cutting wood.;bring something back|вернуть вещь|Please bring the drill back on time.;in good condition|в хорошем состоянии|The ladder was still in good condition.",
  "Borrower: Is the ten-pound payment the price of using the drill? Volunteer: No, use is free for members. We hold that money until you return the tool. If everything is in good condition, you get the full amount back.",
  "When will the borrower receive the money back?",
  "When the undamaged tool is returned.",
  "When membership expires.",
  "When a second tool is borrowed."
 ],
 [
  "A pottery class",
  "shape the clay|придать глине форму|Shape the clay with wet hands.;smooth the surface|разгладить поверхность|Use a sponge to smooth the surface.;let something dry|дать чему-то высохнуть|Let the bowl dry overnight.;fire a pot|обжечь горшок|We fire each pot in a kiln.;pick up an order|забрать заказ|I picked up my order on Tuesday.;handle with care|обращаться бережно|Handle the thin cups with care.",
  "Instructor: You may take photographs of your bowls today, but the bowls themselves must stay here. Thick clay can crack in the kiln if it still contains water. We will fire the bowls once they have dried, and text you when they are ready.",
  "Why must participants leave their bowls in the studio?",
  "The clay needs to dry before firing.",
  "The bowls will be sold tomorrow.",
  "Photographs are needed for a contest."
 ],
 [
  "A rehearsal schedule",
  "warm up|разогреться|Singers warm up before practice.;read sheet music|читать ноты|Can you read sheet music?;keep time|держать ритм|The drummer helps us keep time.;miss a rehearsal|пропустить репетицию|I missed a rehearsal last week.;take a break|сделать перерыв|We take a break after the first hour.;play by ear|подбирать музыку на слух|She can play familiar songs by ear.",
  "Conductor: Strings, please arrive at five to work on the opening. Wind players usually come at five too, but today they can arrive half an hour later. The full group will start with the final movement as soon as everyone is here.",
  "Who should arrive at five thirty today?",
  "The wind players.",
  "The string players.",
  "Only the conductor."
 ],
 [
  "The repair café",
  "identify the fault|определить неисправность|We identified the fault in the switch.;order a spare part|заказать запчасть|The technician ordered a spare part.;take something apart|разобрать предмет|Take the handle apart carefully.;put something back together|собрать обратно|We put the clock back together.;work properly|работать исправно|The lamp now works properly.;reduce waste|сокращать отходы|Repairing appliances helps reduce waste.",
  "Volunteer: Your radio works when it is plugged in, so the speaker is fine. The metal contact in the battery compartment is loose. We can show you how to fix it today. You won't need to buy a replacement radio.",
  "What evidence suggests that the speaker works?",
  "The radio plays when connected to a socket.",
  "The battery cover is new.",
  "The volunteer has a replacement radio."
 ],
 [
  "Sharing an apartment",
  "split the bill|разделить счёт|We split the bill equally.;pay rent|платить за аренду|We pay rent on the first of each month.;draw up a schedule|составить график|Let's draw up a cleaning schedule.;take out the rubbish|вынести мусор|I take out the rubbish on Tuesdays.;agree on a date|согласовать дату|We agreed on a date for the move.;give notice|заранее предупредить об уходе|Tenants must give notice before moving out.",
  "Tenant: The rent looks lower than the room across the street. Landlord: That room includes electricity. Here, tenants split the electricity bill separately. Water is included in both places. Compare your likely total before you decide.",
  "Which cost must the tenant add to the advertised rent here?",
  "Electricity.",
  "Water.",
  "A cleaning service."
 ],
 [
  "Checking a survey",
  "collect responses|собрать ответы|We collected responses at the station.;reach a sample|охватить выборку|Online forms can reach a large sample.;phrase a question|сформулировать вопрос|Phrase a question without suggesting an answer.;lead to bias|привести к смещению результатов|Polling one class can lead to bias.;draw a conclusion|сделать вывод|We need more data to draw a conclusion.;interpret a result|интерпретировать результат|Two teams interpreted the result differently.",
  "Researcher: Most people in our survey wanted longer evening library hours. But we interviewed visitors at eight in the evening. People who study in the morning had little chance to answer. Before recommending a policy, we should collect responses at other times.",
  "What is the main problem with the survey?",
  "The interview time favoured one group of users.",
  "The survey contained too many questions.",
  "Morning users opposed longer hours."
 ],
 [
  "Restoring a wall painting",
  "examine a sample|изучить образец|The artist examined a sample of paint.;remove a layer|снять слой|They removed a layer of dust.;avoid damage|избежать повреждений|Soft brushes help avoid damage.;carry out a test|провести испытание|The team carried out a test in one corner.;record a change|зафиксировать изменение|Photographs recorded each change.;preserve a detail|сохранить деталь|The careful work preserved a tiny detail.",
  "Conservator: A bright patch appeared when we cleaned the corner. Some visitors want us to clean the whole wall immediately. Yet the paint in the centre may be less stable than the paint at the edge. We need to test it before extending the treatment.",
  "Why is the conservator testing a second area?",
  "Different parts of the painting may react differently.",
  "Visitors asked for a brighter colour.",
  "The first test left the wall darker."
 ],
 [
  "Interpreting a weather record",
  "record rainfall|регистрировать осадки|This gauge records rainfall every hour.;compare readings|сопоставить показания|We compared readings from both stations.;spot a pattern|заметить закономерность|Long records help us spot a pattern.;rule out an error|исключить ошибку|Check the sensor to rule out an error.;allow for variation|учитывать изменчивость|The estimate allows for seasonal variation.;make a prediction|сделать прогноз|One wet week is too little evidence to make a prediction.",
  "Lecturer: Our coastal gauge recorded less rain after March. Did local weather change? In March a tall fence was built beside the gauge. Wind blowing over the fence may carry drops past the instrument. Compare it with another gauge before treating the decline as a weather trend.",
  "Which explanation should the researchers investigate?",
  "A change near the gauge affected its readings.",
  "The coast received no rain before March.",
  "The second gauge caused the decline."
 ],
 [
  "Funding a community service",
  "set a budget|установить бюджет|The council set a budget for the year.;weigh the benefits|взвесить преимущества|We weighed the benefits of longer hours.;cover running costs|покрыть текущие расходы|Tickets cover running costs.;allocate funds|распределить средства|The committee allocated funds to two districts.;retain access|сохранить доступ|Residents should retain access to the hall.;justify an expense|обосновать расход|The team justified the expense with usage figures.",
  "Chair: A grant could pay for a second minibus, but it cannot pay a driver. Buying the vehicle would increase the number of trips only if we also find money for wages. Count staffing costs before promising an expanded service.",
  "Why might buying another minibus fail to increase service?",
  "The grant does not pay for an extra driver.",
  "Residents are unable to use the new vehicle.",
  "The grant covers wages only."
 ]
]);

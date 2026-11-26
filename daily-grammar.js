// Original campus exchanges for topic-specific TOEFL practice.
const grammarExchanges = {
  "A1-01": ["What do the volunteers read?","The volunteers/read/the new/list."],
  "A1-02": ["Who is the new tutor?","She/is/our new/tutor."],
  "A1-03": ["Is the upstairs room open?","The upstairs room/is not/open/today."],
  "A1-04": ["What did you find in the drawer?","I found/a pen/and/an envelope."],
  "A1-05": ["What does the receptionist do every morning?","The receptionist/checks/the mail/every morning."],
  "A1-06": ["Does your class meet on Fridays?","Our class/does not/meet/on Fridays."],
  "A1-07": ["Who has the office keys?","The new guide/has/both/keys."],
  "A1-08": ["What is on the noticeboard?","There is/a map/on the/noticeboard."],
  "A1-09": ["Whose badge is this?","This/is/my/visitor badge."],
  "A1-10": ["What do you need for lunch?","We need/some bread/and/two apples."],
  "A1-11": ["What did they put by the entrance?","They put/a small/wooden bench/by the entrance."],
  "A1-12": ["How often does Jo visit?","Jo/usually/visits/on Tuesdays."],
  "A1-13": ["What is happening outside?","The students/are painting/a sign/outside."],
  "A1-14": ["Is the library your usual workplace?","I usually/work/at home/but today I am working here."],
  "A1-15": ["Can the assistant help with the map?","The assistant/can/read/this map."],
  "A1-16": ["What should I do with the form?","Put/the signed form/in/the tray."],
  "A1-17": ["Why did Sam stay at college?","Sam stayed/because/the lab/was open."],
  "A1-18": ["When and where do we meet?","We meet/at noon/in/the foyer."],
  "A1-19": ["What did the guide do yesterday?","The guide/found/the keys/yesterday."],
  "A2-01": ["How did you get here last week?","We/took/the morning bus/last week."],
  "A2-02": ["What was happening when the bell rang?","The tutor/was checking/the list/when the bell rang."],
  "A2-03": ["When did the lights fail?","The lights/went out/while we were/setting up."],
  "A2-04": ["What have you decided to do this weekend?","We/are going to/visit/the campus."],
  "A2-05": ["Why can you open the lab?","I/have just/collected/the key."],
  "A2-06": ["Did you send the form at a particular time?","I/sent/the form/yesterday afternoon."],
  "A2-07": ["What must visitors do first?","Visitors/must/show/their passes."],
  "A2-08": ["Which desk is easier to move?","The smaller desk/is lighter/than/the oak desk."],
  "A2-09": ["Which route do you recommend?","This/is/the shortest/route."],
  "A2-10": ["How much time is left?","We still/have/a little/time."],
  "A2-11": ["How did the guide explain the route?","The guide/explained/the route/clearly."],
  "A2-12": ["What does your colleague enjoy?","My colleague/enjoys/drawing/maps."],
  "A2-13": ["When does the office close?","What time/does/the office/close?"],
  "A2-14": ["Which app do you want?","I want/an app/that works/offline."],
  "A2-15": ["What will you do if the bus is late?","If the bus is late,/I will/walk/to class."],
  "A2-16": ["When will you call the tutor?","I will call/as soon as/the meeting/ends."],
  "A2-17": ["What time is the visit?","The tour/starts/at ten/on Monday."],
  "A2-18": ["Describe your routine and today's change.","I normally/cycle/to class/but today I am walking."],
  "B1-01": ["How long has your team been waiting?","We/have been waiting/since/the doors opened."],
  "B1-02": ["Why was the board blank when you arrived?","Someone/had already/erased/the notes."],
  "B1-03": ["Why did the technician need a break?","She/had been repairing/the lift/all morning."],
  "B1-04": ["The folders are heavy. Can anyone help?","I will/carry/the folders/for you."],
  "B1-05": ["What would you do with a bigger grant?","If we had a bigger grant,/we would/hire/another guide."],
  "B1-06": ["Why did you miss the opening?","If we had left earlier,/we would have/caught/the first bus."],
  "B1-07": ["Who checks each application?","Each application/is checked/by/two readers."],
  "B1-08": ["Did you repair the lens yourself?","I had/the broken lens/repaired/at the shop."],
  "B1-09": ["What is the rule in the archive?","Readers/must leave/their bags/outside."],
  "B1-10": ["Why is the gallery dark?","The staff/must have/switched off/the lights."],
  "B1-11": ["What did the speaker say about the projector?","She said/that the projector/had stopped/working."],
  "B1-12": ["What did Jo ask you?","Jo asked me/where/I had left/the badges."],
  "B1-13": ["Do you recall the actual visit?","I remember/visiting/the archive/as a child."],
  "B1-14": ["Tell me something extra about your tutor.","Our tutor,/who grew up nearby,/knows/the area well."],
  "B1-15": ["How has your commute changed?","I/used to/take/the early train."],
  "B1-16": ["You have registered already, correct?","You have/registered/for the workshop,/haven't you?"],
  "B1-17": ["Did the noise stop the session?","Although the hall was noisy,/the group/completed/the interview."],
  "B1-18": ["Give another advantage of this room.","Moreover,/the larger room/has/better lighting."],
  "B1-19": ["Where can I find the list?","The list/of eligible speakers/is/on the desk."],
  "B1-20": ["Who conducted the survey?","Our classmates/carried out/a survey/of commuters."],
  "B1-21": ["Which visitors need maps?","The visitors/waiting downstairs/need/new maps."],
  "B1-22": ["How different are the two estimates?","The revised estimate/is considerably/lower than/the first."],
  "B2-01": ["Why aren't you at the workshop now?","If I had booked in time,/I would/be/there now."],
  "B2-02": ["Under what condition may we use the room?","You may/use the room/provided that/you sign in."],
  "B2-03": ["Was it necessary to buy new folders?","We needn't/have bought/new folders/after all."],
  "B2-04": ["What is believed about the missing file?","The file/is believed/to have been/deleted."],
  "B2-05": ["How did the editor respond to the allegation?","The editor/denied/copying/the introduction."],
  "B2-06": ["Who arranged for the notice to be changed?","The director/had/the notice/replaced."],
  "B2-07": ["Tell me about the researcher who lost her notes.","The researcher/whose notes were missing/contacted/the librarian."],
  "B2-08": ["What did the reviewers do after checking the figures?","Having checked the figures,/the reviewers/approved/the draft."],
  "B2-09": ["How long is the placement?","The college/offers/a six-week/research placement."],
  "B2-10": ["Has application volume changed?","The number/of applications/has doubled/since May."],
  "B2-11": ["Where is the key you found yesterday?","The key/that I found yesterday/is/in my bag."],
  "B2-12": ["Can the panel draw a conclusion yet?","There is/too little/evidence/to draw a conclusion."],
  "B2-13": ["How does the second room compare?","The second room/is slightly/wider than/the first."],
  "B2-14": ["Did the short deadline prevent submission?","Despite the short deadline,/the team/submitted/the proposal."],
  "B2-15": ["Which part of the form caused the delay?","It was/the final signature/that delayed/the application."],
  "B2-16": ["Who else has booked a place?","Mia has booked/a place,/and Leo/has too."],
  "B2-17": ["When did the error become clear?","Only after the second test/did we/notice/the error."],
  "B2-18": ["How certain is the link between the variables?","The association/may reflect/differences in/prior experience."],
  "B2-19": ["On whose behalf did Jo speak?","Jo spoke/on behalf of/the evening/students."],
  "B2-20": ["What was the consequence of lower fares?","The reduction/in fares/increased/student participation."],
  "B2-21": ["Was the hall empty when you arrived?","The hall was open,/but/the office/was closed."],
  "C1-01": ["Had the team ever seen a similar pattern?","Never before/had the team/observed/such a clear pattern."],
  "C1-02": ["What would have happened without that grant?","Had the grant been refused,/the clinic/would have/closed."],
  "C1-03": ["What exactly did the panel dispute?","What the panel disputed/was/the accuracy of/the estimate."],
  "C1-04": ["Why did the team postpone the launch?","Having been denied access,/the team/postponed/the launch."],
  "C1-05": ["Who rejected the earlier proposal?","The board's rejection/of the proposal/delayed/the trial."],
  "C1-06": ["How did the volunteers act when the map was lost?","In the absence of a map,/the volunteers/asked for/directions."],
  "C1-07": ["When do people believe the work was completed?","The work/is thought/to have been completed/before the deadline."],
  "C1-08": ["What did the author acknowledge?","The author/acknowledged having/overlooked/an earlier estimate."],
  "C1-09": ["Is there only one explanation?","The change/might well reflect/variation in/the sample."],
  "C1-10": ["What else did the trial achieve?","Not only did the trial reduce costs,/but it also/improved/access."],
  "C1-11": ["How do the rural rates compare?","The rural rates/are lower than/those of/the urban centres."],
  "C1-12": ["What does the witness remember?","The witness/remembered seeing/the sign/before the gate closed."],
  "C1-13": ["How large was the difference?","The second estimate/was only marginally/higher than/the first."],
  "C1-14": ["What conclusion can you draw from this pilot?","Among these respondents,/longer waits/were associated with/lower satisfaction."]
};

function scheduledGrammar(elapsedDays, profile) {
  const ids = window.grammarBulkCurriculumIds;
  const introduction = profile === 'marina' ? ['A1-05', 'A1-19', 'A2-01'] : ['A1-01'];
  const offset = elapsedDays - introduction.length;
  const position = offset < 0 ? 0 : Math.floor(offset / 7) * 5 + [0,1,2,3,4,2,0][offset % 7];
  const id = offset < 0 ? introduction[elapsedDays] : ids[position % ids.length];
  return dailyGrammarConfig(id);
}

function dailyGrammarConfig(id) {
  return window.grammarPilotLessons?.[id] || window.GrammarLessonEngine.config(id);
}

function dailyTheory(id) {
  const lesson = dailyGrammarConfig(id);
  return lesson.theory ? lesson.theory() : window.GrammarLessonEngine.theory(id);
}

function revisitDailyTheory() {
  const session = courseState().session;
  if (!session?.grammarId) return;
  modal('<article class="panel a105-theory">'+dailyTheory(session.grammarId)+'</article>'+btn('Вернуться к заданию','lessonScreen()','primary'));
  $('#modal').classList.add('lesson-fullscreen');
}

function curriculumItems(session, otherItems) {
  const lesson = dailyGrammarConfig(session.grammarId);
  const [cue, segmented] = grammarExchanges[lesson.id];
  const chunks = segmented.split('/');
  const model = chunks.join(' ');
  const order = chunks.slice(1).reverse().concat(chunks[0]);
  const theory = {stage:1, lecture:true, grammarId:lesson.id, title:lesson.title, info:lesson.title};
  const practice = lesson.items.map(item => ({
    stage:1, grammarId:lesson.id, grammarItemId:item.id, title:item.group,
    ask:item.prompt, choices:item.options, exact:!item.open, model:item.answer,
    accepted:item.accepted, rationales:item.distractorRationales,
    tip:item.open ? item.rubric.join(' ') : item.why
  }));
  const build = {stage:1,transferSkill:'Writing',title:'Build a Sentence · '+lesson.title,grammarId:lesson.id,
    ask:cue+' Собери ответ, начав с «'+chunks[0]+'». Фрагменты: '+order.join(' / '),
    model,exact:true,tip:'Сверь порядок фрагментов и форму сказуемого в ответе на реплику.'};
  const repetition = {stage:4,title:'Listen and Repeat · '+lesson.title,
    ask:'Repeat the sentence you heard.',audio:model,model,repeat:true,
    tip:'Повтори услышанное предложение целиком, сохраняя грамматическую форму и смысловые ударения.'};
  const remaining = otherItems.filter(item => item.stage >= 2 && !item.title.startsWith('Grammar into Speaking'));
  return [theory, ...practice, build, ...remaining.map(item => item.repeat ? repetition : item)];
}

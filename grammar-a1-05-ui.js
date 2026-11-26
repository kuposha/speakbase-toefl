(function(){
  const legacyGrammarLibraryView = window.grammarLibraryView;
  window.legacyGrammarLibraryView = legacyGrammarLibraryView;
  const a105Items = [
    {id:'D1',group:'Входная диагностика',prompt:'В предложении My brother lives in Berlin найди подлежащее.',options:['My brother','lives','in Berlin'],answer:'My brother',why:'Подлежащее называет того, о ком говорится в предложении: My brother.'},
    {id:'D2',group:'Входная диагностика',prompt:'Какое местоимение может заменить Anna?',options:['he','she','they'],answer:'she',why:'Anna — одно лицо женского рода, поэтому используем she.'},
    {id:'D3',group:'Входная диагностика',prompt:'Выбери правильную связку: They ___ students.',options:['is','are','am'],answer:'are',why:'С местоимением they используется форма be are.'},
    {id:'D4',group:'Входная диагностика',prompt:'Найди основной глагол: We study English.',options:['We','study','English'],answer:'study',why:'Study — смысловой глагол, который называет действие.'},
    {id:'G1',group:'Управляемая практика',prompt:'My sister ___ in a small studio.',options:['work','works','working'],answer:'works',why:'My sister = she. В утвердительном Present Simple после he/she/it добавляем -s.'},
    {id:'G2',group:'Управляемая практика',prompt:'They ___ English at university.',options:['studies','study','studys'],answer:'study',why:'They — множественное число, поэтому используется начальная форма study.'},
    {id:'G3',group:'Управляемая практика',prompt:'Mr Brown ___ science. (teach)',answer:'teaches',why:'Mr Brown = he. После -ch добавляем -es: teach → teaches.'},
    {id:'G4',group:'Управляемая практика',prompt:'Our teacher ___ a new laptop. (have)',answer:'has',why:'Have имеет особую форму has после he/she/it.'},
    {id:'G5',group:'Управляемая практика',prompt:'Исправь предложение: My friends goes to the gym on Fridays.',answer:'My friends go to the gym on Fridays.',why:'Friends — множественное число (they), поэтому go, а не goes.'},
    {id:'G6',group:'Управляемая практика',prompt:'Исправь предложение: Olivia study biology.',answer:'Olivia studies biology.',why:'Olivia = she; согласная + y меняется на -ies: study → studies.'},
    {id:'G7',group:'Управляемая практика',prompt:'Выбери предложение о регулярной привычке.',options:['The train leaves at 8 every morning.','The train is leaving right now.','The train left yesterday.'],answer:'The train leaves at 8 every morning.',why:'Every morning показывает повторяющееся расписание. Другие варианты описывают действие сейчас и прошлое событие.'},
    {id:'G8',group:'Управляемая практика',prompt:'Выбери предложение с общей закономерностью.',options:['Ice melts when it gets warm.','Ice melted in the glass yesterday.','The ice is melting in my hand right now.'],answer:'Ice melts when it gets warm.',why:'Это общее утверждение о закономерности, поэтому используется Present Simple.'},
    {id:'P1',group:'Произношение окончаний',prompt:'Какой звук слышен в конце слова works?',options:['/s/','/z/','/ɪz/'],answer:'/s/',why:'После глухого согласного /k/ окончание произносится как /s/.'},
    {id:'P2',group:'Произношение окончаний',prompt:'Какой звук слышен в конце слова plays?',options:['/s/','/z/','/ɪz/'],answer:'/z/',why:'После гласного звука окончание произносится как звонкий /z/.'},
    {id:'P3',group:'Произношение окончаний',prompt:'Какой звук слышен в конце слова watches?',options:['/s/','/z/','/ɪz/'],answer:'/ɪz/',why:'После звука /tʃ/ добавляется произносимый слог /ɪz/.'},
    {id:'I1',group:'Самостоятельная практика',prompt:'Complete: My brother ___ (fix) computers.',answer:'fixes',why:'My brother = he; после -x добавляем -es.'},
    {id:'I2',group:'Самостоятельная практика',prompt:'Complete: We ___ (watch) documentaries at weekends.',answer:'watch',why:'We требует начальную форму глагола без окончания.'},
    {id:'I3',group:'Самостоятельная практика',prompt:'Complete: The course ___ (finish) in December.',answer:'finishes',why:'The course = it; finish → finishes.'},
    {id:'I4',group:'Самостоятельная практика',prompt:'Complete: My neighbours ___ (live) upstairs.',answer:'live',why:'Neighbours — множественное число, поэтому используется live.'},
    {id:'I5',group:'Самостоятельная практика',prompt:'Correct: Daniel go to work by bus.',answer:'Daniel goes to work by bus.',why:'Daniel = he; go → goes.'},
    {id:'I6',group:'Самостоятельная практика',prompt:'Correct: The baby cry when she feels tired.',answer:'The baby cries when she feels tired.',why:'The baby = it; согласная + y меняется на -ies.'},
    {id:'I7',group:'Самостоятельная практика',prompt:'My parents ___ (own / owns) a small shop.',options:['own','owns'],answer:'own',why:'Parents — множественное число, поэтому own.'},
    {id:'I8',group:'Самостоятельная практика',prompt:'Напиши два предложения о привычках и одно предложение об устойчивом факте о себе или окружающем мире. Используй хотя бы один глагол после he/she/it.',open:true,rubric:['Смысл соответствует привычке, общему факту или устойчивой ситуации.','Подлежащее и форма глагола согласованы.','В третьем лице единственного числа правильно оформлено окончание.','Предложения понятны и естественны.']},
    {id:'E1',group:'Выходная проверка',prompt:'The manager ___ (work) in the city centre.',answer:'works',why:'Manager — единственное число; work → works.'},
    {id:'E2',group:'Выходная проверка',prompt:'My friends ___ (study) together.',answer:'study',why:'Friends — множественное число; используется study.'},
    {id:'E3',group:'Выходная проверка',prompt:'Исправь: Anna teach English.',answer:'Anna teaches English.',why:'Anna = she; teach → teaches после -ch.'},
    {id:'E4',group:'Выходная проверка',prompt:'Выбери лучшее описание общего факта.',options:['The Sun rises in the east.','The Sun is rising in the east right now.','The Sun rose in the east yesterday.'],answer:'The Sun rises in the east.',why:'Это общее утверждение о закономерности.'},
    {id:'E5',group:'Выходная проверка',prompt:'Напиши одно новое предложение о привычке другого человека.',open:true,rubric:['Предложение описывает привычку или регулярное действие.','Подлежащее выбрано понятно.','Если подлежащее he/she/it, глагол имеет правильную форму.']},
    {id:'S1',group:'Перенос в TOEFL Speaking',prompt:'What do you usually do to improve a skill? Построй ответ из 3–4 предложений: назови регулярное действие, добавь конкретную привычку, объясни, почему она помогает. Если говоришь о другом человеке, используй he/she + verb-s.',open:true,rubric:['Есть прямой ответ на вопрос.','Описано регулярное действие в Present Simple.','Есть конкретная привычка и объяснение.','Форма he/she/it согласована, если использована.']}
  ];
  function a105State(){const cs=courseState();return cs.grammarA105??=( {mode:'theory',pos:0,answers:{}} );}
  function a105Inline(value){return esc(value).replace(/\x60([^\x60]+)\x60/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');}
  function a105Markdown(markdown){
    const lines=markdown.split(/\r?\n/);let html='',paragraph=[],list='',table=[];
    const flushParagraph=()=>{if(paragraph.length){html+='<p>'+paragraph.map(a105Inline).join(' ')+'</p>';paragraph=[]}};
    const flushList=()=>{if(list){html+='</'+list+'>';list=''}};
    const flushTable=()=>{if(table.length){const rows=table.filter(line=>!/^\|?\s*:?-{3,}/.test(line));if(rows.length){html+='<div class="a105-table-wrap"><table>';rows.forEach((line,i)=>{const cells=line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(x=>x.trim());html+='<tr>'+cells.map(cell=>'<'+(i===0?'th':'td')+'>'+a105Inline(cell)+'</'+(i===0?'th':'td')+'>').join('')+'</tr>'});html+='</table></div>'}table=[]}};
    for(let i=0;i<lines.length;i++){const line=lines[i],t=line.trim();
      if(!t){flushParagraph();flushList();flushTable();continue}
      if(t.startsWith('|')){flushParagraph();flushList();table.push(t);continue}else flushTable();
      const heading=t.match(/^(#{2,4})\s+(.+)$/);if(heading){flushParagraph();flushList();html+='<h'+Math.min(5,Number(heading[1].length)+1)+'>'+a105Inline(heading[2])+'</h'+Math.min(5,Number(heading[1].length)+1)+'>';continue}
      if(/^---+$/.test(t)){flushParagraph();flushList();html+='<hr>';continue}
      const quote=t.match(/^>\s?(.*)$/);if(quote){flushParagraph();flushList();html+='<blockquote>'+a105Inline(quote[1])+'</blockquote>';continue}
      const bullet=t.match(/^[-*]\s+(.+)$/);const ordered=t.match(/^\d+\.\s+(.+)$/);
      if(bullet||ordered){flushParagraph();const tag=bullet?'ul':'ol';if(list!==tag){flushList();list=tag;html+='<'+tag+'>'}html+='<li>'+a105Inline((bullet||ordered)[1])+'</li>';continue}
      flushList();paragraph.push(t);
    }
    flushParagraph();flushList();flushTable();return html;
  }
  function a105TheoryHtml(){const source=window.grammarA105Markdown||'',start=source.indexOf('## 4. Объяснение'),end=source.indexOf('## 6. Управляемая практика');if(start<0||end<0)return '<p>Не удалось загрузить полный конспект урока.</p>';return a105Markdown(source.slice(start,end));}
  function a105Back(){const state=a105State();state.mode='catalog';persist();render()}
  function openGrammarA105(){const state=a105State();state.mode='theory';persist();render();window.scrollTo(0,0)}
  function a105StartPractice(){const state=a105State();state.mode='practice';state.pos=Math.min(state.pos||0,a105Items.length-1);state.answers=state.answers||{};persist();render();window.scrollTo(0,0)}
  function a105View(){
    const state=a105State();
    if(state.mode==='practice')return a105PracticeView(state);
    if(state.mode==='results')return a105ResultsView(state);
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="a105Back()">← К каталогу грамматики</button><span class="chip">A1 · A1-05</span></div><div class="a105-hero"><div class="eyebrow">Пилот полного формата · Speakbase</div><h2>Present Simple: утвердительные предложения</h2><p>Сначала — весь конспект. Практика откроется только после него. К этой теории можно вернуться в любой момент.</p><div class="a105-meta"><span>Полный конспект</span><span>Практика и выходная проверка</span><span>TOEFL Speaking transfer</span></div></div><section class="panel a105-goals"><h3>Результаты урока</h3><ul><li>Выбирать Present Simple для привычек, общих фактов и устойчивых состояний.</li><li>Строить утвердительные предложения с I/you/we/they и he/she/it.</li><li>Правильно писать формы на -s, -es, -ies и особую форму has.</li><li>Замечать и исправлять типичные ошибки согласования.</li></ul><p class="note">Рекомендуемый порядок: прочитай весь материал, запиши нужные правила в тетрадь, затем переходи к заданиям. Время не ограничено.</p></section><article class="panel a105-theory">'+a105TheoryHtml()+'</article><div class="a105-sticky"><span>Теория изучена? Переходи к заданиям в своём темпе.</span><button class="primary" onclick="a105StartPractice()">Перейти к практике</button></div></div>';
  }
  function a105PracticeView(state){
    const item=a105Items[state.pos];
    if(!item){state.mode='results';persist();return a105ResultsView(state)}
    const saved=state.answers[item.id];
    let control=item.options?'<select id="a105Answer" required><option value="">Выбери ответ</option>'+item.options.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('')+'</select>':'<textarea id="a105Answer" rows="4" placeholder="Напиши свой ответ...">'+(saved?esc(saved.value):'')+'</textarea>';
    let feedback='';
    if(saved){feedback=saved.open?'<div class="a105-feedback"><b>Ответ сохранён — требуется самостоятельная проверка.</b><ul>'+item.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>':'<div class="a105-feedback '+(saved.ok?'is-correct':'is-wrong')+'"><b>'+(saved.ok?'Верно':'Нужно повторить')+'</b><p>'+esc(item.why)+'</p>'+(saved.ok?'':'<p><b>Правильный ответ:</b> '+esc(item.answer)+'</p>')+'</div>'}
    const progress=Math.round((state.pos/a105Items.length)*100);
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="a105ReturnTheory()">↶ Вернуться к полному конспекту</button><span class="chip">A1-05</span></div><div class="a105-hero"><div class="eyebrow">'+esc(item.group)+'</div><h2>'+esc(item.id)+' · Практика</h2><p>Задание '+(state.pos+1)+' из '+a105Items.length+'. Ответы сохраняются автоматически в текущем профиле.</p><div class="track"><i style="width:'+progress+'%"></i></div></div><section class="panel a105-question"><h3>'+esc(item.prompt)+'</h3>'+(saved?'':control)+feedback+(saved?'<button class="primary" onclick="a105Next()">Следующее задание</button>':'<button class="primary" onclick="a105Submit()">Проверить ответ</button>')+'</section><p class="note">Можно открыть теорию, перечитать нужный раздел и вернуться к этому заданию — позиция и ответы сохранятся.</p></div>';
  }
  function a105ReturnTheory(){const state=a105State();state.mode='theory';persist();render();window.scrollTo(0,0)}
  function a105Norm(value){return String(value||'').trim().toLowerCase().replace(/[’']/g,"'").replace(/[.!?]+$/,'').replace(/\s+/g,' ')}
  function a105Submit(){
    const state=a105State(),item=a105Items[state.pos],field=document.getElementById('a105Answer');if(!item||!field)return;const value=field.value.trim();if(!value){field.focus();return}
    const open=Boolean(item.open),ok=open?null:a105Norm(value)===a105Norm(item.answer);
    state.answers[item.id]={value,ok,open};window.recordGrammarReview?.(window.grammarPilotLessons['A1-05'],item,{ok,open});persist();render();
  }
  function a105Next(){const state=a105State();if(state.pos<a105Items.length-1)state.pos++;else state.mode='results';persist();render();window.scrollTo(0,0)}
  function a105ResultsView(state){
    const answered=a105Items.filter(x=>state.answers[x.id]),closed=answered.filter(x=>!x.open),correct=closed.filter(x=>state.answers[x.id].ok),wrong=closed.filter(x=>!state.answers[x.id].ok),open=answered.filter(x=>x.open);
    const independent=a105Items.filter(x=>x.group==='Самостоятельная практика'&&!x.open),independentCorrect=independent.filter(x=>state.answers[x.id]?.ok).length;
    const exit=a105Items.filter(x=>x.group==='Выходная проверка'&&!x.open),exitCorrect=exit.filter(x=>state.answers[x.id]?.ok).length;
    const critical=['E1','E2','E3'].every(id=>state.answers[id]?.ok===true),independentPass=independentCorrect>=6,exitPass=exitCorrect>=3,provisional=independentPass&&critical&&exitPass;
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="a105ReturnTheory()">↶ Открыть теорию</button><span class="chip">Результат A1-05</span></div><section class="panel a105-results"><div class="eyebrow">Lesson review</div><h2>Практика завершена</h2><div class="a105-score"><b>'+correct.length+'/'+closed.length+'</b><span>закрытых заданий верно</span></div><div class="a105-result-grid"><div><b>'+independentCorrect+'/'+independent.length+'</b><span>самостоятельная практика</span></div><div><b>'+exitCorrect+'/'+exit.length+'</b><span>выходная проверка</span></div></div><p>'+(provisional?'Основные критерии закрытой практики выполнены предварительно.':'Пока рано считать тему освоенной: проверь ошибки и повтори нужные правила.')+'</p><p>Открытых ответов для самостоятельной проверки: '+open.length+'. Их нельзя оценить только по совпадению с одним образцом.</p><p>'+(wrong.length?'Нужно повторить: '+wrong.map(x=>x.id).join(', ')+'.':'В закрытых заданиях ошибок нет.')+'</p><ul><li>Для предварительного успеха нужно не менее 6/7 в самостоятельной практике, безошибочные E1–E3 и минимум 3/4 в закрытой части выходной проверки.</li><li>Выходная проверка также включает E4 на выбор значения и E5 — собственное предложение; проверь E5 по критериям.</li><li>Ответ Speaking оценивается отдельно по учебной рубрике Speakbase, это не официальный балл ETS.</li><li>Окончательное освоение требует отсроченного повторения и переноса в новый контекст.</li></ul><div class="actions"><button class="primary" onclick="a105Restart()">Пройти практику заново</button><button class="btn" onclick="a105Back()">Вернуться в каталог</button></div></section></div>';
  }
  function a105Restart(){const state=a105State();state.mode='practice';state.pos=0;state.answers={};persist();render()}
  window.grammarPilotLessons={'A1-05':{id:'A1-05',title:'Present Simple: утверждения',items:a105Items,theory:a105TheoryHtml}};
  window.grammarPilotState=id=>id==='A1-05'?(courseState().grammarA105??={mode:'catalog',pos:0,answers:{}}):null;
  window.openGrammarA105=openGrammarA105;window.a105Back=a105Back;window.a105StartPractice=a105StartPractice;window.a105ReturnTheory=a105ReturnTheory;window.a105Submit=a105Submit;window.a105Next=a105Next;window.a105Restart=a105Restart;
  window.grammarLibraryView=function(){
    const state=courseState();
    if(state.grammarA105?.mode&&state.grammarA105.mode!=='catalog')return a105View();
    if(state.activeGrammarLessonId)return legacyGrammarLibraryView();
    const original=legacyGrammarLibraryView();
    const a102Card=window.grammarA102CardView?window.grammarA102CardView():'';
    const pilotCard='<section class="panel a105-launch"><div><div class="eyebrow">Новый формат · пилот</div><h3>A1-05 · Present Simple: утвердительные предложения</h3><p>Полный конспект до практики, задания по уровням сложности и сохранение ответов. Проверь новый формат обучения.</p></div><button class="primary" onclick="openGrammarA105()">Открыть пилотный урок</button></section>';
    return a102Card+pilotCard+original;
  };
})();
/* A1-01: permanent-ID lesson, layered over the legacy grammar catalogue. */
(function(){
  const previousGrammarLibraryView = window.grammarLibraryView;
  const a101Items = [
    {id:'D1',group:'Входная диагностика',prompt:'Найди подлежащее в предложении: The little dog sleeps.',options:['The little dog','sleeps','The'],answer:'The little dog',why:'The little dog — вся группа подлежащего: именно о собаке сообщается действие.'},
    {id:'D2',group:'Входная диагностика',prompt:'Какое слово является глаголом в предложении: My friends laugh?',options:['My friends','laugh','friends'],answer:'laugh',why:'Laugh сообщает, что делают друзья, поэтому это глагол.'},
    {id:'D3',group:'Входная диагностика',prompt:'Выбери полное утвердительное предложение.',options:['My friends near the station.','Live near the station.','My friends live near the station.'],answer:'My friends live near the station.',why:'В полном сообщении есть и подлежащее My friends, и глагол live.'},
    {id:'D4',group:'Входная диагностика',prompt:'Какой порядок слов соответствует обычному английскому утверждению?',options:['Leo reads books.','Reads Leo books.','Books Leo reads.'],answer:'Leo reads books.',why:'В базовой модели сначала стоит subject Leo, затем verb reads, затем object books.'},
    {id:'D5',group:'Входная диагностика',prompt:'Найди объект в предложении: Ava writes a message.',options:['Ava','writes','a message'],answer:'a message',why:'A message — то, что Ava пишет; это объект действия.'},

    {id:'G1',group:'Управляемая практика',prompt:'Собери нейтральное утвердительное предложение из слов: reads / Mia / books.',options:['Mia reads books.','Reads books Mia.','Books reads Mia.'],answer:'Mia reads books.',why:'Subject Mia стоит перед verb reads, а object books — после глагола.'},
    {id:'G2',group:'Управляемая практика',prompt:'Что является подлежащим в предложении: The boy with the blue bag smiles?',options:['The boy with the blue bag','the blue bag','smiles'],answer:'The boy with the blue bag',why:'Подлежащее — вся группа, которая называет человека, о котором говорится.'},
    {id:'G3',group:'Управляемая практика',prompt:'Выбери предложение по модели S + V без объекта.',options:['Birds fly.','Birds watch films.','Birds are beautiful.'],answer:'Birds fly.',why:'Birds — S, fly — V. Глаголу fly здесь не нужен объект.'},
    {id:'G4',group:'Управляемая практика',prompt:'Найди объект: We watch films at home.',options:['We','watch','films','at home'],answer:'films',why:'Films — то, что мы смотрим. At home сообщает место и является обстоятельством.'},
    {id:'G5',group:'Управляемая практика',prompt:'Какая часть завершает модель S + be + complement?',options:['The room is quiet.','The room sleeps.','The room reads books.'],answer:'The room is quiet.',why:'Quiet описывает подлежащее The room после глагола-связки is; это complement, а не object.'},
    {id:'G6',group:'Управляемая практика',prompt:'Какую роль выполняет выделенная часть at home в предложении: We study at home?',options:['Subject','Verb','Object','Adverbial'],answer:'Adverbial',why:'At home сообщает, где происходит действие. Это обстоятельство места, не объект.'},
    {id:'G7',group:'Управляемая практика',prompt:'В какой строке не хватает глагола?',options:['The new student.','The new student works.','The new student studies here.'],answer:'The new student.',why:'The new student только называет человека; сообщение не говорит, что он делает или каков.'},
    {id:'G8',group:'Управляемая практика',prompt:'Запиши предложение в правильном порядке: We / English / study / at home.',accepted:['We study English at home.','We study English at home'],answer:'We study English at home.',why:'We — S; study — V; English — O; at home — обстоятельство места.'},

    {id:'I1',group:'Самостоятельная практика',prompt:'Найди полное подлежащее в предложении: My two close friends from college work here.',options:['My two close friends from college','friends','work here'],answer:'My two close friends from college',why:'Subject может состоять из нескольких слов. Здесь вся группа называет тех, о ком говорится.'},
    {id:'I2',group:'Самостоятельная практика',prompt:'Определи модель предложения: The children play chess.',options:['S + V','S + V + O','S + be + C','S + V + A'],answer:'S + V + O',why:'The children — S, play — V, chess — O: шахматы являются объектом действия.'},
    {id:'I3',group:'Самостоятельная практика',prompt:'Собери нейтральное предложение: Maya / at home / reads / books.',accepted:['Maya reads books at home.','Maya reads books at home'],answer:'Maya reads books at home.',why:'Maya — S; reads — V; books — O; at home — A. Объект идёт после глагола.'},
    {id:'I4',group:'Самостоятельная практика',prompt:'В каком предложении объект не нужен для завершённой мысли?',options:['The baby sleeps.','The baby reads books.','The baby watches a film.'],answer:'The baby sleeps.',why:'Sleep употреблён без объекта: модель S + V уже образует полное сообщение.'},
    {id:'I5',group:'Самостоятельная практика',prompt:'Найди complement в предложении: The soup is hot.',options:['The soup','is','hot'],answer:'hot',why:'Hot описывает суп после be. Это complement, а не объект, на который направлено действие.'},
    {id:'I6',group:'Самостоятельная практика',prompt:'Исправь порядок слов и запиши полное предложение: I / every evening / English / study.',accepted:['I study English every evening.','I study English every evening'],answer:'I study English every evening.',why:'Сначала subject I, затем verb study, затем object English и время every evening.'},
    {id:'I7',group:'Самостоятельная практика',prompt:'Выбери полное сообщение с подлежащим и глаголом-связкой.',options:['The room very warm.','Very warm the room.','The room is very warm.'],answer:'The room is very warm.',why:'В английской конструкции с описанием нужен глагол be: The room + is + very warm.'},
    {id:'I8',group:'Самостоятельная практика',prompt:'Исправь нейтральный порядок слов: Music we enjoy.',accepted:['We enjoy music.','We enjoy music'],answer:'We enjoy music.',why:'We — подлежащее, enjoy — глагол, music — объект. Для нейтрального сообщения не выносим объект вперёд.'},

    {id:'E1',group:'Выходная проверка',prompt:'Найди подлежащее: Our teacher from college speaks English.',options:['Our teacher from college','college','speaks English'],answer:'Our teacher from college',why:'Подлежащее — вся именная группа Our teacher from college.'},
    {id:'E2',group:'Выходная проверка',prompt:'Найди глагол: The museum opens at nine.',options:['The museum','opens','at nine'],answer:'opens',why:'Opens сообщает, что делает музей, и является глаголом.'},
    {id:'E3',group:'Выходная проверка',prompt:'Выбери полное нейтральное сообщение.',options:['The museum at nine.','Opens at nine.','The museum opens at nine.'],answer:'The museum opens at nine.',why:'В предложении есть и подлежащее The museum, и глагол opens.'},
    {id:'E4',group:'Выходная проверка',prompt:'Найди объект: They watch documentaries.',options:['They','watch','documentaries'],answer:'documentaries',why:'Documentaries — то, что они смотрят; это объект после глагола.'},
    {id:'E5',group:'Выходная проверка',prompt:'Запиши слова в правильном порядке: We / English / study / at home.',accepted:['We study English at home.','We study English at home'],answer:'We study English at home.',why:'Обычный порядок: subject We → verb study → object English → место at home.'},

    {id:'W1',group:'Самостоятельное применение',prompt:'Напиши 4 коротких утвердительных предложения о себе или знакомом человеке. Используй как минимум две модели из урока: S + V; S + V + O; S + V + A. В каждом предложении явно укажи subject и verb. Вопросы и отрицания сейчас не нужны.',open:true,rubric:['Написано не менее четырёх законченных утвердительных предложений.','В каждом предложении есть явно выраженное подлежащее (subject).','В каждом предложении есть глагол (verb).','Хотя бы один раз правильно использована модель S + V + O.','Хотя бы один раз добавлена уместная информация о месте или времени (adverbial), если это соответствует смыслу.','Порядок слов в обычных сообщениях не копирует русский; объект не поставлен перед глаголом без специальной конструкции.']}
  ];

  function a101State(){
    const cs=courseState();
    cs.grammarLessons=cs.grammarLessons||{};
    return cs.grammarLessons['A1-01']||(cs.grammarLessons['A1-01']={mode:'catalog',pos:0,answers:{},contentVersion:'1.0-draft'});
  }
  function a101Inline(value){
    return esc(value).replace(/\x60([^\x60]+)\x60/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
  }
  function a101Markdown(markdown){
    const lines=markdown.split(/\r?\n/);let html='',paragraph=[],list='',table=[];
    const flushParagraph=()=>{if(paragraph.length){html+='<p>'+paragraph.map(a101Inline).join(' ')+'</p>';paragraph=[]}};
    const flushList=()=>{if(list){html+='</'+list+'>';list=''}};
    const flushTable=()=>{if(table.length){const rows=table.filter(line=>!/^\|?\s*:?-{3,}/.test(line));if(rows.length){html+='<div class="a105-table-wrap"><table>';rows.forEach((line,i)=>{const cells=line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(x=>x.trim());html+='<tr>'+cells.map(cell=>'<'+(i===0?'th':'td')+'>'+a101Inline(cell)+'</'+(i===0?'th':'td')+'>').join('')+'</tr>'});html+='</table></div>'}table=[]}};
    for(let i=0;i<lines.length;i++){
      const line=lines[i],t=line.trim();
      if(!t){flushParagraph();flushList();flushTable();continue}
      if(t.startsWith('|')){flushParagraph();flushList();table.push(t);continue}else flushTable();
      const heading=t.match(/^(#{2,4})\s+(.+)$/);
      if(heading){flushParagraph();flushList();const tag='h'+Math.min(5,Number(heading[1].length)+1);html+='<'+tag+'>'+a101Inline(heading[2])+'</'+tag+'>';continue}
      if(/^---+$/.test(t)){flushParagraph();flushList();html+='<hr>';continue}
      const quote=t.match(/^>\s?(.*)$/);
      if(quote){flushParagraph();flushList();html+='<blockquote>'+a101Inline(quote[1])+'</blockquote>';continue}
      const bullet=t.match(/^[-*]\s+(.+)$/),ordered=t.match(/^\d+\.\s+(.+)$/);
      if(bullet||ordered){flushParagraph();const tag=bullet?'ul':'ol';if(list!==tag){flushList();list=tag;html+='<'+tag+'>'}html+='<li>'+a101Inline((bullet||ordered)[1])+'</li>';continue}
      flushList();paragraph.push(t);
    }
    flushParagraph();flushList();flushTable();return html;
  }
  function a101TheoryHtml(){
    const source=window.grammarA101Markdown||'';
    const start=source.indexOf('## 4. Полный конспект'),end=source.indexOf('## 7. Практика');
    if(start<0||end<0)return '<p>Не удалось загрузить полный конспект A1-01.</p>';
    return a101Markdown(source.slice(start,end));
  }
  function a101Back(){
    const cs=courseState(),state=a101State();state.mode='catalog';cs.activeGrammarLessonId=null;persist();render();window.scrollTo(0,0);
  }
  function openGrammarA101(){
    const cs=courseState(),state=a101State();state.mode='theory';cs.activeGrammarLessonId='A1-01';persist();render();window.scrollTo(0,0);
  }
  function a101StartPractice(){
    const state=a101State();state.mode='practice';state.pos=Math.min(state.pos||0,a101Items.length-1);state.answers=state.answers||{};persist();render();window.scrollTo(0,0);
  }
  function a101ReturnTheory(){
    a101State().mode='theory';persist();render();window.scrollTo(0,0);
  }
  function a101Norm(value){
    return String(value||'').trim().toLowerCase().replace(/[’']/g,"'").replace(/[.!?]+$/,'').replace(/\s+/g,' ');
  }
  function a101Submit(){
    const state=a101State(),item=a101Items[state.pos],field=document.getElementById('a101Answer');
    if(!item||!field)return;
    const value=field.value.trim();if(!value){field.focus();return}
    const open=Boolean(item.open),accepted=item.accepted||[item.answer];
    const ok=open?null:accepted.some(answer=>a101Norm(answer)===a101Norm(value));
    state.answers[item.id]={value,ok,open};window.recordGrammarReview?.(window.grammarPilotLessons['A1-01'],item,{ok,open});persist();render();
  }
  function a101Next(){
    const state=a101State();
    if(state.pos<a101Items.length-1)state.pos++;else state.mode='results';
    persist();render();window.scrollTo(0,0);
  }
  function a101Restart(){
    const state=a101State();state.mode='practice';state.pos=0;state.answers={};persist();render();window.scrollTo(0,0);
  }
  function a101PracticeView(state){
    const item=a101Items[state.pos];
    if(!item){state.mode='results';persist();return a101ResultsView(state)}
    const saved=state.answers[item.id];
    const control=item.options
      ? '<select id="a101Answer" required><option value="">Выбери ответ</option>'+item.options.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('')+'</select>'
      : '<textarea id="a101Answer" rows="'+(item.open?6:3)+'" placeholder="'+(item.open?'Напиши свой ответ...':'Введи предложение целиком...')+'">'+(saved?esc(saved.value):'')+'</textarea>';
    let feedback='';
    if(saved){
      feedback=saved.open
        ? '<div class="a105-feedback"><b>Ответ сохранён — автоматическая оценка открытого текста пока не подключена.</b><p>Проверь работу по критериям ниже. Система не выдаёт самостоятельную проверку за AI-оценивание.</p><ul>'+item.rubric.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'
        : '<div class="a105-feedback '+(saved.ok?'is-correct':'is-wrong')+'"><b>'+(saved.ok?'Верно':'Нужно повторить')+'</b><p>'+esc(item.why)+'</p>'+(saved.ok?'':'<p><b>Один из правильных ответов:</b> '+esc(item.answer)+'</p>')+'</div>';
    }
    const progress=Math.round((state.pos/a101Items.length)*100);
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="a101ReturnTheory()">↶ Вернуться к полному конспекту</button><span class="chip">A1 · A1-01</span></div><div class="a105-hero"><div class="eyebrow">'+esc(item.group)+'</div><h2>'+esc(item.id)+' · Практика</h2><p>Задание '+(state.pos+1)+' из '+a101Items.length+'. Ответы сохраняются в профиле и восстанавливаются после обновления.</p><div class="track"><i style="width:'+progress+'%"></i></div></div><section class="panel a105-question"><h3>'+esc(item.prompt)+'</h3>'+(saved?'':control)+feedback+(saved?'<button class="primary" onclick="a101Next()">Следующее задание</button>':'<button class="primary" onclick="a101Submit()">Проверить ответ</button>')+'</section><p class="note">Можно вернуться к конспекту и снова открыть это задание: позиция и ответы сохранятся.</p></div>';
  }
  function a101ResultsView(state){
    const closed=a101Items.filter(x=>!x.open),correct=closed.filter(x=>state.answers[x.id]?.ok===true),wrong=closed.filter(x=>state.answers[x.id]?.ok===false);
    const independent=a101Items.filter(x=>x.group==='Самостоятельная практика');
    const independentCorrect=independent.filter(x=>state.answers[x.id]?.ok===true).length;
    const exit=a101Items.filter(x=>x.group==='Выходная проверка');
    const exitCorrect=exit.filter(x=>state.answers[x.id]?.ok===true).length;
    const corePassed=['E1','E2','E3'].every(id=>state.answers[id]?.ok===true);
    const provisional=independentCorrect>=6&&exitCorrect>=4&&corePassed;
    const writing=state.answers.W1;
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="a101ReturnTheory()">↶ Открыть теорию</button><span class="chip">A1-01 · результат</span></div><section class="panel a105-results"><div class="eyebrow">Lesson review</div><h2>Практика завершена</h2><div class="a105-score"><b>'+correct.length+'/'+closed.length+'</b><span>закрытых заданий верно</span></div><div class="a105-result-grid"><div><b>'+independentCorrect+'/'+independent.length+'</b><span>самостоятельная практика</span></div><div><b>'+exitCorrect+'/'+exit.length+'</b><span>выходная проверка</span></div></div><p>'+(provisional?'Критерии закрытой практики выполнены предварительно.':'Пока рано считать тему освоенной: повтори объяснение и разберись с ошибками.')+'</p><p>Открытый текст: '+(writing?'ответ сохранён; требуется самостоятельная проверка по рубрике.':'не отправлен.')+'</p><p>'+(wrong.length?'Нужно повторить задания: '+wrong.map(x=>x.id).join(', ')+'.':'В закрытой практике ошибок нет.')+'</p><ul><li>Для предварительного успеха нужно не менее 6/8 в самостоятельной практике, не менее 4/5 в выходной проверке и правильные ответы E1–E3.</li><li>Открытый текст не получает автоматическую оценку: проверь все критерии W1 или вернись к нему позже.</li><li>Окончательное освоение требует отсроченного повторения и применения структуры в новом контексте.</li></ul><div class="actions"><button class="primary" onclick="a101Restart()">Пройти практику заново</button><button class="btn" onclick="a101Back()">Вернуться в каталог</button></div></section></div>';
  }
  function a101View(){
    const state=a101State();
    if(state.mode==='practice')return a101PracticeView(state);
    if(state.mode==='results')return a101ResultsView(state);
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="a101Back()">← К каталогу грамматики</button><span class="chip">A1 · A1-01</span></div><div class="a105-hero"><div class="eyebrow">Первый блок грамматической программы · Speakbase</div><h2>Sentence building and basic word order</h2><p>Научись собирать простые английские сообщения: находить подлежащее и глагол, ставить объект на своё место и не переносить русский порядок слов.</p><div class="a105-meta"><span>Полный конспект</span><span>4 базовые модели предложения</span><span>Практика и exit check</span></div></div><section class="panel a105-goals"><h3>Результаты урока</h3><ul><li>Находить subject и verb.</li><li>Строить S + V и S + V + O.</li><li>Различать object, complement и adverbial.</li><li>Собирать полные утвердительные предложения в нейтральном порядке слов.</li></ul><p class="note">Сначала прочитай весь конспект. Практика откроется после теории; ограничение по времени не применяется.</p></section><article class="panel a105-theory">'+a101TheoryHtml()+'</article><div class="a105-sticky"><span>Весь материал можно перечитать во время практики и после занятия.</span><button class="primary" onclick="a101StartPractice()">Перейти к практике</button></div></div>';
  }
  window.grammarPilotLessons['A1-01']={id:'A1-01',title:'Sentence building and basic word order',items:a101Items,theory:a101TheoryHtml};
  const previousPilotState=window.grammarPilotState;window.grammarPilotState=id=>id==='A1-01'?a101State():previousPilotState?.(id);
  window.openGrammarA101=openGrammarA101;
  window.a101Back=a101Back;
  window.a101StartPractice=a101StartPractice;
  window.a101ReturnTheory=a101ReturnTheory;
  window.a101Submit=a101Submit;
  window.a101Next=a101Next;
  window.a101Restart=a101Restart;
  window.grammarLibraryView=function(){
    const cs=courseState();
    if(cs.activeGrammarLessonId==='A1-01')return a101View();
    if(cs.activeGrammarLessonId)return previousGrammarLibraryView();
    if(cs.grammarA105?.mode&&cs.grammarA105.mode!=='catalog')return previousGrammarLibraryView();
    const state=cs.grammarLessons?.['A1-01'];
    const answered=Object.keys(state?.answers||{}).length;
    return '<section class="panel a105-launch"><div><div class="eyebrow">Новая постоянная программа · A1-01</div><h3>Sentence building and basic word order</h3><p>Первый блок курса: подлежащее, глагол, базовый порядок слов и модели простого предложения. Сохранение прогресса по постоянному ID A1-01.</p></div><button class="primary" onclick="openGrammarA101()">'+(answered?'Продолжить A1-01 ('+answered+'/27)':'Начать A1-01')+'</button></section>'+previousGrammarLibraryView();
  };
})();

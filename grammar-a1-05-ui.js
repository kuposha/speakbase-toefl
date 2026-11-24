(function(){
  const legacyGrammarLibraryView = window.grammarLibraryView;
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
    state.answers[item.id]={value,ok,open};persist();render();
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
  window.openGrammarA105=openGrammarA105;window.a105Back=a105Back;window.a105StartPractice=a105StartPractice;window.a105ReturnTheory=a105ReturnTheory;window.a105Submit=a105Submit;window.a105Next=a105Next;window.a105Restart=a105Restart;
  window.grammarLibraryView=function(){
    const state=courseState();
    if(state.grammarA105?.mode&&state.grammarA105.mode!=='catalog')return a105View();
    const original=legacyGrammarLibraryView();
    return '<section class="panel a105-launch"><div><div class="eyebrow">Новый формат · пилот</div><h3>A1-05 · Present Simple: утвердительные предложения</h3><p>Полный конспект до практики, задания по уровням сложности и сохранение ответов. Проверь новый формат обучения.</p></div><button class="primary" onclick="openGrammarA105()">Открыть пилотный урок</button></section>'+original;
  };
})();
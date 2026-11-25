/* Reusable theory-first lesson engine for permanent grammar curriculum IDs. */
(function(){
  const lessons=new Map();
  const safeId=/^[A-Z][A-Z0-9-]{2,15}$/;
  const escValue=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize=value=>String(value??'').trim().toLowerCase().replace(/[’']/g,"'").replace(/[.!?]+$/,'').replace(/\s+/g,' ');
  const quote=value=>"'"+String(value).replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'";
  function register(config){
    if(!config||!safeId.test(config.id||''))throw new Error('Grammar lesson requires a permanent curriculum ID.');
    if(!Array.isArray(config.items)||!config.items.length)throw new Error(config.id+' requires practice items.');
    const ids=new Set();
    config.items.forEach(item=>{
      if(!item.id||ids.has(item.id))throw new Error(config.id+' has a missing or duplicate item ID.');
      ids.add(item.id);
      if(!item.prompt)throw new Error(config.id+'/'+item.id+' has no prompt.');
      if(item.open){if(!Array.isArray(item.rubric)||!item.rubric.length)throw new Error(config.id+'/'+item.id+' needs a production rubric.');return}
      if(!item.answer||!item.why)throw new Error(config.id+'/'+item.id+' needs an answer and rationale.');
      const accepted=item.accepted||[item.answer];
      if(item.options&&!item.options.includes(item.answer))throw new Error(config.id+'/'+item.id+' answer is not one of its options.');
      if(!item.options&&!accepted.some(value=>normalize(value)===normalize(item.answer)))throw new Error(config.id+'/'+item.id+' answer key is not accepted.');
    });
    lessons.set(config.id,Object.freeze({...config,items:config.items}));
    return config.id;
  }
  function getState(id){
    const cs=courseState();
    cs.grammarLessons=cs.grammarLessons||{};
    const state=cs.grammarLessons[id]||(cs.grammarLessons[id]={mode:'catalog',pos:0,answers:{},drafts:{},contentVersion:lessons.get(id).contentVersion||'1.0-draft'});
    state.answers=state.answers||{};
    state.drafts=state.drafts||{};
    state.pos=Math.max(0,Math.min(Number(state.pos)||0,lessons.get(id).items.length-1));
    return state;
  }
  function save(){persist()}
  function htmlFromMarkdown(markdown){
    const lines=markdown.split(/\r?\n/);let html='',paragraph=[],list='',table=[];
    const flushParagraph=()=>{if(paragraph.length){html+='<p>'+paragraph.map(inline).join(' ')+'</p>';paragraph=[]}};
    const flushList=()=>{if(list){html+='</'+list+'>';list=''}};
    const flushTable=()=>{if(table.length){const rows=table.filter(line=>!/^\|?\s*:?-{3,}/.test(line));if(rows.length){html+='<div class="a105-table-wrap"><table>';rows.forEach((line,index)=>{const cells=line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(value=>value.trim());html+='<tr>'+cells.map(cell=>'<'+(index===0?'th':'td')+'>'+inline(cell)+'</'+(index===0?'th':'td')+'>').join('')+'</tr>'});html+='</table></div>'}table=[]}};
    function inline(value){return escValue(value).replace(/\x60([^\x60]+)\x60/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>')}
    for(const line of lines){
      const value=line.trim();
      if(!value){flushParagraph();flushList();flushTable();continue}
      if(value.startsWith('|')){flushParagraph();flushList();table.push(value);continue}else flushTable();
      const heading=value.match(/^(#{2,4})\s+(.+)$/);
      if(heading){flushParagraph();flushList();const tag='h'+Math.min(5,Number(heading[1].length)+1);html+='<'+tag+'>'+inline(heading[2])+'</'+tag+'>';continue}
      if(/^---+$/.test(value)){flushParagraph();flushList();html+='<hr>';continue}
      const quoteMatch=value.match(/^>\s?(.*)$/);
      if(quoteMatch){flushParagraph();flushList();html+='<blockquote>'+inline(quoteMatch[1])+'</blockquote>';continue}
      const bullet=value.match(/^[-*]\s+(.+)$/),ordered=value.match(/^\d+\.\s+(.+)$/);
      if(bullet||ordered){flushParagraph();const tag=bullet?'ul':'ol';if(list!==tag){flushList();list=tag;html+='<'+tag+'>'}html+='<li>'+inline((bullet||ordered)[1])+'</li>';continue}
      flushList();paragraph.push(value);
    }
    flushParagraph();flushList();flushTable();return html;
  }
  function theoryHtml(config){
    const markdown=config.markdown||'';
    const start=markdown.indexOf(config.theoryStart||'## 4. Полный конспект');
    const end=markdown.indexOf(config.theoryEnd||'## 7. Практика');
    if(start<0||end<0||end<=start)return '<p>Не удалось загрузить полный конспект '+escValue(config.id)+'.</p>';
    return htmlFromMarkdown(markdown.slice(start,end));
  }
  function changeMode(id,mode){
    const state=getState(id);state.mode=mode;
    const cs=courseState();cs.activeGrammarLessonId=mode==='catalog'?null:id;
    save();render();window.scrollTo(0,0);
  }
  function draft(id,itemId,value){
    const state=getState(id);state.drafts[itemId]=String(value??'');save();
  }
  function submit(id){
    const config=lessons.get(id),state=getState(id),item=config.items[state.pos];
    const field=document.getElementById('gleAnswer-'+id);
    if(!item||!field)return;
    const value=String(field.value??'').trim();
    if(!value){field.focus();return}
    const open=Boolean(item.open),accepted=item.accepted||[item.answer];
    const ok=open?null:accepted.some(answer=>normalize(answer)===normalize(value));
    state.answers[item.id]={value,ok,open,checkedAt:Date.now()};
    delete state.drafts[item.id];
    save();render();
  }
  function next(id){
    const config=lessons.get(id),state=getState(id);
    if(state.pos<config.items.length-1)state.pos++;
    else state.mode='results';
    save();render();window.scrollTo(0,0);
  }
  function restart(id){
    const state=getState(id);state.mode='practice';state.pos=0;state.answers={};state.drafts={};
    const cs=courseState();cs.activeGrammarLessonId=id;
    save();render();window.scrollTo(0,0);
  }
  function back(id){changeMode(id,'catalog')}
  function groupCount(config,group){return config.items.filter(item=>item.group===group&&!item.open).length}
  function resultsHtml(config,state){
    const closed=config.items.filter(item=>!item.open);
    const correct=closed.filter(item=>state.answers[item.id]?.ok===true);
    const wrong=closed.filter(item=>state.answers[item.id]?.ok===false);
    const independent=config.groups?.independent||'Самостоятельная практика';
    const exit=config.groups?.exit||'Выходная проверка';
    const independentItems=config.items.filter(item=>item.group===independent&&!item.open);
    const exitItems=config.items.filter(item=>item.group===exit&&!item.open);
    const independentCorrect=independentItems.filter(item=>state.answers[item.id]?.ok===true).length;
    const exitCorrect=exitItems.filter(item=>state.answers[item.id]?.ok===true).length;
    const thresholds=config.thresholds||{};
    const corePassed=(thresholds.criticalIds||[]).every(id=>state.answers[id]?.ok===true);
    const provisional=independentCorrect>=(thresholds.independent??independentItems.length)&&exitCorrect>=(thresholds.exit??exitItems.length)&&corePassed;
    const openItems=config.items.filter(item=>item.open);
    const openAnswered=openItems.filter(item=>state.answers[item.id]);
    const openHtml=openAnswered.length?'<p>Открытые ответы сохранены: '+openAnswered.length+'/'+openItems.length+'. Они требуют отдельной проверки по рубрике; эта версия урока не выдаёт их за AI-оценку.</p>':'<p>Открытые ответы не отправлены. Для полного подтверждения навыка выполни письменное задание и проверь его по рубрике.</p>';
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="grammarLessonEngineTheory('+quote(config.id)+')">↶ Открыть теорию</button><span class="chip">'+escValue(config.id)+' · результат</span></div><section class="panel a105-results"><div class="eyebrow">Lesson review · '+escValue(config.id)+'</div><h2>Практика завершена</h2><div class="a105-score"><b>'+correct.length+'/'+closed.length+'</b><span>закрытых заданий верно</span></div><div class="a105-result-grid"><div><b>'+independentCorrect+'/'+independentItems.length+'</b><span>самостоятельная практика</span></div><div><b>'+exitCorrect+'/'+exitItems.length+'</b><span>выходная проверка</span></div></div><p>'+(provisional?'Критерии закрытой практики выполнены предварительно.':'Пока рано считать тему освоенной: повтори объяснение и разберись с ошибками.')+'</p>'+openHtml+'<p>'+(wrong.length?'Нужно повторить задания: '+wrong.map(item=>item.id).join(', ')+'.':'В закрытой практике ошибок нет.')+'</p><ul><li>Для предварительного успеха нужно не менее '+(thresholds.independent??independentItems.length)+'/'+independentItems.length+' в самостоятельной практике и '+(thresholds.exit??exitItems.length)+'/'+exitItems.length+' в выходной проверке.</li><li>Ключевые задания: '+((thresholds.criticalIds||[]).join(', ')||'не заданы')+' должны быть выполнены правильно.</li><li>Окончательное освоение требует отсроченного повторения и применения навыка в новом контексте.</li></ul><div class="actions"><button class="primary" onclick="grammarLessonEngineRestart('+quote(config.id)+')">Пройти практику заново</button><button class="btn" onclick="grammarLessonEngineBack('+quote(config.id)+')">Вернуться в каталог</button></div></section></div>';
  }
  function practiceHtml(config,state){
    const item=config.items[state.pos];
    if(!item){state.mode='results';save();return resultsHtml(config,state)}
    const saved=state.answers[item.id],draftValue=state.drafts[item.id]||'';
    const control=item.options
      ? '<select id="gleAnswer-'+escValue(config.id)+'" onchange="grammarLessonEngineDraft('+quote(config.id)+','+quote(item.id)+',this.value)" required><option value="">Выбери ответ</option>'+item.options.map(value=>'<option value="'+escValue(value)+'"'+((saved?.value===value||draftValue===value)?' selected':'')+'>'+escValue(value)+'</option>').join('')+'</select>'
      : '<textarea id="gleAnswer-'+escValue(config.id)+'" rows="'+(item.open?6:3)+'" oninput="grammarLessonEngineDraft('+quote(config.id)+','+quote(item.id)+',this.value)" placeholder="'+(item.open?'Напиши свой ответ...':'Введи ответ...')+'">'+escValue(saved?.value||draftValue)+'</textarea>';
    let feedback='';
    if(saved){
      if(saved.open){
        feedback='<div class="a105-feedback"><b>Ответ сохранён — автоматическая оценка открытого текста пока не подключена.</b><p>Проверь работу по критериям ниже. Система не оценивает свободный текст простым сравнением с одним образцом.</p><ul>'+item.rubric.map(value=>'<li>'+escValue(value)+'</li>').join('')+'</ul></div>';
      }else{
        feedback='<div class="a105-feedback '+(saved.ok?'is-correct':'is-wrong')+'"><b>'+(saved.ok?'Верно':'Нужно повторить')+'</b><p>'+escValue(item.why)+'</p>'+(saved.ok?'':'<p>'+escValue(item.distractorRationales?.[saved.value]||item.distractorWhy||'')+'</p><p><b>Один из правильных ответов:</b> '+escValue(item.answer)+'</p>')+'</div>';
      }
    }
    const progress=Math.round((state.pos/config.items.length)*100);
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="grammarLessonEngineTheory('+quote(config.id)+')">↶ Вернуться к полному конспекту</button><span class="chip">'+escValue(config.id)+'</span></div><div class="a105-hero"><div class="eyebrow">'+escValue(item.group)+'</div><h2>'+escValue(item.id)+' · Практика</h2><p>Задание '+(state.pos+1)+' из '+config.items.length+'. Ответы и черновики сохраняются в текущем профиле.</p><div class="track"><i style="width:'+progress+'%"></i></div></div><section class="panel a105-question"><h3>'+escValue(item.prompt)+'</h3>'+(saved?'':control)+feedback+(saved?'<button class="primary" onclick="grammarLessonEngineNext('+quote(config.id)+')">Следующее задание</button>':'<button class="primary" onclick="grammarLessonEngineSubmit('+quote(config.id)+')">Проверить ответ</button>')+'</section><p class="note">Можно вернуться к конспекту и снова открыть это задание: позиция и сохранённые ответы останутся на месте.</p></div>';
  }
  function view(id){
    const config=lessons.get(id);if(!config)return '<p>Урок '+escValue(id)+' не зарегистрирован.</p>';
    const state=getState(id);
    if(state.mode==='practice')return practiceHtml(config,state);
    if(state.mode==='results')return resultsHtml(config,state);
    const markdown=config.markdown||window[config.markdownGlobal]||'';
    return '<div class="a105-shell"><div class="row"><button class="btn" onclick="grammarLessonEngineBack('+quote(id)+')">← К каталогу грамматики</button><span class="chip">'+escValue(config.level)+' · '+escValue(id)+'</span></div><div class="a105-hero"><div class="eyebrow">'+escValue(config.eyebrow||'Полноценный урок · Speakbase')+'</div><h2>'+escValue(config.title)+'</h2><p>'+escValue(config.description)+'</p><div class="a105-meta"><span>Полный конспект</span><span>'+config.items.length+' заданий</span><span>Сохранение по постоянному ID</span></div></div><section class="panel a105-goals"><h3>Результаты урока</h3><ul>'+config.outcomes.map(value=>'<li>'+escValue(value)+'</li>').join('')+'</ul><p class="note">Сначала прочитай весь конспект. Практика откроется после теории; ограничение по времени не применяется.</p></section><article class="panel a105-theory">'+theoryHtml({...config,markdown})+'</article><div class="a105-sticky"><span>Весь материал можно перечитать во время практики и после занятия.</span><button class="primary" onclick="grammarLessonEngineStart('+quote(id)+')">Перейти к практике</button></div></div>';
  }
  function card(id){
    const config=lessons.get(id);if(!config)return '';
    const state=getState(id),answered=Object.keys(state.answers).length;
    const status=state.mode==='results'?'Повторить урок':answered?'Продолжить ('+answered+'/'+config.items.length+')':'Начать урок';
    return '<section class="panel a105-launch"><div><div class="eyebrow">Новая постоянная программа · '+escValue(id)+'</div><h3>'+escValue(config.title)+'</h3><p>'+escValue(config.cardDescription||config.description)+'</p></div><button class="primary" onclick="grammarLessonEngineOpen('+quote(id)+')">'+status+'</button></section>';
  }
  window.GrammarLessonEngine={register,view,card,has:id=>lessons.has(id),getState};
  window.grammarLessonEngineOpen=id=>changeMode(id,'theory');
  window.grammarLessonEngineStart=id=>changeMode(id,'practice');
  window.grammarLessonEngineTheory=id=>changeMode(id,'theory');
  window.grammarLessonEngineBack=back;
  window.grammarLessonEngineRestart=restart;
  window.grammarLessonEngineSubmit=submit;
  window.grammarLessonEngineNext=next;
  window.grammarLessonEngineDraft=draft;
})();

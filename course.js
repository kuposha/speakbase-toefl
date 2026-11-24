const profileNames={marina:'Марина',vladlen:'Владлен'};
function switcher(){modal('<h2>Выбери профиль</h2>'+Object.entries(profileNames).map(([k,v])=>btn(v+(activeProfile===k?' · текущий':''),"switchProfile(\'"+k+"\')")).join(''))}
function switchProfile(k){if(!profileNames[k])return;persist();localStorage.setItem('sb.active',k);location.reload()}
function courseState(){return db.course??={unit:activeProfile==='marina'?3:0,reports:[],weak:[],session:null,minutes:90}}
function makeDistractors(model,wrong,ask='') { const pool=[...(wrong||[])]; const a=String(model); const clean=a.replace(/\s+/g,' ').trim(); const generated=[clean+'s',clean+'ed',clean+'ing', 'to '+clean, 'not '+clean, clean.replace(/\b(am|is|are|was|were|has|have|had|do|does|did|will|would|can|could|should|must)\b/i,'')].map(x=>x.trim()).filter(x=>x&&x!==clean); for(const x of generated)if(!pool.includes(x)&&x!==clean)pool.push(x); const seen=new Set([clean]);const unique=pool.filter(x=>{x=String(x).trim();if(!x||seen.has(x))return false;seen.add(x);return true;}).slice(0,3);while(unique.length<3){unique.push('None of the above');} const all=[clean,...unique];let seed=Array.from(String(ask+clean)).reduce((n,c)=>n+c.charCodeAt(0),0);for(let i=all.length-1;i>0;i--){seed=(seed*9301+49297)%233280;let j=Math.floor(seed/233280*(i+1));[all[i],all[j]]=[all[j],all[i]];}return all; }
function selectItem(stage,title,ask,model,wrong,tip){return {stage,title,ask,model,choices:makeDistractors(model,wrong,ask),tip}}
function fixItem(u,stage=0){return {stage,title:'Исправь предложение',ask:u[5],model:u[6],tip:u[1],exact:true,tag:u[0]}}
function vocab(sc){return sc[1].split(';').map(x=>x.split('|'))}
function buildLesson(s) {
  const u = units[s.unit];
  const dayIndex = s.lessonDate ? Math.max(0, Math.round((Date.parse(s.lessonDate) - calendarStart) / calendarDay)) : s.unit;
  const week = Math.floor(dayIndex / 7);
  const level = s.unit < 12 ? 'A2' : s.unit < 30 ? 'B1' : 'B2';
  const scene = scenes[dayIndex % scenes.length];
  const words = vocab(scene);
  const items = [];
  const warm = courseState().weak.filter(item => item.stage <= 2 && item.model && (item.exact || item.choices)).slice(-2);
  for (const item of warm) items.push({...item, stage:0, title:'Из прошлых ошибок'});
  // Interleave previously studied forms, varying the actual questions on return visits.
  for (let j = items.length; j < 5; j++) {
    const previous = Math.max(0, s.unit - 1 - (j % 3));
    const bank = grammarPractice[previous];
    const [ask, answer, wrong] = bank[(dayIndex + 3*j) % bank.length];
    items.push({...selectItem(0,units[previous][0],ask,answer,[wrong],grammarNotes[previous]),tag:units[previous][0]});
  }
  items.push({stage:1,title:'Полная лекция · '+u[0],info:u[1]+' '+grammarNotes[s.unit],examples:[u[6]],lecture:true,lectureUnit:s.unit});
  const pool = grammarPractice[s.unit];
  const count = s.minutes <= 60 ? 3 : 5;
  for (let k = 0; k < count; k++) {
    const [ask,answer,wrong] = pool[(dayIndex * 3 + k) % pool.length];
    items.push(selectItem(1,'Выбери форму',ask,answer,[wrong],ask.replace('___',answer)+' — '+grammarNotes[s.unit]));
  }
  const [ask, model, tip] = contextualGrammar[s.unit];
  items.push({...fixItem(u,1),tip:grammarNotes[s.unit]}, {stage:1,title:'Заполни пропуск',ask,model,tip,exact:true});
  const rewrite = rewrites[s.unit];
  if (rewrite) items.push({stage:1,title:'Sentence Building',ask:rewrite[2],model:rewrite[1],exact:true,tip:grammarNotes[s.unit]});
  items.push({stage:1,title:'Своя фраза',ask:u[7],tip:grammarNotes[s.unit]});
  items.push({stage:2,title:scene[0],info:'Прочитай сочетания. Закрой список и вспомни, в каком контексте тебе пригодятся два из них.',examples:words.map(([en,ru,example])=>en+' — '+ru+'. '+example)});
  for (const j of [0,2,4]) items.push(selectItem(2,'Значение в контексте',words[j][2]+' → '+words[j][0],words[j][1],[words[j+1][1],words[(j+2)%6][1]],words[j][2]));
  items.push({stage:2,title:'Активный словарь',ask:'Imagine a situation involving '+scene[0]+'. Write two connected sentences using two expressions from the list.',tip:'Опиши конкретную ситуацию и проверь сочетаемость слов.',words:words.map(w=>w[0])});
  items.push({...selectItem(3,scene[0],scene[3],scene[4],scene.slice(5),scene[2]),audio:scene[2]});
  const listen = listeningBank[dayIndex % listeningBank.length];
  for (const [question,answer,...wrong] of listen[2]) items.push({...selectItem(3,listen[0],question,answer,wrong,listen[1]),audio:listen[1]});
  const interview = speakingBank[dayIndex % speakingBank.length];
  const support = level==='A2' ? 'Начни с двух предложений: прямой ответ и причина. Можно взять паузу.' : level==='B1' ? 'Сформулируй позицию, объясни причину и приведи один конкретный пример.' : 'Покажи, где твой аргумент особенно убедителен и при каком условии вывод меняется.';
  items.push({stage:4,title:'Listen and Repeat',audio:words[2][2],ask:'Repeat the sentence aloud.',model:words[2][2],tip:'Сравни ударные слова и окончания со своей записью.',repeat:true});
  items.push({stage:4,title:'Grammar into Speaking · '+u[0],ask:u[7],tip:support+' Используй конструкцию урока.'});
  for (const question of interview.slice(1)) items.push({stage:4,title:'Take an Interview · '+interview[0],ask:question,tip:support});
  items.push({stage:4,title:'Answer Expansion',ask:'Return to the question: '+interview[1]+' Give a fresh answer. Include one detail from your experience or a realistic example. Explain how it supports your point.',tip:support+' Сначала набросай три опорных слова. Сравни две записи.'});
  if (s.last === 'Reading') {
    const r = readingTasks[(week*3+Math.floor((dayIndex%7)/2))%readingTasks.length];
    items.push(r.length===4 ? {stage:5,title:r[0],source:r[1],ask:r[2],model:r[3],exact:true,tip:r[3]} : {...selectItem(5,r[0],r[2],r[3],r.slice(4),r[3]),source:r[1]});
    if (r.length>4) items.push({stage:5,title:'Подтверди вывод текстом',source:r[1],ask:'Find the words that support your previous answer. Explain the connection in your own words.',tip:'Укажи точные слова автора, затем одной фразой объясни, как они подтверждают ответ.'});
  } else {
    const sentences = sentenceWriting.filter(row=>row[0]===level);
    const writing = writingBank.filter(row=>row[1]===level && (row[0]==='Email'||row[0]==='Discussion'));
    const index = week*3+Math.floor((dayIndex%7)/2);
    const sentence = sentences[index % sentences.length];
    const task = writing[index % writing.length];
    items.push({stage:5,title:'Build a Sentence',ask:'Put the words in order: '+sentence[2],model:sentence[1],exact:true,tip:'Собери подлежащее и сказуемое. Для вопроса проверь место вспомогательного глагола.'});
    items.push({stage:5,title:task[0]==='Email'?'Write an Email':'Write for an Academic Discussion',ask:task[2],tip:task[0]==='Email'?'Назови адресата и цель. Убедись, что читатель понимает, какого действия ты ждёшь.':'Ответь на вопрос преподавателя и добавь свой аргумент. Покажи, как пример связан с твоей позицией.'});
  }
  return items;
}
function grammarWorkshop() {
  const cs=courseState();
  if (cs.session) return lessonScreen();
  const unit=Number($('#unitSelect').value), bank=grammarPractice[unit];
  const items=bank.map(([ask,answer,wrong])=>selectItem(1,units[unit][0],ask,answer,[wrong],ask.replace('___',answer)+' — '+grammarNotes[unit]));
  cs.session={id:crypto.randomUUID(),unit,diag:false,practice:true,last:'Grammar',pos:0,answers:[],draft:'',heard:false,started:Date.now(),minutes:30,items};
  persist();
  lessonScreen();
}
function buildDiagnostic(){let r=readingTasks[1],sc=scenes[1];return [selectItem(0,'Grammar','Yesterday the library ___ early.','closed',['closes','closing'],'Yesterday указывает на завершённое событие.'),{...selectItem(5,'Reading',r[2],r[3],r.slice(4),r[3]),source:r[1]},{...selectItem(3,'Listening',sc[3],sc[4],[sc[5],sc[6]],sc[2]),audio:sc[2]},{stage:4,title:'Speaking',ask:'Describe a place you enjoy visiting. What makes it special?',tip:'Добавь причину и одну деталь.'},{stage:5,title:'Writing',ask:'Write three sentences about a change you would like to see in your town. Explain why.',tip:'Сформулируй изменение и ожидаемый результат.'}]}
function startLesson(diag=false){let cs=courseState();if(activeProfile==="vladlen"&&!cs.reports.length&&!cs.skipDiagnostic)diag=true;const requested=cs.calendarRequest;delete cs.calendarRequest;if(cs.session){persist();return lessonScreen()}if(requested)diag=false;if(!diag&&!requested&&cs.unit>=units.length)return catalog();let s={id:crypto.randomUUID(),unit:requested?scheduledUnit(requested):cs.unit%units.length,lessonDate:requested,diag,last:requested?(new Date(requested+'T12:00:00Z').getUTCDay()%2?'Reading':'Writing'):(cs.reports.filter(x=>!x.diag).length%2?'Writing':'Reading'),pos:0,answers:[],draft:'',heard:false,started:Date.now(),minutes:requested?dayProgram(requested).minutes:cs.minutes};s.items=diag?buildDiagnostic():buildLesson(s);cs.session=s;persist();lessonScreen()}
function catalog(){let cs=courseState();modal('<h2>Мой курс</h2><p>Выбери тему и длину занятия. Маршрут можно менять между уроками.</p><label>Грамматика<select id="unitSelect">'+units.map((u,i)=>'<option value="'+i+'" '+(i===cs.unit?'selected':'')+'>'+esc(u[0])+'</option>').join('')+'</select></label><label>Плановое время<select id="duration">'+opts(['60','75','90'],String(cs.minutes))+'</select></label>'+btn(cs.session?'Продолжить текущее занятие':'Начать урок','catalogStart()','primary')+(cs.session?'':btn('Короткая диагностика · 5 заданий','startLesson(true)'))+(cs.session?'':btn('Вся практика выбранной темы','grammarWorkshop()'))+btn('Speaking interviews','interviewCatalog()')+reportList())}
function catalogStart(){let cs=courseState();if(!cs.session){cs.unit=Number($('#unitSelect').value);cs.minutes=Number($('#duration').value);persist()}startLesson()}
function reportList(){return courseState().reports.slice().reverse().map(r=>'<details><summary>'+esc(r.date+' · '+r.name)+'</summary><p>'+esc(r.summary)+'</p></details>').join('')}
function lectureHTML(unit){const u=units[unit],note=grammarNotes[unit],practice=grammarPractice[unit]||[],sample=practice.slice(0,3).map(([ask,answer,wrong])=>'<li>'+esc(ask.replace(/___/g,answer))+' <b>'+esc(answer)+'</b><small>Типичная ошибка: '+esc(wrong)+'</small></li>').join('');const contextual=contextualGrammar[unit]||[];return '<div class="grammar-lecture"><h3>Лекция: '+esc(u[0])+'</h3><p>'+esc(u[1])+'</p><p>'+esc(note)+'</p><h4>Пример</h4><blockquote>'+esc(u[6])+'</blockquote><h4>Как использовать</h4><p>'+esc(u[7])+'</p>'+(contextual.length?'<h4>Пример в контексте</h4><p>'+esc(contextual[0])+'</p><blockquote>'+esc(contextual[1])+'</blockquote><small>'+esc(contextual[2]||'')+'</small>':'')+'<details><summary>Дополнительные примеры и типичные ошибки</summary><ul>'+sample+'</ul></details></div>'}
function listenLesson(){let s=courseState().session,item=s.items[s.pos];let index=scenes.findIndex(sc=>sc[2]===item.audio||vocab(sc)[2][2]===item.audio);let player=$('#courseAudio');if(index<0||index>=4){speak(item.audio);$('#heard').disabled=false;return}player.src='audio/'+index+'-'+(item.repeat?1:0)+'.mp3';player.hidden=false;player.onended=()=>{s.played=true;persist();if($('#heard'))$('#heard').disabled=false};player.play().catch(()=>{$('#speechStatus').textContent='Нажми воспроизведение в аудиоплеере.'})}
function heardLesson(){let s=courseState().session;s.heard=true;persist();lessonScreen()}
function changeLast(){let s=courseState().session;s.last=s.last==='Reading'?'Writing':'Reading';s.items=[...s.items.slice(0,s.pos),...buildLesson(s).filter(i=>i.stage===5)];s.draft='';persist();lessonScreen()}
function lessonScreen(){let s=courseState().session;if(!s)return;clearInterval(clock);if(s.pos>=s.items.length)return lessonEnd();let i=s.items[s.pos],fb=s.feedback,oral=i.stage===4,skill=oral?0:i.stage===3?1:4;
q={skill,audioId:s.audioId};let lessonDate=s.lessonDate||dayKey(new Date()),lessonDateLabel=fmt(lessonDate,{weekday:'long',day:'numeric',month:'long'}),daily=dayProgram(lessonDate);let h='<div class="eyebrow">'+profileNames[activeProfile]+' · '+esc(lessonDateLabel)+' · '+(s.diag?'Диагностика':units[s.unit][0])+'</div><div class="row"><h2>'+esc(i.title)+'</h2><span class="chip">'+(s.pos+1)+' / '+s.items.length+'</span></div><small>Сегодня изучаем: '+esc(units[s.unit][0])+' · тренируем: '+esc(daily.focus)+' · '+stages[i.stage]+' · <span id="lessonTimer"></span></small><div class="track"><i style="width:'+Math.round(s.pos/s.items.length*100)+'%"></i></div>'
if(fb){h+='<h3 class="feedback-status '+(fb.ok===true?'is-correct':fb.ok===false?'is-wrong':'')+'">'+(fb.ok===true?'✓ Правильно':fb.ok===false?'✕ Ошибка — разберём':'')+' '+esc(fb.status)+'</h3><blockquote class="answer-feedback '+(fb.ok===true?'correct-answer':fb.ok===false?'wrong-answer':'')+'">'+esc(fb.a)+'</blockquote>'+(fb.ok===false&&i.model?'<p class="correct-model"><b>Правильный ответ:</b> '+esc(i.model)+'</p>':'')+fb.lines.map(x=>'<p>'+esc(x)+'</p>').join('')+(i.model&&fb.ok!==false?'<p><b>Образец</b> · '+esc(i.model)+'</p>':'')+(i.audio?'<details><summary>Текст для сверки</summary>'+esc(i.audio)+'</details>':'')+(s.audioId?'<audio id="lessonPlayback" controls></audio>':'')+(fb.ok===null?btn('Скопировать для подробного разбора','copyReview()','link')+'<small id="copyStatus"></small>':'')+btn('Дальше','advanceLesson()','primary')}
else if(i.info){h+=(i.lecture?lectureHTML(i.lectureUnit):'<p>'+esc(i.info)+'</p>'+i.examples.map(x=>'<blockquote>'+esc(x)+'</blockquote>').join(''))+btn('К упражнениям','advanceLesson()','primary')}
else if(i.audio&&!s.heard){h+='<p>Сначала прослушай запись. После прослушивания открой задание.</p>'+btn('Прослушать','listenLesson()')+'<audio id="courseAudio" controls hidden></audio><small id="speechStatus"></small><button id="heard" class="primary" onclick="heardLesson()" '+(s.played?'':'disabled')+'>Я прослушал(а)</button>'}
else{if(i.stage===5&&!s.diag&&s.items[s.pos-1]?.stage!==5)h+=btn('Заменить на '+(s.last==='Writing'?'Reading':'Writing'),'changeLast()','link');if(i.source)h+='<blockquote>'+esc(i.source)+'</blockquote>';
h+='<h3 lang="en">'+esc(i.ask)+'</h3>';if(i.words)h+='<small>'+i.words.map(esc).join(' · ')+'</small>';
if(oral)h+='<p>'+esc(i.tip)+'</p><div class="actions">'+btn('Раунд · 45 с','timedSpeaking()').replace('class="btn"','id="round" class="btn"')+'<button class="btn" id="micBtn" onclick="mic()">Записать ответ</button></div><audio id="listenback" controls hidden></audio><small id="speechStatus"></small>';
h+='<form id="lessonForm" class="stack"><label>'+(oral?'Расшифровка для проверки текста (или сохрани голосовую запись)':'Твой ответ')+(i.choices?'<select required id="lessonAnswer"><option value="">Выбери ответ</option>'+opts(i.choices,s.draft)+'</select>':'<textarea id="lessonAnswer" '+(oral?'':'required')+'>'+esc(s.draft)+'</textarea>')+'</label><button class="primary">'+(oral?'Я закончил(а) · начать разбор':'Проверить')+'</button></form>'}
modal(h);let time=()=>{let secs=Math.max(0,s.minutes*60-Math.floor((Date.now()-s.started)/1000));if($('#lessonTimer'))$('#lessonTimer').textContent=Math.floor(secs/60)+':'+String(secs%60).padStart(2,'0')+' до конца планового времени'};time();clock=setInterval(time,1000);
if($('#lessonAnswer')){$('#lessonAnswer').oninput=e=>{s.draft=e.target.value;persist()};$('#lessonForm').onsubmit=async e=>{e.preventDefault();if(recorder?.state==='recording'){stopMic();await recordingSaved}if(recordingSaved)await recordingSaved;s.audioId=q.audioId;if(oral&&!s.draft.trim()&&!s.audioId){$('#speechStatus').textContent='Запиши ответ или введи расшифровку.';return}checkLesson()}}let player=$('#lessonPlayback')||$('#listenback');if(player&&s.audioId)blobGet(s.audioId).then(b=>{if(b&&player.isConnected){player.src=URL.createObjectURL(b);player.hidden=false}})}
function lessonNorm(a){return norm(a.replace(/[’']/g,"'").replace(/didn't/ig,'did not').replace(/doesn't/ig,'does not').replace(/don't/ig,'do not').replace(/we're/ig,'we are').replace(/i'm/ig,'I am').replace(/they're/ig,'they are'))}
function checkLesson(){let cs=courseState(),s=cs.session,i=s.items[s.pos],a=s.draft.trim(),closed=i.choices||i.exact||i.repeat&&a,ok=closed?lessonNorm(a)===lessonNorm(i.model):null;let lines=[];if(closed)lines.push(i.tip||'Сверь форму и порядок слов с образцом.');else if(a){lines.push(...detailedFeedback(i,a));for(let sentence of a.match(/[^.!?]+[.!?]*/g)||[a]){let t=sentence.trim(),matched=false;for(let [re,to,why] of rules){let m=t.match(re);if(m){lines.push(t+' — '+(why.includes('сочетание')?'Словосочетание':'Грамматика')+': '+m[0]+' → '+to+'. '+why);matched=true}}if(!matched&&!lines.some(v=>v.startsWith(t+' —')))lines.push(t+' — в проверяемых конструкциях ошибок не найдено.')}if(i.stage===4||i.stage===5){lines.push(/because|since|for example|for instance/i.test(a)?'Связность: есть явная связь с причиной или примером. Сверь, отвечает ли пример на вопрос.':'Развитие мысли: добавь причину и один конкретный пример, если их пока нет.');lines.push('Самопроверка лексики и полноты: подчеркни два точных слова и проверь, ответил(а) ли на каждую часть вопроса.')}if(i.tip)lines.push(i.tip)}if(i.stage===4)lines.push('Прослушай запись: различимы ли окончания и ударные слова? Автоматическая оценка произношения не выполняется.');
let f={a:a||'Сохранена голосовая запись',status:ok===true?'Верно':ok===false?'Сверь с целевой формой':'Разбор и самопроверка',lines,ok};s.feedback=f;if(ok===false&&i.stage<=2){cs.weak=cs.weak.filter(w=>w.ask!==i.ask);cs.weak.push(i)}if(ok===true)cs.weak=cs.weak.filter(w=>w.ask!==i.ask);
let sk=[4,4,4,1,0,s.last==='Writing'?2:3][i.stage];if(s.diag&&i.title==='Writing')sk=2;
let saved={q:{skill:sk,topic:i.title,level:'Урок',min:10,ask:i.ask,model:i.model||'',tip:i.tip||'',source:i.source||i.audio,opts:i.choices,exact:i.exact,audioId:s.audioId},day:dayKey(new Date()),a:f.a,issues:lines.filter(v=>v.includes(' → ')||v.includes(' — Грамматика:')||v.includes(' — Словосочетание:')),correct:ok,edited:a,advice:lines.join(' ')};db.h.push(saved);s.answers.push({pos:s.pos,...f,issues:saved.issues,audioId:s.audioId});if(saved.issues.length&&i.stage!==0){let target=saved.issues.some(v=>/После did|после did/.test(v))?3:s.unit,reinforce=fixItem(units[target]);cs.weak=cs.weak.filter(w=>w.ask!==reinforce.ask);cs.weak.push(reinforce)};persist();lessonScreen()}
function advanceLesson(){let s=courseState().session;s.pos++;Object.assign(s,{draft:'',feedback:null,heard:false,played:false,audioId:null});persist();lessonScreen()}
function lessonEnd(){clearInterval(clock);let cs=courseState(),s=cs.session,errors=s.answers.filter(x=>x.ok===false),correct=s.answers.filter(x=>x.ok===true),weak=[...new Set(errors.map(x=>s.items[x.pos].title))],name=s.practice?s.items[0].title:s.diag?'Диагностика':units[s.unit][0];let next=s.practice?cs.unit:s.diag?(activeProfile==='marina'?cs.unit:0):errors.filter(x=>s.items[x.pos].stage===1).length?s.unit:Math.min(units.length,s.unit+1);let summary='Верно в заданиях с ключом: '+correct.length+' из '+(errors.length+correct.length)+'. '+(weak.length?'Для повторения: '+weak.join(', ')+'. ':'В проверенных заданиях с ключом ошибок нет. ')+(s.diag?'Открытые ответы сохранены для отдельного разбора. ':'')+'Дальше: '+(units[next]?.[0]||'повторение по своему маршруту')+'.';let recurring=s.answers.flatMap(x=>x.issues||[]);if(recurring.length)summary+=' Разобранные ошибки: '+recurring.join(' ');if(correct.length)summary+=' Получилось: '+[...new Set(correct.map(x=>s.items[x.pos].title))].join(', ')+'.';cs.reports.push({date:dayKey(new Date()),lessonDate:s.lessonDate,name,diag:s.diag,summary});if(!s.lessonDate)cs.unit=next;cs.session=null;persist();modal('<div class="eyebrow">Lesson Review</div><h2>'+esc(name)+'</h2><p>'+esc(summary)+'</p>'+btn('Завершить','closeModal()','primary'))}
function lessonHero(){let cs=courseState(),s=cs.session,u=units[s?.unit??cs.unit];return '<section class="hero"><canvas id="wave" aria-hidden="true"></canvas><div class="eyebrow">Персональный урок</div><h2>'+esc((s?.diag||activeProfile==='vladlen'&&!cs.reports.length)?'Диагностика':u?.[0]||'Повторение')+'</h2><p>'+esc(s?'Продолжить с этапа '+stages[s.items[s.pos]?.stage??6]:'Грамматика, закрепление и устная практика')+'</p><div class="meta">'+cs.minutes+' мин · '+profileNames[activeProfile]+'</div><div class="actions">'+btn(s?'Продолжить урок':'Начать урок','startLesson()','primary')+btn('Мой курс','catalog()')+'</div></section>'}

function detailedFeedback(i,answer){
 const notes=[];
 for(const sentence of answer.match(/[^.!?]+[.!?]*/g)||[]){
  const t=sentence.trim();
  for(const [pattern,label,why] of [
   [/\bdid(?:n't| not)?\s+(?:went|took|bought|found|saw|was)\b/i,'Грамматика','После did верни смысловой глагол в начальную форму. Например, did go или did not take.'],
   [/\b(?:he|she|it) don't\b/i,'Грамматика','Для he, she и it в Present Simple используй doesn’t.'],
   [/\bmake (?:a )?homework\b/i,'Словосочетание','Для выполнения домашнего задания используют do homework.'],
   [/\bstrong rain\b/i,'Словосочетание','Для сильного дождя обычно используют heavy rain.'],
   [/\baccording to my opinion\b/i,'Неестественная фраза','Для собственного мнения обычно говорят in my opinion.'],
   [/\bvery very\b/i,'Стиль','В письменном ответе можно выбрать более точное прилагательное. Повтор в разговоре бывает уместен.']
  ])if(pattern.test(t))notes.push(t+' — '+label+': '+why);
 }
 if(i.words){const used=i.words.filter(word=>answer.toLowerCase().includes(word));notes.push('Сочетания в исходной форме: '+used.length+' из предложенных. Проверь также формы с изменённым временем глагола.')}
 return notes
}
async function copyReview(){
 let s=courseState().session,i=s.items[s.pos],msg='Проверь мой ответ уровня A2–B2. По каждому предложению укажи отдельно грамматику, сочетаемость, естественность и необязательные стилистические улучшения. Объясни изменения по-русски. Оцени связность и полноту, предложи следующий вопрос. Произношение оценивай только при приложенной аудиозаписи.\nЗадание: '+i.ask+'\nМой ответ: '+s.feedback.a;
 try{await navigator.clipboard.writeText(msg);$('#copyStatus').textContent='Скопировано для разбора с преподавателем.'}catch{$('#copyStatus').innerHTML='<textarea readonly>'+esc(msg)+'</textarea>'}
}

function interviewCatalog(){modal('<h2>Speaking interviews</h2><p>Choose one of '+speakingBank.length+' interviews. Each contains three questions.</p><label>Topic<select id="interviewSelect">'+speakingBank.map((x,i)=>'<option value="'+i+'">'+esc(x[0])+'</option>').join('')+'</select></label>'+btn('Start interview','startInterview()','primary'))}
function startInterview(){const cs=courseState();if(cs.session)return lessonScreen();const topic=speakingBank[Number($('#interviewSelect').value)];if(!topic)return;const s={id:crypto.randomUUID(),unit:Math.min(cs.unit,units.length-1),diag:false,practice:true,last:'Speaking',pos:0,answers:[],draft:'',heard:false,started:Date.now(),minutes:15,items:topic.slice(1).map(ask=>({stage:4,title:'Take an Interview: '+topic[0],ask,tip:'Answer directly, explain your reasoning and give a specific example.'}))};cs.session=s;persist();lessonScreen()}
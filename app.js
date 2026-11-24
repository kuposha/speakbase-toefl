const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])), dayKey=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'), today=dayKey(new Date()), dateObj=k=>new Date(k+'T12:00:00'), shift=(k,n)=>{let d=dateObj(k);d.setDate(d.getDate()+n);return dayKey(d)}, fmt=(k,o)=>dateObj(k).toLocaleDateString('ru-RU',o);
let activeProfile=localStorage.getItem('sb.active')==='vladlen'?'vladlen':'marina';
const storageKey=activeProfile==='marina'?'speakbase.v1':'speakbase.v1.vladlen';
let recordingSaved=null;
let db=Object.assign({h:[],plans:{},topics:[],materials:[],tests:[],draft:null,exam:null},JSON.parse(localStorage.getItem(storageKey)||'{}')), page=0,day=today,calendarMonth=today.slice(0,7)+'-01',dashboardCalendarOpen=false,planCalendarOpen=false,q,clock,recorder,stream,sessionToken=0;
function persist(){localStorage.setItem(storageKey,JSON.stringify(db))}
const names=['Обзор','План занятий','Тренажёр','Пробный TOEFL','Статистика','Мои ошибки','История','Материалы','Грамматика','Мой словарь'], navIcons=['grid','calendar','sliders','exam','chart','layers','history','book','book','book'];
const paths={grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',mic:'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0z M5 10v2a7 7 0 0 0 14 0v-2 M12 19v3 M8 22h8',phones:'M3 14v-3a9 9 0 0 1 18 0v7h-4v-7h4 M3 12h4v7H3z',pen:'m4 16 12-12 4 4L8 20l-5 1z M14 6l4 4',book:'M12 5Q7 2 2 4v15q5-2 10 1 5-3 10-1V4q-5-2-10 1v15',layers:'m2 8 10-5 10 5-10 5z M3 13l9 5 9-5 M3 17l9 5 9-5',chart:'M4 20V11 M10 20V6 M16 20V3 M22 20H2',history:'M3 10a9 9 0 1 1 1 7 M3 4v6h6 M12 7v6l4 2',calendar:'M3 5h18v16H3z M3 10h18 M8 3v4 M16 3v4',sliders:'M3 6h8m4 0h6 M3 17h3m5 0h10 M11 3h4v6h-4z M6 14h5v6H6z',exam:'M5 3h14v18H5z M9 8h6 M9 12h6 M9 16h3',play:'m7 4 13 8-13 8z',target:'M12 3a9 9 0 1 1-.01 0 M12 7a5 5 0 1 1-.01 0 M12 11a1 1 0 1 1-.01 0',bolt:'m13 2-9 12h7l-1 8 10-13h-7z',clock:'M12 2a10 10 0 1 1-.01 0 M12 6v6l4 2'};
const ico=n=>'<svg aria-hidden="true" viewBox="0 0 24 24"><path d="'+paths[n]+'"/></svg>', tile=i=>'<span class="icon" style="--t:'+colors[i]+'">'+ico(icons[i])+'</span>', btn=(label,fn,kind='btn')=>'<button class="'+kind+'" onclick="'+fn+'">'+label+'</button>', total=a=>a.reduce((s,x)=>s+x.min,0), seen=(k,i)=>db.h.some(x=>x.q.plan===k&&x.q.index===i);
const calendarStart=Date.UTC(2026,10,23);
const calendarEnd=Date.UTC(2027,11,31);
const calendarDay=86400000;
const calendarFocus=['Grammar and Speaking','Listening and Speaking','Reading and Speaking','Writing and Speaking','Vocabulary and Speaking','Timed practice','Retrieval and review'];
function dayProgram(k){
 const date=dateObj(k);
 const selected=Date.UTC(date.getFullYear(),date.getMonth(),date.getDate());
 const elapsed=Math.max(0,Math.min(calendarEnd-calendarStart,selected-calendarStart))/calendarDay;
 const weekday=elapsed%7;
 const elapsedDays=Math.floor(elapsed);
 const startUnit=activeProfile==='marina'?2:0;
 const unit=activeProfile==='marina'?(startUnit+elapsedDays)%units.length:Math.max(0,elapsedDays-1)%units.length;
 return {unit,focus:calendarFocus[weekday],minutes:weekday<5?110:120,review:weekday===6};
}
function scheduledUnit(k){return dayProgram(k).unit}

function plan(k){if(db.plans[k])return db.plans[k];let d=(dateObj(k).getDay()+6)%7;let rot=[[4,3,1],[1,2,4],[4,2,3],[3,1,2],[1,4,2],[2,3,4],[4,1,3]][d];let u=scheduledUnit(k);return [0,...rot].map((skill,i)=>({skill,min:(d<5?[40,25,25,20]:[45,30,25,20])[i],topic:units[u][0],level:u<12?'A2':u<30?'B1':'B2'}))}
function startScheduledLesson(){
 const cs=courseState();
 const pending=cs.calendarSessions??={};
 if(cs.session?.lessonDate===day)return startLesson();
 if(cs.session)pending[cs.session.lessonDate||'resume']=cs.session;
 cs.session=pending[day]||null;
 delete pending[day];
 cs.calendarRequest=day;
 persist();
 startLesson();
}

function openPlan(i){let c=plan(day)[i];start({...c,plan:day,index:i})}
function rows(){return plan(day).map((x,i)=>'<button class="task" onclick="openPlan('+i+')">'+tile(x.skill)+'<span><b>'+skills[x.skill]+' <span style="color:#696f65">/</span> '+titles[x.skill]+'</b><small>'+esc(x.topic)+' · '+x.level+'</small></span><span class="time">'+(seen(day,i)?'✓ ':'')+x.min+' мин</span></button>').join('')}
function calendarView(){const first=dateObj(calendarMonth),year=first.getFullYear(),month=first.getMonth(),offset=(first.getDay()+6)%7,last=new Date(year,month+1,0).getDate(),count=offset+last>35?42:35,start=shift(calendarMonth,-offset),prev=year===2026&&month===10,next=year===2027&&month===11;return '<div class="calendar"><div class="calendar-head"><button class="calendar-nav" type="button" onclick="changeCalendarMonth(-1)" '+(prev?'disabled':'')+' aria-label="Предыдущий месяц">‹</button><b>'+fmt(calendarMonth,{month:'long',year:'numeric'})+'</b><button class="calendar-nav" type="button" onclick="changeCalendarMonth(1)" '+(next?'disabled':'')+' aria-label="Следующий месяц">›</button></div><div class="calendar-weekdays">'+['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map(x=>'<span>'+x+'</span>').join('')+'</div><div class="week calendar-grid">'+Array.from({length:count},(_,i)=>{const k=shift(start,i),outside=k.slice(0,7)!==calendarMonth.slice(0,7),disabled=k<'2026-11-23'||k>'2027-12-31';return '<button type="button" class="day calendar-day '+(day===k?'active ':'')+(k===today?'is-today ':'')+(outside?'outside ':'')+'" onclick="pick(\''+k+'\')" '+(disabled?'disabled':'')+' aria-label="'+fmt(k,{day:'numeric',month:'long',year:'numeric'})+'" aria-pressed="'+(day===k)+'">'+dateObj(k).getDate()+'</button>'}).join('')+'</div><div class="calendar-footer"><span>Выбранная дата</span><b>'+fmt(day,{day:'numeric',month:'long',year:'numeric'})+'</b><button type="button" class="link" onclick="pick(\''+today+'\')">Сегодня</button></div></div>'}
function toggleDashboardCalendar(){dashboardCalendarOpen=!dashboardCalendarOpen;render()}function togglePlanCalendar(){planCalendarOpen=!planCalendarOpen;render()}
function changeCalendarMonth(delta){const first=dateObj(calendarMonth);calendarMonth=dayKey(new Date(first.getFullYear(),first.getMonth()+delta,1));render()}
function pick(k){if(!k)return;day=k;calendarMonth=k.slice(0,7)+'-01';render()}
function go(i){if(!Number.isInteger(i)||i<0||i>=names.length)return;page=i;closeMobileMenu();render();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
const THEME_KEY='sb.theme';
function applyTheme(theme=localStorage.getItem(THEME_KEY)||'dark'){const value=theme==='light'?'light':'dark';document.documentElement.dataset.theme=value;const button=$('#themeToggle');if(button){const light=value==='light';button.textContent=light?'☾ Тёмная тема':'☀ Светлая тема';button.setAttribute('aria-label',light?'Включить тёмную тему':'Включить светлую тему');button.title=light?'Переключить на тёмную тему':'Переключить на светлую тему'}const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=value==='light'?'#f4f6f2':'#101212'}
function toggleTheme(){const next=document.documentElement.dataset.theme==='light'?'dark':'light';localStorage.setItem(THEME_KEY,next);applyTheme(next)}
function section(title,body,extra=''){return '<section class="panel"><div class="head"><h2>'+title+'</h2>'+extra+'</div>'+body+'</section>'}
function suggested(skill){let attempts=db.h.filter(x=>x.q.skill===skill&&x.correct!==false&&!x.issues.length);let days=new Set(attempts.map(x=>x.day)).size;return days>=10&&attempts.length>=16?'B2':days>=3&&attempts.length>=4||skill===3?'B1':'A2'}
function fromHex(value){return String.fromCodePoint(...value.split(' ').map(x=>parseInt(x,16)))}
function trackedPracticeRows(){
 const sectionSkills=[3,1,2,0];
 const examRows=(db.examStudio?.history||[]).flatMap(attempt=>Object.entries(attempt.answers||{}).map(([key,result])=>({q:{skill:sectionSkills[Number(key.split('-')[0])]},correct:result.correct})).filter(item=>Number.isInteger(item.q.skill)));
 return [...(db.h||[]),...examRows];
}
function goalProgress(){
 const reports=(db.course?.reports||[]).filter(x=>!x.diag),lessons=new Set(reports.map(x=>x.lessonDate||x.date+'|'+x.name)).size;
 const tasks=trackedPracticeRows().length;
 const tests=(db.examStudio?.history||[]).filter(attempt=>attempt.sections?.length===4).length;
 const score=Math.max(0,Math.min(100,Math.round(lessons/46*100)));
 const stage=lessons===0?'Курс ещё не начат':lessons>=46?'Все 46 уроков пройдены':'Пройдено уроков курса';
 return {score,stage,lessons,tasks,tests};
}
function goalCard(){const g=goalProgress(),target=activeProfile==='marina'?'Цель: B2 · TOEFL iBT':'Цель: TOEFL iBT';return section('Учебный прогресс','<div class="goal-summary"><div><div class="goal-target">'+target+'</div><div class="goal-stage">'+g.stage+'</div></div><strong class="goal-percent">'+g.score+'%</strong></div><div class="goal-meter" role="progressbar" aria-label="Завершение учебной программы" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+g.score+'"><i style="width:'+g.score+'%"></i><span style="left:'+g.score+'%"></span></div><div class="goal-stats"><span>'+g.lessons+' / 46 уроков</span><span>'+g.tasks+' ответов</span><span>'+g.tests+' попыток полного варианта</span></div><p class="goal-caption">Полоса показывает только прохождение учебной программы, а не готовность к экзамену и не прогноз балла ETS. Точность проверяемых заданий и открытые ответы отслеживаются отдельно.</p>'+(activeProfile==='marina'?btn('Маршрут к B2','roadmap()','link'):'') ,ico('target'))}
function progress(){const labels=['Speaking','Listening','Writing','Reading','Грамматика'],all=trackedPracticeRows();return skills.map((s,i)=>{const items=all.filter(x=>x.q.skill===i),checked=items.filter(x=>x.correct!==null&&x.correct!==undefined),correct=checked.filter(x=>x.correct===true).length,accuracy=checked.length?Math.round(correct/checked.length*100):null,open=items.length-checked.length;return '<div class="progressrow"><div class="row"><span style="color:'+colors[i]+'">'+(labels[i]||s)+'</span><small>'+items.length+' ответов · '+checked.length+' проверяемых · '+open+' открытых'+(accuracy===null?'':' · '+accuracy+'% верно')+'</small></div><div class="track"><i style="background:'+colors[i]+';width:'+(accuracy===null?0:accuracy)+'%"></i></div></div>'}).join('')+'<p class="note">Точность считается только по ответам с однозначным ключом. Открытые Writing и Speaking не получают фиктивную автоматическую оценку; их нужно разбирать отдельно по критериям.</p>'}function intro(title,desc,action=''){return '<div class="intro"><div><h1>'+title+'</h1><p>'+desc+'</p></div>'+action+'</div>'}
function pendingCourseSession(){const s=courseState().calendarSessions?.resume;return s?section('Незавершённая практика','<p>'+esc(s.items?.[s.pos]?.title||'У тебя осталось незавершённое занятие')+'</p>'+btn('Продолжить с того же места','resumeCourseSession()','primary')):''}
function dash(){let p=plan(day),n=p.filter((_,i)=>seen(day,i)).length;return intro('Привет, '+profileNames[activeProfile],'Твоя персональная студия подготовки к TOEFL iBT.',btn(ico('sliders')+' Свободная практика','go(2)'))+'<div class="layout"><div class="col">'+lessonHero()+pendingCourseSession()+section('Дополнительная практика · '+(day===today?'сегодня':fmt(day,{day:'numeric',month:'long'})),rows(),'<span class="chip">'+n+' / '+p.length+'</span>')+'<div class="head" style="margin-bottom:-7px"><h2>Быстрая практика</h2>'+btn('Все навыки','go(2)','link')+'</div><div class="focusgrid">'+[0,1,2].map(i=>btn(tile(i)+'<b>'+skills[i]+'</b><small>'+['Свобода речи','Понимание на слух','Развитие мысли'][i]+'</small>','config('+i+')','focus')).join('')+'</div></div><div class="col">'+goalCard()+section('Календарь занятий',dashboardCalendarOpen?calendarView()+'<div class="row"><small>План на день</small><b>'+total(p)+' мин</b></div>':'<button type="button" class="calendar-collapsed" onclick="toggleDashboardCalendar()"><span>'+ico('calendar')+'<span><b>'+fmt(day,{weekday:'long',day:'numeric',month:'long'})+'</b><small>Открыть календарь занятий</small></span></span>'+ '<span class="calendar-chevron">›</span>'+'</button>','<button type="button" class="calendar-toggle" onclick="toggleDashboardCalendar()" aria-label="'+(dashboardCalendarOpen?'Свернуть календарь':'Открыть календарь')+'" aria-expanded="'+dashboardCalendarOpen+'">'+ico('calendar')+'</button>')+section('По навыкам',progress(),ico('chart'))+'</div></div>'}
function wave(){let c=$('#wave');if(!c)return;let r=c.getBoundingClientRect(),w=r.width,h=r.height,d=devicePixelRatio;c.width=w*d;c.height=h*d;let g=c.getContext('2d');g.scale(d,d);for(let j=0;j<72;j++){let z=j/71;g.beginPath();for(let i=0;i<=170;i++){let t=i/170,x=t*w,y=h*(.57+.12*Math.sin(t*7-z*3)+(.08+.2*t)*Math.sin(t*11-z*4.2)+.11*Math.sin(t*18-z*3)+.19*(z-.5));i?g.lineTo(x,y):g.moveTo(x,y)}let grd=g.createLinearGradient(0,0,w,0);grd.addColorStop(0,'#a4ed5700');grd.addColorStop(.32,'#8ac84945');grd.addColorStop(.68,'#c3fa76c9');grd.addColorStop(1,'#bbf865a0');g.strokeStyle=grd;g.lineWidth=.78;g.stroke()}}
function extended(){if(page===9)return vocabularyView();if(page===8)return grammarLibraryView();if(page===1)return intro(names[1],'Выбери день, чтобы изменить его программу.',btn('Редактировать','editPlan()'))+section(fmt(day,{weekday:'long',day:'numeric',month:'long'}),(planCalendarOpen?calendarView():'<button type="button" class="calendar-collapsed" onclick="togglePlanCalendar()"><span>'+ico('calendar')+'<span><b>'+fmt(day,{weekday:'long',day:'numeric',month:'long'})+'</b><small>Открыть календарь занятий</small></span></span><span class="calendar-chevron">›</span></button>')+'<h3>Тема дня: '+esc(units[scheduledUnit(day)][0])+'</h3><p>'+esc(dayProgram(day).focus)+' · '+total(plan(day))+' min</p>'+btn('Начать урок по теме дня','startScheduledLesson()','primary')+rows(),'<button type="button" class="calendar-toggle" onclick="togglePlanCalendar()" aria-label="'+(planCalendarOpen?'Свернуть календарь':'Открыть календарь')+'" aria-expanded="'+planCalendarOpen+'">'+ico('calendar')+'</button>');
if(page===2)return intro('Тренажёр','Выбери навык и настрой практику под себя.')+'<div class="grid">'+skills.map((s,i)=>btn(tile(i)+'<h2>'+s+'</h2><p class="sub">'+titles[i]+'</p>','config('+i+')','focus')).join('')+'</div>'+(db.draft?btn('Открыть черновик','resume()'):'')+pendingCourseSession();
if(page===3)return intro('TOEFL','Extended practice simulation')+section('Reading · Listening · Writing · Speaking','<div class="stack"><p>34 tasks, 60 minutes, four timed sections. This is an unofficial practice simulation, not an ETS score or adaptive exam.</p>'+btn(db.exam?'Продолжить пробник':'Начать пробник','mockStart()','primary')+'</div>')+section('История пробников',db.tests.map((t,i)=>'<p class="hist">'+esc(t.date)+' · '+t.done+'/'+(t.total||4)+' заданий · точность '+t.right+'/'+(t.closed??2)+btn('Review','mockResult('+i+')','link')+'</p>').join('')||'<p class="empty">Здесь появится первый результат.</p>');
if(page===4)return intro(names[4],'Твой прогресс по сохранённым ответам.')+'<div class="grid">'+section('Выполнено заданий','<h1>'+db.h.length+'</h1>')+section('Дней практики','<h1>'+new Set(db.h.map(x=>x.day)).size+'</h1>')+section('По навыкам',progress())+'</div>';
if(page===5)return intro('Мои ошибки','Повторяй трудные задания и сравнивай попытки.')+section('Из твоих ответов',historyRows(db.h.filter(x=>x.issues.length||x.correct===false)))+(activeProfile==='marina'?section('Listening · по разбору из проекта',['Источник информации','Причина отказа','Смысл реплики'].map((s,i)=>'<div class="hist row">'+s+btn('Повторить','weak('+i+')')+'</div>').join('')):'');
if(page===6)return section('Отчёты уроков',reportList()||'<small>Здесь появится итог первого урока.</small>')+intro('История ответов','Открой разбор или вернись к заданию.')+section('Сохранённые попытки',historyRows(db.h));
return materials()}
function historyRows(arr){return arr.slice().reverse().map(x=>'<button class="task" onclick="review('+db.h.indexOf(x)+')">'+tile(x.q.skill)+'<span><b>'+skills[x.q.skill]+' · '+esc(x.q.topic)+'</b><small>'+x.day+' · '+esc(practiceLevelText(x.q))+'</small></span></button>').join('')||'<p class="empty">Пока нет сохранённых попыток в этом разделе.</p>'}
function render(){if(!db.vocabulary){db.vocabulary=activeProfile==='marina'?vocabularySeed.map((w,id)=>({category:w[0],group:w[1],en:w[2],ru:w[3],id,status:'new',nextReview:today,interval:0,seen:0})):[];persist()} $('#profileSelect').textContent=profileNames[activeProfile]+' ⌄';$('.profile').innerHTML='<b>'+ (activeProfile==='marina'?'МГ':'В')+'</b><div>'+profileNames[activeProfile]+'<small>Личный профиль</small></div>'; $('#nav').innerHTML=names.map((s,i)=>({s,i})).map(({s,i})=>(i===0?'<div class="navlabel">Подготовка</div>':i===4?'<div class="navlabel">Моя практика</div>':i===8?'<div class="navlabel">Учебные материалы</div>':'')+btn(ico(navIcons[i])+s,'go('+i+')',page===i?'selected':'')).join('');$('#nav').querySelectorAll('button').forEach(button=>{const i=Number((button.getAttribute('onclick')||'').match(/go\((\d+)\)/)?.[1]);if(i===page)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});if(matchMedia('(max-width:810px)').matches)$('#nav button[aria-current="page"]')?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'auto'});applyTheme();$('#crumb').textContent=names[page];$('#date').textContent=fmt(today,{day:'numeric',month:'long',weekday:'short'});$('#app').innerHTML=page===0?dash():extended();if(page===9)filterVocabulary();wave()}
function modal(html){$('#box').innerHTML='<div class="stack">'+html+'</div>';$('#modal').classList.remove('lesson-fullscreen');if(!$('#modal').open)$('#modal').showModal()}
function closeModal(){$('#modal').close()}
$('#close').onclick=closeModal;$('#modal').onclose=()=>{sessionToken++;clearInterval(clock);stopMic();window.speechSynthesis?.cancel();render()};
const opts=(a,v)=>a.map(x=>'<option '+(x===v?'selected':'')+'>'+esc(x)+'</option>').join('');
function fields(c,prefix=''){return '<div class="grid"><label>Навык<select id="'+prefix+'sk">'+opts(skills,skills[c.skill])+'</select></label><label>Тема<select id="'+prefix+'tp">'+opts([...new Set([c.topic,...topics,...db.topics])],c.topic)+'</select></label><label>Сложность<select id="'+prefix+'lv">'+opts(levels,c.level)+'</select></label><label>Минуты<input id="'+prefix+'mn" type="number" min="1" max="180" required value="'+c.min+'"></label></div>'}
function values(p=''){return {skill:skills.indexOf($('#'+p+'sk').value),topic:$('#'+p+'tp').value,level:$('#'+p+'lv').value,min:Number($('#'+p+'mn').value)}}
function config(i=0){modal('<h2>Настроить практику</h2><form id="form" class="stack">'+fields({skill:i,topic:topics[0],level:i===3?'B1':'A2',min:15})+'<p class="note" id="practiceHint"></p><button class="primary">Начать занятие</button></form>');syncPracticeForm();$('#sk').onchange=syncPracticeForm;$('#form').onsubmit=e=>{e.preventDefault();start(values())}}
function syncPracticeForm(){
  const sk=skills.indexOf($('#sk').value),tp=$('#tp'),lv=$('#lv'),hint=$('#practiceHint');
  if(!tp||!lv||!hint)return;
  const tpLabel=tp.closest('label'),lvLabel=lv.closest('label');
  if(sk===4){
    tpLabel.firstChild.textContent='Тема';
    tp.innerHTML='<option value="">Определяется уровнем</option>';
    tp.disabled=true;
  }else{
    tp.disabled=false;
    tpLabel.firstChild.textContent=sk===2?'Тип задания':'Тема';
    tp.innerHTML='<option value="">Любая — смешанная практика</option>'+practiceTopicOptions(sk).map(o=>'<option value="'+esc(o.label)+'">'+esc(o.label)+' ('+o.count+')</option>').join('');
  }
  const marked=sk===2||sk===4;
  lvLabel.firstChild.textContent=marked?'Уровень':'Целевой уровень';
  hint.textContent=sk===4?'Grammar подбирается по уровню; тема определяется уровнем и отдельно не выбирается.'
    :sk===2?'Writing размечен по уровням A2–B2, уровень влияет на подбор. «Тип задания» — названия заданий в банке (Email, Discussion, Build a Sentence).'
    :'Уровень здесь — ваша цель тренировки. Задания этого навыка не размечены по CEFR, поэтому уровень не показывает их сложность и не влияет на подбор. Темы взяты из названий заданий в банке; если заданий по теме мало, остальные подбираются смешанно — об этом будет сказано.';
}
function editPlan(){let p=plan(day);modal('<h2>План на '+fmt(day,{day:'numeric',month:'long'})+'</h2><form id="form" class="stack">'+p.map((c,i)=>fields(c,'p'+i)).join('<hr>')+'<button class="primary">Сохранить план</button></form>');$('#form').onsubmit=e=>{e.preventDefault();db.plans[day]=p.map((_,i)=>values('p'+i));persist();closeModal();render()}}
function startFocus(){let p=plan(day),i=p.findIndex(x=>x.skill===0);if(i>=0)openPlan(i);else config(0)}
function start(c){let task=exercise(c);if(c.skill===0){task.drill=true;task.tip+=' Сначала собери фразу из подлежащего и глагола. Произнеси её дважды, добавь деталь и запиши вторую версию.'}begin(task)}
function begin(ex){db.draft={q:ex,answer:'',end:Date.now()+ex.min*60000};persist();resume()}
function resume(){let d=db.draft;if(!d)return;showTask(d)}
function speak(txt){if(!window.speechSynthesis){$('#speechStatus').textContent='Озвучка недоступна. Открой текст ниже.';return}speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(txt);u.lang='en-US';u.rate=.92;speechSynthesis.speak(u)}
function stopMic(){if(recorder&&recorder.state!=='inactive')recorder.stop();stream?.getTracks().forEach(t=>t.stop());recorder=null;stream=null}
async function mic(){if(recorder?.state==='recording'){stopMic();return}let token=sessionToken;try{let s=await navigator.mediaDevices.getUserMedia({audio:true});if(sessionToken!==token){s.getTracks().forEach(t=>t.stop());return}stream=s;let r=new MediaRecorder(s),chunks=[];recorder=r;r.ondataavailable=e=>chunks.push(e.data);let finishRecording;recordingSaved=new Promise(resolve=>finishRecording=resolve);r.onstop=async()=>{try{let blob=new Blob(chunks,{type:r.mimeType});if(token!==sessionToken)return;let id=crypto.randomUUID();await blobPut(id,blob);if(token!==sessionToken)return;q.audioId=id;if(courseState().session&&$('#lessonForm'))courseState().session.audioId=id;persist();$('#listenback').src=URL.createObjectURL(blob);$('#listenback').hidden=false;$('#micBtn').textContent='Записать снова'}finally{finishRecording();recordingSaved=null}};r.start();$('#micBtn').textContent='Остановить запись'}catch{$('#speechStatus').textContent='Микрофон недоступен. Произнеси ответ и введи расшифровку.'}}
function blobStore(){return new Promise((res,rej)=>{let r=indexedDB.open('speakbase-files',1);r.onupgradeneeded=()=>r.result.createObjectStore('files');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function blobPut(k,b){let db=await blobStore();await new Promise((res,rej)=>{let t=db.transaction('files','readwrite');t.objectStore('files').put(b,k);t.oncomplete=res;t.onerror=rej});db.close()}
async function blobGet(k){let db=await blobStore();return new Promise((res,rej)=>{let r=db.transaction('files').objectStore('files').get(k);r.onsuccess=()=>{db.close();res(r.result)};r.onerror=rej})}
function timedSpeaking(){let start=Date.now(),b=document.querySelector('#round');if(!b)return;b.disabled=true;let id=setInterval(()=>{if(!b.isConnected||!document.querySelector('#modal').open){clearInterval(id);return}let left=45-Math.floor((Date.now()-start)/1000);b.textContent=left>0?'Устный ответ · '+left+' с':'Повторить раунд · 45 с';if(left<=0){b.disabled=false;clearInterval(id)}},200)}
function showTask(d){if(d.q.mock&&Date.now()>=d.end)return mockNext();if(d.q.skill===1&&!d.listened){clearInterval(clock);q=d.q;modal('<h2>Listening</h2><p>Прослушай сообщение. Затем открой вопрос.</p>'+btn('Прослушать','speak(q.source);document.querySelector(&quot;#unlock&quot;).disabled=false')+'<small id="speechStatus"></small><button disabled class="primary" id="unlock">Я прослушал(а)</button>');if(d.q.mock){const timer=document.createElement('p');timer.className='mono';$('#unlock').before(timer);const tick=()=>{let seconds=Math.ceil((d.end-Date.now())/1000);if(seconds<=0){clearInterval(clock);mockNext();return}timer.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0')};clock=setInterval(tick,500);tick()}$('#unlock').onclick=()=>{d.listened=true;persist();showTask(d)};return}sessionToken++;clearInterval(clock);q=d.q;let speaking=q.skill===0;modal('<div class="eyebrow">'+(q.mock?'Пробник · '+(db.exam.step+1)+' / 34':'Практика')+'</div><div class="row"><h2>'+skills[q.skill]+'</h2><span class="mono" id="clock"></span></div><div class="meta">'+esc(q.topic)+' · '+esc(practiceLevelText(q))+'</div>'+(q.mock?'':btn('Добавить слово в словарь','addVocabularyWord(true)'))+(q.source?(q.skill===1||q.repeat?btn(ico('phones')+' Прослушать','speak(q.source)'):'<blockquote>'+esc(q.source)+'</blockquote>'):'')+'<h3 lang="en">'+esc(q.ask)+'</h3>'+(speaking?(q.mock?'':'<p class="note">'+esc(q.tip)+'</p>')+'<button class="btn" id="round" onclick="timedSpeaking()">Устный раунд · 45 с</button><button class="btn" id="micBtn" onclick="mic()">Записать голос</button><audio controls hidden id="listenback"></audio>':'')+'<small id="speechStatus" role="status"></small><form id="answerForm" class="stack">'+(q.opts?'<label>Твой ответ<select id="answer" required><option value="">Выбери вариант</option>'+opts(q.opts,d.answer)+'</select></label>':'<label>'+(speaking?'Расшифровка ответа для разбора':'Твой ответ на английском')+'<textarea required id="answer" placeholder="Type your response…">'+esc(d.answer)+'</textarea></label>')+'<button class="primary">Сохранить и проверить</button></form>');if(q.audioId&&speaking)blobGet(q.audioId).then(b=>{if(b&&$('#listenback')){$('#listenback').src=URL.createObjectURL(b);$('#listenback').hidden=false}});$('#answer').oninput=e=>{d.answer=e.target.value;persist()};$('#answerForm').onsubmit=e=>{e.preventDefault();if(recorder?.state==='recording'){stopMic();$('#speechStatus').textContent='Запись сохранится через секунду. Затем нажми «Сохранить и проверить».';return}if($('#answer').value.trim())submitAnswer($('#answer').value.trim())};function tick(){let s=Math.max(0,Math.ceil((d.end-Date.now())/1000));$('#clock').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');if(!s){clearInterval(clock);if(q.mock)mockNext();else $('#clock').textContent='Время вышло'}}clock=setInterval(tick,500);tick()}
function norm(s){return s.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}\s]/gu,'').replace(/\s+/g,' ').trim()}
function evaluate(q,a){let issues=[],correct=null,edited=a;if(q.exact||q.opts||q.repeat)correct=norm(a)===norm(q.model);else for(let [re,to,why] of rules){let m=edited.match(re);if(m){issues.push(m[0]+' → '+to+'. '+why);edited=edited.replace(re,to)}}let advice=q.tip;if(correct===null){if(!/\b(because|since|so that|as a result)\b/i.test(a))advice+=' Уточни причину: What makes you think so?';if(!/\b(example|instance|last|when I|once)\b/i.test(a))advice+=' Добавь эпизод: For example, last week I…';if(q.skill===0)advice+=' Повтори ответ вслух по трём ключевым словам, затем ещё раз без подсказки.'}return {issues,correct,edited,advice}}
function submitAnswer(a){clearInterval(clock);if(q.mock&&Date.now()>=db.exam.end)return mockNext();let x={q:{...q},a,day:today,...evaluate(q,a)};db.h.push(x);if(q.mock){db.exam.answers.push(db.h.length-1);db.exam.step++;db.exam.active=null}else db.draft=null;persist();if(q.mock){mockNext();return}review(db.h.length-1)}
function review(i){let x=db.h[i],c=x.q;modal('<div class="eyebrow">'+skills[c.skill]+' · '+esc(practiceLevelText(c))+'</div><h2>Разбор ответа</h2><p>'+esc(c.ask)+'</p><blockquote>'+esc(x.a)+'</blockquote>'+(c.audioId?'<audio id="savedAudio" controls></audio>':'')+'<h3>'+(x.correct===true?'Верно':x.correct===false?'Сверь ответ с образцом':'Проверка по правилам')+'</h3><p>'+esc(x.issues.join(' ')||(x.correct===null?'В проверяемых конструкциях совпадений с типичными ошибками нет.':c.tip))+'</p>'+(x.issues.length?'<blockquote>'+esc(x.edited)+'</blockquote>':'')+'<h3>Образец ответа</h3><blockquote>'+esc(c.model)+'</blockquote><h3>Следующая попытка</h3><p>'+esc(x.advice)+'</p>'+((c.mock&&db.exam)?btn(db.exam.step===4?'Завершить пробник':'Следующее задание','mockNext()','primary'):btn('Попробовать ещё раз','retry('+i+')','primary')));if(c.audioId)blobGet(c.audioId).then(b=>{if(b&&$('#savedAudio'))$('#savedAudio').src=URL.createObjectURL(b)})}
function retry(i){begin({...db.h[i].q,mock:false,audioId:null})}
function weak(i){let source="I found out about the lecture in the department newsletter. I'd love to help with the party, but my class runs until six. Could we try another day?";begin({skill:1,topic:'Campus conversation',min:10,level:'B1',source,ask:['Where did the speaker hear about the lecture?','Why does the speaker decline?','What does the last question imply?'][i],opts:[['In a newsletter','In a lecture','From a friend'],['A class finishes late','The party is cancelled','The room is full'],['They want to reschedule','They dislike the idea','They forgot the date']][i],model:['In a newsletter','A class finishes late','They want to reschedule'][i],tip:['Newsletter называет источник новости.','После but говорящий объясняет причину отказа.','Could we try another day? — предложение перенести встречу.'][i]})}
const extraMockBank=[["The library will close at six on Friday because staff are installing new computers. Books may still be returned using the outdoor box.","Why will the library close early?",["To install computers","To count returned books","To hold a lecture"]],["Students who register before Monday can attend the workshop free of charge. Later registrations cost ten dollars.","What is the benefit of registering early?",["Avoiding a fee","Choosing a different venue","Receiving a textbook"]],["The campus garden uses rainwater collected from nearby roofs. This reduces demand for treated water during dry periods.","What is the main benefit of the system?",["Lower demand for treated water","Faster roof construction","Higher rainfall"]],["The chemistry laboratory requires protective glasses even when students are only observing an experiment.","Who must wear protective glasses?",["Observers as well as participants","Only instructors","Only students mixing chemicals"]],["The museum moved its textile collection away from direct sunlight because prolonged exposure can weaken fibers.","Why was the collection moved?",["To prevent damage","To increase visitor numbers","To improve ventilation"]],["A survey found that students preferred longer opening hours to additional study rooms. The university therefore extended evening access.","What change did the university make?",["Extended opening hours","Built more rooms","Reduced evening access"]]];
const readingMockBank=extraMockBank.concat([["Urban trees cool streets by providing shade and releasing water vapor.","How do trees help cool streets?",["By providing shade and releasing vapor","By absorbing street noise","By blocking rainfall"]],["Some migratory birds use stars to navigate at night. Cloud cover can make this method less reliable.","What can interfere with navigation?",["Cloud cover","Long daylight","Warm soil"]],["A new bus route connects the station to the science campus without requiring a transfer.","What advantage does the route offer?",["A direct connection","Lower train fares","More parking"]],["Coral reefs support diverse marine life but are sensitive to changes in water temperature.","What threatens reefs according to the passage?",["Temperature changes","Marine diversity","Ocean depth"]],["Researchers compared two soils using identical seeds and watering schedules.","Why were watering schedules identical?",["To isolate the effect of soil","To test different seeds","To increase rainfall"]],["The archive digitizes fragile letters so researchers can consult them without handling the originals.","Why are letters digitized?",["To protect originals","To translate them","To sell copies"]]]);
const listeningMockBank=[["Hi, this is the campus clinic. Your appointment has moved from Tuesday to Thursday at the same time. Please call if Thursday is inconvenient.","What has changed?",["The appointment day","The appointment time","The clinic location"]],["Professor, I missed the deadline because the upload failed. Could I email my essay? Yes, but send it before noon today.","What should the student do?",["Email the essay before noon","Wait until tomorrow","Print the essay"]],["Attention passengers. The train to Bristol will depart from platform four rather than platform two.","Where should passengers go?",["Platform four","Platform two","The ticket office"]],["I wanted to reserve a study room, but all the large rooms are booked. There is a small room available at three.","What option is available?",["A small room at three","A large room at three","A room tomorrow"]],["Today we will examine why deserts can become cold at night. Dry air and limited cloud cover allow heat to escape rapidly.","Why can deserts cool quickly?",["Heat escapes through dry clear air","Sand produces ice","Clouds trap cold air"]],["Our experiment was delayed because the sensor batteries were empty. We replaced them and will collect measurements tomorrow.","Why was the experiment delayed?",["The batteries were empty","The results were inaccurate","The laboratory was closed"]],["The guest speaker cannot attend in person, so we will stream her lecture in the usual classroom.","How will students attend the lecture?",["Watch a stream in the classroom","Visit another campus","Attend outdoors"]],["I ordered the textbook online, but it will arrive next week. You can borrow my spare copy until then.","What does the speaker offer?",["A temporary textbook loan","A refund","An online course"]],["Bees communicate the direction of food through movements. The angle of their dance provides information about the location.","What does the dance angle indicate?",["The direction of food","The age of the bee","The temperature of the hive"]],["Please submit your travel receipts separately from your registration form. We cannot reimburse expenses without receipts.","What is needed for reimbursement?",["Travel receipts","A student photograph","A course transcript"]],["The swimming pool is open today, but the changing rooms are being repaired. Temporary facilities are available beside the entrance.","What is being repaired?",["The changing rooms","The pool","The entrance"]],["I planned to interview ten volunteers, but only eight arrived. I will recruit two more before analyzing the data.","What will the researcher do next?",["Recruit two volunteers","Discard all the interviews","Analyze the data immediately"]]];
const writingMockBank=[["Write an Email","You reserved a laboratory workstation, but the booking system shows the wrong date.","Write an email to the lab coordinator. Explain the error, request a correction, and ask for confirmation.","Dear Coordinator, I reserved a workstation for Thursday, but the system shows Friday. Could you correct the booking and confirm the new date? Thank you for your help."],["Write an Email","Your group presentation conflicts with a required appointment.","Email your instructor. Explain the conflict, suggest an alternative, and ask whether it is acceptable.","Dear Professor, I have a required appointment during our presentation. Could our group present later that afternoon? I would appreciate your approval."],["Academic Discussion","Professor: Should universities require community service? Alex: It develops practical skills. Mia: Students already have limited time.","Contribute your own position and respond to a classmate.","I agree with Alex that community service develops practical skills. However, flexible scheduling would address Mia’s concern about limited time."],["Academic Discussion","Professor: Should cities invest more in public transport or roads? Sam: Transit reduces congestion. Lee: Roads serve rural commuters.","Explain your position and support it with a specific example.","Public transport should receive priority in dense cities because frequent buses can replace many car journeys. Rural areas may still need road improvements."],["Build a Sentence","The researcher / collected / data / before / the lecture / began.","Arrange the words into a grammatical sentence.","The researcher collected data before the lecture began."],["Build a Sentence","Although / the course / was difficult / she / completed / it.","Arrange the words into a grammatical sentence.","Although the course was difficult, she completed it."],["Write an Email","A library book you returned is still listed as overdue.","Email the library. Explain what happened, provide details, and request assistance.","Dear Library Staff, I returned the book on Monday using the outdoor box, but it is still listed as overdue. Could you check the return records?"],["Academic Discussion","Professor: Is remote work beneficial for new employees? Kim: It saves travel time. Jo: In-person mentoring is valuable.","Give your opinion and explain how employers could address a drawback.","Remote work saves time, but new employees need guidance. Scheduled mentoring sessions could help them develop skills while working remotely."]];
const speakingMockBank=[["Listen and Repeat","The seminar will begin immediately after lunch."],["Listen and Repeat","Please return all borrowed equipment before leaving the laboratory."],["Listen and Repeat","Students who need additional assistance can contact the academic adviser."],["Listen and Repeat","Although the weather was unfavorable, the researchers completed their fieldwork."],["Take an Interview","Describe a skill you recently learned. What helped you improve?"],["Take an Interview","Do you prefer studying independently or with classmates? Explain why."],["Take an Interview","Tell me about a time you solved a difficult problem. What did you learn?"],["Take an Interview","How could universities help students manage their time more effectively?"],["Listen and Repeat","The results suggest that regular practice improves long-term retention."],["Take an Interview","Would you rather take an online course or attend classes in person? Give a reason and an example."],["Listen and Repeat","The application deadline has been extended until the end of next week."],["Take an Interview","What is one change that would make your community a better place to live?"]];
function mockExercise(c,index){let q=exercise(c);if(c.skill===3||c.skill===1){let bank=c.skill===3?readingMockBank:listeningMockBank;let item=bank[index%bank.length];let opts=item[2].slice();let shift=index%3;opts=opts.slice(shift).concat(opts.slice(0,shift));q.source=item[0];q.ask=item[1];q.opts=opts;q.correct=item[2][0];q.model=item[2][0];}if(c.skill===2){let [type,source,ask,model]=writingMockBank[index%writingMockBank.length];Object.assign(q,{topic:type,source,ask,model,exact:type==='Build a Sentence',opts:null,repeat:false});}if(c.skill===0){let [type,prompt]=speakingMockBank[index%speakingMockBank.length];let repeat=type==='Listen and Repeat';Object.assign(q,{topic:type,source:repeat?prompt:'',ask:repeat?'Listen and repeat the sentence exactly.':prompt,model:repeat?prompt:'Give a clear answer with a reason and a specific example.',repeat,exact:repeat,opts:null});}return q;}
const mockSections=[{skill:3,count:12,minutes:15},{skill:1,count:12,minutes:15},{skill:2,count:4,minutes:20},{skill:0,count:6,minutes:10}];
function mockStart(){if(!db.exam||!db.exam.version)db.exam={version:2,step:0,section:0,sectionStart:0,end:Date.now()+mockSections[0].minutes*60000,answers:[],seed:db.tests.length%24};persist();mockNext()}
function mockNext(){let e=db.exam;while(e.section<mockSections.length&&(e.step-e.sectionStart>=mockSections[e.section].count||Date.now()>=e.end)){e.section++;e.sectionStart=e.step;e.active=null;if(e.section<mockSections.length)e.end=Date.now()+mockSections[e.section].minutes*60000}if(e.section>=mockSections.length)return finishMock();let sec=mockSections[e.section];if(!e.active)e.active={q:{...mockExercise({skill:sec.skill,min:sec.minutes,level:['A2','B1','B2'][(e.seed+Math.floor((e.step-e.sectionStart)/topics.length))%3],topic:topics[(e.seed+e.step)%topics.length]},e.seed+e.step),mock:true},answer:'',end:e.end};persist();showTask(e.active)}
function finishMock(){
 clearInterval(clock);
 const attempt=db.exam;
 const results=attempt.answers.map(index=>db.h[index]);
 const judged=results.filter(item=>item.correct!==null);
 const total=mockSections.reduce((sum,section)=>sum+section.count,0);
 db.tests.push({date:today,done:results.length,total,right:judged.filter(item=>item.correct).length,closed:judged.length,answers:attempt.answers.slice()});
 db.exam=null;
 persist();
 page=3;
 mockResult(db.tests.length-1);
}
function mockResult(index){
 const result=db.tests[index];
 const rows=(result.answers||[]).map(i=>db.h[i]).filter(Boolean);
 const sections=mockSections.map(section=>{
  const items=rows.filter(item=>item.q.skill===section.skill);
  const checked=items.filter(item=>item.correct!==null);
  return '<div class="hist"><strong>'+skills[section.skill]+'</strong> '+items.length+'/'+section.count+' completed · '+checked.filter(item=>item.correct).length+'/'+checked.length+' correct</div>';
 }).join('');
 const reviewRows=(result.answers||[]).map(i=>db.h[i]?btn(esc(db.h[i].q.ask),'review('+i+')'):'').join('');
 modal('<h2>Practice results</h2><p>Completed: '+result.done+'/'+(result.total||4)+'</p><p>Correct checked answers: '+result.right+'/'+result.closed+'</p>'+sections+reviewRows+btn('OK','closeModal()'));
}
function roadmap(){modal('<h2>Маршрут к B2</h2><p><b>Основа · A2–B1</b><br>Собери предложение, добавь причину и пример. Закрепляй грамматику на своих фразах по Murphy. После четырёх успешных попыток в разные дни (минимум три дня) тренажёр предложит B1.</p><p><b>Развитие мысли · B1</b><br>Сравни варианты, поясни результат, ответь на уточняющий вопрос. Записывай вторую попытку по трём ключевым словам.</p><p><b>Экзаменационная практика · B2</b><br>После 16 успешных попыток за десять разных дней переходи к контраргументам и заданиям на время. Уровень можно выбрать вручную.</p><p>База — 90 минут в день (10,5 часа в неделю). Для гибкого ориентира 12–14 часов добавляй 1,5–3,5 часа короткой практики в удобные дни.</p>')}
function materials(){return intro('Материалы','Источники проекта «Учим английский и сдаем TOEFL».',btn('Добавить','addMaterial()'))+'<div class="col">'+section('Учебная база',btn('Каталог упражнений','practiceLibrary()','primary'))+section('Из проекта','<div class="stack">'+(localProjectFiles()?'<a href="toefl-structure.pdf" target="_blank">Структура TOEFL 2026 · PDF</a><label>Аудиозапись занятия<audio controls src="project-audio.mp3"></audio></label><a href="project-image.png" target="_blank">Разбор Listening · скриншот</a>':'')+''+btn('Academic Vocabulary · 12 карточек','flash(0)')+'<a href="https://www.ets.org/toefl/test-takers/ibt/about/content.html" target="_blank">ETS · формат экзамена</a></div>')+section('Учебники в плане','<p>Murphy Intermediate и Supplementary Exercises — отработка грамматики на собственных предложениях. Collocations in Use Intermediate — словосочетания для Speaking. Advanced — выборочно. Writer’s Handbook и материалы по пунктуации — редактирование Writing.</p><p class="sub">Official Guide ETS 2021 — отдельные тексты и аудио. Для пробников используй актуальный формат ETS и TestReady. BestMyTest — дополнительная практика.</p>')+section('Мои темы и материалы',db.materials.map((m,i)=>'<div class="hist"><b>'+esc(m.title)+'</b><p>'+esc(m.note)+'</p>'+(m.file?btn('Открыть файл','openFile('+i+')'):'')+'</div>').join('')+'<p class="note">'+esc(db.topics.join(' · ')||'Добавь тему для тренажёра или сохрани свой файл.')+'</p>')+'</div>'}
function addMaterial(){modal('<h2>Добавить материал</h2><form id="form" class="stack"><label>Название или своя тема<input id="name" required maxlength="120"></label><label>Заметка или текст задания<textarea id="note"></textarea></label><label>Файл<input id="file" type="file"></label><label><span><input type="checkbox" checked id="asTopic" style="width:auto"> Добавить название в темы практики</span></label><button class="primary">Сохранить</button></form>');$('#form').onsubmit=async e=>{e.preventDefault();let title=$('#name').value.trim(),note=$('#note').value,file=$('#file').files[0],id=null;if(!title)return;if(file){id=crypto.randomUUID();await blobPut(id,file)}db.materials.push({title,note,file:id,filename:file?.name});if($('#asTopic').checked&&!topics.includes(title)&&!db.topics.includes(title))db.topics.push(title);persist();closeModal()}}
async function openFile(i){let m=db.materials[i],b=await blobGet(m.file);if(b){let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=m.filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}}
function flash(i){let c=cards[i];modal('<div class="eyebrow">Academic Vocabulary · '+(i+1)+' / '+cards.length+'</div><h2>'+c[0]+'</h2><details><summary>Показать значение</summary>'+c[1]+'</details><p>Составь фразу со словом и произнеси её вслух.</p>'+btn(i===11?'С начала':'Следующее слово','flash('+((i+1)%12)+')','primary'))}
window.addEventListener('resize',wave);


function localProjectFiles(){return ['localhost','127.0.0.1'].includes(location.hostname)||location.protocol==='file:'}


const vocabularySeed=[["Daily Life & Routine","Daily Life & Routine","get ready","собираться, готовиться"],["Daily Life & Routine","Daily Life & Routine","focus on","сосредоточиться на"],["Daily Life & Routine","Daily Life & Routine","spend time","проводить время"],["Daily Life & Routine","Daily Life & Routine","take a break","сделать перерыв"],["Daily Life & Routine","Daily Life & Routine","make progress","добиваться прогресса"],["Daily Life & Routine","Daily Life & Routine","get enough sleep","высыпаться"],["Daily Life & Routine","Daily Life & Routine","keep up with","успевать за, не отставать от"],["Daily Life & Routine","Daily Life & Routine","fall behind","отставать"],["Daily Life & Routine","Daily Life & Routine","catch up on","наверстывать упущенное"],["Daily Life & Routine","Daily Life & Routine","work on","работать над"],["Daily Life & Routine","Daily Life & Routine","deal with","справляться с, иметь дело с"],["Daily Life & Routine","Daily Life & Routine","stick to a routine","придерживаться распорядка"],["Daily Life & Routine","Daily Life & Routine","set a goal","поставить цель"],["Daily Life & Routine","Daily Life & Routine","stay motivated","сохранять мотивацию"],["Education & Academic Life","Education & Learning","gain knowledge","получать знания"],["Education & Academic Life","Education & Learning","develop skills","развивать навыки"],["Education & Academic Life","Education & Learning","meet a deadline","уложиться в срок"],["Education & Academic Life","Education & Learning","hand in an assignment","сдать задание"],["Education & Academic Life","Education & Learning","attend classes","посещать занятия"],["Education & Academic Life","Education & Learning","improve performance","улучшать результаты"],["Education & Academic Life","Education & Learning","pursue a degree","получать высшее образование / учиться на степень"],["Education & Academic Life","Education & Learning","overcome challenges","преодолевать трудности"],["Education & Academic Life","Personal Development & Problem Solving","make a mistake","совершить ошибку"],["Education & Academic Life","Personal Development & Problem Solving","learn from mistakes","учиться на ошибках"],["Education & Academic Life","Personal Development & Problem Solving","make progress","добиваться прогресса"],["Education & Academic Life","Personal Development & Problem Solving","face a challenge","столкнуться с трудностью"],["Education & Academic Life","Personal Development & Problem Solving","solve a problem","решить проблему"],["Education & Academic Life","Personal Development & Problem Solving","achieve a goal","достичь цели"],["Education & Academic Life","Personal Development & Problem Solving","teamwork","командная работа"],["Education & Academic Life","Campus & Academic Conversations","scheduling conflict","конфликт в расписании"],["Education & Academic Life","Campus & Academic Conversations","field trip","учебная экскурсия"],["Education & Academic Life","Campus & Academic Conversations","attendance is required","посещение обязательно"],["Education & Academic Life","Campus & Academic Conversations","make up a lab","отработать пропущенную лабораторную"],["Education & Academic Life","Campus & Academic Conversations","submit a report","сдать отчёт"],["Education & Academic Life","Campus & Academic Conversations","meet the requirements","соответствовать требованиям"],["Education & Academic Life","Campus & Academic Conversations","soil erosion","эрозия почвы"],["Education & Academic Life","Learning & Study Techniques","repetition","повторение"],["Education & Academic Life","Learning & Study Techniques","distributed practice","распределённая практика"],["Education & Academic Life","Learning & Study Techniques","effective approach","эффективный подход"],["Education & Academic Life","Learning & Study Techniques","receive feedback","получать обратную связь"],["Education & Academic Life","Learning & Study Techniques","achievable goal","достижимая цель"],["Education & Academic Life","Learning & Study Techniques","require patience","требовать терпения"]];
const plannedVocabularyTopics=['Real-Life English','Campus & Academic Conversations','Academic Vocabulary','Technology & Science','Travel & Culture','Society & Environment','Feelings & Opinions','Linking Words','Phrasal Verbs','Idioms & Expressions'];
let vocabularyFilter='all';
function vocabularyView(){const w=db.vocabulary||[],due=w.filter(x=>x.status!=='learned'&&(!x.nextReview||x.nextReview<=today)).length,learned=w.filter(x=>x.status==='learned').length;return intro('Мой словарь','Личная коллекция выражений из наших занятий и переписки.',btn('+ Добавить слово','addVocabularyWord()','primary'))+'<div class="vocab-summary"><div><b>'+w.length+'</b><small>записей</small></div><div><b>'+new Set(w.map(x=>x.en)).size+'</b><small>уникальных выражений</small></div><div><b>'+due+'</b><small>к повторению</small></div><div><b>'+learned+'</b><small>выучено</small></div></div><section class="panel vocab-panel"><div class="vocab-toolbar"><label>Поиск<input id="vocabSearch" type="search" placeholder="Английское слово или перевод…" oninput="filterVocabulary()"></label><label>Категория<select id="vocabCategory" onchange="filterVocabulary()"><option value="all">Все категории</option>'+[...new Set([...(db.vocabulary||[]).map(w=>w.category),...plannedVocabularyTopics])].map(c=>'<option>'+esc(c)+'</option>').join('')+'</select></label></div><div class="vocab-filters"><button class="selected" onclick="setVocabularyFilter(&quot;all&quot;,this)">Все</button><button onclick="setVocabularyFilter(&quot;due&quot;,this)">Повторить сегодня</button><button onclick="setVocabularyFilter(&quot;learning&quot;,this)">Изучаю</button><button onclick="setVocabularyFilter(&quot;learned&quot;,this)">Выучено</button></div><div id="vocabList"></div></section><section class="panel planned-topics"><h2>Следующие темы</h2><p>Темы, по которым будем пополнять словарь во время занятий.</p><div>'+plannedVocabularyTopics.map(t=>'<span>'+esc(t)+'</span>').join('')+'</div></section>'}
function filterVocabulary(){const root=$('#vocabList');if(!root)return;const term=($('#vocabSearch')?.value||'').trim().toLowerCase(),cat=$('#vocabCategory')?.value||'all';const list=(db.vocabulary||[]).filter(w=>(cat==='all'||w.category===cat)&&(!term||(w.en+' '+w.ru+' '+w.group).toLowerCase().includes(term))&&(vocabularyFilter==='all'||vocabularyFilter==='due'&&(w.status!=='learned'&&(!w.nextReview||w.nextReview<=today))||w.status===vocabularyFilter));root.innerHTML=list.map(w=>'<article class="vocab-word"><div class="vocab-word-head"><div><span class="vocab-group">'+esc(w.group)+'</span><h3>'+esc(w.en)+'</h3><p>'+esc(w.ru)+'</p><p class="vocab-example">'+esc(w.example||vocabularyExample(w.en))+'</p></div><span class="vocab-status '+w.status+'">'+(w.status==='learned'?'Выучено':w.status==='learning'?'Изучаю':'Новое')+'</span></div><div class="vocab-actions"><button onclick="setVocabularyStatus('+w.id+',\'learning\')">Изучаю</button><button onclick="setVocabularyStatus('+w.id+',\'learned\')">Выучено</button>'+(w.status!=='learned'?'<button class="primary" onclick="reviewVocabulary('+w.id+',true)">Знаю</button><button onclick="reviewVocabulary('+w.id+',false)">Сложно</button>':'')+'</div>'+(w.nextReview&&w.status!=='learned'?'<small class="vocab-next">Повторить: '+esc(w.nextReview)+'</small>':'')+'</article>').join('')||'<p class="empty">Ничего не найдено.</p>'}
function setVocabularyFilter(v,b){vocabularyFilter=v;document.querySelectorAll('.vocab-filters button').forEach(x=>x.classList.toggle('selected',x===b));filterVocabulary()}
function setVocabularyStatus(id,s){const w=db.vocabulary?.find(x=>x.id===id);if(!w)return;w.status=s;w.seen++;w.interval=0;w.nextReview=s==='learned'?null:today;persist();render();filterVocabulary()}
function reviewVocabulary(id,known){const w=db.vocabulary?.find(x=>x.id===id);if(!w)return;if(known){w.interval=w.interval===0?1:w.interval===1?3:7;w.status=w.interval===7?'learned':'learning';w.nextReview=shift(today,w.interval)}else{w.interval=0;w.status='learning';w.nextReview=shift(today,1)}w.seen++;persist();render();filterVocabulary()}
function addVocabularyWord(returnToTask=false){const categories=[...new Set([...vocabularySeed.map(w=>w[0]),...plannedVocabularyTopics,...(db.vocabulary||[]).map(w=>w.category)])];modal('<h2>Добавить слово</h2><form id="vocabAddForm" class="stack"><label>Английское слово или выражение<input id="newVocabEn" required maxlength="100" placeholder="например, make a decision"></label><label>Перевод<input id="newVocabRu" required maxlength="180" placeholder="перевод на русский"></label><label>Категория<select id="newVocabCategory">'+categories.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join('')+'<option value="__custom__">＋ Добавить свою категорию</option></select></label><label id="customCategoryField" hidden>Название своей категории<input id="newVocabCustomCategory" maxlength="60" placeholder="Например, Work & Career"></label><label>Подтема<input id="newVocabGroup" maxlength="80" placeholder="Например, Academic Life"></label><label>Пример на английском · необязательно<textarea id="newVocabExample" maxlength="300" placeholder="I need to make a decision soon."></textarea></label><p class="note" id="vocabAddError" role="alert"></p><button class="primary">Сохранить в мой словарь</button></form>');const categorySelect=$('#newVocabCategory');categorySelect.onchange=()=>{$('#customCategoryField').hidden=categorySelect.value!=='__custom__';if(categorySelect.value==='__custom__')$('#newVocabCustomCategory').focus()};$('#vocabAddForm').onsubmit=e=>{e.preventDefault();const en=$('#newVocabEn').value.trim(),ru=$('#newVocabRu').value.trim(),category=categorySelect.value==='__custom__'?$('#newVocabCustomCategory').value.trim():categorySelect.value,group=$('#newVocabGroup').value.trim()||category,example=$('#newVocabExample').value.trim();if(!en||!ru)return;if(!category){$('#vocabAddError').textContent='Введи название своей категории.';$('#newVocabCustomCategory').focus();return}const duplicate=(db.vocabulary||[]).some(w=>norm(w.en)===norm(en));if(duplicate){$('#vocabAddError').textContent='Это выражение уже есть в твоём словаре.';return}db.vocabulary??=[];db.vocabulary.unshift({id:Date.now(),category,group,en,ru,example,status:'new',nextReview:today,interval:0,seen:0});persist();closeModal();if(returnToTask==='lesson')setTimeout(()=>lessonScreen(),0);else if(returnToTask&&db.draft)setTimeout(()=>resume(),0);else{page=9;render()}}}
function closeMobileMenu(){const a=document.querySelector('aside'),t=$('#mobileMenuToggle'),b=$('#navBackdrop');a?.classList.remove('menu-open');t?.setAttribute('aria-expanded','false');if(b)b.hidden=true;document.body.classList.remove('mobile-menu-open')}
function toggleMobileMenu(){const a=document.querySelector('aside'),t=$('#mobileMenuToggle'),b=$('#navBackdrop'),open=!a?.classList.contains('menu-open');a?.classList.toggle('menu-open',open);t?.setAttribute('aria-expanded',String(open));if(b)b.hidden=!open;document.body.classList.toggle('mobile-menu-open',open)}
function initMobileMenu(){const t=$('#mobileMenuToggle'),b=$('#navBackdrop');if(t)t.onclick=toggleMobileMenu;if(b)b.onclick=closeMobileMenu;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu()})}

initMobileMenu();

render();

function vocabularyExample(word){return {"get ready":"I get ready for college before eight o’clock.","focus on":"I try to focus on one task at a time.","spend time":"I spend time reviewing new vocabulary every evening.","take a break":"I take a short break after each study session.","make progress":"I make progress when I practise consistently.","get enough sleep":"I need to get enough sleep before an exam.","keep up with":"It can be difficult to keep up with all my assignments.","fall behind":"I review my notes so I don't fall behind.","catch up on":"I use the weekend to catch up on missed work.","work on":"I am working on my speaking skills.","deal with":"Students learn to deal with unexpected problems.","stick to a routine":"I try to stick to a routine during exam preparation.","set a goal":"I set a goal before every study session.","stay motivated":"Small achievements help me stay motivated.","gain knowledge":"Reading academic texts helps students gain knowledge.","develop skills":"Group projects help us develop communication skills.","meet a deadline":"We need to meet the deadline on Friday.","hand in an assignment":"I handed in my assignment before class.","attend classes":"I attend classes regularly.","improve performance":"Regular feedback can improve students' performance.","pursue a degree":"She plans to pursue a degree in engineering.","overcome challenges":"Teamwork can help students overcome challenges.","make a mistake":"It is normal to make a mistake while learning.","learn from mistakes":"We should learn from our mistakes.","face a challenge":"Every new project gives us a chance to face a challenge.","solve a problem":"We worked together to solve the problem.","achieve a goal":"Consistent practice helps you achieve a goal.","teamwork":"Teamwork is essential in a successful research project.","scheduling conflict":"I have a scheduling conflict on Tuesday afternoon.","field trip":"Our class went on a field trip to a science museum.","attendance is required":"Attendance is required for this laboratory class.","make up a lab":"I need to make up a lab I missed last week.","submit a report":"Students must submit a report by Monday.","meet the requirements":"This course meets the requirements for graduation.","soil erosion":"Heavy rainfall can increase soil erosion.","repetition":"Repetition helps new words stay in your memory.","distributed practice":"Distributed practice is more effective than cramming.","effective approach":"This is an effective approach to learning vocabulary.","receive feedback":"Students receive feedback after each assignment.","achievable goal":"Reading ten pages a day is an achievable goal.","require patience":"Learning a language can require patience."}[word]||''}

/* Multi-question practice sessions and lesson-style answer feedback */
function buildPracticeSet(config){
  const count=10, items=[];
  if(config.skill===4){
    const ranges=config.level==='A2'?[0,11]:config.level==='B1'?[12,29]:[30,units.length-1];
    const available=[];
    for(let unit=ranges[0];unit<=ranges[1];unit++){
      const bank=grammarPractice[unit]||[];
      bank.forEach(([ask,answer,wrong])=>available.push({unit,ask,answer,wrong}));
    }
    const offset=db.h.filter(item=>item.q.skill===4).length%Math.max(1,available.length);
    for(let i=0;i<count;i++){
      const entry=available[(offset+i)%available.length];
      if(!entry)break;
      const item=selectItem(1,units[entry.unit][0],entry.ask,entry.answer,[entry.wrong],grammarNotes[entry.unit]);
      items.push({...item,opts:item.choices.slice(),choices:undefined,skill:4,topic:units[entry.unit][0],level:config.level,levelSource:'marked',min:config.min});
    }
    return items;
  }

  const bankName={0:'Speaking',1:'Listening',2:'Writing',3:'Reading'}[config.skill];
  const bank=(practiceBooks?.[bankName]||[]).slice();
  if(!bank.length)return items;
  const completed=db.h.filter(item=>item.q.skill===config.skill).length;
  const sessionNumber=Math.floor(completed/count);
  let selected=[];

  if(config.skill===1){
    const groups=new Map();
    bank.forEach(item=>{
      if(!groups.has(item.source))groups.set(item.source,[]);
      groups.get(item.source).push(item);
    });
    const sources=[...groups.values()];
    const offset=completed%sources.length;
    for(let i=0;i<Math.min(count,sources.length);i++){
      const group=sources[(offset+i)%sources.length];
      selected.push(group[sessionNumber%group.length]);
    }
  }else if(config.skill===0){
    const groups=new Map();
    bank.forEach(item=>{
      const topic=item.title.replace(/\s+\u00b7\s+\d+$/,'');
      if(!groups.has(topic))groups.set(topic,[]);
      groups.get(topic).push(item);
    });
    const topicGroups=[...groups.values()];
    const offset=(sessionNumber*count)%topicGroups.length;
    for(let i=0;i<Math.min(count,topicGroups.length);i++){
      const group=topicGroups[(offset+i)%topicGroups.length];
      selected.push(group[sessionNumber%group.length]);
    }
  }else{
    const candidates=config.skill===2?bank.filter(item=>item.level===config.level):bank;
    const pool=candidates.length?candidates:bank;
    const offset=completed%pool.length;
    selected=Array.from({length:Math.min(count,pool.length)},(_,i)=>pool[(offset+i)%pool.length]);
  }

  // Topic filter: only the bank's own labels (item title without the numeric suffix) are used.
  const wantedTopic=String(config.topic||'').trim();
  let topicReport=null;
  let onTopicSet=new Set();
  if(wantedTopic){
    const levelScope=config.skill===2?bank.filter(item=>item.level===config.level):bank;
    const scopeBank=levelScope.length?levelScope:bank;
    const matching=scopeBank.filter(item=>practiceTopicLabel(item).toLowerCase()===wantedTopic.toLowerCase());
    const shift=matching.length?completed%matching.length:0;
    const chosen=matching.slice(shift).concat(matching.slice(0,shift)).slice(0,count);
    const keyOf=item=>(config.skill===1||config.skill===3)?item.source:item.ask;
    const used=new Set(chosen.map(keyOf));
    const mixed=[];
    for(const item of selected.concat(scopeBank.slice(completed%scopeBank.length),scopeBank)){
      if(chosen.length+mixed.length>=count)break;
      const key=keyOf(item);
      if(used.has(key))continue;
      used.add(key);
      mixed.push(item);
    }
    onTopicSet=new Set(chosen);
    selected=chosen.concat(mixed);
    topicReport={topic:wantedTopic,requested:count,available:matching.length,onTopic:chosen.length,mixed:mixed.length,levelScope:config.skill===2?config.level:null};
  }

  selected.forEach(item=>{
    const isWriting=config.skill===2;
    const question={
      ...item,
      skill:config.skill,
      topic:config.skill===0?item.title.replace(/\s+\u00b7\s+\d+$/,''):(item.title||bankName),
      level:item.level||config.level,
      levelSource:item.level?'marked':'target',
      topicMatch:wantedTopic?onTopicSet.has(item):undefined,
      min:config.min,
      exact:isWriting?item.title==='Build a Sentence':Boolean(item.exact),
      tip:item.tip||(config.skill===0?'Give a direct answer, explain your reason and add one specific example.':'')
    };
    if(item.other?.length&&item.model)question.opts=makeDistractors(item.model,item.other,item.ask);
    if(config.skill===0){
      question.drill=true;
      question.tip+=' Start with a direct answer, add one detail, then record a second attempt.';
    }
    items.push(question);
  });
  items.practiceTopic=topicReport;
  return items;
}
function practiceTopicLabel(item){return String(item&&item.title||'').replace(/\s+\u00b7\s+\d+$/,'').trim()}
function practiceTopicOptions(skill){
  const name={0:'Speaking',1:'Listening',2:'Writing',3:'Reading'}[skill];
  const counts=new Map();
  ((typeof practiceBooks!=='undefined'&&practiceBooks[name])||[]).forEach(item=>{const label=practiceTopicLabel(item);if(label)counts.set(label,(counts.get(label)||0)+1)});
  return [...counts.entries()].sort((a,b)=>a[0].localeCompare(b[0],'en')).map(([label,count])=>({label,count}));
}
function practiceNoticeText(report){
  if(!report||report.onTopic>=report.requested)return '';
  const scope=report.levelScope?' (уровень '+report.levelScope+')':'';
  if(!report.onTopic)return 'По теме «'+report.topic+'»'+scope+' в банке нет заданий для этого навыка. Подобрана смешанная практика.';
  return 'По теме «'+report.topic+'»'+scope+' в банке нашлось только '+report.onTopic+' из '+report.requested+' заданий. Остальные '+report.mixed+' — смешанная практика.';
}
function practiceLevelText(q){return q&&q.levelSource==='target'?'цель '+q.level:String(q&&q.level||'')}
function start(config){
  if(config.plan){const task=exercise(config);if(config.skill===0){task.drill=true;task.tip+=' Сначала собери короткий ответ, затем добавь деталь и запиши вторую версию.'}begin(task);return}
  const items=buildPracticeSet(config);
  if(!items.length){modal('<h2>Нет упражнений</h2><p>Для выбранного навыка пока не удалось собрать тренировку.</p>');return}
  const totalMinutes=Math.max(1,Number(config.min)||15);
  items.forEach((item,index)=>{item.topic=(item.topic||config.topic)+' · '+(index+1)+'/'+items.length});
  db.draft={multi:true,items,index:0,answers:[],q:items[0],answer:'',listened:false,end:Date.now()+totalMinutes*60000};
  persist();
  const notice=practiceNoticeText(items.practiceTopic);
  if(notice){modal('<h2>Подбор заданий</h2><p>'+esc(notice)+'</p>'+btn('Начать тренировку','resume()','primary'));return}
  resume();
}
function submitAnswer(answer){
  clearInterval(clock);
  if(q.mock&&Date.now()>=db.exam.end)return mockNext();
  const d=db.draft;
  const result={q:{...q},a:answer,day:today,...evaluate(q,answer)};
  db.h.push(result);
  if(q.mock){
    db.exam.answers.push(db.h.length-1);db.exam.step++;db.exam.active=null;
    persist();mockNext();return;
  }
  if(d?.multi){
    d.answers.push(db.h.length-1);
    d.lastAnswer=db.h.length-1;
    d.answer=answer;
    persist();
    review(db.h.length-1);
    return;
  }
  db.draft=null;persist();review(db.h.length-1);
}
function review(index){
  const x=db.h[index],c=x.q,d=db.draft,multi=Boolean(d?.multi);
  const hasErrors=x.correct===false||(x.correct===null&&x.issues.length>0);
  const status=x.correct===true?'✓ Правильно':hasErrors?'✕ Найдены ошибки':'Разбор ответа';
  const state=x.correct===true?'is-correct':hasErrors?'is-wrong':'';
  const answerState=x.correct===true?'correct-answer':hasErrors?'wrong-answer':'';
  const explanation=x.issues.length?x.issues.join(' '):(x.correct===null?'В открытом ответе автоматическая оценка не выставляется. Сверь полноту и естественность формулировки.':c.tip||'Сравни свой ответ с образцом.');
  const progress=multi?'<p class="practice-progress">Упражнение '+(d.index+1)+' из '+d.items.length+' · выполнено '+d.answers.length+'</p>':'';
  const action=multi?btn(d.index+1>=d.items.length?'Завершить тренировку':'Следующее упражнение','advancePractice()','primary'):((c.mock&&db.exam)?btn(db.exam.step===4?'Завершить пробник':'Следующее задание','mockNext()','primary'):btn('Попробовать ещё раз','retry('+index+')','primary'));
  modal('<div class="eyebrow">'+esc(skills[c.skill])+' · '+esc(practiceLevelText(c))+'</div>'+progress+'<h2>Разбор ответа</h2><p>'+esc(c.ask)+'</p><h3 class="feedback-status '+state+'">'+status+'</h3><blockquote class="answer-feedback '+answerState+'">'+esc(x.a)+'</blockquote>'+(x.correct===false&&c.model?'<p class="correct-model"><b>Правильный ответ:</b> '+esc(c.model)+'</p>':'')+(x.correct===null&&hasErrors&&x.edited!==x.a?'<p class="correct-model"><b>Вариант после исправления:</b> '+esc(x.edited)+'</p>':'')+'<p>'+esc(explanation)+'</p>'+(x.correct===true&&c.model?'<p class="correct-model"><b>Образец:</b> '+esc(c.model)+'</p>':'')+(c.audioId?'<audio id="savedAudio" controls></audio>':'')+(x.advice?'<h3>Как улучшить ответ</h3><p>'+esc(x.advice)+'</p>':'')+action);
  if(c.audioId)blobGet(c.audioId).then(blob=>{if(blob&&$('#savedAudio'))$('#savedAudio').src=URL.createObjectURL(blob)});
}
function advancePractice(){
  const d=db.draft;
  if(!d?.multi)return;
  if(d.index+1>=d.items.length){finishPracticeSet();return}
  d.index++;
  d.q=d.items[d.index];
  d.answer='';
  d.listened=false;
  persist();
  resume();
}
function finishPracticeSet(){
  const d=db.draft;
  if(!d?.multi)return;
  const results=d.answers.map(index=>db.h[index]).filter(Boolean);
  const checked=results.filter(item=>item.correct!==null);
  const correct=checked.filter(item=>item.correct===true).length;
  const wrong=checked.filter(item=>item.correct===false).length;
  const open=results.length-checked.length;
  db.draft=null;persist();
  modal('<div class="eyebrow">Practice complete</div><h2>Тренировка завершена</h2><p>Выполнено упражнений: '+results.length+' из '+d.items.length+'.</p><div class="practice-results"><div><b>'+correct+'</b><small>верно</small></div><div><b>'+wrong+'</b><small>ошибок</small></div><div><b>'+open+'</b><small>открытых ответов</small></div></div><p>Все попытки сохранены в истории. Ошибки можно открыть в разделе «Мои ошибки».</p>'+btn('Вернуться к тренажёру','closeModal();page=2;render()','primary'));
}

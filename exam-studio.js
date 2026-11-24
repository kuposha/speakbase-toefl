'use strict';
// The legacy simulation and its history continue to use their original schema.
const examSections = [
  {name:'Reading', minutes:30, size:50, skill:3},
  {name:'Listening', minutes:29, size:47, skill:1},
  {name:'Writing', minutes:23, size:12, skill:2},
  {name:'Speaking', minutes:8, size:11, skill:0}
];
function examItems(form, sectionIndex) {
  if(sectionIndex===3) return (oralPracticeForms[form]||[]).slice(1).map((sentence,index)=>({
    type:index<7?'Listen and Repeat':'Take an Interview',
    source:sentence, ask:index<7?'Repeat what you heard.':'Answer the interviewer.',
    audio:'audio/exam-speaking/'+(form+1)+'-'+(index+1)+'.wav',
    why:index<7?'Сравни запись с исходной фразой. Проверь порядок слов, окончания и смысловые ударения.':'Проверь, есть ли прямой ответ, причина и конкретный пример. Объясни, как пример подтверждает твою мысль.'
  }));
  const banks=[
    typeof readingPracticeForms==='undefined'?[]:readingPracticeForms,
    typeof listeningPracticeForms==='undefined'?[]:listeningPracticeForms,
    typeof writingPracticeForms==='undefined'?[]:writingPracticeForms
  ];
  return banks[sectionIndex][form]||[];
}
function examCounts(form){return examSections.map((section,i)=>examItems(form,i).length)}
function examStudioState(){return db.examStudio||(db.examStudio={active:null,history:[]})}
const oldExamView=extended;
extended=function(){
  const view=oldExamView();
  if(page!==3) return view;
  const state=examStudioState();
  const history=state.history.map((attempt,i)=>btn(esc(attempt.date)+' · '+esc(attempt.title),'examReview('+i+')')).reverse().join('');
  return intro('Экзаменационная практика','24 самостоятельных варианта по типам заданий TOEFL iBT 2026. Неофициальный фиксированный маршрут.')+
    section('Варианты по секциям','<label>Вариант<select id="examVariant">'+oralPracticeForms.map((row,i)=>'<option value="'+i+'">'+(i+1)+' · '+esc(row[0])+'</option>').join('')+'</select></label><div id="examChoices">'+examChoices(0)+'</div>'+
    (state.active?btn('Продолжить сохранённую попытку','examShow()','primary'):'')+
    '<p class="note">В полном варианте запись звучит один раз; в отдельных секциях доступно повторное прослушивание. Аудио синтезировано. Время ориентировочное, маршруты неадаптивные. Проверка по ключам — тренировочная; устные и развёрнутые письменные ответы оцениваются самостоятельно по критериям. Это не баллы ETS.</p>')+
    (history?section('Результаты вариантов',history):'')+view;
};
document.addEventListener('change',e=>{
  if(e.target.id==='examVariant') $('#examChoices').innerHTML=examChoices(Number(e.target.value));
});
function examChoices(form){
  const counts=examCounts(form);
  let html=examSections.map((section,i)=>counts[i]?btn(section.name+' · '+counts[i]+' заданий','examStart('+form+','+i+')'):'').join(' ');
  if(counts.every((count,i)=>count===examSections[i].size)) html+=' '+btn('Все четыре секции · 120 заданий','examStart('+form+',-1)','primary');
  return html;
}
function examStart(form,section){
  if(!Number.isInteger(form)||form<0||form>=oralPracticeForms.length) return;
  const state=examStudioState();
  if(state.active){modal('<h2>Сохранённая попытка</h2><p>Сначала заверши текущую попытку. Все ответы уже сохранены.</p>'+btn('Продолжить','examShow()','primary')+btn('Завершить с текущими ответами','examConfirmFinish()'));return}
  const sections=section===-1?[0,1,2,3]:[section];
  if(sections.some(i=>!examSections[i]||!examItems(form,i).length) || section===-1&&examCounts(form).some((n,i)=>n!==examSections[i].size))return;
  state.active={id:crypto.randomUUID(),form,sections,section:0,pos:0,answers:{},playedAudio:{},draft:'',audioId:null,date:today,title:'Вариант '+(form+1)+' · '+(section===-1?'Все секции':examSections[section].name)};
  examBeginSection();
}
function examBeginSection(){
  const a=examStudioState().active, s=a.sections[a.section];
  a.pos=0; a.draft=''; a.audioId=null; a.deadline=Date.now()+examSections[s].minutes*60000;
  persist();examShow();
}
let examCapture=null, examMicRequest=0, examClock=null, examPlaybackUrl=null, examAdvancing=false;
function examStopPlayback(){
  document.querySelector('#examPromptAudio')?.pause();
  if(examPlaybackUrl){URL.revokeObjectURL(examPlaybackUrl);examPlaybackUrl=null}
  window.speechSynthesis?.cancel();
}
async function examStopRecording(){
  examMicRequest++;
  const capture=examCapture;
  if(!capture)return;
  if(capture.recorder.state!=='inactive')capture.recorder.stop();
  await capture.done;
}
function examAttemptMatches(id,section,pos){const a=examStudioState().active;return a?.id===id&&a.section===section&&a.pos===pos}
async function examMicrophone(){
  if(examCapture){await examStopRecording();return}
  const {id,section,pos}=examStudioState().active;
  const request=++examMicRequest;
  let tracks;
  try{
    const mic=$('#examMic'),player=$('#examOwnAudio'),message=$('#examMessage');
    mic.disabled=true; tracks=await navigator.mediaDevices.getUserMedia({audio:true});
    if(request!==examMicRequest||!examAttemptMatches(id,section,pos)||!mic.isConnected){tracks.getTracks().forEach(t=>t.stop());return}
    const recorder=new MediaRecorder(tracks),chunks=[];
    let finish;const done=new Promise(resolve=>finish=resolve);
    examCapture={recorder,done};recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
    recorder.onstop=async()=>{
      tracks.getTracks().forEach(t=>t.stop());
      try{
        const blob=new Blob(chunks,{type:recorder.mimeType});
        if(blob.size&&examAttemptMatches(id,section,pos)){
          const key=crypto.randomUUID();await blobPut(key,blob);
          if(examAttemptMatches(id,section,pos)){
            examStudioState().active.audioId=key;persist();examStopPlayback();
            examPlaybackUrl=URL.createObjectURL(blob);player.src=examPlaybackUrl;player.hidden=false;message.textContent='Запись сохранена.';
          }
        }
      }catch{message.textContent='Запись сохранить не удалось. Попробуй ещё раз.'}
      finally{examCapture=null;mic.disabled=false;mic.textContent='Записать ещё раз';finish()}
    };
    recorder.start();mic.disabled=false;mic.textContent='Остановить запись';message.textContent='Идёт запись.';
  }catch{tracks?.getTracks().forEach(t=>t.stop());if($('#examMic')){$('#examMic').disabled=false;$('#examMessage').textContent='Микрофон недоступен. Проверь разрешение браузера или введи ответ текстом.'}}
}
function examInput(item,a){
  if(item.tokens) return '<div class="exam-word-bank">'+item.tokens.map((word,i)=>'<button type="button" class="btn" data-exam-token="'+i+'">'+esc(word)+'</button>').join(' ')+' <button type="button" class="btn" id="examClearWords">Очистить</button></div><label>Составь предложение, используя слова выше, или введи его вручную.<textarea id="examAnswer" lang="en">'+esc(a.draft)+'</textarea></label>';
  if(item.options) return '<fieldset><legend>Выбери ответ</legend>'+item.options.map((value,i)=>'<label><input name="examAnswer" type="radio" value="'+i+'" '+(a.draft===value?'checked':'')+'> '+esc(value)+'</label>').join('')+'</fieldset>';
  return '<label>'+ (a.sections[a.section]===3?'Расшифровка по желанию':'Твой ответ')+'<textarea id="examAnswer" lang="en">'+esc(a.draft)+'</textarea></label>';
}
function examShow(){
  const a=examStudioState().active;if(!a)return;
  clearInterval(examClock);examStopPlayback();
  const s=a.sections[a.section],items=examItems(a.form,s),item=items[a.pos];
  if(Date.now()>=a.deadline){examAdvance(true);return}
  const listening=s===1||s===3, full=a.sections.length===4;
  a.playedAudio??={};
  const heard=!!a.playedAudio[item.audio];
  const audio=item.audio?(full?'<audio id="examPromptAudio" preload="none" src="'+esc(item.audio)+'" hidden></audio><button class="btn" id="examPlayOnce" '+(heard?'disabled':'')+'>'+(heard?'Запись уже звучала':'Прослушать один раз')+'</button><p class="note" id="examAudioStatus"></p>':'<audio id="examPromptAudio" controls preload="metadata" src="'+esc(item.audio)+'"></audio>'):listening?btn('Прослушать','examSpeak()'):'';
  const oral=s===3?'<button class="btn" id="examMic" onclick="examMicrophone()">Записать голос</button><audio id="examOwnAudio" controls hidden></audio>':'';
  modal('<div class="row"><span class="eyebrow">'+esc(a.title)+'</span><b id="examClock" class="mono"></b></div><h2>'+esc(item.type)+'</h2><div>'+examSections[s].name+' · '+(a.pos+1)+' / '+items.length+'</div>'+
    (listening?audio:'<blockquote lang="en" style="white-space:pre-line">'+esc(item.source||'')+'</blockquote>')+
    '<h3 lang="en">'+esc(item.ask)+'</h3>'+oral+examInput(item,a)+'<p role="status" id="examMessage"></p>'+
    btn('Сохранить и продолжить','examAdvance(false)','primary')+btn('Завершить попытку досрочно','examConfirmFinish()'));
  const owner=()=>examAttemptMatches(a.id,a.section,a.pos);
  const playOnce=$('#examPlayOnce');
  if(playOnce&&!heard){
    const player=$('#examPromptAudio'),status=$('#examAudioStatus');
    playOnce.onclick=async()=>{if(!owner()||Date.now()>=a.deadline||a.playedAudio[item.audio])return;playOnce.disabled=true;try{await player.play();if(!owner()){player.pause();return}a.playedAudio[item.audio]=true;persist();playOnce.textContent='Запись уже звучала';status.textContent='Воспроизведение';}catch{playOnce.disabled=false;status.textContent='Не удалось загрузить запись. Попробуй ещё раз.'}};
    player.onended=()=>{if(owner())status.textContent='Запись завершена.'};
  }
  if(a.audioId){const player=$('#examOwnAudio');blobGet(a.audioId).then(blob=>{if(blob&&player?.isConnected){examPlaybackUrl=URL.createObjectURL(blob);player.src=examPlaybackUrl;player.hidden=false}}).catch(()=>{})}
  $('#box').oninput=e=>{
    if(!owner()||Date.now()>=a.deadline)return;
    if(e.target.id==='examAnswer') a.draft=e.target.value;
    else if(e.target.name==='examAnswer') a.draft=item.options[Number(e.target.value)];
    else return;
    persist();
  };
  if(item.tokens){
    const input=$('#examAnswer'), tokens=[...document.querySelectorAll('[data-exam-token]')];
    const refresh=()=>{const used=input.value.trim().split(/\s+/).filter(Boolean);tokens.forEach(b=>{const word=item.tokens[Number(b.dataset.examToken)],n=used.indexOf(word);b.disabled=n>=0;if(n>=0)used.splice(n,1)})};
    tokens.forEach(b=>b.addEventListener('click',()=>{if(!owner()||Date.now()>=a.deadline)return;input.value=(input.value.trim()+' '+item.tokens[Number(b.dataset.examToken)]).trim();input.dispatchEvent(new Event('input',{bubbles:true}));refresh()}));
    $('#examClearWords').addEventListener('click',()=>{if(!owner()||Date.now()>=a.deadline)return;input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));refresh()});
    input.addEventListener('input',refresh);refresh();
  }
  function tick(){const clockEl=$('#examClock');if(!clockEl?.isConnected||!$('#modal').open){clearInterval(examClock);return}const t=Math.max(0,Math.ceil((a.deadline-Date.now())/1000));clockEl.textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0');if(t===0){clearInterval(examClock);examAdvance(true)}}
  examClock=setInterval(tick,250);tick();
}
function examSpeak(){const a=examStudioState().active,item=examItems(a.form,a.sections[a.section])[a.pos];if(!window.speechSynthesis){$('#examMessage').textContent='Синтез речи недоступен в этом браузере.';return}const voice=new SpeechSynthesisUtterance(item.source);voice.lang='en-US';speechSynthesis.cancel();speechSynthesis.speak(voice)}
function examKey(section,pos){return section+'-'+pos}
function examSaveDraft(a){
  const item=examItems(a.form,a.sections[a.section])[a.pos];
  if(a.draft.trim()||a.audioId){
    const clean=v=>String(v).normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?,]+$/,'').trim().replace(/\s+/g,' ');
    const keys=item.answer==null?[]:[].concat(item.answer);
    a.answers[examKey(a.sections[a.section],a.pos)]={text:a.draft,audioId:a.audioId,correct:keys.length?keys.some(k=>clean(k)===clean(a.draft)):null};
  }
}
async function examAdvance(expired){
  if(examAdvancing)return;examAdvancing=true;
  try{
    await examStopRecording();const a=examStudioState().active;if(!a)return;
    expired=expired||Date.now()>=a.deadline;
    if(!expired&&!a.draft.trim()&&!a.audioId){if($('#examMessage'))$('#examMessage').textContent='Выбери, введи или запиши ответ.';return}
    examSaveDraft(a);a.draft='';a.audioId=null;
    if(expired||++a.pos>=examItems(a.form,a.sections[a.section]).length){
      if(++a.section>=a.sections.length){examFinish();return}
      examBeginSection();
    }else{persist();examShow()}
  }finally{examAdvancing=false}
}
async function examConfirmFinish(){
  await examStopRecording();clearInterval(examClock);examStopPlayback();
  modal('<h2>Завершить попытку?</h2><p>В истории останутся ответы, которые ты уже дала или записала. Остальные вопросы будут отмечены как пропущенные.</p>'+btn('Вернуться','examShow()')+btn('Завершить и показать разбор','examEndEarly()','primary'));
}
function examEndEarly(){const a=examStudioState().active;if(!a)return;examSaveDraft(a);examFinish()}
function examFinish(){
  clearInterval(examClock);examStopPlayback();const state=examStudioState();
  state.history.push(state.active);state.active=null;persist();render();examReview(state.history.length-1);
}
function examReview(i){
  const a=examStudioState().history[i];if(!a)return;
  const results=Object.values(a.answers),right=results.filter(x=>x.correct===true).length,closed=a.sections.reduce((sum,s)=>sum+examItems(a.form,s).filter(x=>x.answer!=null).length,0),total=a.sections.reduce((sum,s)=>sum+examItems(a.form,s).length,0);
  const answeredClosed=results.filter(x=>x.correct!=null).length;
  modal('<h2>'+esc(a.title)+'</h2><p>Ответов сохранено: '+results.length+' из '+total+'. Пропущено: '+(total-results.length)+'. Задания с ключом: '+right+' из '+closed+' верно; отвечено '+answeredClosed+'. Это тренировочный результат, не балл ETS.</p><p class="note">В Build a Sentence проверка сопоставляет ответ с образцом; возможны другие грамматически допустимые варианты. Для открытых ответов используй критерии самопроверки.</p>'+
  a.sections.map(s=>'<h3>'+examSections[s].name+'</h3>'+examItems(a.form,s).map((item,j)=>{
    const result=a.answers[examKey(s,j)];
    return '<details><summary>'+ (j+1)+'. '+esc(item.type)+' · '+(!result?'Пропуск':result.correct===true?'Верно':result.correct===false?'Исправить':'Самопроверка')+'</summary><blockquote lang="en" style="white-space:pre-line">'+esc(item.source||'')+'</blockquote><p>'+esc(item.ask)+'</p>'+
    (result?.text?'<p>Твой ответ: '+esc(result.text)+'</p>':'')+(result?.audioId?btn('Моя запись','examReviewAudio(this,'+i+','+s+','+j+')'):'')+
    (item.answer!=null?'<p>Ответ: '+esc([].concat(item.answer).join(' / '))+'</p>':'')+'<p>'+esc(String(item.why||'').replace(/([.!?])\s*([.!?])+$/,'$1'))+'</p></details>';
  }).join('')).join(''));
}
async function examReviewAudio(button,i,s,j){const id=examStudioState().history[i]?.answers[examKey(s,j)]?.audioId;if(!id)return;const blob=await blobGet(id);if(!button.isConnected)return;if(!blob){button.textContent='Запись недоступна';return}examStopPlayback();const player=document.createElement('audio');player.controls=true;examPlaybackUrl=URL.createObjectURL(blob);player.src=examPlaybackUrl;button.after(player);button.disabled=true}
$('#modal').addEventListener('close',()=>{clearInterval(examClock);examStopPlayback();examStopRecording();$('#box').oninput=null});

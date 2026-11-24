(function(){
  const URL_KEY='speakbase.ai.endpoint',TOKEN_KEY='speakbase.ai.token';
  const labels={
    task_fulfilment:'Выполнение задания',elaboration:'Развитие ответа',organization_register:'Организация и тон',
    grammar:'Грамматика',vocabulary:'Словарь',relevance:'Релевантность теме',coherence:'Связность',
    task_response:'Ответ на вопрос',fluency_pace:'Беглость и темп',
    pronunciation_intelligibility:'Произношение и разборчивость',grammar_vocabulary:'Грамматика и словарь'
  };
  const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const config=()=>({url:(localStorage.getItem(URL_KEY)||'').replace(/\/+$/,''),token:localStorage.getItem(TOKEN_KEY)||''});
  function settingsMarkup(){
    const current=config();
    return '<div class="ai-settings"><h2>Бесплатная локальная AI-проверка</h2><p>Оценка Writing и Speaking выполняется локальными моделями на компьютере. Платные API не используются.</p><label>Адрес AI-сервиса<input id="aiEndpoint" type="url" placeholder="https://...trycloudflare.com" value="'+escapeHTML(current.url)+'"></label><label>Локальный токен<input id="aiToken" type="password" autocomplete="off" placeholder="Скопируй из ai-engine/.env" value="'+escapeHTML(current.token)+'"></label><p class="note">Для локального preview адрес обычно http://127.0.0.1:8765. На GitHub Pages и телефоне нужен HTTPS-туннель. Не открывай порты 8765/11434 напрямую в интернет.</p><div class="ai-settings-actions"><button class="secondary" type="button" onclick="checkAIConnection()">Проверить соединение</button><button class="primary" type="button" onclick="saveAISettings()">Сохранить</button></div><p id="aiConnectionStatus" class="note" role="status"></p></div>';
  }
  window.configureAI=function(){if(typeof modal==='function')modal(settingsMarkup());else alert('Настройка AI недоступна в этой версии интерфейса.');};
  window.saveAISettings=function(){
    const url=(document.getElementById('aiEndpoint')?.value||'').trim().replace(/\/+$/,'');
    const token=(document.getElementById('aiToken')?.value||'').trim();
    if(!url||!/^https?:\/\//i.test(url)){alert('Укажи корректный адрес AI-сервиса.');return}
    if(!token){alert('Вставь локальный токен из файла ai-engine/.env.');return}
    localStorage.setItem(URL_KEY,url);localStorage.setItem(TOKEN_KEY,token);
    const status=document.getElementById('aiConnectionStatus');if(status)status.textContent='Настройки сохранены на этом устройстве.';
  };
  window.checkAIConnection=async function(){
    const url=(document.getElementById('aiEndpoint')?.value||config().url).trim().replace(/\/+$/,'');
    const status=document.getElementById('aiConnectionStatus');
    if(!url){if(status)status.textContent='Сначала укажи адрес сервиса.';return}
    if(location.protocol==='https:'&&url.startsWith('http://')){if(status)status.textContent='Страница открыта по HTTPS: браузер заблокирует HTTP-сервис. Нужен HTTPS-туннель.';return}
    if(status)status.textContent='Проверяю локальный сервис…';
    try{
      const response=await fetch(url+'/health',{method:'GET'});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const data=await response.json();
      if(status)status.textContent='Сервис отвечает. Модель текста: '+(data.language_model_ready?'готова':'ещё не загружена')+'; токен: '+(data.token_configured?'настроен':'не найден на сервере')+'.';
    }catch(error){if(status)status.textContent='Не удалось подключиться: '+error.message+'. Проверь, что Docker и AI-сервис запущены.'}
  };
  function renderAIResult(result){
    if(!result)return '<p class="note">AI-разбор ещё не выполнялся.</p>';
    if(result.reliable===false)return '<div class="ai-review-warning">Запись не удалось надёжно оценить. '+escapeHTML((result.pronunciation?.reasons||[]).join('; '))+'</div>';
    const score=Number.isFinite(result.practice_estimate)?'<div class="ai-review-score"><b>'+result.practice_estimate+'/5</b><span>AI-оценка для практики</span></div>':'';
    const criteria=Object.entries(result.criteria||{}).map(([key,value])=>'<div class="ai-review-criterion"><span>'+escapeHTML(labels[key]||key)+'</span><b>'+escapeHTML(value)+'/5</b></div>').join('');
    const strengths=(result.strengths||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const issues=(result.issues||[]).map(issue=>'<li><b>'+escapeHTML(issue.quote||'Фрагмент ответа')+'</b><span>'+escapeHTML(issue.issue||'')+'</span><small>'+escapeHTML(issue.suggestion||'')+'</small></li>').join('');
    const next=(result.next_steps||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const pron=result.pronunciation?.scores||{};
    const metrics=Object.entries({accuracy:'Точность произношения',fluency:'Беглость',prosodic:'Ритм и интонация'}).filter(([key])=>Number.isFinite(pron[key])).map(([key,label])=>'<div class="ai-review-criterion"><span>'+label+'</span><b>'+Math.round(pron[key])+'/100</b></div>').join('');
    const exact=Number.isFinite(result.exactness_percent)?'<div class="ai-review-criterion"><span>Точность повторения слов</span><b>'+result.exactness_percent+'%</b></div>':'';
    const transcript=result.transcript?'<details class="ai-transcript"><summary>Распознанная речь</summary><p>'+escapeHTML(result.transcript)+'</p></details>':'';
    return '<div class="ai-review-result">'+score+(criteria?'<div class="ai-review-grid">'+criteria+'</div>':'')+(metrics||exact?'<div class="ai-review-grid">'+metrics+exact+'</div>':'')+(strengths?'<h5>Что получилось</h5><ul>'+strengths+'</ul>':'')+(issues?'<h5>Что исправить</h5><ul class="ai-review-issues">'+issues+'</ul>':'')+(next?'<h5>Следующие шаги</h5><ul>'+next+'</ul>':'')+transcript+'<p class="note">'+escapeHTML(result.disclaimer||'Это учебная AI-оценка, не официальный балл ETS.')+'</p></div>';
  }
  function getRecord(source,record,key){
    if(source==='exam'){
      const attempt=db.examStudio?.history?.[Number(record)];
      if(!attempt)return {};
      const parts=String(key||'').split('-').map(Number),section=parts[0],position=parts[1];
      return {attempt,target:attempt.answers?.[key],item:examItems(attempt.form,section)[position]||{}};
    }
    const target=db.h?.[Number(record)];
    return {target,item:target?.q||{}};
  }
  function responseText(target){return String(target?.text??target?.a??target?.answer??'').trim()}
  function isPlaceholder(value){return /^(recorded|recording saved|запись сохранена|сохранена голосовая запись|аудиозапись сохранена)$/i.test(String(value||'').trim())}
  async function requestJSON(url,token,payload){
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-Speakbase-Token':token},body:JSON.stringify(payload)});
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.detail||data.error||('HTTP '+response.status));
    return data;
  }
  window.runAutomaticReview=async function(button){
    const form=button.closest('.self-review-form');
    if(!form)return;
    const source=form.dataset.source,record=form.dataset.record,key=form.dataset.key;
    const {target,item}=getRecord(source,record,key);
    if(!target){alert('Не удалось найти сохранённый ответ.');return}
    const settings=config();
    if(!settings.url||!settings.token){configureAI();return}
    if(location.protocol==='https:'&&settings.url.startsWith('http://')){alert('GitHub Pages блокирует HTTP-сервис. Укажи HTTPS-туннель в настройках AI.');return}
    const output=form.querySelector('.ai-review-output');
    button.disabled=true;button.textContent='AI анализирует…';
    if(output)output.innerHTML='<p class="note">Проверяю ответ. На локальном компьютере это может занять некоторое время.</p>';
    try{
      const label=[item.type,item.title,item.topic,item.ask,item.source].filter(Boolean).join(' ').toLowerCase();
      const prompt=[item.source,item.ask].filter(Boolean).join('\n\n');
      let result;
      if(item.skill===2||/write an email|academic discussion|writing/.test(label)){
        const taskType=/email/.test(label)?'write_email':'academic_discussion';
        const response=responseText(target);
        if(!response||isPlaceholder(response))throw new Error('В сохранённом ответе нет текста для проверки.');
        result=await requestJSON(settings.url+'/api/writing',settings.token,{task_type:taskType,prompt,response});
      }else{
        const taskType=item.repeat===true||/listen and repeat|repeat the sentence/.test(label)?'listen_repeat':'interview';
        const audioId=target.audioId||target.q?.audioId||item.audioId||null;
        let audio=null;
        if(audioId&&typeof blobGet==='function')audio=await blobGet(audioId);
        if(audio instanceof Blob){
          const data=new FormData();data.append('file',audio,'speakbase-recording.webm');data.append('task_type',taskType);data.append('prompt',prompt);data.append('expected_text',taskType==='listen_repeat'?String(item.source||''):'');
          const response=await fetch(settings.url+'/api/speaking',{method:'POST',headers:{'X-Speakbase-Token':settings.token},body:data});
          result=await response.json().catch(()=>({}));
          if(!response.ok)throw new Error(result.detail||'Не удалось оценить запись.');
        }else{
          const transcript=responseText(target);
          if(!transcript||isPlaceholder(transcript))throw new Error('Аудиозапись не найдена на этом устройстве. Запиши ответ здесь ещё раз.');
          result=await requestJSON(settings.url+'/api/speaking-text',settings.token,{task_type:taskType,prompt,transcript,expected_text:taskType==='listen_repeat'?String(item.source||''):''});
        }
      }
      result.reviewed_at=new Date().toISOString();
      target.aiReview=result;
      if(typeof persist==='function')persist();
      if(typeof updateReviewSchedule==='function')updateReviewSchedule(item,target);
      if(output)output.innerHTML=renderAIResult(result);
    }catch(error){
      if(output)output.innerHTML='<div class="ai-review-warning">'+escapeHTML(error.message||'Не удалось выполнить AI-разбор.')+'</div>';
    }finally{
      button.disabled=false;button.textContent='Повторить AI-разбор';
    }
  };
  const originalSelfReviewMarkup=window.selfReviewMarkup;
  if(typeof originalSelfReviewMarkup==='function'){
    window.selfReviewMarkup=function(source,record,key,item,result){
      const html=originalSelfReviewMarkup(source,record,key,item,result);
      if(!html)return html;
      const saved=result?.aiReview;
      const block='<div class="ai-review-controls"><button class="secondary" type="button" onclick="runAutomaticReview(this)">Получить AI-разбор</button><div class="ai-review-output">'+renderAIResult(saved)+'</div></div>';
      return html.replace('</form>',block+'</form>');
    };
  }
})();

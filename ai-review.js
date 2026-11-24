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
    const token=(document.getElementById('aiToken')?.value||config().token).trim();
    if(status)status.textContent='???????? ????????? ???????';
    try{
      const response=await fetch(url+'/health',{method:'GET',headers:{'X-Speakbase-Token':token}});
      if(!response.ok)throw new Error('HTTP '+response.status);
      const data=await response.json();
      if(status)status.textContent='Сервис отвечает. Модель текста: '+(data.language_model_ready?'готова':'ещё не загружена')+'; токен: '+(data.token_configured?'настроен':'не найден на сервере')+'.';
    }catch(error){if(status)status.textContent='Не удалось подключиться: '+error.message+'. Проверь, что Docker и AI-сервис запущены.'}
  };
  function renderAIResult(result){
    if(!result)return '<p class="note">AI-\u0440\u0430\u0437\u0431\u043e\u0440 \u0435\u0449\u0451 \u043d\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u043b\u0441\u044f.</p>';
    const pron=result.pronunciation||{},pronScores=pron.scores||{},quality=pron.audio_quality||{};
    const wordErrors=(pron.word_errors||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const unclearWords=(pron.unclear_words||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const reasons=(pron.reasons||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const transcript=result.transcript||pron.transcript;
    const transcriptBlock=transcript?'<details class="ai-transcript"><summary>\u0420\u0430\u0441\u043f\u043e\u0437\u043d\u0430\u043d\u043d\u0430\u044f \u0440\u0435\u0447\u044c</summary><p>'+escapeHTML(transcript)+'</p></details>':'';
    const qualityMetrics=Object.entries({duration:['\u0414\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c','s'],snr_db:['\u0421\u0438\u0433\u043d\u0430\u043b / \u0448\u0443\u043c','dB'],level_db:['\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0437\u0430\u043f\u0438\u0441\u0438','dB']}).filter(([key])=>Number.isFinite(quality[key])).map(([key,meta])=>'<div class="ai-review-criterion"><span>'+meta[0]+'</span><b>'+Number(quality[key]).toFixed(1)+' '+meta[1]+'</b></div>').join('');
    const qualityIssues=(quality.issues||[]).map(value=>escapeHTML(value)).join('; ');
    const qualityBlock=qualityMetrics||qualityIssues?'<div class="ai-review-grid">'+qualityMetrics+'</div>'+(qualityIssues?'<p class="note">\u041a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0437\u0430\u043f\u0438\u0441\u0438: '+qualityIssues+'</p>':''):'';
    const wordBlock=wordErrors?'<h5>\u0421\u043b\u043e\u0432\u0430 \u0434\u043b\u044f \u043f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u044f</h5><ul class="ai-review-issues">'+wordErrors+'</ul>':'';
    const unclearBlock=unclearWords?'<h5>\u041d\u0435\u0447\u0451\u0442\u043a\u043e \u0440\u0430\u0441\u043f\u043e\u0437\u043d\u0430\u043d\u043d\u044b\u0435 \u0441\u043b\u043e\u0432\u0430</h5><ul class="ai-review-issues">'+unclearWords+'</ul>':'';
    if(result.reliable===false){
      return '<div class="ai-review-warning"><b>\u0417\u0430\u043f\u0438\u0441\u044c \u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043d\u0430\u0434\u0451\u0436\u043d\u043e \u043e\u0446\u0435\u043d\u0438\u0442\u044c. \u0411\u0430\u043b\u043b \u0441\u043a\u0440\u044b\u0442.</b>'+(reasons?'<ul>'+reasons+'</ul>':'')+'</div>'+wordBlock+unclearBlock+transcriptBlock+qualityBlock+'<p class="note">\u0417\u0430\u043f\u0438\u0448\u0438 \u043e\u0442\u0432\u0435\u0442 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0432 \u0431\u043e\u043b\u0435\u0435 \u0442\u0438\u0445\u043e\u043c \u043c\u0435\u0441\u0442\u0435 \u0438 \u0433\u043e\u0432\u043e\u0440\u0438 \u0432 \u043e\u0431\u044b\u0447\u043d\u043e\u043c \u0442\u0435\u043c\u043f\u0435. '+escapeHTML(result.disclaimer||'\u041d\u0435\u043d\u0430\u0434\u0451\u0436\u043d\u0430\u044f \u0437\u0430\u043f\u0438\u0441\u044c \u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u0442 \u043e\u0446\u0435\u043d\u043a\u0443.')+'</p>';
    }
    const scoreLabel=/interview/.test(result.task_type||'')?'\u041e\u0446\u0435\u043d\u043a\u0430 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u044f \u0438 \u044f\u0437\u044b\u043a\u0430':'AI-\u043e\u0446\u0435\u043d\u043a\u0430 \u0434\u043b\u044f \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0438';
    const score=Number.isFinite(result.practice_estimate)?'<div class="ai-review-score"><b>'+result.practice_estimate+'/5</b><span>'+scoreLabel+'</span></div>':'';
    const criteria=Object.entries(result.criteria||{}).map(([key,value])=>'<div class="ai-review-criterion"><span>'+escapeHTML(labels[key]||key)+'</span><b>'+escapeHTML(value)+'/5</b></div>').join('');
    const strengths=(result.strengths||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const issues=(result.issues||[]).map(issue=>'<li><b>'+escapeHTML(issue.quote||'\u0424\u0440\u0430\u0433\u043c\u0435\u043d\u0442 \u043e\u0442\u0432\u0435\u0442\u0430')+'</b><span>'+escapeHTML(issue.issue||'')+'</span><small>'+escapeHTML(issue.suggestion||'')+'</small></li>').join('');
    const next=(result.next_steps||[]).map(value=>'<li>'+escapeHTML(value)+'</li>').join('');
    const pronunciationMetrics=Object.entries({accuracy:'\u0422\u043e\u0447\u043d\u043e\u0441\u0442\u044c \u0437\u0432\u0443\u043a\u043e\u0432',fluency:'\u0411\u0435\u0433\u043b\u043e\u0441\u0442\u044c',prosodic:'\u0423\u0434\u0430\u0440\u0435\u043d\u0438\u0435, \u0440\u0438\u0442\u043c \u0438 \u0438\u043d\u0442\u043e\u043d\u0430\u0446\u0438\u044f'}).filter(([key])=>Number.isFinite(pronScores[key])).map(([key,label])=>'<div class="ai-review-criterion"><span>'+label+'</span><b>'+Math.round(pronScores[key])+'/100</b></div>').join('');
    const pronunciationBlock=pronunciationMetrics?'<div class="ai-review-grid">'+pronunciationMetrics+'</div>':'';
    const deliveryNote=result.delivery_note||(result.pronunciation_assessed===false?'\u041f\u0440\u043e\u0438\u0437\u043d\u043e\u0448\u0435\u043d\u0438\u0435, \u0440\u0438\u0442\u043c \u0438 \u0442\u0435\u043c\u043f \u043d\u0435 \u043e\u0446\u0435\u043d\u0438\u0432\u0430\u043b\u0438\u0441\u044c \u0431\u0435\u0437 \u0430\u0443\u0434\u0438\u043e\u0437\u0430\u043f\u0438\u0441\u0438.':'');
    const pronunciationNote=result.pronunciation?'<p class="note">\u0410\u043a\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u0438 OpenPronounce ? \u043e\u0440\u0438\u0435\u043d\u0442\u0438\u0440, \u0430 \u043d\u0435 \u043e\u0446\u0435\u043d\u043a\u0430 ETS. \u041c\u043e\u0434\u0435\u043b\u044c \u043e\u0431\u0443\u0447\u0430\u043b\u0430\u0441\u044c \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u043d\u0430 \u0447\u0442\u0435\u043d\u0438\u0438 \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u0445 \u0444\u0440\u0430\u0437; \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u0438 \u0441\u043f\u043e\u043d\u0442\u0430\u043d\u043d\u043e\u0433\u043e \u0438\u043d\u0442\u0435\u0440\u0432\u044c\u044e \u043e\u0441\u043e\u0431\u0435\u043d\u043d\u043e \u043f\u0440\u0438\u0431\u043b\u0438\u0437\u0438\u0442\u0435\u043b\u044c\u043d\u044b.</p>':'';
    return '<div class="ai-review-result">'+score+(criteria?'<div class="ai-review-grid">'+criteria+'</div>':'')+pronunciationBlock+qualityBlock+(strengths?'<h5>\u0427\u0442\u043e \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u043e\u0441\u044c</h5><ul>'+strengths+'</ul>':'')+(issues?'<h5>\u0427\u0442\u043e \u0438\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c</h5><ul class="ai-review-issues">'+issues+'</ul>':'')+wordBlock+unclearBlock+transcriptBlock+(next?'<h5>\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0448\u0430\u0433\u0438</h5><ul>'+next+'</ul>':'')+(deliveryNote?'<p class="note">'+escapeHTML(deliveryNote)+'</p>':'')+pronunciationNote+'<p class="note">'+escapeHTML(result.disclaimer||'\u042d\u0442\u043e \u0443\u0447\u0435\u0431\u043d\u0430\u044f AI-\u043e\u0446\u0435\u043d\u043a\u0430, \u043d\u0435 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u0431\u0430\u043b\u043b ETS.')+'</p></div>';
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
          const data=new FormData();const extension=audio.type.includes('ogg')?'ogg':audio.type.includes('mp4')?'m4a':'webm';data.append('file',audio,'speakbase-recording.'+extension);data.append('task_type',taskType);data.append('prompt',prompt);data.append('expected_text',taskType==='listen_repeat'?String(item.source||''):'');
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

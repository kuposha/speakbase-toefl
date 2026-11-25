/* Full A1-C1 curriculum catalogue and route for all permanent lesson IDs. */
(function(){
  const previousGrammarLibraryView = window.grammarLibraryView;
  const bulkLessons = Array.isArray(window.grammarBulkLessons) ? window.grammarBulkLessons : [];
  const byId = new Map(bulkLessons.map(lesson => [lesson.id, lesson]));
  const curriculumIds = window.grammarBulkCurriculumIds || [];

  bulkLessons.forEach(lesson => window.GrammarLessonEngine.register(lesson));

  function esc(value){
    return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function a101Card(){
    const state=courseState().grammarLessons?.['A1-01'];
    const answered=Object.keys(state?.answers||{}).length;
    const label=state?.mode==='results'?'Повторить A1-01':answered?'Продолжить A1-01 ('+answered+'/27)':'Начать A1-01';
    return '<section class="panel a105-launch"><div><div class="eyebrow">A1 · Блок 01</div><h3>Sentence building and basic word order</h3><p>Подлежащее, глагол, модели простого предложения и базовый порядок слов.</p></div><button class="primary" onclick="openGrammarA101()">'+label+'</button></section>';
  }
  function a105Card(){
    return '<section class="panel a105-launch"><div><div class="eyebrow">A1 · Эталонный пилот</div><h3>A1-05 · Present Simple — affirmative</h3><p>Эталонный урок с полной теорией, практикой и самостоятельной проверкой.</p></div><button class="primary" onclick="openGrammarA105()">Открыть пилотный урок</button></section>';
  }
  function cardFor(id){
    if(id==='A1-01')return a101Card();
    if(id==='A1-02')return window.GrammarLessonEngine.card('A1-02');
    if(id==='A1-05')return a105Card();
    return window.GrammarLessonEngine.card(id);
  }
  function catalog(){
    const levels=['A1','A2','B1','B2','C1'];
    const blocks=levels.map((level,index)=>{
      const ids=curriculumIds.filter(id=>id.startsWith(level+'-'));
      const title=level+' · '+ids.length+' блоков';
      return '<details class="grammar-curriculum-level" '+(index===0?'open':'')+'><summary>'+title+'</summary><div class="grammar-curriculum-grid">'+ids.map(cardFor).join('')+'</div></details>';
    }).join('');
    const legacy=window.legacyGrammarLibraryView?window.legacyGrammarLibraryView():'<p>Старый каталог доступен после отдельной проверки маршрута.</p>';
    return '<section class="panel a105-hero"><div class="eyebrow">Полная программа A1–C1</div><h2>94 постоянных учебных блока</h2><p>Последовательный курс от базовой структуры предложения до академической грамматики. Каждый новый блок имеет собственный ID и отдельный прогресс. Новые материалы пока находятся в статусе draft и будут дополнительно сверяться по страницам источников.</p><div class="a105-meta"><span>5 уровней</span><span>94 блока</span><span>Прогресс по постоянным ID</span></div></section>'+blocks+'<details class="grammar-legacy-archive"><summary>Архивный каталог · 46 прежних тем</summary><p class="note">Старые отметки и результаты сохранены отдельно. Они не считаются автоматическим освоением новых блоков.</p>'+legacy+'</details>';
  }
  window.grammarBulkCurriculumView = catalog;
  window.grammarLibraryView = function(){
    const cs=courseState();
    const active=cs.activeGrammarLessonId;
    if(active && window.GrammarLessonEngine.has(active))return window.GrammarLessonEngine.view(active);
    if(active || (cs.grammarA105?.mode && cs.grammarA105.mode!=='catalog'))return previousGrammarLibraryView();
    return catalog();
  };
})();

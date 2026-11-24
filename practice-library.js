const practiceBooks = {
  Vocabulary: vocabularyBank.map(v => ({
    title: v.word, category: v.category, level: v.level, skill: 4, vocabulary: true,
    ask: 'Which English word or expression means «' + v.translation + '»?',
    model: v.word, tip: v.word + ' — ' + v.translation + '. Составь с этим выражением собственный пример.', exact: true
  })),
  Reading: readingTasks.map(([title, source, ask, model, ...other]) => ({
    title, source, ask, model, skill: 3, exact: true, other,
    tip: 'Найди в тексте фразу, которая подтверждает ответ, и сравни её с образцом.'
  })),
  Listening: listeningBank.flatMap(([title, source, questions]) => questions.map(([ask, model, ...other], i) => ({
    title: title + ' · ' + (i+1), source, ask, model, other, skill: 1, exact: true,
    tip: 'Прослушай ещё раз и отметь слова, на которые опирается ответ.'
  }))),
  Speaking: speakingBank.flatMap(([topic, ...questions]) => questions.map((ask,i) => ({
    title: topic + ' · ' + (i+1), ask, skill: 0,
    tip: 'Ответь прямо. Приведи причину, затем расскажи о конкретном случае. Запиши вторую попытку без текста.'
  }))),
  Writing: writingBank.map(([title, level, ask, model]) => ({
    title, level, ask, model, exact: !!model, skill: 2,
    tip: model ? 'Проверь положение подлежащего, сказуемого и зависимой части.' : 'Проверь, раскрыт ли каждый пункт задания. Добавь конкретную деталь и перечитай ответ от лица адресата.'
  }))
};
function practiceLibrary(){
  modal('<h2>Каталог упражнений</h2><label>Раздел<select id="book">'+Object.keys(practiceBooks).map(k=>'<option>'+k+'</option>').join('')+'</select></label><label>Поиск<input id="bookSearch" type="search" placeholder="Тема, слово или задание"></label><div id="bookRows" class="stack"></div>');
  $('#book').onchange=()=>showPracticeRows(0);
  $('#bookSearch').oninput=()=>showPracticeRows(0);
  showPracticeRows(0);
}
function showPracticeRows(offset){
  const rows=practiceBooks[$('#book').value];
  const term=$('#bookSearch').value.trim().toLocaleLowerCase();
  const filtered=rows.map((x,i)=>({x,i})).filter(({x})=>[x.title,x.category,x.level,x.ask].some(field=>field?.toLocaleLowerCase().includes(term)));
  const list=filtered.slice(offset,offset+12).map(({x,i})=>btn(esc(x.title)+'<small>'+esc(x.category||x.ask)+'</small>','openPracticeRow('+i+')','task')).join('');
  $('#bookRows').innerHTML='<small>Найдено: '+filtered.length+'</small>'+list+(offset>0?btn('Назад','showPracticeRows('+(offset-12)+')'):'')+(offset+12<filtered.length?btn('Дальше','showPracticeRows('+(offset+12)+')'):'');
}
function openPracticeRow(index){
  const kind=$('#book').value, x=practiceBooks[kind][index];
  if(db.draft && !confirm('Заменить незавершённый черновик тренажёра?')) return;
  const q={...x,topic:x.title,model:x.model||'',min:x.skill===2?10:5,level:x.level||'Практика'};
  if(x.other?.length)q.opts=[x.model,...x.other].sort((a,b)=>a.localeCompare(b));
  if(x.vocabulary){
    const distractors=vocabularyBank.filter(v=>v.word!==x.model && v.translation!==vocabularyBank[index].translation && v.category===x.category);
    if(distractors.length>=2)q.opts=[x.model,distractors[index%distractors.length].word,distractors[(index+1)%distractors.length].word].sort((a,b)=>a.localeCompare(b));
  }
  begin(q);
}

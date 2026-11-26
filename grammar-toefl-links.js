/* Editorial map: grammar topic -> TOEFL iBT 2026 task formats where the topic is practised.
   A Speakbase teaching map, not an ETS classification. Shared by the app and the Node tests. */
(function(root){
  'use strict';
  var SKILLS={Reading:3,Listening:1,Writing:2,Speaking:0};
  var ORDER=['Reading','Listening','Writing','Speaking'];
  var RANK={A1:0,A2:1,B1:2,B2:3,C1:4};
  var TYPES={
    'Complete the Words':['Reading','форма слова, окончание, артикль или предлог внутри связного текста'],
    'Read in Daily Life':['Reading','короткие бытовые тексты: объявления, письма, расписания'],
    'Read an Academic Passage':['Reading','академический текст: придаточные, ссылки и логические связи'],
    'Choose a Response':['Listening','короткая реплика или вопрос и выбор уместного ответа'],
    'Conversation':['Listening','диалог студентов: времена, модальность, предпочтения'],
    'Announcement':['Listening','объявление: время, место, обязательства и изменения'],
    'Academic Talk':['Listening','лекция: причины, уступка, ссылки и связность'],
    'Build a Sentence':['Writing','порядок слов и форма сказуемого в одном предложении'],
    'Write an Email':['Writing','просьба, объяснение и вежливая форма'],
    'Write for an Academic Discussion':['Writing','аргумент, пример и выражение мнения'],
    'Listen and Repeat':['Speaking','точное воспроизведение формы и порядка слов'],
    'Take an Interview':['Speaking','развёрнутый устный ответ с нужной формой']
  };
  var WORD=/plural|a\/an|possessive|demonstrative|countable|quantif|determiner|article|adjective|adverb|comparative|superlative|preposition|phrasal|gerund|infinitive|verb patterns|complementation|noun phrase|compound|agreement|modifier|comparison|have \/ have got|there is|conjunction|dependent/i;
  var DAILY=/imperative|let's|\bcan\b|modal|future|present|past simple|have got|there is|question|time clauses|conditional|used to|frequency|time\/place|going to|\bbe\b/i;
  var ACAD=/passive|relative|participle|non-finite|reported|reporting|conditional|concession|contrast|linking|discourse|nominalis|cleft|inversion|fronting|ellipsis|hedging|stance|noun phrase|reference|cohesion|synthesis|editing|punctuation|perfect|modality|correlative|citation|causative|complement|adverbial|clause/i;
  var CHOOSE=/question|\btag|indirect|request|imperative|let's|\bcan\b|modal|\bbe\b|short answers|commands/i;
  var CONV=/past|perfect|continuous|future|present|used to|phrasal|conditional|comparative|superlative|modal|reported|verb patterns|gerund|infinitive|wish|have \/ have got|there is|possessive/i;
  var ANNOUNCE=/future|time|preposition|imperative|quantif|determiner|passive|causative|there is|frequency|conjunction|clauses/i;
  var TALK=/passive|relative|participle|non-finite|concession|contrast|discourse|nominalis|hedging|cleft|inversion|fronting|reporting|cohesion|ellipsis|correlative|conditional|synthesis/i;
  var EMAIL=/modal|request|future|past|present perfect|conditional|reported|question|indirect|imperative|phrasal|tag|causative|wish|used to|hedging/i;
  var DISC=/conditional|comparison|comparative|superlative|concession|contrast|linking|discourse|passive|nominalis|hedging|stance|reporting|reported|relative|cleft|inversion|fronting|punctuation|synthesis|quantif|modal|adverbial|participle/i;
  var INTERVIEW=/present|\bbe\b|have|\bcan\b|frequency|past|continuous|possessive|there is/i;
  // [type, pattern, minLevel, maxLevel]
  var RULES=[
    ['Complete the Words',WORD,0,4],['Read in Daily Life',DAILY,0,2],['Read an Academic Passage',ACAD,2,4],
    ['Choose a Response',CHOOSE,0,2],['Conversation',CONV,1,4],['Announcement',ANNOUNCE,0,4],['Academic Talk',TALK,2,4],
    ['Write an Email',EMAIL,1,3],['Write for an Academic Discussion',DISC,2,4]
  ];
  var DEFAULTS={Reading:['Read in Daily Life','Read in Daily Life','Read in Daily Life','Read an Academic Passage','Read an Academic Passage'],
    Listening:['Choose a Response','Choose a Response','Conversation','Academic Talk','Academic Talk']};
  function levelOf(id){var m=/^([ABC][12])-/.exec(String(id||''));return m?RANK[m[1]]:0}
  function links(id,title){
    var level=levelOf(id),text=String(title||'').toLowerCase(),found={};
    RULES.forEach(function(r){if(level>=r[2]&&level<=r[3]&&r[1].test(text))found[r[0]]=true});
    found['Build a Sentence']=true;found['Listen and Repeat']=true;
    if(level>=1||INTERVIEW.test(text))found['Take an Interview']=true;
    ['Reading','Listening'].forEach(function(skill){
      var has=Object.keys(found).some(function(t){return TYPES[t][0]===skill});
      if(!has)found[DEFAULTS[skill][level]]=true;
    });
    var out=[];
    ORDER.forEach(function(skill){Object.keys(TYPES).forEach(function(t){if(TYPES[t][0]===skill&&found[t])out.push({skill:skill,type:t,why:TYPES[t][1]})})});
    return out;
  }
  function linkStrings(id,title){return links(id,title).map(function(x){return x.skill+': '+x.type})}
  var esc=function(v){return String(v).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  function lookup(id){
    var bulk=(root.grammarBulkLessons||[]).filter(function(l){return l.id===id})[0];if(bulk)return bulk;
    var eng=root.GrammarLessonEngine&&root.GrammarLessonEngine.config&&root.GrammarLessonEngine.config(id);if(eng)return eng;
    return root.grammarPilotLessons&&root.grammarPilotLessons[id]||null;
  }
  function topicTask(id,skill){
    const lesson=lookup(id),ctx=root.grammarToeflContexts?.[id],exchange=root.grammarExchanges?.[id];
    if(!lesson||!ctx||!exchange||![0,1,2,3].includes(skill))return null;
    const level=id.slice(0,2),base={skill,level,levelSource:'target',min:5,grammarId:id,topicTaskId:id+':'+skill,topic:id+' · '+lesson.title+' · '+ORDER.find(s=>SKILLS[s]===skill)};
    if(skill===3||skill===1){
      const [source,ask,model,b,c,why]=skill===3?ctx.reading:ctx.listening;
      const options=[model,b,c],rotation=(Number(id.slice(3))+skill)%3;
      return {...base,source,ask,model,opts:options.slice(rotation).concat(options.slice(0,rotation)),exact:true,taskFormat:skill===3?'Reading context mini-practice':'Listening context mini-practice',tip:why+' Текст для сверки: '+source};
    }
    const [cue,segmented]=exchange,chunks=segmented.split('/'),model=chunks.join(' ');
    if(skill===2)return {...base,taskFormat:'Build a Sentence (guided practice)',ask:cue+' Собери ответ, начав с «'+chunks[0]+'». Фрагменты: '+chunks.slice(1).reverse().concat(chunks[0]).join(' / '),model,exact:true,tip:'Сверь порядок фрагментов и целевую конструкцию: '+lesson.title+'.'};
    return {...base,taskFormat:'Listen and Repeat (guided practice)',ask:'Repeat the sentence you hear, keeping the words and grammar.',source:model,model,repeat:true,tip:'Прослушай фразу, повтори её вслух и введи расшифровку. Проверяется совпадение текста, не произношение.'};
  }
  function startTopic(id,skill){
    const task=topicTask(id,skill);
    if(!task)return;
    if(db.draft){
      modal('<h2>Есть незавершённая тренировка</h2><p>Сначала закончи текущую тренировку, чтобы не потерять ответы и черновик.</p>'+btn('Продолжить сохранённую тренировку','resume()','primary')+btn('Закрыть','closeModal()','link'));
      return;
    }
    if(db.exam?.active||db.examStudio?.active){
      modal('<h2>Сначала заверши пробник</h2><p>Тематическая практика не изменяет активный экзамен.</p>'+btn('Закрыть','closeModal()','primary'));return;
    }
    begin(task);
  }
  function panelHtml(id,withButtons){
    var lesson=lookup(id),list=links(id,lesson&&lesson.title);
    var rows=ORDER.map(function(skill){
      var items=list.filter(function(x){return x.skill===skill});
      return '<div class="row"><span><b>'+skill+'</b> — '+items.map(function(x){return esc(x.type)+' ('+esc(x.why)+')'}).join('; ')+'</span>'+
        (withButtons&&/^[ABC][12]-\d{2}$/.test(id)?'<button type="button" class="btn" onclick="GrammarToefl.startTopic(\''+id+'\','+SKILLS[skill]+')">Практика темы</button>':'')+'</div>';
    }).join('');
    return '<section class="panel toefl-links" data-toefl-links="'+esc(id)+'"><h3>Где эта тема встречается в TOEFL</h3><p class="note">Учебная привязка Speakbase к TOEFL iBT 2026. Кнопки открывают конкретные задания этой темы: короткий текст Reading, отдельную озвучиваемую реплику Listening, Build a Sentence и Listen and Repeat. Это авторская сокращённая практика, не официальный пробник ETS; остальные форматы указаны как ориентиры.</p><div class="stack">'+rows+'</div></section>';
  }
  var api={links:links,linkStrings:linkStrings,panelHtml:panelHtml,topicTask:topicTask,startTopic:startTopic,TYPES:TYPES,SKILLS:SKILLS,levelOf:levelOf};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.GrammarToefl=api;
})(typeof window!=='undefined'?window:globalThis);

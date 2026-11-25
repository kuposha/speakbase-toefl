/* A1-02 content registration and catalogue entry, powered by GrammarLessonEngine. */
(function(){
  const previousGrammarLibraryView=window.grammarLibraryView;
  const items=[
    {id:'D1',group:'Входная диагностика',prompt:'Какое местоимение заменяет имя Sophia?',options:['he','she','they'],answer:'she',why:'Sophia — один человек. В этом примере используем she как subject pronoun.'},
    {id:'D2',group:'Входная диагностика',prompt:'Какое местоимение подходит вместо the books?',options:['it','they','we'],answer:'they',why:'The books — несколько предметов. Для множественного числа используется they.'},
    {id:'D3',group:'Входная диагностика',prompt:'Выбери подлежащее и глагол в правильной паре.',options:['I is','I am','I are'],answer:'I am',why:'В настоящем времени I сочетается с am.'},
    {id:'D4',group:'Входная диагностика',prompt:'Выбери правильную форму для обращения к одному человеку: You ___ my friend.',options:['am','is','are'],answer:'are',why:'You всегда сочетается с are — независимо от того, один это собеседник или группа.'},
    {id:'D5',group:'Входная диагностика',prompt:'Какое местоимение обычно используется для предмета в единственном числе?',options:['he','it','they'],answer:'it',why:'Для предмета или вещи в единственном числе обычно используется it.'},

    {id:'G1',group:'Управляемая практика',prompt:'Paul ___ my brother.',options:['am','is','are'],answer:'is',why:'Paul — одно лицо, его можно заменить на he. После he используется is.'},
    {id:'G2',group:'Управляемая практика',prompt:'We ___ students.',options:['am','is','are'],answer:'are',why:'We — множественное число первого лица; правильная форма be — are.'},
    {id:'G3',group:'Управляемая практика',prompt:'I ___ from Kaliningrad.',options:['am','is','are'],answer:'am',why:'С местоимением I используется только am.'},
    {id:'G4',group:'Управляемая практика',prompt:'Выбери местоимение вместо My sister and I.',options:['they','we','she'],answer:'we',why:'В группу входит говорящий и ещё один человек, поэтому используется we.'},
    {id:'G5',group:'Управляемая практика',prompt:'Выбери местоимение вместо The keys.',options:['it','they','he'],answer:'they',why:'Keys — несколько предметов, поэтому используется they.'},
    {id:'G6',group:'Управляемая практика',prompt:'Как сокращается she is?',options:["she's","she're","she am"],answer:"she's",why:"She is сокращается до she's. Сокращение не меняет грамматическую форму."},
    {id:'G7',group:'Управляемая практика',prompt:'Выбери subject pronoun: ___ am ready.',options:['I','me','her'],answer:'I',why:'Перед глаголом am стоит подлежащее I. Me и her — объектные формы.'},
    {id:'G8',group:'Управляемая практика',prompt:'Введи правильную форму be: They ___ at home.',accepted:['are'],answer:'are',why:'They — множественное число; после they используется are.'},

    {id:'I1',group:'Самостоятельная практика',prompt:'This is my dog. ___ is friendly.',options:['He','It','We'],answer:'It',why:'В нейтральном примере о животном используется it. Для знакомого питомца возможны he/she, если это соответствует контексту.'},
    {id:'I2',group:'Самостоятельная практика',prompt:'My parents ___ doctors.',options:['am','is','are'],answer:'are',why:'My parents — множественное число, местоимение they. Поэтому are.'},
    {id:'I3',group:'Самостоятельная практика',prompt:'My brother and I ___ classmates.',options:['am','is','are'],answer:'are',why:'My brother and I можно заменить на we. С we используется are.'},
    {id:'I4',group:'Самостоятельная практика',prompt:'I ___ 20 years old.',options:['am','have','is'],answer:'am',why:'Возраст в английском выражается через be: I am 20 years old.'},
    {id:'I5',group:'Самостоятельная практика',prompt:'Выбери грамматически правильное предложение.',options:['My sister are happy.','My sister is happy.','My sister am happy.'],answer:'My sister is happy.',why:'My sister — третье лицо единственного числа (she), поэтому is.'},
    {id:'I6',group:'Самостоятельная практика',prompt:'Обращение к группе: You ___ all welcome here.',options:['am','is','are'],answer:'are',why:'You используется и для одного человека, и для группы; форма be остаётся are.'},
    {id:'I7',group:'Самостоятельная практика',prompt:'Исправь предложение: Her is my teacher.',accepted:['She is my teacher.'],answer:'She is my teacher.',why:'В роли подлежащего нужна форма she. Her — объектная форма.'},
    {id:'I8',group:'Самостоятельная практика',prompt:'Введи правильную сокращённую форму: we are.',accepted:["we're","we are"],answer:"we're",why:"We are можно сократить до we're. Полная форма также грамматически правильна."},

    {id:'E1',group:'Выходная проверка',prompt:'I ___ ready for the lesson.',options:['am','is','are'],answer:'am',why:'I сочетается с am.'},
    {id:'E2',group:'Выходная проверка',prompt:'The books ___ on the table.',options:['am','is','are'],answer:'are',why:'The books можно заменить на they. С they используется are.'},
    {id:'E3',group:'Выходная проверка',prompt:'He ___ from Italy.',options:['am','is','are'],answer:'is',why:'He — третье лицо единственного числа; форма be — is.'},
    {id:'E4',group:'Выходная проверка',prompt:'Emma is my friend. ___ is very kind.',options:['He','She','They'],answer:'She',why:'В примере Emma обозначена местоимением she. Для конкретного человека учитывай используемые им местоимения.'},
    {id:'E5',group:'Выходная проверка',prompt:'Исправь предложение: They is at home.',accepted:['They are at home.'],answer:'They are at home.',why:'They всегда сочетается с are, в том числе в singular they.'},

    {id:'W1',group:'Самостоятельное применение',prompt:'Напиши 4–5 утвердительных предложений о себе, знакомом человеке и одном предмете или месте. Используй минимум четыре разных subject pronouns и правильные формы am/is/are. Добавь хотя бы одну полную и одну сокращённую форму. Вопросы и отрицания пока не нужны.',open:true,rubric:['Написано не менее четырёх законченных утвердительных предложений.','Использованы минимум четыре разных subject pronouns.','Формы am/is/are согласованы с подлежащими.','Глагол be не пропущен в именных, прилагательных и предложных конструкциях.','Есть хотя бы одна сокращённая и одна полная форма be.','Местоимения I, you, he, she, it, we, they выбраны по смыслу; object pronouns не использованы вместо subject pronouns.']}
  ];

  window.GrammarLessonEngine.register({
    id:'A1-02',
    level:'A1',
    title:'Subject pronouns and verb be — affirmative',
    description:'Выбирай I, you, he, she, it, we, they и согласуй подлежащее с am, is или are в простых утвердительных предложениях.',
    cardDescription:'Второй блок грамматической программы: subject pronouns, формы am/is/are, сокращения и базовое описание людей и предметов.',
    eyebrow:'Второй блок последовательной грамматической программы · Speakbase',
    markdownGlobal:'grammarA102Markdown',
    contentVersion:'1.0-draft',
    outcomes:[
      'Выбирать семь основных subject pronouns по лицу, числу и смыслу.',
      'Согласовывать I/you/he/she/it/we/they с am/is/are.',
      'Использовать be для имени, возраста, состояния, характеристики и места.',
      'Узнавать сокращённые формы I’m, you’re, he’s, she’s, it’s, we’re, they’re.',
      'Не смешивать subject pronouns с object pronouns.'
    ],
    items,
    groups:{independent:'Самостоятельная практика',exit:'Выходная проверка'},
    thresholds:{independent:6,exit:4,criticalIds:['E1','E2','E3']}
  });

  window.grammarA102CardView=function(){return window.GrammarLessonEngine.card('A1-02')};
  window.grammarLibraryView=function(){
    const cs=courseState();
    if(cs.activeGrammarLessonId==='A1-02')return window.GrammarLessonEngine.view('A1-02');
    return previousGrammarLibraryView();
  };
})();

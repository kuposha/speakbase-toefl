/* Personalised feedback, self-review and adaptive revision. All ratings are learner self-assessments, not ETS scores. */
const reviewLevels = ['Нужно поработать','Частично получается','Уверенно'];
function reviewRubric(item,skill){
  const type=[item?.type,item?.title,item?.topic,item?.ask].filter(Boolean).join(' ').toLowerCase();
  if(skill===2){
    if(type.includes('email')||/email|письм/.test(type))return [
      'Выполнены все пункты задания','Цель письма и организация','Тон и формат обращения','Грамматика и точность форм','Точность и разнообразие словаря'
    ];
    return ['Ответ по теме и позиция','Аргументация и конкретный пример','Связность и логика','Грамматика и точность форм','Точность и разнообразие словаря'];
  }
  if(item?.repeat||type.includes('listen and repeat')||type.includes('repeat what')){
    return ['Сохранены все слова и смысл','Точность окончаний и форм','Разборчивость речи','Ударение и ритм','Темп и плавность'];
  }
  return ['Прямой ответ на вопрос','Развитие мысли и пример','Связность и беглость','Грамматика и словарь','Произношение и разборчивость'];
}
function selfReviewMarkup(source,record,key,item,result){
  if(!result||item?.answer!=null||item?.tokens||item?.options||!((item?.skill===0)||(item?.skill===2)))return '';
  const criteria=reviewRubric(item,item.skill),saved=result.selfReview||{};
  const selects=criteria.map((label,i)=>'<label class="self-review-row"><span>'+esc(label)+'</span><select name="criterion-'+i+'" required><option value="">Выбрать</option>'+reviewLevels.map((name,value)=>'<option value="'+value+'" '+(saved.criteria?.[i]===value?'selected':'')+'>'+name+'</option>').join('')+'</select></label>').join('');
  const score=Number.isFinite(saved.score)?'<p class="self-review-score">Твоя самооценка: <b>'+saved.score+'/10</b></p>':'';
  return '<section class="self-review"><div class="eyebrow">Self-review · не балл ETS</div><h4>Оцени свой ответ</h4><p class="note">0 — пока не получается · 1 — частично · 2 — уверенно. Для Speaking оцени запись, а не только текстовую расшифровку.</p><form class="self-review-form" data-source="'+source+'" data-record="'+record+'" data-key="'+esc(key||'')+'">'+selects+'<label>Что конкретно улучшить в следующей попытке?<textarea name="notes" rows="2" maxlength="500">'+esc(saved.notes||'')+'</textarea></label>'+score+'<button class="primary" type="submit">Сохранить самооценку</button><small class="self-review-status" role="status"></small></form></section>';
}
function selfReviewAverage(review){
  const values=Object.values(review?.criteria||{}).filter(Number.isFinite);
  return values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;
}
function learningQuestionKey(item){return item?.reviewKey||(item?.grammarId&&item?.grammarItemId?['grammar',item.grammarId,item.grammarItemId].join('::'):'')||[item?.skill,String(item?.topic||item?.title||'').replace(/\s+·\s+\d+\/\d+$/,''),item?.ask||''].join('::').toLowerCase()}
function dueLearningReviews(){return Object.values(db.reviewSchedule||{}).filter(item=>item.nextDue<=Date.now()).sort((a,b)=>a.nextDue-b.nextDue)}
function updateReviewSchedule(item,result){
  if(!item||!result)return;
  if(item.grammarId&&item.grammarItemId){const cfg=window.GrammarLessonEngine?.config(item.grammarId)||window.grammarPilotLessons?.[item.grammarId];const current=cfg?.items.find(x=>x.id===item.grammarItemId);if(!current||current.open||current.prompt!==item.ask)return;}
  const score=selfReviewAverage(result.selfReview),aiScore=Number.isFinite(result.aiReview?.practice_estimate)?result.aiReview.practice_estimate:null;
  const reviewScore=score!==null&&aiScore!==null?(score+aiScore/2.5)/2:score!==null?score:aiScore!==null?aiScore/2.5:null;
  const wrong=result.correct===false||(result.issues||[]).length>0||(result.aiReview?.issues||[]).length>0||(reviewScore!==null&&reviewScore<1.4);
  if(result.correct===null&&reviewScore===null&&!(result.issues||[]).length&&!(result.aiReview?.issues||[]).length)return;
  db.reviewSchedule=db.reviewSchedule||{};
  const key=learningQuestionKey(item),previous=db.reviewSchedule[key]||{repetitions:0,lapses:0,intervalDays:1};
  const interval=reviewScore!==null?(reviewScore<.8?1:reviewScore<1.4?3:7):wrong?1:Math.min(21,previous.intervalDays*(previous.repetitions?2:1));
  db.reviewSchedule[key]={key,skill:item.skill,topic:item.topic||item.title||'Повторение',ask:item.ask||'',question:{...item,audioId:null},repetitions:wrong?0:previous.repetitions+1,lapses:previous.lapses+(wrong?1:0),intervalDays:interval,nextDue:Date.now()+interval*86400000,lastScore:score,lastAiScore:aiScore,lastCorrect:result.correct,updatedAt:new Date().toISOString()};
  persist();
}
window.recordGrammarReview=function(config,item,result){
  if(!config||!item||!result||result.open||typeof result.ok!=='boolean')return;
  updateReviewSchedule({skill:4,topic:config.title,ask:item.prompt,model:item.answer,opts:item.options,exact:true,accepted:item.accepted,tip:item.why,level:config.level,levelSource:'marked',grammarId:config.id,grammarItemId:item.id,min:4},{correct:result.ok});
};
function mirrorGrammarAnswer(saved){const q=saved&&saved.q;if(q?.grammarId&&q?.grammarItemId&&typeof saved.correct==='boolean')window.GrammarLessonEngine?.record?.(q.grammarId,q.grammarItemId,saved.a,saved.correct,'review',q.ask)}
function learningRecords(){
  const practice=(db.h||[]).map((item,index)=>({source:'practice',record:index,skill:item.q?.skill,item:item.q||{},result:item,date:item.day||''}));
  const sectionSkills=[3,1,2,0];
  const exams=(db.examStudio?.history||[]).flatMap((attempt,attemptIndex)=>Object.entries(attempt.answers||{}).map(([key,result])=>{
    const section=Number(key.split('-')[0]),pos=Number(key.split('-')[1]),skill=sectionSkills[section],item=examItems(attempt.form,section)[pos]||{};
    return {source:'exam',record:attemptIndex,key,skill,item:{...item,skill},result,date:attempt.date||''};
  }));
  return [...practice,...exams].filter(row=>Number.isInteger(row.skill)&&row.skill>=0&&row.skill<5).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
}
function learningInsights(){
  const labels=['Speaking','Listening','Writing','Reading','Grammar'];
  const records=learningRecords();
  const skills=labels.map((label,skill)=>{
    const rows=records.filter(row=>row.skill===skill);
    const objective=rows.filter(row=>row.result.correct===true||row.result.correct===false);
    const reviews=rows.map(row=>selfReviewAverage(row.result.selfReview)).filter(value=>value!==null);
    const accuracy=objective.length?objective.filter(row=>row.result.correct===true).length/objective.length:null;
    const selfScore=reviews.length?reviews.reduce((sum,value)=>sum+value,0)/reviews.length:null;
    const aiScores=rows.map(row=>row.result.aiReview?.practice_estimate).filter(Number.isFinite);
    const aiAverage=aiScores.length?aiScores.reduce((sum,value)=>sum+value,0)/aiScores.length:null;
    const recent=rows.slice(-5),previous=rows.slice(-10,-5);
    const measure=group=>{
      const checked=group.filter(row=>row.result.correct===true||row.result.correct===false);
      if(checked.length)return checked.filter(row=>row.result.correct===true).length/checked.length;
      const rated=group.map(row=>{const self=selfReviewAverage(row.result.selfReview);return self!==null?self:Number.isFinite(row.result.aiReview?.practice_estimate)?row.result.aiReview.practice_estimate/2.5:null}).filter(value=>value!==null);
      return rated.length? rated.reduce((sum,value)=>sum+value,0)/rated.length/2:null;
    };
    const current=measure(recent),before=measure(previous);
    return {skill,label,count:rows.length,objectiveCount:objective.length,selfReviewCount:reviews.length,aiReviewCount:aiScores.length,accuracy,selfScore,aiAverage,trend:current!==null&&before!==null?Math.round((current-before)*100):null,rows};
  });
  const weak=skills.filter(row=>(row.objectiveCount>=3&&row.accuracy!==null&&row.accuracy<.7)||(row.selfReviewCount>=2&&row.selfScore!==null&&row.selfScore<1.4)||(row.aiReviewCount>=3&&row.aiAverage!==null&&row.aiAverage<3.5)).sort((a,b)=>{const score=row=>row.objectiveCount>=3&&row.accuracy!==null?row.accuracy:row.selfReviewCount>=2&&row.selfScore!==null?row.selfScore/2:row.aiReviewCount>=3&&row.aiAverage!==null?row.aiAverage/5:1;return score(a)-score(b)});
  const recentErrors=records.filter(row=>row.result.correct===false||(row.result.issues||[]).length||(selfReviewAverage(row.result.selfReview)!==null&&selfReviewAverage(row.result.selfReview)<1.4)||(Number.isFinite(row.result.aiReview?.practice_estimate)&&row.result.aiReview.practice_estimate<3)||(row.result.aiReview?.issues||[]).length).slice(-30);
  const topics=[...new Set(recentErrors.map(row=>row.item.topic||row.item.title).filter(Boolean))].slice(-4).reverse();
  const issueCounts=new Map();records.slice(-30).forEach(row=>{const labels=[...(row.result.issues||[]).map(issue=>String(issue).split(' → ')[0].split(' — ')[0].trim()),...(row.result.aiReview?.issues||[]).map(issue=>String(issue.issue||issue.quote||'').trim())];labels.forEach(label=>{if(label)issueCounts.set(label,(issueCounts.get(label)||0)+1)})});
  const commonIssues=[...issueCounts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,3);
  return {skills,weak,recentErrors,topics,commonIssues,records};
}
function startLearningReview(){
  const insights=learningInsights();
  const rows=insights.recentErrors.slice().reverse();
  const due=dueLearningReviews();
  let items=due.slice(0,5).map(entry=>({...entry.question,reviewKey:entry.key,skill:entry.skill,topic:entry.topic,min:4,level:'Повторение',levelSource:'review',audioId:null,drill:true}));
  if(items.length<5){const used=new Set(items.map(item=>item.reviewKey));items=items.concat(rows.filter(row=>!used.has(learningQuestionKey(row.item))).map(row=>({...row.item,reviewKey:learningQuestionKey(row.item),skill:row.skill,topic:row.item.topic||row.item.title||'Повторение слабого места',min:4,level:row.item.level||'Повторение',levelSource:'review',audioId:null,drill:true})).filter(item=>item.ask&&item.model).slice(0,5-items.length));}
  if(items.length<3){
    const skill=insights.weak[0]?.skill??(insights.skills.filter(row=>row.count).sort((a,b)=>a.count-b.count)[0]?.skill??0);
    const bankName={0:'Speaking',1:'Listening',2:'Writing',3:'Reading'}[skill];
    const bank=skill===4?[]:(practiceBooks?.[bankName]||[]);
    const recent=new Set(rows.filter(row=>row.skill===skill).map(row=>row.item.ask));
    const extras=bank.filter(item=>!recent.has(item.ask)).slice(0,5-items.length).map(item=>({...item,skill,topic:item.title||'Целевая практика',min:4,level:item.level||'Повторение',levelSource:'review',drill:true}));
    items=items.concat(extras);
    if(skill===4&&!items.length){
      const entry=grammarPractice.flatMap((bank,unit)=>bank.map(([ask,answer,wrong])=>({ask,model:answer,opts:[answer,wrong],skill:4,topic:units[unit][0],level:'Повторение',min:4,tip:grammarNotes[unit]}))).slice(0,5);
      items=entry;
    }
  }
  if(!items.length){modal('<h2>Пока нет материала для повтора</h2><p>Сначала выполни несколько упражнений. После ответов Speakbase сможет выделить слабые темы.</p>');return}
  items=items.slice(0,5).map((item,index)=>({...item,topic:(item.topic||item.title||'Повторение')+' · '+(index+1)+'/'+Math.min(5,items.length)}));
  db.draft={multi:true,items,index:0,answers:[],q:items[0],answer:'',listened:false,end:Date.now()+25*60000,reviewMode:true};
  persist();resume();
}
function learningPlanMarkup(){
  const insights=learningInsights(),top=insights.weak[0],trends=insights.skills.filter(row=>row.trend!==null&&row.count>=10).sort((a,b)=>b.trend-a.trend);
  const summary=insights.skills.map(row=>{
    const trend=row.trend===null?'':row.trend>0?' · рост +'+row.trend+' п.п.':row.trend<0?' · снижение '+row.trend+' п.п.':' · без изменений';
    const accuracy=row.objectiveCount>=3?Math.round(row.accuracy*100)+'% \u043f\u043e \u0437\u0430\u043a\u0440\u044b\u0442\u044b\u043c \u0437\u0430\u0434\u0430\u043d\u0438\u044f\u043c':row.objectiveCount?row.objectiveCount+' \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u0435\u043c\u044b\u0445 \u043e\u0442\u0432\u0435\u0442\u043e\u0432; \u043c\u0430\u043b\u043e \u0434\u0430\u043d\u043d\u044b\u0445':'';
    const self=row.selfReviewCount>=2?'\u0441\u0430\u043c\u043e\u043e\u0446\u0435\u043d\u043a\u0430 '+row.selfScore.toFixed(1)+'/2':row.selfReviewCount?'1 \u0441\u0430\u043c\u043e\u043e\u0446\u0435\u043d\u043a\u0430; \u043c\u0430\u043b\u043e \u0434\u0430\u043d\u043d\u044b\u0445':'';
    const ai=row.aiReviewCount>=3?'AI '+row.aiAverage.toFixed(1)+'/5':row.aiReviewCount?row.aiReviewCount+' AI-\u0440\u0430\u0437\u0431\u043e\u0440\u043e\u0432; \u043c\u0430\u043b\u043e \u0434\u0430\u043d\u043d\u044b\u0445':'';
    return '<div class="learning-skill"><span>'+row.label+'</span><small>'+([accuracy,self,ai].filter(Boolean).join(' · ')||row.count+' ответов')+trend+'</small></div>';
  }).join('');
  const recommendation=top?'<p><b>\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0441\u0435\u0439\u0447\u0430\u0441: '+top.label+'.</b> '+(top.objectiveCount>=3?'\u0422\u043e\u0447\u043d\u043e\u0441\u0442\u044c \u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0445 \u0437\u0430\u0434\u0430\u043d\u0438\u0439: '+Math.round(top.accuracy*100)+'%. ':'')+(top.selfReviewCount>=2?'\u0421\u0440\u0435\u0434\u043d\u044f\u044f \u0441\u0430\u043c\u043e\u043e\u0446\u0435\u043d\u043a\u0430: '+top.selfScore.toFixed(1)+'/2. ':'')+(top.aiReviewCount>=3?'\u0421\u0440\u0435\u0434\u043d\u044f\u044f AI-\u043e\u0446\u0435\u043d\u043a\u0430 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u043e\u0442\u0432\u0435\u0442\u043e\u0432: '+top.aiAverage.toFixed(1)+'/5. ':'')+'\u041d\u0430\u0447\u043d\u0438 \u0441 \u043a\u043e\u0440\u043e\u0442\u043a\u043e\u0439 \u0446\u0435\u043b\u0435\u0432\u043e\u0439 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438.</p>':insights.records.length<5?'<p>\u041f\u043e\u043a\u0430 \u043c\u0430\u043b\u043e \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u043d\u0430\u0434\u0451\u0436\u043d\u043e\u0433\u043e \u0432\u044b\u0432\u043e\u0434\u0430. \u0412\u044b\u043f\u043e\u043b\u043d\u0438 \u0435\u0449\u0451 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0437\u0430\u0434\u0430\u043d\u0438\u0439 \u0432 \u0440\u0430\u0437\u043d\u044b\u0445 \u043d\u0430\u0432\u044b\u043a\u0430\u0445; \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u043d\u0443\u0442 \u0442\u043e\u0447\u043d\u0435\u0435.</p>':'<p>\u041f\u043e \u0442\u0435\u043a\u0443\u0449\u0438\u043c \u0434\u0430\u043d\u043d\u044b\u043c \u043d\u0435\u0442 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u043d\u043e\u0433\u043e \u0441\u043b\u0430\u0431\u043e\u0433\u043e \u043d\u0430\u0432\u044b\u043a\u0430. \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0439 \u0441\u043c\u0435\u0448\u0430\u043d\u043d\u0443\u044e \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443 \u0438 \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u0439 \u0434\u0438\u043d\u0430\u043c\u0438\u043a\u0443.</p>';
  const topics=insights.topics.length?'<p class="note">Темы, к которым стоит вернуться: '+insights.topics.map(esc).join(' · ')+'.</p>':'';
  const due=dueLearningReviews().length;
  const dueNote=due?'<p><b>Пора повторить:</b> '+due+' заданий по твоему расписанию интервального повторения.</p>':'';
  const issueNote=insights.commonIssues.length?'<p class="note">Повторяющиеся ошибки: '+insights.commonIssues.map(([issue,count])=>esc(issue)+' ('+count+')').join(' · ')+'.</p>':'';
  const trendNote=trends.length?'<p class="note">Лучше всего растёт: '+trends[0].label+' ('+(trends[0].trend>0?'+':'')+trends[0].trend+' п.п. по последним пяти ответам относительно предыдущих пяти).</p>':'';
  return '<section class="learning-plan"><div class="head"><h3>Персональный план повторения</h3><span class="chip">по твоим ответам</span></div>'+recommendation+'<div class="learning-skills">'+summary+'</div>'+dueNote+topics+issueNote+trendNote+'<button class="primary" type="button" onclick="startLearningReview()">Повторить слабые места</button><button class="secondary" type="button" onclick="configureAI()">Настроить бесплатную AI-проверку</button><p class="note">Динамика учитывает закрытые ответы, самооценку и доступные локальные AI-разборы; это учебная аналитика, не прогноз результата ETS.</p></section>';
}
const originalProgress=progress;
progress=function(){return originalProgress()+learningPlanMarkup()};
const originalSubmitAnswer=submitAnswer;
submitAnswer=function(answer){const before=db.h.length;originalSubmitAnswer(answer);const saved=db.h[before];if(saved){updateReviewSchedule(saved.q,saved);mirrorGrammarAnswer(saved)}};
const originalCheckLesson=checkLesson;
checkLesson=function(){const before=db.h.length;originalCheckLesson();const saved=db.h[before];if(saved)updateReviewSchedule(saved.q,saved)};
const originalPracticeReview=review;
review=function(index){
  originalPracticeReview(index);
  const row=db.h[index],item=row?.q;
  if(row&&item&&(item.skill===0||item.skill===2)&&row.correct===null){
    $('#box')?.insertAdjacentHTML('beforeend',selfReviewMarkup('practice',index,'',item,row));
  }
};
const originalExamReview=examReview;
examReview=function(index){
  const attempt=examStudioState().history[index];if(!attempt)return originalExamReview(index);
  const results=Object.values(attempt.answers||{}),right=results.filter(item=>item.correct===true).length;
  const closed=attempt.sections.reduce((sum,section)=>sum+examItems(attempt.form,section).filter(item=>item.answer!=null).length,0);
  const total=attempt.sections.reduce((sum,section)=>sum+examItems(attempt.form,section).length,0);
  let html='<h2>'+esc(attempt.title)+'</h2><p>Ответов сохранено: '+results.length+' из '+total+'. Пропущено: '+(total-results.length)+'. Задания с ключом: '+right+' из '+closed+' верно. Это тренировочный результат, не балл ETS.</p><p class="note">Для открытых ответов доступны критерии самооценки. Они помогают отслеживать динамику, но не являются официальной оценкой ETS.</p>';
  attempt.sections.forEach(section=>{
    html+='<h3>'+examSections[section].name+'</h3>';
    examItems(attempt.form,section).forEach((item,pos)=>{
      const key=examKey(section,pos),result=attempt.answers[key],skill=examSections[section].skill,scoredItem={...item,skill};
      html+='<details><summary>'+(pos+1)+'. '+esc(item.type)+' · '+(!result?'Пропуск':result.correct===true?'Верно':result.correct===false?'Исправить':'Самопроверка')+'</summary><blockquote lang="en" style="white-space:pre-line">'+esc(item.source||'')+'</blockquote><p>'+esc(item.ask)+'</p>'+(result?.text?'<p>Твой ответ: '+esc(result.text)+'</p>':'')+(result?.audioId?btn('Моя запись','examReviewAudio(this,'+index+','+section+','+pos+')'):'')+(item.answer!=null?'<p>Ответ: '+esc([].concat(item.answer).join(' / '))+'</p>':'')+'<p>'+esc(String(item.why||''))+'</p>'+selfReviewMarkup('exam',index,key,scoredItem,result)+'</details>';
    });
  });
  modal(html);
};
document.addEventListener('submit',event=>{
  const form=event.target.closest?.('.self-review-form');if(!form)return;
  event.preventDefault();
  const source=form.dataset.source,record=Number(form.dataset.record),key=form.dataset.key;
  const target=source==='exam'?examStudioState().history[record]?.answers?.[key]:db.h[record];
  if(!target)return;
  const criteria={};
  for(let i=0;i<5;i++){const value=form.elements['criterion-'+i]?.value;if(value===''||value==null){form.querySelector('.self-review-status').textContent='Оцени все пять критериев.';return}criteria[i]=Number(value)}
  const values=Object.values(criteria),score=values.reduce((sum,value)=>sum+value,0);
  target.selfReview={criteria,notes:form.elements.notes.value.trim(),score,max:10,updatedAt:new Date().toISOString()};
  const section=Number(key.split('-')[0]),position=Number(key.split('-')[1]),sectionSkill=[3,1,2,0][section];
  const reviewItem=source==='exam'?{...(examItems(examStudioState().history[record].form,section)[position]||{}),skill:sectionSkill}:target.q;
  updateReviewSchedule(reviewItem,target);
  persist();
  form.querySelector('.self-review-score')?.remove();
  form.insertAdjacentHTML('beforeend','<p class="self-review-score">Твоя самооценка: <b>'+score+'/10</b> · сохранено</p>');
  form.querySelector('.self-review-status').textContent='Сохранено в твоём профиле. Рекомендации обновятся на главной.';
});

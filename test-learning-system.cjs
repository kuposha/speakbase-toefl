const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const handlers={};
const sandbox={
  db:{reviewSchedule:{},h:[
    {q:{skill:2,ask:'Write an email',topic:'Email'},correct:null,issues:[],selfReview:{criteria:{0:0,1:1,2:0,3:1,4:0},score:2},aiReview:{practice_estimate:2,issues:[{issue:'Missing detail'}]}},
    {q:{skill:2,ask:'Join a discussion',topic:'Discussion'},correct:null,issues:[],selfReview:{criteria:{0:1,1:1,2:1,3:0,4:1},score:4}},
    {q:{skill:0,ask:'Describe a skill',topic:'Interview'},correct:null,issues:[],selfReview:{criteria:{0:1,1:0,2:1,3:1,4:0},score:3}},
    {q:{skill:3,ask:'Read a passage'},correct:false,issues:[]},
    {q:{skill:3,ask:'Read a notice'},correct:true,issues:[]},
    {q:{skill:3,ask:'Read an article'},correct:false,issues:[]}
  ],examStudio:{history:[]}},
  esc:value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])),
  skills:['Speaking','Listening','Writing','Reading','Grammar'],
  practiceBooks:{Speaking:[],Listening:[],Writing:[],Reading:[]},
  grammarPractice:[],grammarNotes:[],units:[],
  examItems:()=>[],examSections:[],examKey:(s,p)=>s+'-'+p,
  examStudioState(){return this.db.examStudio},
  progress:()=>'<p>base progress</p>',
  submitAnswer:()=>{},checkLesson:()=>{},resume:()=>{sandbox.resumed=true},
  review:()=>{},examReview:()=>{},modal:html=>{sandbox.lastModal=html},
  btn:(label,fn)=>'<button>'+label+'</button>',
  persist:()=>{sandbox.persisted=(sandbox.persisted||0)+1},
  document:{addEventListener:(name,handler)=>{handlers[name]=handler}},
  Date,Number,Math,Object,String,Array,Set,Map,JSON,console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('learning.js','utf8'),sandbox);
const run=expression=>vm.runInContext(expression,sandbox);
assert.equal(run("reviewRubric({type:'Write an Email'},2).length"),5);
assert.equal(run("reviewRubric({type:'Listen and Repeat'},0)[0]"),'Сохранены все слова и смысл');
assert.equal(run("learningQuestionKey({skill:0,topic:'Topic · 2/5',ask:'Prompt'})"),'0::topic::prompt');
assert.match(run("selfReviewMarkup('practice',0,'',{skill:2,title:'Write an Email'},{})"),/Сохранить самооценку/);
assert.equal(run("selfReviewMarkup('exam',0,'0-0',{skill:2,type:'Build a Sentence',answer:'x'},{})"),'');
assert.ok(run("learningInsights().weak.some(item=>item.skill===2)"));
assert.equal(run("learningInsights().skills.find(item=>item.skill===2).aiAverage"),2);
assert.equal(run("learningInsights().skills.find(item=>item.skill===2).selfReviewCount"),2);
assert.equal(run("learningInsights().skills.find(item=>item.skill===3).objectiveCount"),3);
assert.ok(run("learningPlanMarkup()").includes('1 AI-\u0440\u0430\u0437\u0431\u043e\u0440'));
assert.ok(!run("learningPlanMarkup()").includes('AI 2.0/5'));
sandbox.db.h.push({q:{skill:4,ask:'Grammar review',topic:'Articles'},correct:null,issues:[],selfReview:{criteria:{0:0,1:0,2:0,3:0,4:0},score:0}});
assert.ok(!run("learningInsights().weak.some(item=>item.skill===4)"),'one self-review must not classify a skill as weak');
assert.match(run("progress()"),/Персональный план повторения/);
const form={
 dataset:{source:'practice',record:'0',key:''},
 elements:Object.fromEntries(Array.from({length:5},(_,i)=>['criterion-'+i,{value:String(i%3)}]).concat([['notes',{value:'Improve cohesion'}]])),
 querySelector:selector=>selector==='.self-review-score'?null:{textContent:''},
 insertAdjacentHTML:()=>{}
};
let prevented=false;
handlers.submit({target:{closest:()=>form},preventDefault:()=>{prevented=true}});
assert.ok(prevented);
assert.equal(sandbox.db.h[0].selfReview.score,4);
assert.equal(sandbox.db.h[0].selfReview.notes,'Improve cohesion');
assert.equal(Object.values(sandbox.db.reviewSchedule)[0].intervalDays,3);
assert.equal(Object.values(sandbox.db.reviewSchedule)[0].lastAiScore,2);
sandbox.db.reviewSchedule[Object.keys(sandbox.db.reviewSchedule)[0]].nextDue=0;
run('startLearningReview()');
assert.ok(sandbox.resumed);
assert.equal(sandbox.db.draft.items.length,1);
assert.ok(sandbox.persisted>=2);
console.log('Learning system QA passed: writing/speaking rubrics, closed-task exclusion, weak-skill detection, dashboard plan and persisted self-review.');

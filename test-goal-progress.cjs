const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const app=fs.readFileSync('app.js','utf8');
const start=app.indexOf('function trackedPracticeRows(){'),end=app.indexOf('function goalCard(){',start);assert.ok(start>=0&&end>start,'transparent progress calculator exists');
const context=vm.createContext({db:{h:[],tests:[],course:{reports:[]},examStudio:{history:[]}}});vm.runInContext(app.slice(start,end)+';globalThis.calculate=goalProgress;globalThis.rows=trackedPracticeRows',context);
const initial=context.calculate();assert.equal(initial.score,0);assert.equal(initial.lessons,0);assert.equal(initial.tasks,0);assert.equal(initial.tests,0);
context.db.course.reports=Array.from({length:23},(_,i)=>({date:'2026-11-'+String(i+1).padStart(2,'0'),name:'Lesson '+i}));
context.db.h=Array.from({length:20},(_,i)=>({q:{skill:i%4},correct:i%5!==0}));
context.db.examStudio.history=[
 {sections:[0,1,2,3],answers:{'0-0':{correct:true},'1-0':{correct:false},'2-0':{correct:null},'3-0':{correct:true}}},
 {sections:[1],answers:{'1-0':{correct:true}}}
];
const updated=context.calculate();assert.equal(updated.score,50,'the visible percentage must represent course completion only');assert.equal(updated.lessons,23);assert.equal(updated.tasks,25,'practice and all recorded exam answers both count');assert.equal(updated.tests,1,'only full-route attempts count as full mock attempts');
const mapped=context.rows().slice(20,24).map(x=>x.q.skill);assert.deepEqual(Array.from(mapped),[3,1,2,0],'exam sections map to Reading, Listening, Writing and Speaking skills');
context.db.h.forEach(x=>{x.correct=true});assert.equal(context.calculate().score,50,'answer accuracy must not inflate course-completion percentage');
context.db.course.reports.push({date:'2026-11-01',name:'Lesson 0'});assert.equal(context.calculate().lessons,23,'duplicate lesson report must not inflate lesson count');
console.log('Progress QA passed: course completion is transparent; practice and full-exam answers are tracked; section mapping and duplicate protection passed.');

const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const app=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const course=fs.readFileSync('course-data.js','utf8');
const match=app.match(/const vocabularySeed=(\[[\s\S]*?\]);/);
assert.ok(match,'starter vocabulary seed exists');
const starter=JSON.parse(match[1]);
assert.equal(starter.length,54,'all submitted starter entries and TOEFL Academic Vocabulary cards are retained');
assert.equal(new Set(starter.map(x=>x[2])).size,53,'only the repeated make progress is duplicated');
assert.equal(starter.filter(x=>x[2]==='make progress').length,2,'make progress remains in both categories');

const context={};
vm.createContext(context);
vm.runInContext(course,context);
const thematic=vm.runInContext('thematicVocabulary',context);
assert.equal(thematic.length,1786,'full thematic vocabulary bank is available');
assert.equal(new Set(thematic.map(x=>x[0].toLowerCase())).size,1774,'thematic bank unique expression count');
assert.equal(new Set(thematic.map(x=>x[2])).size,21,'thematic bank categories');

const merged=[
  ...starter.map(x=>({category:x[0],en:x[2]})),
  ...thematic.filter(x=>!starter.some(s=>s[0]===x[2]&&s[2].toLowerCase()===x[0].toLowerCase())).map(x=>({category:x[2],en:x[0]}))
];
assert.equal(merged.length,1840,'full dictionary combines the 54 curated starter entries and 1,786 thematic entries');
assert.equal(new Set(merged.map(x=>x.en.toLowerCase())).size,1814,'full dictionary unique expression count');
assert.equal(new Set(merged.map(x=>x.category)).size,23,'full dictionary category count');
const academicStarter=['retention','retrieval','distributed','availability','effectiveness','increasingly','access','approach','evidence','previous','suggest','engage'];for(const word of academicStarter){assert.ok(starter.some(x=>x[2]===word),'TOEFL Academic Vocabulary Starter includes '+word);assert.ok(app.includes('\"'+word+'\":\"'),'contextual example exists for '+word);}

assert.ok(app.includes('const fullVocabularySeed=(()=>{')&&app.includes('thematicVocabulary.forEach'),'thematic vocabulary is connected to the dictionary');
assert.ok(app.includes('function ensureVocabulary()')&&app.includes('function render(){ensureVocabulary();'),'both profiles receive the shared bank on first render');
assert.ok(app.includes("activeProfile==='marina'?'speakbase.v1':'speakbase.v1.vladlen'"),'Marina and Vladlen retain separate progress stores');
assert.ok(app.includes('VOCAB_PAGE_SIZE=30')&&app.includes('function showMoreVocabulary()'),'large dictionary is paginated for mobile performance');
assert.ok(app.includes("vocabularyFilter==='due'&&vocabularyDue(w)"),'due filter uses the shared scheduling predicate');
const reviewCtx={today:'2026-11-25',db:{vocabulary:[{id:1,status:'new',interval:0,nextReview:null}]},persist(){},refreshVocabulary(){},shift(date,days){const d=new Date(date+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)}};
vm.createContext(reviewCtx);
for(const [start,end] of [['function vocabularyDue','function vocabularyView'],['function setVocabularyStatus','function addVocabularyWord']]){
 const a=app.indexOf(start),b=app.indexOf(end,a+1);assert.ok(a>=0&&b>a);vm.runInContext(app.slice(a,b),reviewCtx);
}
const word=reviewCtx.db.vocabulary[0];
const due=()=>reviewCtx.vocabularyDue(word);
assert.equal(due(),false,'new words are not overdue');
for(const days of [1,3,7,14,30,60,60]){
 reviewCtx.reviewVocabulary(1,true);
 assert.equal(word.interval,days);
 assert.equal(word.status,days>=30?'learned':'learning');
 assert.equal(due(),false,'future reviews are not due');
 reviewCtx.today=word.nextReview;
 assert.equal(due(),true,'scheduled learned words remain due at '+days+' days');
}
reviewCtx.reviewVocabulary(1,false);
assert.equal(word.status,'learning');assert.equal(word.interval,0);assert.equal(due(),false);
reviewCtx.today=word.nextReview;assert.equal(due(),true);
reviewCtx.setVocabularyStatus(1,'learned');assert.equal(word.interval,30);assert.equal(due(),false);
reviewCtx.today=word.nextReview;assert.equal(due(),true);
assert.equal(reviewCtx.vocabularyDue({status:'learned',nextReview:null}),false,'legacy explicitly mastered cards with no schedule remain unscheduled');
assert.ok(app.includes("(w.status!=='learned'||w.nextReview)?"),'scheduled mastered cards keep review buttons');

assert.ok(app.includes('const intervals=[1,3,7,14,30,60]'),'vocabulary repetition intervals extend gradually');
assert.ok(app.includes('function addVocabularyWord(returnToTask=false)'),'users can add vocabulary manually and from a lesson');
assert.ok(app.includes('function reviewVocabulary'),'spaced repetition controls exist');
assert.ok(app.includes('function vocabularyExample(word)'),'starter expressions have contextual example sentences');
assert.ok(html.includes('id="mobileMenuToggle"')&&html.includes('id="navBackdrop"'),'mobile hamburger controls exist');

console.log('Vocabulary QA passed: 1,840 cards, 1,814 unique expressions, 23 categories; 12 TOEFL Academic Vocabulary Starter cards integrated with examples; separate profile progress, 30-card pagination and 1/3/7/14/30/60-day review.');

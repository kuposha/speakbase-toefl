const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
global.window=global;
require('./grammar-curriculum-bulk-data.js');
const modules=[
  'grammar-a1-topic-banks.cjs','grammar-a2-topic-banks.cjs',
  'grammar-b1-topic-banks.cjs','grammar-b2-topic-banks.cjs',
  'grammar-c1-topic-banks.cjs'
];
const banks=Object.assign({},...modules.map(file=>require('./'+file)));
const lessons=global.grammarBulkLessons;
assert.equal(lessons.length,91,'The generated catalogue must contain 91 new grammar lessons.');
const missingBanks=lessons.filter(lesson=>!banks[lesson.id]);
assert.deepEqual(missingBanks.map(x=>x.id),[],'Every new lesson must have a topic-specific bank.');
const requiredProfile=['label','core','form','selection','contrast','boundary'];
for(const lesson of lessons){
  const bank=banks[lesson.id];
  for(const key of requiredProfile) assert.ok(bank.profile[key],lesson.id+' missing profile field '+key);
  assert.ok(bank.skillTarget || bank.profile.skillTarget,lesson.id+' needs an explicit grammar skill target.');
  assert.ok(bank.drills.length>=7,lesson.id+' needs at least seven topic-specific base drills.');
  assert.equal(lesson.items.filter(x=>!x.open).length,24,lesson.id+' must contain 24 closed questions.');
  assert.equal(lesson.items.filter(x=>x.open).length,1,lesson.id+' must contain one open production task.');
  assert.ok(lesson.sourceRefs?.length,lesson.id+' has no source references.');
  assert.ok(lesson.topicProfile?.core && lesson.topicProfile?.form && lesson.topicProfile?.selection,
    lesson.id+' does not expose its topic-specific lecture profile to the lesson UI.');
  assert.equal(lesson.questionBankSource,'topic-specific-authored',lesson.id+' is using a family fallback bank.');
  assert.ok(String(lesson.sourceVerification||'').includes('draft'),lesson.id+' source verification status is missing.');
  const prompts=new Set();
  for(const item of lesson.items.filter(x=>!x.open)){
    assert.ok(item.prompt && item.prompt.length>15,lesson.id+'/'+item.id+' has a weak/empty prompt.');
    assert.equal(prompts.has(item.prompt.trim().toLowerCase()),false,lesson.id+' repeats a prompt internally.');
    prompts.add(item.prompt.trim().toLowerCase());
    assert.equal(item.options.length,3,lesson.id+'/'+item.id+' needs exactly three options.');
    assert.equal(new Set(item.options).size,3,lesson.id+'/'+item.id+' has duplicate options.');
    assert.ok(item.options.includes(item.answer),lesson.id+'/'+item.id+' answer is not one of the options.');
    const wrong=item.options.filter(option=>option!==item.answer);
    const reasons=wrong.map(option=>item.distractorRationales?.[option]);
    assert.ok(reasons.every(Boolean),lesson.id+'/'+item.id+' has an unexplained distractor.');
    assert.notEqual(reasons[0],reasons[1],lesson.id+'/'+item.id+' uses the same reason for two distractors.');
  }
}
const seen=new Map();
for(const lesson of lessons){
  for(const item of lesson.items.filter(x=>!x.open)){
    const prompt=item.prompt.trim().toLowerCase();
    if(!seen.has(prompt))seen.set(prompt,[]);
    seen.get(prompt).push(lesson.id);
  }
}
const duplicatePrompts=[...seen.entries()].filter(([,ids])=>new Set(ids).size>1);
assert.equal(duplicatePrompts.length,0,'Prompt duplication across lessons: '+JSON.stringify(duplicatePrompts.slice(0,10)));
const positions=[0,0,0];
for(const lesson of lessons){
  for(const item of lesson.items.filter(x=>!x.open)){
    const index=item.options.indexOf(item.answer);
    positions[index]++;
  }
}
assert.ok(Math.max(...positions)-Math.min(...positions)<=3,'Correct-answer positions are unbalanced: '+positions.join('/'));
const markdownDir=path.join(__dirname,'materials','grammar-lessons');
const markdownFiles=fs.readdirSync(markdownDir).filter(name=>name.endsWith('.md'));
assert.equal(markdownFiles.length,91,'All 91 lesson documents must be generated.');
for(const name of markdownFiles){
  const doc=fs.readFileSync(path.join(markdownDir,name),'utf8');
  const headings=[...doc.matchAll(/^## (\d+)\. /gm)].map(match=>Number(match[1]));
  for(const section of [1,2,3,4,5,6,7]) assert.ok(headings.includes(section),name+' misses required lesson section '+section);
  assert.ok((doc.match(/^### 4\.\d+\./gm)||[]).length>=10,name+' is missing detailed theory subsections.');
  assert.ok(doc.length>5000,name+' is not a full lesson document.');
  assert.ok(/draft/i.test(doc),name+' must remain clearly marked as a draft until source review is complete.');
}
const report={
lessons:lessons.length,topicSpecificBanks:Object.keys(banks).length,
closedItems:lessons.reduce((n,l)=>n+l.items.filter(x=>!x.open).length,0),
openTasks:lessons.reduce((n,l)=>n+l.items.filter(x=>x.open).length,0),
crossLessonDuplicatePrompts:duplicatePrompts.length,
correctAnswerPositions:positions,
markdownFiles:markdownFiles.length
};
console.log('Grammar content-integrity QA passed (TOEFL task linking intentionally deferred to Stage 5):');
console.log(JSON.stringify(report,null,2));


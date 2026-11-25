const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const state={grammarLessons:{'B1-01':{contentVersion:'1.0-draft',mode:'results',pos:24,answers:{D1:{value:'old',ok:true}},drafts:{W1:'old draft'}}}};
let saves=0;const ctx={window:{},courseState:()=>state,persist:()=>saves++};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('grammar-lesson-engine.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('grammar-curriculum-bulk-data.js','utf8'),ctx);
const lesson=ctx.window.grammarBulkLessons.find(x=>x.id==='B1-01'),snapshot=JSON.parse(fs.readFileSync('materials/grammar-reviewed/B1-01.json','utf8'));
assert.equal(JSON.stringify(lesson),JSON.stringify(snapshot));
assert.equal(lesson.markdown,fs.readFileSync('materials/grammar-lessons/B1-01.md','utf8'));
assert.equal(lesson.items.filter(x=>!x.open).length,24);
for(const item of lesson.items.filter(x=>!x.open)){assert.ok(!item.answer.includes('___'));assert.ok(!item.prompt.includes('Choose the explanation that best describes this sentence'));}
const engine=ctx.window.GrammarLessonEngine;engine.register(lesson);
const migrated=engine.getState('B1-01');assert.equal(migrated.mode,'theory');assert.equal(migrated.contentVersion,'1.1-draft');assert.equal(Object.keys(migrated.answers).length,0);assert.equal(migrated.previousVersions[0].answers.D1.value,'old');assert.equal(migrated.previousVersions[0].drafts.W1,'old draft');engine.getState('B1-01');assert.equal(migrated.previousVersions.length,1);assert.equal(saves,1);
assert.ok(engine.view('B1-01').includes('Present Perfect Continuous'));
console.log('Reviewed B1-01 runtime snapshot, theory, independent bank and non-destructive version migration passed.');

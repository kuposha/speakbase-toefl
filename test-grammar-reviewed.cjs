const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const state={grammarLessons:{}};
let saves=0;const ctx={window:{},courseState:()=>state,persist:()=>saves++};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('grammar-lesson-engine.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('grammar-curriculum-bulk-data.js','utf8'),ctx);
const engine=ctx.window.GrammarLessonEngine;
const ids=Array.from({length:22},(_,i)=>'B1-'+String(i+1).padStart(2,'0'));
const a2=Array.from({length:18},(_,i)=>'A2-'+String(i+1).padStart(2,'0'));
ids.push(...a2);
const a1=['A1-03','A1-04','A1-06','A1-07','A1-08','A1-09'];
ids.push(...a1);
const log=fs.readFileSync('materials/GRAMMAR-MANUAL-REVIEW-LOG.md','utf8');
const norm=s=>s.replace(/\r\n/g,'\n');
const prompts=new Set(),positions=[0,0,0];
for(const id of ids){
 const lesson=ctx.window.grammarBulkLessons.find(x=>x.id===id);
 assert.ok(lesson,id);
 const snapshot=JSON.parse(fs.readFileSync('materials/grammar-reviewed/'+id+'.json','utf8'));
 assert.equal(JSON.stringify(lesson),JSON.stringify(snapshot),id+' snapshot');
 assert.equal(norm(lesson.markdown),norm(fs.readFileSync('materials/grammar-lessons/'+id+'.md','utf8')),id+' markdown');
 assert.equal(lesson.contentVersion,'1.1-draft',id);
 assert.ok(log.includes('| '+id+' | PARTIAL |'),id+' editorial status');
 assert.equal(lesson.items.filter(x=>!x.open).length,24,id);
 assert.equal(lesson.items.filter(x=>x.open).length,1,id);
 for(const item of lesson.items.filter(x=>!x.open)){
  assert.equal(item.contentVersion,lesson.contentVersion,id);
  assert.ok(item.prompt.trim()&&item.why.trim(),id);
  assert.ok(!item.answer.includes('___'),id);
  assert.ok(!item.prompt.includes('Choose the explanation that best describes this sentence'),id);
  assert.equal(new Set(item.options).size,3,id);
  const pos=item.options.indexOf(item.answer);assert.ok(pos>=0,id);positions[pos]++;
  assert.equal(JSON.stringify(item.accepted),JSON.stringify([item.answer]),id);
  for(const option of item.options.filter(x=>x!==item.answer))assert.ok(item.distractorRationales[option]?.trim(),id+' rationale');
  const prompt=item.prompt.trim().toLowerCase();assert.ok(!prompts.has(prompt),id+' duplicate');prompts.add(prompt);
 }
 const open=lesson.items.find(x=>x.open);assert.ok(open.prompt.trim()&&open.rubric.length>=5,id);
 state.grammarLessons[id]={contentVersion:'1.0-draft',mode:'results',pos:24,answers:{D1:{value:'old',ok:true}},drafts:{W1:'old draft'}};
 engine.register(lesson);
 const before=saves,migrated=engine.getState(id);
 assert.equal(migrated.mode,'theory',id);assert.equal(migrated.contentVersion,'1.1-draft',id);
 assert.equal(Object.keys(migrated.answers).length,0,id);
 assert.equal(migrated.previousVersions[0].answers.D1.value,'old',id);
 assert.equal(migrated.previousVersions[0].drafts.W1,'old draft',id);
 engine.getState(id);assert.equal(migrated.previousVersions.length,1,id);assert.equal(saves,before+1,id);
 assert.ok(engine.view(id).includes(lesson.title),id+' render');
}
assert.equal(prompts.size,ids.length*24);
assert.equal(positions.reduce((a,b)=>a+b,0),ids.length*24);
console.log('Reviewed runtime snapshots: '+ids.length+' lessons, '+prompts.size+' closed tasks, '+ids.length+' open rubrics; non-destructive version migration passed. Answer positions: '+positions.join('/'));

'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const T=require('./grammar-toefl-links.js');
const win={};vm.runInContext(fs.readFileSync('grammar-curriculum-bulk-data.js','utf8'),vm.createContext({window:win}));
const lessons=win.grammarBulkLessons;
const ids=lessons.map(l=>l.id).concat(['A1-01','A1-02','A1-05']);
assert.equal(new Set(ids).size,94,'94 grammar topics expected');
const examSource=fs.readdirSync('.').filter(f=>/^exam-.*\.js$/.test(f)).map(f=>fs.readFileSync(f,'utf8')).join('\n');
for(const type of Object.keys(T.TYPES))assert.ok(examSource.includes(type),'task type "'+type+'" must exist in the exam banks');
const title=id=>(lessons.find(l=>l.id===id)||{title:''}).title;
for(const id of ids){
  const list=T.links(id,title(id)),level=T.levelOf(id);
  for(const skill of ['Reading','Listening','Writing','Speaking'])assert.ok(list.some(x=>x.skill===skill),id+' has no '+skill+' link');
  assert.ok(list.every(x=>T.TYPES[x.type]&&T.TYPES[x.type][0]===x.skill),id+' link names an unknown task type');
  if(level<2)assert.ok(!list.some(x=>['Read an Academic Passage','Academic Talk','Write for an Academic Discussion'].includes(x.type)),id+' is below B1 but links an academic-only format');
}
for(const lesson of lessons){
  assert.deepEqual(Array.from(lesson.toeflLinks),T.linkStrings(lesson.id,lesson.title),lesson.id+' toeflLinks drifted from the map (run apply-toefl-links.cjs and the builder)');
  assert.ok(!lesson.toeflLinks.some(x=>/tense\/aspect|clause structure, reference/.test(x)),lesson.id+' still has a generic description instead of a task type');
}
const a218=T.linkStrings('A2-18',title('A2-18'));
assert.ok(a218.includes('Reading: Complete the Words')&&a218.includes('Listening: Conversation')&&a218.includes('Writing: Build a Sentence'),'A2-18 phrasal verbs mapping: '+a218);
assert.ok(T.linkStrings('B2-04',title('B2-04')).includes('Reading: Read an Academic Passage'),'passive topics belong to academic reading');
assert.ok(T.linkStrings('A1-16',title('A1-16')).includes('Listening: Choose a Response'),'imperatives map to short responses');
const html=T.panelHtml('A2-18',true);
assert.ok([3,1,2,0].every(skill=>html.includes("GrammarToefl.startTopic('A2-18',"+skill+")")),'panel opens four concrete topic tasks');
const contexts=require('./grammar-toefl-topic-data.js');assert.equal(Object.keys(contexts).length,94);for(const id of ids){const c=contexts[id];assert.ok(c,id);for(const pair of [c.reading,c.listening]){assert.equal(pair.length,6,id);assert.equal(new Set(pair.slice(2,5)).size,3,id);assert.ok(pair.every(x=>x.trim().length>0),id);}assert.notEqual(c.reading[0],c.listening[0],id+' distinct source');}
assert.ok(!T.panelHtml('A2-18',false).includes('onclick'),'daily revisit panel has no buttons');
console.log('TOEFL map: 94 topics x 4 skills, real task types, no drift from reviewed data; A2-18 checked.');

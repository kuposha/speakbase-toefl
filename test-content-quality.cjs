'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});for(const n of ['exam-reading-academic.js','exam-reading-data.js','exam-listening-data.js','exam-listening-extra.js','exam-listening-init.js','exam-writing-data.js','exam-speaking-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,n),'utf8'),c,{filename:n});
const [reading,listening,writing,speaking]=vm.runInContext('[readingPracticeForms,listeningPracticeForms,writingPracticeForms,oralPracticeForms]',c);
const typeCount=b=>b.flat().reduce((m,q)=>(m[q.type]=(m[q.type]||0)+1,m),{});
assert.equal(reading.length,24);assert.equal(listening.length,24);assert.equal(writing.length,24);assert.equal(speaking.length,24);
const rt=typeCount(reading),lt=typeCount(listening),wt=typeCount(writing);
assert.deepEqual(rt,{'Complete the Words':720,'Read in Daily Life':120,'Read an Academic Passage':360});
assert.deepEqual(lt,{'Listen and Choose a Response':408,'Listen to a Conversation':240,'Listen to an Announcement':192,'Listen to an Academic Talk':288});
assert.deepEqual(wt,{'Build a Sentence':240,'Write an Email':24,'Write for an Academic Discussion':24});
for(const [label,bank] of [['Reading',reading],['Listening',listening]]){const qs=bank.flat().filter(q=>q.options);const dist=[0,0,0,0];for(const q of qs){assert.equal(new Set(q.options).size,4,label+' duplicated distractors');assert.ok(q.options.includes(q.answer),label+' answer absent from options');dist[q.options.indexOf(q.answer)]++;}assert.ok(Math.max(...dist)-Math.min(...dist)<=15,label+' answer positions unbalanced');console.log(label+' key-position counts '+dist.join('/'));}
for(const [label,bank] of [['Reading',reading],['Listening',listening],['Writing',writing]]){for(const q of bank.flat()){assert.ok(q.ask?.trim()&&q.source?.trim()&&q.why?.trim(),label+' missing prompt/source/explanation');}const tuples=bank.flat().map(q=>[q.type,q.ask,q.source,q.answer||'',(q.tokens||[]).join(' ')].join('|'));assert.equal(new Set(tuples).size,tuples.length,label+' duplicate full prompt/source');}
const sentence=writing.flat().filter(q=>q.tokens);assert.equal(sentence.length,240);assert.ok(sentence.every(q=>q.tokens.length>=4&&q.tokens.join(' ')!==q.answer));
const emails=writing.flat().filter(q=>q.type==='Write an Email'),discussions=writing.flat().filter(q=>q.type==='Write for an Academic Discussion');assert.equal(new Set(emails.map(q=>q.source)).size,24);assert.equal(new Set(discussions.map(q=>q.source)).size,24);
const spoken=speaking.flatMap(f=>f.slice(1));assert.equal(spoken.length,264);assert.equal(new Set(spoken).size,264);let wav=0;for(let f=1;f<=24;f++)for(let j=1;j<=11;j++){const b=fs.readFileSync(path.join(__dirname,'audio','exam-speaking',f+'-'+j+'.wav'));assert.equal(b.toString('ascii',0,4),'RIFF');wav++;}
let mp3=0;for(const q of listening.flat()){const b=fs.readFileSync(path.join(__dirname,q.audio));assert.ok(b.length>1024);assert.ok(b.toString('ascii',0,3)==='ID3'||(b[0]===255&&(b[1]&224)===224));mp3++;}
console.log('QA passed: 24 forms; Reading '+reading.flat().length+' items; Listening '+listening.flat().length+' items/'+mp3+' audio files; Writing '+writing.flat().length+' items with 24 unique prompts per task; Speaking '+spoken.length+' items/'+wav+' WAV files.');


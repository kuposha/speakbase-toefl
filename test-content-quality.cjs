'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});
for(const n of ['exam-reading-academic.js','exam-reading-data.js','exam-listening-data.js','exam-listening-extra.js','exam-listening-init.js','exam-writing-data.js','exam-speaking-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,n),'utf8'),c,{filename:n});
const [reading,listening,writing,speaking]=vm.runInContext('[readingPracticeForms,listeningPracticeForms,writingPracticeForms,oralPracticeForms]',c);
const typeCount=b=>b.flat().reduce((m,q)=>(m[q.type]=(m[q.type]||0)+1,m),{});
const words=text=>(String(text||'').match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length;
const groupBySource=items=>[...new Map(items.map(q=>[q.source,items.filter(x=>x.source===q.source)])).values()];
assert.equal(reading.length,24);assert.equal(listening.length,24);assert.equal(writing.length,24);assert.equal(speaking.length,24);
const rt=typeCount(reading),lt=typeCount(listening),wt=typeCount(writing);
assert.deepEqual(rt,{'Complete the Words':720,'Read in Daily Life':120,'Read an Academic Passage':360});
assert.deepEqual(lt,{'Listen and Choose a Response':408,'Listen to a Conversation':240,'Listen to an Announcement':192,'Listen to an Academic Talk':288});
assert.deepEqual(wt,{'Build a Sentence':240,'Write an Email':24,'Write for an Academic Discussion':24});
const academicQuestions=reading.flat().filter(q=>q.type==='Read an Academic Passage');
const questionTypes={main:0,inference:0,vocab:0,purpose:0,detail:0};
for(const q of academicQuestions){const ask=q.ask.toLowerCase();if(/best summarizes/.test(ask))questionTypes.main++;else if(/can be inferred/.test(ask))questionTypes.inference++;else if(/word .*closest in meaning/.test(ask))questionTypes.vocab++;else if(/why does the author mention/.test(ask))questionTypes.purpose++;else questionTypes.detail++;}
assert.deepEqual(questionTypes,{main:72,inference:72,vocab:72,purpose:72,detail:72});
const cloze=groupBySource(reading.flat().filter(q=>q.type==='Complete the Words'));
const daily=groupBySource(reading.flat().filter(q=>q.type==='Read in Daily Life'));
const academic=groupBySource(reading.flat().filter(q=>q.type==='Read an Academic Passage'));
assert.equal(cloze.length,72);assert.equal(daily.length,48);assert.equal(academic.length,72);
for(const [i,group] of cloze.entries()){
 const source=group[0].source;
 assert.equal(group.length,10,'Cloze passage '+(i+1)+' must contain 10 items');
 assert.ok(words(source)>=70&&words(source)<=100,'Cloze passage '+(i+1)+' word count '+words(source));
 assert.equal((source.match(/\(\d+\)\s+[A-Za-z]+_+/g)||[]).length,10,'Cloze passage '+(i+1)+' gap count');
}
for(const [i,group] of daily.entries()){
 assert.ok(group.length===2||group.length===3,'Daily text '+(i+1)+' must have 2-3 questions');
 assert.ok(words(group[0].source)>=15&&words(group[0].source)<=150,'Daily text '+(i+1)+' word count');
}
for(const [i,group] of academic.entries()){
 assert.equal(group.length,5,'Academic passage '+(i+1)+' must have 5 questions');
 assert.ok(words(group[0].source)>=180&&words(group[0].source)<=220,'Academic passage '+(i+1)+' word count '+words(group[0].source));
}
for(const [label,bank] of [['Reading',reading],['Listening',listening]]){
 const qs=bank.flat().filter(q=>q.options),dist=[0,0,0,0];
 for(const q of qs){assert.equal(new Set(q.options).size,4,label+' duplicated distractors');assert.ok(q.options.includes(q.answer),label+' answer absent from options');dist[q.options.indexOf(q.answer)]++;}
 assert.ok(Math.max(...dist)-Math.min(...dist)<=15,label+' answer positions unbalanced');
 console.log(label+' key-position counts '+dist.join('/'));
}
for(const [label,bank] of [['Reading',reading],['Listening',listening],['Writing',writing]]){
 for(const q of bank.flat())assert.ok(q.ask?.trim()&&q.source?.trim()&&q.why?.trim(),label+' missing prompt/source/explanation');
 const tuples=bank.flat().map(q=>[q.type,q.ask,q.source,q.answer||'',(q.tokens||[]).join(' ')].join('|'));
 assert.equal(new Set(tuples).size,tuples.length,label+' duplicate full prompt/source');
}
const sentence=writing.flat().filter(q=>q.tokens);
assert.equal(sentence.length,240);assert.ok(sentence.every(q=>q.tokens.length>=4&&q.tokens.join(' ')!==q.answer));
const emails=writing.flat().filter(q=>q.type==='Write an Email'),discussions=writing.flat().filter(q=>q.type==='Write for an Academic Discussion');
assert.equal(new Set(emails.map(q=>q.source)).size,24);assert.ok(emails.every(q=>words(q.source)>=25&&words(q.source)<=50),'Email scenario length');assert.equal(new Set(discussions.map(q=>q.source)).size,24);assert.ok(discussions.every(q=>words(q.source)>=80&&words(q.source)<=130),'Academic Discussion prompt length');
const spoken=speaking.flatMap(f=>f.slice(1));
assert.equal(spoken.length,264);assert.equal(new Set(spoken).size,264);
let wav=0;
for(let f=1;f<=24;f++)for(let j=1;j<=11;j++){const b=fs.readFileSync(path.join(__dirname,'audio','exam-speaking',f+'-'+j+'.wav'));assert.equal(b.toString('ascii',0,4),'RIFF');wav++;}
let mp3=0;
for(const q of listening.flat()){const b=fs.readFileSync(path.join(__dirname,q.audio));assert.ok(b.length>1024);assert.ok(b.toString('ascii',0,3)==='ID3'||(b[0]===255&&(b[1]&224)===224));mp3++;}
console.log('QA passed: 24 forms; 72 cloze passages (70-100 words, 10 gaps); 48 daily-life texts (2-3 questions each); 72 academic passages (180-220 words, 5 questions each); Listening '+listening.flat().length+' items/'+mp3+' audio files; Writing '+writing.flat().length+' items; Speaking '+spoken.length+' items/'+wav+' WAV files.');

'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});
for(const name of ['exam-reading-academic.js','exam-reading-data.js','exam-listening-data.js','exam-listening-extra.js','exam-listening-init.js','exam-writing-data.js','exam-speaking-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,name),'utf8'),c,{filename:name});
const banks=vm.runInContext('[readingPracticeForms,listeningPracticeForms,writingPracticeForms,oralPracticeForms.map(row=>row.slice(1))]',c);
const counts=[50,47,12,11],names=['Reading','Listening','Writing','Speaking'];
let complete=0;for(let i=0;i<24;i++)if(banks.every((bank,s)=>bank[i].length===counts[s]))complete++;
for(let s=0;s<4;s++){
 const bank=banks[s];assert.equal(bank.length,24);
 const items=bank.flat(), unique=new Set(items.map(x=>typeof x==='string'?x:JSON.stringify([x.source,x.ask,x.answer||null])));
 assert.equal(unique.size,items.length,names[s]+' duplicated prompt');
 for(const x of items){if(x.options){assert.equal(new Set(x.options).size,4);assert.ok(x.options.includes(x.answer));}if(x.audio){const file=fs.readFileSync(path.join(__dirname,x.audio));assert.ok(file.toString('ascii',0,3)==='ID3'||(file[0]===255&&(file[1]&224)===224),'Invalid MP3: '+x.audio);assert.ok(file.length>1024);}}
 console.log(names[s]+': '+items.length+' distinct items; '+bank.filter(x=>x.length===counts[s]).length+'/24 sections at planned fixed-route length.');
}
for(let f=1;f<=24;f++)for(let j=1;j<=11;j++){const file=fs.readFileSync(path.join(__dirname,'audio','exam-speaking',f+'-'+j+'.wav'));assert.equal(file.toString('ascii',0,4),'RIFF');assert.ok(file.length>2048);}
assert.equal(complete,24,'Every fixed-route form must contain all four sections');
const listeningTypes=['Listen and Choose a Response','Listen to a Conversation','Listen to an Announcement','Listen to an Academic Talk'];
const targets=[17,10,8,12], groupTargets=[17,5,4,3];
const uniqueAudio=new Map(), uniqueSource=new Map();
for(let f=0;f<24;f++){
 const items=banks[1][f];
 for(let t=0;t<4;t++){const subset=items.filter(x=>x.type===listeningTypes[t]);assert.equal(subset.length,targets[t]);assert.equal(new Set(subset.map(x=>x.audio)).size,groupTargets[t]);}
 for(const x of items){assert.ok(x.source.trim()&&x.ask.trim()&&x.why.trim());if(uniqueAudio.has(x.audio))assert.equal(uniqueAudio.get(x.audio),f,'Audio shared across forms');else uniqueAudio.set(x.audio,f);if(uniqueSource.has(x.source))assert.equal(uniqueSource.get(x.source),f,'Transcript reused across forms');else uniqueSource.set(x.source,f);}
}
assert.equal(uniqueAudio.size,696);assert.equal(uniqueSource.size,696);
console.log('Listening: 696 distinct scripts, 17/10/8/12 in every form.');
console.log('Complete fixed-route forms: '+complete+'/24. This is not a claim of ETS adaptive or scoring equivalence.');

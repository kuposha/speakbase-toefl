'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});
for(const n of ['exam-reading-academic.js','exam-reading-data.js','exam-listening-data.js','exam-listening-extra.js','exam-listening-init.js','exam-writing-data.js','exam-speaking-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,n),'utf8'),c,{filename:n});
const [reading,listening,writing,speaking]=vm.runInContext('[readingPracticeForms,listeningPracticeForms,writingPracticeForms,oralPracticeForms]',c);
const typeCount=b=>b.flat().reduce((m,q)=>(m[q.type]=(m[q.type]||0)+1,m),{});
const words=text=>(String(text||'').match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length;
const wordTokens=text=>(String(text||'').match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).map(value=>value.toLowerCase()).sort();
function wavInfo(buffer){let offset=12,format={},dataOffset=0,dataSize=0;while(offset+8<=buffer.length){const id=buffer.toString('ascii',offset,offset+4),size=buffer.readUInt32LE(offset+4);if(id==='fmt ')format={codec:buffer.readUInt16LE(offset+8),channels:buffer.readUInt16LE(offset+10),sampleRate:buffer.readUInt32LE(offset+12),byteRate:buffer.readUInt32LE(offset+16),bits:buffer.readUInt16LE(offset+22)};if(id==='data'){dataOffset=offset+8;dataSize=size;}offset+=8+size+(size%2)}let sum=0,peak=0,count=0;for(let i=dataOffset;i+1<dataOffset+dataSize;i+=2){const sample=buffer.readInt16LE(i);sum+=sample*sample;peak=Math.max(peak,Math.abs(sample));count++;}return {...format,duration:dataSize/format.byteRate,rms:Math.sqrt(sum/count),peak};}
function mp3Duration(file){const buffer=fs.readFileSync(file),bitrates={1:[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320],2:[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160]};let offset=0;if(buffer.toString('ascii',0,3)==='ID3'){const size=((buffer[6]&127)<<21)|((buffer[7]&127)<<14)|((buffer[8]&127)<<7)|(buffer[9]&127);offset=10+size;}let duration=0,frames=0;while(offset+4<buffer.length){if(buffer[offset]!==255||(buffer[offset+1]&224)!==224){offset++;continue;}const version=(buffer[offset+1]>>3)&3,layer=(buffer[offset+1]>>1)&3,bitrateIndex=(buffer[offset+2]>>4)&15,sampleIndex=(buffer[offset+2]>>2)&3,padding=(buffer[offset+2]>>1)&1;if(version===1||layer!==1||bitrateIndex===0||bitrateIndex===15||sampleIndex===3){offset++;continue;}const family=version===3?1:2,bitrate=bitrates[family][bitrateIndex]*1000,baseRate=[44100,48000,32000][sampleIndex],sampleRate=version===3?baseRate:version===2?baseRate/2:baseRate/4,samples=version===3?1152:576,frameLength=Math.floor((version===3?144:72)*bitrate/sampleRate)+padding;if(frameLength<4||offset+frameLength>buffer.length){offset++;continue;}duration+=samples/sampleRate;frames++;offset+=frameLength;}return {duration,frames};}
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
 for(const q of bank.flat()){assert.ok(q.ask?.trim()&&q.source?.trim()&&q.why?.trim(),label+' missing prompt/source/explanation');assert.ok(q.why.trim().length>=20,label+' explanation is too short to teach the answer');}
 const tuples=bank.flat().map(q=>[q.type,q.ask,q.source,q.answer||'',(q.tokens||[]).join(' ')].join('|'));
 assert.equal(new Set(tuples).size,tuples.length,label+' duplicate full prompt/source');
}
const sentence=writing.flat().filter(q=>q.tokens);
assert.equal(sentence.length,240);assert.ok(sentence.every(q=>q.tokens.length>=4&&q.tokens.join(' ')!==q.answer));
for(const [i,q] of sentence.entries())assert.deepEqual(wordTokens(q.tokens.join(' ')),wordTokens(q.answer),'Build a Sentence token pool mismatch at item '+(i+1));
const emails=writing.flat().filter(q=>q.type==='Write an Email'),discussions=writing.flat().filter(q=>q.type==='Write for an Academic Discussion');
assert.equal(new Set(emails.map(q=>q.source)).size,24);assert.ok(emails.every(q=>words(q.source)>=25&&words(q.source)<=50),'Email scenario length');assert.equal(new Set(discussions.map(q=>q.source)).size,24);assert.ok(discussions.every(q=>words(q.source)>=80&&words(q.source)<=130),'Academic Discussion prompt length');
const spoken=speaking.flatMap(f=>f.slice(1));
assert.equal(spoken.length,264);assert.equal(new Set(spoken).size,264);
let wav=0;const wavDurations=[];
for(let f=1;f<=24;f++)for(let j=1;j<=11;j++){const b=fs.readFileSync(path.join(__dirname,'audio','exam-speaking',f+'-'+j+'.wav'));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');const info=wavInfo(b);assert.equal(info.codec,1);assert.equal(info.channels,1);assert.equal(info.sampleRate,16000);assert.equal(info.bits,16);assert.ok(info.duration>=2&&info.duration<=7,'Speaking WAV duration');assert.ok(info.rms>1000&&info.peak>5000,'Speaking WAV must contain audible signal');wavDurations.push(info.duration);wav++;}
const mp3Files=[...new Set(listening.flat().map(q=>q.audio))];assert.equal(mp3Files.length,696);const mp3Stats=new Map();
for(const q of listening.flat()){if(mp3Stats.has(q.audio))continue;const file=path.join(__dirname,q.audio),b=fs.readFileSync(file);assert.ok(b.length>1024);assert.ok(b.toString('ascii',0,3)==='ID3'||(b[0]===255&&(b[1]&224)===224));const info=mp3Duration(file);assert.ok(info.frames>=50,'Listening MP3 frame count');assert.ok(info.duration>=1.5&&info.duration<=70,'Listening MP3 duration');const wpm=words(q.source)/info.duration*60;assert.ok(wpm>=90&&wpm<=230,'Listening audio/text speaking rate '+wpm.toFixed(0)+' WPM');mp3Stats.set(q.audio,{duration:info.duration,wpm,type:q.type});}
const audioSources=new Map(),sourceAudio=new Map();for(const q of listening.flat()){if(audioSources.has(q.audio))assert.equal(audioSources.get(q.audio),q.source,'One listening recording must map to one transcript');else audioSources.set(q.audio,q.source);if(sourceAudio.has(q.source))assert.equal(sourceAudio.get(q.source),q.audio,'One listening transcript must map to one recording');else sourceAudio.set(q.source,q.audio);}assert.equal(audioSources.size,sourceAudio.size);
const mp3=mp3Stats.size,mp3Durations=[...mp3Stats.values()].map(value=>value.duration),mp3Rates=[...mp3Stats.values()].map(value=>value.wpm);
console.log('QA passed: 24 forms; 72 cloze passages (70-100 words, 10 gaps); 48 daily-life texts (2-3 questions each); 72 academic passages (180-220 words, 5 question types balanced); Listening '+listening.flat().length+' items/'+mp3+' MP3 files ('+Math.min(...mp3Durations).toFixed(1)+'-'+Math.max(...mp3Durations).toFixed(1)+' sec; '+Math.min(...mp3Rates).toFixed(0)+'-'+Math.max(...mp3Rates).toFixed(0)+' WPM); Writing '+writing.flat().length+' items (240 exact token pools); Speaking '+spoken.length+' items/'+wav+' WAV files ('+Math.min(...wavDurations).toFixed(1)+'-'+Math.max(...wavDurations).toFixed(1)+' sec, non-silent PCM).');

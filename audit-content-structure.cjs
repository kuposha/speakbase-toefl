const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const c=vm.createContext({});
for(const file of ['exam-reading-academic.js','exam-reading-data.js','exam-listening-data.js','exam-listening-extra.js','exam-listening-init.js','exam-writing-data.js','exam-speaking-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),c,{filename:file});
const [reading,listening,writing,speaking]=vm.runInContext('[readingPracticeForms,listeningPracticeForms,writingPracticeForms,oralPracticeForms]',c);
const words=text=>(String(text||'').match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length;
const unique=items=>[...new Map(items.map(item=>[item.source,item])).values()];
function mp3Duration(file){const b=fs.readFileSync(file);let offset=0;if(b.toString('ascii',0,3)==='ID3'){const size=((b[6]&127)<<21)|((b[7]&127)<<14)|((b[8]&127)<<7)|(b[9]&127);offset=10+size}let seconds=0,frames=0;const rates1=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320],rates2=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160],base=[44100,48000,32000];while(offset+4<b.length){if(b[offset]===255&&(b[offset+1]&224)===224){const version=(b[offset+1]>>3)&3,layer=(b[offset+1]>>1)&3,rateIndex=(b[offset+2]>>4)&15,sampleIndex=(b[offset+2]>>2)&3;if(layer===1&&rateIndex>0&&rateIndex<15&&sampleIndex<3){let sampleRate=base[sampleIndex];if(version===2)sampleRate/=2;else if(version===0)sampleRate/=4;const bitrate=(version===3?rates1:rates2)[rateIndex]*1000,padding=(b[offset+2]>>1)&1,length=Math.floor((version===3?144:72)*bitrate/sampleRate)+padding;if(length<4||offset+length>b.length)break;seconds+=(version===3?1152:576)/sampleRate;frames++;offset+=length;continue}}offset++}return frames?seconds:null;}
const lines=[],warnings=[];
lines.push('TOEFL 2026 CONTENT STRUCTURE AUDIT');
lines.push('Forms: '+reading.length+' Reading / '+listening.length+' Listening / '+writing.length+' Writing / '+speaking.length+' Speaking');
for(let form=0;form<24;form++){
 const counts=[reading[form].length,listening[form].length,writing[form].length,speaking[form].length-1];
 if(counts.join('/')!=='50/47/12/11')warnings.push('Form '+(form+1)+' task counts '+counts.join('/')+' (expected 50/47/12/11)');
}
const cloze=unique(reading.flat().filter(q=>q.type==='Complete the Words'));
const daily=unique(reading.flat().filter(q=>q.type==='Read in Daily Life'));
const academic=unique(reading.flat().filter(q=>q.type==='Read an Academic Passage'));
lines.push('READING unique source texts: cloze='+cloze.length+', daily='+daily.length+', academic='+academic.length);
for(const [label,items] of [['Cloze',cloze],['Daily',daily],['Academic',academic]]){
 const values=items.map(q=>words(q.source));
 const min=Math.min(...values),max=Math.max(...values),avg=values.reduce((a,b)=>a+b,0)/values.length;
 lines.push('  '+label+' words min/avg/max='+min+'/'+avg.toFixed(1)+'/'+max);
}
const clozeBlankCounts=cloze.map(q=>(q.source.match(/\(\d+\)\s+[A-Za-z]+_+/g)||[]).length);
lines.push('  Cloze sources with exactly 10 numbered gaps: '+clozeBlankCounts.filter(n=>n===10).length+'/'+cloze.length);
cloze.forEach((q,i)=>{const n=words(q.source);if(n<70||n>100)warnings.push('Cloze source '+(i+1)+' has '+n+' words (target 70-100)')});
daily.forEach((q,i)=>{const n=words(q.source);if(n<15||n>150)warnings.push('Daily-life source '+(i+1)+' has '+n+' words (target 15-150)')});
academic.forEach((q,i)=>{const n=words(q.source);if(n<180||n>220)warnings.push('Academic passage '+(i+1)+' has '+n+' words (target about 200)')});
const listenGroups=['Listen and Choose a Response','Listen to a Conversation','Listen to an Announcement','Listen to an Academic Talk'];
lines.push('LISTENING scripts by type:');
for(const type of listenGroups){
 const scripts=unique(listening.flat().filter(q=>q.type===type));
 const lengths=scripts.map(q=>words(q.source));
 lines.push('  '+type+': '+scripts.length+' unique clips; words min/avg/max='+Math.min(...lengths)+'/'+(lengths.reduce((a,b)=>a+b,0)/lengths.length).toFixed(1)+'/'+Math.max(...lengths));
 if(type==='Listen to an Announcement')scripts.forEach((q,i)=>{const n=words(q.source);if(n<40||n>85)warnings.push('Announcement '+(i+1)+' has '+n+' words (reference 40-85)')});
 if(type==='Listen to an Academic Talk')scripts.forEach((q,i)=>{const n=words(q.source);if(n<100||n>250)warnings.push('Academic talk '+(i+1)+' has '+n+' words (reference 100-250)')});
}
const listeningAudio=new Set(listening.flat().map(q=>q.audio));
lines.push('  Distinct listening audio paths: '+listeningAudio.size);
for(const type of listenGroups){const clips=[...new Map(listening.flat().filter(q=>q.type===type).map(q=>[q.audio,q])).values()];const rates=clips.map(q=>{const duration=mp3Duration(path.join(__dirname,q.audio));return duration?words(q.source)/duration*60:null}).filter(Number.isFinite);if(rates.length)lines.push('  '+type+' speech rate WPM min/avg/max='+Math.min(...rates).toFixed(0)+'/'+(rates.reduce((a,b)=>a+b,0)/rates.length).toFixed(0)+'/'+Math.max(...rates).toFixed(0));if(type!=='Listen and Choose a Response')clips.forEach((q,i)=>{const duration=mp3Duration(path.join(__dirname,q.audio));if(!duration)warnings.push('Could not parse audio duration: '+q.audio);else if(duration<2||duration>180)warnings.push('Audio duration outlier '+q.audio+': '+duration.toFixed(1)+'s')})}
const writingTypes=['Build a Sentence','Write an Email','Write for an Academic Discussion'];
lines.push('WRITING tasks:');
for(const type of writingTypes){
 const items=writing.flat().filter(q=>q.type===type);
 lines.push('  '+type+': '+items.length+' items; source words min/avg/max='+Math.min(...items.map(q=>words(q.source)))+'/'+(items.reduce((n,q)=>n+words(q.source),0)/items.length).toFixed(1)+'/'+Math.max(...items.map(q=>words(q.source))));
}
const emails=writing.flat().filter(q=>q.type==='Write an Email');
const discussions=writing.flat().filter(q=>q.type==='Write for an Academic Discussion');
lines.push('  Email prompts unique: '+new Set(emails.map(q=>q.source)).size+'/'+emails.length);
lines.push('  Discussion prompts unique: '+new Set(discussions.map(q=>q.source)).size+'/'+discussions.length);
lines.push('SPEAKING scenario progression:');
let repeatWords=[],interviewWords=[];
for(let i=0;i<24;i++){
 const phrases=speaking[i].slice(1);
 const repeats=phrases.slice(0,7).map(words),interviews=phrases.slice(7).map(words);
 repeatWords.push(...repeats);interviewWords.push(...interviews);
 const monotonic=repeats.every((n,j)=>j===0||n>=repeats[j-1]);
 lines.push('  Form '+(i+1)+': repeat '+repeats.join(',')+' words'+(monotonic?'':' [non-monotonic]')+'; interview '+interviews.join(',')+' words');
}
lines.push('  Listen & Repeat word counts min/avg/max='+Math.min(...repeatWords)+'/'+(repeatWords.reduce((a,b)=>a+b,0)/repeatWords.length).toFixed(1)+'/'+Math.max(...repeatWords));
lines.push('  Interview prompt word counts min/avg/max='+Math.min(...interviewWords)+'/'+(interviewWords.reduce((a,b)=>a+b,0)/interviewWords.length).toFixed(1)+'/'+Math.max(...interviewWords));
let wavCount=0,wavDurations=[];
for(let form=1;form<=24;form++)for(let j=1;j<=11;j++){
 const b=fs.readFileSync(path.join(__dirname,'audio','exam-speaking',form+'-'+j+'.wav'));
 let offset=12,sampleRate=0,channels=0,bits=0,byteRate=0,dataSize=0;
 while(offset+8<=b.length){
  const chunk=b.toString('ascii',offset,offset+4),size=b.readUInt32LE(offset+4);
  if(chunk==='fmt '){channels=b.readUInt16LE(offset+10);sampleRate=b.readUInt32LE(offset+12);byteRate=b.readUInt32LE(offset+16);bits=b.readUInt16LE(offset+22)}
  if(chunk==='data'){dataSize=size;break}
  offset+=8+size+(size%2);
 }
 if(byteRate&&dataSize)wavDurations.push(dataSize/byteRate);else warnings.push('Unreadable WAV '+form+'-'+j);
 wavCount++;
 if(sampleRate<16000||channels<1||bits<8)warnings.push('WAV format '+form+'-'+j+' '+sampleRate+'Hz '+channels+'ch '+bits+'bit');
}
lines.push('SPEAKING WAV: '+wavCount+' files; duration seconds min/avg/max='+Math.min(...wavDurations).toFixed(1)+'/'+(wavDurations.reduce((a,b)=>a+b,0)/wavDurations.length).toFixed(1)+'/'+Math.max(...wavDurations).toFixed(1));
lines.push('WARNINGS: '+warnings.length);
lines.push(...warnings.map((warning,i)=>(i+1)+'. '+warning));
lines.push('Limitations: structural and metadata QA only. It does not prove semantic correctness, distractor quality, transcript/audio alignment, or ETS equivalence.');
fs.writeFileSync(path.join(__dirname,'CONTENT-AUDIT.txt'),lines.join('\n')+'\n','utf8');
console.log(lines.join('\n'));

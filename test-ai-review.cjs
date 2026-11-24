const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const values=new Map();
const localStorage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,String(value))};
const fields={aiEndpoint:{value:'http://127.0.0.1:8765'},aiToken:{value:'test-token'},aiConnectionStatus:{textContent:''}};
const writingResult={practice_estimate:4,criteria:{task_fulfilment:4,elaboration:4,organization_register:4,grammar:3,vocabulary:4},strengths:['Clear purpose'],issues:[],next_steps:['Add one specific detail'],disclaimer:'Practice estimate only.'};
const sandbox={
  localStorage,
  document:{getElementById:id=>fields[id]||null},
  location:{protocol:'http:'},
  modal:html=>{sandbox.lastModal=html},
  alert:message=>{sandbox.lastAlert=message},
  db:{h:[
    {q:{skill:2,type:'Write an Email',source:'Write an email to the coordinator.',ask:'Explain the delay and request a new date.'},a:'Dear coordinator, I am writing to explain the delay and request another date.'},
    {q:{skill:0,type:'Take an Interview',source:'Describe a skill you learned.',ask:'What helped you improve?',audioId:'voice-1'},a:'Practice helped me improve.'}
  ],examStudio:{history:[{form:0,answers:{'2-0':{text:'Dear coordinator, I need to change the meeting date.'}}}]}},
  selfReviewMarkup:()=>'<form class="self-review-form"></form>',
  persist:()=>{sandbox.persisted=(sandbox.persisted||0)+1},
  updateReviewSchedule:item=>{sandbox.scheduled=true;sandbox.lastScheduledItem=item},
  examSections:[{skill:3},{skill:1},{skill:2},{skill:0}],
  examItems:()=>[{skill:2,type:'Write an Email',source:'Write an email to the coordinator.',ask:'Explain the delay and request a new date.'}],
  fetch:async()=>({ok:true,json:async()=>writingResult}),
  console,Blob,FormData,Date,Number,String,Math,Object,Array,Set,Map,JSON
};
sandbox.window=sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('ai-review.js','utf8'),sandbox);

assert.equal(typeof sandbox.configureAI,'function');
assert.equal(typeof sandbox.runAutomaticReview,'function');
assert.match(sandbox.selfReviewMarkup('practice',0,'',{skill:2,type:'Write an Email'},{}) ,/ai-review-controls/);
sandbox.configureAI();
assert.match(sandbox.lastModal,/aiEndpoint/);
sandbox.saveAISettings();
assert.equal(localStorage.getItem('speakbase.ai.endpoint'),'http://127.0.0.1:8765');
assert.equal(localStorage.getItem('speakbase.ai.token'),'test-token');

(async()=>{
  let healthRequest;
  sandbox.fetch=async(url,options)=>{healthRequest={url,options};return {ok:true,json:async()=>({language_model_ready:true,token_configured:true})}};
  await sandbox.checkAIConnection();
  assert.equal(healthRequest.url,'http://127.0.0.1:8765/health');
  assert.equal(healthRequest.options.method,'GET');
  assert.ok(fields.aiConnectionStatus.textContent.includes('\u0421\u0435\u0440\u0432\u0438\u0441'));

  sandbox.fetch=async()=>({ok:true,json:async()=>writingResult});
  const output={innerHTML:''};
  const form={dataset:{source:'practice',record:'0',key:''},querySelector:selector=>selector==='.ai-review-output'?output:null};
  const button={disabled:false,textContent:'AI review',closest:()=>form};
  await sandbox.runAutomaticReview(button);
  assert.equal(sandbox.db.h[0].aiReview.practice_estimate,4);
  assert.ok(output.innerHTML.includes('4/5'));
  assert.ok(output.innerHTML.includes('Clear purpose'));
  assert.equal(sandbox.persisted,1);
  assert.equal(sandbox.lastScheduledItem.skill,2);
  assert.equal(button.disabled,false);

  const examOutput={innerHTML:''};
  const examForm={dataset:{source:'exam',record:'0',key:'2-0'},querySelector:selector=>selector==='.ai-review-output'?examOutput:null};
  const examButton={disabled:false,textContent:'AI review',closest:()=>examForm};
  await sandbox.runAutomaticReview(examButton);
  assert.equal(sandbox.db.examStudio.history[0].answers['2-0'].aiReview.practice_estimate,4);
  assert.equal(sandbox.lastScheduledItem.skill,2);
  assert.ok(examOutput.innerHTML.includes('Clear purpose'));

  sandbox.blobGet=async()=>new Blob(['recorded audio'],{type:'audio/webm'});
  let sentFilename='';
  sandbox.fetch=async(url,options)=>{
    if(url.endsWith('/api/speaking')){
      sentFilename=options.body.get('file').name;
      return {ok:true,json:async()=>({practice_estimate:4,task_type:'interview',reliable:true,pronunciation:{scores:{accuracy:80,fluency:72,prosodic:75},unclear_words:['schedule'],audio_quality:{duration:12,snr_db:31,issues:[]}},transcript:'Practice helped me improve.',pronunciation_assessed:true,disclaimer:'Practice only.'})};
    }
    return {ok:true,json:async()=>({})};
  };
  const speakingOutput={innerHTML:''};
  const speakingForm={dataset:{source:'practice',record:'1',key:''},querySelector:selector=>selector==='.ai-review-output'?speakingOutput:null};
  const speakingButton={disabled:false,textContent:'AI review',closest:()=>speakingForm};
  await sandbox.runAutomaticReview(speakingButton);
  assert.equal(sentFilename,'speakbase-recording.webm');
  assert.ok(speakingOutput.innerHTML.includes('75/100'));
  assert.ok(speakingOutput.innerHTML.includes('schedule'));
  assert.equal(sandbox.db.h[1].aiReview.practice_estimate,4);
  assert.equal(sandbox.lastScheduledItem.skill,0);
  console.log('AI review interface QA passed: token-protected health check, Writing, exam-history mapping, Speaking audio upload, prosody display and saved review scheduling.');
})().catch(error=>{console.error(error);process.exitCode=1});

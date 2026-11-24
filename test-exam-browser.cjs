// Run with: node test-exam-browser.cjs. Set NODE_PATH to an installed playwright-core.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright-core');
const root=__dirname;
const server=http.createServer((req,res)=>{
  const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html';
  const file=path.resolve(root,relative);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css','.wav':'audio/wav','.mp3':'audio/mpeg'})[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:process.env.SPEAKBASE_BROWSER||'msedge',headless:true,args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream']});
 const page=await browser.newPage({permissions:['microphone']});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 // No personal account is needed for these isolated exam-runner scenarios.
 await page.route('**/cloud.js*',route=>route.fulfill({contentType:'application/javascript',body:"document.querySelectorAll('[inert]').forEach(el=>el.inert=false)"}));
 await page.goto('http://127.0.0.1:'+server.address().port);
 const navigate=()=>page.getByRole('button',{name:'Пробный TOEFL',exact:true}).click();
 await navigate();
 assert.equal(await page.locator('#app').innerText().then(text=>text.includes('34 tasks, 60 minutes')),false,'legacy 34-task simulation must not be shown beside the 2026 exam studio');
 let answers=0,forms=0,sections=0,oralFiles=0;
 const sounds=await page.evaluate(()=>oralPracticeForms.flatMap((row,i)=>examItems(i,3).map(x=>x.audio)));
 assert.equal(new Set(sounds).size,264);
 for(const sound of sounds){
   const data=fs.readFileSync(path.join(root,sound));assert.equal(data.toString('ascii',0,4),'RIFF');assert.ok(data.length>2048);oralFiles++;
 }
 // Browser audio playback, recording permission, MediaRecorder, playback after reload.
 await page.locator('#examChoices button').filter({hasText:'Speaking'}).click();
 await page.locator('#box audio').first().evaluate(async el=>{await el.play();el.pause()});
 await page.locator('#examMic').click();
 await page.waitForFunction(()=>document.querySelector('#examMessage')?.textContent==='Идёт запись.');
 await page.waitForTimeout(250);await page.locator('#examMic').click();
 await page.waitForFunction(()=>document.querySelector('#examOwnAudio')?.getAttribute('src')?.startsWith('blob:'));
 await page.reload();await navigate();await page.getByRole('button',{name:'Продолжить сохранённую попытку'}).click();
 await page.waitForFunction(()=>document.querySelector('#examOwnAudio')?.getAttribute('src')?.startsWith('blob:'));
 await page.locator('#examOwnAudio').evaluate(async el=>{await el.play();el.pause()});
 await page.getByRole('button',{name:'Сохранить и продолжить'}).click();
 await page.getByRole('button',{name:'Завершить попытку досрочно'}).click();
 await page.getByRole('button',{name:'Завершить и показать разбор'}).click();
 await page.locator('summary').first().click();
 await page.getByRole('button',{name:'Моя запись'}).click();
 await page.locator('details[open] audio').evaluate(async el=>{await el.play();el.pause()});await page.locator('#close').click();
 // Real browser playback of a local Listening recording and interactive Writing controls.
 await page.locator('#examChoices button').filter({hasText:'Listening'}).click();
 await page.locator('#box audio').first().evaluate(async el=>{await el.play();el.pause();if(!el.duration||!Number.isFinite(el.duration))throw Error('Audio did not decode');});
 await page.getByRole('button',{name:'Завершить попытку досрочно'}).click();
 await page.getByRole('button',{name:'Завершить и показать разбор'}).click();
 await page.locator('#close').click();
 await page.locator('#examChoices button').filter({hasText:'Writing'}).click();
 const word=await page.locator('[data-exam-token]').first().innerText();
 await page.locator('[data-exam-token]').first().click();
 assert.equal(await page.locator('#examAnswer').inputValue(),word);
 assert.ok(await page.locator('[data-exam-token]').first().isDisabled());
 await page.locator('#examClearWords').click();
 assert.equal(await page.locator('#examAnswer').inputValue(),'');
 await page.getByRole('button',{name:'Завершить попытку досрочно'}).click();
 await page.getByRole('button',{name:'Завершить и показать разбор'}).click();
 await page.locator('#close').click();
 // Full-mock Listening playback is one-use, including after reopening.
 await page.locator('#examChoices button').filter({hasText:'Все четыре секции'}).click();
 await page.evaluate(()=>{examStudioState().active.deadline=Date.now()-1;persist()});
 await page.waitForFunction(()=>{const a=examStudioState().active;return a&&a.sections[a.section]===1});
 await page.locator('#examPlayOnce').click();
 await page.waitForFunction(()=>document.querySelector('#examPlayOnce')?.disabled&&Object.keys(examStudioState().active.playedAudio||{}).length>0);
 await page.reload();await navigate();
 await page.getByRole('button',{name:'Продолжить сохранённую попытку'}).click();
 assert.ok(await page.locator('#examPlayOnce').isDisabled());
 await page.getByRole('button',{name:'Завершить попытку досрочно'}).click();
 await page.getByRole('button',{name:'Завершить и показать разбор'}).click();
 await page.locator('#close').click();
 // Submit correct and incorrect answers through actual DOM controls for each available form.
 for(let f=0;f<24;f++){
   await page.selectOption('#examVariant',String(f));
   const counts=await page.evaluate(f=>examCounts(f),f);
   const full=counts.every((n,i)=>n===[50,47,12,11][i]);
   const modes=full?[-1]:counts.flatMap((n,i)=>n?[i]:[]);
   for(const section of modes){
     const label=section===-1?'Все четыре секции':['Reading','Listening','Writing','Speaking'][section];
     await page.locator('#examChoices button').filter({hasText:label}).click();
     const finished=await page.evaluate(async()=>{
       let completed=0;let expectedCorrect=0,expectedWrong=0;
       while(examStudioState().active){
         const a=examStudioState().active,s=a.sections[a.section],item=examItems(a.form,s)[a.pos];
         if(!document.querySelector('#examClock'))throw Error('Missing timer at '+a.pos);
         const input=document.querySelector('#examAnswer'), answer=Array.isArray(item.answer)?item.answer[0]:item.answer;
         const correct=completed%4!==0;
         if(input){input.value=answer?(correct?answer:'unrelated'):('Sample answer '+completed);input.dispatchEvent(new Event('input',{bubbles:true}))}
         else {
           const pick=item.options.findIndex(v=>correct?v===answer:v!==answer);
           const radio=document.querySelectorAll('[name=examAnswer]')[pick];if(!radio)throw Error('No valid option: '+JSON.stringify(item));radio.click();
         }
         if(answer){if(correct)expectedCorrect++;else expectedWrong++}
         const done=[...document.querySelectorAll('#box button')].find(b=>b.textContent==='Сохранить и продолжить');done.click();
         await new Promise(resolve=>setTimeout(resolve,0));completed++;
         if(completed>120)throw Error('Did not terminate');
       }
       const last=examStudioState().history.at(-1),results=Object.values(last.answers);
       if(results.filter(r=>r.correct===true).length!==expectedCorrect||results.filter(r=>r.correct===false).length!==expectedWrong)throw Error('Incorrect scoring');
       if(document.querySelectorAll('#box details').length!==completed)throw Error('Missing review');
       return completed;
     });
     assert.equal(finished,section===-1?120:counts[section]);answers+=finished;sections+=section===-1?4:1;
     await page.locator('#close').click();
     await page.selectOption('#examVariant',String(f));
   }
   if(full)forms++;
 }
 // Simulate a genuine elapsed wall clock after leaving a section and reopening.
 await page.locator('#examChoices button').filter({hasText:'Speaking'}).click();
 await page.evaluate(()=>{examStudioState().active.deadline=Date.now()-1;persist()});
 await page.reload();await navigate();await page.getByRole('button',{name:'Продолжить сохранённую попытку'}).click();
 await page.waitForFunction(()=>!examStudioState().active);
 assert.equal(await page.locator('#box details').count(),11);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({fullFormsCompleted:forms,sectionsCompleted:sections,answersThroughUI:answers,speakingAudioFiles:oralFiles,mediaRecorder:'synthetic input recorded, persisted, reloaded, decoded',expiry:'passed',browserErrors:errors},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{server.close();if(process.exitCode)process.exit(process.exitCode)});

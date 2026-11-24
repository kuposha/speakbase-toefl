'use strict';
const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const http=require('node:http');

(async()=>{
  const root=__dirname;
  const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
  const server=http.createServer(async(req,res)=>{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(root,pathname==='/'?'index.html':'.'+pathname);
    if(!file.startsWith(root)){res.writeHead(403).end();return;}
    try{const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(body);}
    catch{if(!res.headersSent)res.writeHead(404).end();else res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1280,height:850}});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
    await page.route('https://cdn.jsdelivr.net/**',route=>route.fulfill({contentType:'text/javascript',body:''}));
    await page.goto('http://127.0.0.1:'+server.address().port);
    const banks=await page.evaluate(()=>{
      const result={};
      for(const skill of [0,1,2,3,4]){
        const items=buildPracticeSet({skill,topic:'Campus life',level:'B2',min:15});
        result[skill]={count:items.length,uniquePrompts:new Set(items.map(x=>x.ask)).size,uniqueSources:new Set(items.map(x=>x.source).filter(Boolean)).size};
      }
      return result;
    });
    for(const skill of [0,1,2,3,4])assert.equal(banks[skill].count,10,'skill '+skill+' should build ten tasks');
    assert.equal(banks[1].uniqueSources,10,'Listening set must use ten different recordings');

    await page.evaluate(()=>start({skill:1,topic:'',level:'B2',min:15}));
    const first=await page.evaluate(()=>({source:db.draft.q.source,ask:db.draft.q.ask,model:db.draft.q.model,options:db.draft.q.opts}));
    assert.equal(await page.locator('#unlock').isDisabled(),true,'Listening should require playback before continuing');
    await page.locator('#box button:not(#unlock)').click();
    assert.equal(await page.locator('#unlock').isDisabled(),false,'playback should unlock the question');
    await page.locator('#unlock').click();
    assert.equal(await page.locator('#answer option:not([value=""])').count(),4,'Listening question should show four answer choices');
    await page.locator('#answer').selectOption({label:first.model});
    await page.locator('#answerForm button.primary').click();
    assert.ok(await page.locator('.feedback-status').isVisible(),'answer feedback should appear');
    await page.locator('#box button.primary').click();
    const second=await page.evaluate(()=>({index:db.draft.index,source:db.draft.q.source,ask:db.draft.q.ask}));
    assert.equal(second.index,1,'next task should advance the session');
    assert.notEqual(second.source,first.source,'next Listening task should use a different recording');
    // Partial topic match is disclosed before the session starts.
    await page.evaluate(()=>start({skill:0,topic:'Technology',level:'B1',min:15}));
    const noticeText=await page.locator('#box').innerText();
    assert.ok(noticeText.includes('нашлось только 3 из 10'),'partial topic match must be disclosed to the learner');
    await page.locator('#box button.primary').click();
    assert.equal(await page.evaluate(()=>db.draft.items.filter(x=>x.topicMatch).length),3,'draft keeps three on-topic Speaking tasks');
    // Practice form: topics come from the bank, level is labelled as a target where the bank has no CEFR markup.
    await page.evaluate(()=>config(1));
    assert.ok(await page.locator('#tp option').count()>50,'Listening topic list comes from the bank');
    assert.equal(await page.locator('#tp option').first().getAttribute('value'),'','mixed practice is the default');
    assert.ok((await page.locator('#lv').locator('xpath=..').innerText()).includes('Целевой уровень'),'Listening level is a target');
    assert.ok((await page.locator('#practiceHint').innerText()).includes('не размечены по CEFR'),'hint explains missing CEFR markup');
    const names=await page.evaluate(()=>skills.slice());
    await page.selectOption('#sk',names[2]);
    assert.ok((await page.locator('#tp').locator('xpath=..').innerText()).includes('Тип задания'),'Writing topic select is a task type');
    assert.ok((await page.locator('#lv').locator('xpath=..').innerText()).startsWith('Уровень'),'Writing level is marked in the bank');
    await page.selectOption('#sk',names[4]);
    assert.equal(await page.locator('#tp').isDisabled(),true,'Grammar topic is determined by level');
    assert.ok((await page.locator('#practiceHint').innerText()).includes('Grammar подбирается по уровню'));
    assert.deepEqual(errors,[],'practice session should not create browser errors');
    console.log('Practice browser QA passed:',JSON.stringify(banks),'Listening playback gate, answer submission, feedback and next-recording rotation.');
    await context.close();
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1});

'use strict';
const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'});
  try{
    for(const width of [1440,390]){
      const context=await browser.newContext({viewport:{width,height:900}});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+m.location().url);});
      page.on('requestfailed',r=>errors.push(r.failure()?.errorText+' '+r.url().split('?')[0]));
      page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url().split('?')[0]);});
      const url=process.env.SPEAKBASE_URL||'https://kuposha.github.io/speakbase-toefl/';
      const response=await page.goto(url,{waitUntil:'networkidle'});
      console.log(width,url,response.status(),await page.title());
      assert.equal(response.status(),200);
      assert.ok(await page.evaluate(()=>typeof examCounts==="function" && Array.from({length:24},(_,i)=>examCounts(i).join(",")).every(x=>x==="50,47,12,11")), "Published bank must contain all 24 forms");
      assert.ok(await page.locator('script[src*="app.js?v=20261124-vocabulary-personal"]').count(), 'published app must load the personal vocabulary build');
      assert.equal(await page.evaluate(()=>typeof addVocabularyWord),'function','published app must expose the vocabulary capture flow');
      assert.ok(await page.evaluate(async()=>{const s=document.querySelector('script[src*="course.js"]');const r=await fetch(s.src);return r.ok&&(await r.text()).includes("addVocabularyWord('lesson')")}), 'published daily lessons must include the save-word action');
      assert.ok(await page.locator('.auth-gate input[type=email]').isVisible());
      assert.ok(await page.locator('.auth-gate input[type=password]').isVisible());
      assert.ok(await page.locator('main').evaluate(e=>e.inert));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
      assert.ok(await page.evaluate(()=>window.isSecureContext&&!!navigator.mediaDevices?.getUserMedia));
      await page.locator('.auth-gate button[type=submit],.auth-gate button.primary').first().click();
      assert.ok(await page.locator('.auth-gate form').evaluate(f=>!f.checkValidity()));
      assert.deepEqual(errors,[]);
      await context.close();
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

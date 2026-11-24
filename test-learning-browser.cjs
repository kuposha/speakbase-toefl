const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const http=require('node:http');
const root=__dirname;
const resources=new Set(['/','/index.html','/style.css','/mobile.css','/vendor/supabase.js']);
(async()=>{
  for(const name of await fs.readdir(root))if(/^[\w.-]+\.js$/.test(name))resources.add('/'+name);
  const server=http.createServer(async(req,res)=>{
    const pathname=new URL(req.url,'http://localhost').pathname;
    if(!resources.has(pathname)){res.writeHead(404).end();return}
    const file=path.join(root,pathname==='/'?'index.html':pathname);
    try{const ext=path.extname(file);res.writeHead(200,{'Content-Type':ext==='.js'?'text/javascript':ext==='.css'?'text/css':'text/html'}).end(await fs.readFile(file))}
    catch{res.writeHead(404).end()}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
  try{
    const page=await browser.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const origin='http://127.0.0.1:'+server.address().port;
    await page.route(origin+'/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
    await page.goto(origin);
    await page.waitForFunction(()=>typeof learningInsights==='function'&&typeof examItems==='function');
    const practiceIndex=await page.evaluate(()=>{
      db.h.push({q:{skill:2,title:'Write an Email',topic:'QA',ask:'Write an email',model:'Dear team, thank you.'},a:'Dear team',correct:null,issues:[],day:'2026-11-24'});
      const i=db.h.length-1;review(i);return i;
    });
    assert.equal(await page.locator('.self-review-form').count(),1);
    for(let i=0;i<5;i++)await page.locator('.self-review-form select').nth(i).selectOption(String(i%3));
    await page.locator('.self-review-form textarea').fill('Improve the example and tone.');
    await page.locator('.self-review-form button[type=submit]').click();
    assert.equal(await page.evaluate(i=>db.h[i].selfReview.score,practiceIndex),4);
    const examSetup=await page.evaluate(()=>{
      examStudioState();
      const writing=examItems(0,2),writePos=writing.findIndex(item=>item.answer==null&&!item.tokens&&!item.options);
      const speaking=examItems(0,3),speakPos=speaking.findIndex(item=>item.type==='Take an Interview');
      if(writePos<0||speakPos<0)throw Error('Open writing/speaking tasks not found');
      const attempt={title:'QA rubric',date:'2026-11-24',form:0,sections:[2,3],answers:{}};
      attempt.answers['2-'+writePos]={text:'My writing response.',correct:null};
      attempt.answers['3-'+speakPos]={text:'My speaking response.',correct:null};
      db.examStudio.history.push(attempt);
      examReview(db.examStudio.history.length-1);
      return {writePos,speakPos};
    });
    assert.equal(await page.locator('.self-review-form').count(),2);
    for(let formIndex=0;formIndex<2;formIndex++){
      const form=page.locator('.self-review-form').nth(formIndex);
      await form.evaluate(el=>{const details=el.closest('details');if(details)details.open=true});
      for(let i=0;i<5;i++)await form.locator('select').nth(i).selectOption('1');
      await form.locator('button[type=submit]').click();
    }
    const saved=await page.evaluate(({writePos,speakPos})=>{
      const a=db.examStudio.history[0].answers;
      return [a['2-'+writePos].selfReview.score,a['3-'+speakPos].selfReview.score,learningInsights().weak.length];
    },examSetup);
    assert.deepEqual(saved.slice(0,2),[5,5]);
    await page.evaluate(()=>{page=0;render()});
    assert.ok(await page.locator('.learning-plan').isVisible());
    assert.equal(errors.length,0,errors.join('; '));
    console.log('Learning browser QA passed: practice and exam self-review persist, weak-skill analytics render, zero page errors.');
  }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

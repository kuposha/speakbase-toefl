'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright-core');
(async()=>{
  const server=http.createServer(async(req,res)=>{
    const p=new URL(req.url,'http://localhost').pathname,file=path.join(__dirname,p==='/'?'index.html':p);
    try{const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':{'.js':'text/javascript','.css':'text/css','.html':'text/html'}[path.extname(file)]||'application/octet-stream'}).end(data)}catch{res.writeHead(404).end()}
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route(origin+'/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(el=>el.inert=false)"}));
    await page.goto(origin);
    await page.evaluate(()=>{localStorage.clear();localStorage.setItem('sb.active','marina')});
    await page.reload();
    const r=await page.evaluate(()=>{
      const out={},lessonId='B2-21',next='B2-20';
      const dateOf=id=>{for(let t=calendarStart;t<=calendarEnd;t+=calendarDay){const d=new Date(t).toISOString().slice(0,10);if(dayProgram(d).grammarId===id)return d}};
      const date=dateOf(lessonId);pick(date);startScheduledLesson();
      const s=courseState().session,idx=s.items.findIndex(i=>i.grammarItemId),item=s.items[idx];
      s.pos=idx;s.draft=item.choices.find(c=>!(item.accepted||[item.model]).includes(c));
      checkLesson();
      const key='grammar::'+lessonId+'::'+item.grammarItemId;
      out.itemId=item.grammarItemId;out.ask=item.ask;
      out.record=db.h[db.h.length-1].q;
      out.mirror=courseState().grammarLessons?.[lessonId]?.answers?.[item.grammarItemId];
      out.schedule={...db.reviewSchedule?.[key]};
      out.weak=courseState().weak.some(w=>w.ask===item.ask);
      out.answered=Object.keys(GrammarLessonEngine.getState(lessonId).answers).length;
      const nd=dateOf(next),nu=dayProgram(nd).unit;
      const build=(id,d,u)=>buildLesson({lessonDate:d,unit:u,grammarId:id,last:'Writing',minutes:110});
      out.warmNext=build(next,nd,nu).some(i=>i.title==='Из прошлых ошибок'&&i.ask===item.ask&&i.grammarItemId===item.grammarItemId);
      out.warmSame=build(lessonId,date,dayProgram(date).unit).some(i=>i.title==='Из прошлых ошибок');
      courseState().weak=[];db.reviewSchedule[key].nextDue=Date.now()-1000;
      out.warmDue=build(next,nd,nu).some(i=>i.title==='Из прошлых ошибок'&&i.ask===item.ask);
      const cfg=GrammarLessonEngine.config(lessonId),libItem=cfg.items.find(i=>i.id===item.grammarItemId);
      recordGrammarReview(cfg,libItem,{ok:true,open:false});
      out.afterCorrect=db.reviewSchedule[key];
      // library path
      const lib='B2-19',lcfg=GrammarLessonEngine.config(lib),li=lcfg.items.findIndex(i=>!i.open),lit=lcfg.items[li];
      GrammarLessonEngine.getState(lib).pos=li;
      document.body.insertAdjacentHTML('beforeend','<input id="gleAnswer-'+lib+'" value="">');
      document.getElementById('gleAnswer-'+lib).value=lit.options.find(o=>!(lit.accepted||[lit.answer]).includes(o));
      grammarLessonEngineSubmit(lib);
      out.libAnswer=GrammarLessonEngine.getState(lib).answers[lit.id];
      out.libSchedule=db.reviewSchedule['grammar::'+lib+'::'+lit.id];
      out.libId=lit.id;
      const oi=s.items.findIndex(i=>i.grammarItemId&&i.grammarId===lessonId&&!i.exact);s.pos=oi;s.draft='The report has a clear structure.';checkLesson();out.open=GrammarLessonEngine.getState(lessonId).answers[s.items[oi].grammarItemId];
      out.staleRejected=!GrammarLessonEngine.record(lessonId,item.grammarItemId,'old answer',true,'daily','outdated prompt');
      out.pilots=['A1-01','A1-05'].map(id=>{const cfg=dailyGrammarConfig(id),q=cfg.items[0];return GrammarLessonEngine.record(id,q.id,q.answer,true,'daily',q.prompt)&&window.grammarPilotState(id).answers[q.id].ok;});
      return out;
    });
    assert.equal(r.record.grammarId,'B2-21');assert.equal(r.record.grammarItemId,r.itemId);
    assert.equal(r.mirror.ok,false);assert.equal(r.mirror.source,'daily');
    assert.ok(r.answered>=1,'daily answer counts in the library progress');
    assert.equal(r.schedule.lapses,1);assert.ok(r.schedule.nextDue>Date.now(),'wrong answer scheduled for later review');
    assert.ok(r.weak,'wrong daily answer joins the weak list');
    assert.ok(r.warmNext,'previous mistake returns in the next 94-topic lesson');
    assert.ok(!r.warmSame,'the lesson being studied does not re-serve its own mistakes as warm-up');
    assert.ok(r.warmDue,'a due spaced-repetition entry returns even without the weak list');
    assert.equal(r.afterCorrect.repetitions,1);assert.ok(r.afterCorrect.nextDue>Date.now());
    assert.equal(r.libAnswer.ok,false);
    assert.equal(r.libSchedule.lapses,1,'library mistakes enter the same review schedule');
    assert.equal(r.open.open,true);assert.equal(r.open.ok,null);assert.equal(r.open.value,'The report has a clear structure.');assert.ok(r.staleRejected,'an old prompt must not overwrite the new bank');assert.deepEqual(r.pilots,[true,true]);
    // persistence and account separation
    await page.reload();
    const again=await page.evaluate(id=>({sched:Object.keys(db.reviewSchedule||{}).length,lib:Object.keys(GrammarLessonEngine.getState('B2-21').answers).length}),r.itemId);
    assert.ok(again.sched>=2&&again.lib>=1,'progress survives reload');
    await page.evaluate(()=>localStorage.setItem('sb.active','vladlen'));await page.reload();
    const other=await page.evaluate(()=>({sched:Object.keys(db.reviewSchedule||{}).length,lessons:Object.keys(courseState().grammarLessons||{}).length,weak:courseState().weak.length}));
    assert.deepEqual(other,{sched:0,lessons:0,weak:0},'the other profile must not see these records');
    await page.evaluate(()=>localStorage.setItem('sb.active','marina'));await page.reload();
    assert.ok(await page.evaluate(()=>Object.keys(db.reviewSchedule||{}).length)>=2,'first profile data intact after switching');
    assert.deepEqual(errors,[]);
    console.log('Grammar progress QA passed: daily answers mirror into the library, library answers feed the review schedule, mistakes return in the next lesson (weak list and due schedule), reload and two-profile separation.');
  }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});

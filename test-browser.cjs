'use strict';
// Run with playwright-core installed and EDGE_PATH pointing to Edge or Chromium.
// Data is synthetic. Account-level tests run separately on the deployed application.
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const root = __dirname;
const resources = new Set(['/', '/index.html', '/style.css', '/vendor/supabase.js', '/favicon.ico', '/favicon.svg', '/project-audio.mp3', '/project-image.png', '/toefl-structure.pdf']);
async function run() {
  for (const name of await fs.readdir(root)) if (/^[\w.-]+\.js$/.test(name)) resources.add('/' + name);
  for (const name of await fs.readdir(path.join(root, 'audio'))) if (/^[\w.-]+\.mp3$/.test(name)) resources.add('/audio/' + name);
  const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.mp3':'audio/mpeg', '.png':'image/png', '.svg':'image/svg+xml', '.pdf':'application/pdf' };
  const server = http.createServer(async (req,res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (!resources.has(pathname)) { res.writeHead(404).end(); return; }
    if (pathname === '/favicon.ico') { res.writeHead(204).end(); return; }
    const file = path.join(root, pathname === '/' ? 'index.html' : pathname);
    try { res.writeHead(200, {'Content-Type':mime[path.extname(file)]}).end(await fs.readFile(file)); }
    catch { res.destroy(); }
  });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({executablePath:process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',args:['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream','--autoplay-policy=no-user-gesture-required'],headless:true});
  try {
    for (const profile of ['marina','vladlen']) {
      const context = await browser.newContext({permissions:['microphone'], viewport:profile === 'marina'?{width:1440,height:900}:{width:390,height:844}});
      try {
        const page = await context.newPage();
        page.setDefaultTimeout(9000);
        const errors = [];
        page.on('pageerror',e=>errors.push(e.message));
        page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
        page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
        // A local-only fixture permits cumulative course tests without modifying a student's data.
        await page.route(origin+'/cloud.js',r=>r.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
        await page.route('https://cdn.jsdelivr.net/**',r=>r.fulfill({contentType:'text/javascript',body:''}));
        await page.addInitScript(p=>localStorage.setItem('sb.active',p), profile);
        await page.goto(origin);
        const nav = i=>page.locator('#nav button').nth(i).click();
        const click = sel=>page.locator(sel).click();
        for(let i=0; i<8; i++) {
          await nav(i);
          assert.ok(await page.locator('#app h1,#app h2').count());
          assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow on page '+i+' '+profile);
        }
        await nav(1);
        const calendar = await page.evaluate(async()=>{
          const seen = new Set();
          let dates=0;
          for(let t=Date.UTC(2026,10,23);t<=Date.UTC(2027,11,31);t+=86400000) {
            const key=new Date(t).toISOString().slice(0,10);
            const input=document.querySelector('input[type=date]');
            input.value=key;
            input.dispatchEvent(new Event('change',{bubbles:true}));
            const heading=document.querySelector('#app h3').textContent;
            document.querySelector('[onclick="startScheduledLesson()"]').click();
            const session=courseState().session;
            const title=units[session.unit][0];
            if(session.lessonDate!==key||!heading.includes(title)||!document.querySelector('#box .eyebrow').textContent.includes(title))throw Error(key+' / '+title);
            seen.add(title);dates++;
            document.querySelector('#close').click();
            // Discard only this fixture's pending session so each date starts independently.
            courseState().session=null;
            await new Promise(r=>setTimeout(r,0));
          }
          return {dates,topics:seen.size};
        });
        assert.equal(calendar.dates,404);
        console.log(profile,JSON.stringify(calendar));
        await click('[onclick="editPlan()"]');
        await page.locator('#p0mn').fill('32');
        await click('#form button.primary');
        assert.match(await page.locator('#app .task').first().innerText(),/32/);
        await nav(7);await click('[onclick="addMaterial()"]');
        await page.locator('#name').fill('Regression fixture');await page.locator('#note').fill('Listening practice');
        await click('#form button.primary');
        await page.reload();await nav(7);assert.match(await page.locator('#app').innerText(),/Regression fixture/);
        await nav(2);await click('[onclick="config(0)"]');await click('#form button.primary');
        await page.locator('#answer').fill('I follow a weekly schedule because it helps me focus.');
        await click('#micBtn');
        await page.waitForFunction(()=>document.querySelector('#micBtn').textContent.includes('Остановить'));
        await page.waitForTimeout(600);await click('#micBtn');
        await page.waitForFunction(()=>document.querySelector('#listenback')?.src.startsWith('blob:'));
        await page.locator('#listenback').evaluate(a=>a.play());
        await page.waitForFunction(()=>document.querySelector('#listenback').currentTime>0);
        await page.reload();await nav(2);await click('[onclick="resume()"]');
        assert.match(await page.locator('#answer').inputValue(),/weekly schedule/);
        await click('#answerForm .primary');await page.waitForFunction(()=>document.querySelector('#savedAudio')?.src.startsWith('blob:'));
        assert.match(await page.locator('#box').innerText(),/Разбор ответа/);
        await click('#close');await nav(6);await page.locator('#app .task').last().click();
        assert.match(await page.locator('#box').innerText(),/weekly schedule/);
        await click('#close');
        await nav(2);
        for(let skill=1;skill<5;skill++){
          await click('[onclick="config('+skill+')"]');await click('#form button.primary');
          if(skill===1){await page.locator('#box button[onclick^="speak"]').first().click();await click('#unlock');}
          const answer=page.locator('#answer');
          if(await answer.evaluate(el=>el.tagName==='SELECT'))await answer.selectOption({index:1});
          else await answer.fill('A community garden can attract visitors. For example, people can grow vegetables together.');
          await click('#answerForm button.primary');
          assert.match(await page.locator('#box').innerText(),/Разбор ответа/);await click('#close');
        }
        if(profile==='marina') await testLessons(page,nav);
        assert.deepEqual(errors,[]);
        console.log(profile,'OK: eight screens, schedule edit, materials, reload, Speaking, audio, answer history');
      } finally { await context.close(); }
    }
  } finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
}
async function testLessons(page,nav) {
  await nav(0);
  const count=await page.evaluate(()=>units.length);
  assert.equal(count,46);
  let items=0;
  for(let unit=0;unit<count;unit++){
    await page.locator('[onclick="catalog()"]').click();
    await page.locator('#unitSelect').selectOption(String(unit));
    await page.locator('[onclick="catalogStart()"]').click();
    items+=await page.evaluate(async()=>{
      let steps=0;
      const check=(ok,label)=>{if(!ok)throw Error(label);};
      const until=async f=>{
        const deadline=Date.now()+12000;
        while(!f()){if(Date.now()>deadline)throw Error('Timeout '+courseState().session?.unit+'/'+courseState().session?.pos);await new Promise(r=>setTimeout(r,30));}
      };
      while(courseState().session){
        const s=courseState().session,i=s.items[s.pos];
        check(++steps<220,'Loop');
        if(s.feedback||i.info){document.querySelector('[onclick="advanceLesson()"]').click();continue;}
        if(i.audio&&!s.heard){
          document.querySelector('[onclick="listenLesson()"]').click();
          const audio=document.querySelector('#courseAudio');
          if(!audio.hidden)audio.playbackRate=16;
          await until(()=>!document.querySelector('#heard').disabled);
          document.querySelector('#heard').click();continue;
        }
        const el=document.querySelector('#lessonAnswer');
        check(!!el,'Missing form');
        const mistake=i.choices&&s.pos%7===0;
        el.value=mistake?i.choices.find(x=>x!==i.model):i.model||'The community needs a reliable bus service because it helps people get to work. For example, a morning route could serve the station.';
        el.dispatchEvent(new Event('input',{bubbles:true}));
        document.querySelector('#lessonForm button').click();
        await until(()=>!!s.feedback);
        if(mistake)check(s.feedback.ok===false,'Wrong answer accepted: '+JSON.stringify({unit:s.unit,position:s.pos,ask:i.ask,key:i.model,submitted:el.value,ok:s.feedback.ok,choices:i.choices}));
        else if(i.choices||i.exact)check(s.feedback.ok===true,'Correct answer rejected');
      }
      check(document.querySelector('#box').textContent.includes('Lesson Review'),'Missing review');
      return steps;
    });
    await page.locator('#close').click();
    // History accumulation is tested above; cap the synthetic data between lessons.
    await page.evaluate(()=>{db.h=[];courseState().weak=[];persist();});
    if((unit+1)%10===0)console.log('Grammar units completed',unit+1);
  }
  console.log(count,'complete lessons,',items,'UI transitions');
}
run().catch(e=>{console.error(e);process.exitCode=1;});

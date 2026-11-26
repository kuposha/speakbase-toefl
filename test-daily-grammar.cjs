const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const {chromium} = require('playwright-core');

async function run() {
  const server = http.createServer(async (req,res) => {
    const pathname = new URL(req.url,'http://localhost').pathname;
    const filename = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    try {
      const data = await fs.readFile(filename);
      const types = {'.js':'text/javascript','.css':'text/css','.html':'text/html'};
      res.writeHead(200,{'Content-Type':types[path.extname(filename)] || 'application/octet-stream'}).end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const origin = 'http://127.0.0.1:'+server.address().port;
  const browser = await chromium.launch({executablePath:process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'});
  try {
    const page = await browser.newPage({viewport:{width:390,height:844}});
    const errors = [];
    page.on('pageerror',e => errors.push(e.message));
    await page.route(origin+'/cloud.js*',route => route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(el=>el.inert=false)"}));
    await page.goto(origin);
    for(const profile of ['marina','vladlen']){
      await page.evaluate(p=>localStorage.setItem('sb.active',p),profile);
      await page.reload();
      const result=await page.evaluate(()=>{
        const dates=new Map();
        for(let time=calendarStart;time<=calendarEnd;time+=calendarDay){
          const date=new Date(time).toISOString().slice(0,10);
          const {grammarId,unit,grammarTitle}=dayProgram(date);
          if(!grammarTitle)throw Error(date+' missing title');
          if(dates.has(grammarId))continue;
          const lesson=dailyGrammarConfig(grammarId);
          const items=buildLesson({lessonDate:date,unit,grammarId,last:'Writing',minutes:110});
          if(!items[0].lecture||items[0].grammarId!==grammarId||dailyTheory(grammarId).length<1000)throw Error(grammarId+' theory');
          if(items.filter(i=>i.grammarItemId&&i.grammarId===grammarId&&!i.warm).length!==lesson.items.length)throw Error(grammarId+' practice');
          const transfer=items.find(i=>i.grammarId===grammarId&&i.title.startsWith('Build a Sentence'));
          if(!transfer?.exact||!items.some(i=>i.repeat&&i.audio===transfer.model))throw Error(grammarId+' transfer');
          dates.set(grammarId,date);
        }
        return {count:dates.size,date:dates.get('B2-21'),before:courseState().session?.grammarId||null};
      });
      assert.equal(result.count,94);
      assert.equal(result.before,null,'a previous profile session leaked');
      await page.evaluate(date=>{pick(date);startScheduledLesson()},result.date);
      assert.equal(await page.locator('#modal.lesson-fullscreen article.a105-theory').count(),1);
      await page.getByRole('button',{name:'К упражнениям',exact:true}).click();
      await page.locator('#lessonAnswer').selectOption({label:'a semicolon'});
      await page.getByRole('button',{name:'Вернуться к конспекту'}).click();
      await page.getByRole('button',{name:'Вернуться к заданию'}).click();
      assert.equal(await page.locator('#lessonAnswer').inputValue(),'a semicolon');
      await page.getByRole('button',{name:'Проверить',exact:true}).click();
      assert.equal(await page.locator('#modal .is-correct').first().isVisible(),true);
      await page.reload();
      await page.evaluate(date=>{pick(date);resumeCurrentSession()},result.date);
      assert.equal(await page.locator('#modal .is-correct').first().isVisible(),true);
      await page.getByRole('button',{name:'Дальше'}).click();
      await page.locator('#lessonAnswer').selectOption({label:'two aims.'});
      await page.getByRole('button',{name:'Проверить',exact:true}).click();
      assert.equal(await page.locator('#modal .is-wrong').first().isVisible(),true,'punctuation must be graded exactly');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await page.evaluate(()=>closeModal());
      await page.setViewportSize({width:1366,height:900});
    }
    assert.deepEqual(errors,[]);
    console.log('Daily grammar: all 94 lectures, practice banks and transfer exercises reachable by both profiles over 404 dates; mobile/desktop lecture, draft, reload, account separation and punctuation grading passed.');
  } finally { await browser.close();await new Promise(resolve=>server.close(resolve)); }
}
run().catch(e=>{console.error(e);process.exitCode=1});

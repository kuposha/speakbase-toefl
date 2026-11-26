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
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route(origin+'/cloud.js*',r=>r.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(el=>el.inert=false)"}));
    await page.goto(origin);
    const audit=await page.evaluate(()=>{
      const ids=Object.keys(grammarToeflContexts),keys=new Set(),sources=new Set();
      for(const id of ids)for(const skill of [3,1,2,0]){
        const t=GrammarToefl.topicTask(id,skill);
        if(!t||t.grammarId!==id||t.skill!==skill||!t.ask||!t.model||!t.tip)throw Error(id+' '+skill);
        if(keys.has(t.topicTaskId))throw Error('duplicate '+t.topicTaskId);
        keys.add(t.topicTaskId);
        if(skill===3||skill===1){
          if(!t.opts.includes(t.model)||new Set(t.opts).size!==3||sources.has(t.source))throw Error('context '+id);
          sources.add(t.source);
        }
      }
      return [ids.length,keys.size,sources.size];
    });
    assert.deepEqual(audit,[94,376,188]);
    for(const skill of [3,1,2,0]){
      await page.evaluate(()=>modal(GrammarToefl.panelHtml('A2-18',true)));
      await page.locator('#modal .toefl-links button').nth([3,1,2,0].indexOf(skill)).click();
      const task=await page.evaluate(()=>db.draft.q);
      assert.equal(task.grammarId,'A2-18');assert.equal(task.skill,skill);
      if(skill===1){
        assert.ok(await page.locator('#unlock').isVisible());
        // Test the UI gate, not the physical sound output.
        await page.evaluate(()=>{window.speak=()=>{};document.querySelector('#unlock').disabled=false;});
        await page.locator('#unlock').click();
      }
      if(task.opts)await page.locator('#answer').selectOption({label:task.model});
      else await page.locator('#answer').fill(task.model);
      await page.getByRole('button',{name:'Сохранить и проверить',exact:true}).click();
      const row=await page.evaluate(()=>db.h.at(-1));
      assert.equal(row.correct,true);assert.equal(row.q.topicTaskId,'A2-18:'+skill);
      await page.evaluate(()=>closeModal());
    }
    await page.evaluate(()=>GrammarToefl.startTopic('B2-04',3));
    await page.evaluate(()=>{db.draft.answer='draft preservation marker';persist();GrammarToefl.startTopic('C1-01',1);});
    assert.ok(await page.getByText('Есть незавершённая тренировка').isVisible());
    assert.equal(await page.evaluate(()=>db.draft.q.grammarId),'B2-04');
    assert.equal(await page.evaluate(()=>db.draft.answer),'draft preservation marker');
    await page.reload();
    assert.equal(await page.evaluate(()=>db.draft.answer),'draft preservation marker');
    assert.deepEqual(errors,[]);
    console.log('Topic practice: 94 topics, 376 launchable task records, 188 independent contexts; four actual UI launches, grading, history, draft protection/reload passed.');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(e=>{console.error(e);process.exitCode=1});

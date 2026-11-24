'use strict';
// Run only with two disposable profiles provisioned in the real test project.
// QA_ACCOUNTS is a JSON array with email, pw and profile for each fixture.
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');
const fixtures = JSON.parse(process.env.QA_ACCOUNTS || '[]');
assert.equal(fixtures.length, 2);
assert.ok(fixtures.every(a => /^speakbase-qa-[0-9a-f-]+@example\.invalid$/.test(a.email)));
const server = http.createServer(async (req,res) => {
  const root = __dirname;
  const file = path.resolve(root, '.' + (req.url === '/' ? '/index.html' : new URL(req.url,'http://localhost').pathname));
  if (!file.startsWith(root+path.sep)) { res.writeHead(403).end(); return; }
  try {
    const type = {'.js':'application/javascript','.html':'text/html; charset=utf-8','.css':'text/css'}[path.extname(file)];
    const buffer=await fs.readFile(file);
    res.writeHead(200, {'Content-Type':type||'application/octet-stream'}).end(buffer);
  } catch { res.writeHead(404).end(); }
});
(async()=>{
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const url = process.env.QA_URL || 'http://127.0.0.1:'+server.address().port;
  const browser = await chromium.launch({executablePath:process.env.EDGE_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']});
  const contexts=[];
  const errors=[];
  async function login(fixture){
    const context=await browser.newContext({permissions:['microphone']});
    contexts.push(context);
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url);
    await page.locator('input[name=email]').fill(fixture.email);
    await page.locator('input[name=password]').fill(fixture.pw);
    await page.getByRole('button',{name:'Войти',exact:true}).click();
    await page.waitForFunction(()=>typeof cloudUser!=='undefined' && !!cloudUser);
    assert.equal(await page.evaluate(()=>activeProfile),fixture.profile);
    return page;
  }
  const blobKey='qa-audio-'+Date.now(),topic='QA '+Date.now();
  try{
    const owner=await login(fixtures[0]), other=await login(fixtures[1]);
    const bytes=await owner.evaluate(async({topic,blobKey})=>{
      db.topics.push(topic);persist();await syncNow();
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder=new MediaRecorder(stream);
      const chunks=[];
      recorder.ondataavailable=e=>chunks.push(e.data);
      const stopped=new Promise(resolve=>recorder.onstop=resolve);
      recorder.start(); await new Promise(resolve=>setTimeout(resolve,600));recorder.stop();await stopped;
      stream.getTracks().forEach(track=>track.stop());
      const blob=new Blob(chunks,{type:recorder.mimeType});await blobPut(blobKey,blob);return blob.size;
    },{topic,blobKey});
    const second=await login(fixtures[0]);
    assert.ok(await second.evaluate(topic=>db.topics.includes(topic),topic));
    assert.ok(bytes>0);
    assert.deepEqual(await second.evaluate(async k=>{
      const b=await blobGet(k);
      const audio=new Audio(URL.createObjectURL(b));audio.muted=true;await audio.play();
      audio.pause();URL.revokeObjectURL(audio.src);return [b.size,b.type.startsWith('audio/')];
    },blobKey),[bytes,true]);
    assert.equal(await other.evaluate(topic=>db.topics.includes(topic),topic),false);
    assert.equal(await other.evaluate(async k=>!!await blobGet(k),blobKey),false);
    const id=await owner.evaluate(()=>cloudUser.id);
    assert.equal(await other.evaluate(async p=>{
      const r=await cloud.storage.from('user-files').download(p);return !!r.error;
    },id+'/'+blobKey),true);
    const foreign=await other.evaluate(async id=>{
      const r=await cloud.from('learning_progress').select('user_id').eq('user_id',id);
      return {error:r.error?.message,rows:r.data?.length};
    },id);
    assert.equal(foreign.error,undefined);assert.equal(foreign.rows,0);
    await owner.reload();await owner.waitForFunction(()=>!!cloudUser);
    assert.ok(await owner.evaluate(topic=>db.topics.includes(topic),topic));
    await owner.evaluate(async k=>{
      const {error}=await cloud.storage.from('user-files').remove([cloudUser.id+'/'+k]);if(error)throw error;
    },blobKey);
    for(const page of [second,other,owner]){
      await page.locator('#profileSelect').click();
      await page.getByRole('button',{name:'Выйти / сменить аккаунт'}).click();
      await page.locator('input[name=email]').waitFor();
    }
    assert.deepEqual(errors,[]);
    console.log('PASS 2 sign-ins; two-device progress, private microphone recording and playback; peer isolation; reload; 3 sign-outs; zero JS errors.');
  }finally{
    for(const context of contexts)await context.close();
    await browser.close();server.close();
  }
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});

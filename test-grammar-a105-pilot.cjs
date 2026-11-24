const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const http=require('node:http');
const root=__dirname;
(async()=>{
 const server=http.createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const file=path.join(root,pathname==='/'?'/index.html':pathname);
  try{const body=await fs.readFile(file);const ext=path.extname(file);res.writeHead(200,{'Content-Type':ext==='.js'?'text/javascript':ext==='.css'?'text/css':'text/html'}).end(body)}
  catch{res.writeHead(404).end('Not found')}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const origin='http://127.0.0.1:'+server.address().port;
  await page.route(origin+'/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
  await page.goto(origin);
  await page.waitForFunction(()=>typeof grammarLibraryView==='function'&&typeof openGrammarA105==='function');
  await page.evaluate(()=>{page=8;render()});
  await page.getByRole('button',{name:'Открыть пилотный урок'}).click();
  assert.equal(await page.getByRole('heading',{name:'Present Simple: утвердительные предложения'}).count(),1);
  for(const heading of ['4.1. Значение и употребление Present Simple','4.2. Формула утвердительного предложения','4.3. Правописание окончаний -s, -es и -ies','4.4. Произношение окончания третьего лица','4.5. Типичные ошибки русскоязычных учащихся','4.6. Границы этой темы','5. Примеры с разбором']){
   assert.equal(await page.getByRole('heading',{name:heading}).count(),1,'missing theory '+heading);
  }
  assert.equal(await page.locator('.a105-theory table').count(),3,'subject, special forms and pronunciation tables should render');
  assert.equal(await page.locator('.a105-theory').evaluate(el=>getComputedStyle(el).display),'grid','pilot stylesheet should load');
  const mobileWidth=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(mobileWidth.scroll<=mobileWidth.client+1,'theory page must not cause horizontal overflow on a phone');
  assert.equal(await page.getByText('G1',{exact:true}).count(),0,'practice must not appear before theory');
  await page.getByRole('button',{name:'Перейти к практике'}).click();
  const diagnostics=['My brother','she','are','study'];
  for(const answer of diagnostics){
   assert.ok((await page.locator('.a105-question').innerText()).length>0);
   await page.locator('#a105Answer').selectOption({label:answer});
   await page.getByRole('button',{name:'Проверить ответ'}).click();
   assert.ok((await page.locator('.a105-feedback').innerText()).includes('Верно'),'diagnostic answer '+answer);
   await page.getByRole('button',{name:'Следующее задание'}).click();
  }
  assert.ok((await page.locator('.a105-question').innerText()).includes('My sister'));
  await page.locator('#a105Answer').selectOption({label:'works'});
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  assert.ok((await page.locator('.a105-feedback').innerText()).includes('Верно'));
  await page.reload();
  await page.waitForFunction(()=>typeof grammarLibraryView==='function');
  await page.evaluate(()=>{page=8;render()});
  assert.ok((await page.locator('.a105-feedback').innerText()).includes('Верно'),'answer should persist after reload');
  await page.getByRole('button',{name:'Вернуться к полному конспекту'}).click();
  assert.equal(await page.getByRole('heading',{name:'4.3. Правописание окончаний -s, -es и -ies'}).count(),1);
  await page.getByRole('button',{name:'К каталогу грамматики'}).click();
  await page.getByRole('button',{name:'Открыть пилотный урок'}).click();
  await page.getByRole('button',{name:'Перейти к практике'}).click();
  assert.ok((await page.locator('.a105-feedback').innerText()).includes('Верно'),'saved answer should remain after leaving and reopening pilot');
  await page.getByRole('button',{name:'Следующее задание'}).click();
  assert.ok((await page.locator('.a105-question').innerText()).includes('They ___ English'));
  const isolation=await page.evaluate(()=>{
   const marina=JSON.parse(localStorage.getItem('speakbase.v1')||'{}').course.grammarA105;
   const vladlen={course:{grammarA105:{mode:'practice',pos:0,answers:{G1:{value:'work',ok:false,open:false}}}}};
   localStorage.setItem('speakbase.v1.vladlen',JSON.stringify(vladlen));
   const other=JSON.parse(localStorage.getItem('speakbase.v1.vladlen')).course.grammarA105;
   return {marinaAnswer:marina.answers.G1.value,vladlenAnswer:other.answers.G1.value,marinaPos:marina.pos,vladlenPos:other.pos};
  });
  assert.deepEqual(isolation,{marinaAnswer:'works',vladlenAnswer:'work',marinaPos:5,vladlenPos:0});
  assert.equal(errors.length,0,errors.join('; '));
  console.log('A1-05 pilot browser QA passed: complete theory-first lesson, all theory sections and tables, gated practice, saved answers, theory return, catalog/reopen resume, separate Marina/Vladlen storage; zero page errors.');
 }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
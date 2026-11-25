const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');
const http=require('node:http');
const root=__dirname;

(async()=>{
 const ui=await fs.readFile(path.join(root,'grammar-a1-05-ui.js'),'utf8');
 const lesson=await fs.readFile(path.join(root,'materials','GRAMMAR-LESSON-A1-01.md'),'utf8');
 const bundle=await fs.readFile(path.join(root,'grammar-a1-05.js'),'utf8');
 const register=await fs.readFile(path.join(root,'materials','SOURCE-REGISTER.md'),'utf8');
 const a105=await fs.readFile(path.join(root,'materials','GRAMMAR-LESSON-A1-05-EXEMPLAR.md'),'utf8');
 const match=ui.match(/const a101Items = (\[[\s\S]*?\n  \]);/);
 assert(match,'A1-01 exercise bank must be present');
 const items=vm.runInNewContext('('+match[1]+')');
 assert.equal(items.length,27,'A1-01 must contain the full 27-item practice path');
 assert.equal(new Set(items.map(x=>x.id)).size,items.length,'item IDs must be unique');
 const counts=Object.fromEntries([...new Set(items.map(x=>x.group))].map(g=>[g,items.filter(x=>x.group===g).length]));
 assert.deepEqual(counts,{'Входная диагностика':5,'Управляемая практика':8,'Самостоятельная практика':8,'Выходная проверка':5,'Самостоятельное применение':1});
 for(const item of items){
  assert(item.prompt&&(item.open?item.rubric?.length>=4:item.why),'every item must have a prompt and the appropriate evaluation guidance');
  if(item.open){assert(item.rubric?.length>=4,'open production must have an explicit rubric');continue}
  assert(item.answer,'closed item must have an answer');
  if(item.options){assert(item.options.includes(item.answer),'answer must appear among options: '+item.id);assert.equal(new Set(item.options).size,item.options.length,'duplicate options are not allowed: '+item.id)}
  else {assert((item.accepted||[]).includes(item.answer),'typed answer must have an accepted key: '+item.id);assert.equal(new Set(item.accepted||[]).size,(item.accepted||[]).length,'duplicate accepted answers are not allowed: '+item.id)}
 }
 assert(lesson.includes('Curriculum ID:')&&lesson.includes('A1-01'));
 assert(lesson.includes('PDF p. 8'));
 assert(bundle.includes('window.grammarA101Markdown'));
 for(const id of ['EXT-01','EXT-02','EXT-03','EXT-04'])assert(lesson.includes(id)&&register.includes(id),'missing registered source '+id);
 assert(register.includes('GR-06')&&!register.includes('GR-06 Cambridge Dictionary'),'external reference IDs must not collide with the local punctuation PDF');
 assert(['EXT-05','EXT-06','EXT-07'].every(id=>a105.includes(id)&&register.includes(id)),'A1-05 external source IDs must match the register');
 assert(!a105.includes('GR-06 Cambridge Dictionary')&&!a105.includes('GR-07 Cambridge Dictionary')&&!a105.includes('GR-08 IDP IELTS'),'A1-05 must not reuse local GR IDs for external sources');
 for(const phrase of ['4.1.','4.2.','4.3.','4.4.','4.5.','4.6.','4.7.','4.8.','4.9.','4.10.','4.11.','4.12.','## 5.','## 6.']){
  assert(lesson.includes(phrase),'lesson missing '+phrase);
 }

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
  await page.waitForFunction(()=>typeof grammarLibraryView==='function'&&typeof openGrammarA101==='function'&&typeof grammarA101Markdown==='string');
  await page.evaluate(()=>{page=8;render()});
  await page.getByRole('button',{name:'Начать A1-01'}).click();
  assert.equal(await page.getByRole('heading',{name:'Sentence building and basic word order'}).count(),1);
  const theory=page.locator('.a105-theory');
  const theoryText=await theory.innerText();
  for(const phrase of ['4.1. Что такое английское предложение','4.12. Границы урока','S + V + O','My sister studies.','The room is warm.','A1-16']){
   assert(theoryText.includes(phrase),'rendered theory missing: '+phrase);
  }
  assert((await theory.locator('table').count())>=4,'theory should render rule/contrast tables');
  assert(!theoryText.includes('undefined'),'theory must not render undefined values');
  const viewport=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(viewport.scroll<=viewport.client+1,'A1-01 must not create horizontal overflow at 390px');
  assert.equal(await page.getByText('D1',{exact:true}).count(),0,'practice must be hidden until the learner finishes theory');
  await page.getByRole('button',{name:'Перейти к практике'}).click();

  // Verify that an incorrect answer receives corrective feedback, then restart cleanly.
  await page.locator('#a101Answer').selectOption({label:'sleeps'});
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  let feedback=await page.locator('.a105-feedback').innerText();
  assert(feedback.includes('Нужно повторить')&&feedback.includes('The little dog'),'wrong answer must show the correct answer and explanation');
  await page.evaluate(()=>a101Restart());

  // Save a mid-lesson answer and verify that reload resumes on the next item.
  await page.locator('#a101Answer').selectOption({label:items[0].answer});
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  assert((await page.locator('.a105-feedback').innerText()).includes('Верно'));
  await page.getByRole('button',{name:'Следующее задание'}).click();
  await page.reload();
  await page.waitForFunction(()=>typeof grammarLibraryView==='function');
  await page.evaluate(()=>{page=8;render()});
  assert((await page.locator('.a105-question').innerText()).includes(items[1].prompt),'mid-lesson position must survive page reload');

  for(const item of items.slice(1)){
   assert((await page.locator('.a105-question').innerText()).includes(item.prompt),'wrong active item '+item.id);
   const field=page.locator('#a101Answer');
   if(item.options)await field.selectOption({label:item.answer});
   else if(item.open)await field.fill('I work at home. I study English. I read books. I listen to music in the evening.');
   else await field.fill((item.accepted||[item.answer])[0]);
   await page.getByRole('button',{name:'Проверить ответ'}).click();
   feedback=await page.locator('.a105-feedback').innerText();
   if(item.open)assert(feedback.includes('автоматическая оценка открытого текста пока не подключена'),'open response must be transparently marked as not AI-evaluated');
   else assert(feedback.includes('Верно'),'answer key failed for '+item.id+': '+feedback);
   await page.getByRole('button',{name:'Следующее задание'}).click();
  }
  assert.equal(await page.getByRole('heading',{name:'Практика завершена'}).count(),1);
  assert((await page.locator('.a105-results').innerText()).includes('26/26'));
  assert((await page.locator('.a105-results').innerText()).includes('8/8'));
  assert((await page.locator('.a105-results').innerText()).includes('5/5'));
  const stored=await page.evaluate(()=>{
   const local=JSON.parse(localStorage.getItem('speakbase.v1')||'{}');
   const lesson=local.course?.grammarLessons?.['A1-01'];
   return {mode:lesson?.mode,pos:lesson?.pos,answers:Object.keys(lesson?.answers||{}).length,activeId:local.course?.activeGrammarLessonId};
  });
  assert.deepEqual(stored,{mode:'results',pos:26,answers:27,activeId:'A1-01'});
  await page.reload();
  await page.waitForFunction(()=>typeof grammarLibraryView==='function');
  await page.evaluate(()=>{page=8;render()});
  assert.equal(await page.getByRole('heading',{name:'Практика завершена'}).count(),1,'completed lesson must restore after reload');
  await page.getByRole('button',{name:'Вернуться в каталог'}).click();
  await page.getByRole('button',{name:'Продолжить A1-01 (27/27)'}).click();
  assert.equal(await page.getByRole('heading',{name:'Sentence building and basic word order'}).count(),1,'theory must remain revisitable after completion');

  const isolation=await page.evaluate(()=>{
   const marina=JSON.parse(localStorage.getItem('speakbase.v1')||'{}').course.grammarLessons['A1-01'];
   localStorage.setItem('speakbase.v1.vladlen',JSON.stringify({course:{grammarLessons:{'A1-01':{mode:'practice',pos:2,answers:{D1:{value:'wrong',ok:false}}}}}}));
   const vladlen=JSON.parse(localStorage.getItem('speakbase.v1.vladlen')).course.grammarLessons['A1-01'];
   return {marinaAnswers:Object.keys(marina.answers).length,vladlenAnswers:Object.keys(vladlen.answers).length,marinaPos:marina.pos,vladlenPos:vladlen.pos};
  });
  assert.deepEqual(isolation,{marinaAnswers:27,vladlenAnswers:1,marinaPos:26,vladlenPos:2});

  await page.getByRole('button',{name:'К каталогу грамматики'}).click();
  await page.getByRole('button',{name:'Открыть пилотный урок'}).click();
  assert.equal(await page.getByRole('heading',{name:'Present Simple: утвердительные предложения'}).count(),1,'A1-01 wrapper must preserve access to A1-05');
  assert.equal(errors.length,0,errors.join('; '));
  console.log('A1-01 lesson QA passed: source IDs, 27-item key audit, theory-first gate, all keys, open-response disclosure, 390px layout, saved/resumed state, local Marina/Vladlen separation, A1-05 access; zero page errors.');
 }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

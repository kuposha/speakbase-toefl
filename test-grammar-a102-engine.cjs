const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');
const http=require('node:http');
const root=__dirname;

(async()=>{
 const ui=await fs.readFile(path.join(root,'grammar-a1-02-ui.js'),'utf8');
 const markdown=await fs.readFile(path.join(root,'materials','GRAMMAR-LESSON-A1-02.md'),'utf8');
 const data=await fs.readFile(path.join(root,'grammar-a1-02.js'),'utf8');
 const engine=await fs.readFile(path.join(root,'grammar-lesson-engine.js'),'utf8');
 const register=await fs.readFile(path.join(root,'materials','SOURCE-REGISTER.md'),'utf8');
 const curriculum=await fs.readFile(path.join(root,'materials','GRAMMAR-CURRICULUM-A1-C1.md'),'utf8');
 const sourceMap=await fs.readFile(path.join(root,'materials','GRAMMAR-SOURCE-MAP.md'),'utf8');
 const index=await fs.readFile(path.join(root,'index.html'),'utf8');
 const match=ui.match(/const items=\s*(\[[\s\S]*?\n  \]);/);
 assert(match,'A1-02 exercise bank must be present');
 const items=vm.runInNewContext('('+match[1]+')');
 assert.equal(items.length,27,'A1-02 must contain 27 exercises');
 assert.equal(new Set(items.map(item=>item.id)).size,items.length,'item IDs must be unique');
 const counts=Object.fromEntries([...new Set(items.map(item=>item.group))].map(group=>[group,items.filter(item=>item.group===group).length]));
 assert.deepEqual(counts,{'Входная диагностика':5,'Управляемая практика':8,'Самостоятельная практика':8,'Выходная проверка':5,'Самостоятельное применение':1});
 for(const item of items){
  assert(item.prompt&&(item.open?item.rubric?.length>=4:item.why),'every item must have prompt and evaluation guidance: '+item.id);
  if(item.open)continue;
  assert(item.answer,'closed item requires an answer: '+item.id);
  if(item.options){
   assert(item.options.includes(item.answer),'answer must appear in options: '+item.id);
   assert.equal(new Set(item.options).size,item.options.length,'duplicate options: '+item.id);
  }else{
   assert((item.accepted||[]).some(answer=>answer.toLowerCase()===item.answer.toLowerCase()),'typed answer needs an accepted key: '+item.id);
  }
 }
 assert(markdown.includes('Curriculum ID:')&&markdown.includes('A1-02'));
 assert(markdown.includes('Unit 1'));
 for(const id of ['EXT-08','EXT-09','EXT-10','EXT-11'])assert(markdown.includes(id)&&register.includes(id),'missing registered source '+id);
 assert(curriculum.includes('A1-02')&&curriculum.includes('EXT-08'));
 assert(sourceMap.includes('A1-02')&&sourceMap.includes('EXT-09'));
 assert(engine.includes('theoryStart')&&engine.includes('grammarLessons[id]'),'engine must support shared theory slicing and permanent-ID storage');
 const requiredScripts=['grammar-lesson-engine.js','grammar-a1-02.js','grammar-a1-02-ui.js'];
 let prior=index.indexOf('course.js');
 for(const script of requiredScripts){
  const pos=index.indexOf(script);
  assert(pos>prior,'script missing or incorrect dependency order: '+script);
  prior=pos;
 }
 assert(index.indexOf('grammar-a1-05-ui.js')>prior,'A1-02 must register before the A1-01/A1-05 UI wrapper');

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
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const origin='http://127.0.0.1:'+server.address().port;
  await page.route(origin+'/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
  await page.goto(origin);
  await page.waitForFunction(()=>window.GrammarLessonEngine?.has('A1-02'));
  await page.evaluate(()=>{page=8;render()});
  const launchTitles=await page.locator('.a105-launch h3').allTextContents();
  assert(launchTitles[0].includes('Sentence building and basic word order'),'A1-01 must be the first new curriculum block');
  assert(launchTitles[1].includes('Subject pronouns and verb be — affirmative'),'A1-02 must immediately follow A1-01');
  assert(launchTitles[2].includes('A1-05'),'the original A1-05 benchmark remains separately accessible');  const launch=page.locator('.a105-launch').filter({hasText:'Subject pronouns and verb be — affirmative'});
  assert.equal(await launch.count(),1,'A1-02 must appear as one lesson card');
  await launch.getByRole('button',{name:'Начать урок'}).click();
  assert.equal(await page.getByRole('heading',{name:'Subject pronouns and verb be — affirmative'}).count(),1);
  assert.equal(await page.getByRole('heading',{name:'Present Simple: утвердительные предложения'}).count(),0,'A1-05 card must not overlay the active A1-02 lesson');
  assert.equal(await page.getByRole('heading',{name:'Sentence building and basic word order'}).count(),0,'A1-01 card must not overlay the active A1-02 lesson');
  const theory=page.locator('.a105-theory');
  const theoryText=await theory.innerText();
  for(const phrase of ['4.1. Зачем нужны subject pronouns','4.8. Как согласовать местоимение и be','4.12. Произношение am, is, are и сокращений','4.16. Границы урока','singular they','I am 20 years old.']){
   assert(theoryText.toLowerCase().includes(phrase.toLowerCase()),'rendered theory missing: '+phrase);
  }
  assert((await theory.locator('table').count())>=7,'theory should render the pronoun, agreement, contractions and use tables');
  assert(!theoryText.includes('undefined'),'theory must not render undefined');
  assert(!(await theoryText.includes('Практика завершена')),'practice must remain gated until theory');
  const viewport=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(viewport.scroll<=viewport.client+1,'A1-02 must not cause horizontal overflow at 390px');

  await page.getByRole('button',{name:'Перейти к практике'}).click();
  assert((await page.locator('.a105-question').innerText()).includes(items[0].prompt));
  // Wrong answer must produce targeted correction.
  await page.locator('#gleAnswer-A1-02').selectOption({label:'he'});
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  let feedback=await page.locator('.a105-feedback').innerText();
  assert(feedback.includes('Нужно повторить')&&feedback.includes('she'),'wrong answer must show the correct option and explanation');
  await page.evaluate(()=>grammarLessonEngineRestart('A1-02'));

  // Unsumbitted choice is saved as a draft and restored after a reload.
  await page.locator('#gleAnswer-A1-02').selectOption({label:'she'});
  await page.reload();
  await page.waitForFunction(()=>window.GrammarLessonEngine?.has('A1-02'));
  await page.evaluate(()=>{page=8;render()});
  await launch.getByRole('button',{name:'Продолжить (0/27)'}).count().then(count=>assert.equal(count,0,'active lesson should not show a launch card'));
  assert.equal(await page.locator('#gleAnswer-A1-02').inputValue(),'she','draft selection must survive reload');
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  assert((await page.locator('.a105-feedback').innerText()).includes('Верно'));
  await page.getByRole('button',{name:'Следующее задание'}).click();
  await page.reload();
  await page.waitForFunction(()=>window.GrammarLessonEngine?.has('A1-02'));
  await page.evaluate(()=>{page=8;render()});
  assert((await page.locator('.a105-question').innerText()).includes(items[1].prompt),'mid-lesson position must survive reload');

  for(const item of items.slice(1)){
   assert((await page.locator('.a105-question').innerText()).includes(item.prompt),'wrong active item: '+item.id);
   const field=page.locator('#gleAnswer-A1-02');
   if(item.options)await field.selectOption({label:item.answer});
   else if(item.open)await field.fill('I am Marina. My friend is a student. We are from Russia. It is a cold day.');
   else await field.fill((item.accepted||[item.answer])[0]);
   await page.getByRole('button',{name:'Проверить ответ'}).click();
   feedback=await page.locator('.a105-feedback').innerText();
   if(item.open)assert(feedback.includes('автоматическая оценка открытого текста пока не подключена'),'open response must never be reported as AI-evaluated');
   else assert(feedback.includes('Верно'),'answer key failed for '+item.id+': '+feedback);
   await page.getByRole('button',{name:'Следующее задание'}).click();
  }
  assert.equal(await page.getByRole('heading',{name:'Практика завершена'}).count(),1);
  const resultText=await page.locator('.a105-results').innerText();
  assert(resultText.includes('26/26'),'all closed items should score correctly');
  assert(resultText.includes('8/8'),'independent items should be counted separately');
  assert(resultText.includes('5/5'),'exit items should be counted separately');
  assert(resultText.includes('E1, E2, E3'),'critical items must be named in the report');
  const stored=await page.evaluate(()=>{
   const local=JSON.parse(localStorage.getItem('speakbase.v1')||'{}');
   const course=local.course||{};
   const state=course.grammarLessons?.['A1-02'];
   return {mode:state?.mode,pos:state?.pos,answers:Object.keys(state?.answers||{}).length,activeId:course.activeGrammarLessonId};
  });
  assert.deepEqual(stored,{mode:'results',pos:26,answers:27,activeId:'A1-02'});
  await page.getByRole('button',{name:'Вернуться в каталог'}).click();
  const a101=page.locator('.a105-launch').filter({hasText:'Sentence building and basic word order'});
  assert.equal(await a101.count(),1,'A1-01 card remains accessible');
  const a105=page.getByRole('button',{name:'Открыть пилотный урок'});
  assert.equal(await a105.count(),1,'A1-05 pilot remains accessible');
  await a105.click();
  assert.equal(await page.getByRole('heading',{name:'Present Simple: утвердительные предложения'}).count(),1,'A1-05 pilot still opens');
  await page.getByRole('button',{name:'К каталогу грамматики'}).click();
  await page.setViewportSize({width:1440,height:900});
  const desktopLaunch=page.locator('.a105-launch').filter({hasText:'Subject pronouns and verb be — affirmative'});
  await desktopLaunch.getByRole('button',{name:'Продолжить (27/27)'}).click();
  assert.equal(await page.getByRole('heading',{name:'Subject pronouns and verb be — affirmative'}).count(),1,'A1-02 must also open on desktop');
  const desktopWidth=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(desktopWidth.scroll<=desktopWidth.client+1,'A1-02 must not cause horizontal overflow at desktop width');

  const isolation=await page.evaluate(()=>{
   const marina=JSON.parse(localStorage.getItem('speakbase.v1')||'{}').course.grammarLessons['A1-02'];
   localStorage.setItem('speakbase.v1.vladlen',JSON.stringify({course:{grammarLessons:{'A1-02':{mode:'practice',pos:3,answers:{D1:{value:'he',ok:false}}}}}}));
   const vladlen=JSON.parse(localStorage.getItem('speakbase.v1.vladlen')).course.grammarLessons['A1-02'];
   return {marinaAnswers:Object.keys(marina.answers).length,vladlenAnswers:Object.keys(vladlen.answers).length,marinaPos:marina.pos,vladlenPos:vladlen.pos};
  });
  assert.deepEqual(isolation,{marinaAnswers:27,vladlenAnswers:1,marinaPos:26,vladlenPos:3});
  assert.equal(errors.length,0,errors.join('; '));
  console.log('A1-02 engine QA passed: sources, 27-item answer audit, reusable theory-first engine, no overlapping lesson cards, wrong-answer correction, saved drafts and mid-lesson resume, full results, mobile layout, local Marina/Vladlen isolation, A1-01/A1-05 access; zero page errors.');
 }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

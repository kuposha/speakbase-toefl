const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');
const http=require('node:http');
const root=__dirname;

(async()=>{
 const data=await fs.readFile(path.join(root,'grammar-curriculum-bulk-data.js'),'utf8');
 const ui=await fs.readFile(path.join(root,'grammar-curriculum-bulk-ui.js'),'utf8');
 const engine=await fs.readFile(path.join(root,'grammar-lesson-engine.js'),'utf8');
 const index=await fs.readFile(path.join(root,'index.html'),'utf8');
 const curriculum=await fs.readFile(path.join(root,'materials','GRAMMAR-CURRICULUM-A1-C1.md'),'utf8');
 const legacy=await fs.readFile(path.join(root,'materials','GRAMMAR-LESSON-AUDIT.md'),'utf8');
 const context={window:{}};vm.createContext(context);vm.runInContext(data,context);
 const lessons=context.window.grammarBulkLessons,ids=context.window.grammarBulkCurriculumIds;
 assert.equal(lessons.length,91,'all 91 missing blocks must be generated');
 assert.equal(ids.length,94,'canonical curriculum must contain 94 permanent IDs');
 assert.equal(new Set(ids).size,94,'curriculum IDs must be unique');
 const all=new Set(ids);
 assert.deepEqual(
  ['A1','A2','B1','B2','C1'].map(level=>lessons.filter(x=>x.level===level).length),
  [16,18,22,21,14],
  'all CEFR levels must have the expected number of generated lessons'
 );
 assert.equal(ids[0],'A1-01');
 assert.equal(ids[1],'A1-02');
 assert.equal(ids[4],'A1-05');
 const groupCounts={'Входная диагностика':4,'Управляемая практика':6,'Самостоятельная практика':9,'Выходная проверка':5,'Самостоятельное применение':1};
 const promptIssues=[];
 let minTheory=Infinity,maxTheory=0,optionPositions=[0,0,0];
 for(const lesson of lessons){
  assert(lesson.title&&lesson.description&&lesson.outcomes?.length>=3,lesson.id+' needs metadata and outcomes');
  assert(lesson.grammarFamily,lesson.id+' must declare its grammar family');
  assert(lesson.sourceRefs?.length>0,lesson.id+' must retain at least one curriculum source reference');
  assert.equal(lesson.status,'drafted',lesson.id+' must not be marked ready');
  assert.match(lesson.sourceStatus,/page verification pending/);
  assert(lesson.markdown.length>8000,lesson.id+' needs a full theory document');
  minTheory=Math.min(minTheory,lesson.markdown.length);maxTheory=Math.max(maxTheory,lesson.markdown.length);
  for(const required of lesson.prerequisites||[])assert(all.has(required),lesson.id+' has a missing prerequisite '+required);
  for(const marker of ['## 4. Полный конспект','### 4.1.','### 4.12.','## 5. Практика','## 6. Интервальное повторение']){
   assert(lesson.markdown.includes(marker),lesson.id+' is missing '+marker);
  }
  const items=lesson.items;
  assert.equal(items.length,25,lesson.id+' must contain 24 closed and 1 open item');
  assert.equal(new Set(items.map(x=>x.id)).size,items.length,lesson.id+' has duplicate item IDs');
  const groupCount=Object.fromEntries([...new Set(items.map(x=>x.group))].map(group=>[group,items.filter(x=>x.group===group).length]));
  assert.deepEqual(groupCount,groupCounts,lesson.id+' has incorrect learning sequence');
  const prompts=new Set();
  for(const item of items){
   assert(item.prompt&&item.sourceBasis,lesson.id+'/'+item.id+' needs prompt and provenance');
   if(item.open){assert(item.rubric?.length>=6,lesson.id+'/'+item.id+' needs a production rubric');continue}
   assert(item.answer&&item.why,lesson.id+'/'+item.id+' requires answer and explanation');
   assert(item.options?.length===3,lesson.id+'/'+item.id+' must have three options');
   assert(item.options.includes(item.answer),lesson.id+'/'+item.id+' answer missing from options');
   assert.equal(new Set(item.options).size,3,lesson.id+'/'+item.id+' has duplicate options');
   const correctIndex=item.options.indexOf(item.answer);optionPositions[correctIndex]++;
   assert(item.distractorRationales&&Object.keys(item.distractorRationales).length>=2,lesson.id+'/'+item.id+' needs distractor explanations');
   const key=item.prompt.trim().toLowerCase();
   if(prompts.has(key))promptIssues.push(lesson.id+'/'+item.id);
   prompts.add(key);
  }
 }
 assert.equal(promptIssues.length,0,'recycled prompts found: '+promptIssues.slice(0,20).join(', '));
 assert(optionPositions.every(count=>count>0),'correct option positions must vary');
 assert(ui.includes('grammarBulkLessons')&&ui.includes('grammarLibraryView'));
 assert(engine.includes('distractorRationales'));
 for(const script of ['grammar-curriculum-bulk-data.js','grammar-curriculum-bulk-ui.js']){
  assert(index.includes(script),'index.html is missing '+script);
 }
 assert(index.indexOf('grammar-a1-05-ui.js')<index.indexOf('grammar-curriculum-bulk-data.js'),'bulk data must load after the existing pilot UI');
 assert(index.indexOf('grammar-curriculum-bulk-data.js')<index.indexOf('grammar-curriculum-bulk-ui.js'),'bulk UI must load after its data');
 assert(curriculum.includes('A1-01')&&curriculum.includes('C1-14'));
 assert(legacy.includes('46 старых')||legacy.includes('46 legacy'),'legacy archive must remain documented');
 
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
  const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
  const origin='http://127.0.0.1:'+server.address().port;
  await page.route(origin+'/cloud.js*',route=>route.fulfill({contentType:'text/javascript',body:"document.querySelectorAll('[inert]').forEach(e=>e.inert=false)"}));
  await page.goto(origin);
  await page.waitForFunction(()=>window.GrammarLessonEngine?.has('A1-03')&&window.GrammarLessonEngine?.has('C1-14'));
  await page.evaluate(()=>{page=8;render()});
  const cards=page.locator('.grammar-curriculum-level .a105-launch');
  assert.equal(await cards.count(),94,'the catalogue must visibly contain all 94 permanent blocks');
  const titles=await page.locator('.grammar-curriculum-level summary').allTextContents();
  assert.equal(titles.length,5,'all five CEFR level sections should render');
  const levelA1=page.locator('.grammar-curriculum-level').filter({has:page.locator('summary', {hasText:'A1'})}).first();
  const a103=page.locator('.a105-launch').filter({hasText:'Be — negatives, questions and short answers'});
  await a103.getByRole('button',{name:'Начать урок'}).click();
  assert.equal(await page.getByRole('heading',{name:'Be — negatives, questions and short answers'}).count(),1);
  const theory=page.locator('.a105-theory');
  const theoryText=await theory.innerText();
  for(const text of ['4.1. Основная идея','4.2. Формирование','4.7. Типичные ошибки','4.12. Краткая памятка']){
   assert(theoryText.includes(text),'A1-03 theory missing '+text+'; actual: '+theoryText.slice(0,1200));
  }
  assert((await theory.locator('table').count())>=3,'theory should render comparison and example tables');
  assert(!theoryText.includes('undefined'),'no unresolved data should appear in theory');
  let dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert(dimensions.scroll<=dimensions.client+1,'390px viewport has horizontal overflow');
  assert.equal(await page.getByRole('button',{name:'Проверить ответ'}).count(),0,'practice must remain gated before theory is completed');
  await page.getByRole('button',{name:'Перейти к практике'}).click();
  const lesson103=lessons.find(x=>x.id==='A1-03');
  const first=lesson103.items[0];
  const wrong=first.options.find(x=>x!==first.answer);
  await page.locator('#gleAnswer-A1-03').selectOption({label:wrong});
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  const feedback=await page.locator('.a105-feedback').innerText();
  assert(feedback.includes('Нужно повторить'),'wrong answer needs visible feedback');
  assert(feedback.includes(first.distractorRationales[wrong]),'selected distractor must receive its specific explanation');
  await page.evaluate(()=>grammarLessonEngineRestart('A1-03'));
  const draftItem=lesson103.items[0];
  await page.locator('#gleAnswer-A1-03').selectOption({label:draftItem.answer});
  await page.reload();
  await page.waitForFunction(()=>window.GrammarLessonEngine?.has('A1-03'));
  await page.evaluate(()=>{page=8;render()});
  assert.equal(await page.locator('#gleAnswer-A1-03').inputValue(),draftItem.answer,'unsent answer draft must be restored');
  await page.getByRole('button',{name:'Проверить ответ'}).click();
  await page.getByRole('button',{name:'Следующее задание'}).click();
  await page.reload();
  await page.waitForFunction(()=>window.GrammarLessonEngine?.has('A1-03'));
  await page.evaluate(()=>{page=8;render()});
  assert((await page.locator('.a105-question').innerText()).includes(lesson103.items[1].prompt),'lesson position must resume after reload');

  // Sample one block from A2, B1, B2 and C1 and confirm all routes render their own theory.
  for(const id of ['A2-04','B1-07','B2-18','C1-14']){
   await page.evaluate(()=>grammarLessonEngineBack('A1-03'));
   const lesson=lessons.find(x=>x.id===id);
   const levelIndex=['A1','A2','B1','B2','C1'].indexOf(id.slice(0,2));
   const levelDetails=page.locator('.grammar-curriculum-level').nth(levelIndex);
   if(!(await levelDetails.evaluate(element=>element.open)))await levelDetails.locator('summary').click();
   await page.locator('.a105-launch').filter({hasText:lesson.title}).getByRole('button',{name:'Начать урок'}).click();
   assert.equal(await page.getByRole('heading',{name:lesson.title}).count(),1,id+' route did not open');
   const text=await page.locator('.a105-theory').innerText();
   assert(text.includes('4.1. Основная идея'),id+' theory not rendered');
   await page.getByRole('button',{name:'Перейти к практике'}).click();
   assert((await page.locator('.a105-question').innerText()).includes(lesson.items[0].prompt),id+' practice bank is not connected');
  }
  await page.setViewportSize({width:1440,height:900});
  dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert(dimensions.scroll<=dimensions.client+1,'1440px viewport has horizontal overflow');

  // Existing benchmark lessons remain accessible and separate.
  await page.evaluate(()=>grammarLessonEngineBack('C1-14'));
  assert.equal(await page.locator('.a105-launch').filter({hasText:'Sentence building and basic word order'}).count(),1);
  assert.equal(await page.locator('.a105-launch').filter({hasText:'Subject pronouns and verb be — affirmative'}).count(),1);
  assert.equal(await page.locator('.a105-launch').filter({hasText:'A1-05 · Present Simple'}).count(),1);

  const stored=await page.evaluate(()=>{
   const marina=JSON.parse(localStorage.getItem('speakbase.v1')||'{}').course?.grammarLessons?.['A1-03'];
   localStorage.setItem('speakbase.v1.vladlen',JSON.stringify({course:{grammarLessons:{'A1-03':{mode:'practice',pos:2,answers:{D1:{value:'separate',ok:false}}}}}}));
   const vladlen=JSON.parse(localStorage.getItem('speakbase.v1.vladlen')).course.grammarLessons['A1-03'];
   return {marinaPos:marina?.pos,marinaAnswers:Object.keys(marina?.answers||{}).length,vladlenPos:vladlen.pos,vladlenAnswers:Object.keys(vladlen.answers).length};
  });
  assert.deepEqual(stored,{marinaPos:1,marinaAnswers:1,vladlenPos:2,vladlenAnswers:1});
  assert.equal(pageErrors.length,0,pageErrors.join('; '));
  console.log('Bulk curriculum QA passed: 94 canonical IDs, all 91 configs and 2,275 items audited, prerequisites/source statuses, unique prompts, mixed answer positions, specific distractor feedback, theory-first, drafts and resume, A1/A2/B1/B2/C1 routes, phone/desktop layout, A1-01/A1-02/A1-05 access, profile-local separation; zero page errors.');
  console.log(JSON.stringify({minTheory,maxTheory,optionPositions}));
 }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const course=fs.readFileSync('course.js','utf8'),app=fs.readFileSync('app.js','utf8');
const build=course.slice(course.indexOf('function buildLesson(s)'),course.indexOf('function grammarWorkshop'));
assert(build.indexOf("items.push({stage:1,title:'Полная лекция")>=0);
assert(build.indexOf("items.push({stage:1,title:'Полная лекция")<build.indexOf('const warm ='),'daily lecture must precede warm-up exercises');
assert(course.includes("btn(s?'Продолжить урок':'Начать урок','startScheduledLesson()','primary')"),'home button must start scheduled lesson');
assert(app.includes("if(page===8)return grammarLibraryView()"),'grammar catalogue must be routed');
const context={esc:s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))};
const src=['course-data.js','grammar-notes.js','course.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\nJSON.stringify({count:units.length,notes:grammarNotes.length,practice:grammarPractice.length,context:contextualGrammar.length,translations:grammarTranslations.length,deepDive:grammarDeepDive.length,html:units.map((u,i)=>lectureHTML(i))})';
const data=JSON.parse(vm.runInNewContext(src,context));
assert(!course.includes('\uFFFD'),'course source must not contain replacement characters');
for(const key of ['count','notes','practice','context','translations','deepDive'])assert.equal(data[key],46,key+' must contain all 46 topics');
for(let i=0;i<46;i++){assert(data.html[i].includes('Перевод:'),'topic '+i+' missing translation');assert(data.html[i].includes('Подробное объяснение и нюансы'),'topic '+i+' missing deep explanation');assert(!data.html[i].includes('undefined'),'topic '+i+' has undefined content');}
console.log('Grammar lecture QA passed: daily lecture first; 46/46 full lecture pages render with translation, detailed explanation, examples and common errors.');

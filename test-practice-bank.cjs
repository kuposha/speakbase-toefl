'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const context=vm.createContext({console,Map,Set,Math});
for(const file of ['data.js','course-data.js','grammar-notes.js','course.js','practice-library.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
vm.runInContext('db={h:[]}',context);
const app=fs.readFileSync('app.js','utf8');
const start=app.indexOf('function buildPracticeSet(config){');
const end=app.indexOf('\nfunction start(config){',start);
assert.ok(start>=0&&end>start,'Practice builder must exist');
vm.runInContext(app.slice(start,end),context);

function build(skill,level='B2'){
  return vm.runInContext("buildPracticeSet({skill:"+skill+",level:'"+level+"',min:15,topic:'Campus life'})",context);
}
function save(items){
  context.db.h.push(...items.map(q=>({q})));
}

for(const [skill,name] of [[0,'Speaking'],[1,'Listening'],[2,'Writing'],[3,'Reading'],[4,'Grammar']]){
  const first=build(skill);
  assert.equal(first.length,10,name+' should create ten tasks');
  assert.ok(first.every(q=>q.ask&&q.skill===skill),name+' task schema');
  assert.equal(new Set(first.map(q=>q.ask)).size,10,name+' prompts should be unique');
  if(skill===0)assert.equal(new Set(first.map(q=>q.topic)).size,10,'Speaking should cover ten topics');
  if(skill===1){
    assert.equal(new Set(first.map(q=>q.source)).size,10,'Listening should use ten distinct recordings');
    assert.ok(first.every(q=>q.opts?.length===4),'Listening questions should have four choices');
  }
  if(skill===3){
    assert.equal(new Set(first.map(q=>q.source)).size,10,'Reading should use ten distinct texts');
    assert.ok(first.filter(q=>q.other?.length).every(q=>q.opts?.length===4),'Reading multiple choice should have four choices');
  }
  if(skill===2)assert.ok(first.every(q=>q.exact===(q.title==='Build a Sentence')),'Only Build a Sentence should use exact matching');
  save(first);
  const second=build(skill);
  if(skill===0)assert.ok(second.every(q=>!first.some(x=>x.topic===q.topic)),'Speaking should rotate to new topics');
  if(skill===1)assert.ok(second.every(q=>!first.some(x=>x.source===q.source)),'Listening should rotate to new recordings');
  console.log(name+': 10 unique tasks; rotation and answer format passed.');
}

for(const level of ['A2','B1','B2']){
  const tasks=build(2,level);
  assert.ok(tasks.every(q=>q.level===level),'Writing bank should respect the selected level');
}

// ---- Topic filter, fallback and honest level labelling ----
const label=title=>title.replace(/\s+\u00b7\s+\d+$/,'').trim();
const bankOf=name=>vm.runInContext('practiceBooks.'+name,context);
function buildTopic(skill,topic,level='B1'){
  context.db.h.length=0;
  return vm.runInContext('buildPracticeSet('+JSON.stringify({skill,topic,level,min:15})+')',context);
}
const noticeOf=items=>vm.runInContext('practiceNoticeText',context)(items.practiceTopic);
const levelText=q=>vm.runInContext('practiceLevelText',context)(q);

// Options come only from the bank's own labels and account for every item.
for(const [skill,name] of [[0,'Speaking'],[1,'Listening'],[2,'Writing'],[3,'Reading']]){
  const options=vm.runInContext('practiceTopicOptions('+skill+')',context);
  const bank=bankOf(name);
  assert.equal(options.reduce((sum,o)=>sum+o.count,0),bank.length,name+' topic options must cover every bank item exactly once');
  const labels=new Set(bank.map(item=>label(item.title)));
  assert.ok(options.every(o=>labels.has(o.label)),name+' options must not contain invented labels');
}

// Speaking: only three prompts carry the label "Technology" -> partial match, disclosed.
{
  const items=buildTopic(0,'Technology');
  const on=items.filter(q=>q.topicMatch);
  assert.equal(items.length,10,'Speaking topic set keeps ten tasks');
  assert.equal(on.length,3,'Speaking has exactly three Technology prompts');
  assert.ok(on.every(q=>label(q.title)==='Technology'),'on-topic Speaking tasks must carry the selected label');
  assert.ok(items.filter(q=>!q.topicMatch).every(q=>label(q.title)!=='Technology'),'mixed tasks must not be counted as on-topic');
  assert.equal(new Set(items.map(q=>q.ask)).size,10,'Speaking topic set has unique prompts');
  assert.deepEqual({o:items.practiceTopic.onTopic,m:items.practiceTopic.mixed,r:items.practiceTopic.requested},{o:3,m:7,r:10});
  assert.ok(noticeOf(items).includes('нашлось только 3 из 10'),'partial match must be disclosed');
  assert.equal(buildTopic(0,'technology').filter(q=>q.topicMatch).length,3,'topic match is case-insensitive');
}

// Listening: both questions of a recording are on-topic, the rest is mixed from other recordings.
{
  const items=buildTopic(1,'Plant roots');
  const on=items.filter(q=>q.topicMatch);
  assert.equal(items.length,10);
  assert.equal(on.length,2,'Listening label has two questions');
  assert.equal(new Set(on.map(q=>q.source)).size,1,'on-topic Listening questions share one recording');
  assert.ok(items.filter(q=>!q.topicMatch).every(q=>q.source!==on[0].source),'mixed Listening tasks must use other recordings');
  assert.equal(new Set(items.map(q=>q.ask)).size,10);
  assert.ok(items.every(q=>q.opts?.length===4),'Listening keeps four choices');
  assert.ok(noticeOf(items).includes('нашлось только 2 из 10'));
}

// Reading: a single text carries the label.
{
  const items=buildTopic(3,'Urban gardens');
  assert.equal(items.filter(q=>q.topicMatch).length,1);
  assert.equal(new Set(items.map(q=>q.source)).size,10,'Reading keeps ten distinct texts');
  assert.ok(items.filter(q=>q.topicMatch).every(q=>label(q.title)==='Urban gardens'));
}

// Writing: the task type is the bank label; the level filter still applies.
{
  const items=buildTopic(2,'Build a Sentence','B1');
  assert.equal(items.length,10);
  assert.ok(items.every(q=>q.topicMatch&&label(q.title)==='Build a Sentence'&&q.level==='B1'),'enough on-topic Writing items -> all on topic');
  assert.equal(items.practiceTopic.mixed,0);
  assert.equal(noticeOf(items),'','no notice when the topic is fully covered');
  const available=bankOf('Writing').filter(item=>item.level==='A2'&&label(item.title)==='Email').length;
  const emails=buildTopic(2,'Email','A2');
  const onEmail=emails.filter(q=>q.topicMatch);
  assert.equal(onEmail.length,Math.min(10,available),'on-topic count equals what the A2 bank really contains');
  assert.ok(emails.every(q=>q.level==='A2'),'Writing keeps the level filter in fallback');
  assert.ok(onEmail.every(q=>label(q.title)==='Email'));
  if(available<10)assert.ok(noticeOf(emails).includes('уровень A2'),'Writing notice names the level scope');
  context.db.h.length=0;
  const first=vm.runInContext("buildPracticeSet({skill:2,topic:'Build a Sentence',level:'B1',min:15})",context);
  save(first);
  const second=vm.runInContext("buildPracticeSet({skill:2,topic:'Build a Sentence',level:'B1',min:15})",context);
  assert.notDeepEqual(second.map(q=>q.ask),first.map(q=>q.ask),'topic-filtered Writing rotates through the label');
}

// Unknown topic (e.g. a legacy interface topic) -> honest mixed practice.
for(const skill of [0,1,2,3]){
  const items=buildTopic(skill,'Campus life');
  assert.equal(items.length,10);
  assert.ok(items.every(q=>!q.topicMatch),'no task may be presented as on-topic for an unknown topic');
  assert.equal(items.practiceTopic.onTopic,0);
  assert.ok(noticeOf(items).includes('нет заданий'),'fallback must be disclosed');
}

// No topic selected -> no report, no notice.
for(const skill of [0,1,2,3]){
  const items=buildTopic(skill,'');
  assert.equal(items.practiceTopic,null);
  assert.ok(items.every(q=>q.topicMatch===undefined));
  assert.equal(noticeOf(items),'');
}

// CEFR honesty: Reading/Listening/Speaking banks carry no level, so the level is only the learner's target.
for(const [skill,name] of [[0,'Speaking'],[1,'Listening'],[3,'Reading']]){
  assert.ok(bankOf(name).every(item=>!item.level),name+' bank has no CEFR markup');
  const items=buildTopic(skill,'','B2');
  assert.ok(items.every(q=>q.levelSource==='target'&&levelText(q)==='цель B2'),name+' level must be shown as a target, not as task difficulty');
}
{
  const writing=buildTopic(2,'','A2');
  assert.ok(writing.every(q=>q.levelSource==='marked'&&q.level===q.level&&levelText(q)==='A2'),'Writing keeps its confirmed CEFR markup');
  const bank=bankOf('Writing');
  assert.ok(writing.every(q=>bank.some(item=>item.ask===q.ask&&item.level===q.level)),'Writing level equals the bank markup');
  const grammar=buildTopic(4,'','B1');
  assert.ok(grammar.every(q=>q.levelSource==='marked'&&levelText(q)==='B1'),'Grammar keeps its level markup');
}

// Grammar selection ignores the topic field (existing level/topic logic unchanged).
{
  const base=buildTopic(4,'','B1').map(q=>q.ask);
  assert.deepEqual(buildTopic(4,'Technology','B1').map(q=>q.ask),base);
  assert.deepEqual(buildTopic(4,'Campus life','B1').map(q=>q.ask),base);
  assert.equal(buildTopic(4,'Technology','B1').practiceTopic,undefined,'Grammar produces no topic report');
}
console.log('Topic filter, fallback disclosure and target-level labelling checks passed.');
console.log('Practice bank checks passed.');

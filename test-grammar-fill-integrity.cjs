'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={window:{}};vm.runInNewContext(fs.readFileSync('grammar-curriculum-bulk-data.js','utf8'),c);
const pairs={'B2-14:D3':'; ','B2-21:D4':' / '};
let count=0,multiple=0;
const edge=(s,side)=>(side==='start'?s.trim().match(/^[\p{L}\p{N}]+/u):s.trim().match(/[\p{L}\p{N}]+$/u))?.[0]?.toLowerCase();
for(const l of c.window.grammarBulkLessons)for(const q of l.items.filter(x=>!x.open&&x.prompt.includes('___'))){
  count++;const id=l.id+':'+q.id,parts=q.prompt.split('___');assert.ok(!q.answer.includes('___'),id+' unresolved answer blank');
  const fills=parts.length===2?[q.answer]:q.answer.split(pairs[id]||'\u0000');
  if(parts.length>2){multiple++;assert.ok(pairs[id],id+' needs an explicit multi-blank separator')}
  assert.equal(fills.length,parts.length-1,id+' fill count');
  let completed=parts[0];
  for(let i=0;i<fills.length;i++){const fill=fills[i];assert.ok(fill.trim(),id+' empty fill');
    const before=edge(parts[i],'end'),first=edge(fill,'start'),last=edge(fill,'end'),after=edge(parts[i+1],'start');
    assert.ok(!before||!first||before!==first,id+' repeated word at left boundary');
    assert.ok(!last||!after||last!==after,id+' repeated word at right boundary');
    completed+=fill+parts[i+1];
  }
  assert.ok(!completed.includes('___'),id+' incomplete substitution');
}
assert.equal(count,731);assert.equal(multiple,2);
console.log('Fill-in integrity: '+count+' prompts, including '+multiple+' explicit multi-blank keys; no unresolved blanks or duplicated boundary words. Structural only.');

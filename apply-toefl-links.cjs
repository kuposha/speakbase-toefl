'use strict';
// Rewrites toeflLinks of every reviewed lesson from grammar-toefl-links.js, then run: node build-grammar-curriculum.cjs
const fs=require('node:fs'),path=require('node:path');
const T=require('./grammar-toefl-links.js');
const dir=path.join(__dirname,'materials','grammar-reviewed');
let changed=0;
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.json'))){
  const file=path.join(dir,name),json=JSON.parse(fs.readFileSync(file,'utf8'));
  const next=T.linkStrings(json.id,json.title);
  if(JSON.stringify(json.toeflLinks)!==JSON.stringify(next)){json.toeflLinks=next;fs.writeFileSync(file,JSON.stringify(json,null,2),'utf8');changed++}
}
console.log('toeflLinks updated in '+changed+' reviewed lessons');

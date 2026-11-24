const fs=require('fs'),assert=require('node:assert/strict'),vm=require('vm');
const context=vm.createContext({});
for(const f of ['course-data.js','grammar-notes.js'])vm.runInContext(fs.readFileSync(f,'utf8'),context);
const result=vm.runInContext(`({units:units.map(u=>Array.from(u)),notes:Array.from(grammarNotes)})`,context);
assert.equal(result.units.length,46);assert.equal(result.notes.length,46);assert.equal(new Set(result.units.map(u=>u[0])).size,46);
for(const u of result.units){assert.ok(u.length>=8&&u.every(x=>typeof x==='string'&&x.trim()));assert.notEqual(u[3],u[4]);assert.notEqual(u[5],u[6]);}
for(const n of result.notes)assert.ok(typeof n==='string'&&n.trim().length>=30);
assert.equal(new Set(result.notes).size,46);
console.log('46 grammar units: nonempty theory, contrasting choices, correction, speaking prompt and distinct explanatory note.');

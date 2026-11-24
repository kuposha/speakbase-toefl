const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const context = vm.createContext({dateObj: key => new Date(key + 'T12:00:00Z')});
const run = code => vm.runInContext(code, context);
const read = name => fs.readFileSync(name, 'utf8');
const segment = (source, start, end) => source.slice(source.indexOf(start), source.indexOf(end));
for (const file of ['course-data.js', 'grammar-notes.js']) run(read(file));
run("let activeProfile; function courseState(){return {weak:[]}}");
run(segment(read('app.js'), 'const calendarStart=', 'function plan('));
run(segment(read('course.js'), 'function selectItem', 'function buildDiagnostic'));
for (const profile of ['marina','vladlen']) {
  run('activeProfile='+JSON.stringify(profile));
  const totals = run(`(() => {
    let count = 0;
    const readings = new Set(), recordings = new Set();
    for (let time = calendarStart; time <= calendarEnd; time += calendarDay) {
      const lessonDate = new Date(time).toISOString().slice(0, 10);
      const {unit} = dayProgram(lessonDate);
      for (const last of ['Reading','Writing']) {
        const items = buildLesson({unit,last,lessonDate});
        const stages = new Set(items.map(item => item.stage));
        if (stages.size !== 6) throw Error('Missing stage: '+lessonDate);
        if (items.some(item => item.choices && !item.choices.includes(item.model))) throw Error('Missing key: '+lessonDate);
        for (const item of items) {
          if (item.stage === 5 && item.source && last === 'Reading') readings.add(item.source);
          if (item.stage === 3 && item.audio) recordings.add(item.audio);
        }
        count++;
      }
    }
    return [count,readings.size,recordings.size];
  })()`);
  assert.equal(totals[0],808);
  assert.equal(totals[1],100);
  assert(totals[2]>=8);
  console.log(profile + ': ' + totals[0] + ' date/skill combinations, ' + totals[1] + ' Reading texts, ' + totals[2] + ' Listening scripts');
}


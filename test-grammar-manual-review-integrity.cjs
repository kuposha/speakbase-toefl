const fs = require('fs');
const path = require('path');
const assert = require('assert');

const lessonsDir = path.join(__dirname, 'materials', 'grammar-lessons');
const ids = [
  ...Array.from({ length: 16 }, (_, i) => `B2-${String(i + 1).padStart(2, '0')}`),
  ...Array.from({ length: 12 }, (_, i) => `C1-${String(i + 2).padStart(2, '0')}`)
];

for (const id of ids) {
  const file = path.join(lessonsDir, `${id}.md`);
  assert.ok(fs.existsSync(file), `Missing lesson file: ${id}`);
  const text = fs.readFileSync(file, 'utf8');
  assert.ok(!/\?{3,}/.test(text), `${id} contains a repeated question-mark placeholder`);
  const snapshot = path.join(__dirname, 'materials', 'grammar-reviewed', id + '.json');
  const version = fs.existsSync(snapshot) ? '1.1-draft' : '1.0-draft';
  assert.ok(text.includes(version), `${id} must remain draft until manual review is complete`);
}

const c1Banks = require('./grammar-c1-topic-banks.cjs');
const drills = c1Banks['C1-05'].drills;
assert.strictEqual(drills.length, 7, 'C1-05 should contain seven closed items');

for (const [index, item] of drills.entries()) {
  assert.strictEqual(item.length, 7, `C1-05 item ${index + 1} must contain prompt, key, two distractors and three explanations`);
  const [prompt, answer, wrong1, wrong2, rationale, wrong1Why, wrong2Why] = item;
  assert.ok(prompt && answer && wrong1 && wrong2, `C1-05 item ${index + 1} has an empty field`);
  assert.ok(new Set([answer, wrong1, wrong2]).size === 3, `C1-05 item ${index + 1} has duplicate options`);
  assert.ok(rationale && wrong1Why && wrong2Why, `C1-05 item ${index + 1} is missing feedback`);
}

const c1Lesson = fs.readFileSync(path.join(lessonsDir, 'C1-05.md'), 'utf8');
assert.ok(!c1Lesson.includes('Translation not yet verified'), 'C1-05 must not contain placeholder translations');
assert.ok(c1Lesson.includes('PDF pages 226-227'), 'C1-05 must retain its checked Unit 101 page locator');

console.log(`Grammar manual-review integrity passed: ${ids.length} B2/C1 drafts have no repeated encoding placeholders; C1-05 has 7 structurally complete items and no placeholder translations.`);

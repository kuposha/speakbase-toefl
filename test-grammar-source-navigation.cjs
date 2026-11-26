const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const sourceRoot = path.join(__dirname, 'materials', 'source');
const lessonRoot = path.join(__dirname, 'materials', 'grammar-lessons');
const matrix = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'LESSON-SOURCE-MATRIX.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(__dirname,'materials','grammar-source-locators.json'),'utf8'));

assert.equal(matrix.lessons.length, 91, 'All generated lessons must have a source matrix row.');
assert.equal(matrix.unit_and_EGP_navigation_failures.length, 0, 'No exact source reference may have a broken page locator.');
assert.ok(Array.isArray(matrix.non_page_located_refs), 'Non-page-located sources must be explicit, not silently omitted.');

let exactRefs = 0;
let pendingRefs = 0;
for (const lesson of matrix.lessons) {
  const file = path.join(lessonRoot, lesson.id + '.md');
  assert.ok(fs.existsSync(file), lesson.id + ' Markdown source document is missing.');
  const markdown = fs.readFileSync(file, 'utf8');
  assert.match(markdown, /unit-page indexed; content review pending|unit mapped; exact page review pending/,
    lesson.id + ' must retain a pending content-verification status.');
  for (const source of lesson.sourceRefs) {
    if (!source.pages) {
      pendingRefs++;
      assert.ok(markdown.includes(source.ref), lesson.id + ' must retain the unresolved source ref ' + source.ref);
      continue;
    }
    exactRefs++;
    const start = source.pages.pdf_start ?? source.pages.start;
    const end = source.pages.pdf_end ?? source.pages.end;
    assert.ok(Number.isInteger(start) && Number.isInteger(end) && start >= 1 && end >= start,
      lesson.id + ' has an invalid page range for ' + source.ref);
    if (source.ref.startsWith('GR-01 U')) {
      const match = /^GR-01 U(\d+)(?:-(\d+))?$/.exec(source.ref);
      assert.ok(match, 'GR-01 ref syntax must contain a unit.');
      const first = Number(match[1]), last = Number(match[2] || match[1]);
      const a = pages['GR-01'].units[first];
      const b = pages['GR-01'].units[last];
      assert.equal(start, a[0], lesson.id + ' GR-01 start page mismatch.');
      assert.equal(end, b[1], lesson.id + ' GR-01 end page mismatch.');
      assert.ok(end <= pages['GR-01'].pages, lesson.id + ' GR-01 page exceeds PDF length.');
    } else if (source.ref.startsWith('GR-02 U')) {
      const match = /^GR-02 U(\d+)(?:-(\d+))?$/.exec(source.ref);
      assert.ok(match, 'GR-02 ref syntax must contain a unit.');
      const first = Number(match[1]), last = Number(match[2] || match[1]);
      const a = pages['GR-02'].units[first];
      const b = pages['GR-02'].units[last];
      assert.equal(start, a[0], lesson.id + ' GR-02 start page mismatch.');
      assert.equal(end, b[1], lesson.id + ' GR-02 end page mismatch.');
      assert.ok(end <= pages['GR-02'].pages, lesson.id + ' GR-02 page exceeds PDF length.');
    } else if (source.ref.startsWith('GR-03 U')) {
      const match = /^GR-03 U(\d+)(?:-(\d+))?$/.exec(source.ref);
      assert.ok(match, 'GR-03 ref syntax must contain a unit.');
      const first = Number(match[1]), last = Number(match[2] || match[1]);
      assert.equal(start, 24 + 2 * first, lesson.id + ' GR-03 start page mismatch.');
      assert.equal(end, 24 + 2 * last + 1, lesson.id + ' GR-03 end page mismatch.');
      assert.ok(end <= pages['GR-03'].pages, lesson.id + ' GR-03 page exceeds PDF length.');
    } else if (source.ref.startsWith('GR-05 ')) {
      const match = /^GR-05 ([A-Z]\d) p(\d+)(?:-(\d+))?$/.exec(source.ref);
      assert.ok(match, 'GR-05 page reference must include level and page number.');
      const level = match[1];
      assert.ok(pages[level], lesson.id + ' GR-05 level is missing from index.');
      assert.equal(start, Number(match[2]), lesson.id + ' GR-05 start page mismatch.');
      assert.equal(end, Number(match[3] || match[2]), lesson.id + ' GR-05 end page mismatch.');
      assert.ok(end <= pages[level].pages, lesson.id + ' GR-05 page exceeds PDF length.');
    }
    const pageText = 'PDF pages ' + start + (end !== start ? '-' + end : '');
    assert.ok(markdown.includes('| ' + source.ref + ' | ' + pageText),
      lesson.id + ' source table does not show correct pages for ' + source.ref);
  }
}
assert.ok(exactRefs >= 250, 'Expected a substantive unit/page mapping across the curriculum.');
assert.ok(pendingRefs > 0, 'Unresolved bibliography references should remain visible while they are pending.');
console.log('Grammar source-navigation QA passed:');
console.log(JSON.stringify({
  lessons: matrix.lessons.length,
  exactPageReferences: exactRefs,
  explicitlyPendingReferences: pendingRefs,
  brokenNavigation: matrix.unit_and_EGP_navigation_failures.length
}, null, 2));


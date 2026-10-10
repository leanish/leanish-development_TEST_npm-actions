const assert = require('node:assert/strict');
const { join } = require('node:path');
const test = require('node:test');

test('uses glob through its real minimatch transitive before and after remediation', async () => {
  const glob = await import('glob');
  const sync = glob.globSync ?? glob.default.sync;
  const matches = sync('*.txt', {
    cwd: join(__dirname, 'fixtures/glob'),
    nodir: true,
  });
  assert.deepEqual(matches, ['sample.txt']);
});

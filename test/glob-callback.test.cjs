const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { glob } = require('glob');

// Case 16: glob 4 was a callable callback API. glob 9 switched to promises and glob 10 dropped the default export,
// so this test awaits the named glob function, keeping the matched files asserted.
test('matches the manifest files through the promise API', async () => {
  const files = await glob('package*.json', { cwd: path.join(__dirname, '..') });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

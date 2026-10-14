const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { glob } = require('glob');

// Case 16: glob 4's module was a callable function taking a callback. glob 9 replaced it with named
// promise/sync exports and glob 10 removed the default export, so this test uses the named promise API.
test('matches the manifest files through the promise API', async () => {
  const files = await glob('package*.json', { cwd: path.join(__dirname, '..') });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { glob } = require('glob');

// Case 16: glob 13 exposes a named promise API in place of glob 4's callable callback API.
test('matches the manifest files through the promise API', async () => {
  const files = await glob('package*.json', { cwd: path.join(__dirname, '..') });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

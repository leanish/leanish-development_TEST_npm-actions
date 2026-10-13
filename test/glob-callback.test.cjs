const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { promisify } = require('node:util');
const glob = require('glob');

// Case 16: glob 4's module is a callable function taking a callback. glob 9 replaced it with named
// promise/sync exports, so this test promisifies the callable form and otherwise calls `glob.glob`.
const globFiles = typeof glob === 'function' ? promisify(glob) : glob.glob;

test('matches the manifest files through the glob API before and after a major bump', async () => {
  const files = await globFiles('package*.json', { cwd: path.join(__dirname, '..') });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

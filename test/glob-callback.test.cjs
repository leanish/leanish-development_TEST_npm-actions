const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { promisify } = require('node:util');
const glob = require('glob');

// Case 16: support glob 4's callback API and the named promise export in newer majors.
const globAsync = typeof glob === 'function' ? promisify(glob) : glob.glob;

test('matches the manifest files through the async API', async () => {
  const files = await globAsync('package*.json', { cwd: path.join(__dirname, '..') });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

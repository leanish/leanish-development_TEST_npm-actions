const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { promisify } = require('node:util');
const globModule = require('glob');

// Case 16: glob 4 exports a callable callback API; glob 9+ replaced it with named promise exports.
// Promisify the callable export and use the named promise export otherwise, so this runs on both majors.
const glob = typeof globModule === 'function' ? promisify(globModule) : globModule.glob;

test('matches the manifest files through the promise API', async () => {
  const files = await glob('package*.json', { cwd: path.join(__dirname, '..') });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const glob = require('glob');

// Case 16: keep the same assertion across glob 4's callback API and newer named promise exports.
test('matches the manifest files through the async API', async () => {
  const pattern = 'package*.json';
  const options = { cwd: path.join(__dirname, '..') };
  const files = await (typeof glob === 'function'
    ? new Promise((resolve, reject) => {
      glob(pattern, options, (error, matches) => (error ? reject(error) : resolve(matches)));
    })
    : glob.glob(pattern, options));
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

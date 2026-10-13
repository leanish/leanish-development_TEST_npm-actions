const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const glob = require('glob');

// Case 16: glob 4's module is a callable function taking a callback. glob 9 replaced it with named
// promise/sync exports, so bump-it's glob major has to adapt this test, keeping the matched files asserted.
test('matches the manifest files before and after the glob major upgrade', async () => {
  const options = { cwd: path.join(__dirname, '..') };
  const files = typeof glob === 'function'
    ? await new Promise((resolve, reject) => {
      glob('package*.json', options, (error, matches) => (error ? reject(error) : resolve(matches)));
    })
    : await glob.glob('package*.json', options);
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

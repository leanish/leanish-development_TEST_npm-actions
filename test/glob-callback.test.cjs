const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const glob = require('glob');

// Case 16: glob 4 exports a callable function taking a callback; glob 9 replaced it with named promise/sync
// exports. Both shapes are accepted so this test stays compatible with the baseline glob 4 and the planned glob 13.
test('matches the manifest files through the callback or promise API', async () => {
  const cwd = path.join(__dirname, '..');
  const files = typeof glob === 'function'
    ? await new Promise((resolve, reject) => {
        glob('package*.json', { cwd }, (error, matches) => (error ? reject(error) : resolve(matches)));
      })
    : await glob.glob('package*.json', { cwd });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

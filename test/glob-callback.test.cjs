const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const glob = require('glob');

// glob 4 exposes a callback API; glob 9 and later expose a named promise API.
test('matches the manifest files through the supported glob API', async () => {
  const pattern = 'package*.json';
  const options = { cwd: path.join(__dirname, '..') };
  const files = typeof glob === 'function'
    ? await new Promise((resolve, reject) => {
      glob(pattern, options, (error, matches) => (error ? reject(error) : resolve(matches)));
    })
    : await glob.glob(pattern, options);

  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

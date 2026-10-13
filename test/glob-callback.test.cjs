const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const glob = require('glob');

// Case 16: support glob 4's callback API and later versions' named promise API.
test('matches the manifest files through the asynchronous API', async () => {
  const options = { cwd: path.join(__dirname, '..') };
  const files = typeof glob === 'function'
    ? await new Promise((resolve, reject) => {
      glob('package*.json', options, (error, matches) => (error ? reject(error) : resolve(matches)));
    })
    : await glob.glob('package*.json', options);
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

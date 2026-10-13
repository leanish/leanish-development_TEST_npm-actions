const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const globModule = require('glob');

// Case 16: glob 4 is callable and uses callbacks; current glob exposes a named promise API.
// Keep the same match assertion so this test remains useful on both the base and upgraded versions.
test('matches the manifest files through the glob API', async () => {
  const pattern = 'package*.json';
  const options = { cwd: path.join(__dirname, '..') };
  const files = typeof globModule === 'function'
    ? await new Promise((resolve, reject) => {
      globModule(pattern, options, (error, matches) => (error ? reject(error) : resolve(matches)));
    })
    : await globModule.glob(pattern, options);

  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

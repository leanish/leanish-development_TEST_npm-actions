const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

// Case 16: glob 4 uses a callable callback API; glob 13 exposes a named promise API.
test('matches the manifest files with the available glob API', async () => {
  const globModule = await import('glob');
  const pattern = 'package*.json';
  const options = { cwd: path.join(__dirname, '..') };
  const files = globModule.glob
    ? await globModule.glob(pattern, options)
    : await new Promise((resolve, reject) => {
      globModule.default(pattern, options, (error, matches) => (error ? reject(error) : resolve(matches)));
    });
  assert.deepEqual([...files].sort(), ['package-lock.json', 'package.json']);
});

const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const test = require('node:test');

test('uses micromatch through lint-staged before and after remediation', () => {
  const fromLintStaged = createRequire(require.resolve('lint-staged'));
  const micromatch = fromLintStaged('micromatch');

  assert.deepEqual(micromatch(['sample.js', 'sample.txt'], '*.js'), ['sample.js']);
});

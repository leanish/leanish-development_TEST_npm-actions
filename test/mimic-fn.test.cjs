const assert = require('node:assert/strict');
const test = require('node:test');

// Case 14: mimic-fn 4 is ESM-only; a dynamic import loads either version, so the case stays about
// version selection (5.0.0 is deprecated and must not be the major target), not module format.
test('copies the name of the function it mimics', async () => {
  const { default: mimicFn } = await import('mimic-fn');
  function original() {}
  const wrapper = mimicFn(() => {}, original);
  assert.equal(wrapper.name, 'original');
});

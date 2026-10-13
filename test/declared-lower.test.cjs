const assert = require('node:assert/strict');
const test = require('node:test');

// Dynamic import accepts the baseline CommonJS export and strip-ansi 7's ESM export.
test('uses root B to strip ANSI text', async () => {
  const { default: stripAnsi } = await import('strip-ansi');
  assert.equal(stripAnsi('\u001b[31mfixture\u001b[39m'), 'fixture');
});

test('uses A and its independently resolved B to measure ANSI text', async () => {
  const { default: stringWidth } = await import('string-width');
  assert.equal(stringWidth('\u001b[31mfixture\u001b[39m'), 7);
});

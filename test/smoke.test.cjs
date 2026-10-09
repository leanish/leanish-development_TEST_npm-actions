const assert = require('node:assert/strict');
const test = require('node:test');
const JSON5 = require('json5');
const optimist = require('optimist');
const semver = require('semver');
const wordwrap = require('wordwrap');

test('parses a benign JSON5 document', () => {
  assert.deepEqual(JSON5.parse("{label: 'fixture', count: 2,}"), {
    label: 'fixture', count: 2,
  });
});

test('uses the vulnerable transitive through its real parent API', () => {
  const args = optimist(['--count', '2', 'fixture']).argv;
  assert.equal(args.count, 2);
  assert.deepEqual(args._, ['fixture']);
});

test('uses a stable semver API across routine bumps', () => {
  assert.equal(semver.satisfies('7.8.5', '^7.7.4'), true);
  assert.equal(semver.satisfies('8.0.0', '^7.7.4'), false);
});

test('uses the same wrapping API before and after a major bump', () => {
  assert.equal(wordwrap(0, 10)('alpha beta gamma'), 'alpha\nbeta gamma');
});

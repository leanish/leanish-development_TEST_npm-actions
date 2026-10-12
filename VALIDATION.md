# Validation

Each record below states how far its evidence goes:

- **seed/probe verified**: the seed, or a local probe of it, was checked; no tool ran.
- **real tool run verified**: a real secure-it or bump-it run produced it.

| Record | Date | Evidence state | Tool version | PRs / heads |
|---|---|---|---|---|
| Local validation | 2026-10-09 | seed/probe verified (offline dry runs; npm test not run) | not recorded | none |
| Case 10 addition | 2026-10-09 | seed/probe verified (synthetic heads; API tests not run) | not recorded | none |
| Claude networked review and wordwrap correction | 2026-10-09 | seed/probe verified (npm ci and six tests passed) | none | none |
| Fixture fixes 1–5 | 2026-10-10 | seed/probe verified (identity check with v0.2.2 code; npm test not run) | v0.2.2 (identity check only) | none |
| Tool runs recorded in EXPECTED.md | 2026-10-10 to 2026-10-11 | real tool run verified | see below | see below |
| Tool branches | fetched 2026-10-12 | real tool run verified (branch contents only) | not recorded | see below |

The package counts in these records describe the graph at each date. The
2026-10-12 seed has 196 installed packages and twelve direct dependencies.

## Local validation — 2026-10-09

- YAML parsed with the gate checkout's yaml library; workflow events verified.
- .github/supply-chain.json accepted by the gate's actual readSettings/parser.
- Every EXPECTED.md seed file/line reference points to an existing line.
- No commits, pushes, remote repository creation or tool publication attempted.

These are preparation checks, not a real weekly run. Gate scans, candidate
selection, SHA/tag identity, publish times and actual PR verification require
Claude's networked review and adoption. See every VERIFY item in EXPECTED.md.

- node --check test/smoke.test.cjs passed.
- npm ci --dry-run --offline --ignore-scripts --no-audit --no-fund accepted the
  manifest/lockfile and planned exactly five packages, without changing the lock.
- npm registry-cache bodies used for lock data were SHA-512 checked before reading.
- Full npm ci --offline with an isolated cache failed ENOTCACHED: tarballs missing.
  npm test was NOT run; actual baseline and updated smoke tests remain unverified.

- The real treeSources parser detects the expected root: npm lock only; five locked packages/four directs and three Action uses also parsed.

## Case 10 addition — 2026-10-09

The earlier five-package validation above describes the fixture before case 10.

- npm ci --dry-run --offline --ignore-scripts --no-audit --no-fund accepts the
  expanded lock and plans exactly 12 installed packages; lock bytes stay unchanged.
- node --check test/declared-lower.test.cjs passed.
- Real inventory/direct parsers see 12 installed packages, six directs, root B
  strip-ansi 4.0.0 and nested B 6.0.1 under string-width.
- A synthetic A-only head passes actual directChangesOutside checks with root B
  unchanged while the nested B changes to 7.1.0. changedPackages reports that
  nested change and does not report the unchanged root B.
- New lock entries use SHA-512 checked cached registry manifests and genuine
  integrity/publish-date metadata. All seven new baseline tarballs are absent
  from the local request cache, so the two new API tests were NOT run.
- Actual installs, candidate planning, age/identity/advisory checks, updated API
  tests and full tool/gate verification remain VERIFY items; no E2E pass is claimed.

## Claude networked review and wordwrap correction — 2026-10-09

- Claude reported npm ci --ignore-scripts succeeds with 12 packages.
- Corrected the wordwrap 0.0.3 expectation to alpha\nbeta gamma, matching the
  installed package's observed output for wordwrap(0, 10).
- Post-fix npm test passed locally: all six tests, including both declared-lower
  dependency tests. Selected update heads and full tool/gate runs remain pending.

## Fixture fixes 1–5 — 2026-10-10

- Corrected setup-node's SHA to the official v4.0.0 release commit
  8f152de45cc393bb48ce5d89d36b731f54556e65, preserving the v4.0.0 comment.
- Added the real glob 4.5.3 -> minimatch ^2.0.1 graph, locked at minimatch 2.0.10.
  Public cached registry bodies/tarball digests were checked. Source validation
  caught proxy URLs during preparation; final lock URLs all use registry.npmjs.org
  with integrities matching verified public metadata.
- Actual v0.2.2 NpmRegistry.identityProblems accepts minimatch 2.0.10 -> 3.1.5:
  empty problem list, no exception, publisher isaacs for both. Cached fix publish
  date is 2026-02-25. This verifies cached identity, not current advisories or
  secure-it's live minimum-fix selection. Evidence is in REGISTRY-EVIDENCE.json.
- Real lockedPackages/directDependencies/sourceProblems parsers accept the
  21-package, seven-direct graph with no disallowed registry sources. Actual
  gate readSettings and YAML parsers accept policy and workflows.
- node --check test/transitive-floor.test.cjs passes. npm ci dry-run/offline
  accepts the expanded lock and plans 21 packages. Full offline ci with a local
  cache fails ENOTCACHED: glob 4.5.3 and minimatch 2.0.10 tarballs are missing
  (19 of 21 locked tarballs were available and digest-checked).
- npm test was attempted after that failed install and fails on missing modules;
  this is not a test pass or a demonstrated API defect. Baseline with the new
  graph, the fixed head and live gate verification require networked checks.
- EXPECTED.md contains the minimist identity-blocker correction, separate successful
  minimatch floor trial, concrete npm case-10 probe commands, deferred-major
  evidence contract and version boundary. README links to that single contract.
- Documented npm case-10 shell passes sh -n; its copy-preparation step successfully
  creates three isolated copies without .git, node_modules or .validation.
- Scoped npm test discovery to test/*.test.cjs so ignored local probe copies cannot
  become extra test inputs during subsequent root checks. Networked installs and
  API probes remain pending; no updated test pass is claimed.

## Tool runs recorded in EXPECTED.md — 2026-10-10 to 2026-10-11

These real runs are recorded in EXPECTED.md, where they set expectations:

- **Run 1**, the first run, before 949ef56 on 2026-10-10 (case 7, "minimist identity
  blocker"): secure-it blocked minimist 0.0.8 -> 0.2.4 on publisher identity. Tool
  version and PR not recorded.
- **Two-obligation run, 2026-10-11** ("B: two obligations"): candidate supply-chain
  c31c395 on seed a6602c5 kept micromatch and yaml overrides, before the 0.3.0
  parent rule. The run's note text is quoted there. Its PR, #6 in the record of
  76f7430, was re-planned on later seeds.

## Tool branches — fetched 2026-10-12

Real tool branches, read from this clone's remote-tracking refs. Only their
contents are evidence here: PR state, tool versions and CI results aren't recorded
(the PR number below comes from the 2026-10-12 fixture plan).

- `secure-it/2026-10-10-security` (head 621843f): json5 2.2.1 -> 2.2.2; lint-staged
  15.2.4 -> 15.2.5 with micromatch locked at 4.0.8; yaml override 2.8.3 plus its
  security floor. This matches case 7 "vulnerable direct" and "B: two obligations".
- `secure-it/2026-10-10-minimatch-major` (head ce394c8): minimatch override 3.1.4 plus
  a security floor for five advisories, including GHSA-f8q6-p94x-37v3; glob stays
  4.5.3. This matches "B: no eligible parent". The target is 3.1.4, not the cached
  3.1.5 example.
- `bump-it/2026-10-10-glob-major` (#12, head 2695ddf): glob 4.5.3 -> 13.0.6.
- Other tool branches: `bump-it/2026-10-10-routine` and the checkout, setup-node,
  string-width, strip-ansi and wordwrap major branches.

## Case 16 seed — 2026-10-12 (seed/probe verified)

Seeded alone on the 82-package lock. Probes on copies: glob 13.0.6 alone fails
`test/glob-callback.test.cjs` with `TypeError: glob is not a function`; with
`const { glob } = require('glob')` and an awaited `glob(...)` it passes. Tool-run outcomes
go below when recorded.

### Case 16 tool run — 2026-10-12 (real tool run verified; supply-chain v0.4.2, seed `4d1c1fa`)

bump-it `review` (with `agent-fixtures.yaml`), three ticks about eight minutes apart:
1. [#12](https://github.com/leanish/supply-chain_TEST_npm-actions/pull/12) `rebased` onto `4d1c1fa`
   (clean merge); `npm test` then failed on head `f5a304a`.
2. `adapted` (attempt 2 of 2): the agent made `test/glob-callback.test.cjs` work with both
   glob 4's callable callback API and glob 13's named `glob.glob` promise, keeping the
   asserted file list; tests green on head `72ac490`. ~USD 0.10.
3. `marked-ready` (the rebase had turned it back into a draft).

## Cases 13–15 seed — 2026-10-12 (seed/probe verified)

`npm install --package-lock-only --ignore-scripts --min-release-age=7` with npm 11.20
produced the seed lock (`@types/node` 24.1.0, `mimic-fn` 3.1.0, `stylelint-order` 6.0.4,
first with `stylelint` 16.0.2 and 189 installed packages, then re-seeded with `stylelint`
16.17.0 and 196 packages; see the first run below). `npm ci` and `npm test` pass (10 tests).
`mimic-fn` 4.0.0 passes unchanged (dynamic import). Registry facts checked the same day:
`mimic-fn` 5.0.0 deprecated ("Renamed to mimic-function"); `stylelint-order` 8.1.2 (young)
and 8.1.1 peer `stylelint` `^16.18.0 || ^17.0.0`; no GitHub advisory for `stylelint`
16.0.2 or 16.17.0. Tool-run outcomes go below when recorded.

### Cases 13–15 first tool run — 2026-10-12 (real tool run verified; v0.4.2, seed `8c4111a`, stylelint 16.0.2)

bump-it `run` (with `agent-fixtures.yaml`), ~USD 0.64:
- **Case 13:** every unit's notes say "@types/node targets are capped at the lowest supported
  Node major (24; .github/workflows/ci.yml: node-version, package.json: engines.node)"; no
  `@types/node` major unit was planned.
- **Case 14:** `mimic-fn-major` published [#15](https://github.com/leanish/supply-chain_TEST_npm-actions/pull/15),
  "update mimic-fn to 4.0.0", not the newer deprecated 5.0.0.
- **Case 15:** `stylelint-major` (17.16.0) `blocked`: "stylelint-order@6.0.4 requires peer
  stylelint ^14.0.0 || ^15.0.0 || ^16.0.1, not 17.16.0". `stylelint-order-major` and the
  routine `failed` verification: moving stylelint from 16.0.2 to 16.18+ also moved
  `file-entry-cache` 7.0.2 -> 11.1.5 and `flat-cache` 3.2.0 -> 6.1.23, built from
  `jaredwray/cacheable`, a repository the replaced versions don't declare (the npm
  publisher-identity check, working as intended). Re-seeded `stylelint` at 16.17.0, whose
  `file-entry-cache` 10.x and `flat-cache` 6.x already come from that repository, so the
  companion move no longer changes publisher identity.

### Cases 13–15 second tool run — 2026-10-12 (real tool run verified; v0.4.2, seed `4a86c6b`, stylelint 16.17.0)

bump-it `run` (with `agent-fixtures.yaml`), ~USD 0.51:
- **Case 15:** `stylelint-order-major` published [#16](https://github.com/leanish/supply-chain_TEST_npm-actions/pull/16),
  "update stylelint-order to 8.1.1 with stylelint 16.18.0": the plugin's major (8.1.1, the
  highest aged 8.x) carries `stylelint` 16.17.0 -> 16.18.0, the lowest version its peer
  `^16.18.0 || ^17.0.0` accepts, in the same PR. `stylelint-major` (17.16.0) stayed `blocked`
  for the same peer reason as the first run.
- The routine passed again (updated #7); #15 (mimic-fn 4.0.0) and the cap note unchanged.
- Unrelated: one push to `bump-it/2026-10-10-string-width-major` was rejected by GitHub
  (`remote: fatal error in commit_refs`, a server-side error); the next run retries it.

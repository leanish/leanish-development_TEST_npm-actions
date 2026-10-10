# Local validation — 2026-10-09

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

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

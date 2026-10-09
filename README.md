# npm and GitHub Actions fixture

Covers cases **7, 8, 9, 10**: semver behind by minor, wordwrap behind by major, vulnerable
direct JSON5, vulnerable transitive minimist, older SHA-pinned action releases,
and registry-timing expectations. Twelve installed packages; no lifecycle scripts.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

Use Node 24+ and npm 11.17+. `package-lock.json` is a complete lockfile v3 with
registry URLs and SHA-512 integrities taken from the local npm request cache.
`REGISTRY-EVIDENCE.json` records cache-derived publish dates, not current metadata.
Run `npm ci`, not `npm install` or `npm audit fix`, when validating the initial
baseline: recreating the lock can consume the intended transitive fixture.

JSON5 2.2.1 has CVE-2022-46175; 2.2.2 is its historically aged same-line fix.
optimist 0.6.1 requires minimist `~0.0.1`, locked here at 0.0.8, affected by
CVE-2020-7598 and CVE-2021-44906. The aged safe 0.2.4 is outside the parent's range
and outside the old npm compatible line. Expect a separate secure-it major unit
with an override plus a security floor record, not a silent lock-only update.
optimist stays 0.6.1. bump-it may refresh npm transitives only within the parent's
ranges and cannot solve this minimist case by that mechanism.

The benign tests use APIs stable across the candidate lines and through the real
optimist parent. They do not lock tests to vulnerable versions and should remain
green after fixes. The gate, not an exploit test or an npm audit threshold, checks
whether the advisories are gone. Neither the build workflow nor tests depend on
the gate passing; intentionally vulnerable baseline test results remain visible.

Case 10 declares root B=strip-ansi 4.0.0 and A=string-width 4.2.3, whose
`^6.0.1` requirement resolves B=6.0.1 under A. Both copies are real installed
packages and must be scanned. bump-it plans the root B from 4.0.0; an A major
can raise its nested B without changing the root B declaration or installed copy.
The added tests use dynamic import for baseline CommonJS and later ESM packages,
so benign API checks remain compatible with the illustrative newer major lines.
See EXPECTED.md for independent B-only and A-only acceptance trials. No override
is added: nesting is npm's ordinary resolution of incompatible ranges.

These repositories are synthetic test inputs, not packages to publish. The baseline
contains deliberately old dependencies. The security fixtures should make `scan`
red while their build/tests stay green. On PRs, `compare` permits inherited findings
and fails on newly introduced findings; a green PR does not prove `main` is clean.

Claude owns GitHub creation/adoption and the weekly tool configuration. Use private
repos under `leanish`, default branch `main`, with no Dependabot update PRs. Require
`supply-chain / supply-chain`, `supply-chain / cooldown`, and the build/test check
when the account plan supports required checks on private repositories. Keep the
daily gate scan enabled; the macOS weekly tools are separate from this workflow.

The gate is pinned to the supply-chain v0.2.2 release commit
`a8c3f1010bc321ab3c45603eb5600ff9dda7ff3a` (`v0.2.2`), like the other adopters.

Before the first live run, resolve every `VERIFY:` in EXPECTED.md, capture a gate
inventory/report, then preview candidates as the adoption guide describes. Run
secure-it first on the vulnerable baseline, capture its plan/diff/report without
merging, then bump-it against that same baseline. Each tool plans from `main`, not
from the other's PR. Record exact versions chosen, findings fixed/inherited,
notes, failures, cooldown and CI results; CLI exit 0 alone is not acceptance.
Merge/rebase only after collecting that evidence, then run review and scan again.

Repeated weeks on an unchanged baseline should produce `already-open` and review
existing PRs. After merging fixes, those moves disappear; a new PR every week is
not expected. Retain the initial baseline revision externally for repeat trials.
If re-seeding, use a deliberate ordinary commit or a fresh test repo; the gate
should reject reintroducing vulnerabilities. Do not force-push or weaken policy.

No release is fabricated to test age. The expected baseline fixes are historically
aged; newest routine/major targets depend on registry time and the current advisory
snapshot. bump-it must select only eligible aged targets. If a future security fix
is younger than 7 days, expect a draft security-cooldown PR, `supply-chain` passing
only after its rule proof, and `cooldown` red until it ages. Missing registry data
is an incomplete run, never a clean verdict. Exact historical target examples in
EXPECTED.md are not frozen assertions about the live registry.

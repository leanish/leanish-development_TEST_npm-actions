# Expected outcomes — npm and Actions

Baseline authored 2026-10-09. REGISTRY-EVIDENCE.json contains cache-derived real
publish dates and integrity values for all twelve locked packages. This lock was
constructed from their registry manifests; it has no invented tarball/hash.

| Case | File/line | bump-it | secure-it | Gate |
|---|---|---|---|---|
| 7: minor-behind direct | `package.json:15` and `package-lock.json:74` | 7.7.4 -> highest aged safe 7.x in routine; cached 7.8.5 is an aged example. Newer eligible major, if any, is separate. | No named baseline advisory expected; live snapshot decides. | Exact computed manifest/lock target, publisher identity and provenance verified; aged/safe comparison/cooldown PASS. |
| 7: major-behind direct | `package.json:18` and `package-lock.json:133` | 0.0.3 -> historical 1.0.0 (or highest newer eligible line) in a separate major PR. Preserve optimist's independently required 0.0.x copy. | No named baseline advisory expected. | Benign wrapping test PASS across lines; new nested copies judged normally. |
| 7: vulnerable direct | `package.json:13` and `package-lock.json:46` | Highest eligible aged safe 2.x in routine; cached 2.2.3 is an example. | Non-major security PR to lowest aged fixing version, historically 2.2.2. Change direct declaration + computed lock; no security floor required. | Baseline scan FAIL for CVE-2022-46175; fix comparison marks advisory fixed. May PASS with inherited minimist findings. |
| 7: vulnerable transitive | `package.json:14` (parent), `package-lock.json:70`, `package-lock.json:58` | npm transitive refresh remains in ~0.0.1; cannot reach safe 0.2.4. optimist has historical latest 0.6.1, so no parent refresh expected. No minimist direct declaration may be invented. | Separate MAJOR security unit for minimist 0.0.8 -> historical 0.2.4. The parent's range excludes that fix: lasting override (global minimist or scoped under optimist) + matching .github/dependency-floors.json security entry. Keep optimist 0.6.1. | Baseline scan FAIL for both minimist advisories. Fix must resolve all installed minimist copies at/above its recorded floor; override path selectors and declaration are validated. |

JSON5 and minimist security fixes need not be one PR: minimist's 0.0.8 compatible
line is its npm caret line, not the entire numeric zero major. 0.2.4 is outside it,
so it is a major unit. Tests should pass on both baseline and remediated heads.
After both security PRs are applied, full scan passes for the named advisories;
if only one lands, the other finding still makes scan FAIL. compare on either PR
can PASS because the other finding is inherited. No exceptions are seeded.

A minimist floor cannot be removed just because 0.2.4 is locked: unlocked resolution
without the override still uses optimist's ~0.0.1 range. secure-it must retain it.
A floor-removal PR would need a changed parent/range with an independently safe
unlocked resolution; there is no planned parent update in this fixture.

Advisory sources:
- [CVE-2022-46175 / GHSA-9c47-m6qq-7p4h](https://github.com/advisories/GHSA-9c47-m6qq-7p4h): JSON5 2.x before 2.2.2.
- [CVE-2020-7598 / GHSA-vh95-rmgr-6w4m](https://github.com/advisories/GHSA-vh95-rmgr-6w4m): minimist prototype pollution; the later fix below covers both groups.
- [CVE-2021-44906 / GHSA-xvch-5gv4-984h](https://github.com/advisories/GHSA-xvch-5gv4-984h): minimist <0.2.4, and 1.x before 1.2.6.

Claude reported npm ci --ignore-scripts succeeds with 12 packages. The baseline
wordwrap 0.0.3 expectation now reflects its observed output: alpha\nbeta gamma.
Post-fix npm test passes all six baseline tests locally.

`VERIFY: NPM` — Run tests on selected update heads and confirm the manually
assembled cache-derived lock stays accepted unchanged by npm 11.17+. Check all
manifest/lock versions, registry
integrities, signatures/provenance, current deprecations/publisher identities and
candidate publish times. Cached dates are historical evidence, not current registry
verification. Confirm JSON5 2.2.2 and minimist 0.2.4 remain the rule-picked lowest
aged clean targets for ALL advisories in the live snapshot; do not accept a newer
routine bump as proof secure-it chose its minimal fix. The baseline semver 7.7.4,
wordwrap 0.0.3, optimist 0.6.1, JSON5 2.2.1 and minimist 0.0.8 are historically aged.

## Shared gate and action checks

| Case | File/line | bump-it | secure-it | Gate |
|---|---|---|---|---|
| Gate adoption | `.github/workflows/supply-chain.yml:22` | Own Action update may join routine/major according to release line; repin before trials. | Only if an advisory has a selected fix. | Daily scan, PR compare, open-PR rescan; require supply-chain and cooldown after repin. |
| 8: checkout pin | `.github/workflows/ci.yml:16` | Routine: highest eligible v4 release and matching commit/comment; separate major for highest eligible newer line. | No fixed security expectation; live advisories decide. | Changed SHA must match its full release tag comment and aged release; otherwise FAIL. |
| 8: Node setup pin | `.github/workflows/ci.yml:19` | Routine v4 refresh and separate newer-major PR when eligible; preserve Node 24 input. | Live advisories decide. | Same SHA/tag/age checks. |

Case 9: the release-age policy is `.github/supply-chain.json:2` (`releaseAgeDays: 7`).
No deliberately young fixture exists. For aged changed targets and a complete passing
comparison, cooldown should PASS. A rule-approved young security target can make
comparison PASS but cooldown FAIL (held); bump-it must not publish a held plan.
Routine and major exact targets, advisory counts and extra security units are live
registry outcomes, not fixed to the illustrative versions below. npm identity,
source or provenance breaks can block an otherwise safe version.

Gate: pinned to the supply-chain v0.2.2 release commit `a8c3f1010bc321ab3c45603eb5600ff9dda7ff3a` (`# v0.2.2`), as the
other adopters are.

`VERIFY: ACTIONS` — Confirm each exact SHA/tag pair and published release date via
GitHub (dereference annotated tags). Baseline checkout v4.1.1 is
b4ffde65f46336ab88eb53be808477a3936bae11 (2023 release). Baseline setup-node v4.0.0 is
1a4442cacd436585916779262731d5b162bc6ec7 (2023 release).
Choose live eligible routine and newer-major releases using their actual published
times. A moved tag, missing release or new advisory changes the expected candidate.


## Case 10: root B is lower than A's nested B

| Variant | File/line | bump-it | secure-it | Gate / verification |
|---|---|---|---|---|
| A baseline | `package.json:16` and `package-lock.json:86` | A=string-width 4.2.3 is the historical latest 4.x; newer eligible major gets its own PR. Aged 5.1.2 is an illustrative focused probe; highest eligible live target may be 8.x or newer. | Actual advisories decide; no new intentional vulnerable baseline here. | A 4.2.3 requires B=strip-ansi ^6.0.1. Gate scans that real installed graph. |
| Root B baseline | `package.json:17` and `package-lock.json:121` | Plan direct B from its exact root declaration/installed copy 4.0.0, not A's 6.0.1. Historical v4 has no later patch; a newer eligible major has its own PR. | Judge each installed copy independently. | Root B 4.0.0 is actually installed/scanned; unlike Gradle it has not been overridden away. Its ordinary declaration remains effective for root imports. |
| Nested B baseline | `package-lock.json:109` | This copy is transitive, not another root direct move. Routine transitive refresh must stay inside A's ^6.0.1 range. | An advisory on this copy may require a transitive fix; no floor/override is seeded. | B 6.0.1 is nested under A because root B 4.0.0 cannot satisfy A. Both B versions/locations must appear in the inventory. |
| A-only update | Same A line, retaining root B 4.0.0 | A's major PR can raise nested B to >=7.0.1; 5.1.2 -> strip-ansi ^7.0.1 is a cache-confirmed example. Root B dependency fields/installed version remain unchanged. | Each changed transitive faces ordinary security checks. | Computed lock can replace nested B 6.0.1 with an eligible 7.x without rejecting an unplanned DIRECT B change: only the nested copy changed. Gate judges its actual age, source, identity/provenance and advisories. |

Expected initial graph:

- Root declarations: string-width 4.2.3, strip-ansi 4.0.0.
- Root installed B: node_modules/strip-ansi 4.0.0 -> ansi-regex ^3.0.0,
  locked at root ansi-regex 3.0.1.
- A's installed B: node_modules/string-width/node_modules/strip-ansi 6.0.1
  -> ansi-regex ^5.0.1, locked under string-width at ansi-regex 5.0.1.
- A also installs emoji-regex 8.0.0 and is-fullwidth-code-point 3.0.0.

No override or direct declaration for the nested copy is added. Existing JSON5,
optimist/minimist and wordwrap cases remain unchanged. Total initial lock inventory:
**12 installed packages, six direct dependencies**, with two distinct strip-ansi
versions. REGISTRY-EVIDENCE.json records each added location, cached publish date
and actual registry integrity. All chosen baseline metadata dates are older than
seven days; current registry/advisory verification is still required.

Use A's independent major PR to observe the A-only path before merging B's major
PR: assert root strip-ansi remains 4.0.0 and record the new nested copy/path. Hoisting
may relocate a transitive when later direct requirements become compatible; compare
actual resolution paths rather than requiring the same nesting after every merge.
The new API tests use dynamic import, accepting both baseline CommonJS and the
later ESM major APIs. Run npm test on baseline and A-only/B-only heads. A failure
for age/identity/advisories is legitimate, not evidence that declaration versus
resolution handling itself rejected the transitive change.

`VERIFY: DECLARED-LOWER-NPM` — Run npm ci and tests with npm >=11.17; confirm the
cache-derived nested lock is installed unchanged, root/nested module paths and
12-package/six-direct inventory. Recheck registry integrity, release times,
deprecations, identities and advisory coverage for string-width 4.2.3, strip-ansi
4.0.0/6.0.1, ansi-regex 3.0.1/5.0.1, emoji-regex 8.0.0 and
is-fullwidth-code-point 3.0.0. Confirm actual B-major candidate originates at
root 4.0.0. Verify the selected A major raises nested B while preserving root B
and that full tool verification and gate/cooldown pass; 5.1.2/7.1.0 are aged
illustrations, not a claim about the current highest eligible targets.

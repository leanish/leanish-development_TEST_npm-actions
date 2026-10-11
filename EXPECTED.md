# Expected outcomes — npm and Actions

Baseline authored 2026-10-09 and extended 2026-10-10 for supply-chain 0.3.0.
REGISTRY-EVIDENCE.json records historical public metadata/integrities for the
original 21-package, seven-direct lock (nine glob-graph entries were added on
2026-10-10; concat-map uses a digest-verified cached tarball and its publish
date remains VERIFY). The extended lock is npm-generated (npm 11.20) and adds
lint-staged 15.2.4 with its exact micromatch 4.0.6 dependency; the original
entries are unchanged. lint-staged 15.2.4 also brings yaml 2.4.2 (GHSA-48c2-rrv3-qjmp,
fixed in 2.8.3): the parent must admit two copies; see "B: two obligations".
(From 2728a63 to its revert on 2026-10-11 yaml was pre-repaired instead.) No private registry URLs or invented integrities are used.

| Case | File/line | bump-it | secure-it | Gate |
|---|---|---|---|---|
| 7: minor-behind direct | `package.json:16` and `package-lock.json:152` | 7.7.4 -> highest aged safe 7.x in routine; cached 7.8.5 is an aged example. Newer eligible major, if any, is separate. | No named baseline advisory expected; live snapshot decides. | Exact computed manifest/lock target, publisher identity and provenance verified; aged/safe comparison/cooldown PASS. |
| 7: major-behind direct | `package.json:19` and `package-lock.json:211` | 0.0.3 -> historical 1.0.0 (or highest newer eligible line) in a separate major PR. Preserve optimist's independently required 0.0.x copy. | No named baseline advisory expected. | Benign wrapping test PASS across lines; new nested copies judged normally. |
| 7: vulnerable direct | `package.json:14` and `package-lock.json:102` | Highest eligible aged safe 2.x in routine; cached 2.2.3 is an example. | Non-major security PR to lowest aged fixing version, historically 2.2.2. Change direct declaration + computed lock; no security floor required. | Baseline scan FAIL for CVE-2022-46175; fix comparison marks advisory fixed. May PASS with inherited minimist findings. |
| 7: minimist identity blocker | `package.json:15` (optimist parent), `package-lock.json` minimist/optimist entries | Refresh remains within ~0.0.1; cannot reach safe 0.2.4. No invented minimist direct declaration. | Run 1 blocked 0.0.8 -> 0.2.4 on publisher identity: ljharb had no publisher history through 0.0.8. Retain as an expected policy blocker, not the successful floor case. No automatic exception. | Baseline findings remain. If a separately reviewed identity exception ever permits a fix, require lasting override + matching security floor and test every installed copy. |

The successful transitive floor case is glob/minimatch below. Keep minimist as
an independent identity-policy blocker. JSON5 and minimatch fixes can pass compare
while minimist findings are inherited; main scan stays red until every unexcepted
finding is resolved. Do not add an identity exception just to make this fixture
fully green. A minimist override, if separately approved later, cannot be removed
while optimist still requires ~0.0.1; locked safe bytes alone are not an unlocked
floor-removal proof.

Advisory sources:
- [CVE-2022-46175 / GHSA-9c47-m6qq-7p4h](https://github.com/advisories/GHSA-9c47-m6qq-7p4h): JSON5 2.x before 2.2.2.
- [CVE-2020-7598 / GHSA-vh95-rmgr-6w4m](https://github.com/advisories/GHSA-vh95-rmgr-6w4m): minimist prototype pollution; the later fix below covers both groups.
- [CVE-2021-44906 / GHSA-xvch-5gv4-984h](https://github.com/advisories/GHSA-xvch-5gv4-984h): minimist <0.2.4, and 1.x before 1.2.6.

The previous 12-package baseline passed npm ci and six tests after the wordwrap
correction. Those historical checks do not validate the expanded glob graph;
see VALIDATION.md for checks on this revision.

`VERIFY: NPM` — Validate the npm-generated extended lock with npm ci and npm test.
Retain the original seeded versions/copy separation, and verify the lint-staged
publisher preflight, registry integrities, provenance and live security targets.
Historical validation does not establish acceptance of this extended graph.

## Case 7: identity-compatible vulnerable transitive floor

| Case | File/line | bump-it | secure-it | Gate / floor lifecycle |
|---|---|---|---|---|
| glob parent / B fallback | `package.json`, `node_modules/glob` | Direct routine/major candidates remain live registry outcomes; do not merge them before the independent security trial. | Search for a lowest aged in-line parent admitting the minimatch security target. No eligible later glob 4.x exists, so keep 4.5.3 and retain override + security floor. The PR notes why the parent could not move. | Preserve the real ^2.0.1 edge and benign glob test; no root minimatch declaration. |
| minimatch transitive | `package-lock.json:114` (node_modules/minimatch) | No independent direct move for minimatch. | Separate major security unit 2.0.10 -> lowest aged clean fix for the live advisory snapshot. Historical 3.1.5 passes the actual v0.2.2 identity check against cached 2.0.10 metadata. Add a persistent npm override (global or scoped to glob) plus matching .github/dependency-floors.json security entry. | Scan FAIL for GHSA-f8q6-p94x-37v3 / CVE-2022-3517 (minimatch <3.0.5). Successful fix compare removes this finding, judges every changed/added artifact and can retain inherited minimist/JSON5 findings. Require safe resolved copies, exact override paths/selectors and matching floor; npm test passes. |
| floor retain/remove | Future override + .github/dependency-floors.json; absent initially | Do not silently raise/remove the recorded security floor. | Retain after fixing: without override, glob ^2.0.1 excludes every 3.x fix and restores vulnerable 2.x. A later parent update may permit a separate floor-removal PR ONLY after joint unlocked proof. | Installed safe minimatch alone does not justify removal. Parent bump before security trial consumes this fixture. |

Under 0.3.0 the floor is justified by an unsuccessful parent search, not by
skipping parent search. Require the run/PR note identifying glob and the
absence of an eligible in-line version whose range admits the selected fix.

[GHSA-f8q6-p94x-37v3](https://github.com/advisories/GHSA-f8q6-p94x-37v3)
names the seeded minimatch advisory. Newer advisories may require later targets
than its original 3.0.5 patch. 3.1.5 is an aged **identity-compatible example**,
not a claim it is the live rule-picked minimum or fixes every current advisory.
Cached metadata: 2.0.10 published 2015-07-23; 3.1.5 published 2026-02-25; both
publishers are isaacs and neither has a provenance baseline downgrade. The actual
NpmRegistry.identityProblems call returned an empty list with no exceptions.
This identity proof is independent of secure-it's advisory/minimum-fix selection.

The added graph also contains old/deprecated inflight; capture any additional
live findings/gaps rather than labeling the whole graph safe. glob's benign test
uses only synchronous file matching through the real minimatch API.

`VERIFY: MINIMATCH-FLOOR` — Revalidate public registry metadata, signatures,
publish times, identities/provenance and current OSV advisory set for the new
nine-package glob graph. Confirm secure-it selects an aged fixing minimatch
version whose identity passes against 2.0.10 (3.1.5 is cache-verified), creates
the override/floor without changing glob, regenerates an accepted npm lock,
and passes npm test, exact verification, compare and cooldown. Record target and
all advisory IDs. Run floor removal on the fixed head; it must retain the floor
while parent ^2.0.1 remains. No live secure-it pass is claimed here.

`VERIFY: CONCAT-MAP-DATE` — Confirm concat-map 0.0.1's public publish date >=7 days
and registry integrity. Its cached tarball SHA-512 and package manifest were
verified; no publish date was available locally. REGISTRY-EVIDENCE.json uses null
rather than inventing a date.

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

Gate trials use the same supply-chain commit for inventory and comparison.
The prerelease baseline pins carrier-first-security-fixes commit
87b1e9e5b54657f668bf9087b81441fb5eb251cc. After v0.3.0 is released, replace
that pin with its dereferenced release commit and full release-tag comment.
Do not claim released v0.3.0 behavior from a v0.2.2 workflow.

`VERIFY: ACTIONS` — Confirm each exact SHA/tag pair and published release date via
GitHub (dereference annotated tags). Baseline checkout v4.1.1 is
b4ffde65f46336ab88eb53be808477a3936bae11 (2023 release). Baseline setup-node v4.0.0 is
8f152de45cc393bb48ce5d89d36b731f54556e65 (2023 release), corrected to the
[official v4.0.0 release commit](https://github.com/actions/setup-node/releases/tag/v4.0.0).
Choose live eligible routine and newer-major releases using their actual published
times. A moved tag, missing release or new advisory changes the expected candidate.


## Case 10: root B is lower than A's nested B

| Variant | File/line | bump-it | secure-it | Gate / verification |
|---|---|---|---|---|
| A baseline | `package.json:17` and `package-lock.json:164` | A=string-width 4.2.3 is the historical latest 4.x; newer eligible major gets its own PR. Aged 5.1.2 is an illustrative focused probe; highest eligible live target may be 8.x or newer. | Actual advisories decide; no new intentional vulnerable baseline here. | A 4.2.3 requires B=strip-ansi ^6.0.1. Gate scans that real installed graph. |
| Root B baseline | `package.json:18` and `package-lock.json:199` | Plan direct B from its exact root declaration/installed copy 4.0.0, not A's 6.0.1. Historical v4 has no later patch; a newer eligible major has its own PR. | Judge each installed copy independently. | Root B 4.0.0 is actually installed/scanned; unlike Gradle it has not been overridden away. Its ordinary declaration remains effective for root imports. |
| Nested B baseline | `package-lock.json:187` | This copy is transitive, not another root direct move. Routine transitive refresh must stay inside A's ^6.0.1 range. | An advisory on this copy may require a transitive fix; no floor/override is seeded. | B 6.0.1 is nested under A because root B 4.0.0 cannot satisfy A. Both B versions/locations must appear in the inventory. |
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
**21 installed packages, seven direct dependencies**, with two distinct strip-ansi
versions. REGISTRY-EVIDENCE.json records each added location, cached publish date
and actual registry integrity. All confirmed baseline publish dates are older than
seven days (concat-map publish date remains VERIFY); current registry/advisory verification is still required.

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
21-package/seven-direct inventory. Recheck registry integrity, release times,
deprecations, identities and advisory coverage for string-width 4.2.3, strip-ansi
4.0.0/6.0.1, ansi-regex 3.0.1/5.0.1, emoji-regex 8.0.0 and
is-fullwidth-code-point 3.0.0. Confirm actual B-major candidate originates at
root 4.0.0. Verify the selected A major raises nested B while preserving root B
and that full tool verification and gate/cooldown pass; 5.1.2/7.1.0 are aged
illustrations, not a claim about the current highest eligible targets.

## Case 10 runnable npm probes

The weekly A and B major units are normally independent, but may be deferred by
the cap. These local resolver/API probes also isolate them without a Git checkout
operation. Run from this repository root with Node 24+ and npm 11.17+. They use
aged illustrative versions, not the highest-version planner rule:

```sh
FIXTURE_PROBE_DIR=$(python3 - <<'PYPROBE'
from pathlib import Path
import shutil, tempfile
root = Path.cwd()
(root / '.validation').mkdir(exist_ok=True)
out = Path(tempfile.mkdtemp(prefix='npm-case10-', dir=root / '.validation'))
for variant in ['baseline', 'a-only', 'b-only']:
    shutil.copytree(root, out / variant,
        ignore=shutil.ignore_patterns('.git', '.validation', 'node_modules'))
print(out)
PYPROBE
)
(
for variant in baseline a-only b-only; do
  (
    cd "$FIXTURE_PROBE_DIR/$variant" || exit 1
    npm ci --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org --cache=.npm-cache || exit 1
    case "$variant" in
      a-only) npm install --save-exact string-width@5.1.2 --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org --cache=.npm-cache || exit 1 ;;
      b-only) npm install --save-exact strip-ansi@7.1.0 --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org --cache=.npm-cache || exit 1 ;;
    esac
    npm test > test.log 2>&1 || exit 1
    npm ls --all --json > resolution.json || exit 1
    node -e 'const l=require("./package-lock.json"); for (const [p,v] of Object.entries(l.packages)) if (p.endsWith("node_modules/strip-ansi")) console.log(p,v.version)' > strip-ansi-copies.txt
  ) || exit 1
done
printf '%s\n' "$FIXTURE_PROBE_DIR"
)
```

Compare each copy's package.json, package-lock.json, resolution.json,
strip-ansi-copies.txt and test.log:

- Baseline: root B=4.0.0 and nested B=6.0.1 under A=4.2.3.
- A-only: root declaration/installed B remain 4.0.0; A=5.1.2 raises its own B
  to an eligible 7.x. Account for actual hoisting/path changes and registry timing.
- B-only: A's root declaration remains 4.2.3; root B is 7.1.0 while A still
  needs a separate 6.x copy. Benign tests pass for all three copies.

These manual npm installs prove resolver/API behavior only; they are NOT tool
computed plans or successful full gate verification. For automation acceptance,
retain the weekly A-only and B-only major unit plans/diffs/inventories and their
actual verify/compare/cooldown/CI results. Check the recorded A plan leaves root
B's dependency fields and installed version unchanged, and its changed nested B
is judged normally; check the B plan originates at root 4.0.0. Inspect deferred
units and rerun until both eligible units are attempted. Do not use the combined
routine PR or these manual lock bytes as proof those focused units verified.

`VERIFY: CASE10-NPM-PROBES` — Run all three copies with network, verify the above
root/nested graph comparisons and tests, then capture the independent real tool
major-unit verification results. Identity/age/advisory failures remain legitimate
policy failures; missing install data is an incomplete probe.

## Run acceptance and evidence (cases 8–9 and deferred majors)

EXPECTED.md is the single source of expectations. README.md contains setup and
entry commands; VALIDATION.md and REGISTRY-EVIDENCE.json contain observed evidence.
Exact live targets, advisory counts, identities and release dates depend on the
registry snapshot. A missing or too-young eligible candidate is timing-dependent,
not proof that the fixture or tool failed. No young release is fabricated.

Run secure-it and bump-it independently against the same seeded main revision;
capture evidence before merging either tool's PRs. Do not merge parent updates
before testing transitive security fixes. Preserve the seed revision externally
for repeat trials; after merges, do not expect the same candidates/findings.
Unchanged weeks may review already-open PRs rather than create new ones.

bump-it's default maximum is **three new major PRs per run**, in addition to the
routine unit. An eligible major can be deferred behind higher-priority packages,
including Actions and the new glob direct dependency. An absent wordwrap,
annotations, setup-java or other major PR is not a bug solely because it is absent.
Check the deployed limit and each unit's status/priority; distinguish deferred,
already-open, held, failed, no eligible candidate and notes-only dependencies.
Capture later runs (or a deliberately configured larger limit) to exercise every
eligible major. Never mark a deferred unit as a successful update.

For every run, retain the tool version/commit, configuration, baseline/head IDs,
complete tool record **including units, waiting, gaps, notes and errors**, candidate
versions, plan payloads, PR title/body/diff, and verification/build logs. Include
failed units' attempted plans and diffs even when no PR exists. If the runner does
not retain a failed plan/diff, report that evidence gap rather than inventing a
root cause. Preserve inventories for both sides, resolved and declared versions,
findings fixed/inherited/added, the full compare report, cooldown verdict/held
versions and CI results. Store scratch evidence in ignored .validation/ or outside
the repository; no generated diagnostics belong in a remediation PR.

Default-branch scan must fail on the seeded unexcepted advisories. A successful
fix PR can pass compare with other findings inherited; this does not mean main
is clean. CLI exit zero, creation of a PR, or a passing smoke test alone is not
acceptance. Judge every changed resolved artifact for advisories, age and identity.
Missing registry data/inventory coverage is incomplete, never a clean pass.

`VERIFY: RUN-EVIDENCE` — Confirm the deployed maxNewMajorsPerRun value and retain
all fields and failed-unit artifacts above in the next weekly report. Reconcile
all cases against units, not only the published PR list.

## Tool version boundary

B1 (Gradle inventory ordering), B2 (bump-it plugin graph additions/removals under
planned-swap proof), and B3 (secure-it sharing that proof) affect the Gradle
fixtures. They do not change this repository's npm identity, source, advisory,
exact computed-lock, floor or cooldown checks. Minimist's identity blocker must
not become an accepted update just because v0.2.3 ships. Gate is pinned to supply-chain 87b1e9e (the 0.3.0 candidate);
record the actual tool and gate versions independently in every trial.

## B: npm parent before override

| Case | File/path | bump-it | secure-it | Gate |
|---|---|---|---|---|
| B: parent admits the fix | package.json devDependencies.lint-staged; installed micromatch copy | Highest eligible aged safe lint-staged 15.x in routine; do not mistake that for the minimal security parent choice. Micromatch has no independent direct bump. | For GHSA-952p-6rrq-rcjv, move lint-staged 15.2.4 -> 15.2.5 and lock micromatch 4.0.6 -> 4.0.8 inside ~4.0.7. No micromatch override or floor. | Parent and child land together; target advisory disappears. All induced changes pass normal advisory, age and identity checks. |
| B: identity acceptance | Public registry metadata for both parent versions and the computed head | Normal identity policy. | Positive-case acceptance requires the actual gate identity checks to pass, without exceptions. | Preflight 2026-10-10: 15.2.4 and 15.2.5 both published by okonet, neither with provenance; 15.2.4 pins micromatch 4.0.6, 15.2.5 requires ~4.0.7. A failure must remain a blocker/fallback, not be called a successful parent move. |
| B: two obligations | lint-staged 15.2.4 brings micromatch 4.0.6 and yaml 2.4.2 (GHSA-48c2-rrv3-qjmp, fixed in 2.8.3) | Same. | No lint-staged version past the wait admits both: 15.2.5–15.3.x exclude yaml 2.8.3, and those admitting both fail the identity check (published from lint-staged/lint-staged, a repository 15.2.4 doesn't declare). Since 0.3.0 takes the parent version admitting the most copies (the lowest that tie): move lint-staged 15.2.4 -> 15.2.5 and lock micromatch 4.0.8; yaml keeps an override 2.8.3 + floor, with a note that lint-staged 15.2.5 doesn't admit it. Before that rule (candidate c31c395), both kept overrides; that run's notes read "no lint-staged version admitting micromatch@4.0.8, yaml@2.8.3 is free of new advisories, keeps its publisher, and moves without an override itself". | Parent, lock and override verified together; both advisories disappear. |
| B: no eligible parent | Existing glob 4.5.3 -> minimatch 2.0.10 graph | Preserve the independent security seed. | Keep persistent minimatch override + matching security floor, with a parent-search failure note. | Fix the live rule-selected target; retain the floor until joint unlocked removal proof succeeds. |

The named micromatch case assumes the recorded live snapshot selects 4.0.8.
New advisories or additional obligations on the same parent can change the
minimum admissible parent. Preserve complete candidate/plan/notes evidence.

Micromatch 4.0.8 changes its picomatch dependency line. Judge the actual selected
picomatch copy too; do not preserve a vulnerable 2.3.1 merely to minimize the diff.

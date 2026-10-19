# npm and GitHub Actions fixture

Synthetic fixture covering direct updates, JSON5 security, optimist/minimist
identity blocking, glob/minimatch override floors, lint-staged parent remediation
with two obligations (micromatch and yaml), pinned Actions, two installed
strip-ansi versions, and cases 13–16: the `@types/node` cap, a deprecated major
target, a required peer companion and a major that needs a test adapted.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

Use Node 24+ and npm 11.20. Use npm ci for the seeded lock; npm install or audit
fix can change the input before the tool trial. No lifecycle script or exploit is
needed. REGISTRY-EVIDENCE.json records historical public metadata and its origin.
The glob test exercises its real minimatch transitive through a benign file match.

[EXPECTED.md](EXPECTED.md) is the single source of case expectations, runnable
acceptance steps, timing caveats and VERIFY items. [VALIDATION.md](VALIDATION.md)
records checks and tool runs already performed. These private repositories are test inputs;
do not publish packages. Claude manages GitHub adoption and the run configuration.
This fixture isn't part of regular tool passes: it runs only in release-candidate
passes that opt fixtures in (`SUPPLY_CHAIN_FIXTURES=1`).
The gate's pin is the `uses:` line in `.github/workflows/supply-chain.yml` (its
history is in git); `fixture-repin` moves it after each stable release. The gate uses
the same commit for inventory and comparison. Tools are deployed separately; record
their release/commit for each trial.

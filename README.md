# npm and GitHub Actions fixture

Synthetic fixture covering cases 7, 8, 9 and 10: direct updates, JSON5 security,
optimist/minimist and glob/minimatch transitives, pinned Actions and two installed
strip-ansi versions. The baseline lock has 21 installed packages and seven directs.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

Use Node 24+ and npm 11.17+. Use npm ci for the seeded lock; npm install or audit
fix can change the input before the tool trial. No lifecycle script or exploit is
needed. REGISTRY-EVIDENCE.json records historical public metadata and its origin.
The glob test exercises its real minimatch transitive through a benign file match.

[EXPECTED.md](EXPECTED.md) is the single source of case expectations, runnable
acceptance steps, timing caveats and VERIFY items. [VALIDATION.md](VALIDATION.md)
records checks already performed. These private repositories are test inputs;
do not publish packages. Claude manages GitHub adoption and weekly configuration.
The existing gate workflow remains pinned to supply-chain v0.2.2.

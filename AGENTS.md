# Synthetic supply-chain fixture

Run the repository check command in README.md after edits. Keep tests compatible with
both baseline and planned versions. Some major upgrades remove APIs used here:
adapt the affected tests to the new version while
keeping what they assert; never delete or weaken a test to make an upgrade pass. Do not
publish a package. Dependency changes are intentional; do not modernize unrelated pins.

# Imperian Crowdmap

The community-maintained Imperian map for Mudlet.

- [Map explorer](https://ire-mudlet-mapping.github.io/ImperianCrowdmap/)
- [Contributing map updates](CONTRIBUTING.md)

## Repository structure

`Map/map` is the canonical binary map. `Map/changelog.txt` and `Map/version.txt`
track updates. `crowdmap.json` identifies the game and configures the shared
pipeline. The six small GitHub Actions callers use
[Crowdmap Platform](https://github.com/IRE-Mudlet-Mapping/CrowdmapPlatform) at
`@v1` for checks, diffs, publication, and dependency-update automation.

Imperian has no game-specific plugins or dependencies. Explorer assets,
generated exports, and common Danger rules are maintained by the platform,
not vendored here. Compatible platform releases update `v1` centrally;
Dependabot watches this repository's GitHub Actions references.

## Maintainer settings

- Default branch: `development`.
- GitHub Pages: branch `gh-pages`, root `/`.
- Organization or repository Actions secrets: `CLOUDINARY_NAME`,
  `CLOUDINARY_KEY`, and `CLOUDINARY_SECRET` (for visual diffs).
- Enable squash merging, auto-merge, and **Allow GitHub Actions to create and
  approve pull requests** for validated Dependabot updates.
- Required checks for the platform callers: `validate / danger` and
  `validate / validate`. Keep the existing review requirement.

For the initial migration, update the default-branch ruleset in this order:

1. Before merging, replace `check` with `validate / validate`, which already
   runs on this migration PR. Keep `danger` required and keep the review requirement.
2. Merge the migration after review and successful checks.
3. Open a subsequent map PR against the migrated base. Once its new Danger
   check is available, replace `danger` with `validate / danger` in the ruleset.

The initial migration PR runs trusted `pull_request_target` workflows from its
base branch, so it cannot report `validate / danger` yet.

Dependabot ignores major platform upgrades. A move from `@v1` to `@v2` requires
manual review and end-to-end validation rather than automatic approval/merge.
Manual publication is also restricted by the shared workflow to `development`.

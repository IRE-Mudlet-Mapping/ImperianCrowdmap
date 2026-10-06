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

When migrating the default-branch ruleset, replace the legacy required checks
`danger` and `check` with the names above after the new checks are available.
The initial migration PR still runs trusted `pull_request_target` workflows
from its base branch; a subsequent map PR exercises the migrated workflows.

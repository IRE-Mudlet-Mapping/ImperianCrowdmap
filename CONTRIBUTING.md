# Contributing map updates

Target pull requests at `development`. For each map update:

1. Save your Mudlet map as the binary file `map` and upload it to `Map/map`.
2. Add a short description to `Map/changelog.txt`.
3. Increase the number in `Map/version.txt` by one.
4. Describe the affected areas in the pull request.

Do not upload JSON exports or explorer files. The shared platform generates
them automatically. The [contributor wiki](https://github.com/IRE-Mudlet-Mapping/ImperianCrowdmap/wiki/Updates)
provides the browser-based upload walkthrough; where it asks for a JSON map,
follow the three-file instructions above instead.

## Checks and publication

The [Crowdmap Platform](https://github.com/IRE-Mudlet-Mapping/CrowdmapPlatform)
provides Danger validation, textual JSON diffs, visual map diffs, and export
validation. Imperian has no custom rules or plugins, so no npm installation or
local platform checkout is required for contributing.

Merges to `development` publish the shared explorer and map artifacts to
`gh-pages`. Maintainers can also dispatch **Publish map artifacts** manually.
The published files include the binary `Map/map`, readable `Map/map.json`,
minified `Map/map_mini.json`, explorer `Map/mapExport.json`, and `Map/colors.json`,
as well as the changelog and version. There is no duplicate `map.dat` or legacy
JavaScript map export.

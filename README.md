# Template repository for Mudlet crowdmaps using the IRE mapper #

You can use this template repository to easily set up a crowdmap repository
for the IRE mapper. The map contains the basic setup for a page, you'll just
want to go through the (very basic) index.html file and replace links. You'll
find most places easily by searching for `CrowdmapTemplate`. After that, you'll
want to configure the `Pages` setting of the repository to deploy from the
`development` branch.

Additionally, there are a few basic workflows set up that help maintaining
the maps. To use the map diff workflow, you need a free account at
[cloudinary](https://cloudinary.com/). The product you need is called
`Programmable Media`. It is a service that lets you programmatically upload
images and embed them. The free tier should be more than
enough for a community project. After signing up, create the repository secrets
`CLOUDINARY_NAME`, `CLOUDINARY_KEY`, and `CLOUDINARY_SECRET`. The information
can be found on the dashboard.

The other workflow uses danger to check for common tasks that should be done for
each pull request. It makes sure those tasks have been done and are not
forgotten.

You may also want to copy the wiki by first creating a page there. Then you can
clone it via `git@github.com:<username>/<repository>.wiki` and replace the
content. Have a lok at this project's wiki for how the IRE games organize their
work.

If you need help or have suggestions, hop by in our
[Discord](https://discord.gg/PPUNnc3).

# Sails.js Documentation (v0.11.x)


Guide and reference documentation for the 0.11.x release of Sails.  Content for most sections on the Sails website (beta.sailsjs.org) is compiled from here.


##### Contributing to the docs

We welcome your help!  Please send a pull request to **master** with corrections/additions and they'll be double-checked and merged as soon as possible.

Secondly, we are open to suggestions about the process we're using to manage our documentation, and to work with the community in general.  Please post to the Google Group with your ideas- or if you're interested in helping directly, contact @fancydoilies, @ncrumrine, @loicsaintroch, or @mikermcneil on Twitter.

##### How are these compiled and pushed to the website?

We use a module called doc-templater to convert the .md files to the html for the website. You can learn more about how it works in [the doc-templater repo](https://github.com/uncletammy/doc-templater).

Each .md file that has its own page on the website (i.e. all reference, concepts, and anatomy files) should include a tag with its display name. This is used for creating the URL and the display title for this file on sailsjs.org. For example:
```
<docmeta name="displayName" value="Configuration">
```

Currently, these docs are pushed ASAP to www.sailsjs.org. Updates to the website are done manually (and will be for the forseeable future), but we are working on automating this process. In general, this repo should follow the same versioning strategy as Sails (using tags).

# Contributing
### Submit Your Own Guide

Submitting your own guide is easy.  Read this guide in its entirety before submitting a PR though.

### Sails.js Documentation Structure
The documentation on the Sails.js website is automatically pulled down from the `sails-docs` github repo and all of the .md files which contain github flavored markdown are turned in html templates.  Every time the `sails-docs` repo changes, the changes are instantly reflected on the website.  

In order for this to work, the sails-docs repo must have a particular structure.  It's easy to follow though.

##### The Basics
Every folder must contain a .md file with the same (case sensitive) name.  A folder called `SecuRity` must contain `SecuRity.md`.  This file will be loaded when someone clicks the link on the guides navigation menu.

Every .md file must contain two `<docmeta>` tags.  They are required for automatically generating the navigation.  Without these tags, the template is ignored. 

The `uniqueID` tag is used by the router on the front-end of the Sails.js website.  The value can be anything as it's unique among all the other .md files.  We add some random numbers to it just in case. 

```html
<docmeta name="uniqueID" value="someUniqueName85732">
```

The value of the `displayName` tag determines the link text on the navigation menu.  This does not need to be unique. 

```html
<docmeta name="displayName" value="Name To Appear On Navigation">
```

##### Making a New Section
Lets say you want to create a guide called `Socket.io Safety` in a new section called `Security`.
- First, create the folder `sails-docs/userguides/security/`
- Next, create the file `sails-docs/userguides/security/security.md`
- Add your introduction/overview of the section to security.md and make sure to include your `<docmeta>` tags
- Now, create `sails-docs/userguides/security/socketio.md` and put the content for your guide in it.  Make sure to include `<docmeta>` tags

If there is already an appropriate section for your guide, skip to the last step.

##### The `Contributed By` section.
This section is entirely optional.  Feel free to use it to talk a little about yourself.


#### Example Stub
Feel free to copy and change the file `guideStub.md`


### Contributed By
##### Nicholas Crumrine
A real West Texas cowboy with an affinity for cats

##### Link
https://twitter.com/ncrumrine

##### Organizations
Sails, Balderdash,cluckus

<docmeta name="uniqueID" value="sailsUserGuidesContributing80998">
<docmeta name="displayName" value="Submit A Guide">

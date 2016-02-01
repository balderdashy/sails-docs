![Squiddy reads the docs](http://sailsjs.org/images/squidford_swimming.png)

# Sails.js Documentation

The official documentation for the current stable release of Sails is on the [master branch](github.com/balderdashy/sails-docs) of this repository.  Content for most sections on the [official Sails website](http://sailsjs.org) is compiled from here.


## In Other Languages

The documentation for Sails has been translated to a number of different languages.  The list below is a reference of the translation projects we are aware of.

| Language                     | [IETF Language Tag](https://en.wikipedia.org/wiki/IETF_language_tag)  | Maintainer        | Repo                               |
| ---------------------------- | ------- | ------------------ | ---------------------------------- |
| Japanese                     | `ja`    | [@kory-yhg](https://github.com/kory-yhg)      | [sails-docs-ja](https://github.com/balderdashy/sails-docs/tree/ja) <br/>(_live on [sailsjs.jp](http://sailsjs.jp)_)
| Brazilian Portuguese         | `pt-BR` | [@marceloboeira](https://github.com/marceloboeira) & [@gabrielalmir10](https://github.com/gabrielalmir10)   | [sails-docs-pt-BR](https://github.com/balderdashy/sails-docs/tree/pt-BR)
| Taiwanese Mandarin           | `zh-TW` | [@CalvertYang](https://github.com/CalvertYang)   | [sails-docs-zh-TW](https://github.com/balderdashy/sails-docs/tree/zh-TW)
| Korean                       | `ko`    | [@sapsaldog](https://github.com/sapsaldog)   | [sails-docs-ko](https://github.com/balderdashy/sails-docs/tree/ko)
| Spanish                      | `es`    | [@alejandronanez](https://github.com/alejandronanez)   | [sails-docs-es](https://github.com/balderdashy/sails-docs/tree/es)

> Since we are now using branches to keep track of different versions of the Sails documentation, we are moving away from the original approach of using branches for different languages.  Before embarking on a new translation project, we ask that you review the [updated information below](#how-can-i-help-translate-the-documentation)-- the process has changed a little bit.



## Contributing to the Sails Docs

We welcome your help!  Please send a pull request to **master** with corrections/additions and they'll be double-checked and merged as soon as possible.

Secondly, we are open to suggestions about the process we're using to manage our documentation, and to work with the community in general.  Please post to the Google Group with your ideas- or if you're interested in helping directly, contact @fancydoilies, @rudeboot, or @mikermcneil on Twitter.

#### What branch should I edit?

That depends on what kind of edit you are making.  Most often, you'll be making an edit that is relevant for the latest stable version of Sails (i.e. the version on [NPM](npmjs.org/package/sails)) and so you'll want to edit the `master` branch of _this_ repo (what you see in the sails-docs repo by default).

On the other hand, if you are making an edit related to an unreleased feature in an upcoming version; most commonly as an accompaniment a feature proposal or open pull request to Sails or a related project, then you will want to edit the branch for the next, unreleased version of Sails (sometimes called "edge").


| Branch (in `sails-docs`)                    | Documentation for Sails Version...                                   | Preview At...      |
|-------------------------------------------------------------------------------------|------------------------|:-------------------|
| [`master`](https://github.com/balderdashy/sails-docs/tree/master) | [![NPM version](https://badge.fury.io/js/sails.png)](http://badge.fury.io/js/sails) | [preview.sailsjs.org](http://preview.sailsjs.org)
| [`0.12`](https://github.com/balderdashy/sails-docs/tree/0.12) | Upcoming v0.12 release           | [next.sailsjs.org](http://preview.sailsjs.org)


#### How are these docs compiled and pushed to the website?

We use a module called `doc-templater` to convert the .md files to the html for the website. You can learn more about how it works in [the doc-templater repo](https://github.com/uncletammy/doc-templater).

Each .md file has its own page on the website (i.e. all reference, concepts, and anatomy files), and should include a special `<docmeta name="displayName">` tag with a `value` property specifying the title for the page.  This will impact how the doc page appears in search engine results, and it will also be used as its display name in the navigation menu on sailsjs.org.  For example:

```markdown
<docmeta name="displayName" value="Building Custom Homemade Puddings">
```

#### When will my change appear on the Sails website?

Documentation changes go live when they are merged onto a special branch corresponding with the current stable version of Sails (e.g. 0.11). We cannot merge pull requests sent directly to this branch-- its sole purpose is to reflect the content currently hosted on sailsjs.org, and content is only merged just before redeploying the sails website.

If you want to see how documentation changes will appear on sailsjs.org, you can visit [preview.sailsjs.org](http://preview.sailsjs.org). The preview site updates itself automatically as changes are merged into the master branch of sails-docs.


#### How can I help translate the documentation?

A great way to help the Sails project, especially if you speak a language other than English natively, is to volunteer to translate the Sails documentation.  If you are interested in collaborating with any of the translation projects listed in the table above, contact the maintainer of the translation project using the instructions in the README of that fork. 

If your language is not represented in the table above, and you are interested in beginning a translation project, follow these steps:

+ Fork this repo (`balderdashy/sails-docs`) and change the name of your fork to be `sails-docs-{{IETF}}` where {{IETF}} is the [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) for your language.
+ Edit the README to summarize your progress so far, provide any other information you think would be helpful for others reading your translation, and let interested contributors know how to contact you.
+ Send a pull request editing the table above to add a link to your fork.
+ When you are satisfied with the first complete version of your translation, open an issue and someone from our docs team will be happy to help you get preview it in the context of the Sails website, get it live on a domain (yours, or a subdomain of sailsjs.org, whichever makes the most sense), and share it with the rest of the Sails community.


#### How else can I help?

For more information on contributing to Sails in general, see the [Contribution Guide](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md).

# Code Submission Guidelines

There are two types of code contributions we can accept in Sails core:  patches and new features.

**Patches** are small fixes; everything from typos to timing issues.  For example, removing an unused `require()` from the top of a file or fixing a typo that is crashing the master branch tests on Travis are two great examples of patches.  Major refactoring projects changing whitespace and variable names across multiple files are _**not** patches_.  Also keep in mind that even a seemingly trivial change is not a patch if it affects the usage of a documented feature of Sails, or adds an undocumented public function.

**New features** are TODOs summarized in the ROADMAP.md file, with more information in an accompanying pull request.  Anything that is not specifically in the ROADMAP.md file should not be submitted as a new feature.

As stated at the top of this file, in case of doubt about whether a change you would like to make would be considered a "patch", please open an issue in the issue tracker or contact someone from our [core team](https://github.com/balderdashy/sails#team) on Twitter _before_ you begin work on the pull request. Especially do so if you plan to work on something big. Nothing is more frustrating than seeing your hard work go to waste because your vision does not align with planned or ongoing development efforts of the project's maintainers.

#### General rules

- **No CoffeeScript**.  For consistency, all imperative code in Sails core, including core hooks and core generators, must be written in JavaScript, not CoffeeScript, TypeScript, or any other pre-compiled language.  We cannot merge a pull request written in CoffeeScript.
- Do not auto-format code, or attempt to fix perceived style problems in existing files in core.
- Do not change more than 3 files in a single pull request-- it makes it very hard to tell what's going on.
- Do not submit pull requests which implement new features or enhance existing features unless you are working from a very clearly-defined proposal and spec from a merged feature request.  As stated above, nothing is more frustrating than seeing your hard work go to waste because your vision does not align with a project's roadmap. 
- Before beginning work on a feature, you should be sure to leave a comment telling other contributors that you are working on the feature.  Note that if you do not actively keep other contributors informed about your progress, your silence may be taken as inactivity, and you may end up working on the same feature as someone else in parallel.  


#### Contributing to core

Sub-modules within the Sails core are at varying levels of API stability. Bug fixes (patches) are always welcome, but API or behavioral changes cannot be merged without serious planning, as documented in the process for feature proposals above.

Sails has several dependencies referenced in the `package.json` file that are not part of the project proper. Any proposed changes to those dependencies or _their_ dependencies should be sent to their respective projects (i.e. Waterline, Anchor, Express, etc.) Please do not send your patch or feature request to this repository; we cannot accept or fulfill it.


#### Contributing to an adapter

If the adapter is part of core (code base is located in the Sails repo), please follow the general best practices for contributing to Sails core.  If it is located in a different repo, please send feature requests, patches, and issues there.

#### Authoring a new adapter

Sails adapters translate Waterline query syntax into the lower-level language of the integrated database, and they take the results from the database and map them to the response expected by Waterline, the Sails framework's ORM.  While creating a new adapter should not be taken lightly, in many cases, writing an adapter is not as hard as it sounds (i.e. you usually end up wrapping around an existing NPM package), and it's a great way to get your feet wet with contributing to the ORM hook in Sails, and to the Waterline code base.

Before starting work on a new adapter, just make sure and do a thorough search on npm, Google and Github to check that someone else hasn't already started working on the same thing.  Read more about adapters in the [relevant part of the Sails.js docs](http://sailsjs.org/documentation/concepts/extending-sails/adapters).


#### Contributing to a hook

If the hook is part of core (code base is located in the Sails repo), please follow the general best practices for contributing to Sails core.  If the hook is located in a different repo, please send feature requests, patches, and issues there.  Many core hooks have README.md files with extensive documentation of their purpose, the methods they attach, the events they emit, and any other relevant information about their implementation.

#### Authoring a new hook

Creating a hook is a great way to accomplish _almost anything_ in Sails core.  Before starting work on a new custom hook, just make sure and do a thorough search on npm, Google and Github to make sure someone else hasn't already started working on the same thing.  Read more about custom hooks in the [**Extending Sails** section of the documentation](http://sailsjs.org/documentation/concepts/extending-sails/hooks).


#### Contributing to a generator

If the generator is part of core (code base is located in the Sails repo), please follow the general best practices for contributing to Sails core.  If it is located in a different repo, please send feature requests, patches, and issues there.


#### Authoring a new generator

The custom generator API is not 100% stable yet, but it is settling.  Feel free to start work on a new custom generator, just make sure and do a thorough search on npm, Google and Github to make sure someone else hasn't already started working on the same thing.  A custom generator is a great way to get your feet wet with contributing to the Sails code base.

<docmeta name="displayName" value="Code Submission Guidelines">

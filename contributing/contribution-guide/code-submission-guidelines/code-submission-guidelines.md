# Code Submission Guidelines

There are two types of code contributions we can accept in Sails core:  patches and new features.

**Patches** are small fixes; everything from typos to timing issues.  For example, removing an unused `require()` from the top of a file or fixing a typo that is crashing the master branch tests on Travis are two great examples of patches.  Major refactoring projects changing whitespace and variable names across multiple files are _**not** patches_.  Also keep in mind that even a seemingly trivial change is not a patch if it affects the usage of a documented feature of Sails, or adds an undocumented public function.

**New features** are TODOs summarized in the ROADMAP.md file, with more information in an accompanying pull request.  Anything that is not specifically in the ROADMAP.md file should not be submitted as a new feature.

As stated at the top of this file, in case of doubt about whether a change you would like to make would be considered a "patch", please open an issue in the issue tracker or contact someone from our [core team](https://github.com/balderdashy/sails#team) on Twitter _before_ you begin work on the pull request. Especially do so if you plan to work on something big. Nothing is more frustrating than seeing your hard work go to waste because your vision does not align with planned or ongoing development efforts of the project's maintainers.

<docmeta name="displayName" value="Code Submission Guidelines">

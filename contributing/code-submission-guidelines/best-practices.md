# Best Practices

There are many undocumented best practices and workflow improvements for developing on Sails that contributors have developed over years.  This section is an attempt to document some of the basics, but be sure and pop in to Gitter if you ever have a question about how to set things up, or want to share your own tool chain.

The best way to work with Sails core is to fork the repository, `git clone` it to your filesystem, and then run `npm link`.  In addition to writing tests, you'll often want to use a sample project as a harness-- to do that, `cd` into the sample app and run `npm link sails`.  This will create a symbolic link in the `node_modules` directory of your sample app that points to your local cloned version of sails.  This keeps you from having to copy the framework over every time you make a change.  You can force your sample app to use the local sails dependency by running `node app` instead of `sails lift` (although `sails lift` **should** use the local dependency, if one exists).  If you need to test the command line tool this way, you can access it from your sample app as `node node_modules/sails/bin/sails`.  For example, if you were working on `sails new`, and you wanted to test it manually, you could run `node node_modules/sails/bin/sails new testProj`.


#### Installing different versions of Sails

| Release               | Install Command          | Build Status      |
|-----------------------|--------------------------|-------------------|
| [stable](https://github.com/balderdashy/sails/tree/stable)                | `npm install sails`      | [![Build Status](https://travis-ci.org/balderdashy/sails.png?branch=stable)](https://travis-ci.org/balderdashy/sails/branches) |
| [beta](https://github.com/balderdashy/sails/tree/beta)                  | `npm install sails@beta` | [![Build Status](https://travis-ci.org/balderdashy/sails.png?branch=beta)](https://travis-ci.org/balderdashy/sails/branches) |
| [edge](https://github.com/balderdashy/sails/tree/master)                  | `npm install sails@git://github.com/balderdashy/sails.git` | [![Build Status](https://travis-ci.org/balderdashy/sails.png?branch=master)](https://travis-ci.org/balderdashy/sails/branches) |



#### Installing an unreleased branch for testing

In general, you can `npm install` sails directly from Github as follows:

```sh
# Install an unreleased branch of Sails in the current directory's `node_modules`
$ npm install sails@git://github.com/balderdashy/sails.git#nameOfDesiredBranch
```

This is useful for testing/installing hot-fixes, and just a good thing to know how to do in general.  Here's how you'd install a few different branches:

| Release               | Install Command          |
|-----------------------|--------------------------|
| [stable](https://github.com/balderdashy/sails/tree/stable)                | `npm install sails@git://github.com/balderdashy/sails.git#stable`      |
| [beta](https://github.com/balderdashy/sails/tree/beta)                  | `npm install sails@git://github.com/balderdashy/sails.git#beta` |
| [edge](https://github.com/balderdashy/sails/tree/master)                  | `npm install sails@git://github.com/balderdashy/sails.git` |


#### Submitting Pull Requests

0. If this is your first time forking and submitting a PR, [follow our instructions here](https://github.com/balderdashy/sails-docs/blob/master/contributing/Sending-Pull-Requests.md).
1. Fork the repo.
2. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or fixing a bug, we need a test!
4. Make the tests pass and make sure you follow [our syntax guidelines](https://github.com/balderdashy/sails/blob/master/.jshintrc).
5. Add a line of what you did to CHANGELOG.md (right under `master`).
6. Push to your fork and submit a pull request to the appropriate branch:
  + [master](https://github.com/balderdashy/sails/tree/master)
    + corresponds with the "edge" version-- the latest, not-yet-released version of Sails. Most pull requests should be sent here
  + [stable](https://github.com/balderdashy/sails/tree/stable)
    + corresponds with the latest stable release on npm (i.e. if you have a high-priority hotfix, send the PR here)
    
<docmeta name="displayName" value="Best Practices">

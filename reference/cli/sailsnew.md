# sails new

Create a new sails project.

```usage
sails new path/to/folder
```

### Usage:

`sails new` takes the following options:

  * `--appName` - Application name (will be used as `name` in `package.json`). By default it is the [kebab-cased](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) name of the specified `folder`.
  * `--no-frontend` - Useful when generating a new Sails app that will not be used to serve any front-end assets.  Disable the generation of the `assets/` folder, `tasks/` folder, and related files.


### Example

To create a project called "test-project" in `code/testProject/`:

```text
$ sails new code/testProject
info: Installing dependencies...
Press CTRL+C to skip.
(but if you do that, you'll need to cd in and run `npm install`)
info: Created a new Sails app `test-project`!
```

To create a sails project in an existing `myProject/` folder:

```text
$ cd myProject
$ sails new .
info: Installing dependencies...
Press CTRL+C to skip.
(but if you do that, you'll need to cd in and run `npm install`)
info: Created a new Sails app `my-project`!
```
> Creating a new sails app in an existing folder will only work if the folder is empty.

### Notes:
> + `sails new` is really just a special [generator](http://sailsjs.com/documentation/concepts/extending-sails/Generators) which runs [`sails-generate-new`](http://github.com/balderdashy/sails-generate-new).  In other words, running `sails new foo` is an alias for running `sails generate new foo`, and like any Sails generator, the actual generator module which gets run can be overridden in your global `~/.sailsrc` file.


<docmeta name="displayName" value="sails new">
<docmeta name="pageType" value="command">

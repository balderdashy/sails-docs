# Custom generators

<!-- TODO: update the tutorial below so that it demonstrates how to do this without npm install.  Also update to reflect how generator names are spat out -->

### Overview

Custom [generators](https://sailsjs.com/documentation/concepts/extending-sails/generators) are a type of plugin for the Sails command-line.  Through templates, they control which files get generated in your Sails projects when you run `sails new` or `sails generate`, and also what those files look like.

### Creating a generator

To make this easier to play with, let's first make a Sails project.  If you haven't already created one, go to your terminal and type:

```sh
sails new my-project
```

Then `cd` into `my-project` and ask Sails to spit out the template for a new generator:

```sh
sails generate generator awesome
```

<!--You'll know the generator was created if you see the message: `info: Created a new generator!`.-->

### Configuring a generator

To enable the generator you need to tell Sails about it via `/my-project/.sailsrc`. If you were using an existing generator you would link to an npm module in `.sailsrc` and then just install it with `npm install`.  Since you're developing a generator, you'll link to it directly.  To create the link go back to the terminal and `cd` into the `awesome` generator folder and type:

```sh
pwd
```

The `pwd` command will return a fully resolved path to the generator (e.g. `/Users/irl/sails_projects/my-project/awesome`).

Copy the path and then open `my-project/.sailsrc`.  Within the `modules` property add an `awesome` key and paste the path to the `awesome` generator as the value.

> **Note:** you can name the generator anything you want, for now let's stick with `awesome`:

```javascript
{
  "generators": {
    "modules": {
    	"awesome": "./my-project/awesome"
    }
  }
}
```
>**Note:** Whatever name you give your generator in the `.sailsrc` file will be the name you'll use from the terminal command-line to execute it (e.g. `sails generate awesome`).

Lastly, you'll need to do an `npm install` from the terminal in order to install the necessary modules that were added to the generator's `package.json` file.

### Using custom generator

Back at the terminal type: `sails generate awesome example`. Let's take a look at what was generated.

If you open up your project in a text editor, you'll notice that a folder called `hey_look_a_folder` was created and a file named `example` was also created:


```javascript
/**
 * This is just an example file created at Wed Jun 04 2014 17:35:59 GMT-0500 (CDT).
 *
 * You can use underscore templates, see?
 */

module.exports = function () {
  // ...
};
```

The folder and file illustrate the power of the generator not only to create elements but to use `arguments` from the command-line to influence their content. For example, the file name, `example`, used an element from the command line argument `sails generate awesome example`.

### Basic generator configuration

All of the configuration for the `awesome` generator is contained in `/my-projects/awesome/Generator.js`.  The main parts of `Generator.js` are the `before()` function and the `targets` dictionary.

> **Note:** We refer to the JavaScript object that uses `{}` as a dictionary.

### Configuring the `before()` function

Let's take a closer look at `my-project/awesome/Generator.js`:

```javascript
...
before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    if (!scope.args[0]) {
      return cb( new Error('Please provide a name for this awesome.') );
    }

    // scope.rootPath is the base path for this generator
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }

    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    // Decide the output filename for use in targets below:
    scope.filename = scope.args[0];

    // Add other stuff to the scope for use in our templates:
    scope.whatIsThis = 'an example file created at '+scope.createdAt;

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
    cb();
  },
  ...
  ```

Each generator has access to the `scope` dictionary, which is useful when you want to obtain the arguments that were entered when the generator was executed.

In your default `awesome` generator a new key, `createdAt:` was created in the scope.  We'll take a look at this dictionary within a template momentarily.

```javascript
...
// Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });
...
```
Next, the arguments used when executing the awesome generator (e.g. `sails generate awesome <theargument>`) are available in an array from `scope.args`.  In our default `awesome` generator a `filename` property was added to the scope and assigned the value of the first element of the `scope.args` array (e.g. example):

```javascript
...
scope.filename = scope.args[0];
...
```

Finally, another property (e.g. scope.whatIsThis) was added to the scope dictionary.

```javascript
...
scope.whatIsThis = 'an example file created at '+scope.createdAt;
...
```

#### Configuring the targets dictionary

Now, let's take a look at the `targets` dictionary in `my-project/awesome/Generator.js` to better understand how the folder (e.g. hey_look_a_folder) and file (e.g. example) were generated.

```javascript
...
targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    './:filename': { template: 'example.template.js' },

    // Creates a folder at a static path
    './hey_look_a_folder': { folder: {} }

  },
...
```

The `template` and `folder` helpers look a lot like routes.  These helpers perform the actions that their names indicate.

##### The _template_ helper

Not surprisingly the _template_ helper creates files based upon a template.  Remember, that the scope dictionary is accessible to the templates.

```javascript
...
'./:filename': { template: 'example.template.js' },
...
```

The left-hand side specifies the path and filename where as the right dictates which template the generator will use to create the file.  Notice you're using the `filename` from the `scope.filename` assignment that was based upon the the first element of `scope.args` in the `before()` function.  The templates can be found in `my-project/awesome/templates`.  In the awesome generator you're using `example.template.js`:

```javascript
/**
 * This is just <%= whatIsThis %>.
 *
 * You can use underscore templates, see?
 */

module.exports = function () {
  // ...
};
```

>**Note:** the scope property `whatIsThis` which as you may recall uses the createdAt: property created in the `before` function.

##### The _folder_ helper

The _folder_ helper generates folders.

```javascript
...
'./hey_look_a_folder': { folder: {} }
...
```
The left-hand side specifies the path and name of the folder.  The right-hand side specifies any optional parameters. For example, by default, if a folder already exists at that location an error will be displayed:
`Something else already exists at ::<path of folder>`.  If you want the generator to overwrite an existing folder you have two options.  You can alter the _folder_ helper to overwrite the existing folder by specifying `force: true` in the options parameters:

```javascript
...
'./hey_look_a_folder': { folder: { force: true} }
...
```


You can also use the `--force` parameter from the command-line when executing the generator which will configure all helpers to overwrite:

```sh
sails generate awesome test --force
```

### Using a generator within a generator
To leverage the work of other programmers, _generators_ were designed to be used by other _generators_.  This is where the scope dictionary being passed down to all _generators_ becomes really powerful.

For example, Sails core has a generator called `sails-generate-model`.  Since it's built into Sails core, there's no installation necessary.  To add it to our awesome generator example is simple.  Within the `my-project/awesome/Generator.js` include it by inserting `./': ['model'],`

```javascript
...
targets: {

    // './:filename': { template: 'example.template.js' },

    './': ['model'],

    // './hey_look_a_folder': { folder: {} }

  },
...
```
>**Note:** By using `./` as the path, any models will be placed in the `/api/models` folder from whatever folder the generator was executed.

That's it!  Now let's create a model from within the awesome generator.  From the terminal type:

```sh
sails generate awesome user name:string email:email
```

If you take a look in `my-project/api/models` you'll see a new file named `User.js` has been created that contains the model attributes specified earlier.

```javascript
/**
* User
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.com/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'string' },

    email : { type: 'email' }
  }
};
```

### Bonus: Publishing your generator to npmjs.org

To publish the awesome generator to npmjs.org go into the `my-project/awesome/package.json` file and change the name, author and any other meta information (e.g. licensing).

From within the `my-project/awesome` folder at the terminal type:
```sh
npm publish
```
>**Note:**  If you don't already have an NPM account, go to [npmjs.org](https://www.npmjs.org/) and create one.

To unpublish the module, type:

```sh
 npm unpublish --force
```
Change the `my-project/.sailsrc` to:

```javascript
{
  "generators": {
    "modules": {
      "awesome": "whatever you named the module in package.json"
    }
  }
}
```

From the awesome generator folder within the terminal type:

```sh
npm install
```

And you're all set!



<docmeta name="displayName" value="Custom generators">

# sails console

Quietly lift your sails app (i.e. with logging silenced), and enter the [node REPL](http://nodejs.org/api/repl.html).  This means you can access and use all of your models, services, configuration, and much more.  Useful for trying out Waterline queries, quickly managing your data, and checking out your project's runtime configuration.

### Example

```sh
$ sails console

info: Starting app in interactive mode...

info: Welcome to the Sails console.
info: ( to exit, type <CTRL>+<C> )

sails>
```

> Note that `sails console` still lifts the server, so your routes will be accessible via HTTP and sockets (e.g. in a browser.)





### Global variables in `sails console`

Sails exposes [the same global variables](http://sailsjs.org/documentation/reference/Globals) in the REPL as it does in your app code. This is particularly useful in the REPL.  By default, you have access to the `sails` app instance, your models, and your services; as well as lodash (`sails.util._`) and async (`async`).


> **Warning**
>
> Avoid using `_` as a variable name in the Node REPL.
> (It [doesn't work quite like you might expect](https://github.com/balderdashy/sails/issues/3795)-- although that is [improving in Node v6](http://stackoverflow.com/questions/17073290/in-the-node-js-repl-why-does-this-happen/17073313#comment61417858_17073313).)
>
> Instead, use Sails' version of lodash as `sails.util._`.  For example:
> ```sh
> sails> sails.util._.keys(sails.config)
> ```
>
> Or alternatively, build yourself a local variable to use for familiarity:
>
> ```sh
> sails> var lodash = sails.util._;
> sails> lodash.keys(sails.config);
> ```
>
> Finally, note that this warning isn't limited to the `_` exposed by Sails as a global variable.  When in the REPL, it's best to avoid using `var _ = ...` for any reason (again, unless you're running Node v6.0 or later.)

### More Examples

#### Waterline

The format `Model.action(query).exec(console.log)` console.log is good for seeing the results.

```sh
sails> User.create({name: 'Brian', password: 'sailsRules'}).exec(console.log)
undefined
sails> null { name: 'Brian',
  password: 'sailsRules',
  createdAt: "2014-08-07T04:29:21.447Z",
  updatedAt: "2014-08-07T04:29:21.447Z",
  id: 1 }
```

Pretty cool, it inserts it into the database. However, you might be noticing the undefined and null. Don't worry about those. Remember that the .exec() returns error and data for values. So doing `.exec(console.log)` is the same as doing .exec(console.log(err, data))` The second method will remove the undefined message, but add null on a new line. It's up to you if you want to type more.

#### Exposing Sails

In sails console, type in `sails` to view a list of sails properties. You can use this to learn more about sails, override properties, or check to see if you disabled globals.

```sh
sails> sails
  |>   [a lifted Sails app on port 1337]
\___/  For help, see: http://sailsjs.org/documentation/concepts/

Tip: Use `sails.config` to access your app's runtime configuration.

1 Models:
User

1 Controllers:
UserController

20 Hooks:
moduleloader,logger,request,orm,views,blueprints,responses,controllers,sockets,p
ubsub,policies,services,csrf,cors,i18n,userconfig,session,grunt,http,projecthooks

sails>
```


<docmeta name="displayName" value="sails console">
<docmeta name="pageType" value="command">

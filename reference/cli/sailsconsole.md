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






### Global variables in sails console

Sails exposes the same [global variables](http://beta.sailsjs.org/#/documentation/reference/Globals) in the console as it does in your app code. This is particularly useful in the REPL.  By default, you have access to the `sails` app instance, your models, and your services, as well as Lo-Dash (`sails.util._`) and async (`async`).


> **Warning**
>
> Be careful when using `_` as a variable name in the Node REPL- and when possible, don't.
> (It doesn't work quite like you'd expect.)
>
> Instead, use lodash as `sails.util._`, e.g.:
> ```sh
> sails> sails.util._.keys(sails.config)
> ```
>
> Or alternatively, build yourself a local variable to use for familiarity:
>
> ```sh
> sails> var lodash = _;
> ```
>
> Then you can do:
>
> ```sh
> sails> lodash.keys(sails.config);
> ```

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
\___/  For help, see: http://links.sailsjs.org/docs

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

<docmeta name="uniqueID" value="sailsconsole198558">
<docmeta name="displayName" value="sails console">


# sails console

Lift your Node.js/Sails.js app in interactive mode, and enter the [REPL](http://nodejs.org/api/repl.html).  This means you can access and use all of your models, helpers, configuration, services, and the `sails` app instance.  Useful for trying out Waterline queries, quickly managing your data, and checking out your project's runtime configuration.

```usage
sails console
```
By default, this still lifts the server, so your routes will be accessible via HTTP and sockets (e.g. in a browser.)


### Usage
`sails console` takes the following options:
  * `--dontLift` - Start `sails console` without lifting the server.

### Example

```text
$ sails console

info: Starting app in interactive mode...

info: Welcome to the Sails console.
info: ( to exit, type <CTRL>+<C> )

sails>
```





### Global variables in `sails console`

Sails exposes [the same global variables](http://sailsjs.com/documentation/reference/Globals) in the REPL as it does in your app code. This is particularly useful in the REPL.  By default, you have access to the `sails` app instance and your models; as well as any of your other configured globals -- for example, lodash (`_`) and async (`async`).


> **Warning**
>
> Avoid using `_` as a variable name in the Node REPL.
> (It [doesn't work quite like you might expect](https://github.com/balderdashy/sails/issues/3795)-- although that is [improving in Node v6](http://stackoverflow.com/questions/17073290/in-the-node-js-repl-why-does-this-happen/17073313#comment61417858_17073313).)
>
> Instead, use Sails' version of lodash as `sails.util._`.  For example:
> ```bash
> sails> sails.util._.keys(sails.config)
> ```
>
> Or alternatively, build yourself a local variable to use for familiarity:
>
> ```text
> sails> var lodash = sails.util._;
> sails> lodash.keys(sails.config);
> ```
>
> Finally, note that this warning isn't limited to the `_` exposed by Sails as a global variable.  When in the REPL, it's best to avoid using `var _ = ...` for any reason (again, unless you're running Node v6.0 or later.)

### More Examples

##### Waterline

The format `Model.action(query).exec(console.log)` console.log is good for seeing the results.

```text
sails> User.create({name: 'Brian', password: 'sailsRules'}).meta({fetch: true}).exec(console.log)
undefined
sails> undefined { name: 'Brian',
  password: 'sailsRules',
  createdAt: "2014-08-07T04:29:21.447Z",
  updatedAt: "2014-08-07T04:29:21.447Z",
  id: 1 }
```

Pretty cool, it inserts it into the database. However, you might be noticing the undefined and null. Don't worry about those. Remember that the .exec() returns error and data for values. So doing `.exec(console.log)` is the same as doing .exec(console.log(err, data))` The second method will remove the undefined message, but add null on a new line. It's up to you if you want to type more.

> Note that starting with Node 6, an object&rsquo;s constructor name is displayed next to it in the console.  For example, when using the [`sails-mysql` adapter](http://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters#?sailsmysql), the `create` query mentioned above would output:
>
> ```text
> sails> undefined RowDataPacket { name: 'Brian',
>   password: 'sailsRules',
>   createdAt: "2014-08-07T04:29:21.447Z",
>   updatedAt: "2014-08-07T04:29:21.447Z",
>   id: 1 }
> ```

##### Exposing Sails

In sails console, type in `sails` to view a list of sails properties. You can use this to learn more about sails, override properties, or check to see if you disabled globals.

```text
sails> sails
  |>   [a lifted Sails app on port 1337]
\___/  For help, see: http://sailsjs.com/documentation/concepts/

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

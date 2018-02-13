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

Sails exposes [the same global variables](https://sailsjs.com/documentation/reference/Globals) in the REPL as it does in your app code. This is particularly useful in the REPL.  By default, you have access to the `sails` app instance and your models; as well as any of your other configured globals -- for example, lodash (`_`) and async (`async`).


> **Warning**
>
> In Node versions earlier than v6, using `_` as a variable in the REPL will cause unexpected behavior.  As an alternative, simply import the Lodash module as a variable:
>
> ```bash
> sails> var lodash = require('lodash');
> sails> console.log(lodash.range(1, 5));
> ```


### More Examples

##### Waterline

The format `Model.action(query).exec(console.log)` console.log is good for seeing the results.

```text
sails> User.create({name: 'Brian', password: 'sailsRules'}).fetch().exec(console.log)
undefined
sails> undefined { name: 'Brian',
  password: 'sailsRules',
  createdAt: "2014-08-07T04:29:21.447Z",
  updatedAt: "2014-08-07T04:29:21.447Z",
  id: 1 }
```

Pretty cool, it inserts it into the database. However, you might be noticing the undefined and null. Don't worry about those. Remember that the .exec() returns error and data for values. So doing `.exec(console.log)` is the same as doing .exec(console.log(err, data))` The second method will remove the undefined message, but add null on a new line. It's up to you if you want to type more.

> Note that starting with Node 6, an object&rsquo;s constructor name is displayed next to it in the console.  For example, when using the [`sails-mysql` adapter](https://sailsjs.com/documentation/concepts/extending-sails/adapters/available-adapters#?sailsmysql), the `create` query mentioned above would output:
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
\___/  For help, see: https://sailsjs.com/documentation/concepts/

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

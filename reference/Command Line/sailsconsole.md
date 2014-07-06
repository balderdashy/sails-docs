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

<docmeta name="uniqueID" value="sailsconsole198558">
<docmeta name="displayName" value="sails console">


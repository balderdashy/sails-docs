# sails debug

Attach the node debugger and lift the sails app; similar to running `node --debug app.js`.  Takes the same options as `sails lift`.  You can then use [node-inspector](https://github.com/node-inspector/node-inspector) to debug your app as it runs.


### Example

```sh
$ sails debug

info: Running node-inspector on this app...
info: If you don't know what to do next, type `help`
info: Or check out the docs:
info: http://nodejs.org/api/debugger.html

info: ( to exit, type <CTRL>+<C> )

debugger listening on port 5858
```




> To use the standard (command-line) node debugger with sails, you can always just run `node debug app.js`.

### Use node-inspector

To debug your Sails app using node-inspector, first install and launch it

```sh
$ npm install -g node-inspector
$ node-inspector
```

Now you can lift your Sails app in debug mode 

```sh
$ sails debug
```

Once the application is launched, visit http://127.0.0.1:8080?port=5858. Now you can request your app as usual on port 1337 and debug your code from the browser.

> How it works? Node.js includes a debugger based on TCP protocol. When you're start your application using `sails debug`, Node.js runs your app and opens a socket on port `5858`. This socket allows external tool to interact with itself to control the debugger. Node-inspector, accessible via the port `8080`, is this kind of tool. 

> If you don't see your files in the browser at http://127.0.0.1:8080?port=5858 or if it's very slow to load, try to run node-inspector with the `--no-preload` argument. [See the node-inspector repo](https://github.com/node-inspector/node-inspector) for more details


<docmeta name="displayName" value="sails debug">
<docmeta name="pageType" value="command">

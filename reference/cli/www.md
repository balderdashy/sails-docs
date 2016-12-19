# www

Generate the www folder for sails.


### Example

```sh
$ sails www
Lifting config/env/development.js
info: Compiling assets into standalone `www` directory with `grunt build`...
info:
info: Created `www` directory at:
info: /Your/Location/ProjectName/www
```

This generates the following structure in development mode

```sh
$ ls www
README.md        bower_components index.html       services         test
app.js           factories        js               states
assets           filters          jst.js           styles
```

This can also be done in production mode with `sails www --production` and in staging mode with `sails www --staging`.

### Notes
> + Different Sails apps can have different local Sails installs at different versions, since each project encapsulates its dependencies in its `node_modules/` folder.  To get the _locally_ installed version of Sails from within a particular project, run `npm ls sails`.



<docmeta name="displayName" value="sails version">
<docmeta name="pageType" value="command">

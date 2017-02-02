# package.json
### Objectif
Il s'agit du fichier de configuration pour [npm](https://npmjs.org/doc/json.html). Entre autres choses, ce fichier contient le nom et la version de tous les modules node sur lesquels dépend votre application. Vous pouvez le modifier manuellement, mais veillez à respecter ses règles au risque de briser des choses.

### Plus d'infos
> Découvrez [ce superbe guide interactif fait par Nodejitsu](http://package.json.nodejitsu.com) qui explique bien le fichier package.json



<docmeta name="displayName" value="package.json">

```
{
  "name": "myApp",
  "private": true,
  "version": "0.0.0",
  "description": "Une application Sails",
  "keywords": [],
  "dependencies": {
    "sails": "~0.10.0-rc7",
    "sails-disk": "~0.10.0",
    "rc": "~0.3.3",
    "include-all": "~0.1.3",
    "ejs": "~0.8.4",
    "grunt": "0.4.2",
    "grunt-sync": "~0.0.4",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-sails-linker": "~0.9.5",
    "grunt-contrib-jst": "~0.6.0",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-contrib-uglify": "~0.4.0",
    "grunt-contrib-cssmin": "~0.9.0",
    "grunt-contrib-less": "~0.10.0",
    "grunt-contrib-coffee": "~0.10.1"
  },
  "scripts": {
    "start": "node app.js",
    "debug": "node debug app.js"
  },
  "main": "app.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/dude/myApp.git"
  },
  "author": "dude",
  "license": ""
}
```

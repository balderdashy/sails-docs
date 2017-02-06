# Upload vers Mongo GridFS

L'upload des fichiers sur MongoDB est possible grâce au système de fichiers GridFS de Mongo. Avec Sails, vous pouvez accomplir ceci avec très peu de configuration supplémentaire en utilisant l'adaptateur Skipper pour [MongoDB's GridFS](https://github.com/willhuang85/skipper-gridfs).

Installez-le avec:

```sh
$ npm install skipper-gridfs --save
```

Ensuite, utilisez-le dans l'un de vos contrôleurs:

```javascript
  uploadFile: function (req, res) {
    req.file('avatar').upload({
      adapter: require('skipper-gridfs'),
      uri: 'mongodb://[identifiant:motdepasse@]host1[:port1][/[database[.bucket]]'
    }, function (err, fichiers) {
      if (err) return res.negotiate(err);
      return res.ok();
    });
  }
```

<docmeta name="displayName" value="Upload vers Mongo GridFS">

# Upload des fichiers

L'upload de fichiers dans Sails est similaire à la façon dont vous uploadez des fichiers pour une application vanilla Node.js ou Express. Il est, cependant, probablement différent sur ce que vous êtes habitué si vous venez d'une plate-forme côté-serveur différente comme PHP, .NET, Python, Ruby ou Java. Mais n'ayez pas peur: l'équipe de base a fait de grands efforts pour rendre l'upload de fichiers plus facile à réaliser, tout en étant évolutif et sécurisé.

Sails est livré avec un puissant "body parser" appelé [Skipper](https://github.com/balderdashy/skipper), ce qui facilite la mise en oeuvre d'upload en streaming - pas seulement au système de fichiers du serveur (disque dur), mais également à Amazon S3, aux gridfs de MongoDB ou à l'un de ses autres adaptateurs pris en charge.



### Upload d'un fichier

Les fichiers sont chargés sur des serveurs Web HTTP en tant que _paramètres de fichier_. De la même manière, vous pouvez envoyer un formulaire POST à une URL avec des paramètres de type texte comme "nom", "email" et "mot de passe", vous envoyez des fichiers comme des paramètres de fichier, comme "photo", "document" ou "nouvelleChanson".

Prenons cet exemple simple:

```javascript
req.file('photo').upload(function (err, uploadedFiles) {
  // ...
});
```

Les fichiers doivent être uploadé à l'intérieur d'une `action` dans l'un de vos contrôleurs. Voici un exemple plus détaillé qui montre comment vous pouvez permettre aux utilisateurs de télécharger une image d'avatar et de l'associer à leurs comptes. Il suppose que vous avez déjà pris en charge le contrôle d'accès dans une politique et que vous stockez l'identifiant de l'utilisateur connecté dans `req.session.me`.

```javascript
// api/controllers/UtilisateurController.js
//
// ...


/**
 * Uploader un avatar pour l'utilisateur connecté
 *
 * (POST /utilisateur/avatar)
 */
uploadAvatar: function (req, res) {

  req.file('avatar').upload({
    // Ne permettent pas à la taille totale de téléchargement de dépasser ~ 10 Mo
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.negotiate(err);
    }

    // Si aucun fichier n'a été téléchargé, répondre par une erreur.
    if (uploadedFiles.length === 0){
      return res.badRequest('Aucun fichier uploadé !');
    }


    // Enregistrer le "fd" et l'URL où l'avatar d'un utilisateur peut être consulté
    Utilisateur.update(req.session.me, {

      // Générer une URL unique où l'avatar peut être téléchargé.
      avatarUrl: require('util').format('%s/utilisateur/avatar/%s', sails.getBaseUrl(), req.session.me),

      // Prendre le premier fichier et utiliser son `fd` (descripteur de fichier)
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  });
},


/**
 * Télécharger l'avatar de l'utilisateur avec l'identifiant spécifié
 *
 * (GET /utilisateur/avatar/:id)
 */
avatar: function (req, res){

  req.validate({
    id: 'string'
  });

  Utilisateur.findOne(req.param('id')).exec(function (err, utilisateur){
    if (err) return res.negotiate(err);
    if (!utilisateur) return res.notFound();

    // L'utilisateur n'a pas d'image d'avatar uploadé.
    // (Ne devrait jamais avoir touché cet endpoint et utilisé l'image par défaut)
    if (!utilisateur.avatarFd) {
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // Définir le nom de fichier dans le même fichier que l'utilisateur chargé
    res.set("Content-disposition", "attachment; filename='" + file.name + "'");

    // Transférer le fichier
    fileAdapter.read(utilisateur.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
}

//
// ...
```


#### Où vont les fichiers?
Lorsque vous utilisez le `receiver` par défaut, les fichiers uploadés vont dans le répertoire `.tmp/uploads/`. Vous pouvez remplacer cette option en utilisant l'option `dirname`. Notez que vous devez fournir cette option, à la fois, lorsque vous appelez la fonction `.upload()` ET lorsque vous invoquez l'adaptateur de disque skipper (pour que l'upload et le téléchargement soit du le même endroit.)


#### Upload vers un dossier spécifique
Dans l'exemple ci-dessus, nous allons uploader le fichier vers `.tmp/uploads`. Alors, comment le configurer avec un autre dossier, disons 'assets/images'. Nous pouvons y parvenir en ajoutant des options à la fonction d'upload comme indiqué ci-dessous.

```javascript
req.file('avatar').upload({
  dirname: require('path').resolve(sails.config.appPath, 'assets/images')
},function (err, fichiers) {
  if (err) return res.negotiate(err);

  return res.json({
    message: fichiers.length + ' fichier(s) uploadé(s) avec succès !'
  });
});
```

### Exemple

#### Générer un `api`
Nous devons d'abord générer un nouveau `api` pour servir/stocker des dossiers. Pour ce faire, utilisez l'outil de ligne de commande sails.

```sh
$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FichierController.js!
debug: Generated a new model `File` at api/models/Fichier.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.
```
#### Ecrire les actions de contrôleur

Créons une action `index` pour initier l'upload du fichier et une action `upload` pour recevoir le fichier.

```javascript

// api/controllers/FichierController.js

module.exports = {

  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/fichier/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="titre"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: function  (req, res) {
    req.file('avatar').upload(function (err, fichiers) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: fichiers.length + ' fichier(s) uploadé(s) avec succès!',
        files: fichiers
      });
    });
  }

};
```

## Lire la suite

+ [Skipper docs](https://github.com/balderdashy/skipper)
+ [Upload dans Amazon S3](http://sailsjs.com/documentation/concepts/file-uploads/uploading-to-s-3)
+ [Upload dans Mongo GridFS](http://sailsjs.com/documentation/concepts/file-uploads/uploading-to-grid-fs)



<docmeta name="displayName" value="Upload des fichiers">

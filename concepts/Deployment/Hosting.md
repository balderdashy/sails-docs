# Hébergement

Voici une liste non exhaustive des fournisseurs d'hébergement Node/Sails et des didacticiels communautaires disponibles.

##### Déploiement en module ?

+ http://blog.modulus.io/sails-js

##### Déploiement sur OpenShift ?
Pour effectuer le déploiement sur OpenShift, vous devrez apporter quelques modifications mineures à votre configuration:
Ouvrez `config/local.js` dans votre dossier d'application. Dans ce cas, vous devez ajouter les lignes suivantes.

```
	port: process.env.OPENSHIFT_NODEJS_PORT,
	host: process.env.OPENSHIFT_NODEJS_IP,
```

Vous devrez également installer `grunt-cli` avec `npm i -save grunt-cli`.

Après cela, créez le fichier `.openshift/action_hooks/pre_start_nodejs` avec le contenu suivant. ([Source](https://gist.github.com/mdunisch/4a56bdf972c2f708ccc6)).

ce hook d'action indique au superviseur d'OpenShift d'exécuter toutes les tâches Grunt de production, avant que Sails ne soit démarré.


```
#!/bin/bash
export NODE_ENV=production

if [ -f "${OPENSHIFT_REPO_DIR}"/Gruntfile.js ]; then
    (cd "${OPENSHIFT_REPO_DIR}"; node_modules/grunt-cli/bin/grunt prod)
fi
```
Désactivez ensuite le hook d'intégration Grunt de Sails.
Pour cela, définissez la propriété `grunt` à `false` dans les hooks de `.sailsrc` comme ça :

```json
{
    "hooks": {
        "grunt": false
    }
}
```
### REMARQUE:
Ne supprimez pas Gruntfile.js pour désactiver le hook Grunt, ce fichier étant toujours utilisé par le superviseur d'OpenShift.

Ensuite, créez le fichier `/supervisor_opts` avec le contenu suivant. Cela indique au superviseur d'OpenShift d'ignorer le répertoire `.tmp` de Sails pour la fonctionnalité de "hot reload". ([Source](https://gist.github.com/mdunisch/4a56bdf972c2f708ccc6#comment-1318102))

```
-i .tmp
```
### REMARQUE:
Ce guide de déploiement ne fonctionne que sur les engrenages "évolutif" d'Openshift, nodejs v0.10.
Si vous utilisez un équipement non évolutif, le fichier `/supervisor_opts` sera ignoré et Sails ne démarrera pas sur celui-ci.

Vous pouvez maintenant `git add. && git commit -a -m "votre message" && git push` à déployer sur OpenShift.

##### Vous utilisez DigitalOcean ?

+ https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab

##### Déploiement à Heroku ?

+ [Platzi: Développer des applications avec Sails.js: Pt 2](https://courses.platzi.com/classes/develop-apps-sails-js/)  _(voir la seconde partie)_
+ [SailsCasts: Déploiement d'une application Sails à Heroku](http://irlnathan.github.io/sailscasts/blog/2013/11/05/building-a-sails-application-ep26-deploying-a-sails-app-to-heroku/)
+ [Sails.js sur Heroku](http://vort3x.me/sailsjs-heroku/)
+ https://groups.google.com/forum/#!topic/sailsjs/vgqJFr7maSY
+ https://github.com/chadn/heroku-sails
+ http://dennisrongo.com/deploying-sails-js-to-heroku
+ http://stackoverflow.com/a/20184907/486547

##### Déploiement sur AWS ?

+ http://blog.grio.com/2014/01/your-own-mini-heroku-on-aws.html
+ http://serverfault.com/questions/531560/creating-an-sails-js-application-on-aws-ami-instance
+ http://bussing-dharaharsh.blogspot.com/2013/08/creating-sailsjs-application-on-aws-ami.html
+ http://cloud.dzone.com/articles/how-deploy-nodejs-apps-aws-mac

##### Vous utilisez PM2 ?

+ http://devo.ps/blog/goodbye-node-forever-hello-pm2/


##### Déploiement sur CloudControl ?

+ https://www.cloudcontrol.com/dev-center/Guides/NodeJS/Sailsjs


##### Deploying to RoseHosting ?

 + [Installez Sails.js avec Apache comme proxy inverse sur CentOS 7](https://www.rosehosting.com/blog/install-sails-js-with-apache-as-a-reverse-proxy-on-centos-7/)
 + [Installer Sails.js sur Ubuntu](https://www.rosehosting.com/blog/install-the-sails-js-framework-on-an-ubuntu-vps/)
 + Toutes les formules d'hébergement de RoseHosting sont entièrement gérées avec un support 24/7 gratuit, vous pouvez donc contacter leur [équipe de support](https://www.rosehosting.com/support.html) et ils installeront et configureront Sails.js pour vous gratuitement.


<docmeta name="displayName" value="Hosting">


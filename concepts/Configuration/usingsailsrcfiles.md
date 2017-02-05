# Utilisation des fichiers .sailsrc


En plus des autres méthodes de configuration de votre application, à partir de la version 0.10, vous pouvez maintenant spécifier la configuration d'une ou plusieurs applications dans le fichier `.sailsrc` (grâce à l'excellent [module `rc`] de Dominic Tarr (https://github.com/dominictarr/rc)). Les fichiers `rc` sont très utiles pour configurer la ligne de commande et/ou appliquer les paramètres de configuration à TOUTES les applications Sails que vous exécutez sur votre ordinateur.

Lorsque la CLI Sails lance une commande, elle recherche d'abord les fichiers `.sailsrc` (en format JSON ou [.ini](http://en.wikipedia.org/wiki/INI_file)) dans le répertoire courant et dans votre répertoire (C'est-à-dire `~/.sailsrc`) (chaque nouvelle application Sails est livrée avec un fichier` .sailsrc`). Ensuite, il les fusionne à sa configuration existante.

> En fait, Sails recherche des fichiers `.sailsrc` dans quelques autres endroits (suivant [les conventions rc](https://github.com/dominictarr/rc#standards)). Vous pouvez mettre un fichier `.sailsrc` sur l'un de ces chemins. Cela dit, respectez les conventions lorsque vous le pouvez- le meilleur endroit pour mettre un fichier global `.sailsrc` est dans votre répertoire personnel (c'est-à-dire `~/.sailsrc`).



<docmeta name="displayName" value="Using `.sailsrc` Files">


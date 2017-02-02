# api/services
### Objectif
Ce répertoire contient vos services. Les 'Services' sont similaires aux actions des contrôlleurs mais il sont utilisé pour des choses qui n'ont pas à être exécutés entre le moment où l'utilisateur envoie une requête et le moment où le serveur retourne une réponse. Toute logique qui n'utilise pas `.req()` et `.res()` peut être implémentée comme un service s'il n y'a aucune raison de garder les contrôlleurs propres et gérables.

En théorie, on pourrait créer un service pour

- Envoyer des emails
- Automatiser des tweets vers des célébrités
- Extraire des données d’une API (tierce partie)  puis en poussant ces données à votre client lorsqu’il est prêt (plus de websockets).

Les services sont écrits dans un ou plusieurs fichier .js dans ce répertoire.

### Example Email.js

```
module.exports = {
  send: function(to,from,body){
    // fancy code that sends an email
  }
}

```

You would call this service with ` Email.send('rick','bill','lol') `


> Mind your case.  Email.send !== email.send



<docmeta name="displayName" value="services">


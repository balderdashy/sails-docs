# Blueprint Actions

Blueprint actions (não confunda com blueprint action *routes*) são ações genéricas desenvolvidas para funcionar com qualquer um dos seus controllers que tenham um model com o mesmo nome (ex: `AnimalController` precisaria de um `Animal` model). Pense neles como um comportamento padrão para sua aplicação. For exemplo, se você tem um model `Usuario.js` e um controller `UsuarioController.js` vazio, as ações `find`, `create`, `update`, `destroy`, `populate`, `add` e `remove` existiriam implicitamente, sem que você tenha que codificá-las.

Por padrão, as rotas RESTful blueprint e as shortcut routes (rotas atalho) estão conectadas a uma ação blueprint correspondente. De qualquer forma, qualquer blueprint action pode ser sobrescrita por um controller apenas criando uma ação customizada no arquivo do controller (ex: `AnimalController.find`). Como alternativa você pode sobrescrever a blueprint action _algumaCoisa na sua aplicação simplesmente criando suas próprias blueprint actions customizadas. (ex: `api/blueprints/create.js`).

A versão atual do Sails vem com as seguintes blueprint actions:

+ [find](http://sailsjs.org/documentation/reference/blueprint-api/Find)
+ [findOne](http://sailsjs.org/documentation/reference/blueprint-api/FindOne)
+ [create](http://sailsjs.org/documentation/reference/blueprint-api/create)
+ [update](http://sailsjs.org/documentation/reference/blueprint-api/Update)
+ [destroy](http://sailsjs.org/documentation/reference/blueprint-api/Destroy)
+ [populate](http://sailsjs.org/documentation/reference/blueprint-api/Populate)
+ [add](http://sailsjs.org/documentation/reference/blueprint-api/Add)
+ [remove](http://sailsjs.org/documentation/reference/blueprint-api/Remove)

Para mais informações sobre blueprints, inclusive como desabilitar ou sobrescrevê-las, veja [Blueprint API reference](http://sailsjs.org/documentation/reference/blueprint-api)

<docmeta name="displayName" value="Blueprint Actions">

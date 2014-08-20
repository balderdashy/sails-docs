# Desabilitando Grunt

Para desabilitar integração do Grunt com Sails, simplesmente delete o arquivo do Grunt (e/ou delete a pasta [`tasks/`](/#/documentation/anatomy/myApp/tasks))). Você também pode [desabilitar o Grunt hook](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md).

### Posso customizar isso para SASS, Angular, Client-side Jade Templates, etc?

Sim! Substitua a tarefa no diretório `tasks/`, ou adiciona uma nova. Como [SASS](https://github.com/sails101/using-sass) por exemplo.

Se você ainda precisa usar Grunt para outros propósitor, mas não quer nada da parte front-end, somente delete os assets da pasta assets do projeto e remova as tarefas de front-end das pastas `grunt/register/` e `grunt/config/`.

Você pode também rodar para futuros projetos `sails new myCoolApi --no-frontend` para omitir a pasta de assets e as tarefas de front-end do Grunt.
Você também pode substituir seu modulo `sails-generate-frontend` com geradores alternativos, ou [criar seu proprio](https://github.com/balderdashy/sails-generate-generator).  Isso faz com que `sails new` crie o boilerplate para aplicativos iOS, Android, Cordova, SteroidsJS, etc.

<docmeta name="uniqueID" value="DisablingGrunt970874">
<docmeta name="displayName" value="Disabling Grunt">



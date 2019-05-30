# app.js

Este arquivo é um ponto de partida convencional para uma aplicação Sails/Node.js em _produção_.

Quando desenvolvendo em seu computador local, e rodar `sails lift`, o código em `app.js` não será executado. Ao invés disso, este arquivo existe para providenciar uma maneira fácil e fora-da-caixa para executar sua aplicação _sem_ digitar `sails lift`. Esse é o jeito mais provável que sua aplicação iniciará em produção (ex. `node app`, ou `npm start`).

Como exemplo, quando você implementa para maioria dos serviços PaaS como [Heroku](http://heroku.com), irão automaticamente detectar que está rodando uma aplicação Sails/Node.js e executará esse arquivo a variável de ambiente `NODE_ENV` definida para produção.

> Em quaisquer estágio do ciclo de desenvolvimento você está, você pode seguramente ignorar `app.js`. É bom o suficiente para a maioria das aplicações. Mas o código em `app.js` também serve como uma referência fácil e exemplar de como usar Sails programaticamente. Então você talvez queira dar uma olhada nele se você planeja escrever testes automatizados, trabalhos agendados, migrações manuais de banco de dados, ou scripts de administração.


<docmeta name="displayName" value="app.js">

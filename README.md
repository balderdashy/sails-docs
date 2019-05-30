![Squiddy lê a documentação](https://sailsjs.com/images/squidford_swimming.png)

# Documentação de Sails.js

A oficial documentação para a atual versão estável de Sails está no [ramo master](https://github.com/balderdashy/sails-docs) deste repositório. Conteúdo para maioria das seções no [site oficial de Sails](https://sailsjs.com) foi compilada daqui.


## Em outros idiomas

A documentação para Sails foi traduzida para um numero diferente de idiomas. A lista abaixo é referente a tradução de projetos que estamos cientes.

| Idioma                     | [IETF Rótulo do Idioma](https://en.wikipedia.org/wiki/IETF_language_tag)  | Mantenedor(es)        | Repositório                               |
| ---------------------------- | ------- | ------------------ | ---------------------------------- |
| Japonês                     | `ja`    | [@kory-yhg](https://github.com/kory-yhg)      | [sails-docs-ja](https://github.com/balderdashy/sails-docs/tree/ja)
| Espanhol                      | `es`    | [@eduartua](https://github.com/eduartua/) & [@alejandronanez](https://github.com/alejandronanez)   | [sails-docs-es](https://github.com/eduartua/sails-docs-es)
| Português do Brasil         | `pt-BR` | [@marceloboeira](https://github.com/marceloboeira) & [@avlye](https://github.com/avlye)   | [sails-docs-pt-BR](https://github.com/balderdashy/sails-docs/tree/pt-BR)
| Mandarim Taiwanês           | `zh-TW` | [@CalvertYang](https://github.com/CalvertYang)   | [sails-docs-zh-TW](https://github.com/balderdashy/sails-docs/tree/zh-TW)
| Coreano                       | `ko`    | [@sapsaldog](https://github.com/sapsaldog)   | [sails-docs-ko](https://github.com/balderdashy/sails-docs/tree/ko)
| Chinês                      | `zh-cn`    | [@linxiaowu66](https://github.com/linxiaowu66)   | [sails-docs-zh-cn](https://github.com/linxiaowu66/sails-docs-zh-cn)
| Francês                       | `fr`    | [@marrouchi](https://github.com/marrouchi)   | [sails-docs-fr](https://github.com/marrouchi/sails-docs-fr)

> Enquanto nós estamos usando ramos para manter diferente versões da documentação, nos afastamos da abordagem original de ramos para diferentes idiomas. Antes de embarcar com uma nova tradução do projeto, nós pedimos para que revise a [informação de atualização abaixo](#how-can-i-help-translate-the-documentation) -- o processo mudou um pouco.



## Contribuindo para documentação de Sails

Nós agradecemos sua ajuda! Por favor mande uma pull request para **master** com as correções/adições e eles irão re-checar e atualizaram assim que possível.

Segundamente, nós estamos abertos para sugestões sobre o processo que usamos para gerenciar nossa documentação, e trabalhar com a comunidade em geral. Por favor, publique ao Grupo no Google com suas ideias- ou se estiver interessado em ajudar diretamente, contate @fancydoilies, @rudeboot, ou @mikermcneil no Twitter.

#### Que ramo devo editar?

<!-- Com o lançamento da nova versão de Sails chegando, nós pedimos para que todas pull requests sejam feitas ao ramo `1.0`, até que o conteúdo da documentação 0.12 seja substituída no site principal. A única exceção é se você estiver documentando algo que não é relevante para Sails v1. -->

Para fazer edições que sejam relevantes a versão estável de Sails (ex: a versão em [NPM](npmjs.org/package/sails)), você irá querer editar o ramo `master` _deste_ repositório (que você vê no repositório sails-docs por padrão). O time principal de Sails atualiza o master nos ramos apropriados para última versão estável de Sails, e assim disponibiliza em sobre de sailsjs.com uma vez por semana.

<!-- That depends on what kind of edit you are making.  Most often, you'll be making an edit that is relevant for the latest stable version of Sails (i.e. the version on [NPM](npmjs.org/package/sails)) and so you'll want to edit the `master` branch of _this_ repo (what you see in the sails-docs repo by default).  The docs team merges master into the appropriate branch for the latest stable release of Sails, and then deploys that to sailsjs.com about once per week.

On the other hand, if you are making an edit related to an unreleased feature in an upcoming version; most commonly as an accompaniment a feature proposal or open pull request to Sails or a related project, then you will want to edit the branch for the next, unreleased version of Sails (sometimes called "edge").
 -->

| Ramo (em `sails-docs`)                                          | Documentação de Sails versão...                                                     | Acessível em...   |
|:------------------------------------------------------------------|:---------------------------------------------------------------------------------------|:-------------------|
| [`master`](https://github.com/balderdashy/sails-docs/tree/master) | _Bleeding edge_                                                                        | [`next.sailsjs.com`](https://next.sailsjs.com)
| [`1.0`](https://github.com/balderdashy/sails-docs/tree/1.0)       | [![NPM version](https://badge.fury.io/js/sails.png)](http://badge.fury.io/js/sails)    | [`sailsjs.com`](https://sailsjs.com)
| [`0.12`](https://github.com/balderdashy/sails-docs/tree/0.12)     | Sails v0.12.x                                                                          | [`0.12.sailsjs.com`](https://0.12.sailsjs.com)
| [`0.11`](https://github.com/balderdashy/sails-docs/tree/0.11)     | Sails v0.11.x                                                                          | [`0.11.sailsjs.com`](http://0.11.sailsjs.com)


#### Como é compilada essa documentação e publicada ao site?

Nós usamos um módulo chamado `doc-templater` para converter os arquivos .md em HTML para o site. Você pode aprender mais como funciona no [repositório doc-templater](https://github.com/uncletammy/doc-templater).

Cada arquivo .md tem sua própria página no site (ex: todas referências, conceitos e arquivos de anatomia), e devem incluir um rótulo especial `<docmeta name="displayName">` com uma propriedade `value` específica ao título da página. Isto impactará como a página da dcoumentação aparecerá nos resultadores de motores de busca, e será usado para mostrar o nome no menu de navegação de sailsjs.com. Por exemplo:

```markdown
<docmeta name="displayName" value="Construindo Pudins Caseiros Personalizados">
```

#### Quando minhas mudanças aparecerão no site de Sails?

Mudanças na documentação serão disponiblizadas quando eles forem unificados em um ramo especial correspondente a versão estável de Sails (ex: 0.12). Nós não podemos unificar pull request mandadas diretamente a esse ramo-- seu único propósito é refletir o conteúdo correspondendo ao hospedado em sailsjs.com, e conteúdo é apenas unificado apenas antes de reimplementar no site de sails. 

Se você quer ver como as mudanças na documentação aparecerão em sailsjs.com, você pode visitar [preview.sailsjs.com](http://preview.sailsjs.com). O site de pré-visualização atualiza automaticamente com as mudanças unidas no ramo master de sails-docs.

#### Como posso ajudar a traduzir a documentação?

Um bom jeito de ajudar o projeto Sails, especialmente se você fala outro idioma além de Inglês nativamente, é voluntariar para traduzir a documentação Sails. Se você está interessado em colaborar com qualquer projeto de tradução listado na tabela abaixo, contate os mantenedores do projeto de tradução usando as instruções em README no fork.

Se seu idioma não está representado na tabela acima, e você está interessado em começar um projeto de tradução, siga estes passos:

+ Faça um fork desse repositório (`balderdashy/sails-docs`) e mude o nome de seu fork para `sails-docs-{{IETF}}` onde {{IETF}} é o [rótulo IETF](https://en.wikipedia.org/wiki/IETF_language_tag) de seu idioma.
+ Edite o README para resumir seu progresso até então, providenciando qualquer outra informação que você que ajude outros lendo sua tradução, e deixe contribuidores interessados saber como contatar você.
+ Mande uma pull request editando a tabela acima para o link de seu fork.
+ Quando estiver satisfeito com sua primeira versão completa de sua tradução, abra uma pergunta e alguém de nosso time de documentação ajudará contentamente a obter uma pré-visualização no contexto do site de Sails, obtenha um domínio (seu, ou um subdomínio em sailsjs.com, qualquer que faça mais sentido), e compartilhe com o resto da comunidade Sails.


#### Com o que mais posso ajudar?

Para mais informações na contribuição de Sails em geral, veja o [Guia de Contribuição](sailsjs.com/contributing).


## Licença

[MIT](./LICENSE.md)

O [framework Sails](https://sailsjs.com) é livre e de código aberto sobre a [Licença MIT](https://sailsjs.com/license).

_(E esses arquivos desse repositório também são.)_


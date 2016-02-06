# sails generate

Sailsには幾つかの*ジェネレータ*があり、新しいプロジェクトをスキャッフォールドするのに有用です。また、 よく行う作業のために[自分のジェネレータを作成](http://sailsjs.org/documentation/concepts/extending-sails/Generators/customGenerators.html)したり、機能を追加したり（例えば[好きなテンプレート言語](https://github.com/balderdashy/sails-generate-views-jade)のためにビューファイルを出力したり）することが出来ます。

Sailsには以下のジェネレータがあります:

#### `sails generate new <appName>`
**appName**と名づけられたフォルダにSailsプロジェクトを新規作成します。使い方のオプション日刊しては[`sails new`](http://sailsjs.org/documentation/reference/cli/sailsnew.html)をご覧ください。

#### `sails generate api <foo>`
**api/models/Foo.js** と **api/controllers/FooController.js** を生成します。

#### `sails generate model <foo> [attribute1:type1, attribute2:type2 ... ]`
**api/models/Foo.js** を生成し、オプションとして属性を指定した型とともに含むことが出来ます。

#### `sails generate controller <foo> [action1, action2, ...]`
**api/controllers/FooController.js** を生成し、オプションとしてアクションをを指定した名前とともに含むことが出来ます。

#### `sails generate adapter <foo>`
**api/adapters/foo** フォルダを新しいアダプタを作成するのに必要なファイルとともに生成します。

#### `sails generate generator <foo>`
**foo** フォルダを新しいジェネレータを作成するのに必要なファイルとともに生成します。



<docmeta name="uniqueID" value="sailsgenerate197041">
<docmeta name="displayName" value="sails generate">

# Waterlineクエリー言語

Waterline Query languageはサポートされているすべてのデータベースコネクタからデータを取り出すことの出来るオブジェクトベースの比較式です。つまり、MySQLで使う時と同じクエリをMongo DBでもRediasでも使うことが出来るということです。これにより、コードの変更なしにデータベースの変更が可能です。

### クエリー言語の基礎

Criteriaオブジェクトは４種類のオブジェクトのうち一つから構成されます。これらはクエリオブジェクトのトップレベルオブジェクトです。
このオブジェクトはMongoDBで使われているクエリオブジェクトに「ゆるく」似ていますがちょっとした違いが有ります。

クエリはアトリビュートを指定するために`where`を使い、また`limit`や`skip`などのオプションをオブジェクトのどこの部分を取り出すかを指定するために使うことができ、`where`が含まれない場合は`where`はオブジェクト全体を指しているものとしてみなされます。

```javascript
Model.find({ where: { name: 'foo' }, skip: 20, limit: 10, sort: 'name DESC' });

// OR

Model.find({ name: 'foo' })
```

#### Key Pairs

キーペアは指定された値に厳密に合致するレコードを探すのに使えます。キーはモデルの中のどのアトリビュートを指し示すかを表し、値はアトリビュートの中の値がどの内容に厳密に合致して欲しいか指定します。これはCriteriaオブジェクトの基礎です。

```javascript
Model.find({ name: 'walter' })
```

複数のアトリビュート指定を同時に行うことも出来ます。

```javascript
Model.find({ name: 'walter', state: 'new mexico' })
```

#### Modified Pairs

改良型ペアは様々な補助演算子を使い、厳密比較ではうまくいかないケースをサポートします。

```javascript
Model.find({
  name : {
    'contains' : 'alt'
  }
})
```

#### In Pairs

INクエリはMySQLの'in queries'と似ています。配列中のそれぞれのエレメントはorとして処理されます。

```javascript
Model.find({
  name : ['Walter', 'Skyler']
});
```

#### Not-In Pairs

Not-Inクエリは`in`クエリと似ていますが、比較オブジェクトがネストされているという部分が異なります。

```javascript
Model.find({
  name: { '!' : ['Walter', 'Skyler'] }
});
```

#### Or Pairs

クエリペアの配列を使うことで`OR`クエリが実行できます。
配列の中のいずれかの条件を満たすレコードが結果として帰ってきます。

```javascript
Model.find({
  or : [
    { name: 'walter' },
    { occupation: 'teacher' }
  ]
})
```

### Criteria修飾子

クエリを作成する際には以下の修飾子を利用することが出来ます。

* `'<'` / `'lessThan'`
* `'<='` / `'lessThanOrEqual'`
* `'>'` / `'greaterThan'`
* `'>='` / `'greaterThanOrEqual'`
* `'!'` / `'not'`
* `'like'`
* `'contains'`
* `'startsWith'`
* `'endsWith'`


#### '<' / 'lessThan'

指定された値より小さな値を持つレコードを検索します。

```javascript
Model.find({ age: { '<': 30 }})
```

#### '<=' / 'lessThanOrEqual'

指定された値と同じ値か、より小さな値を持つレコードを検索します。

```javascript
Model.find({ age: { '<=': 21 }})
```

#### '>' / 'greaterThan'

指定された値より大きな値を持つレコードを検索します。

```javascript
Model.find({ age: { '>': 18 }})
```

#### '>=' / 'greaterThanOrEqual'

指定された値と同じ値か、より大きな値を持つレコードを検索します。

```javascript
Model.find({ age: { '>=': 21 }})
```

#### '!' / 'not'

指定した値と合致しないレコードを検索します。

```javascript
Model.find({ name: { '!': 'foo' }})
```

#### 'like'

`%`記号を使ってパターンマッチングでレコードを検索します。

```javascript
Model.find({ food: { 'like': '%beans' }})
```

#### 'contains'

両端に`%`記号を付けたパターンマッチング検索のショートカットです。
指定した内容が文字列中のどこかに存在するレコードを返します。

```javascript
Model.find({ class: { 'contains': 'history' }})

// 上記のコードは下記のコードと一緒です。

Model.find({ class: { 'like': '%history%' }})
```

#### 'startsWith'

右端に`%`記号を付けたパターンマッチング検索のショートカットです。
文字列が指定した内容で始まるレコードを返します。

```javascript
Model.find({ class: { 'startsWith': 'american' }})

// 上記のコードは下記のコードと一緒です。

Model.find({ class: { 'like': 'american%' }})
```

#### 'endsWith'

左端に`%`記号を付けたパターンマッチング検索のショートカットです。
文字列が指定した内容で終わるレコードを返します。

```javascript
Model.find({ class: { 'endsWith': 'can' }})

// 上記のコードは下記のコードと一緒です。

Model.find({ class: { 'like': '%can' }})
```

#### 'Date Ranges'

You can do date range queries using the comparison operators.

```javascript
Model.find({ date: { '>': new Date('2/4/2014'), '<': new Date('2/7/2014') } })
```

### Query Options

クエリプションを使うことでクエリに対して帰ってくる結果をさらに改良することが出来ます。
現在使えるオプションはい次のものです。:

* `limit`
* `skip`
* `sort`

#### Limit

返すレコードの数を制限します。

```javascript
Model.find({ where: { name: 'foo' }, limit: 20 })
```

#### Skip

最初の指定した個数を除く全てのレコードを受け取ります。

```javascript
Model.find({ where: { name: 'foo' }, skip: 10 });
```

##### Pagination

`skip`と`limit`を一緒に使うことでページネーションが出来ます。

```javascript
Model.find({ where: { name: 'foo' }, limit: 10, skip: 10 });
```

<<<<<<< HEAD
`paginate`は`skip`と`limit`を一緒に使うのと同じ役割を果たすWaterlineヘルパーメソッドです。
=======
`paginate` is a  Waterline helper method which can accomplish the same as `skip` and `limit`.

``` javascript                                                                  
Model.find().paginate({page: 2, limit: 10});                                     
```

> **Waterline**
>
> You can find out more about the Waterline API below:
> * [Sails.js Documentation](http://sailsjs.org/#/documentation/reference/waterline/queries)
> * [Waterline README](https://github.com/balderdashy/waterline/blob/master/README.md)
> * [Waterline Documentation](https://github.com/balderdashy/waterline-docs)
> * [Waterline Github Repository](https://github.com/balderdashy/waterline)


#### Sort
>>>>>>> 0a69dcc7a2ad18a99e1d1ae0f37ac7ebe6a63677

``` javascript                                                                  
Model.find().paginate({page: 2, limit: 10});                                     
```

> **Waterline**
>
> WaterlineAPIに関して更に詳しくは以下のドキュメントで確認できます。:
> * [Sails.js Documentation](http://sailsjs.org/#/documentation/reference/waterline/queries)
> * [Waterline README](https://github.com/balderdashy/waterline/blob/master/README.md)
> * [Waterline Documentation](https://github.com/balderdashy/waterline-docs)
> * [Waterline Github Repository](https://github.com/balderdashy/waterline)


#### ソート

検索結果をアトリビュートの名前でソートすることが出来ます。
単にアトリビュートを指定するだけで昇順のソートが出来る他`asc`または`desc`のフラグを指定することでそれぞれのアトリビュートに対して昇順と降順の並べ順を指定できます。

```javascript
// nameの昇順で並び替え。
Model.find({ where: { name: 'foo' }, sort: 'name' });

// nameの降順で並び替え。
Model.find({ where: { name: 'foo' }, sort: 'name DESC' });

// nameの昇順で並び替え。
Model.find({ where: { name: 'foo' }, sort: 'name ASC' });

// バイナリNotationで並び替え。
Model.find({ where: { name: 'foo' }, sort: { 'name': 1 }});

// 複数のアトリビュートで並び替え。
Model.find({ where: { name: 'foo' }, sort: { name:  1, age: 0 });
```

> **ケースセンシティブか？**
>
> Waterlineのすべてのクエリは**ケースセンシティブではありません**。このおかげでクエリを簡単に実行できますが、文字列をインデックスするのは難しくなります。このことは文字列を検索したり文字列で並び替えたりするときに念頭に置いておいてください。
>
> 現在のところ、**ケースセンシティブ**なクエリを発行するもっともよい手段は [`.native()`](http://beta.sailsjs.org/#/documentation/reference/waterline/models/native.html)か[`.query()`](http://beta.sailsjs.org/#/documentation/reference/waterline/models/query.html)のメソッドを使うことです。


<docmeta name="displayName" value="Query Language">

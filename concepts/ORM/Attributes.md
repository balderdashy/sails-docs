# アトリビュート
### 概要

モデルアトリビュートはモデルにおける基本的な情報です。例えば`Person`と名付けられたモデルでは`firstName`, `lastName`, `phoneNumber`, `age`, `birthDate`や`emailAddress`のようなアトリビュートがあります。
<!---
TODO: address sql vs. no sql and stuff like:
"""
In most cases, this data is _homogenous_, meaning each record has the same attributes,
"""
-->

### アトリビュート・オプション

これらのオプションを利用することでモデルアトリビュートに各種の制約や拡張を付加することが出来ます。

###### type

どんな型のデータがモデルアトリビュートに入るかを指定するもので以下のいずれかのものです:

- string
- text
- integer
- float
- date
- datetime
- boolean
- binary
- array
- json

###### email
入力が正しいEメールアドレスかを調べます。

```javascript
attributes: {
  email: {
    type: 'string',
    email: true
  }
}
```

###### defaultsTo

レコードが作成される時にデータが入っていなかった場合`defaultsTo`で指定した値を入れてレコードを作成します。

```javascript
attributes: {
  phoneNumber: {
    type: 'string',
    defaultsTo: '111-222-3333'
  }
}
```

###### autoIncrement

指定したアトリビュートをオートインクリメントに指定します。レコードが作成される時にこの値が指定されていなければ最終のデータにインクリメントする形で値を生成します。備考：`autoIncrement`に指定するアトリビュートのデータ型は`type: integer`でなければなりません。また、各データストアによってサポートの度合いは異なります。例えばMySQLで1つのテーブルに複数のオートインクリメントは許可されていません。

```javascript
attributes: {
  placeInLine: {
    type: 'integer',
    autoIncrement: true
  }
}
```

###### unique

指定されたアトリビュートに関して同じ値をも複数のレコードが存在しないことを保証します。これはアダプタレベルでの制約ですので多くのケースでは下部のデータベースレイヤーでこれを指定したアトリビュートには主キー制約がかかります。

```javascript
attributes: {
  username: {
    type: 'string',
    unique: true
  }
}
```

<!--

Omitting `index` from docs for now.

###### index

Will create a simple index in the underlying datastore for faster queries if available. This is only for simple indexes and currently dosn't support compound indexes. For these you will need to create them yourself or use a migration.

There is currently an issue with adding indexes to string fields. Because Waterline performs its queries in a case insensitive manner we are unable to use the index on a string attribute. There are some workarounds being discussed but nothing is implemented so far. This will be updated in the near future to fully support indexes on strings.

javascript
attributes: {
  email: {
    type: 'string',
    index: true
  }
}

-->

###### primaryKey

このキーをレコードの主キーとして利用します。たった一つのアトリビュートのみが`primaryKey`になりえます。備考：[autoPK](http://sailsjs.org/documentation/concepts/ORM/model-settings.html?q=autopk)をfalseにしない限りこのオプションは動作しません。

```javascript
attributes: {
  uuid: {
    type: 'string',
    primaryKey: true,
    required: true
  }
}
```

###### enum

ホワイトリストとして渡した値のうちいずれかしか保存することが出来なくする特殊なオプションです。

```javascript
attributes: {
  state: {
    type: 'string',
    enum: ['pending', 'approved', 'denied']
  }
}
```

<!--
These are not ready for prime-time yet, but listing them here so they're easy to reference and add to official docs later:

###### example

An example value for this attribute, e.g. "Albus Dumbledore".


###### validationMessage

A custom validation message to use when any validations fail for this attribute.

-->

###### size

アダプタ側でサポートされていればアトリビュートのサイズを指定するために利用できます。`size`は例えばMySQLではMySQLでのデータ型`varchar(n)`を指定する際の`n`で指定することが出来ます。

```javascript
attributes: {
  name: {
    type: 'string',
    size: 24
  }
}
```

###### columnName


アトリビュートの設定の中で`columnName`を指定することでSails（Waterline）が設定された接続先（つまりデータベース）でそのアトリビュートを保存する際に利用するカラム名を指定することが出来ます。これはSQLに限定された話でなくMongoDBのフィールドなどにも利用できることをご留意ください。

`columnName`プロパティは元々、既存のデータベースを利用する際に作られたのですが、いくつかのアプリケーションでテータベースを共有するときやデータスキーマを変更する権限がないときにもこの機能は便利です。

モデルの`numberOfWheels`アトリビュートを`number_of_round_rotating_things`に保管するには:
```javascript
  // モデルの中のアトリビュートで:
  // ...
  numberOfWheels: {
    type: 'integer',
    columnName: 'number_of_round_rotating_things'
  }
  // ...
```


それではもっと完璧で実用的な例を挙げましょう。

以下の様な`User`というモデルがあったとします。:

```javascript
// api/models/User.js
module.exports = {
  connection: 'shinyNewMySQLDatabase',
  attributes: {
    name: 'string',
    password: 'string',
    email: {
      type: 'email',
      unique: true
    }
  }
};
```


これでうまくいくいきます、しかしアプリケーションにおけるユーザデータを格納するはずの既存のデータベースを使う代わりに：

```javascript
// config/connections.js
module.exports = {
  // ...

  // Existing users are in here!
  rustyOldMySQLDatabase: {
    adapter: 'sails-mysql',
    user: 'bofh',
    host: 'db.eleven.sameness.foo',
    password: 'Gh19R!?had9gzQ#Q#Q#%AdsghaDABAMR>##G<ADMBOVRH@)$(HTOADG!GNADSGADSGNBI@(',
    database: 'jonas'
  },
  // ...
};
```

このような`our_users`というテーブルが古いMySQLデータベースにあったとします。:

| the_primary_key | email_address | full_name | seriously_encrypted_password|
|------|---|----|---|
| 7 | mike@sameness.foo | Mike McNeil | ranchdressing |
| 14 | nick@sameness.foo | Nick Crumrine | thousandisland |


この形式をSailsから使うために`User`モデルを以下のように編集する必要があります。:

```javascript
// api/models/User.js
module.exports = {
  connection: 'rustyOldMySQLDatabase',
  tableName: 'our_users',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'the_primary_key'
    },
    name: {
      type: 'string',
      columnName: 'full_name'
    },
    password: {
      type: 'string',
      columnName: 'seriously_encrypted_password'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email_address'
    }
  }
};
```

> この例で我々は[`tableName`](http://sailsjs.org/documentation/concepts/ORM/model-settings.html?q=tablename)も使っていることがお分かりになるでしょう。これでデータを格納するテーブル名を指定することが出来ます。







<docmeta name="uniqueID" value="Attributes951609">
<docmeta name="displayName" value="Attributes">

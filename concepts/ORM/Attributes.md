# 屬性（Attributes）
### 概觀

模型屬性是關於一個模型的基本資訊。一個名為 `Person` 的模型可能有 `firstName`、`lastName`、`phoneNumber`、`age`、`birthDate` 和 `emailAddress` 屬性。

> TODO: address sql vs. no sql and stuff like:
> """
> In most cases, this data is _homogenous_, meaning each record has the same attributes,
> """

### 屬性選項

這些選項可以用於執行各種限制，並增加特殊增強功能到我們的模型屬性。

###### type

指定將要儲存在這個屬性的資料類型。

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


###### defaultsTo

當建立一個記錄，如果沒有提供資料時，記錄將使用指定的 `defaultsTo` 值建立。

```javascript
attributes: {
  phoneNumber: {
    type: 'string',
    defaultsTo: '111-222-3333'
  }
}
```

###### autoIncrement

設定該屬性為自動遞增鍵。當一個新的記錄增加到模型中，如果沒有指定該屬性的值，它會使用最近一次建立的記錄值加一。注意事項：指定為 `autoIncrement` 的屬性應該永遠是 `type: integer`。另外，請記住，支援的程度依不同的資料儲存區而有差異。例如，MySQL 不會允許一個資料表中有多個自動遞增列。

```javascript
attributes: {
  placeInLine: {
    type: 'integer',
    autoIncrement: true
  }
}
```

###### unique

確保目標屬性不會有使用相同值的兩個記錄。這是橋接器層級的限制，因此在大多數情況下，這將導致該屬性被底層資料儲存區建立一個唯一索引。

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

```javascript
attributes: {
  email: {
    type: 'string',
    index: true
  }
}
```
-->

###### primaryKey

使用此屬性作為記錄的主鍵。每個模型只有一個屬性可以是 `primaryKey`。注意事項：這應該永遠不被使用，除非 [autoPK](http://beta.sailsjs.org/#/documentation/concepts/ORM/model-settings.html?q=autopk) 設定為 false。

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

一個特殊的驗證屬性，它只儲存匹配於白名單值集的資料。

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

如果橋接器有支援，可用於定義屬性的大小。例如 MySQL 中，`size` 可以指定為一個數字 (`n`)，建立一個 SQL 資料類型的列：`varchar(n)`。

```javascript
attributes: {
  name: {
    type: 'string',
    size: 24
  }
}
```

###### columnName


在屬性定義裡面，你可以指定一個 `columnName` 強制 Sails/Waterline 在已設定的連線（如資料庫）中指定的資料列儲存該屬性資料。請注意，這並不一定是 SQL 特有，它也適用於 MongoDB 的欄位等。

`columnName` 屬性主要是用來與現有／老舊的資料庫工作，它在你的資料庫是由其他應用程式共享，或你沒有存取權限來變更架構的情況下也非常有用。

要存取你的模型的 `numberOfWheels` 屬性到 `number_of_round_rotating_things` 列：
```javascript
  // 在你的模型的其中一個屬性：
  // ...
  numberOfWheels: {
    type: 'integer',
    columnName: 'number_of_round_rotating_things'
  }
  // ...
```


現在，一個更徹底、現實的例子。

比方說，你有一個 `User` 模型在你的 Sails 應用程式，看起來像這樣：

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


一切運作良好，現在改為使用位於伺服器某個地方已儲存應用程式的目標用戶的現有 MySQL 資料庫：

```javascript
// config/connections.js
module.exports = {
  // ...

  // 現有使用者都在這裡！
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

比方說，有一個名為 `our_users` 的資料表在舊的 MySQL 資料庫，看起來像這樣：

| the_primary_key | email_address | full_name | seriously_encrypted_password|
|------|---|----|---|
| 7 | mike@sameness.foo | Mike McNeil | ranchdressing |
| 14 | nick@sameness.foo | Nick Crumrine | thousandisland |


為了在 Sails 使用這個，你會改變你的 `User` 模型，看起來像這樣：

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

> 你可能已經注意到，我們還使用了 [`tableName`](http://beta.sailsjs.org/#/documentation/concepts/ORM/model-settings.html?q=tablename) 屬性在這個範例中。這使我們能夠控制將用於儲存我們的資料的資料表名稱。







<docmeta name="uniqueID" value="Attributes951609">
<docmeta name="displayName" value="Attributes">


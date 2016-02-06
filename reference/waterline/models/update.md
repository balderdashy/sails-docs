# .update()
### 目的
データベースにある、与えられた条件に合う既存レコードを更新します。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    検索条件   | `{}`,`[{}]`, `string`, `int`| はい |
| 2 |  更新するレコード  | `{}`,`[{}]`          |  はい  |
| 3 |     コールバック        | `function`          | いいえ        |

#### コールバックパラメータ

| # | 説明              | 想定されるデータ型 |
|---|---------------------|---------------------|
| 1 |  エラー              | `Error`             |
| 2 |  更新に成功したレコード    | `{}`, `[{}]`          |

### 使用例

```javascript
User.update({name:'Walter Jr'},{name:'Flynn'}).exec(function afterwards(err, updated){

  if (err) {
    // handle error here- e.g. `res.serverError(err);`
    return;
  }

  console.log('Updated user to have name ' + updated[0].name);
});

```
### 備考
`.update()`に`collection`のアソシエーションのために与えられた主キーの値の配列は主キーの値が与えられたレコード **のみ** が含むようなアソシエーションのコレクションを設定します。つまり、これはアソシエーションにおいて **他のすべてをリンク解除する** ということです。
> + .update()にはオブジェクトまたはオブジェクトの配列を渡せますが、返り値は常に配列です。
> + 検索オブジェクトの代わりに(例:`7` や `"50c9b254b07e040200000028"`)主キーを指定した時、全ての`.where()`フィルタは無視されます。
> + 現在、`.update()`で`.populate()`を呼び出すクエリは効果がありません。結果の属性をpopulateしたい時にはupdateのあとに`find().populate()`クエリを行わなければなりません。


<docmeta name="uniqueID" value="update727440">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".update()">


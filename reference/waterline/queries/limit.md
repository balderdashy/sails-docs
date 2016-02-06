# .limit(`integer`)
### 目的

#### パラメータ
| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    返す件数        | `function`          | はい        |

### 使用例

```javascript 
var myQuery = User.find();
myQuery.limit(12);

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### 備考
> .find()メソッドはコールバックが与えられない時はチェーン可能なオブジェクトを返します。このメソッドはさらなるフィルタ結果のために.find()にチェーンすることが出来ます。

<docmeta name="uniqueID" value="limit203606">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".limit()">


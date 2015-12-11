# .sort(`string`)
### 目的

#### パラメータ
| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    ソート文字列        | `string`     | はい        |

### 使用例

```javascript 
var myQuery = User.find();

var sortString= 'name ASC';

// Sort strings look like this

// '<Model Attribute> <sort type>' 

myQuery.sort('name ASC');

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### 備考
> .find()メソッドはコールバックが与えられない時はチェーン可能なオブジェクトを返します。このメソッドはさらなるフィルタ結果のために.find()にチェーンすることが出来ます。

> その他のソートの種類は
  - ASC
  - DESC

<docmeta name="uniqueID" value="sort822396">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".sort()">


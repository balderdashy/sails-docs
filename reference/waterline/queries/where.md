# .where(`criteria`)
### 目的


#### パラメータ
| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    条件オブジェクト       | `{}`     | はい        |


### 使用例

```javascript 
var myQuery = User.find();
myQuery.where({'name':{startsWith:'W'}});

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### 備考
> .find()メソッドはコールバックが与えられない時はチェーン可能なオブジェクトを返します。このメソッドはさらなるフィルタ結果のために.find()にチェーンすることが出来ます。



<docmeta name="uniqueID" value="where700717">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".where()">


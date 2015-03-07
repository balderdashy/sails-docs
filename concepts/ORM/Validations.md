# バリデーション

Sailsはモデルのアトリビュートに対する自動バリデーションを用意しています。レコードを作成したり更新するときは常にあなたの指定したバリデーションルールにそっているか自動的に確認されます。これにより、アプリケーションに保存されるデータが不正なものでないことを保証することが簡単に実現出来ます。

### バリデーションルール

バリデーションは[バリデータ](https://github.com/chriso/validator.js)の最上位層に位置する[Anchor](https://github.com/balderdashy/anchor)と呼ばれる軽量なレイヤーによってハンドルされます。AncherはNode.jsで最もパワフルなバリデータの一つです。`unique`のように一部にデータベース上での実装がなされていることが必要な物は有りますが、Sailsではバリデータの中のほとんどすべての種類のバリデーションをサポートします。


|バリデータ名|確認するもの|利用上の注意|
|-------------------|---------------------|----------------|
|after|入力された日付の文字列が指定日より後のものか。|正しいJavascriptのDate形式である必要があります。|
|alpha|	アルファベッドのみ(a-zA-Z)を含む文字列かどうか。| |
|alphadashed|   |数字とダッシュのみを含む文字列であるかどうか。（訳注：要確認）|
|alphanumeric| アルファベッドと数字のみを含む文字列かどうか。| |
|alphanumericdashed	|アルファベッド、数字、ダッシュのみを含む文字列かどうか。| |
|array|	正しいJavascriptの配列形式であるか。|「配列化された文字列」はパスしない。|
|before|入力された日付の文字列が指定日より前のものか。| |
|binary|バイナリデータか|文字列であれば常にパスします。|
|boolean|正しいJavascriptのBoolean形式であるか。|文字列はパスしない。|
|contains|文字列がseedを含んでいるかどうか| |
|creditcard|文字列はクレジットカードの形式かどうか。| |
|date|文字列は日付型かどうか。|文字列とJavascript型のどちらでもパスする。|
|datetime|文字列はJavascriptのdatetime型かどうか。| |
|decimal|   |小数点を含むかあるいは１より小さいか。|
|email|	文字列はメールアドレスのように見えるか。| |
|empty|	長さが０で数えられるプロパティもない配列と文字列、引数オブジェクトが "empty"とみなされます。	|lo-dash _.isEmpty()|
|equals|文字列は指定された内容と同じか。	| === ! 型と値が合致してる必要があります。|
|falsey|JavascriptエンジンがFalseとみなすものかどうか。| |
|finite	|値または値から変換できる数が有限数かどうか。|True時にBoolを、False時にからの文字列を返すネイティブのisFiniteとは同じでありません。 
|float|	Floatがたの数値化どうか。| |
|hexadecimal|十六進の数値かどうか| |
|hexColor|	十六進色表記かどうか| |
|in	|指定された文字列のうちいずれかと合致するものであるか。| |
|int|文字列は整数型であるか。| |
|integer|intと同じ。	|どうしてこの両方が存在するかはわかりません。|
|ip|	文字列は正しいIP(v4またはv6)アドレスかどうか。| |
|ipv4|	文字列は正しいIP(v4)アドレスかどうか。| |
|ipv6|	文字列は正しいIP(v6)アドレスかどうか。| |
|is	|   | REGEXと一緒に使います。|
|json|正しいJSON型かどうかTry and Catchします。| |
|len|与えられた整数 > param1 && < param2であるかどうか|どうやってParamを設定するんだろうか。。。|
|lowercase|	文字列は全て小文字であるか。| |
|max| | |
|maxLength|	与えられた整数 > 0 && < param2かどうか| |
|min| | |
|minLength|	 | |
|not|   |REGEX関連。|
|notContains|	 | |	
|notEmpty| | |
|notIn|	モデルアトリビュートの値が定義されたバリデータの値の範囲内（なおかつ同じ型）に存在するか。|文字列と配列を処理できます。|
|notNull|内容はNULLでないかどうか。| |
|notRegex| | |
|null|内容がNULLかどうか。| |
|number|数字かどうか。|	NaNは数字とみなされます。|
|numeric|文字列は数字のみを含むかどうか。| |
|object|オブジェクトのLanguage typeであるかどうか。|配列、関数、オブジェクト、正規表現、new Number(0)とnew String('')がパスします !|
|regex|		 | |
|protected|	モデルインスタンスでtoJSONが呼び出された時にこのアトリビュートは取り除かれるべきか。| |
|required|	レコードが作成される前の段階で何らかの正当な値が入っている必要があるかどうか。| |
|string|文字列かどうか | |
|text|文字列かどうか | |
|truthy|JavascriptエンジンがFalseとみなすものかどうか。|訳注：多分Tureの誤植。 |
|undefined|	Javascriptエンジンが'undefined'とみなすものかどうか。| |
|unique|新しいレコードのアトリビュートがユニークかどうか。| |
|uppercase|	文字列が全て大文字かどうか。| |
|url	|文字列がURLの形式かどうか。| |
|urlish	|文字列が何らかの拡張子を含むルートかどうか。|	/^\s([^\/]+.)+.+\s*$/g|
|uuid	|文字列はUUID(v3,v4,もしくはv5)か。| |
|uuidv3	|文字列はUUID(v3)か。| |
|uuidv4	|文字列はUUID(v4)か。| |




### Custom Validation Rules

タイプオブジェクトを使うとオリジナルのバリデーション規則を定義することが出来ます。ここでは別々のアトリビュートを参照し、比較することも出来ます("this"を使って)。これによりバリデーションのビジネスロジックをコントローラからモデルへと移動することが出来ます。

> あなたの名づけたバリデーションスールは常に基本データ型("string", "int", "json"など)と異なっている必要があることを覚えておいてください。

#### モデルの例

```javascript
// api/models/foo
module.exports = {

  types: {
    is_point: function(geoLocation){
      return geoLocation.x && geoLocation.y
    },
    password: function(password) {
      return password === this.passwordConfirmation;
    }
  },
  attributes: {
    firstName: {
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 15
    },
    location: {
      //ベースのタイプ（Json）は依然として定義しなければなりません。
      type: 'json',
      is_point: true
    },
    password: {
      type: 'string',
      password: true
    },
    passwordConfirmation: {
      type: 'string'
    }

  }
}
 ```




<docmeta name="uniqueID" value="Validations576587">
<docmeta name="displayName" value="Validations">


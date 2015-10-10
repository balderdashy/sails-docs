# ローカル

特定のビューからアクセスすることの出来る変数を`locals`と言います。ローカルとはビューから _アクセス可能な_ サーバサイドデータを意味します。ローカルは実際に利用しているビューエンジンごとに決められた特殊な構文によって明示的に呼び出されないかぎりは実際にコンパイル済みのHTMLに _含まれている_ わけではありません。

```ejs
<div>Logged in as <a><%= name %></a>.</div>
```

##### ビューからローカルを使う

ローカルにアクセスするための文法はビューエンジンごとに異なります。EJSでは特別なテンプレートマークアップ (例： `<%= someValue %>`)を使うことでビューにローカルをインクルードします。

EJSには3種類のテンプレートタグがあります:
+ `<%= someValue %>`
  + ローカルの中の`someValue`をエスケープしたうえで文字列としてインクルードします。
+ `<%- someRawHTML %>`
  + ローカルの中の`someRawHTML`をエスケープせずに読み込みます。
  + ご注意ください！これを使うことで何が起こるかわからない場合、XSS攻撃の脆弱性を作りこんでしまう危険性があります。
+ `<% if (!loggedIn) { %>  <a>Logout</a>  <% } %>`
  + ビューがコンパイルされた時に`<% ... %>` の中のjavascriptを実行します。
  + 条件式(`if`/`else`)やデータのループ(`for`/`each`)を使うときに便利です。


以下に2つのロケール`user`と`corndogs`を使ったビュー(`views/backOffice/profile.ejs`)の例を挙げます。:

```html
<div>
  <h1><%= user.name %>'s first view</h1>
  <h2>My corndog collection:</h2>
  <ul>
    <% _.each(corndogs, function (corndog) { %>
    <li><%= corndog.name %></li>
    <% }) %>
  </ul>
</div>
```

> ここで別のローカル`_`にお気づきのことと思います.Sailsはデフォルトで ローダッシュ(`_`)を含む幾つかローカルを自動的にビューに渡します。  

もし渡したいデータが完全に静的な場合、コントローラは必要ありません。つまりプロジェクトの`config/routes.js`のにビューとそのローカルをハードコード出来るのです。すなわち:

```javascript
  // ...
  'get /profile': {
    view: 'backOffice/profile',
    locals: {
      user: {
        name: 'Frank',
        emailAddress: 'frank@enfurter.com'
      },
      corndogs: [
        { name: 'beef corndog' },
        { name: 'chicken corndog' },
        { name: 'soy corndog' }
      ]
    }
  },
  // ...
```

一方で多くのシナリオでデータはダイナミックでしょうから、モデルからそれらのデータを読み込むためのコントローラを用意してその後に[res.view()](http://beta.sailsjs.org/#/documentation/reference/res/res.view.html)メソッドを利用しそのデータをビューに受け渡す必要があります。

ここで、モデルはすでにセットアップされており、あるルートをあるコントローラアクションに紐付けるとします。ここで以下のようにビューを受け渡すことが出来ます。:

```javascript
// in api/controllers/UserController.js...

  profile: function (req, res) {
    // ...
    return res.view('backOffice/profile', {
      user: theUser,
      corndogs: theUser.corndogCollection
    });
  },
  // ...
```

<docmeta name="uniqueID" value="Locals453748">
<docmeta name="displayName" value="Locals">


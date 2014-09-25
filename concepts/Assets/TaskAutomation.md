# 任務自動化（Task Automation）

### 概觀

[`tasks/`](./#!documentation/anatomy/tasks) 目錄包含了一系列 [Grunt 任務](http://gruntjs.com/creating-tasks)和它們的[組態設定](http://gruntjs.com/configuring-tasks)。

任務主要是用在打包前端資源（如 stylesheets、scripts 及用戶端標記樣版），但它們也可以用在自動化重複各種開發時的瑣事，從 [browserify](https://github.com/jmreidy/grunt-browserify) 編譯到[資料庫遷移](https://www.npmjs.org/package/grunt-db-migrate)皆可使用。

為了方便起見，Sails 打包了一些[預設任務](./#!documentation/grunt/default-tasks)，但隨著[數以百計](http://gruntjs.com/plugins)的插件可供選擇，你可以幾乎毫不費力的使用任務自動完成任何事情。如果沒有你需要的，你可以[編寫](http://gruntjs.com/creating-tasks)並[發佈自己的 Grunt 插件](http://gruntjs.com/creating-plugins)到 [npm](http://npmjs.org)！

> 如果你以前從未使用過 [Grunt](http://gruntjs.com/)，一定要查看[新手上路](http://gruntjs.com/getting-started)指南，因為它解釋了如何建立 [Gruntfile](http://gruntjs.com/sample-gruntfile) 以及安裝和使用 Grunt 插件。


### Asset pipeline

Asset pipeline 是讓你組織要注入到檢視的資源的地方，可以在 `tasks/pipeline.js` 檔案找到它。設定這些資源很簡單，使用 grunt [任務檔案組態設定](http://gruntjs.com/configuring-tasks#files)和[匹配模式](http://gruntjs.com/configuring-tasks#globbing-patterns)。它們被分為三個部分。

##### 要注入的 CSS 檔案
這是一個 css 檔案陣列，會注入到 html 的 `<link>` 標籤。這些標籤會放在所有檢視的 `<!--STYLES--><!--STYLES END-->` 註解之間。

##### 要注入的 Javascript 檔案
這是一個 Javascript 檔案陣列，會注入到 html 的 `<script>` 標籤。這些標籤會放在所有檢視的 `<!--SCRIPTS--><!--SCRIPTS END-->` 註解之間。檔案會依照在陣列中的順序被注入（也就是你應該按照檔案相依關係來調整注入的順序）。

##### 要注入的樣版檔案
這是一個 html 檔案陣列，會編譯成 jst 函數並放在一個 jst.js 檔案。這些檔案會注入到 `<script>` 標籤，放在 html 的 `<!--TEMPLATES--><!--TEMPLATES END-->` 註解之間。

> 如果你想改變它們的話，相同的 grunt 匹配模式和任務檔案組態設定也使用在一些任務組態設定檔自身。

### 任務組態設定（Task configuration）

每個已設定的任務都是一組規則，Gruntfile 會遵循此規則執行。他們位於 [`tasks/config/`](/#/documentation/anatomy/myApp/tasks/config) 目錄且可完全自訂。你可以修改、忽略或取代任何一個 Grunt 任務，以滿足你的需求。你也可以加入自己的 Grunt 任務，只需在此目錄新增一個 `someTask.js` 檔案來設定新的任務，然後用適當的父任務註冊它（請查看 `grunt/register/*.js` 內的檔案）。請記住，Sails 具備一套實用的預設任務，是為了讓你在無需任何組態設定下執行。

##### 設定自訂任務

設定一個自訂任務到你的專案非常簡單，使用 Grunt 的[設定](http://gruntjs.com/api/grunt.config)和[任務](http://gruntjs.com/api/grunt.task) APIs 允許你建立自己的任務模組。讓我們實作一個建立新任務取代已存在任務的簡單例子。比方說，我們希望 [Handlebars](http://handlebarsjs.com/) 樣版引擎來取代預設具備的 underscore 樣版引擎：

* 第一步是在終端機使用以下指令安裝 handlebars 的 grunt 插件：

```bash
npm install grunt-contrib-handlebars --save-dev
```

* 建立組態設定檔在 `tasks/config/handlebars.js`。這是我們要放 handlebars 設定的地方。

```javascript
// tasks/config/handlebars.js
// --------------------------------
// handlebar 任務組態設定。

module.exports = function(grunt) {

  // 我們使用 grunt.config api 的 set 方法來設定一個物件到定義的字串。
  // 在這個例子中，'handlebars' 任務會根據下面的物件來設定。
  grunt.config.set('handlebars', {
    dev: {
      // 我們將定義在 tasks/pipeline.js 要注入的樣版檔案
      files: {
        '.tmp/public/templates.js': require('../pipeline').templateFilesToInject
      }
    }
  });

  // 載入 handlebars 的 npm 模組。
  grunt.loadNpmTasks('grunt-contrib-handlebars');
};
```

* 在 asset pipeline 取代來源檔案路徑。唯一的改變是 handelbars 尋找副檔名為 .hbs 的檔案，而 underscore 樣版可以是單純的 html 檔案。

```javascript
// tasks/pipeline.js
// --------------------------------
// asset pipeline

var cssFilesToInject = [
  'styles/**/*.css'
];

var jsFilesToInject = [
  'js/socket.io.js',
  'js/sails.io.js',
  'js/connection.example.js',
  'js/**/*.js'
];

// 我們修改此匹配模式來涵蓋所有在 templates/ 目錄下副檔名為 .hbs 的檔案
var templateFilesToInject = [
  'templates/**/*.hbs'
];

module.exports = {
  cssFilesToInject: cssFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
  }),
  jsFilesToInject: jsFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
  }),
  templateFilesToInject: templateFilesToInject.map(function(path) {
    return 'assets/' + path;
  })
};
```

* 將 hanldebars 任務加到 compileAssets 和 syncAssets 註冊任務中。這是目前正在使用的 jst 任務，我們將用新設定的 handlebars 任務來取代它。

```javascript
// tasks/register/compileAssets.js
// --------------------------------
// 註冊編譯資源的 grunt 任務

module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'handlebars:dev',       // 將 jst 任務改成 handlebars 任務
    'less:dev',
    'copy:dev',
    'coffee:dev'
  ]);
};

// tasks/register/syncAssets.js
// --------------------------------
// 註冊同步資源的 grunt 任務

module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'handlebars:dev',      // 將 jst 任務改成 handlebars 任務
    'less:dev',
    'sync:dev',
    'coffee:dev'
  ]);
};
```

* 我們不再使用 jst 任務，所以可將任務設定檔案 `tasks/config/jst.js` 從專案刪除。

> 理想情況下，你應該將它從專案及 node 相依模組中刪除。這可以透過在終端機執行此命令來完成。
```bash
npm uninstall grunt-contrib-jst --save-dev
```

### 任務觸發器（Task triggers）

在[開發模式](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.local.html?q=environment)下，Sails 執行 `default` 任務（[`tasks/register/default.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register/default.js.html)）。這將編譯 LESS、CoffeeScript 及用戶端 JST 樣版，然後自動將他們連接到應用程式的動態檢視和靜態 HTML 頁面。

在生產模式下，Sails 執行 `prod` 任務（[`tasks/register/prod.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register/prod.js.html)）。它與 `default` 有相同的職責，同時壓縮了應用程式的 scripts 和 stylesheets。這減少了應用程式的載入時間和頻寬的使用。

這些任務觸發器都是[「基本」的 Grunt 任務](http://gruntjs.com/creating-tasks#basic-tasks)，位於 [`tasks/register/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register) 資料夾內。下面，你會看到 Sails 所有的任務觸發器的完整參考資料，以及觸發它們的指令：

##### `sails lift`

執行 **default** 任務（`tasks/register/default.js`）。

##### `sails lift --prod`

執行 **prod** 任務（`tasks/register/prod.js`）。

##### `sails www`

執行 **build** 任務（`tasks/register/build.js`）。

##### `sails www --prod`（生產模式）

執行 **buildProd** 任務（`tasks/register/buildProd.js`）。

<docmeta name="uniqueID" value="TaskAutomation282238">
<docmeta name="displayName" value="Task Automation">


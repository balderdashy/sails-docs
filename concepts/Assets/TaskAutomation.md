# Task Automation

### 개요

[`tasks/`](./#!documentation/anatomy/tasks) 디렉토리는 일련의 [Grunt 테스크들](http://gruntjs.com/creating-tasks)과 그것들의  [설정들](http://gruntjs.com/configuring-tasks)을 포함하고 있다.

테스크들은 주로 프론트 앤드의 asset들을 묶는데 유용하고, (스타일시트와 자바스크립트 그리고 클라이언트사이드 마크업 템플릿과 같은) 뿐만아니라 [browserify](https://github.com/jmreidy/grunt-browserify)에서부터 [database migrations](https://www.npmjs.org/package/grunt-db-migrate)까지 모든 종류의 개발상 반복적인 지루한 일들을 자동화 하는데에도 사용된다. 

Sails bundles some [default tasks](./#!documentation/grunt/default-tasks) for convenience, but with [literally hundreds of plugins](http://gruntjs.com/plugins) to choose from, you can use tasks to automate just about anything with minimal effort.  If someone hasn't already built what you need, you can always [author](http://gruntjs.com/creating-tasks) and [publish your own Grunt plugin](http://gruntjs.com/creating-plugins) to [npm](http://npmjs.org)!
Sails는 편의를 위해 몇몇의 [기본 테스크들](./#!documentation/grunt/default-tasks) 제공하고 있다. 그러나 [말그대로 엄청난 수의 플러그인](http://gruntjs.com/plugins)을 선택할 수 있으며, 최소한의 노력으로 이러한 테스크들을 자동화하는데 사용 할 수 있다. 만약 누군가가 당신이 필요한것을 만들어 놓지 않았다면 [npm](http://npmjs.org)에 [자신이 만든 Grunt 플러그인 등록](http://gruntjs.com/creating-plugins)하여 [제작자](http://gruntjs.com/creating-tasks)가 되어보자.


> 만약 [Grunt](http://gruntjs.com/)를 사용해본적이 없다면, [Getting Started](http://gruntjs.com/getting-started) 가이드를 읽어보자. 거기에는 Grunt 플러그인들을 어떻게 설치 및 사용하는지 뿐만 아니라 [Gruntfile](http://gruntjs.com/sample-gruntfile) 파일을 어떻게 만드는지 설명하고 있다.

### Asset 파이프라인 

Asset 파이프라인은 뷰로 주입될 asset을 구성하는곳이다. `tasks/pipeline.js`파일 안에 존재한다. 이러한 asset들을 설정하는것은 간편하다. Grunt [테스크 파일 설정](http://gruntjs.com/configuring-tasks#files)을 사용하고, [wildcard/glob/splat 패턴](http://gruntjs.com/configuring-tasks#globbing-patterns)을 사용하라. 세가지 섹션을 참고하라. 

##### CSS 파일 주입
이것은 css 파일들의 배열로, html의 `<link>` 테그들로 주입된다. 이러한 테그들은 `<!--STYLES--><!--STYLES END-->` 주석들 사이에 있는곳에 주입되어 보여질 것이다.

##### 자바스크립트 파일 주입
이것은 자바스크립트 파일들의 배열로, `<script>` 테그로 html에 주입된다. 이러한 테그들은 `<!--SCRIPTS--><!--SCRIPTS END-->` 커멘트들 사이에 주입될것이다. 이 파일들은 배열에 있는 순서대로 주입이 된다. (예. 한 파일이 다른 파일들에 의존적이면, 먼저 그 파일을 기입해야한다.)

##### 탬플릿 파일 주입
이것은 html 파일들의 배열로, jst 함수로 컴파일 되고, jst.js 파일로 변환된다. 이 파일은 html에서 `<!--TEMPLATES--><!--TEMPLATES END-->` 주석 사이에 `<script>` 테크로 주입된다.


> Grunt wildcard/glob/splat 패턴들과 테스크 설정 파일들은 js 파일 그 자체가 테스크 설정하는데 사용된다. 만약 그 설정을 바꾸고 싶다면 바꿀수 있다.

### 테스크 설정

테스크 설정은 실행할때 그것을 따르는 Gruntfile에 설정된 규칙의 집합이다. 그것들은 완벽히 커스터마이징 할 수 있으며,  [`tasks/config/`](/#/documentation/anatomy/myApp/tasks/config) 디렉토리에 위치해있다. 이러한 요구사항에 맞게끔 Grunt 테스크들을 수정하거나, 빼거나, 치환 할 수 있다. 또한 자신만의 Grunt 테스크를 추가 할 수 있는데, 새로운 테스크를 설정하는`someTask.js`를 디렉토리에 넣으면된다. 그리고 그것을 적당한 부모 테스크와 함께 등록해주면된다. (`grunt/register/*.js` 파일들을 참조) Sails에서는 아무런 설정없이 수행 할 수 있는 유용한 기본 테스크들을 함께 제공한다는 것을 기억하라.

##### 커스텀 테스크 설정하기

프로젝트에 커스텀 테스크를 설정하는것은 매우 간단하다. Grunt의 테스크를 모듈화 해주는 [config](http://gruntjs.com/api/grunt.config)와 [task](http://gruntjs.com/api/grunt.task) API들을 사용하면된다. 기존의 테스크를 바꾼 새로운 태스크의 예를 살펴보자. 기본적으로 제공되는 언더스코어 템플릿 대신에 [Handlebars](http://handlebarsjs.com/)라는 템플릿 엔진을 사용하고 싶다고 가정 해보자.

* 우선 해야할 일은 터미널에서 아래와 같은 커맨드를 입력하여 handlebars grunt 플러그인을 설치하는것이다.

```bash
npm install grunt-contrib-handlebars --save-dev
```

* `tasks/config/handlebars.js`로 설정 파일을 만들자. 여기에 handlebars의 설정들을 기술 할 것이다.

```javascript
// tasks/config/handlebars.js
// --------------------------------
// handlebar task configuration.

module.exports = function(grunt) {

  // We use the grunt.config api's set method to configure an
  // object to the defined string. In this case the task
  // 'handlebars' will be configured based on the object below.
  grunt.config.set('handlebars', {
    dev: {
      // We will define which template files to inject
      // in tasks/pipeline.js 
      files: {
        '.tmp/public/templates.js': require('../pipeline').templateFilesToInject
      }
    }
  });

  // load npm module for handlebars.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
};
```

* asset 파이프라인에서 기존의 소스 경로들을 치환하자. 여기에서 바뀐것은 언더스코어 handelbars는 템플릿의 html 파일 대신에 .hbs 확장자로 된 파일을 찾는것이다.


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

// We change this glob pattern to include all files in
// the templates/ direcotry that end in the extension .hbs
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

* 등록된 compileAssets 테스크와 syncAssets 테스크에 hanlderbars를 추가하자. 이것은 jst 테스크가 사용되는곳이고, 대신 새롭게 설정된 handlebars 테스크를 넣어보자.

```javascript
// tasks/register/compileAssets.js
// --------------------------------
// compile assets registered grunt task

module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'handlebars:dev',       // changed jst task to handlebars task
    'less:dev',
    'copy:dev',
    'coffee:dev'
  ]);
};

// tasks/register/syncAssets.js
// --------------------------------
// synce assets registered grunt task

module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'handlebars:dev',      // changed jst task to handlebars task
    'less:dev',
    'sync:dev',
    'coffee:dev'
  ]);
};
```

* 이제 jst task 설정 파일을 제거하자. 더이상 사용할일이 없으므로 `tasks/config/jst.js`을 제거한다. 간단히 프로젝트에서 삭제한다.

> 이상적으로는 프로젝트에서 삭제하고, 관련된 의존성들 역시 삭제해야한다. 이것은 아래의 명령어로 수행 할 수 있다.
```bash
npm uninstall grunt-contrib-jst --save-dev
```

### 테스크 트리거
[개발 모드](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.local.html?q=environment)에서, Sails는 `default` 테스크인 ([`tasks/register/default.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register/default.js.html))를 수행한다. 이것은 LESS, ConffeeScript, 그리고 클라이언트사이드 JST 템플릿을 컴파일하며, 그것들을 자동적으로 어플리케이션의 동적인 뷰와 정적인 HTML에 연결시켜준다.

실제 배포모드에선, Sails는 `prod` 테스크 ([`tasks/register/prod.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register/prod.js.html))를 수행한다. 어플리케이션의 스크립트와 스타일 시트를 미니파이 한다는점을 제외하고는 `default` 테스크와 크게 다를바가 없다. 이것은 클라이언트에서 어플리케이션을 불러오는 시간과 대역폭 사용을 줄여준다.

이러한 테스크는 [`tasks/register/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register)폴더에 있는 ["기본" Grunt 테스크](http://gruntjs.com/creating-tasks#basic-tasks)를 실행시키게 된다. 아래는 Sails에 존재하는 모든 테스크 트리거들을 나타낸다:



##### `sails lift`

**기본** 테스크(`tasks/register/default.js`)를 실행한다.

##### `sails lift --prod`

**배포** 테스크(`tasks/register/prod.js`)를 실행한다.

##### `sails www`

**빌드** 테스크(`tasks/register/build.js`)를 실행한다.

##### `sails www --prod` (production)

**배포용 빌드** 테스크(`tasks/register/buildProd.js`)를 실행한다.

<docmeta name="uniqueID" value="TaskAutomation282238">
<docmeta name="displayName" value="Task Automation">


# 기본 작업

### 개요

Sails에서 asset 파이프라인 묶음은 프로젝트를 좀더 견고하고 생선적으로 유지하기 위한 기존에 설정된 Grunt 테스크들의 집합이다. 전체 프론트엔드 asset은 완전히 커스터마이즈가 가능하고, 또한 기본적으로 몇가지 기본 테스크들을 제공합니다. Sails는 필요에 따라서 [새로운 테스크 설정](/#/documentation/concepts/Assets/TaskAutomation.html?q=task-configuration)을 쉽게 할 수 있습니다.

Sails에서 기본적으로 제공하는 Grunt 설정에는 몇가지가 있습니다:
- 자동 LESS 컴파일
- 자동 JST 컴파일
- 자동 Coffescript 컴파일
- 선택적인 자동 asset 주입, 최소화, 그리고 병합
- web에 맞춰진 공용 디렉토리 생성
- 파일 감시 및 동기 
- 제품의 asset들의 최적화

### 기본 Grunt 테스크 동작

아래는 Sails프로젝트에 포함된 Grunt 테스크들과 그것들이 무엇을 하는지 간단한 설명이 나와있습니다. 또한 각각의 테스크들을 어떻게 사용하는지에대한 링크도 포함되어 있습니다.

##### clean

> 이 grunt 테스크는 sails 프로젝트에의 `.tmp/public/` 내용을 지우게 설정되어있습니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> `assest/js/`에 있는 커피스크립트 파일들을 자바스크립트로 컴파일하고, `.tmp/public/js/` 디렉토리로 옮겨놓습니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-coffee)

##### concat

> jacascript와 css파일들을 병합하고, 병합된 파일들을 `.tmp/public/concat/` 디렉토리에 저장합니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-concat)

##### copy

> **dev task config**
> sails asset폴더에서 커피스크립트와 less 파일들을 제외한 모든 디렉토리와 파일들을 `.tmp/public/` 디렉토리로 복사합니다.

> **build task config**
> .tmp/public 디렉토리에 있는 모든 디렉토리들과 파일들을 www 디렉토리로 복사합니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-copy)

##### cssmin

> css 파일들을 최소화 하고 `.tmp/public/min/` 디렉토리로 옮겨놓습니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-cssmin)

##### jst

> Precompiles Underscore templates to a `.jst` file. (i.e. it takes HTML template files and turns them into tiny javascript functions). This can speed up template rendering on the client, and reduce bandwidth usage.
> 언더스코어 템플릿들 `.jst`파일로 미리 컴파일 해놓습니다. (예. HTML 템플릿 파일들을 가지고 작은 자바스크립트 함수로 변환합니다.) 클라이언트에서 템플릿렌더링 속도를 향상시킬수 있고, 대역폭 사용을 줄여줄 수 있습니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-jst)

##### less

> LESS 파일들을 CSS로 컴파일합니다. `assets/styles/importer.less`만 컴파일 합니다. 이렇게 함으로써 순서를 조절 할 수 있습니다. 예를 들면, 다른 스타일 시트 전에 의존성들, 믹스인, 변수, 리셋등을 가져올 수 있습니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-less)

##### sails-linker

> 자동적으로 자바스크립트 파일을 위한 `<script>` 테그들을과 css파일들을 위한 `<link>` 테그들을 주입합니다. 또한 `<script>` 테그를 사용하여 자동적으로 미리 컴파일된 템플릿들을 포함한 출력 파일을 링크합니다. 이 테스크에대한 저 자세한 사항은 [여기](https://github.com/balderdashy/sails-generate-frontend/blob/master/docs/overview.md#a-litte-bit-more-about-sails-linking)에서 볼 수 있습니다. 그러나 반드시 기억해야할것은 스크립트와 스타일시트 주입은 *오직* 파일들이 `<!--SCRIPTS--><!--SCRIPTS END-->` 혹은 `<!--STYLES--><!--STYLES END-->` 테그를 포함했을때에만 이루어진다는 점입니다. 이것들은 sails 새 프로젝트 안의 기본 **views/layout.ejs**에도 포함되어 있습니다. 만약 프로젝트에서 이 링커를 사용하고 싶지 않다면, 이러한 테그들을 제거하시면 됩니다.

> [사용법](https://github.com/Zolmeister/grunt-sails-linker)

##### sync

> 디렉토리들을 동기화하는 grunt 테스크입니다. grunt-contrib-copy와 매우 유사하지만, 실제 변경사항이 존재하는 파일만 복사한다는 점이 다릅니다. 이것은 `assets/`폴더에서 `.tmp/public/` 폴더로 파일을 동기화하며, 기존에 있던 파일은 어떤 것이든지 덮어씌우게 됩니다.

> [사용법](https://github.com/tomusdrw/grunt-sync)

##### uglify

> 클라이언트쪽 자바스크립트 asset들을 최소화합니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-uglify)

##### watch

> 파일 패턴들이 추가되거나, 변경되거나 혹은 삭제되엇을때마다 미리 정의된 작업을 수행합니다. `assets/`안에 있는 파일들의 변화를 감지하면, 적합한 작업(less나 jst 컴파일과같은)을 재수행합니다. 이것은 Sails 서버의 재가동 없이 asset들이 변경사항이 있을때마다 반영하게 해줍니다.

> [사용법](https://github.com/gruntjs/grunt-contrib-watch)

<docmeta name="uniqueID" value="DefaultTasks764297">
<docmeta name="displayName" value="Default Tasks">


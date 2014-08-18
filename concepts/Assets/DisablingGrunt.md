# Grunt 비활성화

Sails에서 Grunt 통합을 비활성화 하기 위해서는, Gurntfile (혹은 [`tasks/`](/#/documentation/anatomy/myApp/tasks) 폴더)를 지우면 됩니다. 물론 Grunt 훅을 비활성화 할 수도 있습니다. `.sailsrc`파일의 hooks에서  `grunt`특성은 `false`로 변경하시면 됩니다.

```json
{
    "hooks": {
        "grunt": false
    }
}
```

### SASS, Angular, client-side Jade template, 기타 등등을 위해 커스터마이즈 할 수 있나요?

넵! `tasks/` 디렉토리 안에 관련 grunt 테스크를 치환하거나, 새로운 것을 추가하시면 됩니다. [SASS](https://github.com/sails101/using-sass)의 예입니다.

다른 목적을 위해 Grunt를 사용하길 원하지만, 기본 프론트 엔드 작업들을 원지 않는다면, 프로젝트의 assets 폴더를 지우고, `grunt/register/`와 `grunt/config/`폴더에서 프론트엔드에 맞춰진 테스크들을 제거 하면 됩니다. 또한 `sails new myCoolApi --no-frontend`로 실행하면, assets 폴더를 생략하고 프론트엔드에 맞는 grunt 테스크들 생략하게 됩니다. `sails-generate-frontend` 모듈을 다른 커뮤니티 생성기로 치환해도 되며 혹은  [create your own](https://github.com/balderdashy/sails-generate-generator)로 치환해도 됩니다. 이것은 `sails new`로 하여금 네이티브 iOS 앱, 안드로이드 앱, Cordova 앱, SteroidsJS 앱 등등을 위한 보일러플레이트를 만들게 합니다.


<docmeta name="uniqueID" value="DisablingGrunt970874">
<docmeta name="displayName" value="Disabling Grunt">


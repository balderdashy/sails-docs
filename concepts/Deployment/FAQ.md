# FAQ


##### 환경 변수를 사용해도 되나요?

환경 변수를 사용해서, Sails에서 `포트`와 `환경` 설정값을 설정 할수있다.
`NODE_ENV=production sails lift`
`PORT=443 sails lift`

##### Where do I put my production database credentials?  Other settings?
##### 제 데이터 베이스 자격증명은 어디에 두어야 할까요? 다른 셋팅은 없나요?

다른 배포 혹은 기계별 설정을 위해서, 즉 어떠한 종류의 자격증명을 위해, `config/local.js`파일을 사용 할 수 있다.

기본으로 `.gitignore`파일에 이 파일이 들어가있는데, 이렇게 함으로써 실수로 당신의 자격증명을 코드 저장소에 커밋하는것을 방지해준다.

**config/local.js**
```javascript
// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.
//
// For example, to use port 80 on the local machine, override the `port` config
module.exports = {
    port: 80,
    environment: 'production',
    adapters: {
        mysql: {
            user: 'root',
            password: '12345'
        }
    }
}
```

##### How do I get my Sails app on the server?
##### 어떻게 서버에서 Sails 어플리케이션을 찾을수 있죠?
이미 Node.js의 인스턴스가 돌아가고 있는지 살펴보자. 만약 ip주소를 가지고 있다면, ssh를 통해 접속해서 `sudo npm install -g forever`를 입력하여 Sails and forever를 설치하자.

그리고 서버의 새로운 폴더안에 `git clone`으로 프로젝트를 복사(혹은 git repo에 서버가 존재하지 않으면 `scp`하자 - Secure Copy) 한 이후, 그곳으로 이동하여 `forever start app.js`을 실행하자.


### 퍼포먼스 벤치마크

Sails의 퍼포먼스는 Node.js 스탠다드나 익스프레스 어플리케이션에 버금간다. 다른말로 말하면, 빠르다! 우리는 Sails와 Waterline을 최적화해왔다, 그러나 주로 우리의 관심사는, 이미 충분히 빠른것을 해치지 말자에 있다. 무엇보다도, @ry, @visionmedia, @isaacs, #v8, @joyent와 나머지 Node.js의 핵심 맴버들에 감사의 말을 전한다.

+ http://serdardogruyol.com/?p=111


<docmeta name="uniqueID" value="FAQ475097">
<docmeta name="displayName" value="FAQ">


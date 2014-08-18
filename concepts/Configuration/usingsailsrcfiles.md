# .sailsrc Files 사용하기


0.10 버전의 어플리케이션을 설정하는 다른 방법을 덧붙이면, `.sailsrc`파일안에 하나 혹은 그 이상의 어플리케이션 설정을 표시할 수 있다. (훌륭한 [`rc` module](https://github.com/dominictarr/rc)를 제공한 Dominic Tarr에게 감사의 말을 전한다.) `rc` 파일들은 커맨드라인과 모든 컴퓨터 위에서 실행되는 Sails 어플리케이션의 환경설정을 적용하는데 가장 유용하다.

Sails의 커맨드라인인터페이스 명령을 실행할때, 먼저 현재 디렉토리와 홈 폴더(예. `~/.sailsrc`)에서 `.sailsrc`파일(혹은 JSON이나 [.ini](http://en.wikipedia.org/wiki/INI_file) 포멧 파일)을 찾는다.(모든 새로 생성되는 Sails 어플리케이션은 보일러플레이트 `.sailsrc` 파일과 함께 생성된다.) 그리고 그것을 현재 존재하는 설정과 합치게 된다.

>실은, Sails는 `.sailsrc` 파일들을 몇몇의 다른 장소 (아래 [rc conventions](https://github.com/dominictarr/rc#standards)를 참조)에서 찾는다. `.sailsrc` 파일을  이들중 아무대나 위치시키면 된다. 가장 규약에 가깝게 전역 `.sailsrc` 파일을 두는 최적의 장소는 홈 디렉토리 일것이다. (예. `~/.sailsrc`)



<docmeta name="uniqueID" value="sailsrc374211">
<docmeta name="displayName" value="Using `.sailsrc` Files">


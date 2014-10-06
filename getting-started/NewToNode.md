# [Node.js](https://soundcloud.com/marak/marak-the-node-js-rap)가 처음 이시라구요?
괜찮습니다! 쉽게 안내 해드리겠습니다.


Per [nodejs.org](http://nodejs.org):
> "Node.js는 확장가능한 네트워크 어플리케이션을 빠르고 쉽게하기 위한 크롬의 자바스크립트 런타임으로 만들어진 플랫폼입니다. Node.js는 가볍고, 분산된 장비를 이용하여 데이터 집약적인 실시간 어플리케이션에 적합하게 만들어주는 event-driven, non-blocking I/O 모델을 사용합니다".

좀더 간단하게 말하면, Node.js는 프론트엔드와 백앤드단 모두 같은 언어를 사용하게 해주면서, http 서버를 빠르고 효과적으로 만들게 해줍니다.

## 무슨 운영체제가 필요한가요?

Node.js는 대부분의 주요 운영 체제에서 설치됩니다. MacOSX 및 많은 종류의 Linux, 그리고 Windows가 지원됩니다.

이제, 어떤 운영체제가 설치되어있는지 확인해보세요. 그리고 Node.js를 설치하기 위한 지침서를 따라가보세요.

나는 [Mac OSX](#/getStarted?q=--install-on-osx-)가 설치되어 있다.

나는 [Linux](#/getStarted?q=--install-on-linux-)가 설치되어 있다.

나는 [Windows](#/getStarted?q=--install-on-windows-)가 설치되어 있다.

<h2>
<a id="install-on-osx" name="/getStarted?q=--install-on-osx-" class="anchor" href="#/getStarted?q=--install-on-osx-"><span class="mini-icon mini-icon-link"></span></a>
맥에서 설치하기
</h2>

[package](http://nodejs.org/#download)를 이용할 경우:

_간단하게 [매킨토시 설치파일 다운로드](http://nodejs.org/#download)._

[homebrew](https://github.com/mxcl/homebrew)를 이용할 경우:

    brew install node

[macports](http://www.macports.org/)를 이용할 경우:

    port install nodejs  

<h2>
<a id="install-on-linux" name="/getStarted?q=--install-on-linux-" class="anchor" href="#/getStarted?--install-on-linux-"><span class="mini-icon mini-icon-link"></span></a>
리눅스에서 설치하기
</h2>

### 우분투, 민트

설치 예:

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

이것은 우분투에 현재 안정된 노드를 설치합니다. Quantal (12.10)사용자는 `add-apt-repository` 커멘드를 작동시키기 위해서 *software-properties-common* 패키지를 설치해야합니다. 패키지 설치법: `sudo apt-get install software-properties-common`

현재 Node.js v0.10.0 으로는, [Chris Lea](https://chrislea.com/2013/03/15/upgrading-from-node-js-0-8-x-to-0-10-0-from-my-ppa/)의 nodejs 패키지가 npm과 nodejs-dev를 둘다 포함하고 있습니다.

다른 노드 패키지(Amateur Packet Radio Node Program)와 이름이 겹칠 수도 있다. 이러한 충돌을 막기 위해서 nodejs 바이너리를 `node`에서 `nodejs`로 변경 되었습니다. `/usr/bin/node`를 `/usr/bin/nodejs`로 심볼릭링크를 하거나, Amateur Packet Radio Node Program를 제거해야 할것입니다..

### 페도라

[Node.js](https://apps.fedoraproject.org/packages/nodejs)와 [npm](https://apps.fedoraproject.org/packages/npm)은 페도라 18 이후 버전에서 사용 가능합니다. 좋아하는 그래피컬 패키지 메니저를 사용하거나 터미널을 이용해서 npm과 node를 설치합니다:

    sudo yum install npm

### RHEL/CentOS/Scientific 리눅스 6

Node.js와 npm는 [Fedora Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL) _testing_ repository에서 이용 할 수 있습니다. 만약 아직 준비되지 않았다면, 우선 [EPEL 활성화](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F)를 하고 node와 npm을 설치하기 위한 아래의 명령을 입력합니다.

    su -c 'yum --enablerepo=epel-testing install npm'

### Arch 리눅스
Node.js는 커뮤니티 저장소에서 이용 가능합니다.

    pacman -S nodejs

### 젠투
Node.js는 공식 젠투 portage tree에서 이용가능 합니다. 먼저 unmask를 해야합니다.

    # emerge -aqv --autounmask-write nodejs 
    # etc-update
    # emerge -aqv nodejs

### Debian, LMDE

*Debian sid (unstable)*에서, [Node.js는 공식 저장소에서 이용가능합니다.](http://packages.debian.org/search?searchon=names&keywords=nodejs).

*Debian Wheezy (stable)*에서, [Node.js는 wheezy-backports에서 이용 가능합니다.](http://packages.debian.org/wheezy-backports/nodejs). [backports](http://backports.debian.org/Instructions/)설치, 이것을 sources.list에 추가(`/etc/apt/sources.list`):

    deb http://YOURMIRROR.debian.org/debian wheezy-backports main
    
그리고 실행:

    apt-get update
    apt-get install nodejs

*Debian Squeeze (oldstable)*에서, 가장 확률높은것은 직접 컴파일 하는것 일 것입니다. (as `root`):

    apt-get install python g++ make
    mkdir ~/nodejs && cd $_
    wget -N http://nodejs.org/dist/node-latest.tar.gz
    tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
    ./configure
    make install

### openSUSE & SLE
[Node.js 안정 저장소 리스트](https://build.opensuse.org/package/show?package=nodejs&project=devel%3Alanguages%3Anodejs). openSUSE에서 node.js는 Factory repository를 통해 얻을 수 있습니다.

사용 가능한 RPM packages : openSUSE 11.4, 12.1, Factory and Tumbleweed; SLE 11 (with SP1 and SP2 variations).

openSUSE 12.1에서의 설치 예:

    sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_12.1/ NodeJSBuildService 
    sudo zypper in nodejs nodejs-devel

### FreeBSD and OpenBSD
Node.js는 ports system을 통해 설치 할 수 있습니다.

    /usr/ports/www/node

개발 버전 역시 ports를 통해 이용 가능합니다.

    cd /usr/ports/www/node-devel/ && make install clean

또는 FreeBSD의 packages를 통해서 가능합니다.

    pkg_add -r node-devel

<h2>
<a id="install-on-windows" name="/getStarted?q=--install-on-windows-" class="anchor" href="#/getStarted?q=--install-on-windows-"><span class="mini-icon mini-icon-link"></span></a>
윈도우에서 설치하기
</h2>

[a package](http://nodejs.org/download)를 사용할 경우:

_간단하게 [윈도우 설치 프로그램 다운로드](http://nodejs.org/download)._

[Node](http://chocolatey.org/packages/nodejs)를 설치하는데 [chocolatey](http://chocolatey.org)를 사용할 경우:  

    cinst nodejs  

또는 [full install with NPM](http://chocolatey.org/packages/nodejs.install)를 사용할 경우:  

    cinst nodejs.install


## Sails.js로 향하기
이제 Node.js가 시스템에 설치 되었습니다, 이제 Sails.js로 옮겨보세요.

계속 하기 위해서 [여기](https://github.com/balderdashy/sails-docs/blob/master/getting-started/getting-started.md)를 클릭해주세요.

## 더 많은 도움!
때때로 계획한 대로 되지 않을 수도 있다는것을 알고 있습니다. 만약에 설치하는데 여전히 어떠한 문제점이 발생한다면, 편하게 Node.js의 [IRC Channel](irc://irc.freenode.net/node.js) 혹은 우리 자체의[IRC Channel](irc://irc.freenode.net/sailsjs)을 방문해주세요. 


<docmeta name="uniqueID" value="NewToNode748472">
<docmeta name="displayName" value="New To Node">

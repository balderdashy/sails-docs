# [Node.js](https://soundcloud.com/marak/marak-the-node-js-rap)を使うのが初めてですか?
大丈夫です。我々がちゃんと説明します。


[nodejs.org](http://nodejs.org)に関して:
> "Node.jsはChromeのJavaScriptランタイムの上に構築された高速でスケーラブルなネットワークアプリケーションです。Node.jsはイベントドリブンでノンブロッキングI/Oモデルを採用しているので、とても軽量で効率的で、分散端末環境下でのデータインテンシブなリアルタイムのアプリケーションに最適です。"

もっと簡単に言うとNode.jsは簡単で効率的に動作するHTTPサーバーで、これによってフロントエンドとバックエンドを同じ言語で書くことが出来るのです。

## どんなOSを使わなければなりませんか?

Node.jsは多くのメジャーなOSにインストールすることが出来ます。MacOSXや多くのLinux、Windowsがサポートされています。  

それでは、どのOSを使っているかを確認して、書くOSに対する以下のNode.jsセットアップガイドに進んでください。:

[Mac OSX](#/getStarted?q=--install-on-osx-)を使っています。

[Linux](#/getStarted?q=--install-on-linux-)を使っています。

[Windows](#/getStarted?q=--install-on-windows-)を使っています。

<h2>
<a id="install-on-osx" name="/getStarted?q=--install-on-osx-" class="anchor" href="#/getStarted?q=--install-on-osx-"><span class="mini-icon mini-icon-link"></span></a>
OSXにインストールする
</h2>

[a package](http://nodejs.org/#download)を使う:

_単に[download Macintosh Installer](http://nodejs.org/#download)を使って_

[homebrew](https://github.com/mxcl/homebrew)を使って:

    brew install node

[macports](http://www.macports.org/)を使って:

    port install nodejs  

<h2>
<a id="install-on-linux" name="/getStarted?q=--install-on-linux-" class="anchor" href="#/getStarted?--install-on-linux-"><span class="mini-icon mini-icon-link"></span></a>
Linuxにインストールする
</h2>

### Ubuntu, Mint

インストール例:

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

現在StableのUbuntuでは以上のコマンドで現在のStableのNodeをインストールできます。Quantal (12.10) のユーザーは `add-apt-repository` コマンドを動作させるために*software-properties-common*パッケージをインストールする必要があるかもしれません。: `sudo apt-get install software-properties-common`

Node.js v0.10.0からは[Chris Lea](https://chrislea.com/2013/03/15/upgrading-from-node-js-0-8-x-to-0-10-0-from-my-ppa/)レポジトリのnodejsにはnpmとnodejs-devの両方が含まれるようになりました。

nodeパッケージに名前の競合があり (Amateur Packet Radio Node Program)、nodejsのバイナリは `node`から`nodejs`に改名されました。競合を防ぐためにはAmateur Packet Radio Node Programをアンインストールするか`/usr/bin/node`を`/usr/bin/nodejs` にシンボリックリンクをする必要があります。

### Fedora

Fedra18以降では[Node.js](https://apps.fedoraproject.org/packages/nodejs) and [npm](https://apps.fedoraproject.org/packages/npm)が利用可能です。お好きなGUIのパッケージマネージャーや以下のコマンドでnpmとnodeの両方をインストールしてください。:

    sudo yum install npm

### RHEL/CentOS/Scientific Linux 6

Node.jsとnpm[Fedora Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL) の_テスト_ レポジトリから利用可能です。もしも行っていない場合は最初に[EPELを有効化](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F)してから以下のコマンドを実行してnpmとnodeの両方をインストールしてください:

    su -c 'yum --enablerepo=epel-testing install npm'

### Arch Linux
Node.jsはコミュニティレポジトリで利用可能です。

    pacman -S nodejs

### Gentoo
Node.jsはオフィシャルのgentooパッケージツリーで利用可能です。以下の部分をコメント解除する必要があります。

    # emerge -aqv --autounmask-write nodejs
    # etc-update
    # emerge -aqv nodejs

### Debian, LMDE

*Debian sid (unstable)*では [Node.jsはオフィシャルレポジトリでサポートされています](http://packages.debian.org/search?searchon=names&keywords=nodejs).

*Debian Wheezy (stable)*では, [Node.jsはwheezy-backportsでサポートされています。](http://packages.debian.org/wheezy-backports/nodejs). [backports](http://backports.debian.org/Instructions/)をインストールするには、以下をsources.list (`/etc/apt/sources.list`)に追加してください。:

    deb http://YOURMIRROR.debian.org/debian wheezy-backports main
    
そして、以下を実行してください。:

    apt-get update
    apt-get install nodejs

*Debian Squeeze (oldstable)*では、(`root`で)nodeを自分でコンパイルするのがよいでしょう 。:

    apt-get install python g++ make
    mkdir ~/nodejs && cd $_
    wget -N http://nodejs.org/dist/node-latest.tar.gz
    tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
    ./configure
    make install

### openSUSE & SLE
[Node.js stable repos list](https://build.opensuse.org/package/show?package=nodejs&project=devel%3Alanguages%3Anodejs). 同様に、node.jsはopenSUSE:Factoryレポジトリでも利用可能です。

Available RPM packages for: openSUSE 11.4, 12.1, Factory and Tumbleweed; SLE 11 (with SP1 and SP2 variations).

openSUSE 12.1にインストールする方法の例:

    sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_12.1/ NodeJSBuildService 
    sudo zypper in nodejs nodejs-devel

### FreeBSDとOpenBSD
Node.jsはports systemを通じてインストール可能です。

    /usr/ports/www/node

開発版も同様にports systemを通じてインストール可能です。

    cd /usr/ports/www/node-devel/ && make install clean

あるいはFreeBSDのパッケージから 

    pkg_add -r node-devel

<h2>
<a id="install-on-windows" name="/getStarted?q=--install-on-windows-" class="anchor" href="#/getStarted?q=--install-on-windows-"><span class="mini-icon mini-icon-link"></span></a>
Windowsにインストールする
</h2>

[パッケージ](http://nodejs.org/#download)を使う:

単に[Windows Installerをダウンロード](http://nodejs.org/#download)._する

[chocolatey](http://chocolatey.org)を使って[Node](http://chocolatey.org/packages/nodejs)をインストールする:  

    cinst nodejs  

あるいは[NPMでフルインストールする](http://chocolatey.org/packages/nodejs.install):  

    cinst nodejs.install


## Sails.jsのインストールに進む
これであなたのシステムにNode.jsがインストールされました。

<<<<<<< HEAD
[ここ](https://github.com/balderdashy/sails-docs/blob/master/getting-started/getting-started.md)をクリックして進んでください。
=======
Click [here](https://github.com/balderdashy/sails-docs/blob/master/getting-started/getting-started.md) to continue.
>>>>>>> 0a69dcc7a2ad18a99e1d1ae0f37ac7ebe6a63677

## さらなる手助け
時々、物事は予定通りに進まないものです。もしそれでも問題があるときはNode.jsの[IRC Channel](irc://irc.freenode.net/node.js)や我々の[IRC Channel](irc://irc.freenode.net/sailsjs)を訪ねてください。


<docmeta name="uniqueID" value="NewToNode748472">
<docmeta name="displayName" value="New To Node">

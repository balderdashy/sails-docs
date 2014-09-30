# 第一次接觸 [Node.js](https://soundcloud.com/marak/marak-the-node-js-rap)？
沒關係！我們將指引你往正確的方向邁進。


依 [nodejs.org](http://nodejs.org) 表示：
> "Node.js 是一個建構於 Chrome 的 Javascript 執行期平台，可方便地建立快速、可擴充的網路應用程式。Node.js 採用事件導向、非阻塞 I/O 模型，使得它輕量、高效能，非常適合在分散式裝置上執行的資料密集即時應用程式。"

更簡單地說，Node.js 是個快速、有效率且允許你同時在前端及後端使用相同語言的 http 伺服器。

##我需要什麼作業系統？

Node.js 可安裝於大多數主流作業系統。MacOSX、許多類型的 Linux 及 Windows 皆有支援。

現在，讓我們來看看你有什麼作業系統。請從下列選擇有關設定 Node.js 的說明：

我有 [Mac OSX](#/getStarted?q=--install-on-osx-)

我有 [Linux](#/getStarted?q=--install-on-linux-)

我有 [Windows](#/getStarted?q=--install-on-windows-)

<h2>
<a id="install-on-osx" name="/getStarted?q=--install-on-osx-" class="anchor" href="#/getStarted?q=--install-on-osx-"><span class="mini-icon mini-icon-link"></span></a>
安裝在 OSX
</h2>

使用[軟體包](http://nodejs.org/download/)：

_只需[下載 Macintosh Installer](http://nodejs.org/download/)。_

使用 [homebrew](https://github.com/mxcl/homebrew)：

```
brew install node
```

使用 [macports](http://www.macports.org/)：

```
port install nodejs
```

<h2>
<a id="install-on-linux" name="/getStarted?q=--install-on-linux-" class="anchor" href="#/getStarted?--install-on-linux-"><span class="mini-icon mini-icon-link"></span></a>
安裝在 Linux
</h2>

### Ubuntu、Mint

安裝範例：

```
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

它安裝了目前在穩定版 Ubuntu 的穩定版 Node。Quantal（12.10）使用者可能需要安裝 *software-properties-common* 套件讓 `add-apt-repository` 指令可正常執行：`sudo apt-get install software-properties-common`

自 Node.js v0.10.0 起，從 [Chris Lea](https://chrislea.com/2013/03/15/upgrading-from-node-js-0-8-x-to-0-10-0-from-my-ppa/) 的儲存庫來的 nodejs 套件同時包含了 npm 和 nodejs-dev。

存在與 node 套件的命名衝突（Amateur Packet Radio Node Program），且 nodejs 二進位檔案已經由 `node` 重新命名為 `nodejs`。你需要建立軟連結 `/usr/bin/node` 到 `/usr/bin/nodejs`，或者可以移除 Amateur Packet Radio Node Program 以避免衝突。

### Fedora

Fedora 18 及更高版本提供 [Node.js](https://apps.fedoraproject.org/packages/nodejs) 和 [npm](https://apps.fedoraproject.org/packages/npm)。只需用你喜歡的圖形介面軟體包管理工具或在終端機執行以下指令來安裝 node 及 npm：

```
sudo yum install npm
```

### RHEL/CentOS/Scientific Linux 6

[Fedora Enterprise Linux 額外軟體包 (EPEL)](https://fedoraproject.org/wiki/EPEL) _測試_儲存庫提供 Node.js 和 npm。如果你還沒有這樣做，首先[啟用 EPEL](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F) 然後執行以下指令來安裝node 及 npm：

```
su -c 'yum --enablerepo=epel-testing install npm'
```

### Arch Linux
社群儲存庫提供 Node.js。

```
pacman -S nodejs
```

### Gentoo
官方 gentoo portage 樹提供 Node.js。你必須解除封鎖它。

```
# emerge -aqv --autounmask-write nodejs
# etc-update
# emerge -aqv nodejs
```

### Debian、LMDE

*Debian sid（不穩定版）*，[官方儲存庫提供 Node.js](http://packages.debian.org/search?searchon=names&keywords=nodejs)。

*Debian Wheezy（穩定版）*，[wheezy-backports 提供 Node.js](http://packages.debian.org/wheezy-backports/nodejs)。要安裝 [backports](http://backports.debian.org/Instructions/)，將此來源加入你的來源清單（`/etc/apt/sources.list`）：

```
deb http://YOURMIRROR.debian.org/debian wheezy-backports main
```

然後執行：

```
apt-get update
apt-get install nodejs
```

*Debian Squeeze（舊穩定版）*，最好的辦法是自己編譯 node（使用 `root`）：

```
apt-get install python g++ make
mkdir ~/nodejs && cd $_
wget -N http://nodejs.org/dist/node-latest.tar.gz
tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
./configure
make install
```

### openSUSE & SLE
[Node.js 穩定儲存庫清單](https://build.opensuse.org/package/show?package=nodejs&project=devel%3Alanguages%3Anodejs)。另外 openSUSE:Factory 儲存庫也提供 Node.js。

openSUSE 11.4、12.1、Factory 及 Tumbleweed；SLE 11 (with SP1 and SP2 variations) 提供 RPM 套件。

安裝於 openSUSE 12.1 範例：

```
sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_12.1/ NodeJSBuildService
sudo zypper in nodejs nodejs-devel
```

### FreeBSD and OpenBSD
透過 ports 系統提供 Node.js。

```
/usr/ports/www/node
```

ports 也提供開發版本。

```
cd /usr/ports/www/node-devel/ && make install clean
```

或在 FreeBSD 上的套件

```
pkg_add -r node-devel
```

<h2>
<a id="install-on-windows" name="/getStarted?q=--install-on-windows-" class="anchor" href="#/getStarted?q=--install-on-windows-"><span class="mini-icon mini-icon-link"></span></a>
安裝在 Windows
</h2>

使用[軟體包](http://nodejs.org/download/)：

_只需[下載 Windows Installer](http://nodejs.org/download/)。_

使用 [chocolatey](http://chocolatey.org) 安裝 [Node](http://chocolatey.org/packages/nodejs)：

```
cinst nodejs
```

或[完整安裝](http://chocolatey.org/packages/nodejs.install)：

```
cinst nodejs.install
```


## 前往 Sails.js
現在 Node.js 已安裝到你的系統，我們可以進入 Sails.js。

點擊[此處](https://github.com/balderdashy/sails-docs/blob/master/getting-started/getting-started.md)繼續。

## 更多幫助！
我們知道，有時候事情不按計劃進行。如果你還有這方面的問題，請隨時訪問 Node.js 的 [IRC 頻道](irc://irc.freenode.net/node.js)或我們自己的 [IRC 頻道](irc://irc.freenode.net/sailsjs)。


<docmeta name="uniqueID" value="NewToNode748472">
<docmeta name="displayName" value="New To Node">



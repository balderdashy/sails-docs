# New to [Node.js](https://soundcloud.com/marak/marak-the-node-js-rap)?
Thats okay!  We'll get you pointed in the right direction.


Per [nodejs.org](http://nodejs.org):
> "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."

More simply put, Node.js is an http server built to run quickly and efficiently while allowing you to use the same language on both the frontend and the backend.

## What OS do I need?

Node.js will install on most major Operating systems.  MacOSX, many flavors of Linux, and Windows are supported.  

Now, lets take a look at what OS you have.  Please choose from the following for instructions on setting up Node.js:

I have [Mac OSX](#/getStarted?q=--install-on-osx-)

I have [Linux](#/getStarted?q=--install-on-linux-)

I have [Windows](#/getStarted?q=--install-on-windows-)

<h2>
<a id="install-on-osx" name="/getStarted?q=--install-on-osx-" class="anchor" href="#/getStarted?q=--install-on-osx-"><span class="mini-icon mini-icon-link"></span></a>
Install on OSX
</h2>

Using [a package](http://nodejs.org/#download):

_Simply [download Macintosh Installer](http://nodejs.org/#download)._

Using [homebrew](https://github.com/mxcl/homebrew):

    brew install node

Using [macports](http://www.macports.org/):

    port install nodejs  

<h2>
<a id="install-on-linux" name="/getStarted?q=--install-on-linux-" class="anchor" href="#/getStarted?--install-on-linux-"><span class="mini-icon mini-icon-link"></span></a>
Install on Linux
</h2>

### Ubuntu, Mint

Example install:

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

It installs current stable Node on the current stable Ubuntu. Quantal (12.10) users may need to install the *software-properties-common* package for the `add-apt-repository` command to work: `sudo apt-get install software-properties-common`

As of Node.js v0.10.0, the nodejs package from [Chris Lea](https://chrislea.com/2013/03/15/upgrading-from-node-js-0-8-x-to-0-10-0-from-my-ppa/)'s repo includes both npm and nodejs-dev.

There is a naming conflict with the node package (Amateur Packet Radio Node Program), and the nodejs binary has been renamed from `node` to `nodejs`. You'll need to symlink `/usr/bin/node` to `/usr/bin/nodejs` or you could uninstall the Amateur Packet Radio Node Program to avoid that conflict.

### Fedora

[Node.js](https://apps.fedoraproject.org/packages/nodejs) and [npm](https://apps.fedoraproject.org/packages/npm) are available in Fedora 18 and later.  Just use your favorite graphical package manager or run this on a terminal to install both npm and node:

    sudo yum install npm

### RHEL/CentOS/Scientific Linux 6

Node.js and npm are available from the [Fedora Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL) _testing_ repository.  If you haven't already done so, first [enable EPEL](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F) and then run the following command to install node and npm:

    su -c 'yum --enablerepo=epel-testing install npm'

### Arch Linux
Node.js is available in the Community Repository.

    pacman -S nodejs

### Gentoo
Node.js is available in official gentoo portage tree. You have to unmask it.

    # emerge -aqv --autounmask-write nodejs
    # etc-update
    # emerge -aqv nodejs

### Debian, LMDE

For *Debian sid (unstable)*, [Node.js is available in the official repo](http://packages.debian.org/search?searchon=names&keywords=nodejs).

For *Debian Wheezy (stable)*, [Node.js is available in wheezy-backports](http://packages.debian.org/wheezy-backports/nodejs). To install [backports](http://backports.debian.org/Instructions/), add this to your sources.list (`/etc/apt/sources.list`):

    deb http://YOURMIRROR.debian.org/debian wheezy-backports main
    
Then run:

    apt-get update
    apt-get install nodejs

For *Debian Squeeze (oldstable)*, your best bet is to compile node by yourself (as `root`):

    apt-get install python g++ make
    mkdir ~/nodejs && cd $_
    wget -N http://nodejs.org/dist/node-latest.tar.gz
    tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
    ./configure
    make install

### openSUSE & SLE
[Node.js stable repos list](https://build.opensuse.org/package/show?package=nodejs&project=devel%3Alanguages%3Anodejs). Also node.js is available in openSUSE:Factory repository.

Available RPM packages for: openSUSE 11.4, 12.1, Factory and Tumbleweed; SLE 11 (with SP1 and SP2 variations).

Example install on openSUSE 12.1:

    sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_12.1/ NodeJSBuildService 
    sudo zypper in nodejs nodejs-devel

### FreeBSD and OpenBSD
Node.js is available through the ports system.

    /usr/ports/www/node

Development versions are also available using ports 

    cd /usr/ports/www/node-devel/ && make install clean

or packages on FreeBSD

    pkg_add -r node-devel

<h2>
<a id="install-on-windows" name="/getStarted?q=--install-on-windows-" class="anchor" href="#/getStarted?q=--install-on-windows-"><span class="mini-icon mini-icon-link"></span></a>
Install on Windows
</h2>

Using [a package](http://nodejs.org/#download):

_Simply [download Windows Installer](http://nodejs.org/#download)._

Using [chocolatey](http://chocolatey.org) to install [Node](http://chocolatey.org/packages/nodejs):  

    cinst nodejs  

or for [full install with NPM](http://chocolatey.org/packages/nodejs.install):  

    cinst nodejs.install


## On to Sails.js
Now that Node.js is installed on your system, we can move on to Sails.js.

Click [here](https://github.com/balderdashy/sails-wiki/blob/0.9/getting-started.md) to continue.

## Further help!
We know that sometimes things don't go as planned. If you still have any issue with this, please feel free to visit Node.js's [IRC Channel](irc://irc.freenode.net/node.js) or our own [IRC Channel](irc://irc.freenode.net/sailsjs).


<docmeta name="uniqueID" value="NewToNode748472">
<docmeta name="displayName" value="New To Node">

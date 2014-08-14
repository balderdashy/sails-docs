# Começando com [Node.js](https://soundcloud.com/marak/marak-the-node-js-rap)?
Sem problemas! Nós vamos te mostrar o caminho.


Per [nodejs.org](http://nodejs.org):


> "Node.js é uma plataforma construida baseada no JavaScript do Chrome para facilmente construir aplicações rápidas e escaláveis. Node.js usa um modelo guiado a eventos, sem bloqueio de I/O  que o torna leve e eficiente, ideal para aplicações em tempo real com intenso fluxo de dados que são executados em dispositivos distribuídos."

Simplificando, Node.js é um servidor http construido para rodar com velocidade e eficiência, permitindo você usar a mesma linguagem para frontend e backend.

## Que Sistema Operacional eu preciso?

Node.js funciona na maioria dos sistemas operacionais.  MacOXS, várias distruibuições de Linux e Windows são compatíveis.

Agora, vamos ver qual sistema você tem. Por favor, escolha uma das seguintes opções para obter instruções sobre como configurar o Node.js:

Eu tenho [Mac OSX](#/getStarted?q=--install-on-osx-)

Eu tenho [Linux](#/getStarted?q=--install-on-linux-)

Eu tenho [Windows](#/getStarted?q=--install-on-windows-)

<h2>
<a id="install-on-osx" name="/getStarted?q=--install-on-osx-" class="anchor" href="#/getStarted?q=--install-on-osx-"><span class="mini-icon mini-icon-link"></span></a>
Instalando no OSX
</h2>

Usando [um pacote](http://nodejs.org/#download):

_Simplesmente baixe o [instalador para Macintosh](http://nodejs.org/#download)._

Usando [homebrew](https://github.com/mxcl/homebrew):

    brew install node

Usando [macports](http://www.macports.org/):

    port install nodejs  

<h2>
<a id="install-on-linux" name="/getStarted?q=--install-on-linux-" class="anchor" href="#/getStarted?--install-on-linux-"><span class="mini-icon mini-icon-link"></span></a>
Instalando no Linux
</h2>

### Ubuntu, Mint

Exemplo:

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

Isso instala a versão estável atual do Node no Ubuntu mais recente. Usuários do Quantal (12.10) talvez precisem instalar o pacote *software-properties-common* para o comando `add-apt-repository` funcionar: `sudo apt-get install software-properties-common`

Assim como Node.js v0.10.0, o pacode do repositório do [Chris Lea](https://chrislea.com/2013/03/15/upgrading-from-node-js-0-8-x-to-0-10-0-from-my-ppa/) incluí tanto npm como nodejs-dev.

Existe um conflito com nome do pacote node (Amateur Packet Radio Node Program), e o binário do nodejs foi renomeado de `node` para `nodejs`. Você precisará de um link simbólico de `/usr/bin/node` para `/usr/bin/nodejs` ou você pode desinstalar o pacote Amateur Packet Radio Node Program para evitar o conflito.

### Fedora

[Node.js](https://apps.fedoraproject.org/packages/nodejs) e [npm](https://apps.fedoraproject.org/packages/npm) estão disponíveis desde o Fedora 18.  Use seu gerenciador de pacotes gráfico favorito ou rode estes comandos no terminal para instalar npm e node:

    sudo yum install npm

### RHEL/CentOS/Scientific Linux 6

Node.js e npm estão disponíveis no repositorio de _teste_ [Fedora Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL). Se você ainda não o fez, primeiro [habilite EPEL](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F) e então rode o seguinte comando para instalar npm e node.

    su -c 'yum --enablerepo=epel-testing install npm'

### Arch Linux
Node.js esta disponível no Repositório da Comunidade.

    pacman -S nodejs

### Gentoo
Node.js esta disponível no official gentoo portage tree. 

    # emerge -aqv --autounmask-write nodejs
    # etc-update
    # emerge -aqv nodejs

### Debian, LMDE

Para *Debian sid (unstable)*,[Node.js esta disponível no repositório oficial](http://packages.debian.org/search?searchon=names&keywords=nodejs).

Para *Debian Wheezy (stable)*, [Node.js esta disponível no wheezy-backports](http://packages.debian.org/wheezy-backports/nodejs). To install [backports](http://backports.debian.org/Instructions/), adicione-o na sua lista sources.list (`/etc/apt/sources.list`):

    deb http://YOURMIRROR.debian.org/debian wheezy-backports main
    
Depois rode:

    apt-get update
    apt-get install nodejs

Para *Debian Squeeze (oldstable)*, o melhor geito é compilar o node você mesmo (como 'root'):

    apt-get install python g++ make
    mkdir ~/nodejs && cd $_
    wget -N http://nodejs.org/dist/node-latest.tar.gz
    tar xzvf node-latest.tar.gz && cd `ls -rd node-v*`
    ./configure
    make install

### openSUSE & SLE
[Node.js lista de repositórios estáveis](https://build.opensuse.org/package/show?package=nodejs&project=devel%3Alanguages%3Anodejs). Node.js também esta disponível no repositório openSUSE:Factory.

Pacotes RPM disponíveis para: openSUSE 11.4, 12.1, Factory e Tumbleweed; SLE 11 (com SP1 e SP2).

Exemplo de instalação no openSUSE 12.1:

    sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_12.1/ NodeJSBuildService 
    sudo zypper in nodejs nodejs-devel

### FreeBSD and OpenBSD
Node.js esta disponível através do sistema de portas.

    /usr/ports/www/node

Versões de desenvolvimento também estão disponiveis através do sistema de portas.

    cd /usr/ports/www/node-devel/ && make install clean

ou pacotes no FreeBSD

    pkg_add -r node-devel

<h2>
<a id="install-on-windows" name="/getStarted?q=--install-on-windows-" class="anchor" href="#/getStarted?q=--install-on-windows-"><span class="mini-icon mini-icon-link"></span></a>
Instalando no Windows
</h2>

Usando [um pacote](http://nodejs.org/#download):

_Simplesmente [baixe instalador para Windows](http://nodejs.org/#download)._

Usando [chocolatey](http://chocolatey.org) para instalar [Node](http://chocolatey.org/packages/nodejs):  

    cinst nodejs  

ou para instalar [NPM](http://chocolatey.org/packages/nodejs.install):  

    cinst nodejs.install


## Sails.js
Agora que Node.js esta instalado, podemos continuar com Sails.js.

Clique [aqui](https://github.com/balderdashy/sails-wiki/blob/0.9/getting-started.md) para continuar.

## Mais ajuda!
Nós sabemos que as vezes as coisas não saem como planejado. Se você ainda tem algum problema, sinta se livre para visitar o [IRC](irc://irc.freenode.net/node.js) do node.js, ou nosso próprio [IRC](irc://irc.freenode.net/sailsjs).

<docmeta name="uniqueID" value="NewToNode748472">
<docmeta name="displayName" value="New To Node">

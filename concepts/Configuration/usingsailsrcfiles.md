# Using .sailsrc Files


In addition to the other methods of configuring your app, as of version 0.10, you can now specify configuration for one or more apps in `.sailsrc` file(s) (thanks to Dominic Tarr's excellent [`rc` module](https://github.com/dominictarr/rc)).  `rc` files are most useful for configuring the command-line and/or applying configuration settings to ALL of the Sails apps you run on your computer.

When the Sails CLI runs a command, it first looks for  `.sailsrc` files (in either JSON or [.ini](http://en.wikipedia.org/wiki/INI_file) format) in the current directory and in your home folder (i.e. `~/.sailsrc`) (every newly generated Sails app comes with a boilerplate `.sailsrc` file).  Then it merges them in to its existing configuration.

> Actually, Sails looks for `.sailsrc` files in a few other places (following [rc conventions](https://github.com/dominictarr/rc#standards)).  You can put a `.sailsrc` file at any of those paths.  That said, stick to convention when you can- the best place to put a global `.sailsrc` file is in your home directory (i.e. `~/.sailsrc`).




<docmeta name="uniqueID" value="sailsrc374211">
<docmeta name="displayName" value="Using `.sailsrc` Files">


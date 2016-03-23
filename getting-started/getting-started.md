# Getting Started

## Installation
To install the latest stable release with the command-line tool:

	sudo npm -g install sails

On Windows (or Mac OS with Homebrew), you don't need sudo:

	npm -g install sails

> You may see some `npm WARN deprecated` messages when installing Sails.  These can be safely ignored.  They don&rsquo;t come from Sails itself, but rather from some packages that Sails relies on--packages which themselves rely on some older modules.  The Sails team is committed to keeping the framework secure and stable, and sometimes that (counter-intuitively) requires using some older versions of packages.  See [this thread](https://github.com/balderdashy/sails/issues/3582#issuecomment-185297653) for more info about the warnings, and [this one](https://github.com/balderdashy/sails/pull/3180) for a discussion about updating dependencies in general.

## Creating a New Sails Project
Create a new app:

	sails new testProject

Now lift the server:

	cd testProject
	sails lift

At this point, if you visit (http://localhost:1337/) you will see the default home page.

Now, let's get Sails to do cool stuff.

<docmeta name="displayName" value="Installation">

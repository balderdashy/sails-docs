# Contributing to this project

Thank you for your interest in supporting Sails!  It makes us feel warm and fuzzy inside.  For real.


<!--

---------------------------------------------------------------
###### `<DRAFT>`


## Getting Started
Whether you're an advanced user or a Sails n00b, there are many different ways to contribute to the Sails ecosystem.

1) Build an adapter.

2) Submit a pull request to an adapter (e.g. add streaming support to `sails-yelp`)

3) Submit a pull request to a generator (e.g. CoffeeScript support for `sails-generate-controller`, or better syncing in the Gruntfile in `sails-generate-gruntfile`)

4) Build a hook (e.g. custom migration support in Waterline)

5) Write unit tests for the build-in sails hooks.

6) Finally, bug fixes + patches for the Sails core are also greatly appreciated, please just read the style guide below first!




###### `</DRAFT>`
---------------------------------------------------------------

-->

## Guidelines
Like any OSS project, we must have guidelines for contributions.  It helps protect the quality of the code, and gives all of us confidence that our framework will be robust and dependable.
Whether it's a bug fix, or a huge new feature set, it's important that we consistently apply these checks and balances for *all* contributions to Sails.

Please check over the following requirements before submitting a pull request:
 - Pull requests should be submitted to the `v0.10` branch.
 - Bug fixes should have accompanying tests where possible.
 - Should follow Sails.js JShint Guidelines (See .jshint file in repo)

Any pull request to `master` (our production branch) will be closed, with an invitation to resubmit to `v0.10`.  
I know this stuff sounds kind of brutal, but we want to keep `master`'s tests passing at all times, since it reflects what is in `npm`.
If you have a high priority hot-fix for the currently deployed version, please let us know with an issue, and mention @mikermcneil.  Also, for emergencies, please feel free to tweet @sailsjs.  That'll text me (Mike).  Sounds a little insane probably, but if there's a big problem, I want to know about it!


Now that we are all on the same page, lets get to coding some awesomeness of our own :D

## Fork
Start by forking [this repository](https://github.com/balderdashy/sails/tree/development):

![Screen Shot 2013-02-12 at 2.37.04 PM.png](http://i.imgur.com/h0CCcAu.png)

## Clone
Then clone your fork into your local filesystem:
git clone `git@github.com:YOUR_USER_NAME/sails.git`

## Update
To merge recent changes into your fork, inside your project dir:
```
git remote add core https://github.com/balderdashy/sails.git
git fetch core
git merge core/master
```
additional details, see [github](https://help.github.com/articles/fork-a-repo)

## Code
Make your enhancements, fix bugs, do your `thang`.


## Test
Please write a test for your addition/fix.  I know it kind of sucks if you're not used to it, but it's how we maintain great code. 
For our test suite, we use [mocha](http://visionmedia.github.com/mocha/).  You can run the tests with `npm test`.  If run into trouble with this part, please reach out to the [Google Group!](https://groups.google.com/forum/#!forum/sailsjs)

![Screen Shot 2013-02-12 at 2.56.59 PM.png](http://i.imgur.com/dalbOdZ.png) 

## Pull Request
When you're done, you can commit your fix, push up your code, and then go into github and submit a pull request.  We'll look it over and get back to you ASAP.

![Screen Shot 2013-02-12 at 2.55.40 PM.png](http://i.imgur.com/GBg0AOi.png) 


## Trying out your fork with your application
If you have a project using Sails, and you want to test your new version, please do the following:

In your Sails repo:
sudo npm link

In your project repo:
npm link sails

Tada!  Your project will now be using your forked version.  If you're not sure it worked, put some crazy `console.log()` in the core to make sure.  Again, if you've got any issues, hit us up ([@sailsjs](https://twitter.com/sailsjs)). 



[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/contributing)

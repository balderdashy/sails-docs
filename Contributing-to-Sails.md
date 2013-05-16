# Contributing to this project

Thank you for your interest in supporting Sails!  It makes us feel warm and fuzzy inside.  For real.

## Guidelines
Like any awesome project, we must have guidelines.  These guidelines are here to help keep the framewrok working in a flawless way for your use.  These guidelines should be followed for all contributions to the Sails.JS framework.

The following guidelines are required to be followed for code submissions to be considered.
 - Must be presented in the form of a Pull Request to Development Branch.
 - Must have accompaning tests.
 - Must follow Sails.JS JShint Guidelines (See .jshint file in repo)

Any pull request that is done to the Master branch will immediately be closed and asked to resubmit to development branch.  We apologize for this, however we want to keep master at a build state of passing at all times.  Just in case someone wants to use the most up-to-date awesomeness that isn't available in the npm package.

Now that we are all on the same page, lets get to coding some awesomeness of our own :D

## Fork
Start by forking this repository:

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

<!--
## Test
Please write a test for your addition/fix.  I know it kind of sucks, but it's how we maintain great code quality.  For our test suite, I'm using [mocha](http://visionmedia.github.com/mocha/).  You can run the tests with `npm test`.  If run into trouble with this part, please create an issue or drop me a line on Twitter ([@mikermcneil](twitter.com/mikermcneil))

![Screen Shot 2013-02-12 at 2.56.59 PM.png](http://i.imgur.com/dalbOdZ.png) 
-->

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
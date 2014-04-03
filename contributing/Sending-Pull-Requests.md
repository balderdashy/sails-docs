# Sending Pull Requests

> **NOTE**
> This is really just a support document for the official contribution guide [here](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md) and is mainly focused on helping guide you through the mechanics of submiting a pull request.  If this document contradicts the official contribution guide in any way, particularly re: rules/guidelines, or if you're otherwise in doubt, go w/ the offical guide :)
>
> Thanks!
> ~mm

This guide is designed to get you started contributing to the Sails framework.  It assumes you know how to use Github, but should be applicable for contributors of all levels.


## Contribution Guidelines
Like any open-source project, we must have guidelines for contributions.  It helps protect the quality of the code, and gives all of us confidence that our framework will stay robust and dependable.
Whether it's a bug fix or a huge new feature set, it's important that we consistently apply these checks and balances for *all* contributions to Sails.

Please check over the following requirements before submitting a pull request:
 - Bug fixes should have accompanying tests where possible.  We use [Mocha](http://visionmedia.github.io/mocha/) for testing.
 - Code should follow our style guide to maintain consistency (see `.jshint` file in repo)

If you have a high priority hot-fix for the currently deployed version, please [post an issue on Github](https://github.com/balderdashy/sails/issues?milestone=none&state=open), and mention @mikermcneil.  Also, for emergencies, please feel free to tweet @sailsjs.

Now that we are all on the same page, lets get to coding some awesomeness of our own :D

## Fork
Start by forking the repository:

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


## Running your fork with your application
If you forked Sails, and you want to test your Sails app against your fork, here's how you do it:

In your local copy of your fork of Sails:
`sudo npm link`

In your Sails app's repo:
`npm link sails`

This creates a symbolic link as a local dependency (in your app's `node_modules` folder).  This has the effect of letting you run your app with the version Sails you `linked`.
```bash
$ sails lift
```

### *Thanks for your contributions!*


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/contributing)

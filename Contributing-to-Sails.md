![seagull.jpg](http://i.imgur.com/npASTyA.jpg) 

# Contributing to this project

Thank you for your interest in supporting this project!  It makes me warm and fuzzy inside.  Really though.

## Fork
Start by forking this repository:

![Screen Shot 2013-02-12 at 2.37.04 PM.png](http://i.imgur.com/h0CCcAu.png) 

## Clone
Then clone your fork into your local filesystem:
git clone `git@github.com:YOUR_USER_NAME/sails.git`

## Code
Make your enhancements, fix bugs, do your `thang`.

<!--
## Test
Please write a test for your addition/fix.  I know it kind of sucks, but it's how we maintain great code quality.  For our test suite, I'm using [mocha](http://visionmedia.github.com/mocha/).  You can run the tests with `npm test`.  If run into trouble with this part, please create an issue or drop me a line on Twitter ([@mikermcneil](twitter.com/mikermcneil))

![Screen Shot 2013-02-12 at 2.56.59 PM.png](http://i.imgur.com/dalbOdZ.png) 
-->

## Pull Request
When you're done, you can commit your fix, push up your code, and then go into github and submit a pull request.  I'll look it over and get back to you ASAP.

![Screen Shot 2013-02-12 at 2.55.40 PM.png](http://i.imgur.com/GBg0AOi.png) 


## Trying out your fork with your application
If you have a project using Sails, and you want to test your new version, please do the following:

In your Sails repo:
sudo npm link

In your project repo:
sudo npm link sails

Tada!  Your project will now be using your forked version.  If you're not sure it worked, put some crazy `console.log()` in the core to make sure.  Again, if you've got any issues, hit me up ([@mikermcneil](twitter.com/mikermcneil)). 

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails)
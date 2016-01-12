# FAQ

### Where is the documentation?
+ [Docs for the latest stable npm release of Sails are on the website](http://sailsjs.org/documentation)
+ This is mirrored by the [master branch of the `sails-docs` repo on github](https://github.com/balderdashy/sails-docs)
  + The content in the Github repo is eventually pushed to the website.
  + It is usually a several commits ahead, and is the go-to place for the most up-to-date information.
  + This will become more automated as we're able to get more time to automate our tools (will open-source these asap post v0.10 release)

### How do I get involved?
+ [Help us improve the documentation](https://github.com/balderdashy/sails-docs)
+ [Contribute to the Sails core](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md#contributing-to-core)
+ [Create/contribute to a plugin](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md#writing-code)
+ [Contribute to the sailsjs.org website](https://github.com/balderdashy/www.sailsjs.org)

### Where do I submit ideas?  Report issues?
+ [Report suspected bug](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md#opening-issues) with the Sails core itself
+ [Got a feature request or idea?](https://trello.com/b/cGzNVE0b/sails-js-feature-requests)



### What version of Sails should I use?

[![NPM version](https://badge.fury.io/js/sails.png)](http://badge.fury.io/js/sails)

The latest stable version in npm is always a safe bet (see the badge above.).  The latest stable npm release corresponds with the `stable` branch in the Sails repo.  Installing is easy- just follow the instructions in the README or on the Sails website (e.g. `npm install sails`.)

To install the beta/ pre-release version of Sails, install from the `beta` tag on npm (e.g. `npm install sails@beta`).  This is a great way to try out a coming release ahead of time and start upgrading before the release becomes official.  Except for extreme situations, the API in the release candidate should be consistent with the upcoming stable release it corresponds with.  The beta npm release candidate corresponds with the `beta` branch in the Sails repo.

Finally, if you like living on the edge, or you're working on adding a feature or fixing a bug in Sails, install the edge version from the `master` branch on github.  The edge version is not published on the registry since it's constantly under development, but you can _still use npm to install it_ (e.g. `npm install sails@git://github.com/balderdashy/sails.git`)

For more instructions on installing the stable, beta, and edge versions of Sails, check out the [contribution guide](https://github.com/balderdashy/sails/blob/master/CONTRIBUTING.md).


### What are the dependencies of Sails?

[![Dependency Status](https://david-dm.org/balderdashy/sails.png)](https://david-dm.org/balderdashy/sails)

We have learned again and again over the years to take versioning of dependencies very seriously.  We lock Sails' dependency versions and only bump those versions if the associated updates fix a security issue or present other substantive advantages to Sails users (improved compatibility, performance, etc.)  In addition, the core maintainers of Sails are committed fixing any major security, performance, or stability bugs that arise in any of our core dependencies-- regardless of whether those modules are [officially maintained by another entity or not](https://github.com/balderdashy/sails/pull/3235#issuecomment-170417122).

Sails is tested with [node](http://nodejs.org/) versions 0.10.x and up, and built on the rock-solid foundations of [Express](https://github.com/expressjs/) and [Socket.io](http://socket.io/).  Out of the box, it also depends on other great modules, like `grunt`, `waterline`, and `fs-extra`.  Click the badge above for the full list of dependencies.


### Where do I get help?

Aside from the [official documentation](http://sailsjs.org/documentation), be sure and check out the [Support page on the Sails website](http://sailsjs.org/support), and pop in to our [Gitter chat room](https://gitter.im/balderdashy/sails).  If you're stumped, make sure and [ask a question on StackOverflow](http://stackoverflow.com/questions/ask), where there's an [active Sails community](http://stackoverflow.com/questions/tagged/sailsjs?sort=newest&days=30).  Members of our core team recently taught a [free video course](https://courses.platzi.com/courses/develop-apps-sails-js/) on [Platzi](http://platzi.com) and wrote [a book](https://www.manning.com/books/sails-js-in-action).


### Who else is using Sails.js?

> Sails is used in production by individuals and companies, non-profits, and government entities all over the world, for all sorts of projects (greenfield and mature). This small list is definitely not authoritative, so if you're using Sails in your app/product/service, we'd love to hear about it!  Click the `edit` button in GitHub's UI to submit a pull request updating this list.

+ [The City of Paris](http://paris.fr)
+ [18F (United States)](https://18f.gsa.gov/)
+ [Postman](https://www.getpostman.com/)
+ [BeyondSoft](https://beyondsoft.com/)
+ [The Broad Institute / Human Genome Project](https://www.broadinstitute.org/)
+ [Cuckoo Quack](http://www.cyber-duck.co.uk/blog/the-cuckoo-quack) - An antique clock turned into a notification system
+ [Portfolio Page](http://isaac.levid.com/) - By Isaac T. Wooten
+ [Insight Replay](http://insightreplay.com) - Instant replay for [athletes](http://insightreplay.com/insight-replay-at-sochi-winter-olympics/) and coaches
+ [Taskboard](http://tarlepp.github.io/Taskboard/) - a Sails application to mimic "scrum-ban" taskboard



### Are there professional support options?

The companies below provide custom development, services, training, and/or support for teams building applications on  Sails.  These groups also happen to be some of our greatest allies, and have made significant contributions to the development and stability of the framework.

================================================================================

###### <img height="30" src="http://balderdash.co/images/logo.jpg" title="Balderdash" alt="Logo of Balderash, the development shop in Austin that created Sails" />

<!-- Social media links -->
<a target="_blank" href="https://www.facebook.com/balderdashy">
  <img height="15" alt="Facebook icon" class="facebook" src="http://balderdash.co/images/icon_facebook@2x.png">
</a>
<a target="_blank" href="https://twitter.com/balderdashy">
  <img height="15" alt="Twitter icon" src="http://balderdash.co/images/icon_twitter@2x.png">
</a>
<a target="_blank" href="http://dribbble.com/Balderdash">
  <img height="15" alt="Dribbble icon" src="http://balderdash.co/images/icon_dribbble@2x.png">
</a>
<a target="_blank" href="http://www.linkedin.com/company/balderdash">
  <img height="15" alt="Linkedin icon" class="linkedin" src="http://balderdash.co/images/icon_linkedIn@2x.png">
</a>

Sails was built by the team behind [Balderdash](http://balderdash.co/), an interactive development studio in Austin, TX.  [Heather](http://www.sealab.io/) and [I](http://twitter.com/mikermcneil) started the company in 2012, on the promise that Node.js could be used to build production back-end applications from start to finish.  We created Sails to support that mission, and years later, the experiment has been a resounding success.  As you might expect, we've done a lot of custom Sails+Node.js development, but our team has experience across the full stack, including: advanced interaction design, practical/scalable development of huge HTML 5 applications,  and building rich user experiences across many different devices and screen resolutions. 

+ [Our process.](https://docs.google.com/file/d/0B1OhsrcuV2-9N2RYUV9KRHNWTlE/edit?usp=sharing)
+ [Our](https://speakerdeck.com/mikermcneil/intro-to-sails-dot-js) [s](https://angel.co/balderdash)[to](http://www.infoq.com/news/2013/04/Sails-0.8.9-Released)[ry](http://blog.modulus.io/sails-js).


================================================================================


###### <img height="30" title="appendTo: Full Stack JavaScript on Sails" alt="appendTo logo" src="http://appendto.com/wp-content/uploads/2013/10/appendTo-logo.png"/>

<!-- Social media links - I'll leave these here for you guys to fill in later -->
<!--
<a target="_blank" href="https://www.facebook.com/balderdashy">
  <img height="15" alt="Facebook icon" class="facebook" src="http://balderdash.co/img/icon_facebook@2x.png">
</a>
<a target="_blank" href="https://twitter.com/balderdashy">
  <img height="15" alt="Twitter icon" src="http://balderdash.co/img/icon_twitter@2x.png">
</a>
<a target="_blank" href="http://dribbble.com/Balderdash">
  <img height="15" alt="Dribbble icon" src="http://balderdash.co/img/icon_dribbble@2x.png">
</a>
<a target="_blank" href="http://www.linkedin.com/company/balderdash">
  <img height="15" alt="Linkedin icon" class="linkedin" src="http://balderdash.co/img/icon_linkedIn@2x.png">
</a>
-->


[appendTo](http://appendto.com/) is a leader in front-end software solutions, specializing in JavaScript, jQuery, HTML5 and Mobile Development. We offer a variety of solutions for everyone from small businesses to enterprise clientele.

+ [JavaScript, HTML5, Responsive Web, and Full Stack JavaScript for the Enterprise](http://appendto.com)
+ [Follow us on Twitter: @appendto](http://twitter.com/appendto)
+ [Visit us on Facebook](http://facebook.com/appendto)
+ Subscribe to our Newsletter - [The Modern Web Observer](http://appendto.com/mwo)

> If you would like to see your company added to this section, please tweet [@mikermcneil](http://twitter.com/mikermcneil) on Twitter.


### What are some good community tutorials?

> + If you are the author of a tutorial or guide about Sails, please send us a pull request editing this file.  We'll check it out!

+ [SailsCasts](http://irlnathan.github.io/sailscasts/) - Short screencasts that take you through the basics of building traditional websites, single-page/mobile apps, and APIs using Sails.  Perfect for both novice and tenured developers, but does assume some background on MVC.
+ [Sails.js Development channel on Medium](https://medium.com/sails-js-development/)
+ [Angular + Sails!  Help!](https://github.com/xdissent/spinnaker) - Sails Resources Service for AngularJS
+ [Intro to Sails.js](https://www.youtube.com/watch?v=GK-tFvpIR7c) screencast
+ Intro to Sails.js - talk @ NodePDX
  + [Recording](http://video.nodepdx.org/video/14/intro-to-sailsjs)
  + [Slides](https://docs.google.com/file/d/0B1OhsrcuV2-9RXAzQWlFbkNpT3c/edit?usp=sharing)
+ [Working With Data in Sails.js](http://net.tutsplus.com/tutorials/javascript-ajax/working-with-data-in-sails-js/) tutorial on NetTuts
+ [How to Create a Node.js App using Sails.js on an Ubuntu VPS](https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps)
+ [Sails.js - How to render node views via Ajax, single page application, SPA](http://www.youtube.com/watch?v=Di50_eHqI7I&feature=youtu.be)
+ Desarrollar Webapps Realtime:
  + [Creación](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-creacion/)
  + [Usuarios](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-usuarios/)
  + [Auth](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-auth/)
  + [Auth con Passport](http://jorgecasar.github.io/blog/desarrollar-webapps-realtime-auth-con-passport/)
+ [Angular + Sails.js (0.10.0-rc5) with angular-sails socket.io](https://github.com/maartendb/angular-sails-scrum-tutorial/blob/master/README.md)
+ [Sails.js and Heroku](https://pburtchaell.com/2015/sails/)
+ [Sails API development (1/2): Datalayer -models, connections, waterline](http://www.codeproject.com/Articles/898221/Sails-API-development-Datalayer-models-connections)
+ [Sails API development (2/2): Custom methods, overriding default actions, and related](http://www.codeproject.com/Articles/985730/Sails-API-development-2-2-Custom-methods-overriding-default)

### How can I convince the other girls/guys on my team?

###### Articles / interviews / press releases / whitepapers

> + If you are the author of an article about Sails, please send us a pull request editing this file.  We'll check it out!
> + If you are a company interested in doing a press release about Sails, please contact @mikermcneil on Twitter (and er.. remind him if necessary!)  We'll do what we can to help.

+ [Austin startup finds success in responsive design](http://www.bizjournals.com/sanantonio/blog/socialmadness/2013/03/sxsw-2013-Balderdash-startup-web-app.html?ana=twt)
+ [Interact ATX](http://www.siliconhillsnews.com/2013/03/10/flying-high-with-interact-atx-adventures-in-austin-part-3-2-1/)
+ [Startup America](http://www.prlog.org/12038372-engine-pitches-startup-america-board-of-directors.html)
+ [Sails.js featured in 5 Minutes of JavaScript](http://five-js.envylabs.com/episodes/8-episode-8-december-19th-2013/stories/52-sails-js)
+ [Sails.js - Awesome MVC for Node.js] (http://sethetter.com/sails-js/)
+ Interview w/ Tim Heckel [on InfoQ](http://www.infoq.com/news/2013/04/Sails-0.8.9-Released)
+ [Case Technical Blog](http://casestaffingsolutions.com/wordpress/?tag=sails-js)
+ [Sails.js - Une Architecture MVC pour applications real-time Node.js] (http://www.lafermeduweb.net/billet/sails-js-une-architecture-mvc-pour-applications-real-time-node-js-1528.html)
+ [Hacker News](https://news.ycombinator.com/item?id=5373342)
+ [Sail.js : un framework MVC pour Node.js](http://javascript.developpez.com/actu/52729/Sail-js-un-framework-MVC-pour-Node-js/)
+ [Sails.js — Build custom, enterprise-level Node.js apps](http://codevisually.com/sails-js-build-custom-enterprise-level-node-js-apps/)
+ [Build Custom & Enterprise Node.js Apps with Sails.js](http://www.webappers.com/2013/03/29/build-custom-enterprise-node-js-apps-with-sails-js/)
+ [New tools for web design and development: March 2013](http://www.creativebloq.com/design-tools/new-tools-web-design-and-development-march-2013-4132972)
+ [Sails 0.8.9: A Rails-Inspired Real-Time Node MVC Framework](http://www.infoq.com/news/2013/04/Sails-0.8.9-Released)
+ [30 Fresh jQuery Tools and Plugins](http://www.splashnology.com/article/30-fresh-jquery-tools-and-plugins/8865/)
+ [Node.js の MVCフレームワーク Sails.js が良さげなので少し試してみた] (http://nantokaworks.com/?p=1101)
+ [New web design tools that you need to check out](http://www.designyourway.net/blog/resources/new-web-design-tools-that-you-need-to-check-out/)
+ [Live code Sails.js avec Mike McNeil](http://www.weezevent.com/live-code-sailsjs-avec-mike-mcneil)
+ [#hack4good adds cities and welcomes Sails.js creator to speak and hack in Paris!](http://us2.campaign-archive1.com/?u=cf9af451f2674767755b02b35&id=fb98713f48&e=b2d87b15fe)
+ [Backend фреймворк SailsJS + BackboneJS + MySQL](http://habrahabr.ru/post/184896/)
+ [realtime chat with sails and react](http://blog.nursoft.cl/creando-un-chat-realtime-en-sails-js-y-react/)


--------------------------------------------------------------------------------

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)



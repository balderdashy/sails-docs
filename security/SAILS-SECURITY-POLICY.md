# Reporting Security Issues in Sails

If you believe you've found a security vulnerability in Sails, Waterline, or one of the other modules maintained by the Sails core team, please send an email to **critical at treeline dot io**.  <em>Please don't file a public issue</em>. Also please respect the core team's privacy and do not send bugs resulting from undocumented usage, questions, or feature requests to this email address.

###What is a security vulnerability?

A security vulnerability is any major bug or unintended consequence that could compromise a Sails.js app in production.

For example, an issue where Sails crashes in a development environment when using non-standard Grunt tasks is _not a security vulnerability_.  On the other hand, if it was possible to perform a trivial DoS attack on a Sails cluster running in a production environment and using documented best-practices (a la the [Express/Connect body parser issue](http://expressjs-book.com/index.html%3Fp=140.html)), that _is a security vulnerability_ and we want to know about it.

> Note that this definition includes any such vulnerability that exists due to one of our dependencies.  In this case, an upgrade to a different version of the dependency is not always necessary: for example, when Express 3 deprecated multipart upload support in core, Sails.js dealt with the feature mismatch by implementing a wrapper around the `multiparty` module called [Skipper](https://github.com/balderdashy/skipper#history).

###What should be included in the email?

- Identify the module where you found the security vulnerability (e.g. Sails, Waterline, other core module).
- A summary of the vulnerability
- The code you used when you discovered the vulnerability or a code example of the vulnerability (whichever is shorter).
- Whether you want us to make your involvement public.  If you want such a reference the name and link you wish to be referred (e.g. Jane Doe's link to her GitHub account)

###The process
When you report a vulnerability, one of the project members will respond to you within a maximum of 14 days.  This response will most likely be an acknowledgement that we've received the report and will be investigating it immediately.

Based upon the nature of the vulnerability, and the amount of time it would take to fix, we'll either send out a patch that disables the broken feature, provide an estimate of the time it will take to fix, and/or document best practices to follow to avoid production issues.

You can expect follow-up emails outlining the progression of a solution to the vulnerability along with any other questions we may have regarding your experience.

##### When a solution is achieved we do the following:
- notify you,
- release a patch on the module's main repo
- provide a link to the patch here along with an explanation of it's origin and crediting you (if you have chosen to be identified)
- publicize the release via our various mailing lists.

###Is this an SLA?

No. Like any open-source project, we're run by volunteers, and we can't legally guarantee any kind of service level agreement (see the MIT license for details).  However, the core team cares deeply about Sails, and all of us have at least a few different websites and APIs running on Sails in production.  We will always publish a fix for any serious security vulnerability as soon as possible-- not just out of the kindness of our hearts, but because it could affect our apps (and our customer's apps) too. 

© 2015, Mike McNeil

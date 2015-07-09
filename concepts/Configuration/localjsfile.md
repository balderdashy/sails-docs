# The `config/local.js` file

The `config/local.js` file is useful for configuring a Sails app for your local environment (your laptop, for example).  The settings in this file take precedence over all other config files except [.sailsrc](http://sailsjs.org/#!/documentation/concepts/Configuration/usingsailsrcfiles.html).  Since they're intended only for local use, they should not be put under version control (and are included in the default `.gitignore` file for that reason).  Use `local.js` to store local database settings, change the port used when lifting an app on your computer, etc.

While you’re developing your app, this config file should include any settings specifically for your development computer or server (db passwords, etc.)  If you're using git, note that `config/local.js` is included in the `.gitignore` in new Sails apps by default, and so it won't be checked into your repository when you commit.

When you&rsquo;re ready to deploy your app in production, you can also use this file for configuration options on the server where it will be deployed.  However, for server deployments, environment variables are usually preferable.  You can also use command-line arguments and the `.sailsrc` file as alternatives to `config/local.js` for your local development configuration. See http://sailsjs.org/#!/documentation/concepts/Configuration for more information about configuration in general.

> **Note:** This file is included in your .gitignore, so if you&rsquo;re using git as a version control solution for your Sails app, keep in mind that this file won&rsquo;t be committed to your repository!
> Good news is, that means you can specify configuration for your local machine in this file without inadvertently committing personal information (like database passwords) to the repo.  Plus, this prevents other members of your team from commiting their local configuration changes on top of yours.

<docmeta name="displayName" value="The local.js file">


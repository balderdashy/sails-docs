# sails.config.local

### What is this?

Use this file to specify configuration settings for use while developing the app on your personal system: for example, this would be a good place to store database or email passwords that apply only to you, and shouldn't be shared with others in your organization.

These settings take precedence over all other files in `config/`, including those in the env/ subfolder.

### Notes
> By default, `config/local.js` is included in your .gitignore, so if you're using git as a version control solution for your Sails app, keep in mind that this file won't be committed to your repository!
>
> Good news is, that means you can specify configuration for your local machine in this file without inadvertently committing personal information (like database passwords) to the repo.  Plus, this prevents other members of your team from commiting their local configuration changes on top of yours.
>
> In a production environment, you'll probably want to leave this file out entirely and configure all of your production overrides using `env/production.js`, or environment variables, or a combination of both.


<docmeta name="displayName" value="sails.config.local">

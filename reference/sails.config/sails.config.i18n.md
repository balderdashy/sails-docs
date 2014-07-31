# sails.config.i18n


Configuration for Sails' built-in internationalization & localization features.  For more information see the [concepts section on internationalization](http://beta.sailsjs.org/#/documentation/concepts/Internationalization).


### Properties

| Property           | Type        | Default               | Details |
|--------------------|:-----------:|-----------------------|---------|
| `locales`          | ((array))   | ['en','es','fr','de'] | List of supported [locale codes](http://en.wikipedia.org/wiki/BCP_47)
| `localesDirectory` | ((string))  | '/config/locales'     | The project-relative path to the folder containing your locale translations (i.e. stringfiles)
| `defaultLocale`    | ((string))  | 'en'                  | The default locale for the site. Note that this setting will be overridden for any request that sends an "Accept-Language" header (i.e. most browsers), but it's still useful if you need to localize the response for requests made by non-browser clients (e.g. cURL).
| `updateFiles`      | ((boolean)) | false                 | Whether to automatically add new keys to locale (translation) files when they are encountered during a request.



<docmeta name="uniqueID" value="sailsconfigi18n588825999999">
<docmeta name="displayName" value="sails.config.i18n">


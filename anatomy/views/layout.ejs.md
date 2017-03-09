# views/layout.ejs

This [Embedded JavaScript file](http://embeddedjs.com/) acts as the default layout for all server side views rendered by your app.

Before one of your custom views is sent to the client, it is injected into this file.  It is this file that is actually sent to the client.

Feel free to change this as you see fit.  Its also a great place to include JavaScript and css that you plan on using in every view.  This keeps you from having to include them in all your custom .ejs files.  Note, this isnt an issue if you created your app with the `--linker` flag.  In this case, everything in your assets directory is minified and injected into every view rendered by your app.



<docmeta name="displayName" value="layout.ejs">

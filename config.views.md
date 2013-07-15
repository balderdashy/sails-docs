## views.js
The views.js file controls how your views will display.  From if you will use a layout file to what type of language can be used to create the view files.

```javascript
module.exports = {
    viewEngine: 'ejs',
	layout: true
};
```
_**viewEngine:**_ \<STRING\>  (Optional) This is the view engine that will be used to parse the view files.

_**layout:**_ \<BOOL or STRING\>  (Optional) This is a special value.  It can either be true or false.  If false, it will not use a layout for views.  If true, it will assume that the default file to use is _/views/layout.ejs_ and will use it.  If you pass it a string instead, it will use the file at the string that you passed it.

If you plan to use a viewEngine other than the default, you must verify that it is available to Sails.js.

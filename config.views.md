views.js

The views.js file controls how your views will display. From if you will use a layout file to what type of language can be used to create the view files.

module.exports = {
    viewEngine: 'ejs',
    layout: true
};
viewEngine: <STRING> (Optional) This is the view engine that will be used to parse the view files.

layout: <BOOL or STRING> (Optional) This is a special value. It can either be true or false. If false, it will not use a layout for views. If true, it will assume that the default file to use is /views/layout.ejs and will use it. If you pass it a string instead, it will use the file at the string that you passed it.

If you plan to use a viewEngine other than the default, you must verify that it is available to Sails.js.

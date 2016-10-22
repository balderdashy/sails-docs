# XSS

Cross-site scripting (XSS) is a type of attack in which a malicious agent manages to inject client-side JavaScript into your website, so that it runs in the trusted environment of your users' browsers.


### Protecting against XSS attacks

The cleanest way to prevent XSS attacks is to escape untrusted data _at the point of injection_.  That means at the point where it's actually being injected into the HTML.


#### On the server

##### When injecting data into a server-side view...

Use `<%= %>` to HTML-encode data:

```html
<h3 is="welcome-msg">Hello <%= me.username %>!</h3>
```

##### When exposing view locals to client-side JavaScript...

Use `exposeLocalsToBrowser` to safely expose some or all of your view locals to client-side JavaScript:

```html
<%- exposeLocalsToBrowser(); %>

<script>
console.log(window.SAILS_LOCALS);
// {
//   me: {
//     username: 'eleven',
//     memberSince: '1982-08-01T05:00:00.000Z'
//   },
//   projects: [
//     {
//       slug: 'my-neat-stuff',
//       friendlyName: 'My neat stuff'
//     },
//     {
//       slug: 'kind-of-neat-stuff-but-not-that-great',
//       friendlyName: 'Kind of neat stuff, but not that great...'
//     }
//   ],
//   _csrf: 'oon95Uac-wKfWQKC5pHx1rP3HsiN9tjqGMyE'
// }
</script>
```



#### On the client

A lot of XSS prevention is about what you do in your client-side code.  Here are a few examples:

##### When injecting data into a client-side template...

Use `<%- %>` to HTML-encode data:

> This example assumes you are using JST templates from the default asset pipeline.

```html
<div data-template-id="welcome-box">
  <h3 is="welcome-msg">Hello <%- me.username %>!</h3>
</div>
```


##### When modifying the DOM with client-side JavaScript...

Use something like `$(...).text()` to HTML-encode data:

> This example assumes you are using jQuery.

```js
var $welcomeMsg = $('#signup').find('[is="welcome-msg"]');
welcomeMsg.text('Hello, '+window.SAILS_LOCALS.me.username+'!');
```

> Avoid using `$(...).html()` to inject untrusted data.  Even if you know an XSS is not possible under particular circumstances, accidental escaping issues can cause really, really annoying client-side bugs.


### Additional Resources
+ [XSS (OWasp)](https://www.owasp.org/index.php/XSS)
+ [XSS Prevention Cheatsheet](https://www.owasp.org/index.php/XSS_Prevention_Cheat_Sheet)


<docmeta name="displayName" value="XSS">

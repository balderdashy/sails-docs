# Content Security Policy

Content Security Policy (CSP) is a W3C specification for instructing the client browser as to which location and/or which type of resources are allowed to be loaded. This spec uses "directives" to define a loading behaviors for target resource types. Directives can be specified using HTTP response headers or or HTML Meta tags.

#### HTTP Headers
| Header                    | Browsers                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Content-Security-Policy   | (W3C Standard header) Chrome version >= 25, Firefox version >= 23, Opera version >= 19 |
| X-Content-Security-Policy | Firefox version < 23, IE version 10                                                    |
| X-WebKit-CSP              | Chrome version < 25                                                                    |


#### Supported Directives
| Directive     | |
|---------------|--------------------------|
| default-src   | Loading policy for all resources type in case a resource type dedicated directive is not defined (fallback) |
| script-src    | Defines which scripts the protected resource can execute |
| object-src    | Defines from where the protected resource can load plugins |
| style-src     | Defines which styles (CSS) the user applies to the protected resource |
| img-src       | Defines from where the protected resource can load images |
| media-src     | Defines from where the protected resource can load video and audio |
| frame-src     | Defines from where the protected resource can embed frames |
| font-src      | Defines from where the protected resource can load fonts |
| connect-src   | Defines which URIs the protected resource can load using script interfaces |
| form-action   | Defines which URIs can be used as the action of HTML form elements |
| sandbox       | Specifies an HTML sandbox policy that the user agent applies to the protected resource |
| script-nonce  | Defines script execution by requiring the presence of the specified nonce on script elements |
| plugin-types  | Defines the set of plugins that can be invoked by the protected resource by limiting the types of resources that can be embedded |
| reflected-xss | Instructs a user agent to activate or deactivate any heuristics used to filter or block reflected cross-site scripting attacks, equivalent to the effects of the non-standard X-XSS-Protection header |
| report-uri    | Specifies a URI to which the user agent sends reports about policy violation |

> For more information, see the [W3C CSP Spec](https://w3c.github.io/webappsec/specs/content-security-policy/)





<docmeta name="displayName" value="Content Security Policy">


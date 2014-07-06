# sails.config.policies

> TODO:
>
> Merge most of the contents of this file into the main reference section on policies.
> Include a simple config reference table (with only one row with property: `*`) explaining how
> this particular config module is read.  But don't worry about trying to explain what policies are here-- instead, link to the full docs on the subject (again, to reduce duplicate content and make this all more maintainable)

### What is this?
Policies are like any other system for authentication control. You can allow or deny access in fine granularity with policies.

### Description

Your app's ACL (access control list) is located in **config/policies.js**.

#### Applying a Policy

##### To a Specific Action

To apply a policy to a specific action in particular, you should specify it on the right-hand side of that action:

```javascript
{
  ProfileController: {
      edit: 'isLoggedIn'
  }
}
```


##### To an Entire Controller

To set the default policy mapping for a controller, use the `*` notation:
> **Note:** Default policy mappings do not "cascade" or "trickle down."  Specified mappings for the controller's actions will override the default mapping.  In this example, `isLoggedIn` is overriding `false`.

```javascript
{
  ProfileController: {
    '*': false,
    edit: 'isLoggedIn'
  }
}
```

##### Globally
> **Note:** Global policy mappings do not "cascade" or "trickle down" either.  Specified mappings, whether they're default controller mappings or for specific actions, will **ALWAYS** override the global mapping.  In this example, `isLoggedIn` is overriding `false`.

```javascript
{

  // Anything you don't see here (the unmapped stuff) is publicly accessible
  '*': true,

  ProfileController: {
    '*': false,
    edit: 'isLoggedIn'
  }
}
```


##### Built-in policies

###### true

> This is the default policy mapped to all controllers and actions in a new project.  In production, it's good practice to set this to `false` to prevent access to any logic you might have inadvertently exposed.

Allow public access to the mapped controller/action.  This will allow any request to get through, no matter what.

```javascript
module.exports = {
  UserController: {

    // login should always be accessible
    login: true

  }
}
```


###### false

**NO** access to the mapped controller/action.  No requests get through.  Period.

```javascript
module.exports = {
  MathController: {

    // This fancy algorithm we're working on isn't done yet
    // so we set it to false to disable it
    someFancyAlgorithm: false

  }
}
```


##### Custom policies

You can apply one or more policies to a given controller or action.  Any file in your `/policies` folder (e.g. `authenticated.js`) is referable in your ACL (`config/policies.js`) by its filename minus the extension, (e.g.  `'authenticated'`).


```javascript
module.exports = {
  FileController: {
    upload: ['isAuthenticated', 'canWrite', 'hasEnoughSpace']
  }
}
```

##### Multiple Policies

To apply two or more policies to a given action, (order matters!) you can specify an array, each referring to a specific policy. 

```javascript
UserController: {
    lock: ['isLoggedIn', 'isAdmin']
}
```

In each of the policies, the next policy in the chain will only be run if `next()`, the third argument, is called.  When and if the last policy calls `next()`, the requested controller action is run.



<docmeta name="uniqueID" value="sailsconfigpolicies753862">
<docmeta name="displayName" value="sails.config.policies">


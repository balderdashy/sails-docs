Policies are use to prevent users from taking unauthorized actions.  
Below is an example of retrieving the UserID from session and comparing it to the userid that is passed to the server.  This will verify that both the query is properly formed, and that the user is allowed to make that query.

```
// api/policies/userIdMatches.js
module.exports = function (req,res,next) {

    // Pick userId out of params
    var specifiedUserId = req.param('UserId');
    
    // If it was passed in as a query parameter, extract it
    if (!specifiedUserId && req.param('where')) {
        specifiedUserId = req.param('where').UserId;
    }

    // If the specified user id matches the actual user id in the session, continue
    if (req.session.userId === specifiedUserId)
        next();
    else
        res.send('You don\'t have permission to use that userId.', 403);
};
```

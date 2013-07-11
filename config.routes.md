routes.js

Resourceful routing in Sails.js is automatic, but you can also assign custom routes from specific URLs to your controllers' actions.

For instance, if you have an AuthController with a login action, the url http://yourdomain.com/auth/login would automatically exist. But if you also want http://yourdomain.com/login to work, your routes file might look like the following:

module.exports.routes = {

    // To route the home page to the "index" action of the "home" controller:
    '/' : {
        controller  : 'home'
    },

    '/login' : {
        controller  : 'auth'
        action      : 'login'
    }

};
Each attribute of routes is a key/object pair. The key is the route that you want to control. This can me "/" for the home page or /user/ for the users page. It can really be whatever you want the user to be able to type and get content at. The objects controller: defines what controller to look in for this route, while the action defines what action will be run when the route is executed. If no action is given, Sails.JS assumes that you want to execute the index action.

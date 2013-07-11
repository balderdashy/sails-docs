policies.js

So, you don't want your mom to access your secret stash of ... code? Then this is where you make that happen. Policies are like any other system for authentication control. You can allow or deny access in fine granularity with policies.

/**
* Policy defines middleware that is run before each controller/controller.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

    // Default policy (allow public access)
    '*': true

    /** Example mapping: 
    someController: {

        // Apply the "authenticated" policy to all actions
        '*': 'authenticated',

        // For someAction, apply 'somePolicy' instead
        someAction: 'somePolicy'
    }
    */
};
Each attribute of policies is a key/value pair. The key is the action name that you want to restrict/unrestrict. The value can be a simple boolean (true/false) or the name of the policy you want to enforce. Policies should be found/created as middleware in the api/policies/ folder.

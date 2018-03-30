# Upgrading

Like most Node packages, Sails respects [semantic versioning](http://semver.org/).  For example if you are using Sails v0.11.3, and then upgrade to Sails v0.11.4, you shouldn't need to change your application code.  This is called a **patch release**.  On the other hand, if you upgrade from Sails v0.11.3 to v1.0.0, you can expect some _breaking changes_-- meaning that you will need to change your Sails app's code in order to use the new version.  With any framework or tool, _some_ breaking changes are inevitable over time; but as the APIs in Node and Sails continue to stabilize, expect to see these sorts of breaking changes less and less often.  In the mean time, the core maintainers strive to keep these sorts of changes to a minimum and maintain backwards compatibility where possible.

### Version Notes

For details about changes between versions, as well as a migration guide to assist you in making an necessary changes to your app, please refer to the appropriate page:

- [v1.x](https://sailsjs.com/documentation/upgrading/to-v-1-0)
- [v0.12.x](https://sailsjs.com/documentation/concepts/upgrading/to-v-0-12)
- [v0.11.x](https://sailsjs.com/documentation/concepts/upgrading/to-v-0-11)
- [v0.10.x](https://sailsjs.com/documentation/concepts/upgrading/to-v-0-10)


### Notes

> - Like Node.js, in Sails versions prior to v1.0, minor version bumps included breaking changes-- e.g. upgrading from v0.11.3 to v0.12.0 might force you to make some changes to your code.  But from v1.0.0 and on, minor version (the second number) releases should be fully backwards compatible.  For example, v1.1.0 to v1.2.0 should not force you to make changes to your code; whereas upgrading to v2.0.0 might.
> - If you are more than one version behind the latest release and run into difficulties, consider updating your app one step at a time. The migration guides are written with a particular version diff in mind and as you probably are well aware, when in doubt, it's best to isolate as many variables as possible.  For instance, if you are running Sails v0.11 and trying to upgrade to Sails v1.5.18 but having trouble, first upgrade to Sails v0.11, then v0.12, _then_ v1.5.18.


<docmeta name="displayName" value="Upgrading">
<docmeta name="isOverviewPage" value="true">

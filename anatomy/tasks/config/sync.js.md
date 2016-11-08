# tasks/config/sync.js

### Purpose

This file configures a Grunt task called "sync".

This task synchronizes one directory with another (like rsync).  In the default Sails asset pipeline, it plays very similar role to `grunt-contrib-copy`, but copies only those files that have actually changed since the last time the task was run.

Specifically, its job is to synchronize files from the `assets/` folder to `.tmp/public`, smashing anything that's already there.


### Usage

For additional usage documentation, see [`grunt-sync`](https://www.npmjs.com/package/grunt-sync).


<docmeta name="displayName" value="sync.js">

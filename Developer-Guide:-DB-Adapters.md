Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) called Waterline for normalizing
interactions with models, no matter what data source you're using. In this guide, we'll be demonstrating how to build adapters for Waterline by building one for Redis. 

To get started, you'll need to clone the main sails repo and create or clone a repo for your new adapter. In our case, the adapter is called "sails-redis", keeping in line with the Sails convention of naming adapters with the format "sails-<db name>". So, you should have a `sails/` and a `sails-redis/` directory.

Next, we need to set up the project with the initial file structure, so do:

`
cd sails-redis
touch README.md
touch package.json
touch .gitignore
touch RedisAdapter.js
`
/**
 * Known adapters for Sails.js.
 *
 * Key should be identity of npm module.
 * (will resolve target versions, interfaces, methods,
 *  author, dependencies, etc. that way)
 *
 * Tracked this way so the data here can be augmented using npm,
 * then a JSON snapshot taken.  That JSON snapshot can be used
 * for visualizations and tracking the status of the currently-available
 * Saisl community projects, and provide better visibility for
 * versioning and updates of core modules.
 *
 * @type {Object}
 */
module.exports = {

	//
	// Core adapters
	//

	'sails-disk': {
		repo: 'https://github.com/balderdashy/sails-disk',
		supported: true,
		status: 'stable'
	},
	'sails-memory': {
		repo: 'https://github.com/balderdashy/sails-memory',
		supported: true,
		status: 'stable'
	},
	'sails-mysql': {
		repo: 'https://github.com/balderdashy/sails-mysql',
		supported: true,
		status: 'stable'
	},
	'sails-postgresql': {
		repo: 'https://github.com/balderdashy/sails-postgresql',
		supported: true,
		status: 'stable'
	},
	'sails-mongo': {
		repo: 'https://github.com/balderdashy/sails-mongo',
		supported: true,
		status: 'stable'
	},
	'sails-redis': {
		repo: 'https://github.com/balderdashy/sails-redis',
		supported: true,
		status: 'edge'
	},





	//
	// Community adapters
	// ------------------------------------


	//
	// 3rd Party APIs
	//
	'sails-rest': {
		repo: 'https://github.com/zohararad/sails-rest',
		status: 'stable'
	},



	//
	// Databases
	//

	'sails-riak': {
		repo: '',
		status: 'unknown'
	},
	'sails-rethinkdb': {
		repo: '',
		status: 'unknown'
	},
	'sails-mongoose': {
		repo: 'https://github.com/ktkaushik/sails-mongoose',
		status: 'unknown'
	},
  'sails-mssql': {
    repo: 'https://github.com/jaredfromsubway/sails-mssql',
    status: 'unknown'
  },



	//
	// Messaging
	//
	'sails-mandrill': {
		repo: 'https://github.com/mikermcneil/sails-mandrill',
		status: 'experimental'
	},


	//
	// Filesystem
	//

	'sails-s3': {
		repo: 'https://github.com/mikermcneil/sails-s3',
		status: 'experimental'
	},
	'sails-local-fs': {
		repo: 'https://github.com/balderdashy/sails-local-fs',
		status: 'experimental'
	},


	//
	// IRC
	//

	'sails-irc': {
		repo: 'https://github.com/balderdashy/sails-irc',
		comments: 'See updated version here (needs to be tested): https://github.com/mikermcneil/sails-example-ircbot/blob/master/api/adapters/IRCAdapter.js',
		status: 'broken'
	},


	//
	// Misc
	//

	'sails-parse': {
		repo: 'https://github.com/murilopolese/sails-parse',
		status: 'unknown'
	},

	// known to exist but missing from this list:
	// jsdom
	// twitter
	// yelp
	// elasticsearch
	// couchdb



	// ...
	// More here:
	// https://github.com/balderdashy/sails-docs/blob/master/intro-to-custom-adapters.md#notable-community-adapters
	//
	// and here:
	// https://npmjs.org/search?q=sails
	//
	// (we welcome your help getting them updated and tracked here!)
	//
	// ...
};

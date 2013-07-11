If bodyParser doesn't understand the HTTP body request data, run bodyParser again, forcing it to JSON
(allows JSON to be sent with request data without the need to specify a 'Content-type: application/json' header)
Default: true

so in express.js, it would look like

    // stuff that I said earlier
    module.exports.express.retryBodyParserWithJSON

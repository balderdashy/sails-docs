# .stream()

Stream records from your database one at a time or in batches, without first having to buffer the entire result set in memory.

> This approach is useful for working with very large result sets; the kinds of result sets that might overflow your server's available RAM... at least, if you try to hold the entire thing in memory at the same time.  You can use Waterline's `.stream()` method to do the kinds of things you might already be familiar with from Mongo cursors:  Preparing reports, moving large amounts of data from one place to another, performing complex transformations, or even orchestrating map/reduce jobs.

The `.stream()` method is almost exactly like [`.find()`](http://sailsjs.com/documentation/reference/waterline-orm/models/find), except that it does not actually provide a second argument to the `.exec()` callback.  Instead, you use `.eachRecord()` or `eachBatch()` to provide an iteratee function which receives one record or batch at a time.  

```javascript
Something.stream(criteria)
.eachRecord(function(record, next) { ... })
.exec(function (err) {

});
```

_Or:_

+ `.eachBatch(function(batch, next) { ... })`

### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | criteria            | ((dictionary))    | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.


##### Iteratee ("each record" or "each batch")

_Use one of the following iteratees:_

+ `.eachRecord(function(record, next) { ... })`
+ `.eachBatch(function(batch, next) { ... })`

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 | record _or_ batch   | ((dictionary)) _or_ ((array))      | The current record, or the current batch of records.  _A batch will always contain at least one (and no more than thirty) records._
| 2 | next                | ((function))        | A callback function that the iteratee should invoke when it is finished processing the current record or batch.  Like any Node callback, if your code in the iteratee calls `next()` with a truthy first argument (conventionally an Error instance), then Waterline understands that to mean an error occurred, and that it should stop processing records/batches.  Otherwise, it is assumed that everything went according to plan.


##### Callback

After iterating over all records/batches that match the criteria...

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 | err                 | ((Error?))          | The error that occurred, or `undefined` if there were no errors.


### Examples

There are 4 examples below.

##### Basic usage

An action that iterates over users named Finn in the database, one at a time:

```javascript
User.stream({name:'Finn'}).eachRecord(function (user, next){

  if (Math.random() > 0.5) {
    return next(new Error('Oops!  This is a simulated error.'));
  }
  
  sails.log('Found a user (`'+user.id+'`) named Finn.');

  return next();
  
}).exec(function (err){
  if (err) {
    return res.serverError(err);
  }
  
  return res.ok();
});
```


##### Generating a dynamic sitemap

An action that responds with a dynamically-generated sitemap:

```javascript
// e.g. in an action that handles `GET /sitemap.xml`:

var sitemapXml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

var RENDER_SITEMAP_XML_URL_EL = _.template(
  '<url>\n'+
  '  <loc><%= url %></loc>\n'+
  '  <lastmod><%= updatedAt %></lastmod>\n'+
  '<changefreq>monthly</changefreq>\n'+
  '</url>'
);

BlogPost.stream()
.limit(50000)
.sort('title ASC')
.eachRecord(function (blogPost, next){

  sitemapXml += RENDER_SITEMAP_XML_URL_EL({
    url: 'https://blog.example.com/' + blogPost.slug,
    updatedAt: blogPost.updatedAt
  });

  return next();

})
.exec(function (err) {
  if (err) { return res.serverError(err); }
  
  sitemapXml += '</urlset>';

  return res.send(sitemapXml);

});

```



##### With `.populate()`

A snippet of a command-line script that searches for creepy comments from someone named "Bailey Bitterbumps" and reports them to the authorities:

```js

// e.g. in a cmdline script

var numReported = 0;

Comment.stream({
  author: 'Bailey Bitterbumps'
})
.limit(1000)
.skip(40)
.sort('title ASC')
.populate('attachedFiles', {
  limit: 3,
  sort: 'updatedAt'
})
.populate('fromBlogPost')
.eachRecord(function (comment, next){

  var isCreepyEnoughToWorryAbout = comment.rawMessage.match(/beanie weenies/) && comment.attachedFiles.length > 1;
  if (!isCreepyEnoughToWorryAbout) {
    return next();
  }

  Mailgun.sendPlaintextEmail({
    toEmail: 'authorities@cannedmeat.gov',
    message: 'Yeah, there\'s a creepy thing going on at:\n'+
              'https://blog.example.com/' + comment.fromBlogPost.slug + '/comments/' + comment.slug + '.',
    apiKey: sails.config.custom.mailgunApiKey,
    domain: sails.config.custom.mailgunDomain
  }).exec(function (err) {
    if (err) { return next(err); }
    
    numReported++;

    return next();

  });//</Mailgun.sendPlaintextEmail()>

})
.exec(function (err) {
  if (err) {
    sails.log.error('An unexpected error occurred when reporting a creepy comment: '+ err.stack);
    return process.exit(1);
  }

  sails.log('Successfully reported '+numReported+' creepy comments.');

  return process.exit(0);

});

```



##### Batch-at-a-time

If we ran the code in the previous example, we'd be sending one email per creepy comment... which could be a lot!  Not only would this be slow, it could mean sending _thousands_ of individual API requests to our [transactional email provider](https://documentation.mailgun.com/faqs.html#why-not-just-use-sendmail-postfix-courier-imap), quickly overwhelming our API rate limit.

Fortunately, there are a few easy changes we can make to our script to solve this.  Let's try again; but this go-round, instead of processing individual records one at a time, we'll receive and process them as batches:

```js
// e.g. in a cmdline script, batch at a time


var numReported = 0;
var numEmailsSent = 0;

Comment.stream({
  author: 'Bailey Bitterbumps'
})
.limit(1000)
.skip(40)
.sort('title ASC')
.populate('attachedFiles', {
  limit: 3,
  sort: 'updatedAt'
})
.populate('fromBlogPost')
.eachBatch(function (someCreepyComments, next){

  // If a comment contains the phrase "beanie weenies", AND it has
  // at least one attached file, then we'll consider it creepy.
  // Otherwise, it's not creepy enough to worry about, so we'll
  // remove it from the `someCreepyComments` array (effectively skipping it).
  _.remove(someCreepyComments, function (comment){
    var isCreepyEnoughToWorryAbout = comment.rawMessage.match(/beanie weenies/) && comment.attachedFiles.length > 1;
    if (!isCreepyEnoughToWorryAbout) { return true; }//<< not creepy enough, remove it.
    else { return false; }//<< this is creepy enough, keep it.
  });
  
  // If this batch doesn't contain any comments that are creepy enough,
  // then bail now and skip to the next batch, if any are left.
  if (someCreepyComments.length === 0) {
    return next();
  }//--•

  var message = 'Dear authorities,\n';
  message += 'There\'s '+someCreepyComments.length+' creepy thing'+(someCreepyComments.length !== 1 ? 's' : '') +' ';
  message += 'going on here:\n';
  message += _.reduce(someCreepyComments, function (memo, creepyComment){
    memo += ' • ' + 'https://blog.example.com/' + creepyComment.fromBlogPost.slug + '/comments/' + creepyComment.slug + '\n';
    return memo;
  }, '')+'\n';
  message += '\n';
  message += 'Sincerely,\n';
  message += 'Concerned parent';

  Mailgun.sendPlaintextEmail({
    toEmail: 'authorities@cannedmeat.gov',
    message: message,
    apiKey: sails.config.custom.mailgunApiKey,
    domain: sails.config.custom.mailgunDomain
  }).exec(function (err) {
    if (err) { return next(err); }

    numReported += someCreepyComments.length;
    numEmailsSent++;

    return next();

  });//</Mailgun.sendPlaintextEmail()>

})//~∞%°
.exec(function (err) {
  if (err) {
    sails.log.error('An unexpected error occurred when reporting a batch of creepy comments: '+ err.stack);
    return process.exit(1);
  }

  sails.log('Successfully reported '+numReported+' creepy comments-- spread across '+numEmailsSent+' different emails.');

  return process.exit(0);

});
```


### Notes
> + Prior to Sails v1.0/Waterline 0.13, this method had a lower-level interface, exposing a [Readable "object stream"](http://nodejs.org/api/stream.html).  This was powerful, but tended to be error-prone.  So the new, adapter-agnostic `.stream()` does not rely on emitters or any particular flavor of Node streams.  But with a little code, you can still easily build a streams2/streams3-compatible Readable "object stream" from `eachRecord()`/`eachBatch()`, if you need that.
> + You can read more about `.stream()` [here](https://gist.githubusercontent.com/mikermcneil/d1e612cd1a8564a79f61e1f556fc49a6/raw/094d49a670e70cc38ae11a9419314542e8e4e5c9/streaming-records-in-sails-v1.md), including additional examples, motivations, background information, and implementation details.
> + `.stream()` runs the provided iteratee function on each record or batch, one at a time, in series.
> + Just like async.eachSeries(), this method bails and calls the `.exec()` callback with an error _immediately_ after the first time it  receives an error from an iteratee.
> + Internally, regardless whether you're using `.eachBatch()` or `.eachRecord()`, Waterline grabs pages of 30 records at a time.

<docmeta name="displayName" value=".stream()">
<docmeta name="pageType" value="method">


# .stream()

Stream records from your database one at a time or in batches, without first having to buffer the entire result set in memory.

```usage
await Something.stream(criteria)
.eachRecord(async (record, next)=>{
  return next();
});
```


### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | _criteria_          | ((dictionary))    | The [Waterline criteria](https://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.

##### Iteratee

_Use one of the following:_

+ `.eachRecord(async (record, next)=>{ ... })`
+ `.eachBatch(async (batch, next)=>{ ... })`

<br/>

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 | record _or_ batch   | ((dictionary)) _or_ ((array))      | The current record, or the current batch of records.  _A batch will always contain at least one (and no more than thirty) records._
| 2 | next                | ((function))        | A callback function that the iteratee should invoke when it is finished processing the current record or batch.  Like any Node callback, if your code in the iteratee calls `next()` with a truthy first argument (conventionally an Error instance), then Waterline understands that to mean an error occurred, and that it should stop processing records/batches.  Otherwise, it is assumed that everything went according to plan.


##### Errors

|     Name        | Type                | When? |
|:----------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError      | ((Error))           | Thrown if something invalid was passed in.
| AdapterError    | ((Error))           | Thrown if something went wrong in the database adapter.
| Error           | ((Error))           | Thrown if anything else unexpected happens.

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.


### When should I use this?

The `.stream()` method is almost exactly like [`.find()`](https://sailsjs.com/documentation/reference/waterline-orm/models/find), except that it does not actually provide a second argument to the `.exec()` callback nor does it provide it as a result.  Instead, you use `.eachRecord()` or `.eachBatch()` to provide an iteratee function which receives one record or batch at a time.

This is useful for working with very large result sets; the kinds of result sets that might overflow your server's available RAM... at least, they would if you tried to hold the entire thing in memory at the same time.  You can use Waterline's `.stream()` method to do the kinds of things you might already be familiar with from Mongo cursors: preparing reports, moving large amounts of data from one place to another, performing complex transformations, or even orchestrating map/reduce jobs.


### Examples

There are 4 examples below.

##### Basic usage

An action that iterates over users named Finn in the database, one at a time:

```javascript
await User.stream({name:'Finn'})
.eachRecord(async (user, next)=>{

  if (Math.random() > 0.5) {
    return next(new Error('Oops!  This is a simulated error.'));
  }

  sails.log(`Found a user ${user.id} named Finn.`);
  return next();
}

return res.ok();
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

await BlogPost.stream()
.limit(50000)
.sort('title ASC')
.eachRecord(async (blogPost, next)=>{

  sitemapXml += RENDER_SITEMAP_XML_URL_EL({
    url: 'https://blog.example.com/' + blogPost.slug,
    updatedAt: blogPost.updatedAt
  });

  return next();
});

sitemapXml += '</urlset>';

return res.send(sitemapXml);
```



##### With `.populate()`

A snippet of a command-line script that searches for creepy comments from someone named "Bailey Bitterbumps" and reports them to the authorities:

```js
// e.g. in a shell script

var numReported = 0;

await Comment.stream({ author: 'Bailey Bitterbumps' })
.limit(1000)
.skip(40)
.sort('title ASC')
.populate('attachedFiles', {
  limit: 3,
  sort: 'updatedAt'
})
.populate('fromBlogPost')
.eachRecord(async (comment, next)=>{

  var isCreepyEnoughToWorryAbout = comment.rawMessage.match(/beanie weenies/) && comment.attachedFiles.length > 1;
  if (!isCreepyEnoughToWorryAbout) {
    return next();
  }

  await sails.helpers.sendTemplateEmail.with({
    template: 'email-creepy-comment-notification',
    templateData: {
      url: `https://blog.example.com/${comment.fromBlogPost.slug}/comments/${comment.slug}.`
    },
    to: 'authorities@cannedmeat.gov',
    subject: 'Creepy comment alert'
  });

  numReported++;
  return next();
});

sails.log(`Successfully reported ${numReported} creepy comments.`);
return exits.success();
```



##### Batch-at-a-time

If we ran the code in the previous example, we'd be sending one email per creepy comment... which could be a lot!  Not only would this be slow, it could mean sending _thousands_ of individual API requests to our [transactional email provider](https://documentation.mailgun.com/faqs.html#why-not-just-use-sendmail-postfix-courier-imap), quickly overwhelming our API rate limit.

Fortunately, there are a few easy changes we can make to our script to solve this.  Let's try again; but this go-round, instead of processing individual records one at a time, we'll receive and process them as batches:

```js
// e.g. in a shell script, batch at a time
var numReported = 0;
var numEmailsSent = 0;

await Comment.stream({
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
.eachBatch(async (someCreepyComments, next)=>{

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

  await sails.helpers.sendTemplateEmail.with({
    template: 'email-creepy-comment-digest',
    templateData: {
      urls: _.reduce(someCreepyComments, function (memo, creepyComment){
        memo += ' • ' + `https://blog.example.com/${creepyComment.fromBlogPost.slug}/comments/${creepyComment.slug}.` + '\n';
        return memo;
      }, '')
    },
    to: 'authorities@cannedmeat.gov',
    subject: 'Creepy comment alert: daily digest',
  });

  numReported += someCreepyComments.length;
  numEmailsSent++;

  return next();

})//~∞%°

sails.log('Successfully reported '+numReported+' creepy comment(s)-- spread across '+numEmailsSent+' different emails.');
return exits.success();
```


### Notes
> + This method can be used with [`await`](https://github.com/mikermcneil/parley/tree/49c06ee9ed32d9c55c24e8a0e767666a6b60b7e8#usage), promise chaining, or [traditional Node callbacks](https://sailsjs.com/documentation/reference/waterline-orm/queries/exe
> + Internally, regardless whether you're using `.eachBatch()` or `.eachRecord()`, Waterline grabs pages of 30 records at a time.
> + Just like async.eachSeries(), this method bails and throws an error (or calls its .exec() callback with an error) _immediately_ upon receiving the first error from any iteratee.
> + `.stream()` runs the provided iteratee function on each record or batch, one at a time, in series.
> + Prior to Sails v1.0 / Waterline 0.13, this method had a lower-level interface, exposing a [Readable "object stream"](http://nodejs.org/api/stream.html).  This was powerful, but tended to be error-prone.  So the new, adapter-agnostic `.stream()` does not rely on emitters, or any particular flavor of Node streams.  (Need to get it working the old way?  Don't worry, with a little code, you can still easily build a streams2/streams3-compatible Readable "object stream" using the new interface.)
> + Read more about `.stream()` [here](https://gist.githubusercontent.com/mikermcneil/d1e612cd1a8564a79f61e1f556fc49a6/raw/094d49a670e70cc38ae11a9419314542e8e4e5c9/streaming-records-in-sails-v1.md), including additional examples, background information, and implementation details.


<docmeta name="displayName" value=".stream()">
<docmeta name="pageType" value="method">


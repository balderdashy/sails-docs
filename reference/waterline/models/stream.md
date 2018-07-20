# .stream()

Stream records from your database one at a time or in batches, without first having to buffer the entire result set in memory.

```usage
await Something.stream(criteria)
.eachRecord(async (record)=>{

});
```


### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | _criteria_          | ((dictionary))    | The [Waterline criteria](https://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database.

##### Iteratee

_Use one of the following:_

+ `.eachRecord(async (record)=>{ ... })`
+ `.eachBatch(async (batch)=>{ ... })`

<br/>

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 | record _or_ batch   | ((dictionary)) _or_ ((array))      | The current record, or the current batch of records.  _A batch will always contain at least one (and no more than thirty) records._


> Note that prior to Sails 1.1.0, the recommended usage of `.stream()` expected the iteratee to invoke a callback (`next`), which is provided as the second argument.  This is no longer necessary as long as you do not actually include a second argument in the function signature.


##### Errors

|     Name        | Type                | When? |
|:----------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError      | ((Error))           | Thrown if something invalid was passed in.
| AdapterError    | ((Error))           | Thrown if something went wrong in the database adapter.
| Error           | ((Error))           | Thrown if anything else unexpected happens.

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.


### When should I use this?

The `.stream()` method is almost exactly like [`.find()`](https://sailsjs.com/documentation/reference/waterline-orm/models/find), except that it fetches records one batch at a time.  Every time a batch of records is loaded, the iteratee function you provided is called one or more times.  If you used `.eachRecord()`, your per-record function will be called once for each record in the batch.  Otherwise, using `.eachBatch()`, your per-batch function will be called once with the entire batch.

This is useful for working with very large result sets; the kinds of result sets that might overflow your server's available RAM... at least, they would if you tried to hold the entire thing in memory at the same time.  You can use Waterline's `.stream()` method to do the kinds of things you might already be familiar with from Mongo cursors: preparing reports, looping over and modifying database records in a shell script, moving large amounts of data from one place to another, performing complex transformations, or even orchestrating map/reduce jobs.


### Examples

There are 4 examples below.

##### Basic usage

An action that iterates over users named Finn in the database, one at a time:

```javascript
await User.stream({name:'Finn'})
.eachRecord(async (user)=>{

  if (Math.random() > 0.5) {
    throw new Error('Oops!  This is a simulated error.');
  }

  sails.log(`Found a user ${user.id} named Finn.`);
});
```

##### Generating a dynamic sitemap

An action that responds with a dynamically-generated sitemap:

```javascript
// e.g. in an action that handles `GET /sitemap.xml`:

var sitemapXml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

await BlogPost.stream()
.limit(50000)
.sort('title ASC')
.eachRecord((blogPost)=>{
  sitemapXml += (
    '<url>\n'+
    '  <loc>https://blog.example.com/' + _.escape(encodeURIComponent(blogPost.slug))+'</loc>\n'+
    '  <lastmod>'+_.escape(blogPost.updatedAt)+'</lastmod>\n'+
    '<changefreq>monthly</changefreq>\n'+
    '</url>'
  );
});

sitemapXml += '</urlset>';
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
.eachRecord(async (comment)=>{

  var isCreepyEnoughToWorryAbout = comment.rawMessage.match(/creepy/) && comment.attachedFiles.length > 1;
  if (!isCreepyEnoughToWorryAbout) {
    return;
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
});

sails.log(`Successfully reported ${numReported} creepy comments.`);
```


##### Batch-at-a-time

If we ran the code in the previous example, we'd be sending one email per creepy comment... which could be a lot!  Not only would this be slow, it could mean sending _thousands_ of individual API requests to our [transactional email provider](https://documentation.mailgun.com/faqs.html#why-not-just-use-sendmail-postfix-courier-imap), quickly overwhelming our API rate limit.

For this case, we could use `.eachBatch()` to grab the entire batch of records being fetched, rather than processing individual records one at a time; dramatically reducing the number of necessary API requests.



### Notes
> + This method can be used with [`await`](https://github.com/mikermcneil/parley/tree/49c06ee9ed32d9c55c24e8a0e767666a6b60b7e8#usage), promise chaining, or [traditional Node callbacks](https://sailsjs.com/documentation/reference/waterline-orm/queries/exec)
> + Internally, regardless whether you're using `.eachBatch()` or `.eachRecord()`, Waterline grabs pages of 30 records at a time.
> + Just like async.eachSeries(), this method bails and throws an error (or calls its .exec() callback with an error) _immediately_ upon receiving the first error from any iteratee.
> + `.stream()` runs the provided iteratee function on each record or batch, one at a time, in series.
> + Prior to Sails v1.0 / Waterline 0.13, this method had a lower-level interface, exposing a [Readable "object stream"](http://nodejs.org/api/stream.html).  This was powerful, but tended to be error-prone.  So the new, adapter-agnostic `.stream()` does not rely on emitters, or any particular flavor of Node streams.  (Need to get it working the old way?  Don't worry, with a little code, you can still easily build a streams2/streams3-compatible Readable "object stream" using the new interface.)
> + Read more about `.stream()` [here](https://gist.githubusercontent.com/mikermcneil/d1e612cd1a8564a79f61e1f556fc49a6/raw/094d49a670e70cc38ae11a9419314542e8e4e5c9/streaming-records-in-sails-v1.md), including additional examples, background information, and implementation details.


<docmeta name="displayName" value=".stream()">
<docmeta name="pageType" value="method">


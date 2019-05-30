# req.file()

Build and return a [Skipper Upstream](https://github.com/balderdashy/skipper/tree/b0f99c526b6664a2e867e3ef0bafcfff35e6fba2#what-are-upstreams) representing an incoming multipart file upload from the specified `field`.

```usage
req.file(field);
```


### Usage


|   |          Argument           | Type                | Details                                                                      |
|---|-----------------------------|:-------------------:|------------------------------------------------------------------------------|
| 1 |        `field`              |   ((string))        | The name of the file parameter to listen on for uploads; e.g. `avatar`.      |



### Details

`req.file()` comes from [Skipper](https://github.com/balderdashy/skipper), an opinionated variant of the original Connect body parser that allows you to take advantage of high-performance, streaming file uploads without any dramatic changes in your application logic.

This is a great simplification, but comes with a minor caveat:  **Text parameters must be included before files in the request body.**  Typically, these text parameters contain string metadata which provides additional information about the file upload.

Multipart requests to Sails should send all of their **text parameters**. before sending _any_ **file parameters**.  For instance, if you're building a web frontend that communicates with Sails, you should include text parameters _first_ in any form upload or AJAX file upload requests.  The term "text parameters" refers to the metadata parameters you might send along with the file(s) providing some additional information about this upload.


### How It Works

Skipper treats _all_ file uploads as streams.  This allows users to upload monolithic files with minimal performance impact and no disk footprint, all the while protecting your app against nasty denial-of-service attacks involving tmp files.

When a multipart request hits your server, instead of writing temporary files to disk, Skipper buffers the request just long enough to run your app code, giving you an opportunity to "plug in" to a compatible blob receiver.  If you don't "plug in" the data from a particular field, the Upstream hits its "high water mark", the buffer is flushed, and subsequent incoming bytes on that field are ignored.

### Example

In a controller action or policy:

```javascript
// See the Skipper README on GitHub for usage documentation for `.upload()`, including
// a complete list of options.
req.file('avatar').upload(function (err, uploadedFiles){
  if (err) return res.serverError(err);
  return res.json({
    message: uploadedFiles.length + ' file(s) uploaded successfully!',
    files: uploadedFiles
  });
});
```


### Notes
> + Remember that the client request's **text parameters must be sent first**, before the file parameters.
> + `req.file()` supports multiple files sent over the same field, but it's important to realize that, as a consequence, the Upstream it returns is actually a stream (buffered event emitter) of potential binary streams (files). Specifically, an [`Upstream`](https://github.com/balderdashy/skipper/tree/b0f99c526b6664a2e867e3ef0bafcfff35e6fba2#what-are-upstreams) is a [Node.js Readable stream](http://nodejs.org/api/stream.html#stream_class_stream_readable) in "object mode", where each object is itself an incoming multipart file upload stream.
> + If you prefer to work directly with the Upstream as a stream of streams, you can omit the `.upload()` method and bind "finish" and "error" events (or use `.pipe()`) instead.  [Under the covers](https://github.com/balderdashy/skipper/blob/b0f99c526b6664a2e867e3ef0bafcfff35e6fba2/standalone/Upstream/prototype.upload.js), all `.upload()` is doing is piping the **Upstream** into the specified receiver instance, then running the specified callback when the Upstream emits either a `finish` or `error` event.






<docmeta name="displayName" value="req.file()">
<docmeta name="pageType" value="method">

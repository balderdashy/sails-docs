# Migration Guide

> _**Note:** You are viewing the Sails.js v0.10.x documentation.  If you're looking for information on v0.8.x or v.0.9.x, you'll be asked to leave._

- Response config files (i.e. `config/500.js`) have been superceded in Sails v0.10.
  - Please define a "response" instead. (i.e. api/responses/serverError.js)
  - Your old handler is being ignored. (the format has been upgraded in v0.10)
- Notice: File uploads are changing, y'all.
  - `connect.multipart()` will be removed in Express 4.0 / Connect 3.0.
  - We're working on it-- for now, the default multipart body parser is still included.
  - In the mean time, for alternatives and more info, check out:
    - https://gist.github.com/mikermcneil/8249181
    - https://github.com/senchalabs/connect/wiki/Connect-3.0
  - (to silence this warning, change `config/express.js`)

## What Has Changed


## You&rsquo;re done!

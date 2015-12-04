# Amazon S3にアップロードする

>Amazon S3 bucketが'US Standard'リージョンに生成するのを忘れないで下さい。
>これを怠ると'TypeError('Uncaught, unspecified "error" event.')エラーが返ってきます。

Sailsではとても僅かな設定の追加でAmazon S3へのストリームファイルアップロードが出来ます。


まず初めに[S3 Skipper adapter](https://github.com/balderdashy/skipper-s3)をインストールします:
```sh
$ npm install skipper-s3 --save
```

次にコントローラで利用します:

```javascript
  uploadFile: function (req, res) {
    req.file('avatar').upload({
      adapter: require('skipper-s3'),
      key: 'S3 Key'
      secret: 'S3 Secret'
      bucket: 'Bucket Name'
    }, function (err, filesUploaded) {
      if (err) return res.negotiate(err);
      return res.ok({
        files: filesUploaded,
        textParams: req.params.all()
      });
    });
  }
```

<docmeta name="displayName" value="Uploading to S3">

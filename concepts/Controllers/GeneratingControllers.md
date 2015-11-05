# コントローラを生成する

以下のようにタイプすることで[Sailsコマンドラインツール](http://sailsjs.org/documentation/reference/cli)を使ってお手軽にコントローラを生成することが出来ます:

```sh
$ sails generate controller <controller name> [action names separated by spaces...]
```

例えば以下のコマンドを実行すると:

```sh
$ sails generate controller comment create destroy tag like
info: Generated a new controller `comment` at api/controllers/CommentController.js!
```

Sailsは`api/controllers/CommentController.js`を生成します:

```javascript
/**
 * CommentController.js
 *
 * @description :: Server-side logic for managing comments.
 */

module.exports = {

  /**
   * CommentController.create()
   */
  create: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.destroy()
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.tag()
   */
  tag: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.like()
   */
  like: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  }
};
```


<docmeta name="displayName" value="Generating Controllers">

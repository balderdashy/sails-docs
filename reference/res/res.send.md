# res.send()

シンプルなリクエストを送信します。`statusCode`はデフォルトで200 ("OK")になります。

このメソッドは多くのターミナルレスポンスのメソッドの裏側で利用されています。

### 使い方
```javascript
return res.send([statusCode,] body);
```


### 詳細
このメソッドはContent-Lengthが事前に定義されていない時に自動で割り当てたり、自動的なHEADとHTTPの更新サポートなど、シンプルで、ストリーミングでないレスポンスに必要な数えきれないほど多くのタスクを提供します。

バッファが与えられた時、Content-Typeには以下のように事前に定義された時を除き"application/octet-stream"がセットされます:

```javascript
res.set('Content-Type', 'text/html');
res.send(new Buffer('some html'));
```
文字列が与えられた時、Content-Typeには"text/html"がセットされます:

```javascript
res.send('some html');
```
配列またはオブジェクトが与えられた時、ExpressはJSON表現でレスポンスします。:

```javascript
res.send({ user: 'tobi' })
res.send([1,2,3])
```
最後に、事前にNodyが与えられることなく数字が与えられた場合、レスポンスボディ文字列が割り当てられます。例えば200が文字列「OK」とともにレスポンスされたり、404「Not found」だったりという感じにです。

```javascript
res.send(200)
res.send(404)
res.send(500)
```


### 例
```javascript
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
```


### Notes
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。



<docmeta name="uniqueID" value="ressend588955">
<docmeta name="displayName" value="res.send()">


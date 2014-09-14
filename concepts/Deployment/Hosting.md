# ホスティング

Sails.jsをサポートしているホスティングプロバイダの一部をリストにしました。

##### Modulusにデプロイする

+ http://blog.modulus.io/sails-js

##### Deploying to NodeJitsu?NodeJitsuにデプロイする

NodeJitsuにデプロイするにはちょっとした設定変更が必要です。:

appフォルダの中の`config/local.js`を開きここに以下の行を加えてください。 

```
    // Port this Sails application will live on
	port: 80,
	host: 'subdomain.jit.su',
```

`host:`は元々記述されていませんのでこれを追加する必要があります。Nodejitsuは`jitsu deploy`を実行するときに`subdomein`サブドメインを聞いてきます。

+ https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/
+ https://github.com/balderdashy/sails/issues/455

##### OpenShiftにデプロイする
OpenShiftにデプロイするにはちょっとした設定変更が必要です。:
appフォルダの中の`config/local.js`を開きここに以下の行を加えてください。 

```
	port: process.env.OPENSHIFT_NODEJS_PORT,
	host: process.env.OPENSHIFT_NODEJS_IP,
```

##### DigitalOceanを使う

+ https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab

##### Herokuにデプロイする

+ [SailsCasts: Deploying a Sails App to Heroku](http://irlnathan.github.io/sailscasts/blog/2013/11/05/building-a-sails-application-ep26-deploying-a-sails-app-to-heroku/)
+ https://groups.google.com/forum/#!topic/sailsjs/vgqJFr7maSY
+ https://github.com/chadn/heroku-sails
+ http://dennisrongo.com/deploying-sails-js-to-heroku/#.UxQKPfSwI9w
+ http://stackoverflow.com/a/20184907/486547

##### AWSにデプロイする

+ http://blog.grio.com/2014/01/your-own-mini-heroku-on-aws.html
+ http://serverfault.com/questions/531560/creating-an-sails-js-application-on-aws-ami-instance
+ http://bussing-dharaharsh.blogspot.com/2013/08/creating-sailsjs-application-on-aws-ami.html
+ http://cloud.dzone.com/articles/how-deploy-nodejs-apps-aws-mac

##### PM2を使う

+ http://devo.ps/blog/2013/06/26/goodbye-node-forever-hello-pm2.html


##### CloudControlにデプロイする

+ https://www.cloudcontrol.com/dev-center/Guides/NodeJS/Sailsjs



##### 専門家の手助けを求める


最近、パワフルなアプリケーションにデプロイするのはだんだんと簡単になってきています。とは言え常にそれを自分でやる時間があるとは限りません。
Sails.jsは私（訳注：原著者）がテキサス州Austinで経営するNode.jsのコンサルタント会社である[Balderdash](http://balderdash.co)によってメンテナンスされています。もしあなたの会社が専門家の手助けを必要とする時はご連絡いただければ喜んでお手伝いします。デプロイはホントはそんなに難しいものではなく2〜3時間以上をかけるようなものではあえりません。



<docmeta name="uniqueID" value="Hosting276234">
<docmeta name="displayName" value="Hosting">


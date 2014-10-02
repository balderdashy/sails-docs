# 託管（Hosting）

以下是不完整的 Sails.js 託管服務供應商清單。

##### 部署到 Modulus？

+ http://blog.modulus.io/sails-js

##### 部署到 NodeJitsu？
要部署到 NodeJitsu，你需要稍微修改設定檔：
在應用程式資料夾開啟 `config/local.js`。你需要加入以下幾行到此設定檔。

```
// Port this Sails application will live on
port: 80,
host: 'subdomain.jit.su',
```

`host:` 不是預設建立的屬性。你需要加入這個屬性。當執行 `jitsu deploy` 時，Nodejitsu 會詢問你的 `subdomain`

+ https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/
+ https://github.com/balderdashy/sails/issues/455

##### 部署到 OpenShift？
要部署到 OpenShift，你需要稍微修改設定檔：
在應用程式資料夾開啟 `config/local.js`。你需要加入以下幾行到此設定檔。

```
port: process.env.OPENSHIFT_NODEJS_PORT,
host: process.env.OPENSHIFT_NODEJS_IP,
```

##### 使用 DigitalOcean？

+ https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab

##### 部署到 Heroku？

+ [SailsCasts：Deploying a Sails App to Heroku](http://irlnathan.github.io/sailscasts/blog/2013/11/05/building-a-sails-application-ep26-deploying-a-sails-app-to-heroku/)
+ https://groups.google.com/forum/#!topic/sailsjs/vgqJFr7maSY
+ https://github.com/chadn/heroku-sails
+ http://dennisrongo.com/deploying-sails-js-to-heroku/#.UxQKPfSwI9w
+ http://stackoverflow.com/a/20184907/486547

##### 部署到 AWS？

+ http://blog.grio.com/2014/01/your-own-mini-heroku-on-aws.html
+ http://serverfault.com/questions/531560/creating-an-sails-js-application-on-aws-ami-instance
+ http://bussing-dharaharsh.blogspot.com/2013/08/creating-sailsjs-application-on-aws-ami.html
+ http://cloud.dzone.com/articles/how-deploy-nodejs-apps-aws-mac

##### 使用 PM2？

+ http://devo.ps/blog/2013/06/26/goodbye-node-forever-hello-pm2.html


##### 部署到 CloudControl？

+ https://www.cloudcontrol.com/dev-center/Guides/NodeJS/Sailsjs



##### 取得專業協助

這些日子以來，擁有一定技術的情況下，部署強大的應用程式變得越來越簡單。儘管如此，你不一定有時間來自己處理這些事情。
Sails.js 是由我的公司維護，[Balderdash](http://balderdash.co)，一間在美國德州奧斯丁的 Node.js 顧問公司。如果你的公司需要專業協助，我們很樂意提供幫助。部署不是很困難，而且在大多情況下，它不應該超過幾個小時。



<docmeta name="uniqueID" value="Hosting276234">
<docmeta name="displayName" value="Hosting">


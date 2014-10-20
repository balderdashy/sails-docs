# Associations

Sails와 Waterline을 함께 사용하면, 다양한 데이터 저장소를 넘나들어 관계를 지정할 수 있다. 예를들어, 사용자 데이터는 [PostgreSQL](http://www.postgresql.org/)에 들어있고, 사용자들의 사진은 [MongoDB](http://www.mongodb.com/)에 들어있다 하더라도, 마치 같은 데이터 베이스를 사용하는것처럼 그것들을 상호작용 할 수 있다는 의미이다. 또한 같은 아답터를 사용해서, 다른 [접속](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html)을 통해서도 관계를 맺을 수 있다. 예를들면, 회사의 데이터 센터에 있는 [MySQL](http://www.mysql.com/) 데이터베이스에 레시피를 접근하고 업데이트 할 필요가 있고, 관련 구성 데이터는 클라우드에 있는 새로운 MySQL 데이터 베이스에서 뽑아와야할때 유용하다.

<docmeta name="uniqueID" value="Associations913185">
<docmeta name="displayName" value="Associations">


# Dominance
## Example Ontology


```javascript
// User.js
module.exports = {
  connection: 'ourMySQL',
  attributes: {
    email: 'string',
    wishlist: {
      collection: 'product',
      via: 'wishlistedBy'
    }
  }
};
```


```javascript
// Product.js
module.exports = {
  connection: 'ourRedis',
  attributes: {
    name: 'string',
    wishlistedBy: {
      collection: 'user',
      via: 'wishlist'
    }
  }
};
```

### 문제점

교차 아답터의 관계파악은 쉽다. 이것은 사용자와 상품 사이의 다대다 ( `N->...` ) 관계이다. 또 있을법한 다른 관계를 생각해 볼 수 있다. (예를들면, 구매) 그러나 이 예에서는 매게자를 사용한 모델링이 더 잘표연할수 있기때문에, 간단하게 구성해보았다.

어쨋든, 이것들은 훌륭하다... 그러나 어디에 관계 데이터가 저장되어있을까? 만약 SQL 지향적인 명칭이 마음에 들지 않는다면 "ProductUser" 일것이다. 우리는 한쪽이나, 다른한쪽에 그것이 저장될것이라는걸 알고 있지만, 만약 이것을 우리가 컨트롤 하고 싶다면 어떻게 할것인가?

> **중요 주의사항**
>
> 이것은 _양쪽다 관계정의 항에 `via`가 명시 되어 있기때문에 발생한 문제_이다.
> `via`가 없다면, 컬렉션의 속성은 `dominant: true`인것으로 해석된다.
> 더 자세한 사항은 아래의 FAQ를 볼것


## 해결책 

결국, 테이블을 조인하기 위해서 제3의 커넥션/아답터를 명시함으로써 해결될지도 모른다. 지금부터 우리는 한쪽이나 다른 한쪽을 선택하는것에 집중하겠다.


우리는 어떠한 크로스-아답터 모델 관계에서 이러한 개념을 "dominance"라고 정의하였다. 한쪽은 dominant로 가정한다. 이것은 서로 국적이 다른 부모 밑에서 태어난 아이가 [시민권](http://en.wikipedia.org/wiki/Japanese_nationality_law)을 획득하기 위해서는 반드시 하나를 선택해야 하는것과 유사하다.

다시 ontology로 돌아가서, 이번에는 MySQL 데이터 베이스를 "dominant"로 지정하겠다. 이것의 "ProductUser" 관계 "테이블"은 MySQL 테이블로 저장이 된다는 의미이다.


```javascript
// User.js
module.exports = {
  connection: 'ourMySQL',
  attributes: {
    email: 'string',
    wishlist: {
      collection: 'product',
      via: 'wishlistedBy',
      dominant: true
    }
  }
};
```


```javascript
// Product.js
module.exports = {
  connection: 'ourRedis',
  attributes: {
    name: 'string',
    wishlistedBy: {
      collection: 'user',
      via: 'wishlist'
    }
  }
};
```


## "dominant" 선택하기

당신의 결정에 영향을 미칠 다양한 요인들:

+ 만약 한쪽이 SQL 데이터베이스라면, 관계 테이블을 쿼리를 좀더 효과적으로 허용하는 SQL에 두어라, 왜냐하면 관계 테이블은 다른 쪽와 통신하기전에 조인될 수 있기때문이다. 이것은 총 쿼리의 수를 셋에서 둘로 줄인다.
+ 만약 한쪽 접속이 다른쪽보다 훨씬 빠르고, 그외 다른것들은 모두 같을때에는 관계테이블을 그쪽에 두는것이 맞다.
+ 만약 하나의 커넥션을 훨씬 쉽게 이전 할수 있다면, 그 사이드를 `dominant`로 설정해라. 비슷하게, 정규화 혹은 컴파일런스 이슈 또한 결정에 영향을 미칠 수 있다. 만약 관계에서 민감한 환자정보가 포함되어 있다면 (예를들어, `Patinet`와 `Medicine`사이의 관계), 모든 관련 데이터는 한쪽 데이터베이스에 저장이 되어야만 할것이다.
+ 같은 조건들 사이에서, 한쪽이 읽기 전용 (이전 예제의 읽기전용 벤더 데이터 베이스에 연결된 `Medicine` 처럼)이라면, 당연히 그곳에는 쓰기가 불가능할 것이기 때문에, 관계 데이터가 다른쪽에서 유지될 수 있는지 확인해야한다.


## FAQ


##### 만약 한쪽에서 `via`가 존재하지 않는다면 어떻게 해야하나?

> 만약 `collection` 관계가 `via` 설정을 가지고 있지 않는다면, 자동적으로 `dominant: true`가 설정된다.

##### 만약 두쪽다 `via`가 존재하지 않는다면?

> If both `collections` don't have `via`, then they are not related.  Both are `dominant`, because they are separate relationship tables!!
> 만약 양쪽 `collections`가 `via`를 가지고 있지 않으면, 그들은 관계되어있지 않다. 둘다 `dominant`가 되는데, 왜냐하면 나눠진 관계 테이블이다.

##### `model` 관계란 무엇인가?

> In all other types of associations, the `dominant` property is prohibited.  Setting one side to `dominant` is only necessary for associations between two models which have an attribute like: `{ via: '...', collection: '...' }` on both sides.
> 모든 관계의 다른 타입들에서, `dominant` 속성은 금지되어 있다. 한쪽편에 `dominant`를 설정하는것은 오직 두 모델 속성이 모두 `{ via: '...', collection: '...' }`가지고 있는 관계에서만 필요하다. 


##### 모델이 한 속성에서는 dominant가 되고 다른 속성에서는 그렇지 않을수 있나?
> "dominant"는 오직 특정 관계의 문맥안에서만 존재한다는것을 명심해라. 모델은 하나 혹은 이상의 관계에서 dominant 될 수 있는 동시에, 다른 관계에서는 dominant가 될 수 없다.
> 예를들면, `User`가 `Toy`테이블의 `favoriteTodyOf`를 통해 `favoriteToys`라고 명명된 장난감 컬랙션을 가지고 있고, `User` 테이블의 `favoriteToys`의 속성이 `dominant: ture`이면, `Toy`는 여전이 다른 방법에서도 dominant이다. 그렇기때문에 `Toy`는 `dominant:ture`라고 된 `designedBy`의 속성을 통해 `User`와 연관이 될것이다.


##### 양쪽 모델이 dominant가 될 수 있나?

> 불가능하다. 만약 양쪽 모델이 크로스-아답터/크로스-접속 관계이고, 다대다 관계는 `dominant: true`를 설정한다면, 서버를 시작하기전에 에러가 날것이다.


##### 양쪽 모두 dominant가 안될수도 있나?

> 만약 양쪽 모델 전부가 크로스아답터에/크로스커넥션이 아니면, 다대다 관계는 `dominant: true`를 설정한다, 서버어플리케이션이 시작하기전에 경고메시지가 나올것이며, 관계의 특성에 근거하여 자동적으로 만들어 질것이다. 현재에는, 알파벳 순으로 제멋대로 결정한다.

##### 논크로스아답터 관계란 무엇인가?

> `dominant` 속성은 논크로스아답터/논크로스접속 관계에서는 무시된다. 잘못된 다중 접속 스키마를 계획한것으로 간주하며, 능동적인것을 막을 이유는없다. 덧붙여서, 미래에 그렇게 될지도 모르는 상황이 될때, 그 옵션은 활성화 될것이다.


<docmeta name="uniqueID" value="Dominance904539">
<docmeta name="displayName" value="Dominance">


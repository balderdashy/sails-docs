# Partials

Sails는 뷰 렌더링 코드에서 `ejs-locals`을 사용하기 때문에, 뷰에서는 아래와 같이 할수있다.

```
<%- partial ('foo.ejs') %> 
```

이것은 `/views/foo.ejs`에 위치한 부분 뷰를 렌더링하게된다. 모든 로컬들은 저 부분 뷰를 자동적으로 보낸다.

부분 뷰를 로딩하는데, 상대적인 경로를 사용할 수도 있다. `/views/users/view.ejs` 뷰에서, `/views/partials/widget.ejs`를 불러오고 싶다면 아래와 같이 하면된다:

```
<%- partial ('../../partials/widget.ejs') %> 
```

한가지 주의할점: 부분뷰를 렌더링하는 과정은 동기적으로 이루어지기 때문에, 로딩이 끝날때까지 서버는 응답하지 않을것이다. 이것은 특히 많은 접속자수를 지닌 어플리케이션을 개발하는데 꼭 명심해야할점이다.

주의: ejs외에 다른 템플릿 언어를 사용한다면, 그 언어에 맞는 부분 뷰를 로딩하는 문법이 있을것이다. 그렇다면 그것을 사용해야한다. 다른 언어의 문법 및 관습에대한 정보는 다른 언어의 문법을 참조하길 바란다.

<docmeta name="uniqueID" value="Partials610916">
<docmeta name="displayName" value="Partials">


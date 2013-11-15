# Criterea Object
### Purpose
A Criterea Object contains the information used to retrieve your desired query results.  

Criterea Objects are passed as parameters in the methods that perform CRUD operations, like .find() and .destroy() .


### Structure
Criterea objects are composed of Query Pairs.  This is what they look like.
##### Normal Pair
The key is a model attribute and the value is what you want to search for.

like this
```javascript
	// `Model Attribute Name` : 'Some Value'
	
	name : 'walter'
```

##### Modified Pair
Modified pairs also have model attributes for keys but they also use <a href=""> Query Modifiers </a> to perform additional useful operations.
		
like this
```javascript
		/*
		`Model Attribute Name` : {
			' `Query Modifier` ' : 'Some Value'}
		}
		*/

		name : {
			'contains' : 'alt' }
```

##### 'In' Pair
These work similarly to mysql 'in queries'.  Each element in the array is treated as 'or'.

like this
```javascript
		// `Model Attribute Name` : ['Some Value', 'Some Value']

		name : ['Walter','Skyler']
```

##### 'Or' Pair
These can contain any number of normal or modified 'query pair's returning records when any of them are matched.

like this
```javascript
		// or : [`normalPair`, `modifiedPair', `normalPair`]
		or : ['Skyler',{ name : {
						'contains' : 'alt'} },'Flynn']
```

### Forming Criterea Objects
#### Rules
- Criterea Objects can contain any number of 'Normal', 'Modified', or 'In' Query Pairs but only 1 'Or' Query Pair.
- Each pair must match a record otherwise that record isn't returned.  Pairs are treated as 'and' in your query.
- All attribute values searched for are case INsensitive.  You can't find Mike without also getting mikE.

### Criterea Object Examples.

I want records where 'name' is 'Walter' and 'age' is 45.
```javascript

var myCriterea = {
		name: 'walter',
		age: 45
	}

```
I want records where 'name' contains 'yle' if they have 'age' 40.
```javascript

var myCriterea = {
		name : { 'contains' : 'yle' },
		age: 40
	}

```

I want records where 'name' is 'Walter' or 'profession' is 'cook' but only if their 'age' is at least 45.
```javascript

var myCriterea = {
		or : [{'name':'walter'},{'profession':'cook'}],
		age: {'>=':45}
	}

```


I want records where 'name' is 'Walter' or 'jessie'.  They must be a 'cook' and their 'age' must be either 45 or 28.
```javascript

var myCriterea = {
		name: ['walter','jessie'],
		profession: 'cook',
		age: {'>=':45}
	}

```

I want records where either the 'name' is 'walter' or 'jessie', their 'profession' is 'cook', and they are at least 35

or

I want records where the 'name' is 'skyler' and their 'profession' is 'accountant' or 'car wash professional'. 
```javascript 
var myCriterea = {
		or: [{
			name:['walter','jessie'],
			profession:'cook',
			age:{'>=':35}
			},{
			name:'skyler',
			profession:['accountant','car wash professional']
			}]
	}
```

### Notes
> The query modifiers may not work on the 'id' attribute with certain adapters (like mongo) because of the way they are treated by their respective databases.
> You cannot use more than one query modifier in a 'modified' Query Pair .  This restriction might be lifted in future versions.

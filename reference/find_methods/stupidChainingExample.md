### Chaining Example with .update()

```javascript

  // Users found before the Update

sails> Users.find().exec(console.log)

  null [
  { name: 'Bill',
    createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    updatedAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    id: '5285719941d1fb2b15000007' },
  { name: 'Cat',
    createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    updatedAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    id: '5285719941d1fb2b15000008' },
  { name: 'Katherine',
    createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    updatedAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    id: '5285719941d1fb2b15000009' } ]
    
sails> Users.update({name:['Bill','Katherine']},{name:'VonGreggory'}).where({name:'Bill'}).exec(console.log)

    // Although, .update() found 2 records, .where() only let 'Bill' get updated.

    [{ createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    name: 'VonGreggory',
    updatedAt: Thu Nov 14 2013 19:07:38 GMT-0600 (CST),
    id: '5285719941d1fb2b15000007' }]

sails> Users.find().exec(console.log)

  // Only 'Bill' was updated.

  [{ createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    name: 'VonGreggory',
    updatedAt: Thu Nov 14 2013 19:07:38 GMT-0600 (CST),
    id: '5285719941d1fb2b15000007' },
  { name: 'Cat',
    createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    updatedAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    id: '5285719941d1fb2b15000008' },
  { name: 'Katherine',
    createdAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    updatedAt: Thu Nov 14 2013 18:58:01 GMT-0600 (CST),
    id: '5285719941d1fb2b15000009' }]

```

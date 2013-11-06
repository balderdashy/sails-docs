# Deprecated Features
The following features are considered deprecated and should at some point be removed from the codebase

## Class Methods

### Dynamic Finder Methods

- .findOneBy`<attribute>`In()
- .findOneBy`<attribute>`Like()
- .findBy`<attribute>`In()
- .findBy`<attribute>`Like() 
- .countBy`<attribute>`In()
- .countBy`<attribute>`Like()

### CRUD Class Methods
- .findAll()
- .findOneLike()
- .findLike()
- .contains()
- .join()
- .where() This is an alias for find.  It only exists for compatibility with a very old version of waterline.  Don't use it.  Use find.  
- .select() This is also an alias for find.  It only exists for compatibility with a very old version of waterline.  Don't use it.  Use find. 
 - .findOrCreateEach()

- .join()

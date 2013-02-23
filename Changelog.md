# Sails version changelog


## Beta

### 0.8.80
+ Refactored app layout to make it a bit more straightforward.  To check out the the new folder structure, make a new project with `sails new foo`
+ Added robot.txt in new app generation
+ Bound all methods in adapter to have the right context.

### 0.8.79
+ Adapter definitions are no longer functions-- instead the direct definition object is accepted.  This makes it easier, cleaner, and more declarative to create adapters.
+ Merged waterline into main Sails repo.
+ Brought in sails-util and sails-moduleloader, moved watelrine tests into top level.
+ Attribute values in models in result sets from Waterline are now cast to numbers, if they are number-looking strings.
+ Substantial refactoring of waterline model-augmentation logic.
+ Added TODO for asynchronous module loading for future.
+ Upgraded waterline-dirty dep.


### 0.8.77
+ Patch updates the waterline-dirty dependency to deal with an issue with that adapter returning objects which map directly to the in-memory database (was causing changes made to found models to be persisted without calling .save())
# Sails version changelog


## Beta

### 0.8.77
+ Patch updates the waterline-dirty dependency to deal with an issue with that adapter returning objects which map directly to the in-memory database (was causing changes made to found models to be persisted without calling .save())
# Instance Methods

# Overview

| Method Name  |       Parameters     |     Callback Parameters     |   Is It Asyncronous?  |
| ------------ | -------------------  | --------------------------- | --------------------- |
|  .save       | callback ```function```  | ``` function ({ err } , { savedValue } )```     |       Yes    |
|  .destroy    | callback ```function```  | ``` function ( { err } )``` |       Yes     |
|  .validate   | callback ```function``` |  ``` function ( { err } )``` |       Yes      |
|  .toObject   |      none            |   ``` { cloneOfRecord } ```    |        No         |
|  .toJSON     |      none            |  ``` { cloneOfRecord } ```     |        No         |



# Class Methods - CRUD

# Overview
| Method Name  |       Parameters     | Callback Parameters 
| ------------ | -------------------  | --------------------
| .create() | - newRecords ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , newRecords)```
| .update() | - findCriterea ```{}``` or ```[{}]```<br>-updatedRecord ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , [updatedRecords] )```
| .destroy() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ```  | ```function ( Error )```
| .findOrCreate() | - findCriterea ```{}``` or ```[{}]```<br>-recordsToCreate ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , foundOrCreated)```
| .findOne() | - findCriterea ```{}```<br>- callback ``` function ``` | ```function ( Error , foundRecord)```
| .find() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , foundRecords)```
| .startsWith() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , [foundRecords])```
| .endsWith() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error , [foundRecords])```
|.validate()|- findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | `Error`|
| .count() | - findCriterea ```{}``` or ```[{}]```<br>- callback ``` function ``` | ```function ( Error, integer )```|
| .stream() | - findCriterea ```{}```<br> - ```{customMethods}``` | No callback! A node stream object is returned |


# Class Methods - Pub Sub

# Overview
| Method Name  |       Parameters     |
| ------------ | -------------------  |
| .publishCreate() | ``` recordID ``` and ``` { dataToPublish } ``` | 
| .publishUpdate() | ``` recordID ``` and ``` { dataToPublish } ``` |
| .publishDestroy() | ``` recordID ``` |
| .subscribe() | ``` { req.socket } ``` |
| .subscribe() | ``` { req.socket } ``` and ``` [ recordIDs ] ``` |
| .unsubscribe() | ``` { req.socket } ``` |
| .unsubscribe() | ``` { req.socket } ``` and ``` [ recordIDs ] ``` |


# Class Methods - Dynamic Finders

# Overview

| Method Name  |       Parameters     | Callback Parameters |
| ------------ | -------------------  | ------------------- |
|.findBy`<attribute>`()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , [foundRecords])```|
|.findOneBy`<attribute>`()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , foundRecord)```|
|.countBy`<attribute>`()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , integer )```|
|.`<attribute>`StartsWith()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , foundRecords)```|
|.`<attribute>`EndsWith()|-findCriterea ```{}``` or ```[{}]```<br>- callback ```function``` | ```function ( Error , foundRecords)```|



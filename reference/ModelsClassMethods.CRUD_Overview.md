The methods below are the basic crud methods offered.  Here is a very quick reference for each method. More detailed information can be found below.  All Methods are asyncronous.

For every class method, the callback parameter is optional.  If one is not supplied, it will return a chainable object.

### Overview
| Method Name  |       Parameters     | Callback Parameters 
| ------------ | -------------------  | --------------------
| .create() | -```newRecords {} or [{}]```<br>-```callback()``` | ```function ( Error , newRecords)```
| .update() | -```findCriterea {} or [{}]```<br>-```updatedRecord {} or [{}]```<br>-```callback()```| ```function ( Error , [updatedRecords] )```
| .destroy() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error )```
| .findOrCreate() | -```findCriterea {} or [{}]```<br>-```recordsToCreate {} or [{}]```<br>-```callback()``` | ```function ( Error , foundOrCreated)```
| .findOne() | -```findCriterea {}```<br>-```callback()```  | ```function ( Error , foundRecord)```
| .find() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , foundRecords)```
| .startsWith() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , [foundRecords])```
| .endsWith() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error , [foundRecords])```
|.validate()|-```findCriterea {} or [{}]```<br>-```callback()```| `Error`|
| .count() | -```findCriterea {} or [{}]```<br>-```callback()``` | ```function ( Error, integer )```|
| .stream() | ```findCriterea {}``` | No callback! A node stream object is returned |

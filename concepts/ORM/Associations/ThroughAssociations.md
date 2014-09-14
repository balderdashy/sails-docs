# Through Associations
### Overview

Many-to-Many through associations behave the same way as many-to-many associations with the exception
of the join table being automatically created for you. This allows you to attach additional attributes
onto the relationship inside of the join table.

Unfortunately, they are not supported yet.  Don't worry though, there's an easy workaround.

You can accomplish this by using an additional model as an intermediary.  Instead of a many-to-many association between two models, you can use multiple one-to-many associations through the intermediary model.







<docmeta name="uniqueID" value="ThroughAssociations740718">
<docmeta name="displayName" value="Through Associations">


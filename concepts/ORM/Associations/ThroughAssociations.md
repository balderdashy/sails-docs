# 穿透關聯（Through Associations）
### 概觀

多對多穿透關聯的行為和多對多關聯相同，且會自動為你建立例外的連接表。這使你可以附加額外的屬性到連接表內的關聯。

不幸的是，他們尚未支援。請不要擔心，有一個簡單的解決方法。

你可以透過使用一個額外的模型為中介來實現這一目標。你可以使用多個一對多關聯到中介模型，取代兩個模型間的多對多關聯。







<docmeta name="uniqueID" value="ThroughAssociations740718">
<docmeta name="displayName" value="Through Associations">


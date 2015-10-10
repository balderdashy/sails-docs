# ジェネレータ
## ステータス

##### 状態: [2](http://nodejs.org/api/documentation.html#documentation_stability_index) - 非安定的

APIは安定途上にありますがまだ安定していると判断できるほど実世界でテストされていません。

後方互換性は、それが合理的であると判断した場合維持されます。


### 目的

この目的は何でしょうか？

### old partial content from when spec was an itty bitty baby

ジェネレータは`sails new`や`sails generate`コマンドを簡略化し、異なるGruntfilesや設定ファイル、ビューオプション、coffeescriptなどに対してより良いサポートを提供します。


#### 構造


ジェネレータは以下のうちいずれかを持っています。:

(1) `generate`メソッド、または

(2) `configure` + `render` メソッド (簡単なケースではrenderは省略可能。)


Sails 

```
	app (appPath + name)
		<- view
		<- folder
		<- jsonfile
		<- file

	api (appPath + name)
		<- controller
		<- model

	controller (appPath + template + name)
		<- file

	model (appPath + template + name)
		<- file

	view (appPath + template + name)
		<- file

	file (destination + name + template + data)

	jsonfile (destination + name + data)
	
	folder (destination + name)
```


<docmeta name="uniqueID" value="Generators82739">
<docmeta name="displayName" value="Generators">
<docmeta name="stabilityIndex" value="2">

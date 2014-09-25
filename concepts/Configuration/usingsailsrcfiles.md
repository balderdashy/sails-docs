# 使用 .sailsrc 檔案（Using .sailsrc Files）


除了設定應用程式的其他方法外，從 0.10 版開始，你可以在 `.sailsrc` 檔案裡為指定一個或多個應用程式的設定（感謝 Dominic Tarr 的優秀 [`rc` 模組](https://github.com/dominictarr/rc)）。`rc` 檔案對於設定命令列和/或套用組態設定到所有執行在你電腦上的 Sails 應用程式最有用。

當 Sails 命令列介面執行一個指令時，它會先在當前目錄和你的家目錄（即 `~/.sailsrc`）（任何新建立的 Sails 應用程式附帶的樣版 `.sailsrc` 檔案）尋找 `.sailsrc` 檔案（JSON 或 [.ini](http://en.wikipedia.org/wiki/INI_file) 格式）。然後將它們合併到現有的組態設定。

> 其實，Sails 會從其它幾個地方尋找 `.sailsrc` 檔案（遵循 [rc 慣例](https://github.com/dominictarr/rc#standards)）。你可以放置 `.sailsrc` 檔案到這些路徑。也就是說，你最好能遵循慣例，放置公用 `.sailsrc` 檔案的地方是你的家目錄（即 `~/.sailsrc`）。




<docmeta name="uniqueID" value="sailsrc374211">
<docmeta name="displayName" value="Using `.sailsrc` Files">


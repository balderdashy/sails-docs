var spawn = require('child_process').spawn;
var fs = require('fs');
// Script Options 
var docsRepo = 'git@github.com:balderdashy/sails-docs.git';
 muOptions = {
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false,
	langPrefix: 'lang-'};
var cwd = require('path').dirname(require.main.filename);
var getDocsDir = docsRepo.split('/');
var docsDir = getDocsDir[getDocsDir.length-1].replace('.git','');
var outline = {reference:{}};
outline = {
	reference:{
		pageTitle:'',
		pageLink:'',
		pageType:'head|sub'}};
var Ejs = function Ejs(savePath,md){
	var newFile = require('marked');
	var savePath = savePath;
	var md = md;
	this.callback = function (err, html) {
  		if (err) throw err;
  		console.log('Writing '+savePath+'.html');
		fs.writeFile(savePath+'.html', html , function writeCB(err){if (err)return new Error(err)});
	newFile(md, muOptions, this.callback);
var splitMD = function splitMD(fileArray){
	// Split each markdown file at the single hash header line
	// then send each section to be parsed and saved as a seperate html file
	var cutItUp = function cutItUp(path,bigFile){
			var splitFiles = bigFile.split(/[^#]\#[^#]/ig);
			splitFiles.forEach(function(v,i){
					var getFileName = v.match(/([^]+?)\n/)[0].replace(/[\r\t\n]/ig,'');
					var pageLink = getFileName.replace(/\s/g,'').replace(/[^a-zA-Z0-9 ]+/g, '');
					outline.reference[getFileName] = {
								pageTitle:getFileName,
								pageLink:pageLink
							};
					if (i == 0)
						outline.reference[getFileName].pageType = 'head';
					else
						outline.reference[getFileName].pageType = 'sub';
					var completePath = path+'_'+pageLink;
					var newEJS = new Ejs(completePath,'#'+v);
				});
	for (var i=0;i<fileArray.length;i++){
		var makeDirName = fileArray[i].replace(/\.md/g,'').replace(/\s/g,'').replace(/[^a-zA-Z0-9 ]+/g, '');
		var newDir = cwd+'/templates/_'+makeDirName;
		if (!fs.existsSync(newDir))
		fs.mkdirSync(newDir);
		cutItUp(newDir+'/',fs.readFileSync(fileArray[i],'utf8'));
var doClone = function doClone(err,files){
	if (err) return new Error;
	// If the repo 'sails-docs' exists locally, chdir to it then 'git pull'
	// If it doesnt exist, 'git clone' it
	console.log('Grabbing the repo.  Hold up.');
	if (files.indexOf(docsDir) > -1){
		process.chdir('sails-docs');
		cloneRepo = spawn('git', ['pull']);
		process.chdir('..');
	} else {
		cloneRepo = spawn('git', ['clone', docsRepo]);
	cloneRepo.stdout.on('data', function(d){console.log('\nInfo:'+d)});
	cloneRepo.stderr.on('data', function(d){console.log('\nError:'+d)});
	cloneRepo.on('close', function (code) {
		if (code == 0){
			console.log('Now that the repo has been cloned, lets start parsing');
			process.chdir(cwd+'/'+docsDir+'/reference/');
			fs.readdir(cwd+'/'+docsDir+'/reference/', function getFileList(err,files){
				if (err) return new Error;
				var parseThese = [];
				files.forEach(function(v){
					if (v.match(/\.md/i))
						parseThese.push(v)
				});
				splitMD(parseThese);
			});
		} else
			console.log('Sorry Homie.  Shit failed with exit code '+code);
	});
// Read CWD Contents.  Spit them into doClone
fs.readdir(cwd, doClone);

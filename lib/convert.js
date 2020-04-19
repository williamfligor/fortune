var fs = require('fs'),
    path = require('path');

var dirString = path.dirname(fs.realpathSync(__filename));

var BUILD_FOLDER = dirString + '/../build/';
var FORTUNE_FOLDER = dirString + '/../fortunes/';
var OUTPUT_FOLDER = BUILD_FOLDER + 'fortune/';

if(!fs.existsSync(BUILD_FOLDER))
    fs.mkdirSync(BUILD_FOLDER);

if(fs.existsSync(OUTPUT_FOLDER))
    removeDir(OUTPUT_FOLDER);

function doFolder(folder){
    if(!folder) folder = "";

    fs.mkdirSync(OUTPUT_FOLDER + folder);

    var files = fs.readdirSync(FORTUNE_FOLDER + folder);

    files.forEach(function(file){
        var stat = fs.statSync(FORTUNE_FOLDER + folder + file);
        if(stat.isDirectory())
            return doFolder(folder + file + '/');
        
        handleFile(folder, file);            
    });
}

function handleFile(folder, file){
    if(file.indexOf('Makefile') !== -1) return;

    file = file.trim();

    var f = fs.readFileSync(FORTUNE_FOLDER + folder + file, 'utf8');
    var quotes = f.split('%\n');

    var quotesString = JSON.stringify(quotes, null, "  ");
   
    fs.writeFileSync(OUTPUT_FOLDER + folder + '/' + file + '.json',
                     quotesString);
}

function removeDir(folder){
    var files = fs.readdirSync(folder);

    files.forEach(function(file){
        var stat = fs.statSync(folder + file);
    
        if(stat.isDirectory())
            removeDir(folder + file + '/');
        else 
            fs.unlinkSync(folder + file);
    });

    fs.rmdirSync(folder);
}

doFolder();
fs.writeFileSync(BUILD_FOLDER + '/index.js',
	'module.exports = ' + JSON.stringify(require('./loader').load())
);

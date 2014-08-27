var fs = require('fs'),
    path = require('path');

var dirString = path.dirname(fs.realpathSync(__filename));

var FORTUNE_FOLDER = dirString + '/../build/fortune/';

var fortunelist;

var load = exports.load = function(folder){
    if(!fortunelist) fortunelist = [];

    var fortunes = {};

    if(!folder) folder = "";

    var files = fs.readdirSync(FORTUNE_FOLDER + folder);

    files.forEach(function(file){
        var stat = fs.statSync(FORTUNE_FOLDER + folder + file);

        var key = path.basename(file, '.json');

        if(stat.isDirectory())
            fortunes[key] = load(folder + file + '/').map;
        else {
            var fo = JSON.parse(fs.readFileSync(FORTUNE_FOLDER + folder + file, 'utf8'));
            fortunes[key] = fo;
            fortunelist = fortunelist.concat(fo);
        }
    });

    return {'map' : fortunes,
            'list' : fortunelist};
};

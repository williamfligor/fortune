var fortunes = require('../build');

(function(){
    var fortune = {};

    var fortunes = fortunes.load();

    fortune.fortune = function(){
        var r = Math.floor(Math.random() * fortunes.list.length);
        return fortunes.list[r];
    };

    module.exports = fortune;
})();

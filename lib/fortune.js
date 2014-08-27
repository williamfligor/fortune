var loader = require('./loader');

(function(){
    var fortune = {};

    var fortunes = loader.load();

    fortune.fortune = function(){
        var r = Math.floor(Math.random() * fortunes.list.length);
        return fortunes.list[r];
    };

    module.exports = fortune;
})();

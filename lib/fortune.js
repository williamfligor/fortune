var data = require('../data/fortunes.json');

var fortunes = [];

(function walk(node) {
    Object.keys(node).forEach(function (key) {
        if (Array.isArray(node[key])) fortunes = fortunes.concat(node[key]);
        else walk(node[key]);
    });
})(data);

var fortune = {};

fortune.fortune = function () {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
};

module.exports = fortune;

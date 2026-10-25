var data = require('../data/fortunes.json');

var fortunes = [];

(function walk(node) {
    Object.keys(node).forEach(function (key) {
        if (Array.isArray(node[key])) fortunes = fortunes.concat(node[key]);
        else walk(node[key]);
    });
})(data);

function fortune() {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

// 0.1.x exported an object with a single .fortune() method, so both
// fortune() and fortune.fortune() have to keep working.
fortune.fortune = fortune;

module.exports = fortune;

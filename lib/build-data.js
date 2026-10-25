// Regenerates data/fortunes.json from the raw fortune files in fortunes/.
// The generated file is committed and ships inside the npm tarball, so
// installing this package never runs a build script.
//
//   npm run build

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var FORTUNE_FOLDER = path.join(ROOT, 'fortunes');
var OUTPUT = path.join(ROOT, 'data', 'fortunes.json');

// The npm package ships data/fortunes.json and not fortunes/, so there is
// nothing to rebuild in an installed copy. Say so and exit, rather than
// throwing an ENOENT from readdirSync.
if (!fs.existsSync(FORTUNE_FOLDER)) {
    console.log('No fortunes/ directory: this package ships prebuilt data.');
    console.log('Run `npm run build` in a git checkout to regenerate it.');
    process.exit(0);
}

function readFolder(folder) {
    var out = {};

    fs.readdirSync(path.join(FORTUNE_FOLDER, folder)).sort().forEach(function (file) {
        if (file.indexOf('Makefile') !== -1) return;

        var rel = folder ? folder + '/' + file : file;
        var full = path.join(FORTUNE_FOLDER, rel);

        if (fs.statSync(full).isDirectory()) {
            out[file] = readFolder(rel);
        } else {
            // Same delimiter the C fortune(1) uses. Every file ends with a
            // trailing %, so the last element of the split is blank; drop
            // blanks or fortune() returns an empty string.
            out[file] = fs.readFileSync(full, 'utf8').split('%\n').filter(function (text) {
                return /\S/.test(text);
            });
        }
    });

    return out;
}

var data = readFolder('');

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(data));

console.log('Wrote %s', path.relative(ROOT, OUTPUT));

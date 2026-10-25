On install nothing is built. The fortunes are committed as data/fortunes.json
and shipped in the package. In a git checkout you can add or remove files under
fortunes/ and rebuild with `npm run build`; the published package ships only the
generated data, not the raw fortune files, so there `npm run build` reports that
there is nothing to rebuild.

fortune
=======

## To install
```js
npm install fortune-teller
```

## To use
```js
var fortune = require('fortune-teller')

var fortune = fortune.fortune();
```
======

On install fortune converts the fortunes in fortunes/ into json. You can add or remove files / folders from here and rebuild using npm

Fortune for Node.js

## License

This project's code is BSD 3-Clause; see [LICENSE](./LICENSE).

The fortunes are a subset of the fortune database shipped with
[fortune-mod 1.99.1](https://github.com/shlomif/fortune-mod), not a verbatim copy
of it. That release carries no license covering the data, and the individual
quotations are not owned by this project: many are public domain or de minimis,
others are short excerpts from in-copyright works, attributed to their authors
where the source provided an attribution. Upstream's license notice and Notes
file ship verbatim in
[third-party/fortune-mod-1.99.1/](./third-party/fortune-mod-1.99.1/).

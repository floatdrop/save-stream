# save-stream

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Save stream contents and pipe it again later.

## Usage

```js
var save = require('save-stream');

var saved = save();
saved.write(1);
saved.write(2);
saved.write(3);
saved.write(4);
saved.end();

saved.load().pipe(console.log());
setTimeout(function () {
    saved.load().pipe(console.log());
}, 1000);

/* Output:
1
2
3
4
1
2
3
4
*/
```

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/save-stream
[npm-image]: http://img.shields.io/npm/v/save-stream.svg?style=flat

[travis-url]: http://travis-ci.org/floatdrop/save-stream
[travis-image]: http://img.shields.io/travis/floatdrop/save-stream.svg?branch=master&style=flat

[depstat-url]: https://david-dm.org/floatdrop/save-stream
[depstat-image]: http://img.shields.io/david/floatdrop/save-stream.svg?style=flat

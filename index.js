var through = require('through2');

module.exports = function () {
    var buffer = [];

    var passThrough = through.obj(function (obj, enc, cb) {
        buffer.push(obj);
        this.emit('data', obj);
        cb(null);
    });

    passThrough._buffer = buffer;

    passThrough.load = function () {
        var loaded = through.obj();
        buffer.map(loaded.write, loaded);
        loaded.end();
        return loaded;
    };

    return passThrough;
};

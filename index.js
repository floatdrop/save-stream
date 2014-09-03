var through = require('through2');

module.exports = function () {
    var buffer = [];
    var finished = false;
    var passThrough = through.obj(function (obj, enc, cb) {
        buffer.push(obj);
        this.emit('data', obj);
        cb(null);
    }, function (cb) {
        finished = true;
        cb();
    });

    passThrough._buffer = buffer;

    passThrough.load = function () {
        var loaded = through.obj();
        buffer.map(loaded.write, loaded);
        if (finished) {
            loaded.end();
        } else {
            passThrough.pipe(loaded);
        }
        return loaded;
    };

    return passThrough;
};

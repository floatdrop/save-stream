/* global describe, it */

var save = require('../');
var assert = require('stream-assert');
var array = require('stream-array');
require('should');

var data = require('./data.js');

describe('save-stream', function () {
    it('should act like pass through stream', function (done) {
        array(data)
            .pipe(save())
            .pipe(assert.length(data.length))
            .on('end', done);
    });

    it('should save data into buffer', function (done) {
        var saved = save();
        array(data)
            .pipe(saved)
            .on('finish', function () {
                saved._buffer.should.have.length(data.length);
                done();
            });
    });

    it('should load saved data', function (done) {
        var saved = save();
        array(data)
            .pipe(saved)
            .on('finish', function () {
                saved
                    .load()
                    .pipe(assert.length(data.length))
                    .on('end', done);
            });
    });

});

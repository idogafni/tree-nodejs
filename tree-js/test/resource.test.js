const assert = require('assert');

const Resource = require('../resource');


describe('Resource', function () {
    it('become ready', function (done) {
        new Resource((value) => {
            assert.ok(value);
            done();
        });
    });
});

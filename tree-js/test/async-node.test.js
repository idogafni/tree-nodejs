const assert = require('assert');

const Node = require('../async-node');
const { sleep } = require('./utils');


describe('AsyncNode', function () {
    this.timeout(5000);

    it('whenReady()', function (done) {
        const node = new Node();
        
        node.whenReady(() => {
            assert(node.isReady());
            done();
        });
    });

    it('whenReady() with complex hierarchy', function (done) {
        const a = new Node();
        const b = new Node();
        a.addChild(b);
        
        const c = new Node();
        a.addChild(c);

        const d = new Node();
        a.addChild(d);

        const e = new Node();
        d.addChild(e);
        
        assert.ok(!a.isReady(), 'a should not be ready');
        
        a.whenReady(() => {
            assert.ok(a.isReady(), 'a should be ready');
            assert.ok(b.isReady(), 'b should be ready');
            assert.ok(c.isReady(), 'c should be ready');
            assert.ok(d.isReady(), 'd should be ready');
            assert.ok(e.isReady(), 'e should be ready');

            done();
        });
    });

    it('addChild() after whenReady()', function (done) {
        const a = new Node();
        const b = new Node();
        a.addChild(b);
        
        const c = new Node();
        a.addChild(c);

        const d = new Node();
        a.addChild(d);
        
        assert.ok(!a.isReady(), 'a should not be ready yet');
        
        a.whenReady(() => {
            assert.ok(a.isReady(), 'a should be ready when the callback for whenReady was called');
            assert.ok(b.isReady(), 'b should be ready if a is ready');
            assert.ok(c.isReady(), 'c should be ready if a is ready');
            assert.ok(d.isReady(), 'd should be ready if a is ready');
            
            const e = new Node();
            d.addChild(e);

            const f = new Node();
            d.addChild(f);

            assert.ok(!d.isReady(), 'd should not be ready after e was added');
            assert.ok(!a.isReady(), 'a should not be ready after e was added');
            
            a.whenReady(() => {
                assert.ok(e.isReady(), 'e should be ready if a is ready');

                done();
            });
        });
    });

    it('removeChild() after whenReady()', function (done) {
        const a = new Node();
        
        const b = new Node();

        const c = new Node();
        b.addChild(c);
        
        assert.ok(!a.isReady(), 'a should not be ready yet');
        assert.ok(!b.isReady(), 'b should not be ready yet');
        
        b.whenReady(async () => {
            a.addChild(b);

            const d = new Node();
            b.addChild(d);
    
            assert.ok(c.isReady(), 'c should not be affected after d was added');
            assert.ok(!b.isReady(), 'b should not be ready after d was added');
            assert.ok(!a.isReady(), 'a should not be ready after d was added');

            a.whenReady(() => {
                assert.ok(!d.isReady(), 'd should not be ready yet when a becomes ready');
                assert.ok(a.isReady(), 'a should be ready after d was removed');
                
                done();
            });

            await sleep(100); // not enough time for d to become ready

            b.removeChild(d); // remove d *before* it had a chance to become ready
        });
    });
});

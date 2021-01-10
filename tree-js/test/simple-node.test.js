const assert = require('assert');

const Node = require('../simple-node');
const { sleep } = require('./utils');


describe('SimpleNode', function () {
    this.timeout(5000);

    it('isReady()', async function () {
        const node = new Node();
        
        assert.ok(!node.isReady(), 'ready too soon');
        
        await sleep(1000);
        
        assert.ok(node.isReady(), 'not ready yet');
    });

    it('isReady() after addChild() and removeChild()', async function () {
        const a = new Node();
        
        await sleep(1000);
        
        assert.ok(a.isReady(), 'a should be ready');

        const b = new Node();
        a.addChild(b);
        
        assert.ok(!a.isReady(), 'b should not be ready');
        assert.ok(!b.isReady(), 'a should not be ready (due to b addition)');
        
        a.removeChild(b);
        
        assert.ok(a.isReady(), 'a should be ready again (due to b removal)');
    });

    it('isReady() with complex hierarchy', async function () {
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
        assert.ok(!b.isReady(), 'b should not be ready');
        assert.ok(!c.isReady(), 'c should not be ready');
        assert.ok(!d.isReady(), 'd should not be ready');
        assert.ok(!e.isReady(), 'e should not be ready');
            
        await sleep(1000);
        
        assert.ok(a.isReady(), 'a should be ready');
        assert.ok(b.isReady(), 'b should be ready');
        assert.ok(c.isReady(), 'c should be ready');
        assert.ok(d.isReady(), 'd should be ready');
        assert.ok(e.isReady(), 'e should be ready');
        
        const f = new Node();
        d.addChild(f);
        
        assert.ok(!f.isReady(), 'f should not be ready');
        assert.ok(!d.isReady(), 'd should not be ready (direct)');
        assert.ok(!a.isReady(), 'a should not be ready (indirect)');
        
        await sleep(1000);
        
        assert.ok(f.isReady(), 'f should be ready');
        assert.ok(d.isReady(), 'd should be ready (direct)');
        assert.ok(a.isReady(), 'a should be ready (indirect)');
    });
});

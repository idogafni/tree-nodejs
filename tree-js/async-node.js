const SimpleNode = require('./simple-node');

class AsyncNode extends SimpleNode {

    whenReadyCallbacks;

    constructor (...args) {
        super(...args);
        this.whenReadyCallbacks = [];
    }

    /**
     * an event handler called when the resource becomes ready, should not be called directly
     * @param {string} value the resource payload (can be left unused for the scope of the assignment)
     */
    onResourceReady (value) {
        // implement
        this.ready = true;
        this.runReadyCallbacks();
    }

    addChild(child) {
        this.childs.push(child);
        child.whenReady(() => this.runReadyCallbacks());
    }

    removeChild(child) {
        this.childs = this.childs.filter(existingChild => existingChild != child);
        this.runReadyCallbacks();
    }

    runReadyCallbacks() {
        while(this.whenReadyCallbacks.length && this.isReady()) {
            const callback = this.whenReadyCallbacks.pop();
            callback();
        }        
    }

    /**
     * takes a callback to call when the resources of this node and its subtree all become ready, returns immediately
     * @param {function} callback will be called when all resources become ready
     */
    whenReady (callback) {
        this.addCallback(callback);
        const promises = this.childs.map(child =>
            new Promise((resolve) => child.whenReady( () => resolve(child) ))
        );
        Promise.all(promises).then(() => this.runReadyCallbacks() );
    }

    addCallback(callback) {
        if (!callback || typeof callback !== 'function') {return;}
        this.whenReadyCallbacks.push(callback);
    }
}

module.exports = AsyncNode;

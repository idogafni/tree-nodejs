const SimpleNode = require('./simple-node');


class AsyncNode extends SimpleNode {
    constructor (...args) {
        super(...args);
    }

    /**
     * takes a callback to call when the resources of this node and its subtree all become ready, returns immediately
     * @param {function} callback will be called when all resources become ready
     */
    whenReady (callback) {
        // we keep checking all the children and subtree and if all are ready then we call the callback
       const whenReadyTimer = setInterval(() =>{
            if( this.isReady() ){
                clearInterval(whenReadyTimer);
                return callback();
            }        
       },0)
    }
}

module.exports = AsyncNode;

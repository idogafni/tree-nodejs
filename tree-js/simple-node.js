const Resource = require('./resource');


class SimpleNode {
    constructor () {
        this.res = new Resource(this.onResourceReady.bind(this));
        // ready flag
        this.ready = false;
        // node ID
        this.id = 'xx-xxx-xx'.replace(/x/g, () => Math.round(Math.random() * 15).toString(16));
        // stack for children
        this.childs = [];
    }

    /**
     * an event handler called when the resource becomes ready, should not be called directly
     * @param {string} value the resource payload (can be left unused for the scope of the assignment)
     */
    onResourceReady (value) {
        // when finished we set ready flag to true
        this.ready = true;
    }

    /**
     * adds child node as a child of this node
     * @param {SimpleNode} child the child to add
     */
    addChild (child) {
        // insert new nodes
        this.childs.push(child);
    }

    /**
     * removes an existing child from this node
     * @param {SimpleNode} child the child to remove
     */
    removeChild (child) {
        // remove child by ID
        this.childs = this.childs.filter(
            ( _child ) => {
                return _child.id !== child.id
            }
        );
    }

    /**
     * checks whether the resources of this node and its subtree are all ready
     * @returns {boolean} are all resources ready
     */
    isReady () {
        // check if node has children
        if (this.childs.length > 0) {
            // run in loop and if all are finished return true
            return this.childs.every(
                (child)=>{
                    return child.isReady(); 
                }
            );
        } else {
            // return ready flag
            return this.ready;
        }
    }
}

module.exports = SimpleNode;

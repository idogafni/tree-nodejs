class Resource {
    constructor (onReadyCallback) {
        setTimeout(() => {
            this._value = 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => Math.round(Math.random() * 15).toString(16));
            onReadyCallback.call(this, this.value);
        }, Math.random() * 800 + 200);
    }

    get value () {
        return this._value || null;
    }
}

module.exports = Resource;

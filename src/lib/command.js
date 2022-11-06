function Command(name, data) {
    this._name /** @type {string}*/ = name;
    this._data /** @type {Object}*/ = data;
}

/**
 * @returns {string}
 */
Command.prototype.getName = function () {
    return this._name
};

Command.prototype.getData = function () {
    return this._data
};
export default Command;
/**
 * @param {string|HTMLElement} element
 * @constructor
 */
function ModelView(element) {
    if (typeof element === 'string')
        this.element = document.querySelector(element);
    else
        this.element = element;

    this._observers = /** @private @type{function[]} */ [];
    this.domElements = /** @type{{[key:string] : HTMLElement}} */ {
        editorFenster: document.getElementById('editor-window'),
        previewStackFenster: document.getElementById('preview-stack-window'),
        editorStackFenster: document.getElementById('editor-stack-window'),
        steuerungFenster: document.getElementById('control-window'),
        eigenschaftenFenster: document.getElementById('option-window'),
    };
}

ModelView.prototype.notifyObservers = function () {
    for (const observer of this._observers) {
        observer.call(this)
    }
};

/**
 * @param {function|function[]} observer
 */
ModelView.prototype.registerObserver = function (observer) {
    this._observers.push(observer)
};

/**
 * @param {function} observer
 */
ModelView.prototype.unregisterObserver = function (observer) {
    this._observers = this._observers.filter((item) => item !== observer)
};

/**
 * @param {Command} command
 */
ModelView.prototype.handle = function (command) {
    throw NotImplementedError('handle');
}

export default ModelView;
import Editor from './editor/editor.js';
import Preview from './preview.js';

export default class ModelView {
    _domElements = /** @type{{[key:string] : HTMLElement}} */ {
        editorWindow: document.getElementById('editor-window'),
        previewStackWindow: document.getElementById('preview-stack-window'),
        editorStackWindow: document.getElementById('editor-stack-window'),
        steuerungWindow: document.getElementById('control-window'),
        eigenschaftenWindow: document.getElementById('option-window'),
    };

    _editor = new Editor();
    _preview = new Preview();

    handleAddElement(data) {
        this._editor.loadElements([data]);

        const names = Object.keys(this._editor.elements);
        this.loadOption(this._editor.elements[names[names.length - 1]]);
    }

    handleSelectElement(data) {
        this._editor.selectElement(data.name);
        this.loadOption(this._editor.elements[data.name]);
    }

    loadOption(element) {
        const optionWindow = document.getElementById('option-window');
        optionWindow.querySelector('[name="name"]').value = element.name;
        optionWindow.querySelector('[name="position-x"]').value = element.x;
        optionWindow.querySelector('[name="position-y"]').value = element.y;
        optionWindow.querySelector('[name="width"]').value = element.w;
        optionWindow.querySelector('[name="height"]').value = element.h;
        optionWindow.querySelector('[name="shape-color"]').value = element.color;
    }

}

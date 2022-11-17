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
        this._editor.loadElements([{type: data.type}]);
    }
}

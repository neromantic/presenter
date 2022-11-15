import Editor from './editor/editor.js';
import Preview from './preview.js';

export default class ModelView {
    _domElements = /** @type{{[key:string] : HTMLElement}} */ {
        editorFenster: document.getElementById('editor-window'),
        previewStackFenster: document.getElementById('preview-stack-window'),
        editorStackFenster: document.getElementById('editor-stack-window'),
        steuerungFenster: document.getElementById('control-window'),
        eigenschaftenFenster: document.getElementById('option-window'),
    };

    _editor = new Editor();
    _preview = new Preview();

    constructor() {
        this._editor.loadElements({ Rectangle: {x:10, y: 10, w: 40, h: 50, color:'#203040'} });
    }
}

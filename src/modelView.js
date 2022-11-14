export default class ModelView {
    _domElements = /** @type{{[key:string] : HTMLElement}} */ {
        editorFenster: document.getElementById('editor-window'),
        previewStackFenster: document.getElementById('preview-stack-window'),
        editorStackFenster: document.getElementById('editor-stack-window'),
        steuerungFenster: document.getElementById('control-window'),
        eigenschaftenFenster: document.getElementById('option-window'),
    };

}
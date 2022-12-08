import Editor from './editor/editor.js';
import Preview from './preview.js';
import FigureModel, { Shadow } from './figureModel.js';

export default class ModelView {
    _figures = {};
    _selectFigureId = null;
    _editor = new Editor();
    _preview = new Preview();

    constructor() {
        document.onkeydown = function(e) {
            if(e.keyCode === 46) {
                window.fireCommand('DeleteFigure');
            }
            if(e.keyCode === 68 && e.ctrlKey) {
                window.fireCommand('CloneFigure');
            }
        };
    }
d
    /**
     * @param {typeof FigureModel}} data 
     */
    handleAddFigure(data) {
        const figure = new FigureModel(data.type);
        this._figures[figure.id] = figure;
        this._selectFigureId = figure.id;
        this._editor.addFigure(figure);
        window.fireCommand('SelectFigure', {id: figure.id})
    }
    /**
     * @param {typeof FigureModel}} data 
     */
    handleCloneFigure(data) {
        const figure = this._figures[this._selectFigureId].clone();
        this._figures[figure.id] = figure;
        this._editor.addFigure(figure);
        window.fireCommand('SelectFigure', {id: figure.id})
    }

    handleSelectFigure(data) {
        this._selectFigureId = data.id;
        this._editor.selectFigure(data.id);
        window.fireCommand('UpdateOptions');
    }

    handleEditFigure(data) {
        const figure = this._figures[this._selectFigureId];
        if(!figure) return;

        switch(data.field) {
            case 'x':
                figure.x = Number.parseInt(data.value);
                break;
            case 'y':
                figure.y = Number.parseInt(data.value);
                break;
            case 'z':
                figure.z = Number.parseInt(data.value);
                break;
            case 'w':
                figure.width = Number.parseInt(data.value);
                break;
            case 'h':
                figure.height = Number.parseInt(data.value);
                break;
            case 'color':
                console.log(data.value);
                figure.color = data.value;
                break;
            case 'shadow.color':
                figure.shadow.color = data.value.length > 0 ? data.value : null;
                break;
            case 'shadow.offsetX':
                figure.shadow.offsetX = data.value.length > 0 ? Number.parseInt(data.value) : null;
                break;  
            case 'shadow.offsetY':
                figure.shadow.offsetY = data.value.length > 0 ? Number.parseInt(data.value) : null;
                break;
            case 'shadow.blur':
                figure.shadow.blur = data.value.length > 0 ? Number.parseInt(data.value) : null;
                break;
            case 'text.text':
                figure.text.text = data.value;
                break;
            case 'text.weight':
                figure.text.weight = Number.parseInt(data.value);
                break;
            case 'text.size':
                figure.text.size = Number.parseInt(data.value);
                break;
        }
        this._editor.updateFigure(this._selectFigureId);
        window.fireCommand('UpdateOptions');
    }

    handleDebug() {
        console.log(this._figures);
    }

    handleUpdateOptions() {
        const figure = this._figures[this._selectFigureId];
        const optionWindow = document.getElementById('option-window');
        optionWindow.querySelector('[name="position-x"]').value = figure.x;
        optionWindow.querySelector('[name="position-y"]').value = figure.y;
        optionWindow.querySelector('[name="position-z"]').value = figure.z;
        optionWindow.querySelector('[name="width"]').value = figure.width;
        optionWindow.querySelector('[name="height"]').value = figure.height;
        optionWindow.querySelector('[name="shape-color"]').value = figure.color;
        optionWindow.querySelector('[name="shadow-color"]').value = figure.shadow.color;
        optionWindow.querySelector('[name="shadow-offsetX"]').value = figure.shadow.offsetX;    
        optionWindow.querySelector('[name="shadow-offsetY"]').value = figure.shadow.offsetY;
        optionWindow.querySelector('[name="shadow-blur"]').value = figure.shadow.blur;

        if(figure.type === 'Text') {
            optionWindow.querySelector('#text-block').style.display = 'block';
            optionWindow.querySelector('[name="text-text"]').value = figure.text.text;
            optionWindow.querySelector('[name="text-weight"]').value = figure.text.weight;
            optionWindow.querySelector('[name="text-size"]').value = figure.text.size;
        } else {
            optionWindow.querySelector('#text-block').style.display = 'none';
        }
    }

    handleDeleteFigure() {
        if(this._selectFigureId !== null) {
            this._editor.deleteFigure(this._selectFigureId);
            this._selectFigureId = null;
        }
    }
}

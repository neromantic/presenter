import Rectangle from "./elements/rectangle.js";
import Circle from "./elements/circle.js";
import Text from "./elements/text.js";

const ELEMENTS_MAP = {
    'Rectangle': Rectangle,
    'Circle': Circle,
    'Text' : Text
};

export default class Editor {
    elements = {};
    constructor() {
        this._initStage();
    }

    _initStage() {
        this.stage = new createjs.Stage('editor-stack-window');
        this.stage.enableMouseOver(100);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.interval = 10;
        createjs.Ticker.on("tick", this.stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        this.stage.on('stagemousedown', (event) => {
            for (const id in this.elements) {
                const element = this.elements[id];
                const figure = element.figure;
                
                if(
                    (event.stageX < figure.x - 2 || event.stageX > figure.x + figure.width + 2)
                    || (event.stageY < figure.y - 2 || event.stageY > figure.y + figure.height + 2)
                ) {
                    element.hideControl();
                }
            }
        });
    }

    releaseControl()  {
        for (const element in this.elements) {
            this.elements[element].hideControl();
        }
    }

    addFigure(figure) {
        this.elements[figure.id] = new ELEMENTS_MAP[figure.type](figure, this.stage);
    }

    addFigures(figures) {
        for (const figure of figures) {
            this.elements[figure.id] = new ELEMENTS_MAP[figure.type](figure, this.stage);
            this.elements[figure.id].showControl();
        }
    }

    selectFigure(id) {
        const element = this.elements[id];
        this.releaseControl();
        element.showControl();
    }

    updateFigure(id) {
        const element = this.elements[id];
        element.updateShape();
    }

    deleteFigure(id) {
        const element = this.elements[id];
        this.stage.removeChild(element.shape);
        this.stage.removeChild(element.controlShape);
    }
}

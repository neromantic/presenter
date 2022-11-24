import Rectangle from "./elements/rectangle.js";
import Circle from "./elements/circle.js";
import Text from "./elements/text.js";

const EDITOR_WINDOW_ID = 'editor-stack-window';

const ELEMENTS_MAP = {
    'Rectangle': Rectangle,
    'Circle': Circle,
    'Text' : Text
};

const ELEMENTS_DEFAULT_NAME_COUNTER = {
    'Rectangle' : 0,
    'Circle' : 0,
    'Text' : 0
};

export default class Editor {
    constructor() {
        this.stage = new createjs.Stage(EDITOR_WINDOW_ID);
        this.stage.enableMouseOver(100);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.interval = 10;
        createjs.Ticker.on("tick", this.stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        /**
         * @type {{[key:string]: Element}}
         */
        this.elements = {};

        this.stage.releaseControl = (except) => {
            for (const elementName in this.elements) {
                if (elementName !== except.name) {
                    this.elements[elementName].hideControl();
                }
            }
        }

        this.stage.on('stagemousedown', (event) => {
            for (const elementName in this.elements) {
                const element = this.elements[elementName];
                if(
                    (event.stageX < element.x - 2 || event.stageX > element.x + element.w + 2)
                    || (event.stageY < element.y - 2 || event.stageY > element.y + element.w + 2)
                ) {
                    element.hideControl();
                }
            }
        });
    }

    /**
     * @param {[{w?: number, x?: number, h?: number, y?: number, type: keyof ELEMENTS_MAP}]} data
     */
    loadElements(data) {
        for (const elementData of data) {
            const name = elementData.type + ' ' + ELEMENTS_DEFAULT_NAME_COUNTER[elementData.type];
            ELEMENTS_DEFAULT_NAME_COUNTER[elementData.type] = ELEMENTS_DEFAULT_NAME_COUNTER[elementData.type] + 1;
            this.stage.releaseControl(name);
            this.elements[name] = new ELEMENTS_MAP[elementData.type](name, elementData, this.stage);
            this.elements[name].showControl();
        }
    }

    selectElement(name) {
        const element = this.elements[name];
        this.stage.releaseControl(name);
        element.showControl();
    }
}

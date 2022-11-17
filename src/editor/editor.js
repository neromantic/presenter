import Rectangle from "./elements/rectangle.js";
import Circle from "./elements/circle.js";

const EDITOR_WINDOW_ID = 'editor-stack-window';

const ELEMENTS_MAP = {
    'Rectangle': Rectangle,
    'Circle': Circle
};

const ELEMENTS_DEFAULT_NAME_COUNTER = {
    'Rectangle' : 0,
    'Circle' : 0
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
    }

    /**
     * @param {[{w?: number, x?: number, h?: number, y?: number, type: keyof ELEMENTS_MAP}]} data
     */
    loadElements(data) {
        for (const elementData of data) {
            const name = elementData.type + ' ' + ELEMENTS_DEFAULT_NAME_COUNTER[elementData.type];
            ELEMENTS_DEFAULT_NAME_COUNTER[elementData.type] = ELEMENTS_DEFAULT_NAME_COUNTER[elementData.type] + 1;
            this.elements[name] = new ELEMENTS_MAP[elementData.type](name, elementData, this.stage);
            this.elements[name].showControl();
        }
    }
}

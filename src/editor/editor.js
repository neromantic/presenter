import Rectangle from "./elements/rectangle.js";
import Circle from "./elements/circle.js";

const EDITOR_WINDOW_ID = 'editor-stack-window';
const EDITOR_ID = 'editor-window';

const ELEMENTS_MAP = {
    'Rectangle': Rectangle,
    'Circle': Circle
}

export default class Editor {
    constructor() {
        document.getElementById(EDITOR_WINDOW_ID).width = document.getElementById(EDITOR_ID).offsetWidth * (window.devicePixelRatio || 1);
        document.getElementById(EDITOR_WINDOW_ID).height = document.getElementById(EDITOR_ID).offsetHeight * (window.devicePixelRatio || 1);

        this.stage = new createjs.Stage(EDITOR_WINDOW_ID);
        this.stage.enableMouseOver(100);
        createjs.Ticker.on("tick", this.stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        /**
         * @type {Element[]}
         */
        this.elements = [];

        // this.stage.on('stagemousedown', (event) => {
        //     for(const element of this.elements) {
        //         element.hideControl();
        //     }
        // });
    }

    /**
     * @param {{
     *  [key:string] : {
     *      x: number,
     *      y: number,
     *      w: number,
     *      h: number,
     *      color: string
     *  }
     * }} data
     */
    loadElements(data) {
        for (const element in data) {
            this.elements.push(new ELEMENTS_MAP[element](data[element], this.stage));
        }
    }
}

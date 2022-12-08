const DEFAULT_X = Math.floor(document.querySelector('#editor-stack-window').getAttribute('width') / 2);
const DEFAULT_Y = Math.floor(document.querySelector('#editor-stack-window').getAttribute('height') / 2);
const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 50;
const DEFAULT_COLOR = '#ededed';
const DEFAULT_SHADOW_COLOR = '#ededed';
const DEFAULT_TEXT = 'Text';
const DEFAULT_WEIGHT = '400';
const DEFAULT_FONT_SIZE = '14';


export default class FigureModel {
    static Z_INDEX_COUNTER = 0;
    static ID_COUNTER = 0;

    /**
     * @param {string} type 
     * @param {?number} x 
     * @param {?number} y 
     * @param {?number} z 
     * @param {?number} width 
     * @param {?number} height 
     * @param {?number} color 
     * @param {?Shadow} shadow 
     * @param {?Text} text 
     */
    constructor(type, x = null, y = null, z = null, width = null, height = null, color = null, shadow = null, text = null) {
        this.id = FigureModel.ID_COUNTER++;
        this.type = type;
        this.x = x || DEFAULT_X;
        this.y = y || DEFAULT_Y;
        this.z = z || FigureModel.Z_INDEX_COUNTER++;
        this.width = width || DEFAULT_WIDTH;
        this.height = height || DEFAULT_HEIGHT;
        this.color = color || DEFAULT_COLOR;
        this.shadow = shadow || new Shadow();
        this.text = text || new Text();
    }

    clone() {
        return new FigureModel(this.type, this.x + 20, this.y - 20, null, this.width, this.height, this.color, this.shadow.clone(), this.text.clone());
    }
}

export class Shadow {
    constructor(color = null, offsetX = null, offsetY = null, blur = null) {
        this.color = color || DEFAULT_SHADOW_COLOR;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
        this.blur = blur || 0;
    }

    clone() {
        return new Shadow(
            this.color,
            this.offsetX,
            this.offsetY,
            this.blur);
    }
}

export class Text {
    constructor(text = null, weight = null, size = null) {
        this.text = text || DEFAULT_TEXT;
        this.weight = weight || DEFAULT_WEIGHT;
        this.size = size || DEFAULT_FONT_SIZE;
    }

    clone() {
        return new Text(
            this.text,
            this.weight,
            this.size);
    }
}

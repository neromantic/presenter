import Element from './element.js';

export default class Rectangle extends Element {
    /**
     * @param {{
     *     x: number,
     *     y: number,
     *     w: number,
     *     h: number,
     *     color?: string
     * }} data,
     * @param {createjs.Stage} stage
     */
    constructor(data, stage) {
        super('Rect', data, stage);
    }
}

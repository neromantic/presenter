import Element from './element.js';

export default class Circle extends Element {
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
        super('Circle', data, stage);
        this.w = this.shape.graphics.command.radius;
        this.h = this.shape.graphics.command.radius;
    }
}

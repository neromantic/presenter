import Element from './element.js';

export default class Circle extends Element {
    getGraphics() {
        const graphics = new createjs.Graphics();
        graphics.beginFill(this.figure.color);
        graphics.drawEllipse (0, 0, this.figure.width, this.figure.height, this.figure.width / 2);
        return graphics;
    }
}

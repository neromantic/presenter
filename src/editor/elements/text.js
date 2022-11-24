import Element from './element.js';

export default class Text extends Element {

    getShape(data) {
        return new createjs.Text(data.text ?? 'Text');
    }

    getGraphics(data) {
        return null;
    }

    setShapeW(w) {
        this.shape.scaleX = w / 20;
        this.controlShape.graphics.command.w = w;
    }
    setShapeH(h) {
        this.shape.scaleY = h / 10;
        this.controlShape.graphics.command.h = h;
    }
}

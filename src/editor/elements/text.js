import Element from './element.js';

export default class Text extends Element {

    getShape() {
        return new createjs.Text(this.figure.text.text, this.figure.text.size + 'px Arial');
    }

    getGraphics() {
        return null;
    }

    setShapeW(w) {
        this.shape.maxWidth  = w;
        this.controlShape.graphics.command.w = w;
    }
    setShapeH(h) {
        this.shape.max = h / 10;
        this.controlShape.graphics.command.h = h;
    }

    updateShape() {
        this.shape.font = this.figure.text.size + 'px Arial';
        this.shape.text = this.figure.text.text;
        this.shape.color = this.figure.color;
        super.updateShape();
    }
}

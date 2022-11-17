import Element from './element.js';

export default class Circle extends Element {
    getGraphics(data) {
        const graphics = new createjs.Graphics();
        graphics.beginFill(data.color ?? null);
        graphics.drawEllipse (0, 0, data.w, data.h, data.w / 2);
        return graphics;
    }

    setShapeW(w) {
        this.graphics.command.w = w;
        this.controlShape.graphics.command.w = w;
    }
    setShapeH(h) {
        this.graphics.command.h = h;
        this.controlShape.graphics.command.h = h;
    }

}

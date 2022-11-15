const CONTROL_COLOR = '#00b8ff';

export default class Element {
    controlShowed = false;

    /**
     * @param {string} shape
     * @param {{
     *     x: number,
     *     y: number,
     *     w: number,
     *     h: number,
     *     color?: string
     * }} data
     * @param stage
     */
    constructor(shape, data, stage) {
        this.stage = stage;
        this.shape = new createjs.Shape();

        if (data.color) {
            this.shape.graphics.beginFill(data.color);
        }
        this.shape.graphics['draw' + shape](data.x, data.y, data.w, data.h);

        this.stage.addChild(this.shape);
        this._control();
    }

    _control() {
        this.controlShape = new createjs.Shape();
        this.controlShape.graphics.setStrokeStyle(2).beginStroke(CONTROL_COLOR);
        this.controlShape.graphics.drawRect(this.shape.graphics.command.x, this.shape.graphics.command.y, this.shape.graphics.command.w, this.shape.graphics.command.h);
        console.log(this.controlShape)

        this.shape.on('click', (event) => {
            if (event.stageX > this.shape.graphics.command.x && event.stageX < this.shape.graphics.command.x + this.shape.graphics.command.w && event.stageY > this.shape.graphics.command.y && event.stageX < this.shape.graphics.command.y + this.shape.graphics.command.h) {
                event.stopPropagation();
                this.showControl();
            }
        });
    }

    showControl() {
        if (!this.controlShowed) {
            this.stage.addChild(this.controlShape);
            this.controlShowed = true;
        }
    }

    hideControl() {
        if (this.controlShowed) {
            this.stage.removeChild(this.controlShape);
            this.controlShowed = false;
        }
    }
}

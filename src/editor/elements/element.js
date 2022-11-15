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

        this.x = data.x;
        this.y = data.y;
        this.w = data.w;
        this.h = data.h;

        if (data.color) {
            this.shape.graphics.beginFill(data.color);
        }
        this.shape.graphics['draw' + shape](data.x, data.y, data.w, data.h);

        this.stage.addChild(this.shape);
        this.initControl();
    }

    initControl() {
        this.controlShape = new createjs.Shape();
        this.controlShape.graphics.setStrokeStyle(2).beginStroke(CONTROL_COLOR);
        this.controlShape.graphics.drawRect(this.shape.graphics.command.x, this.shape.graphics.command.y, this.shape.graphics.command.w, this.shape.graphics.command.h);

        this.shape.on('click', (event) => {
            if (event.stageX > this.x  && event.stageX < this.x  + this.w && event.stageY > this.y && event.stageX < this.y + this.h) {
                event.stopPropagation();
                this.showControl();
            }
        });

        this.controlShape.on('mouseover', (event) => {
            const controlPosition = event.target.graphics.command;
            if (
                (event.stageX > controlPosition.x + controlPosition.w - 2 || event.stageX < controlPosition.x + 2)
                &&
                (event.stageY > controlPosition.y + 2 && event.stageY < controlPosition.y + controlPosition.h - 2)
            ) {
                document.getElementById('editor-stack-window').classList.add('resize-horizontal');
                document.getElementById('editor-stack-window').classList.remove('resize-vertical');
            } else {
                document.getElementById('editor-stack-window').classList.add('resize-vertical');
                document.getElementById('editor-stack-window').classList.remove('resize-horizontal');
            }
        });

        this.controlShape.on('mouseout', (event) => {
            document.getElementById('editor-stack-window').classList.remove('resize-horizontal');
            document.getElementById('editor-stack-window').classList.remove('resize-vertical');
        });

        this.shape.on('pressmove', (event) => {
            if(this.controlShowed) {
                if (this.holdPositionX === undefined) {
                    this.holdPositionX = event.stageX - this.shape.graphics.command.x;
                }
                if (this.holdPositionY === undefined) {
                    this.holdPositionY = event.stageY - this.shape.graphics.command.y;
                }

                this.shape.graphics.command.x = event.stageX - this.holdPositionX;
                this.controlShape.graphics.command.x = event.stageX - this.holdPositionX;
                this.shape.graphics.command.y = event.stageY - this.holdPositionY;
                this.controlShape.graphics.command.y = event.stageY - this.holdPositionY;
            }
        });

        this.shape.on('pressup', (event) => {
            delete this.holdPositionX;
            delete this.holdPositionY;
            this.x = this.shape.graphics.command.x;
            this.y = this.shape.graphics.command.y;
        });

        this.controlShape.on('pressmove', (event) => {
            const controlPosition = event.target.graphics.command;
            if(this.holdPositionY === undefined) {
                this.holdPositionY = event.rawY < controlPosition.y + 2 || event.rawY > controlPosition.y + controlPosition.h - 2;
            }
            if(this.holdPositionX === undefined) {
                this.holdPositionX = event.rawY > controlPosition.y + 2 && event.rawY < controlPosition.y + controlPosition.h - 2;
            }
            switch (true) {
                case event.stageX > controlPosition.x + (controlPosition.w / 2) && this.holdPositionX:
                    this.controlShape.graphics.command.w = event.stageX - this.controlShape.graphics.command.x;
                    this.shape.graphics.command.w = event.stageX - this.shape.graphics.command.x;
                    break;
                case event.stageX < controlPosition.x + (controlPosition.w / 2) && this.holdPositionX:
                    this.controlShape.graphics.command.w = this.controlShape.graphics.command.w + (this.controlShape.graphics.command.x - event.stageX);
                    this.controlShape.graphics.command.x = event.stageX
                    this.shape.graphics.command.w = this.shape.graphics.command.w + (this.shape.graphics.command.x - event.stageX);
                    this.shape.graphics.command.x = event.stageX;
                    break;
                case event.stageY > controlPosition.y + (controlPosition.h / 2) && this.holdPositionY:
                    this.controlShape.graphics.command.h = event.stageY - this.controlShape.graphics.command.y;
                    this.shape.graphics.command.h = event.stageY - this.shape.graphics.command.y;
                    break;
                case event.stageY < controlPosition.y + (controlPosition.h / 2) && this.holdPositionY:
                    this.controlShape.graphics.command.h = this.controlShape.graphics.command.h + (this.controlShape.graphics.command.y - event.stageY);
                    this.controlShape.graphics.command.y = event.stageY
                    this.shape.graphics.command.h = this.shape.graphics.command.h + (this.shape.graphics.command.y - event.stageY);
                    this.shape.graphics.command.y = event.stageY;
                    break;
            }
            this.stage.update();
        });

        this.controlShape.on('pressup', (event) => {
            delete this.holdPositionX;
            delete this.holdPositionY;
            this.x = this.shape.graphics.command.x;
            this.w = this.shape.graphics.command.w;
            this.y = this.shape.graphics.command.y;
            this.h = this.shape.graphics.command.h;
        })
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

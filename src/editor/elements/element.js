import FigureModel from "../../figureModel.js";

const CONTROL_COLOR = '#00b8ff';
export default class Element {
    controlShowed = false;

    /**
     * @param {FigureModel} figure
     * @param stage
     */
    constructor(figure, stage) {
        this.figure = figure;
        this.stage = stage;

        this.graphics = this.getGraphics();
        this.shape = this.getShape();

        this.stage.addChild(this.shape);
        this.drawControl();

        this.setSize(this.figure.w, this.figure.h);
        this.setPosition(this.figure.x, this.figure.y);

        this.updateShape();
    }

    getGraphics() {
        const graphics = new createjs.Graphics();
        graphics.beginFill(this.figure.color);
        graphics.drawRect(0, 0, this.figure.width, this.figure.height);
        return graphics;
    }

    getShape() {
        return new createjs.Shape(this.graphics);
    }

    setPosition(x = null, y = null) {
        if (x !== null) this.figure.x = Math.floor(x);
        if (y !== null) this.figure.y = Math.floor(y);
        window.fireCommand('UpdateOptions');
    }

    setSize(w = null, h = null) {
        if (w !== null) this.figure.width = Math.floor(w);
        if (h !== null) this.figure.height = Math.floor(h);
        window.fireCommand('UpdateOptions');
    }

    setShapeX(x) {
        this.shape.x = x;
        this.controlShape.x = x;
    }

    getShapeX() {
        return this.shape.x;
    }

    setShapeY(y) {
        this.shape.y = y;
        this.controlShape.y = y;
    }

    getShapeY() {
        return this.shape.y;
    }

    setShapeW(w) {
        this.graphics.command.w = w;
        this.controlShape.graphics.command.w = w;
    }

    getShapeW() {
        return this.graphics.command.w;
    }

    setShapeH(h) {
        this.graphics.command.h = h;
        this.controlShape.graphics.command.h = h;
    }

    getShapeH() {
        return this.graphics.command.h;
    }

    setShapeZ(z) {
        this.stage.setChildIndex(this.shape, z);
    }

    setShadow(shadow = null) {
        this.shape.shadow = new createjs.Shadow(shadow.color, shadow.offsetX, shadow.offsetY, shadow.blur);
    }

    updateShape() {
        this.setShapeX(this.figure.x);
        this.setShapeY(this.figure.y);
        this.setShapeW(this.figure.width);
        this.setShapeH(this.figure.height);
        this.setShapeZ(this.figure.z);
        this.setShadow(this.figure.shadow);   
    }

    drawControl() {
        this.controlShape = new createjs.Shape();
        this.controlShape.graphics.setStrokeStyle(2).beginStroke(CONTROL_COLOR);
        this.controlShape.graphics.drawRect(0, 0, this.figure.width ?? 50, this.figure.height ?? 50);
        this.stage.addChild(this.controlShape);

        this.shape.on('click', (event) => {
            event.stopPropagation();
            window.fireCommand('SelectFigure', {id: this.figure.id});
        });

        this.controlShape.on('mouseover', (event) => {
            if ((event.stageX > event.target.x + event.target.graphics.command.w - 2 || event.stageX < event.target.x + 2) && (event.stageY > event.target.y + 2 && event.stageY < event.target.y + event.target.graphics.command.h - 2)) {
                this.horizontalControl = true;
                document.getElementById('editor-stack-window').classList.add('resize-horizontal');
                document.getElementById('editor-stack-window').classList.remove('resize-vertical');
            } else {
                this.verticalControl = true;
                document.getElementById('editor-stack-window').classList.add('resize-vertical');
                document.getElementById('editor-stack-window').classList.remove('resize-horizontal');
            }
        });

        this.controlShape.on('mouseout', (event) => {
            if (!this.controled) {
                document.getElementById('editor-stack-window').classList.remove('resize-horizontal');
                document.getElementById('editor-stack-window').classList.remove('resize-vertical');
                delete this.horizontalControl;
                delete this.verticalControl;
            }
        });

        this.shape.on('pressmove', (event) => {
            if (this.controlShowed) {
                if (this.holdPositionX === undefined) {
                    this.holdPositionX = event.stageX - this.figure.x;
                }
                if (this.holdPositionY === undefined) {
                    this.holdPositionY = event.stageY - this.figure.y;
                }

                this.setShapeX(event.stageX - this.holdPositionX);
                this.setShapeY(event.stageY - this.holdPositionY);
            }
        });

        this.shape.on('pressup', (event) => {
            delete this.holdPositionX;
            delete this.holdPositionY;
            this.setPosition(this.getShapeX(),  this.getShapeY());
        });

        this.controlShape.on('pressmove', (event) => {
            this.controled = true;
            const centerX = this.controlShape.x + (this.controlShape.graphics.command.w / 2);
            const centerY = this.controlShape.y + (this.controlShape.graphics.command.h / 2);
            switch (true) {
                case event.stageX > centerX && this.horizontalControl:
                    this.setShapeW(event.stageX - this.controlShape.x)
                    break;
                case event.stageX < centerX && this.horizontalControl:
                    const x = event.stageX;
                    const w = this.controlShape.graphics.command.w + (this.controlShape.x - event.stageX);
                    this.setShapeX(x);
                    this.setShapeW(w)
                    break;
                case event.stageY > centerY && this.verticalControl:
                    this.setShapeH(event.stageY - this.controlShape.y)
                    break;
                case event.stageY < centerY && this.verticalControl:
                    const y = event.stageY;
                    const h = this.controlShape.graphics.command.h + (this.controlShape.y - event.stageY);
                    this.setShapeY(y);
                    this.setShapeH(h)
                    break;
            }
        });

        this.controlShape.on('pressup', (event) => {
            delete this.controled;
            this.setSize(Math.floor(this.controlShape.graphics.command.w), Math.floor(this.controlShape.graphics.command.h));
        })
    }

    showControl() {
        if (!this.controlShowed) {
            this.controlShape.visible = true;
            this.stage.setChildIndex(this.controlShape,this.stage.getNumChildren()-1)
            this.controlShowed = true;
        }
    }

    hideControl() {
        if (this.controlShowed) {
            this.controlShape.visible = false;
            this.controlShowed = false;
        }
    }
}

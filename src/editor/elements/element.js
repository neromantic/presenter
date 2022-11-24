const CONTROL_COLOR = '#00b8ff';
const DEFAULT_SHAPE_COLOR = '#8f8f8f';
const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 50;
const X_CENTER_POSITION = Math.floor(document.getElementById('editor-window').offsetWidth / 2);
const Y_CENTER_POSITION = Math.floor(document.getElementById('editor-window').offsetHeight / 2);
export default class Element {
    controlShowed = false;

    /**
     * @param {{
     *     x: number,
     *     y: number,
     *     w: number,
     *     h: number,
     *     color?: string
     * }} data
     * @param stage
     */
    constructor(name, data, stage) {
        this.name = name;
        this.stage = stage;

        const dataKeys = Object.keys(data);
        if(!('x' in dataKeys)) data.x = X_CENTER_POSITION;
        if(!('y' in dataKeys)) data.y = Y_CENTER_POSITION;
        if(!('w' in dataKeys)) data.w = DEFAULT_WIDTH;
        if(!('h' in dataKeys)) data.h = DEFAULT_HEIGHT;
        if(!('color' in dataKeys)) data.color = DEFAULT_SHAPE_COLOR;

        this.graphics = this.getGraphics(data);
        this.shape = this.getShape(data);
        this.shape.regX = this.w / 2;
        this.shape.regY = this.h / 2;
        this.shape.shadow = new createjs.Shadow('#000',4,4,5);
        this.stage.addChild(this.shape);
        this.drawControl(data);

        this.setSize(data.w, data.h);
        this.setPosition(data.x, data.y);

        this.setShapeX(data.x);
        this.setShapeY(data.y);

        this.setShapeW(data.w);
        this.setShapeH(data.h);

        this.stage.addChild(this.shape);
    }

    getGraphics(data) {
        const graphics = new createjs.Graphics();
        graphics.beginFill(data.color ?? null);
        graphics.drawRect(0, 0, data.w, data.h);
        return graphics;
    }

    setPosition(x = null, y = null) {
        if (x !== null) this.x = x;
        if (y !== null) this.y = y;
    }

    setSize(w = null, h = null) {
        if (w !== null) this.w = w;
        if (h !== null) this.h = h;
    }

    setShapeX(x) {
        this.shape.x = x;
        this.controlShape.x = x;
    }

    setShapeY(y) {
        this.shape.y = y;
        this.controlShape.y = y;
    }

    setShapeW(w) {
        this.graphics.command.w = w;
        this.controlShape.graphics.command.w = w;
    }

    setShapeH(h) {
        this.graphics.command.h = h;
        this.controlShape.graphics.command.h = h;
    }

    drawControl(data) {
        this.controlShape = new createjs.Shape();
        this.controlShape.graphics.setStrokeStyle(2).beginStroke(CONTROL_COLOR);
        this.controlShape.graphics.drawRect(0, 0, data.w ?? 50, data.h ?? 50);

        this.shape.on('click', (event) => {
            event.stopPropagation();
            this.showControl();
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
                    this.holdPositionX = event.stageX - this.x;
                }
                if (this.holdPositionY === undefined) {
                    this.holdPositionY = event.stageY - this.y;
                }

                this.setShapeX(event.stageX - this.holdPositionX);
                this.setShapeY(event.stageY - this.holdPositionY)
            }
        });

        this.shape.on('pressup', (event) => {
            delete this.holdPositionX;
            delete this.holdPositionY;
            this.setPosition(this.shape.x,  this.shape.y);
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
                    const h = this.shape.graphics.command.h + (this.shape.y - event.stageY);
                    this.setShapeY(y);
                    this.setShapeH(h)
                    break;
            }
        });

        this.controlShape.on('pressup', (event) => {
            delete this.controled;
            this.setSize(this.controlShape.graphics.command.w, this.controlShape.graphics.command.h)
        })
    }

    showControl() {
        if (!this.controlShowed) {
            this.stage.releaseControl(this);
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

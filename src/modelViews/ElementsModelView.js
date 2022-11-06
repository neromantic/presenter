import ModelView from "../lib/modelView.js";

function ElementsModelView() {
    ModelView.call(document.getElementById('elements-window'));
}

ElementsModelView.prototype = Object.create(ModelView.prototype);
ElementsModelView.prototype.constructor = ElementsModelView;

export default ElementsModelView;
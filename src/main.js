import ModelView from "./modelView.js";

const _ModelView = new ModelView();

/**
 * @param {string} command
 * @param {any|null} data
 */
window.fireCommand = async (command, data = null) => {
    const method = "handle" + command;
    _ModelView[method](data);
}

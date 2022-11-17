import ModelView from "./modelView.js";

const _ModelView = new ModelView();

/**
 * @param {string} command
 * @param {any|null} data
 */
window.fireCommand = (command, data = null) => {
    _ModelView["handle" + command](data);
}

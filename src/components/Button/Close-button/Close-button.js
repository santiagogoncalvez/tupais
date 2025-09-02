import htmlString from "@components/Button/Close-button/template.html?raw";
import "@components/Button/Close-button/style.css";
import {
  base,
  modifiers,
} from "@components/Button/Close-button/Close-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

// actions puede tener una sola acción o ser un array de acción a despachar
export default class CloseButton extends BaseComponent {
  constructor(dispatch, actions, options = {}) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();

    this._applyPosition(options.top, options.right); // ← NUEVO
    this._applyFilter(options.filter);
    this._applySize(options.width, options.height);
    this._applyTransform(options.transform); // ← NUEVO

    this._init(dispatch, actions);
  }

  syncState(state) {
    if (this.state?.ui.darkMode != state?.ui.darkMode) {
      this._setDarkMode(state?.ui.darkMode);
    }
    this.state = state;
  }

  _init(dispatch, actions) {
    this.dom.addEventListener("click", () => {
      const exec = (action) => {
        if (typeof action === "function") {
          // Si es una función, la ejecutamos
          action();
        } else {
          // Si no, despachamos como siempre
          dispatch(action);
        }
      };

      // Si hay más de una acción, se itera sobre ellas
      if (Array.isArray(actions)) {
        actions.forEach(exec);
      } else {
        exec(actions);
      }
    });
  }

  show() {
    this.dom.classList.remove(this.modifiers.hidden);
    this.dom.classList.add(this.modifiers.show);
  }

  hide() {
    this.dom.classList.remove(this.modifiers.show);
    this.dom.classList.add(this.modifiers.hidden);
  }
}

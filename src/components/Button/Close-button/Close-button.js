import htmlString from "@components/Button/Close-button/template.html?raw";
import "@components/Button/Close-button/style.css";
import {
  base,
  modifiers,
} from "@components/Button/Close-button/Close-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class CloseButton extends BaseComponent {
  constructor(dispatch, action, options = {}) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();

    this._applyPosition(options.top, options.right); // ← NUEVO

    this._init(dispatch, action);
  }

  syncState(state) {
    if (this.state?.ui.darkMode != state?.ui.darkMode) {
      this._setDarkMode(state?.ui.darkMode);
    }
    this.state = state;
  }

  _init(dispatch, action) {
    this.dom.addEventListener("click", () => {
      dispatch(action);
    });
  }

  _applyPosition(top, right) {
    if (top) this.dom.style.top = top;
    if (right) this.dom.style.right = right;
    this.dom.style.position = "absolute";
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

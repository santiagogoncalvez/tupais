import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Header/Dark-mode-button/template.html?raw";

// Styles
import "@components/Header/Dark-mode-button/style.css";

import { base } from "@components/Header/Dark-mode-button/Dark-mode-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class DarkModeButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.base = base;
    this.htmlString = htmlString;
    this.dom = this._createDom();
    this._init(state, dispatch);
  }

  _init(state, dispatch) {
    const checkbox = this.dom.querySelector("." + this.base.checkbox);
    checkbox.checked = state.ui.darkMode;

    this.dom.addEventListener("change", () => {
      dispatch({ type: ACTIONS.TOGGLE_DARK_MODE });
      document.body.classList.toggle("dark-mode");
    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        checkbox.click();
      }
    });
  }
}

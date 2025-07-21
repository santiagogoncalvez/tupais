import htmlString from "@Modal/Settings/Dark-mode-button/template.html?raw";

// Styles
import "@Modal/Settings/Dark-mode-button/style.css";

import { darkModeButtonBase } from "@Modal/Settings/Dark-mode-button/Dark-mode-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class DarkModeButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.base = darkModeButtonBase;
    this.htmlString = htmlString;
    this.dom = this._createDom();
    this._init(state, dispatch);
  }

  _init(state, dispatch) {
    const checkbox = this.dom.querySelector("." + darkModeButtonBase.checkbox);
    checkbox.checked = state.ui.darkMode;

    this.dom.addEventListener("change", () => {
      dispatch({ ui: { darkMode: checkbox.checked } });
    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        checkbox.click();
      }
    });
  }
}

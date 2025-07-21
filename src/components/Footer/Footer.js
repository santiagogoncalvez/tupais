import htmlString from "@components/Footer/template.html?raw";

// Styles
import "@components/Footer/style.css";

import {
  footerBase,
  footerModifiers,
} from "@components/Footer/Footer-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Footer extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = footerBase;
    this.modifiers = footerModifiers;
    this.dom = this._createDom();
    this.syncState(state);
  }

  syncState(state) {
    let stIsDarkMode = state.ui.darkMode;
    if (this.isDarkMode == stIsDarkMode) return;
    this._setDarkMode(stIsDarkMode);
    this.isDarkMode = stIsDarkMode;
  }
}

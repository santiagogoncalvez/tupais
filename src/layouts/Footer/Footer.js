import htmlString from "@layouts/Footer/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@layouts/Footer/style.css";

import {
   footerBase,
   footerModifiers,
} from "@layouts/Footer/Footer-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Footer extends BaseComponent {
   constructor(state) {
      super();
      this.htmlString = htmlString;
      this.base = footerBase;
      this.modifiers = footerModifiers;
      this.dom = this._createDom();
      this._syncState(state);
   }

   _syncState(state) {
      let stIsDarkMode = state.ui.darkMode;
      if (this.isDarkMode == stIsDarkMode) return;
      this._setDarkMode(stIsDarkMode);
      this.isDarkMode = stIsDarkMode;
   }
}

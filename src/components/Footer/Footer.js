import htmlString from "@components/Footer/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@components/Footer/style.css";

import {
   footerBase,
   footerModifiers,
} from "@components/Footer/Footer-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class Footer {
   constructor(state) {
      this.dom = this._createDom();
      this._syncState(state);
   }

   _createDom = () => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);

      return clone.querySelector(`.${footerBase.block}`);
   };

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(this.dom, footerBase, footerModifiers, "darkMode");
      }

      if (!isDarkMode) {
         deleteClasses(this.dom, footerBase, footerModifiers, "darkMode");
      }
   }

   _syncState(state) {
      let stIsDarkMode = state.ui.darkMode;
      if (this.isDarkMode == stIsDarkMode) return;
      this._setDarkMode(stIsDarkMode);
      this.isDarkMode = stIsDarkMode;
   }
}

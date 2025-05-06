import htmlString from "@Modal/Settings/Dark-mode-button/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/Dark-mode-button/style.css";

import { darkModeButtonBase } from "@Modal/Settings/Dark-mode-button/Dark-mode-button-class-names.js";

export default class DarkModeButton {
   constructor(state, dispatch) {
      this.dom = this._createDom(state, dispatch);
   }

   _createDom = (state, dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${darkModeButtonBase.block}`);

      const checkbox = component.querySelector(
         "." + darkModeButtonBase.checkbox
      );
      checkbox.checked = state.ui.darkMode;

      component.addEventListener("change", () => {
         dispatch({ ui: { darkMode: checkbox.checked } });
      });

      return component;
   };
}

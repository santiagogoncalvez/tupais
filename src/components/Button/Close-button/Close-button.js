import htmlString from "@components/Button/Close-button/template.html?raw";
import "@components/Button/Close-button/style.css";
import {
   closeButtonBase,
   closeButtonModifiers,
} from "@components/Button/Close-button/Close-button-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class CloseButton {
   constructor(dispatch, action) {
      this.dom = this._createDom(dispatch, action);
   }

   _createDom = (dispatch, action) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + closeButtonBase.block);
      component.addEventListener("click", () => {
         dispatch(action);
      });

      return component;
   };

   _syncState(state) {
      if (this.state?.ui.darkMode != state?.ui.darkMode) {
         this._setDarkMode(state?.ui.darkMode);
      }

      this.state = state;
   }

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(
            this.dom,
            closeButtonBase,
            closeButtonModifiers,
            "darkMode"
         );
      }

      if (!isDarkMode) {
         deleteClasses(
            this.dom,
            closeButtonBase,
            closeButtonModifiers,
            "darkMode"
         );
      }
   }
}

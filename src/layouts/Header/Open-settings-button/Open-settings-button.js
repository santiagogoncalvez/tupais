import htmlString from "@layouts/Header/Open-settings-button/template.html?raw";
import "@layouts/Header/Open-settings-button/style.css";
import {
   openSettingsButtonBase,
   openSettingsButtonModifiers,
} from "@layouts/Header/Open-settings-button/Open-settings-button-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class OpenSettingsButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + openSettingsButtonBase.block);
      component.addEventListener("click", () => {
         dispatch({ ui: { settings: { show: true } } });
      });

      return component;
   };

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(
            this.dom,
            openSettingsButtonBase,
            openSettingsButtonModifiers,
            "darkMode"
         );
      }

      if (!isDarkMode) {
         deleteClasses(
            this.dom,
            openSettingsButtonBase,
            openSettingsButtonModifiers,
            "darkMode"
         );
      }
   }
}

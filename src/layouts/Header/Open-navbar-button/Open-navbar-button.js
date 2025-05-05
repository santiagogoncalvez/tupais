import htmlString from "@layouts/Header/Open-navbar-button/template.html?raw";
import "@layouts/Header/Open-navbar-button/style.css";
import {
   openNavbarButtonBase,
   openNavbarButtonModifiers,
} from "@layouts/Header/Open-navbar-button/Open-navbar-button-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class OpenNavbarButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom(dispatch) {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${openNavbarButtonBase.block}`);
      component.addEventListener("click", () => {
         dispatch({ ui: { navbar: { show: true } } });
      });

      return component;
   }

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(
            this.dom,
            openNavbarButtonBase,
            openNavbarButtonModifiers,
            "darkMode"
         );
      }

      if (!isDarkMode) {
         deleteClasses(
            this.dom,
            openNavbarButtonBase,
            openNavbarButtonModifiers,
            "darkMode"
         );
      }
   }
}

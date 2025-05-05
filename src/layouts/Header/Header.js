import htmlString from "@layouts/Header/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@layouts/Header/style.css";

//Components
import OpenNavbarButton from "@layouts/Header/Open-navbar-button/Open-navbar-button.js";
import OpenSettingsButton from "@layouts/Header/Open-settings-button/Open-settings-button.js";
import Navbar from "@layouts/Header/Navbar/Navbar.js";

import {
   headerBase,
   headerModifiers,
} from "@layouts/Header/Header-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class Header {
   constructor(state, dispatch) {
      this.openNavbarButton = new OpenNavbarButton(dispatch);
      this.openSettingsButton = new OpenSettingsButton(dispatch);
      this.navbar = new Navbar(state, dispatch);
      this.dom = this._createDom(
         this.openNavbarButton.dom,
         this.openSettingsButton.dom,
         this.navbar.dom
      );
      this._syncState(state);
   }

   _createDom = (openNavbarButton, openSettingsButton, navbar) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${headerBase.block}`);

      // Agregar elementos
      component.querySelector(".header__container").prepend(openNavbarButton);
      component
         .querySelector(".header__container")
         .appendChild(openSettingsButton);
      component.querySelector(".header__container").appendChild(navbar);

      return component;
   };

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(this.dom, headerBase, headerModifiers, "darkMode");
         this.openNavbarButton._setDarkMode(isDarkMode);
         this.openSettingsButton._setDarkMode(isDarkMode);
      }

      if (!isDarkMode) {
         deleteClasses(this.dom, headerBase, headerModifiers, "darkMode");
         this.openNavbarButton._setDarkMode(isDarkMode);
         this.openSettingsButton._setDarkMode(isDarkMode);
      }
   }

   _syncState(state) {
      this.navbar._syncState(state);
      let stIsDarkMode = state.ui.darkMode;
      if (this.isDarkMode == stIsDarkMode) return;
      this._setDarkMode(stIsDarkMode);
      this.isDarkMode = stIsDarkMode;
   }
}

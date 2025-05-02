import htmlString from "@components/Header/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@components/Header/style.css";

//Components
import OpenNavbarButton from "@components/Header/OpenNavbarButton/OpenNavbarButton.mjs";
import OpenSettingsButton from "@components/Header/OpenSettingsButton/OpenSettingsButton.mjs";
import Navbar from "@components/Header/Navbar/Navbar.mjs";

import { headerBase, headerModifiers } from "@constants/classes/header.mjs";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.mjs";

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
      const component = clone.querySelector(`.${headerBase.container}`);

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
      }

      if (!isDarkMode) {
         deleteClasses(this.dom, headerBase, headerModifiers, "darkMode");
      }
   }

   _syncState(state) {
      let stIsDarkMode = state.ui.darkMode;
      if (this.isDarkMode == stIsDarkMode) return;
      this._setDarkMode(stIsDarkMode);
      this.isDarkMode = stIsDarkMode;
   }
}

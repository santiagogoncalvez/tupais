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
import BaseComponent from "@shared/Base-component.js";

export default class Header extends BaseComponent {
   constructor(state, dispatch) {
      super();
      this.htmlString = htmlString;
      this.base = headerBase;
      this.modifiers = headerModifiers;
      this.openNavbarButton = new OpenNavbarButton(dispatch);
      this.openSettingsButton = new OpenSettingsButton(dispatch);
      this.navbar = new Navbar(state, dispatch);
      this.dom = this._createDom();
      this._init();
      this._syncState(state);
   }
   _syncState(state) {
      this.navbar._syncState(state);
      this.openNavbarButton._syncState(state);
      this.openSettingsButton._syncState(state);
      let stIsDarkMode = state.ui.darkMode;
      if (this.isDarkMode == stIsDarkMode) return;
      this._setDarkMode(stIsDarkMode);
      this.isDarkMode = stIsDarkMode;
   }
   _init() {
      // Agregar elementos
      this.dom
         .querySelector(".header__container")
         .prepend(this.openNavbarButton.dom);
      this.dom
         .querySelector(".header__container")
         .appendChild(this.openSettingsButton.dom);
      this.dom.querySelector(".header__container").appendChild(this.navbar.dom);
   }
}

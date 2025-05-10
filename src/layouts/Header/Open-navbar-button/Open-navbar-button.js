import htmlString from "@layouts/Header/Open-navbar-button/template.html?raw";
import "@layouts/Header/Open-navbar-button/style.css";
import {
   openNavbarButtonBase,
   openNavbarButtonModifiers,
} from "@layouts/Header/Open-navbar-button/Open-navbar-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class OpenNavbarButton extends BaseComponent {
   constructor(dispatch) {
      super();
      this.htmlString = htmlString;
      this.base = openNavbarButtonBase;
      this.modifiers = openNavbarButtonModifiers;
      this.dom = this._createDom();
      this._init(dispatch);
   }

   _syncState(state) {
      this._setDarkMode(state.ui.darkMode);
   }

   _init(dispatch) {
      this.dom.addEventListener("click", () => {
         dispatch({ ui: { navbar: { show: true } } });
      });
   }
}

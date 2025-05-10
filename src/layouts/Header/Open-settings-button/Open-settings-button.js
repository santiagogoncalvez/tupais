import htmlString from "@layouts/Header/Open-settings-button/template.html?raw";
import "@layouts/Header/Open-settings-button/style.css";
import {
   openSettingsButtonBase,
   openSettingsButtonModifiers,
} from "@layouts/Header/Open-settings-button/Open-settings-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class OpenSettingsButton extends BaseComponent {
   constructor(dispatch) {
      super();
      this.htmlString = htmlString;
      this.base = openSettingsButtonBase;
      this.modifiers = openSettingsButtonModifiers;
      this.dom = this._createDom();
      this._init(dispatch);
   }

   _init(dispatch) {
      this.dom.addEventListener("click", () => {
         dispatch({ ui: { settings: { show: true } } });
      });
   }

   _syncState(state) {
      this._setDarkMode(state.ui.darkMode);
   }
}

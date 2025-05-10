import htmlString from "@components/Button/Close-button/template.html?raw";
import "@components/Button/Close-button/style.css";
import {
   closeButtonBase,
   closeButtonModifiers,
} from "@components/Button/Close-button/Close-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class CloseButton extends BaseComponent {
   constructor(dispatch, action) {
      super();
      this.htmlString = htmlString;
      this.base = closeButtonBase;
      this.modifiers = closeButtonModifiers;
      this.dom = this._createDom();
      this._init(dispatch, action);
   }

   _syncState(state) {
      if (this.state?.ui.darkMode != state?.ui.darkMode) {
         this._setDarkMode(state?.ui.darkMode);
      }

      this.state = state;
   }

   _init(dispatch, action) {
      this.dom.addEventListener("click", () => {
         dispatch(action);
      });
   }
}

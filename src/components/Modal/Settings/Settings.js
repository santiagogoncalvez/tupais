import htmlString from "@Modal/Settings/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/style.css";

// Components
import DarkModeButton from "@Modal/Settings/Dark-mode-button/dark-mode-button.js";
import CloseButton from "@layouts/Header/Navbar/Close-button/Close-button";

import {
   settingsBase,
   settingsModifiers,
} from "@Modal/Settings/Settings-class-names.js";

export default class Settings {
   constructor(state, dispatch) {
      this.closeButton = new CloseButton(dispatch);
      this.darkModeButton = new DarkModeButton(state, dispatch);
      this.dom = this._createDom();
      this._syncState(state);
   }

   _createDom = () => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + settingsBase.block);

      component.prepend(this.closeButton.dom);
      component
         .querySelector("." + settingsBase.subtitle)
         .insertAdjacentElement("afterend", this.darkModeButton.dom);

      return component;
   };

   _show(isShow) {
      if (isShow) {
         this.dom.classList.add(settingsModifiers.show.block);
      }

      if (!isShow) {
         this.dom.classList.remove(settingsModifiers.show.block);
      }
   }

   _syncState(state) {
      let isShow = state.ui.settings.show;
      if (this.isShow == isShow) return;
      this._show(isShow);
      this.isShow == isShow;
   }
}

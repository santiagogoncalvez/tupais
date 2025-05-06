import htmlString from "@Modal/Settings/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/style.css";

// Components
import DarkModeButton from "@Modal/Settings/Dark-mode-button/dark-mode-button.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";
import ContinentSelector from "@Modal/Settings/Continent-selector/Continent-selector.js";

import {
   settingsBase,
   settingsModifiers,
} from "@Modal/Settings/Settings-class-names.js";

export default class Settings {
   constructor(state, dispatch) {
      this.closeButton = new CloseButton(dispatch, {
         ui: {
            settings: { show: false },
         },
      });
      this.darkModeButton = new DarkModeButton(state, dispatch);
      this.continentSelector = new ContinentSelector(dispatch);
      this.dom = this._createDom();
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
      component
         .querySelector("." + settingsBase.label)
         .insertAdjacentElement("afterend", this.continentSelector.dom);

      return component;
   };

   _show(isShow) {
      if (isShow) {
         this.dom.classList.add(settingsModifiers.display.block);

         // Esperamos un frame para que el navegador pinte el display: flex antes de animar la opacidad ()
         requestAnimationFrame(() => {
            this.dom.classList.add(settingsModifiers.show.block);
         });
      }

      if (!isShow) {
         this.dom.classList.remove(settingsModifiers.show.block);

         if (this.dom.classList.contains(settingsModifiers.display.block)) {
            this.dom.addEventListener(
               "transitionend",
               () => {
                  this.dom.classList.remove(settingsModifiers.display.block);
               },
               { once: true }
            );
         }
      }
   }

   _syncState(state) {
      let isShow = state.ui.settings.show;
      if (this.isShow == isShow) return;
      this._show(isShow);
      this.isShow == isShow;
   }
}

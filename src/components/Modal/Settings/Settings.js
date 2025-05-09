import htmlString from "@Modal/Settings/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/style.css";

// Components
import DarkModeButton from "@Modal/Settings/Dark-mode-button/dark-mode-button.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";
import ContinentSelector from "@Modal/Settings/Continent-selector/Continent-selector.js";
import StartButton from "@Modal/Settings/Start-button/Start-button.js";

import {
   settingsBase,
   settingsModifiers,
} from "@Modal/Settings/Settings-class-names.js";
import { CONTINENTS_NAMES } from "@constants/continentsNames.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class Settings {
   constructor(state, dispatch) {
      this.state = state;
      this.continent = CONTINENTS_NAMES.ALL;
      this.closeButton = new CloseButton(dispatch, {
         ui: {
            settings: { show: false },
         },
      });
      this.darkModeButton = new DarkModeButton(state, dispatch);
      this.continentSelector = new ContinentSelector(
         this._setContinentValue.bind(this)
      );
      this.startButton = new StartButton(
         dispatch,
         this._getContinentValue.bind(this)
      );
      this.dom = this._createDom();
   }

   _createDom = () => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + settingsBase.block);

      component
         .querySelector("." + settingsBase.container)
         .appendChild(this.startButton.dom);

      component.prepend(this.closeButton.dom);
      component
         .querySelector("." + settingsBase.subtitle)
         .insertAdjacentElement("afterend", this.darkModeButton.dom);
      component
         .querySelector("." + settingsBase.continentsText)
         .insertAdjacentElement("afterend", this.continentSelector.dom);

      return component;
   };

   _syncState(state) {
      if (this.state.ui.settings.show != state.ui.settings.show) {
         this._show(state.ui.settings.show);
         this.isShow = state.ui.settings.show;
      }

      if (this.state.ui.darkMode != state.ui.darkMode) {
         this._setDarkMode(state.ui.darkMode);
         this.startButton._setDarkMode(state.ui.darkMode);
         this.continentSelector._setDarkMode(state.ui.darkMode);
      }

      this.closeButton._syncState(state);

      this.state = state;
   }

   _show(isShow) {
      if (isShow) {
         this.dom.classList.add(settingsModifiers.display.block);
         // Esperamos un frame para que el navegador pinte el display: flex antes de animar la opacidad ()
         requestAnimationFrame(() => {
            this.dom.classList.add(settingsModifiers.show.block);
         });
      }

      if (!isShow) {
         //Solo se debe ejecutar está en este momento mostrado.
         this.dom.classList.remove(settingsModifiers.show.block);

         this.dom.addEventListener(
            "transitionend",
            () => {
               this.dom.classList.remove(settingsModifiers.display.block);
            },
            { once: true }
         );
      }
   }

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(this.dom, settingsBase, settingsModifiers, "darkMode");
      }

      if (!isDarkMode) {
         deleteClasses(this.dom, settingsBase, settingsModifiers, "darkMode");
      }
   }

   _setContinentValue(value) {
      this.continent = value;
   }

   _getContinentValue() {
      return this.continent;
   }
}

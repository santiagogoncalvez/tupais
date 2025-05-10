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
import BaseComponent from "@shared/Base-component.js";

export default class Settings extends BaseComponent {
   constructor(state, dispatch) {
      super();
      this.htmlString = htmlString;
      this.base = settingsBase;
      this.modifiers = settingsModifiers;
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
      this._init();
   }

   _init() {
      this.dom
         .querySelector("." + settingsBase.container)
         .appendChild(this.startButton.dom);

      this.dom.prepend(this.closeButton.dom);
      this.dom
         .querySelector("." + settingsBase.subtitle)
         .insertAdjacentElement("afterend", this.darkModeButton.dom);
      this.dom
         .querySelector("." + settingsBase.continentsText)
         .insertAdjacentElement("afterend", this.continentSelector.dom);
   }

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

   _setContinentValue(value) {
      this.continent = value;
   }

   _getContinentValue() {
      return this.continent;
   }
}

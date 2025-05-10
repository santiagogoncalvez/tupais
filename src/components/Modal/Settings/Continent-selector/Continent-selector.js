import htmlString from "@Modal/Settings/Continent-selector/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/Continent-selector/style.css";

import {
   continentSelectorBase,
   continentSelectorModifiers,
} from "@Modal/Settings/Continent-selector/Continent-selector-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import { CONTINENTS_NAMES } from "@constants/continentsNames.js";

export default class continentSelector extends BaseComponent {
   constructor(setContinentValue) {
      super();
      this.htmlString = htmlString;
      this.base = continentSelectorBase;
      this.modifiers = continentSelectorModifiers;
      this.continent = CONTINENTS_NAMES.ALL;
      this.dom = this._createDom();
      this._init(setContinentValue);
   }

   _syncState(state) {
      if (this.state?.ui.darkMode != state?.ui.darkMode) {
         this._setDarkMode(state?.ui.darkMode);
         this.startButton._setDarkMode(state?.ui.darkMode);
      }

      this.state = state;
   }

   _init(setContinentValue) {
      const containerOptions = this.dom.querySelector(
         "." + continentSelectorBase.container.block
      );
      const options = containerOptions.querySelectorAll(
         "." + continentSelectorBase.container.option
      );
      const button = this.dom.querySelector(
         "." + continentSelectorBase.button.block
      );
      const buttonText = this.dom.querySelector(
         "." + continentSelectorBase.button.text
      );
      let firstClick = true;

      let buttonEvent = (_showOptions) => {
         this._showOptions(containerOptions, true);

         window.addEventListener("click", outsideButton);
      };
      let outsideButton = (event) => {
         if (!firstClick) {
            if (!containerOptions.contains(event.target)) {
               this._showOptions(containerOptions, false);
               firstClick = true;
               window.removeEventListener("click", outsideButton);
            } else {
               if (event.target == button || button.contains(event.target)) {
                  this._showOptions(containerOptions, true);
               }
            }
         } else {
            firstClick = false;
         }
      };
      button.addEventListener("click", buttonEvent);

      for (let option of options) {
         option.addEventListener("click", () => {
            buttonText.textContent = option.textContent;
            this.continent = CONTINENTS_NAMES[option.dataset.value];
            setContinentValue(this.continent);
            this._showOptions(containerOptions, false);
            firstClick = true;
            window.removeEventListener("click", outsideButton);
         });
      }
   }

   _showOptions(container, isShow) {
      if (isShow) {
         container.classList.add(
            continentSelectorModifiers.display.container.block
         );
         requestAnimationFrame(() => {
            container.classList.add(
               continentSelectorModifiers.show.container.block
            );
         });
      }
      if (!isShow) {
         container.classList.remove(
            continentSelectorModifiers.show.container.block
         );
         container.addEventListener(
            "transitionend",
            () => {
               container.classList.remove(
                  continentSelectorModifiers.display.container.block
               );
            },
            { once: true }
         );
      }
   }

   getSelectedContinent() {
      return this.continent;
   }
}

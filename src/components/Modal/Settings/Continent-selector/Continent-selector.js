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

      let buttonEvent = (event) => {
         event.stopImmediatePropagation();   
         this._showOptions(containerOptions, true);
         containerOptions.focus();

         let escEvent = (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            if (event.key == "Escape") {
               this._showOptions(containerOptions, false);
               window.removeEventListener("click", outsideButton);
            }
         };
         window.addEventListener("click", outsideButton, { once: true });
         containerOptions.addEventListener("keydown", escEvent);
      };

      let outsideButton = (event) => {
         if (!containerOptions.contains(event.target)) {
            window.removeEventListener("click", outsideButton);
            this._showOptions(containerOptions, false);
         }
      };

      button.addEventListener("click", buttonEvent);

      for (let option of options) {
         option.addEventListener("click", (event) => {
            event.stopPropagation();
            buttonText.textContent = option.textContent;
            this.continent = CONTINENTS_NAMES[option.dataset.value];
            setContinentValue(this.continent);

            this._showOptions(containerOptions, false);
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

            this._showBackdrop(true);
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
               this._showBackdrop(false);
            },
            { once: true }
         );
      }
   }

   _showBackdrop(isShow) {
      const modalBackdrop = this.dom.querySelector(
         "." + continentSelectorBase.modalBackdrop
      );
      if (isShow) {
         modalBackdrop.classList.add(
            continentSelectorModifiers.show.modalBackdrop
         );
      }
      if (!isShow) {
         modalBackdrop.classList.remove(
            continentSelectorModifiers.show.modalBackdrop
         );
      }
   }

   getSelectedContinent() {
      return this.continent;
   }
}

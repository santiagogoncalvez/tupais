import htmlString from "@Modal/Settings/Continent-selector/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/Continent-selector/style.css";

import {
   continentSelectorBase,
   continentSelectorModifiers,
} from "@Modal/Settings/Continent-selector/Continent-selector-class-names.js";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";
import { CONTINENTS_NAMES } from "@constants/continentsNames.js";

export default class continentSelector {
   constructor(setContinentValue) {
      this.continent = CONTINENTS_NAMES.ALL;
      this.dom = this._createDom(setContinentValue);
   }

   _createDom(setContinentValue) {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + continentSelectorBase.block);
      const containerOptions = component.querySelector(
         "." + continentSelectorBase.container.block
      );
      const options = containerOptions.querySelectorAll(
         "." + continentSelectorBase.container.option
      );
      const button = component.querySelector(
         "." + continentSelectorBase.button.block
      );
      const buttonText = component.querySelector(
         "." + continentSelectorBase.button.text
      );

      for (let option of options) {
         option.addEventListener("click", () => {
            buttonText.textContent = option.textContent;
            this._showOptions(containerOptions, false);
            this.continent = CONTINENTS_NAMES[option.dataset.value];
            setContinentValue(this.continent);
         });
      }

      window.addEventListener("click", (event) => {
         if (
            containerOptions.classList.contains(
               continentSelectorModifiers.display.container.block
            )
         ) {
            if (event.target != containerOptions) {
               this._showOptions(containerOptions, false);
            }
         } else {
            if (event.target == button || button.contains(event.target)) {
               this._showOptions(containerOptions, true);
            }
         }
      });

      return component;
   }

   _syncState(state) {
      if (this.state?.ui.darkMode != state?.ui.darkMode) {
         this._setDarkMode(state?.ui.darkMode);
         this.startButton._setDarkMode(state?.ui.darkMode);
      }

      this.state = state;
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

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(
            this.dom,
            continentSelectorBase,
            continentSelectorModifiers,
            "darkMode"
         );
      }

      if (!isDarkMode) {
         deleteClasses(
            this.dom,
            continentSelectorBase,
            continentSelectorModifiers,
            "darkMode"
         );
      }
   }
}

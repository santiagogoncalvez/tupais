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
      let hasMouseMove = true;

      let escEvent = (event) => {
         event.preventDefault();
         event.stopPropagation();
         event.stopImmediatePropagation();
         if (event.key == "Escape") {
            this._showOptions(containerOptions, false);
            window.removeEventListener("click", outsideButton);
            containerOptions.removeEventListener("keydown", escEvent);
            button.focus();
         }

         let currentOption = containerOptions.querySelector(
            "." + continentSelectorModifiers.selectedOption.container.option
         );
         if (event.key == "ArrowUp") {
            hasMouseMove = true;
            let previous = currentOption.previousElementSibling;
            if (previous) {
               currentOption.classList.remove(
                  continentSelectorModifiers.selectedOption.container.option
               );
               previous.classList.add(
                  continentSelectorModifiers.selectedOption.container.option
               );
            }
         }

         if (event.key == "ArrowDown") {
            hasMouseMove = true;
            let next = currentOption.nextElementSibling;
            if (next) {
               currentOption.classList.remove(
                  continentSelectorModifiers.selectedOption.container.option
               );
               next.classList.add(
                  continentSelectorModifiers.selectedOption.container.option
               );
            }
         }

         if (event.key == "Enter") {
            let currentOption = containerOptions.querySelector(
               "." + continentSelectorModifiers.selectedOption.container.option
            );
            currentOption.click();
         }
      };

      // Eventos del boton
      let buttonEvent = (event) => {
         event.stopImmediatePropagation();
         this._showOptions(containerOptions, true);
         containerOptions.focus();
         window.addEventListener("click", outsideButton, { once: true });
         containerOptions.addEventListener("keydown", escEvent);
         let currentOption = containerOptions.querySelector(
            `[data-value=${this.continent}]`
         );
         currentOption.classList.add(
            continentSelectorModifiers.selectedOption.container.option
         );
      };

      let outsideButton = (event) => {
         if (!containerOptions.contains(event.target)) {
            window.removeEventListener("click", outsideButton);
            this._showOptions(containerOptions, false);
            containerOptions.removeEventListener("keydown", escEvent);
            button.focus();
         }
      };

      button.addEventListener("click", buttonEvent);
      button.addEventListener("keydown", (event) => {
         if (event.key == "ArrowDown") {
            button.click();
         }
      });

      // Eventos de las opciones
      for (let option of options) {
         option.addEventListener("click", (event) => {
            event.stopPropagation();
            buttonText.textContent = option.textContent;
            this.continent = option.dataset.value;
            setContinentValue(this.continent);
            window.removeEventListener("click", outsideButton);
            containerOptions.removeEventListener("keydown", escEvent);
            this._showOptions(containerOptions, false);
            button.focus();
         });

         let mouseMoveEvent = () => {
            if (hasMouseMove) {
               let currentOption = containerOptions.querySelector(
                  "." +
                     continentSelectorModifiers.selectedOption.container.option
               );
               currentOption.classList.remove(
                  continentSelectorModifiers.selectedOption.container.option
               );
               option.classList.add(
                  continentSelectorModifiers.selectedOption.container.option
               );
               hasMouseMove = false;
            }
         };

         option.addEventListener("mouseenter", () => {
            let currentOption = containerOptions.querySelector(
               "." + continentSelectorModifiers.selectedOption.container.option
            );
            if (currentOption) {
               currentOption.classList.remove(
                  continentSelectorModifiers.selectedOption.container.option
               );
            }
            option.classList.add(
               continentSelectorModifiers.selectedOption.container.option
            );
            option.addEventListener("mousemove", mouseMoveEvent);
         });
         option.addEventListener("mouseleave", () => {
            let currentOption = containerOptions.querySelector(
               "." + continentSelectorModifiers.selectedOption.container.option
            );

            currentOption.classList.remove(
               continentSelectorModifiers.selectedOption.container.option
            );
            option.removeEventListener("mousemove", mouseMoveEvent);
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

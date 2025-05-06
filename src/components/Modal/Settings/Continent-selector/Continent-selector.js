import htmlString from "@Modal/Settings/Continent-selector/template.html?raw";

// Styles
import "@src/styles/general.css";
import "@Modal/Settings/Continent-selector/style.css";

import { continentSelectorBase } from "@Modal/Settings/Continent-selector/Continent-selector-class-names.js";

export default class continentSelector {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = () => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + continentSelectorBase.block);
      const container = component.querySelector(
         "." + continentSelectorBase.container.block
      );
      const options = container.querySelectorAll(
         "." + continentSelectorBase.container.option
      );
      const buttonText = component.querySelector(
         "." + continentSelectorBase.button.text
      );

      component
         .querySelector("." + "continent-selector__button")
         .addEventListener("click", () => {
            this._showOptions(container);
         });

      for (let option of options) {
         option.addEventListener("click", () => {
            buttonText.textContent = option.textContent;
            this._showOptions(container);
         });
      }

      return component;
   };

   _showOptions(container) {
      if (
         container.classList.contains("continent-selector__options--display")
      ) {
         container.classList.remove("continent-selector__options--show");

         container.addEventListener(
            "transitionend",
            () => {
               container.classList.remove(
                  "continent-selector__options--display"
               );
            },
            { once: true }
         );
      } else {
         container.classList.add("continent-selector__options--display");
         requestAnimationFrame(() => {
            container.classList.add("continent-selector__options--show");
         });
      }
   }
}

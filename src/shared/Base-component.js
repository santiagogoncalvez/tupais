import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class BaseComponent {
   _createDom = () => {
      const template = document.createElement("template");
      template.innerHTML = this.htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + this.base.block);
      return component;
   };

   _setDarkMode(isDarkMode) {
      if (isDarkMode) {
         applyClasses(this.dom, this.base, this.modifiers, "darkMode");
      }

      if (!isDarkMode) {
         deleteClasses(this.dom, this.base, this.modifiers, "darkMode");
      }
   }
}

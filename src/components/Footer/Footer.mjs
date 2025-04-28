import htmlString from "@components/Footer/template.html?raw";
import "@components/Footer/style.css";
import { footerBase, footerModifiers } from "@constants/classes/footer.mjs";
import { applyClasses, deleteClasses } from "@utils/dom-class-handler.mjs";

export default class Footer {
   constructor(state) {
      this.dom = this._createDom();
      this._syncState(state);
   }

   _createDom = () => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;

      const component = template.content.cloneNode(true);

      return component.querySelector(".footer");
   };

   _setDarkMode(state) {
      if (state.darkMode) {
         applyClasses(this.dom, footerBase, footerModifiers, "darkMode");
      }

      if (!state.darkMode) {
         deleteClasses(this.dom, footerBase, footerModifiers, "darkMode");
      }
   }

   _syncState(state) {
      if (this.isDarkMode == state.darkMode) return;
      this._setDarkMode(state);
      this.isDarkMode = state.darkMode;
   }
}

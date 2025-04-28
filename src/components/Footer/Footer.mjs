import template from "@components/Footer/template.html?raw";
import "@components/Footer/style.css";

export default class Footer {
   constructor(state) {
      this.dom = this._createDom();
      this._syncState(state);
   }

   _createDom = () => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      const component = tempContainer.querySelector("template").content;
      const componentClone = component.querySelector(".footer").cloneNode(true);

      return componentClone;
   };

   _setDarkMode(state) {
      const containerClass = "footer--dark-mode";
      const classList = {
         footer__paragraph: "footer__paragraph--dark-mode",
         "footer__icon-github": "footer__icon-github--dark-mode",
      };

      if (state.darkMode) {
         this.dom.classList.add(containerClass);

         for (let elt of Object.keys(classList)) {
            this.dom.querySelector(`.${elt}`).classList.add(classList[elt]);
         }
      }

      if (!state.darkMode) {
         this.dom.classList.remove(containerClass);

         for (let elt of Object.keys(classList)) {
            this.dom.querySelector(`.${elt}`).classList.remove(classList[elt]);
         }
      }
   }

   _syncState(state) {
      if (this.isDarkMode == state.darkMode) return;
      this._setDarkMode(state);
      this.isDarkMode = state.darkMode;
   }
}

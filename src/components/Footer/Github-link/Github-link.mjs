import template from "@components/Footer/Github-link/template.html?raw";
import "@components/Footer/Github-link/style.css";

export default class GithubLink {
   constructor(state) {
      this.dom = this._createDom();
      this._syncState(state);
   }

   _createDom = () => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      const component = tempContainer.querySelector("template").content;
      const componentClone = component
         .querySelector(".footer__icon-github")
         .cloneNode(true);

      return componentClone;
   };

   _syncState(state) {
      if (state.darkMode) {
         this.dom.classList.add("footer__icon-github--dark-mode");
      }

      if (!state.darkMode) {
         this.dom.classList.remove("footer__icon-github--dark-mode");
      }

      this.isDarkMode = state.darkMode;
   }
}

import template from "@components/Footer/template.html?raw";
import "@components/Footer/style.css";

import GithubLink from "@components/Footer/Github-link/Github-link.mjs";

export default class Footer {
   constructor(state) {
      this.githubLink = new GithubLink(state);
      this.dom = this._createDom(this.githubLink.dom);
      this._syncState(state);
   }

   _createDom = (...elements) => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      const component = tempContainer.querySelector("template").content;
      const componentClone = component.querySelector(".footer").cloneNode(true);

      for (let element of elements) {
         componentClone.appendChild(element);
      }

      return componentClone;
   };

   _syncState(state) {
      if (this.isDarkMode == state.darkMode) return;

      if (state.darkMode) {
         this.dom.classList.add("footer--dark-mode");
         this.dom
            .querySelector(".footer__paragraph")
            .classList.add("footer__paragraph--dark-mode");
      }

      if (!state.darkMode) {
         this.dom.classList.remove("footer--dark-mode");
         this.dom
            .querySelector(".footer__paragraph")
            .classList.remove("footer__paragraph--dark-mode");
      }

      this.githubLink._syncState(state);

      this.isDarkMode = state.darkMode;
   }
}

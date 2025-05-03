import htmlString from "@layouts/Header/Open-navbar-button/template.html?raw";
import "@layouts/Header/Open-navbar-button/style.css";
import { openNavbarButtonBase } from "@layouts/Header/Open-navbar-button/Open-navbar-button-class-names.js";

export default class OpenNavbarButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${openNavbarButtonBase.block}`);
      component.addEventListener("click", () => {
         dispatch({ ui: { navbar: { show: true } } });
      });

      return component;
   };
}

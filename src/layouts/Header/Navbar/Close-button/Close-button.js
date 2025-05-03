import htmlString from "@layouts/Header/Navbar/Close-button/template.html?raw";
import "@layouts/Header/Navbar/Close-button/style.css";
import { closeButtonBase } from "@layouts/Header/Navbar/Close-button/Close-button-class-names.js";

export default class CloseButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${closeButtonBase.block}`);
      component.addEventListener("click", () => {
         dispatch({ ui: { navbar: { show: false } } });
      });

      return component;
   };
}

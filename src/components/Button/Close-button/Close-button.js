import htmlString from "@components/Button/Close-button/template.html?raw";
import "@components/Button/Close-button/style.css";
import { closeButtonBase } from "@components/Button/Close-button/Close-button-class-names.js";

export default class CloseButton {
   constructor(dispatch, action) {
      this.dom = this._createDom(dispatch, action);
   }

   _createDom = (dispatch, action) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + closeButtonBase.block);
      component.addEventListener("click", () => {
         dispatch(action);
      });

      return component;
   };
}

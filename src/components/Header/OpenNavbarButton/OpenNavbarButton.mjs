import htmlString from "@components/Header/OpenNavbarButton/template.html?raw";
import "@components/Header/OpenNavbarButton/style.css";
import { headerBase } from "@constants/classes/Header.mjs";

export default class OpenNavbarButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${headerBase.openNavbarButton}`);
      component.addEventListener("click", () => {
         dispatch({ ui: { navbar: { show: true } } });
      });

      return component;
   };
}

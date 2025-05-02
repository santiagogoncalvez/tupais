import htmlString from "@components/Header/Navbar/CloseButton/template.html?raw";
import "@components/Header/Navbar/CloseButton/style.css";
import { navbarBase } from "@constants/classes/Navbar.mjs";

export default class CloseButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(`.${navbarBase.button.container}`);
      component.addEventListener("click", () => {
         dispatch({ ui: { navbar: { show: false } } });
      });

      return component;
   };
}

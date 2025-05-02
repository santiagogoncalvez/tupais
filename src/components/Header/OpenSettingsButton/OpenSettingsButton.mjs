import htmlString from "@components/Header/OpenSettingsButton/template.html?raw";
import "@components/Header/OpenSettingsButton/style.css";
import { headerBase } from "@constants/classes/Header.mjs";

export default class OpenSettingsButton {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector(
         `.${headerBase.openSettingsButton}`
      );
      component.addEventListener("click", () => {
         dispatch({ ui: { settings: { show: true } } });
      });

      return component;
   };
}

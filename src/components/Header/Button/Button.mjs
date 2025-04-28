import template from "@components/Header/Button/template.html?raw";
import "@components/Header/Button/style.css";

//TODO: probar el componente y desarrollar 'dispatch'
export default class Button {
   constructor(dispatch) {
      this.dom = this._createDom(dispatch);
   }

   _createDom = (dispatch) => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      const component = tempContainer.querySelector("template").content;
      const componentClone = component
         .querySelector(".navbar__button--close")
         .cloneNode(true);

      component.addEventListener("onclick", () => {
         dispatch({ navbar: { show: true } });
      });

      return componentClone;
   };
}

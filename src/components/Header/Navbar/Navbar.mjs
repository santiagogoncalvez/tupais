import template from "@components/Header/Navbar/template.html?raw";
import "@components/Header/Navbar/style.css";

export default class Footer {
   constructor(state) {
      this.dom = this._createDom();
      this._syncState(state);
   }

   _createDom = () => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;

      const component = tempContainer.querySelector("template").content;
      const componentClone = component.querySelector(".navbar").cloneNode(true);

      return componentClone;
   };
   _syncState(state) {
      if (this.show == state.navbar.show) return;
      //Mostrar el navbar
      if (state.navbar.show) this.dom.classList.add("navbar--show");
      if (!state.navbar.show) this.dom.classList.remove("navbar--show");
      this.show = state.navbar.show;
   }
}

import htmlString from "@layouts/Header/Navbar/template.html?raw";
//Styles
import "@layouts/Header/Navbar/style.css";
import "@src/styles/general.css";

import { navbarBase } from "@layouts/Header/Navbar/Navbar-class-names.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";

export default class Navbar {
   constructor(state, dispatch) {
      this.button = new CloseButton(dispatch, {
         ui: {
            navbar: { show: false },
         },
      });
      this.dom = this._createDom(this.button.dom);
      this._syncState(state);
   }

   _createDom = (element) => {
      const template = document.createElement("template");
      template.innerHTML = htmlString;
      const clone = template.content.cloneNode(true);
      const component = clone.querySelector("." + navbarBase.block);

      component.prepend(element);

      return component;
   };

   _showDom(show) {
      if (show) this.dom.classList.add("navbar--show");
      if (!show) this.dom.classList.remove("navbar--show");
   }

   _syncState(state) {
      //Show navbar
      if (this.state?.ui.navbar.show != state.ui?.navbar.show) {
         this._showDom(state.ui.navbar.show);
      }

      this.state = state;
   }
}

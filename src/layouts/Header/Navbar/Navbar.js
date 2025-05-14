import htmlString from "@layouts/Header/Navbar/template.html?raw";
//Styles
import "@layouts/Header/Navbar/style.css";
import "@src/styles/general.css";
import {
   navbarBase,
   navbarModifiers,
} from "@layouts/Header/Navbar/Navbar-class-names.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";
import BaseComponent from "@shared/Base-component.js";

export default class Navbar extends BaseComponent {
   constructor(state, dispatch) {
      super();
      this.htmlString = htmlString;
      this.base = navbarBase;
      this.modifiers = navbarModifiers;
      this.dispatch = dispatch;
      this.button = new CloseButton(this.dispatch, {
         ui: {
            navbar: { show: false },
         },
      });
      this.dom = this._createDom();
      this._init();
      this._syncState(state);
   }

   _init() {
      this.dom.prepend(this.button.dom);
      this.dom.addEventListener("keydown", (event) => {
         console.log(event);
         if (event.key == "Escape") {
            this.dispatch({ ui: { navbar: { show: false } } });
         }
      });
   }

   _syncState(state) {
      if (this.state?.ui.navbar.show != state?.ui.navbar.show) {
         this._showDom(state?.ui.navbar.show);
      }

      if (this.state?.ui.darkMode != state?.ui.darkMode) {
         this._setDarkMode(state?.ui.darkMode);
      }

      this.state = state;
   }

   _showDom(show) {
      if (show) {
         this.dom.classList.add("navbar--show");
         this.dom.focus();
         let clickEvent = (event) => {
            if (!this.dom.contains(event.target)) {
               this.dispatch({ ui: { navbar: { show: false } } });
               window.removeEventListener("click", clickEvent);
            }
         };
         window.addEventListener("click", clickEvent);
      }
      if (!show) this.dom.classList.remove("navbar--show");
   }
}

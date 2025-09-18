import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Header/Navbar/template.html?raw";
//Styles
import "@components/Header/Navbar/style.css";

import {
  base,
  modifiers,
} from "@components/Header/Navbar/Navbar-class-names.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";
import BaseComponent from "@shared/Base-component.js";

export default class Navbar extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.closeButton = new CloseButton(this.dispatch, {
      type: ACTIONS.CLOSE_NAVBAR,
    }, { top: "8px", right: "8px" });
    this.dom = this._createDom();
    this._init();
  }

  _init() {
    this.dom.prepend(this.closeButton.dom);

    const links = this.dom.querySelectorAll(".navbar__link");
    for (let link of links) {
      link.addEventListener("click", (event) => { // evita que recargue
        const route = link.getAttribute("href");
        this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
      });
    }
  }

  syncState(state) {
    if (this.state?.ui.navbar.show != state?.ui.navbar.show) {
      this._showDom(state?.ui.navbar.show);
      this._activeEvents(state?.ui.navbar.show);
    }
    if (this.state?.ui.darkMode != state?.ui.darkMode) {
      this._setDarkMode(state?.ui.darkMode);
    }
    this.state = state;
  }

  _showDom(show) {
    if (show) {
      this.dom.classList.add(this.modifiers.show);
      this.dom.focus();
    }
    if (!show) this.dom.classList.remove(this.modifiers.show);
  }
  _activeEvents(isActive) {
    if (!this._clickEvent) {
      this._clickEvent = (event) => {
        if (!this.dom.contains(event.target)) {
          this.dispatch({ type: ACTIONS.CLOSE_NAVBAR });
        }
      };
    }
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          this.closeButton.dom.click();
          this.dom.blur();
          this.dom.removeEventListener("keydown", this._escEvent);
        }
      };
    }
    if (isActive) {
      window.addEventListener("click", this._clickEvent);
      this.dom.addEventListener("keydown", this._escEvent);
    } else {
      window.removeEventListener("click", this._clickEvent);
      this.dom.removeEventListener("keydown", this._escEvent);
    }
  }
}

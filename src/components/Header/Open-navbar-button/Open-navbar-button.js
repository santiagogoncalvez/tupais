import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Header/Open-navbar-button/template.html?raw";
import "@components/Header/Open-navbar-button/style.css";
import {
  base,
  modifiers,
} from "@components/Header/Open-navbar-button/Open-navbar-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class OpenNavbarButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.show = state.ui.navbar.show;
    this.dom = this._createDom();
    this._init(dispatch);
  }

  syncState(state) {
    this._setDarkMode(state.ui.darkMode);
    this.show = state.ui.navbar.show;
  }

  _init(dispatch) {
    this.dom.addEventListener("click", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      dispatch({ type: ACTIONS.TOGGLE_NAVBAR });
    });
  }
}

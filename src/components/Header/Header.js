import htmlString from "@components/Header/template.html?raw";

// Styles
import "@components/Header/style.css";

//Components
import OpenNavbarButton from "@components/Header/Open-navbar-button/Open-navbar-button.js";
import OpenSettingsButton from "@components/Header/Open-settings-button/Open-settings-button.js";
import Navbar from "@components/Header/Navbar/Navbar.js";

import {
  headerBase,
  headerModifiers,
} from "@components/Header/Header-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Header extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = headerBase;
    this.modifiers = headerModifiers;
    this.openNavbarButton = new OpenNavbarButton(state, dispatch);
    this.openSettingsButton = new OpenSettingsButton(dispatch);
    this.navbar = new Navbar(state, dispatch);
    this.dom = this._createDom();
    this._init();
    this.syncState(state);
  }
  syncState(state) {
    this.navbar.syncState(state);
    this.openNavbarButton.syncState(state);
    this.openSettingsButton.syncState(state);
    let stIsDarkMode = state.ui.darkMode;
    if (this.isDarkMode == stIsDarkMode) return;
    this._setDarkMode(stIsDarkMode);
    this.isDarkMode = stIsDarkMode;
  }
  _init() {
    this.dom
      .querySelector(".header__container")
      .prepend(this.openNavbarButton.dom);
    this.dom
      .querySelector(".header__container")
      .appendChild(this.openSettingsButton.dom);
    this.dom.querySelector(".header__container").appendChild(this.navbar.dom);
  }
}

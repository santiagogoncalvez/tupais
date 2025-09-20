import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@Modal/Settings/template.html?raw";

// Styles
import "@Modal/Settings/style.css";

// Components
import DarkModeButton from "@Modal/Settings/Dark-mode-button/Dark-mode-button.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";

// Otros
import { base, modifiers } from "@Modal/Settings/Settings-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Settings extends BaseComponent {
  constructor(state, dispatch, continentSelector) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.closeButton = new CloseButton(dispatch, {
      type: ACTIONS.CLOSE_SETTINGS,
    });
    this.darkModeButton = new DarkModeButton(state, dispatch);
    this.continentSelector = continentSelector;
    this.dom = this._createDom();
    this._init(dispatch);
    this._onAnimationEnd = this._onAnimationEnd.bind(this); // para poder removerlo
  }

  _init() {
    this.dom.querySelector("." + this.base.container);
    this.dom.appendChild(this.closeButton.dom);
    // Botón de modo oscuro
    // this.dom
    //   .querySelector("." + this.base.subtitle)
    //   .insertAdjacentElement("afterend", this.darkModeButton.dom);
    this.dom.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  _activeEvents(isActive) {
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          this.closeButton.dom.click();
        }
      };
    }
    if (isActive) {
      window.addEventListener("keydown", this._escEvent);
    } else {
      window.removeEventListener("keydown", this._escEvent);
    }
  }

  syncState(state) {
    if (this.state.ui.modals.settings.show != state.ui.modals.settings.show) {
      this._show(state.ui.modals.settings.show);
      this._activeEvents(state.ui.modals.settings.show);
      this.isShow = state.ui.modals.settings.show;
    }
    if (this.state.ui.darkMode != state.ui.darkMode) {
      this._setDarkMode(state.ui.darkMode);
      this.continentSelector._setDarkMode(state.ui.darkMode);
    }
    this.closeButton.syncState(state);
    this.continentSelector.syncState(state);
    this.state = state;
  }

  _show(isShow) {
    // Siempre limpiamos posibles animaciones anteriores
    this.dom.removeEventListener("animationend", this._onAnimationEnd);
    this.dom.classList.remove(this.modifiers.fade.out);
    this.dom.classList.remove(this.modifiers.fade.in);

    if (isShow) {
      this.dom.classList.add(this.modifiers.display.block);

      requestAnimationFrame(() => {
        this.dom.classList.add(this.modifiers.fade.in);
      });

      const container = this.dom.querySelector("." + this.base.container);

      this.continentSelector.mountTo(container);
    }

    if (!isShow) {
      this.dom.classList.add(this.modifiers.fade.out);

      this.dom.addEventListener("animationend", this._onAnimationEnd, {
        once: true,
      });
    }
  }

  _onAnimationEnd() {
    this.dom.classList.remove(this.modifiers.display.block);
    this.dom.classList.remove(this.modifiers.fade.out);
  }
}

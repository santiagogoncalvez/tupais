import htmlString from "@Modal/Settings/template.html?raw";

// Styles
import "@Modal/Settings/style.css";

// Components
import DarkModeButton from "@Modal/Settings/Dark-mode-button/dark-mode-button.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

import {
  settingsBase,
  settingsModifiers,
} from "@Modal/Settings/Settings-class-names.js";
import { CONTINENTS_NAMES } from "@constants/continents-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Settings extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = settingsBase;
    this.modifiers = settingsModifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.continent = CONTINENTS_NAMES.ALL;
    this.closeButton = new CloseButton(dispatch, {
      ui: {
        settings: { show: false },
      },
    });
    this.darkModeButton = new DarkModeButton(state, dispatch);
    this.continentSelector = new ContinentSelector(state, dispatch);
    this.dom = this._createDom();
    this._init(dispatch);
  }

  _init() {
    this.dom.querySelector("." + settingsBase.container);
    this.dom.appendChild(this.closeButton.dom);
    this.dom
      .querySelector("." + settingsBase.subtitle)
      .insertAdjacentElement("afterend", this.darkModeButton.dom);
    this.dom
      .querySelector("." + this.base.container)
      .appendChild(this.continentSelector.dom);
    this.dom.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  _activeEvents(isActive) {
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.dispatch({ ui: { settings: { show: false } } });
          this.dom.blur();
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
    if (this.state.ui.settings.show != state.ui.settings.show) {
      this._show(state.ui.settings.show);
      this._activeEvents(state.ui.settings.show);
      this.isShow = state.ui.settings.show;
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
    if (isShow) {
      this.dom.showModal();
      this.dom.classList.add(settingsModifiers.display.block);
      // Esperamos un frame para que el navegador pinte el display: flex antes de animar la opacidad
      requestAnimationFrame(() => {
        this.dom.classList.add(settingsModifiers.show.block);
      });
    }

    if (!isShow) {
      //Solo se debe ejecutar si está mostrado
      this.dom.classList.remove(settingsModifiers.show.block);
      this.dom.addEventListener(
        "transitionend",
        () => {
          this.dom.classList.remove(settingsModifiers.display.block);
          this.dom.close();
        },
        { once: true }
      );
    }
  }

  _setContinentValue(value) {
    this.continent = value;
  }

  _getContinentValue() {
    return this.continent;
  }
}

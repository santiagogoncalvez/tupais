import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Continent-selector/template.html?raw";

// Styles
import "@components/Continent-selector/style.css";

import {
  base,
  modifiers,
} from "@components/Continent-selector/Continent-selector-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import Button from "@components/Continent-selector/Button/Button.js";
import Options from "@components/Continent-selector/Options/Options.js";
import StartButton from "@components/Continent-selector/Start-button/Start-button.js";
import Backdrop from "@components/Backdrop/Backdrop.js";

export default class ContinentSelector extends BaseComponent {
  /**
   * @param {Object} state
   * @param {Function} dispatch
   * @param {Object} options
   * @param {boolean} options.useBackdrop - Si se debe bloquear interacción externa
   * @param {boolean} options.autoStart - Si se debe incluir el botón de start
   */
  constructor(state, dispatch,
    { useBackdrop = true,
      autoStart = false,
      trueshowLabel = true,
      scope = "modal"
    } = {}
  ) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.continent = state.game.continent;
    this.showLabel = trueshowLabel; // por defecto mostrar
    this.scope = scope; // 👈 guardamos el scope

    this.button = new Button(state, dispatch, {
      useBackdrop: useBackdrop,
      scope: this.scope,
    });
    this.options = new Options(state, dispatch, {
      autoStart: autoStart,
      scope: this.scope,
    });

    this.autoStart = autoStart;
    if (!this.autoStart) {
      this.startButton = new StartButton(state, dispatch, { scope: this.scope });
    }

    this.useBackdrop = useBackdrop;
    if (this.useBackdrop) {
      this.backdrop = new Backdrop(state, dispatch, { scope: this.scope });
    }

    this.dom = this._createDom();
    this._init();

  }

  syncState(state) {
    if (this.state?.ui.darkMode != state?.ui.darkMode) {
      this._setDarkMode(state?.ui.darkMode);
    }
    this.button.syncState(state);
    this.options.syncState(state);
    if (!this.autoStart) {
      this.startButton.syncState(state);
    }
    if (this.useBackdrop) {
      this.backdrop.syncState(state);
    }

    this.state = state;
  }

  _init() {
    // Ocultar título y label si showLabel es false
    if (!this.showLabel) {
      const title = this.dom.querySelector(".continent-selector__title");
      const text = this.dom.querySelector(".continent-selector__text");
      if (title) title.style.display = "none";
      if (text) text.style.display = "none";
    }


    let select = this.dom.querySelector("." + this.base.select);
    select.appendChild(this.button.dom);
    select.appendChild(this.options.dom);
    if (!this.autoStart) {
      select.appendChild(this.startButton.dom);
    }
    if (this.useBackdrop) {
      select.appendChild(this.backdrop.dom);
    }

    // Ocultar título y label si showLabel es false
    if (!this.showLabel) {
      const title = this.dom.querySelector("." + this.base.title);
      const text = this.dom.querySelector("." + this.base.text);
      if (title) title.style.display = "none";
      if (text) text.style.display = "none";
    }
  }

  mountTo(container) {
    if (this.dom.parentElement !== container) {
      container.appendChild(this.dom);
    }
  }

  removeStart() {
    if (!this.autoStart) {
      this.startButton.dom.remove();
      this.autoStart = false;
    }
    if (this.useBackdrop) {
      this.backdrop.dom.remove();
      this.useBackdrop = false;
    }
  }
}

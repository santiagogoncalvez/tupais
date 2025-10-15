import { GAME_MODES } from "@constants/game-modes.js";

import htmlString from "@Modal/Presentation/template.html?raw";

import { ACTIONS } from "@constants/action-types.js";

// Styles
import "@Modal/Presentation/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import FlagSlide from "@Modal/Presentation/Flag-slide/Flag-slide.js";

import {
  base,
  modifiers,
} from "@Modal/Presentation/Presentation-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Presentation extends BaseComponent {
  constructor(state, dispatch, continentSelector) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dispatch = dispatch;
    this.state = state;

    this.closeButton = new CloseButton(dispatch, []);
    this.modifyAction(this.state);

    this.flagSlide = new FlagSlide();
    this.continentSelector = continentSelector;
    this.dom = this._createDom();
    this._init(dispatch);
    this._onAnimationEnd = this._onAnimationEnd.bind(this); // para poder removerlo
  }

  _init() {
    this.dom
      .querySelector("." + this.base.title)
      .insertAdjacentElement("afterend", this.flagSlide.dom);
    this.dom.appendChild(this.closeButton.dom);
    this.dom.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  _activeEvents(isActive) {
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          this.closeButton.dom.click();
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
    if (
      this.state.ui.modals.presentation.show !=
      state.ui.modals.presentation.show && state.ui.firstLaunch
    ) {
      this._show(state.ui.modals.presentation.show);
      this._activeEvents(state.ui.modals.presentation.show);
      this.isShow = state.ui.modals.presentation.show;
    }



    if (this.state.game.mode != state.game.mode) {
      this.modifyAction(state);
    }

    this.closeButton.syncState(state);
    this.continentSelector.syncState(state);
    this.state = state;
  }

  _show(isShow) {
    // Limpiar animaciones previas y eventos
    this.dom.removeEventListener("animationend", this._onAnimationEnd);
    this.dom.classList.remove(this.modifiers.fade.out);
    this.dom.classList.remove(this.modifiers.fade.in);

    if (isShow) {
      if (document.readyState === "interactive") {
        this.dom.classList.add(this.modifiers.display.block);

        requestAnimationFrame(() => {
          this.dom.classList.add(this.modifiers.fade.in);
        });

        const container = this.dom.querySelector("." + this.base.container);

        this.continentSelector.mountTo(container);
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          this._show(true);
        });
      }
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

  modifyAction(state) {
    // Acción de nuevo juego
    //* Acá se personaliza la acción de nuevo juego que se quiere mandar según el modo en el que se encuentre
    if (
      state.game.mode === GAME_MODES.CHALLENGE
    ) {
      this.newGameAction = ACTIONS.NEW_GAME;
    }
    if (state.game.mode === GAME_MODES.CLASSIC) {
      this.newGameAction = ACTIONS.NEW_GAME_CLASSIC;
    }
    if (state.game.mode === GAME_MODES.RECORD) {
      this.newGameAction = ACTIONS.NEW_GAME_RECORD;
    }
    if (state.game.mode === GAME_MODES.TIME_TRIAL) {
      this.newGameAction = ACTIONS.NEW_GAME_TIME_TRIAL;
    }

    this.closeButton.setActions([
      { type: ACTIONS.CLOSE_PRESENTATION },
      { type: this.newGameAction }
    ])
  }
}

import { ROUTES } from "@constants/routes.js";

import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@Modal/Game-over/Game-modes/template.html?raw";

// Styles
import "@Modal/Game-over/Game-modes/style.css";

import {
  base,
  modifiers,
} from "@Modal/Game-over/Game-modes/Game-modes-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class GameModes extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.dom = this._createDom();

    this._init(state);
  }

  _init(state) {
    const links = this.dom.querySelectorAll(".game-modes__link");
    for (let link of links) {
      link.addEventListener("click", () => { // evita que recargue
        const route = link.getAttribute("href");
        this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
        this.dispatch({ type: ACTIONS.CLOSE_GAME_OVER });
      });
    }

    this._showCorrectModes(state);
  }

  syncState(state) {
    //* Parche para actualizar de forma correcta, ver por qué o en qué momento no actualiza bien. El error está en la comparación (state.game.mode !== this.state.game.mode) en algún moomento no son distintos y no actualiza.
    if (state.ui.modals.gameOver.transition != this.state.ui.modals.gameOver.transition || state.game.mode != this.state.game.mode || state.game.id !== this.state.game.id) {
      if (!state.ui.modals.gameOver.transition) {
        this._showCorrectModes(state);
      }
    }


    this.state = state;
  }

  _showCorrectModes(state) {
    // mostrar todos los botones
    this.dom.querySelectorAll(".game-modes__link").forEach(btn => {
      btn.classList.remove("hidden");
    });

    if (
      state.router.currentRoute === ROUTES.HOME ||
      state.router.currentRoute === ROUTES.CHALLENGE ||
      state.router.currentRoute === ROUTES.RECORD ||
      state.router.currentRoute === ROUTES.TIME_TRIAL
    ) {
      this.dom.classList.add("game-modes--modal");
      // ocultar solo el botón del modo actual
      const currentModeBtn = this.dom.querySelector(
        `.game-modes__link[data-mode="${state.game.mode}"]`
      );
      if (currentModeBtn) {
        currentModeBtn.classList.add("hidden");
      }
      return;
    }
    else {
      this.dom.classList.remove("game-modes--modal");
    }
  }
}

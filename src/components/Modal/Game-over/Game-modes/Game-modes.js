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
        // const route = link.getAttribute("href");
        // this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
        this.dispatch({ type: ACTIONS.CLOSE_GAME_OVER });
      });
    }

    this._showCorrectModes(state);
  }

  syncState(state) {

    if (state.router.notFound !== this.state.router.notFound) {
      this._showCorrectModes(state, true);
    }

    if (state.ui.modals.gameOver.show !== this.state.ui.modals.gameOver.show) {
      if (state.ui.modals.gameOver.show) {
        this._showCorrectModes(state);
      }
    }

    this.state = state;
  }


  _showCorrectModes(state, isDefault) {
    // mostrar todos los botones
    this.dom.querySelectorAll(".game-modes__link").forEach(btn => {
      btn.classList.remove("hidden");
    });

    if (isDefault) return;


    // ocultar solo el botón del modo actual
    const currentModeBtn = this.dom.querySelector(
      `.game-modes__link[data-mode="${state.game.mode}"]`
    );
    if (currentModeBtn) {
      currentModeBtn.classList.add("hidden");
    }
    return;


  }
}

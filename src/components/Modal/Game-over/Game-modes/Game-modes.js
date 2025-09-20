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
    // if (state.game.mode !== this.state.game.mode) {
    //* Parche para actualizar de forma correcta, ver por qué o en qué momento no actualiza bien. El error está en la comparación (state.game.mode !== this.state.game.mode) en algún moomento no son distintos y no actualiza.
      this._showCorrectModes(state);
    // }


    this.state = state;
  }

  _showCorrectModes(state) {
    console.log(state.game.mode);
    // mostrar todos los botones
    document.querySelectorAll(".game-modes__link").forEach(btn => {
      btn.classList.remove("hidden");
    });

    // ocultar solo el botón del modo actual
    const currentModeBtn = document.querySelector(
      `.game-modes__link[data-mode="${state.game.mode}"]`
    );
    if (currentModeBtn) {
      currentModeBtn.classList.add("hidden");
    }
  }
}

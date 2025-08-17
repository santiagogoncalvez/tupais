import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@Modal/Game-over/template.html?raw";

// Styles
import "@Modal/Game-over/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import Results from "@Modal/Game-over/Results/Results.js";
import GameModes from "@Modal/Game-over/Game-modes/Game-modes.js";

// Otros
import { base, modifiers } from "@Modal/Game-over/Game-over-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class GameOver extends BaseComponent {
  constructor(state, dispatch, continentSelector) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.isShow = false;
    this.closeButton = new CloseButton(dispatch, [
      {
        type: ACTIONS.CLOSE_GAME_OVER,
      },
      {
        type: ACTIONS.NEW_GAME,
      },
    ]);

    // Componente de resultados del juego: Results
    this.results = new Results(state);

    this.gameModes = new GameModes(state);
    this.continentSelector = continentSelector;
    this.dom = this._createDom();
    this._init(dispatch);
    this._onAnimationEnd = this._onAnimationEnd.bind(this); // para poder removerlo
  }

  _init() {
    this.dom.appendChild(this.closeButton.dom);
    this.dom
      .querySelector("." + this.base.subtitle)
      .insertAdjacentElement("afterend", this.gameModes.dom);
    this.dom
      .querySelector("." + this.base.subtitle)
      .insertAdjacentElement("afterend", this.results.dom);
    this.dom.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  _activeEvents(isActive) {
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          // event.preventDefault();
          // event.stopImmediatePropagation();
          // Modificar para que en este caso se ejecute un nuevo juego o detectarlo desde el estado general. Esto sucede en el caso del modal GameOver ya que cuando este se cierra se debe iniciar si o si un nuevo juego.
          this.dispatch({
            type: ACTIONS.CLOSE_GAME_OVER,
          });
          this.dispatch({ type: ACTIONS.NEW_GAME });

          // this.dom.blur();
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
    if (this.isShow != state.ui.modals.gameOver.show) {
      this._show(state.ui.modals.gameOver.show);
      this._activeEvents(state.ui.modals.gameOver.show);
      this.isShow = state.ui.modals.gameOver.show;
    }
    if (this.state.ui.darkMode != state.ui.darkMode) {
      this._setDarkMode(state.ui.darkMode);
      this.continentSelector._setDarkMode(state.ui.darkMode);
    }
    this.closeButton.syncState(state);
    this.results.syncState(state);
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
      this.continentSelector.setActionType(this.dom);
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

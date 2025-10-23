import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@Modal/Game-over/template.html?raw";

// Styles
import "@Modal/Game-over/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import Results from "@Modal/Game-over/Results/Results.js";
import GameModes from "@Modal/Game-over/Game-modes/Game-modes.js";
import Statistics from "@Modal/Game-over/Statistics/Statistics.js";

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

    this.closeButton = new CloseButton(dispatch, []);
    this.modifyAction(this.state);


    // Componente de resultados del juego: Results
    this.results = new Results(state, dispatch);

    this.gameModes = new GameModes(state, dispatch);
    this.statistics = new Statistics(state);
    this.continentSelector = continentSelector;
    this.dom = this._createDom();
    this._init(dispatch);
    this._onAnimationEnd = this._onAnimationEnd.bind(this); // para poder removerlo
  }

  _init() {
    const container = this.dom.querySelector("." + this.base.container);
    this.dom.appendChild(this.closeButton.dom);
    container.appendChild(this.results.dom);
    container.appendChild(this.gameModes.dom);
    container.appendChild(this.statistics.dom);

    this.dom.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  _activeEvents(isActive) {
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          // Esto sucede en el caso del modal GameOver ya que cuando este se cierra se debe iniciar si o si un nuevo juego.
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
    const shouldShow = state.ui.modals.gameOver.show;
    const showChanged = this.isShow !== shouldShow;

    if (showChanged) {
      // ⚡ Saltamos animación solo si juego terminó y pestaña estaba oculta
      const skipAnimation = state.game.completed === true && document.hidden;
      this._show(shouldShow, skipAnimation);
      this._activeEvents(shouldShow);
      this.isShow = shouldShow;
    }

    if (this.state.game.mode !== state.game.mode) {
      this.modifyAction(state);
    }

    this.closeButton.syncState(state);
    this.results.syncState(state);
    this.gameModes.syncState(state);
    this.statistics.syncState(state);
    this.continentSelector.syncState(state);
    this.state = state;
  }

  // ------------------- _show modificado -------------------
  _show(isShow, skipAnimation = false) {
    this.dom.removeEventListener("animationend", this._onAnimationEnd);
    this.dom.classList.remove(this.modifiers.fade.out, this.modifiers.fade.in);

    if (isShow) {
      this.dom.classList.add(this.modifiers.display.block);

      this.dom.scrollTo({ top: 0 });

      const container = this.dom.querySelector("." + this.base.container);
      this.continentSelector.mountTo(container);

      if (!skipAnimation) {
        setTimeout(() => {
          this.dom.classList.add(this.modifiers.fade.in);
        }, 0);
      }
    }

    if (!isShow) {
      this.dom.classList.add(this.modifiers.fade.out);
      this.dom.addEventListener("animationend", this._onAnimationEnd, { once: true });
    }
  }


  _onAnimationEnd() {
    this.dom.classList.remove(this.modifiers.display.block);
    this.dom.classList.remove(this.modifiers.fade.out);

    // Indicar que terminó la animación del modal Game-over
    this.dispatch({ type: ACTIONS.OPEN_GAME_OVER_ANIMATION_STOP});
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
      { type: ACTIONS.CLOSE_GAME_OVER },
      { type: this.newGameAction }
    ])
  }
}

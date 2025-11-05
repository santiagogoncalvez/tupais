import { ANSWER_TYPES } from "@constants/answer-types.js";
import { GAME_MODES } from "@constants/game-modes.js";
import { ACTIONS } from "@constants/action-types.js";

import "@components/Game/Country/Next-button/style.css";
import { base } from "@components/Game/Country/Next-button/Next-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";

export default class NextButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.base = base;
    this.dispatch = dispatch;

    this.dom = elt(
      "button",
      {
        className: this.base.block,
        title: "Siguiente",
        onclick: () => {
          dispatch({ type: ACTIONS.SET_ANSWER_TYPE, payload: ANSWER_TYPES.SKIPPED });
          dispatch({ type: ACTIONS.SKIP_COUNTRY });
        },
      },
      elt("div", { className: this.base.icon })
    );

    this._init();
  }

  _init() {
    this._handleKeyDown = (event) => {
      const gameRoutes = ["/", "/challenge", "/time-trial"];
      if (!gameRoutes.includes(decodeURIComponent(this.state.router.currentRoute))) return;

      if (event.key === "ArrowRight") this.dom.click();
    };

    window.addEventListener("keydown", this._handleKeyDown);
  }

  syncState(state) {
    if (state.game.newGameId !== this.state.game.newGameId) {
      this.dom.disabled = false;
      this.state = state;
      return;
    }

    const animationActive = state.ui.country.animation;
    const animateCorrect = state.ui.gameOptions.animateCorrect;
    const gameCompleted = state.game.completed;

    const shouldDisable = animationActive || animateCorrect || gameCompleted;
    this.dom.disabled = shouldDisable;

    this.state = state;
  }

  destroy() {
    window.removeEventListener("keydown", this._handleKeyDown);
    this._handleKeyDown = null;
    this.dom?.remove();
  }
}

import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

import "@components/Game/style.css";
import { base } from "@components/Game/Game-class-names.js";
import elt from "@utils/elt.js";

// Components
import BaseComponent from "@shared/Base-component.js";
import Score from "@components/Game/Score/Score.js";
import Country from "@components/Game/Country/Country.js";
// import ProgressDots from "@components/Game/Progress-dots/Progress-dots.js";

import Answer from "@components/Game/Answer/Answer.js";
import Keyboard from "@components/Game/Keyboard/Keyboard.js";
import GameOptions from "@components/Game/Game-options/Game-options.js";

export default class Game extends BaseComponent {
  constructor(state, dispatch, mode) {
    super();
    this.state = state;
    this.base = base;
    this.score = new Score(state, dispatch);
    this.country = new Country(state, dispatch, mode);
    // this.progressDots = new ProgressDots(state);
    this.answer = new Answer(state, dispatch);
    this.keyboard = new Keyboard(state, dispatch);
    this.gameOptions = new GameOptions(state, dispatch);
    this.dom = elt(
      "div",
      { className: this.base.block },
      elt(
        "div",
        { className: this.base.container }
      )
    );
    this.dispatch = dispatch;
    this.mode = mode;
    this._init(state);
  }

  syncState(state) {
    if (state.game.mode != this.state.game.mode || state.game.newGameId != this.state.game.newGameId) {
      this._init(state);
      this.state = state;
      return;
    }


    this.score.syncState(state);
    this.country.syncState(state);
    // this.progressDots.syncState(state);
    this.answer.syncState(state);
    this.keyboard.syncState(state);
    this.gameOptions.syncState(state);
    this.state = state;
  }

  _init(state) {
    //TODO: Esto va para cuando se conviertan los otros 2 modos en opciones múltiples con sus respectivos conceptos
    this.dom.innerHTML = "";

    let container = elt("div", { className: this.base.container });

    this.country.destroy();
    this.keyboard.destroy();

    this.score = new Score(state, this.dispatch);
    this.country = new Country(state, this.dispatch, this.mode);
    this.answer = new Answer(state, this.dispatch);
    this.keyboard = new Keyboard(state, this.dispatch);
    this.gameOptions = new GameOptions(state, this.dispatch);

    container.appendChild(this.score.dom);
    container.appendChild(this.country.dom);

    if (state.game.mode === GAME_MODES.CLASSIC
      || state.game.mode === GAME_MODES.RECORD
      || state.game.mode === GAME_MODES.TIME_TRIAL
    ) {
      this.dom.appendChild(this.gameOptions.dom);
    } else {
      this.dom.appendChild(this.keyboard.dom);
      container
        .appendChild(this.answer.dom);
    }

    this.dom.prepend(container);

    requestAnimationFrame(() => this.answer._resizeLetters());
  }
}

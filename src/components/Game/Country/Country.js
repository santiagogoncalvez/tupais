import { GAME_MODES } from "@constants/game-modes.js";


import "@components/Game/Country/style.css";
import { base } from "@components/Game/Country/Country-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";
import Flag from "@components/Game/Country/Flag/Flag.js";
import NextButton from "@components/Game/Country/Next-button/Next-button.js";

export default class Country extends BaseComponent {
  constructor(state, dispatch, mode) {
    super();
    this.base = base;
    this.nextButton = new NextButton(state, dispatch);
    this.flag = new Flag(state, dispatch);
    this.state = state;
    this.mode = mode;
    this.dom = elt("div", { className: this.base.block }, this.flag.dom);
    this._init(state);
  }

  _init(state) {
    console.log("Iniciando modo de juego:", state.game.mode);
    if (state.game.mode === GAME_MODES.CHALLENGE || state.game.mode === GAME_MODES.TIME_TRIAL) {
      this.renderButton(state);
    }
  }

  syncState(state) {
    if (this.state.game.mode !== state.game.mode) {
      this.renderButton(state);
    }
    this.flag.syncState(state);
    this.nextButton.syncState(state);

    this.state = state;
  }

  renderButton(state) {
    const fill = this.dom.querySelector(`.${this.base.fill}`);
    if (state.game.mode === GAME_MODES.CHALLENGE || state.game.mode === GAME_MODES.TIME_TRIAL) {
      if (!fill) this.dom.prepend(elt("div", { className: this.base.fill }));
      this.dom.appendChild(this.nextButton.dom);
    } else {
      if (fill) fill.remove();
      this.nextButton.dom.remove();
    }
  }
}

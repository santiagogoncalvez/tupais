import { ACTIONS } from "@constants/action-types.js";

import "@components/Game/style.css";
import { base } from "@components/Game/Game-class-names.js";
import elt from "@utils/elt.js";

// Components
import BaseComponent from "@shared/Base-component.js";
import Score from "@components/Game/Score/Score.js";
import Country from "@components/Game/Country/Country.js";
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
    this.answer = new Answer(state);
    this.keyboard = new Keyboard(state, dispatch);
    this.gameOptions = new GameOptions(state, dispatch);
    this.dom = elt(
      "div",
      { className: this.base.block },
      elt(
        "div",
        { className: this.base.container },
        this.score.dom,
        this.country.dom
      )
    );
    this.dispatch = dispatch;
    this.mode = mode;
    this._init();
  }

  syncState(state) {
    this.score.syncState(state);
    this.country.syncState(state);
    this.answer.syncState(state);
    this.keyboard.syncState(state);
    this.gameOptions.syncState(state);
    this.state = state;
  }

  _init() {
    if (this.mode === "multiple-choice") {
      this.dom.appendChild(this.gameOptions.dom);
    } else {
      this.dom.appendChild(this.keyboard.dom);
      this.dom
        .querySelector("." + this.base.container)
        .appendChild(this.answer.dom);
    }
  }
}

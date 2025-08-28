import htmlString from "@Modal/Game-over/Results/template.html?raw";

// Styles
import "@Modal/Game-over/Results/style.css";

import {
  base,
  modifiers,
} from "@Modal/Game-over/Results/Results-class-names.js";
import { formatTime } from "@utils/format-time.js";

import BaseComponent from "@shared/Base-component.js";

import CorrectFlags from "@Modal/Game-over/Results/Correct-flags/Correct-flags.js";

export default class Results extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.correctFlags = new CorrectFlags(state);
    this.dom = this._createDom();
    this._init();
  }

  _init() {
    this.dom.appendChild(this.correctFlags.dom);
    this.dom
      .querySelector(".results__flags")
      .appendChild(this.correctFlags.dom);
  }

  syncState(state) {
    if (state.game.completed != this.state.game.completed) {
      let correctData = this.dom
        .querySelector(".results__correct")
        .querySelector(".results__data");
      let incorrectData = this.dom
        .querySelector(".results__incorrect")
        .querySelector(".results__data");
      let timeData = this.dom
        .querySelector(".results__time")
        .querySelector(".results__data");

      correctData.textContent = state.game.correctAnswers;
      incorrectData.textContent = state.game.incorrectFlags.length;
      timeData.textContent = formatTime(
        Math.round(
          (state.game.timer.finalTime - state.game.timer.initialTime) / 1000
        )
      );
    }

    this.correctFlags.syncState(state);
    this.state = state;
  }
}

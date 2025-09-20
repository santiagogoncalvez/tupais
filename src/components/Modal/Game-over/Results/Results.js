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
import FlagList from "@components/Flag-gallery/Flag-list/Flag-list.js";

export default class Results extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.flagListCorrect = new FlagList(this.state, this.dispatch, 0.75);
    this.flagListIncorrect = new FlagList(this.state, this.dispatch, 0.75);

    this.dom = this._createDom();


    this._init();
  }

  _init() {
  }

  syncState(state) {
    // TODO: corregir esto para que solo se actualice cuando sea necesario.
    // if (state.game.completed != this.state.game.completed) {
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

    const correctFlags = this.dom.querySelector(".results__correct")
      .querySelector(".results__flags");
    const incorrectFlags = this.dom.querySelector(".results__incorrect")
      .querySelector(".results__flags");

    if (state.game.correctFlags.length != 0) {
      this.flagListCorrect.renderItems(state.game.correctFlags);
      correctFlags.appendChild(this.flagListCorrect.dom);
    } else {
      this.flagListCorrect.dom.remove();
    }
    if (state.game.incorrectFlags.length != 0) {
      this.flagListIncorrect.renderItems(state.game.incorrectFlags);
      incorrectFlags.appendChild(this.flagListIncorrect.dom);

    } else {
      this.flagListIncorrect.dom.remove();
    }
    // }

    this.state = state;
  }
}

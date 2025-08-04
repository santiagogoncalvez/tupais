import htmlString from "@Modal/Game-over/Results/template.html?raw";

// Styles
import "@Modal/Game-over/Results/style.css";

import {
  base,
  modifiers,
} from "@Modal/Game-over/Results/Results-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import CorrectFlags from "@Modal/Game-over/Results/Correct-flags/Correct-flags.js";

export default class Results extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.correctFlags = new CorrectFlags(state);
    this.dom = this._createDom();
    this._init();
  }

  _init() {
    this.dom.appendChild(this.correctFlags.dom);
  }

  syncState(state) {
    this.correctFlags.syncState(state);

    const correct = String(state.game.correctAnswers).padStart(2, " ");
    const total = state.game.totalAnswers;
    this.dom
      .querySelector("." + this.base.score)
      .querySelector("span").textContent = `${correct} / ${total}`;

    this.state = state;
  }
}

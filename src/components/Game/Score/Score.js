import htmlString from "@components/Game/Score/template.html?raw";
import "@components/Game/Score/style.css";
import {
  scoreBase,
  scoreModifiers,
} from "@components/Game/Score/Score-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Score extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = scoreBase;
    this.modifiers = scoreModifiers;
    this.state = state;
    this.dom = this._createDom();
    this._init(state);
  }

  syncState(state) {
    if (
      state.game.correctAnswers != this.state.game.correctAnswers ||
      state.game.remainingAnswers != this.state.game.remainingAnswers
    ) {
      const remaining = this.dom
        .querySelector("." + this.base.remaining)
        .querySelector("." + this.base.points);
      const successes = this.dom
        .querySelector("." + this.base.successes)
        .querySelector("." + this.base.points);

      remaining.textContent = state.game.correctAnswers;
      successes.textContent = state.game.remainingAnswers;

      remaining.classList.add(this.modifiers.change.points);
      remaining.addEventListener("animationend", () => {
        remaining.classList.remove(this.modifiers.change.points);
      });
      successes.classList.add(this.modifiers.change.points);
      successes.addEventListener("animationend", () => {
        successes.classList.remove(this.modifiers.change.points);
      });

      this.state = state;
    }
  }

  _init(state) {
    const remaining = this.dom
      .querySelector("." + this.base.remaining)
      .querySelector("." + this.base.points);
    const successes = this.dom
      .querySelector("." + this.base.successes)
      .querySelector("." + this.base.points);

    remaining.textContent = state.game.correctAnswers;
    successes.textContent = state.game.remainingAnswers;
  }
}

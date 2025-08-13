import htmlString from "@components/Game/Score/template.html?raw";
import "@components/Game/Score/style.css";
import { base, modifiers } from "@components/Game/Score/Score-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import Continent from "@components/Game/Score/Continent/Continent.js";

export default class Score extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.continent = new Continent(state);
    this.state = state;
    this.dom = this._createDom();
    this._init(state);
  }

  syncState(state) {
    if (state.game.correctAnswers != this.state.game.correctAnswers) {
      const successes = this.dom
        .querySelector("." + this.base.successes)
        .querySelector("." + this.base.points);

      successes.textContent = state.game.correctAnswers;

      successes.classList.add(this.modifiers.change.points);
      successes.addEventListener("animationend", () => {
        successes.classList.remove(this.modifiers.change.points);
      });
    }

    if (state.game.remainingAnswers != this.state.game.remainingAnswers) {
      const remaining = this.dom
        .querySelector("." + this.base.remaining)
        .querySelector("." + this.base.points);

      remaining.textContent = state.game.remainingAnswers;

      remaining.classList.add(this.modifiers.change.points);
      remaining.addEventListener("animationend", () => {
        remaining.classList.remove(this.modifiers.change.points);
      });
    }

    this.state = state;

    this.continent.syncState(state);
  }

  _init(state) {
    const remaining = this.dom
      .querySelector("." + this.base.remaining)
      .querySelector("." + this.base.points);
    const successes = this.dom
      .querySelector("." + this.base.successes)
      .querySelector("." + this.base.points);

    remaining.textContent = state.game.remainingAnswers;
    successes.textContent = state.game.correctAnswers;

    this.dom.append(this.continent.dom);
  }
}

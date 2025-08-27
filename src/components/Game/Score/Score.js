import htmlString from "@components/Game/Score/template.html?raw";
import "@components/Game/Score/style.css";
import { base, modifiers } from "@components/Game/Score/Score-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import Continent from "@components/Game/Score/Continent/Continent.js";
import Timer from "@components/Game/Score/Timer/Timer.js";

export default class Score extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.continent = new Continent(state);
    this.timer = new Timer(state, dispatch);
    this.state = state;
    this.dom = this._createDom();
    this._init(state);
  }

  syncState(state) {
    if (state.game.correctAnswers != this.state.game.correctAnswers) {
      const successes = this.dom.querySelector("." + "score__successes-text");

      successes.textContent = state.game.correctAnswers;

      successes.classList.add(this.modifiers.change.points);
      successes.addEventListener("animationend", () => {
        successes.classList.remove(this.modifiers.change.points);
      });
    }

    if (state.game.totalAnswers != this.state.game.totalAnswers) {
      const total = this.dom.querySelector("." + "score__remaining-text");
      total.textContent = state.game.totalAnswers;
    }

    this.state = state;

    this.continent.syncState(state);
    this.timer.syncState(state);
  }

  _init(state) {
    const successes = this.dom.querySelector("." + "score__successes-text");
    const total = this.dom.querySelector("." + "score__remaining-text");

    successes.textContent = state.game.correctAnswers;
    total.textContent = state.game.totalAnswers;

    this.dom.append(this.continent.dom);

    this.dom.appendChild(this.timer.dom);
  }
}

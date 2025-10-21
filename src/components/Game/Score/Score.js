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
    this.continent = new Continent(state, dispatch);
    this.timer = new Timer(state, dispatch);
    this.state = state;
    this.dom = this._createDom();
    this._init(state);
  }

  syncState(state) {
    this._updateText(".score__successes-text", state.game.correctAnswers);
    this._updateText(".score__fails-text", state.game.incorrectFlags.length);

    if (!state.game.completed) {
      if (state.game.countryIndex != this.state.game.countryIndex ||
        state.game.newGameId != this.state.game.newGameId) {
        this._updateText(".score__current-text", state.game.totalAnswers - state.game.remainingAnswers + 1);
        this._updateText(".score__total-text", state.game.totalAnswers);
      }
    }


    this.state = state;
    this.continent.syncState(state);
    this.timer.syncState(state);
  }

  _init(state) {
    this.dom.querySelector(".score__successes-text").textContent = state.game.correctAnswers;
    this.dom.querySelector(".score__fails-text").textContent = state.game.incorrectFlags.length;
    this.dom.querySelector(".score__current-text").textContent = state.game.totalAnswers - state.game.remainingAnswers + 1;
    this.dom.querySelector(".score__total-text").textContent = state.game.totalAnswers;

    this.dom.appendChild(this.timer.dom);
    this.dom.append(this.continent.dom);
  }

  _updateText(selector, newValue) {
    const el = this.dom.querySelector(selector);
    if (!el) return;

    if (el.textContent != newValue) {
      el.textContent = newValue;
      const container = el.closest(".score__points");
      if (container) {
        container.classList.add("score__points--change");
        container.addEventListener("animationend", () => {
          container.classList.remove("score__points--change");
        }, { once: true });
      }
    }
  }
}

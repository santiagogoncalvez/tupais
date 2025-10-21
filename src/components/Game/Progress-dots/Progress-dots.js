import { GAME_MODES } from "@constants/game-modes.js";


import htmlString from "@components/Game/Progress-dots/template.html?raw";
import "@components/Game/Progress-dots/style.css";

import { base, modifiers } from "@components/Game/Progress-dots/Progress-dots-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Progress extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();

    this.total = state.game.totalAnswers || 1;
    this.current = 0;
    this.init();
  }

  init() {
    this.fill = this.dom.querySelector(".progress__fill");
    this.label = this.dom.querySelector(".progress__label");
    this.updateProgress(0);
  }

  syncState(state) {
    if (state.game.newGameId != this.state.game.newGameId) {
      this.updateProgress(0);
      this.state = state;
      return;
    }

    if (state.game.mode !== GAME_MODES.CLASSIC) {
      if (state.game.lastAnswerType != "correct") return;
    }

    const answered = state.game.totalAnswers - state.game.remainingAnswers;

    if (answered !== this.current) {
      this.updateProgress(answered);
    }
    
    this.state = state;
  }

  updateProgress(answered) {
    this.current = answered;
    const progress = Math.min(answered / this.total, 1);
    this.fill.style.transform = `scaleX(${progress})`;
    this.label.textContent = `${answered} / ${this.total}`;
  }
}

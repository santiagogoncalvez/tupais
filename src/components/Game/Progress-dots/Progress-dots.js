import htmlString from "@components/Game/Progress-dots/template.html?raw";

// Styles
import "@components/Game/Progress-dots/style.css";

import {
  base,
  modifiers,
} from "@components/Game/Progress-dots/Progress-dots-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class ProgressDots extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();

    this.total = state.game.totalAnswers;
    this.current = 0;
    this.init();
  }

  syncState(state) {
    if (state.game.remainingAnswers != this.state.game.remainingAnswers) {
      if (state.game.remainingAnswers > 0) {
        this.setCurrent(state.game.totalAnswers   - state.game.remainingAnswers);
      }
    }
    this.state = state;
  }

  init() {
    this.dom.innerHTML = "";
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === this.current ? " active" : "");
      this.dom.appendChild(dot);
    }
  }

  setCurrent(index) {
    this.current = index;
    this.init();
  }
}

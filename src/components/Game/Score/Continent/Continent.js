import { CONTINENTS_NAMES } from "@constants/continents-names.js";

import htmlString from "@components/Game/Score/Continent/template.html?raw";

// Styles
import "@components/Game/Score/Continent/style.css";

import {
  base,
  modifiers,
} from "@components/Game/Score/Continent/Continent-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Continent extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();
    this.state = state;
    this._init();
  }

  _init() {
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[this.state.game.continent.toUpperCase()].toUpperCase();
  }

  syncState(state) {
    if (state.game.continent !== this.state.game.continent) {
      this.dom.querySelector("." + this.base.text).textContent =
        CONTINENTS_NAMES[state.game.continent.toUpperCase()].toUpperCase();
      this.state = state;
    }
  }
}

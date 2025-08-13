import htmlString from "@components/Game/Score/Continent/template.html?raw";

// Styles
import "@components/Game/Score/Continent/style.css";

import {
  base,
  modifiers,
} from "@components/Game/Score/Continent/Continent-class-names.js";
import BaseComponent from "@shared/Base-component.js";

const continentTranslations = {
  all: "todos",
  europe: "europa",
  asia: "asia",
  africa: "áfrica",
  americas: "américa",
  oceania: "oceanía",
};

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
      continentTranslations[this.state.game.continent].toUpperCase();
  }

  syncState(state) {
    if (state.game.continent !== this.state.game.continent) {
      this.dom.querySelector("." + this.base.text).textContent =
        continentTranslations[state.game.continent].toUpperCase();
      this.state = state;
    }
  }
}

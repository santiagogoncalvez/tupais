import { CONTINENTS_NAMES } from "@constants/continents-names.js";

import htmlString from "@components/Game/Score/Continent/template.html?raw";

// Styles
import "@components/Game/Score/Continent/style.css";

import {
  base,
  modifiers,
} from "@components/Game/Score/Continent/Continent-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

export default class Continent extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();

    // TODO: Corregir la lógica cuando un select personalizado y un selec normal viven juntos en la app en diferentes lugares, ya que usan las mismas propiedades de estado para sus acciones. Si quito el personalizado si funciona el normal.
    //* ->
    // this.continentSelector = new ContinentSelector(state, dispatch, { useBackdrop: false, autoStart: true, trueshowLabel: false });

    this._init();
  }

  _init() {
    //* ->
    // this.dom.querySelector(".score__point-container").appendChild(this.continentSelector.dom);

    //* Parche para funcionamiento normal
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[this.state.game.continent.toUpperCase()].toUpperCase();
  }

  syncState(state) {
    //* ->
    // this.continentSelector.syncState(state);

    if (state.game.continent !== this.state.game.continent) {
      this.dom.querySelector("." + this.base.text).textContent =
        CONTINENTS_NAMES[state.game.continent.toUpperCase()].toUpperCase();
      this.state = state;
    }
  }
}

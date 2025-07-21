import htmlString from "@components/Continent-selector/template.html?raw";

// Styles
import "@components/Continent-selector/style.css";

import {
  continentSelectorBase,
  continentSelectorModifiers,
} from "@components/Continent-selector/Continent-selector-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import Button from "@components/Continent-selector/Button/Button.js";
import Options from "@components/Continent-selector/Options/Options.js";
import StartButton from "@components/Continent-selector/Start-button/Start-button.js";
import Backdrop from "@components/Backdrop/Backdrop.js";

export default class continentSelector extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = continentSelectorBase;
    this.modifiers = continentSelectorModifiers;
    this.state = state;
    this.continent = state.game.continent;
    this.button = new Button(state, dispatch, this.getContinent.bind(this));
    this.options = new Options(state, dispatch, this.setContinent.bind(this));
    this.startButton = new StartButton(dispatch, this.getContinent.bind(this));
    this.backdrop = new Backdrop(state, dispatch);
    this.dom = this._createDom();
    this._init(dispatch);
  }
  syncState(state) {
    if (this.state?.ui.darkMode != state?.ui.darkMode) {
      this._setDarkMode(state?.ui.darkMode);
    }
    this.button.syncState(state);
    this.options.syncState(state);
    this.backdrop.syncState(state);
    this.state = state;
  }
  _init() {
    let select = this.dom.querySelector("." + this.base.select);
    select.appendChild(this.button.dom);
    select.appendChild(this.options.dom);
    select.appendChild(this.startButton.dom);
    select.appendChild(this.backdrop.dom);
  }
  getContinent() {
    return this.continent;
  }
  setContinent(continent) {
    this.continent = continent;
  }
}

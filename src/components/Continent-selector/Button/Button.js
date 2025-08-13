import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Continent-selector/Button/template.html?raw";

// Styles
import "@components/Continent-selector/Button/style.css";

import {
  base,
  modifiers,
} from "@components/Continent-selector/Button/Button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import { CONTINENTS_NAMES } from "@constants/continents-names.js";

export default class Button extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
    this._init(dispatch);
  }
  syncState(state) {
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[
        state.ui.continentSelector.selectedOption.toUpperCase()
      ].toUpperCase();
    let isShow;

    if (
      this.state.ui.continentSelector.options.show !=
      (isShow = state.ui.continentSelector.options.show)
    ) {
      if (!isShow) {
        this.dom.focus();
      }
    }
    this.state = state;
  }
  _init(dispatch) {
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[
        this.state.ui.continentSelector.selectedOption.toUpperCase()
      ].toUpperCase();
    this.dom.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      dispatch({
        type: ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS,
      });
      dispatch({
        type: ACTIONS.SHOW_BACKDROP,
      });
    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        dispatch({
          type: ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS,
        });
        dispatch({
          type: ACTIONS.SHOW_BACKDROP,
        });
      }
    });
  }
}

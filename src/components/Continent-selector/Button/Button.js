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
  constructor(state, dispatch, getContinent) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
    this.getContinent = getContinent;
    this._init(dispatch, getContinent);
  }
  syncState(state) {
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[this.getContinent().toUpperCase()].toUpperCase();
    let isShow;
    if (
      this.state.ui.settings.continentSelector.options.show !=
      (isShow = state.ui.settings.continentSelector.options.show)
    ) {
      if (!isShow) {
        this.dom.focus();
      }
    }
    this.state = state;
  }
  _init(dispatch) {
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[this.getContinent().toUpperCase()].toUpperCase();
    this.dom.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      dispatch({
        ui: {
          settings: {
            continentSelector: {
              options: {
                show: !this.state.ui.settings.continentSelector.options.show,
              },
            },
          },
          backdrop: { show: true },
        },
      });
    });
    this.dom.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        dispatch({
          ui: {
            settings: {
              continentSelector: {
                options: {
                  show: !this.state.ui.settings.continentSelector.options.show,
                },
              },
            },
            backdrop: { show: true },
          },
        });
      }
    });
  }
}

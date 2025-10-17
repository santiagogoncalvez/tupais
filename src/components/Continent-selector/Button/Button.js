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
  constructor(state, dispatch, { useBackdrop = true, scope = "modal" } = {}) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;

    this.useBackdrop = useBackdrop;
    this.scope = scope; // 👈 nuevo

    this.dom = this._createDom();
    this._init(dispatch);
  }

  syncState(state) {
    const oldScopedState = this.state.ui.continentSelector[this.scope];
    const scopedState = state.ui.continentSelector[this.scope]; // 👈 ahora toma solo su scope
    if (scopedState.selectedOption != oldScopedState.selectedOption) {
      this.dom.querySelector("." + this.base.text).textContent =
        CONTINENTS_NAMES[scopedState.selectedOption.toUpperCase()].toUpperCase();
    }

    if (state.game.continent != this.state.game.continent) {
      this.dom.querySelector("." + this.base.text).textContent =
        CONTINENTS_NAMES[state.game.continent.toUpperCase()].toUpperCase();
    }

    let isShow;
    if (
      this.state.ui.continentSelector[this.scope].options.show !=
      (isShow = scopedState.options.show)
    ) {
      if (!isShow) {
        // 👇 Solo devolver el foco si NO estamos en el scope "game"
        if (!isShow && this.scope !== "game") {
          this.dom.focus();
        }
      }
    }

    this.state = state;
  }

  _init(dispatch) {
    const scopedState = this.state.ui.continentSelector[this.scope];
    this.dom.querySelector("." + this.base.text).textContent =
      CONTINENTS_NAMES[scopedState.selectedOption.toUpperCase()].toUpperCase();

    this.dom.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      if (!scopedState.options.show) {
        dispatch({
          type: ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS,
          payload: { target: this.scope }, // 👈 diferenciamos
        });

        if (this.useBackdrop) {
          dispatch({ type: ACTIONS.SHOW_BACKDROP, payload: { target: this.scope } });
        }
      }
    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        event.preventDefault();
        if (!scopedState.options.show) {
          this.dom.click();
        }
      }
    });
  }

  animateButton(isShow) {
    const icon = this.dom.querySelector(".continent-selector__selector-icon");
    if (isShow) {
      icon.classList.add("continent-selector__selector-icon--active");
    } else {
      icon.classList.remove("continent-selector__selector-icon--active");

    }
  }
}

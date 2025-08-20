import { ACTIONS } from "@constants/action-types.js";

import "@components/Game/Country/Next-button/style.css";
import { base } from "@components/Game/Country/Next-button/Next-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";

export default class nextButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.base = base;
    this.dispatch = dispatch;
    this.dom = elt(
      "button",
      {
        className: this.base.block,
        title: "Siguiente ",
        onclick: () => {
          dispatch({ type: ACTIONS.NEXT_COUNTRY });
          dispatch({ type: ACTIONS.START_COUNTRY_ANIMATION });
        },
      },
      elt("div", { className: this.base.icon })
    );
    this._init();
  }

  _init() {
    // Agregar evento para detectar por teclado la acción para cambiar de bandera
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.dom.click();
      }
    });
  }

  syncState(state) {
    if (state.ui.country.animation != this.state.ui.country.animation) {
      if (state.ui.country.animation) {
        this.dom.disabled = true;
      } else {
        this.dom.disabled = false;
      }
    }

    // Desactivar botones
    if (state.game.completed != this.state.game.completed) {
      if (state.game.completed) {
        this._disableOptions(true);
      } else {
        this._disableOptions(false);
      }
    }
    this.state = state;
  }

  _disableOptions(isDisabled) {
    this.dom.disabled = isDisabled;
  }
}

// Style
import "@components/Continent-selector/Start-button/Start-button.css";

import elt from "@utils/elt.js";
import {
  base,
  modifiers,
} from "@components/Continent-selector/Start-button/Start-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class StartButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = elt(
      "button",
      {
        className: `${this.base.block}`,
        onclick: () => {
          // TODO: hacer que el componente reciba por parámetro el dipatch que va a hacer así se puede especificar que modal es el que va a cerrar. Ya que este componente aparece en cada modal.
          dispatch({
            ui: {
              settings: { show: false },
              presentation: { show: false },
              gameOver: { show: false },
            },
            game: {
              continent: this.state.ui.continentSelector.selectedOption,
              isNewGame: true,
            },
          });
        },
        title: "Empezar",
        type: "button",
      },
      elt("span", { className: this.base.span }, "EMPEZAR")
    );
  }

  syncState(state) {
    this.state = state;
  }
}

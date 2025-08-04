import htmlString from "@Modal/Game-over/Results/Correct-flags/template.html?raw";

// Styles
import "@Modal/Game-over/Results/Correct-flags/style.css";

import elt from "@utils/elt.js";
import { getCountryCodeByName } from "@utils/country-parser.js";

import {
  base,
  modifiers,
} from "@Modal/Game-over/Results/Correct-flags/Correct-flags-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class CorrectFlags extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();
    this.state = state;
  }

  syncState(state) {
    let oldLength = this.state.game.correctFlags.length;
    let currLength = state.game.correctFlags.length;

    if (currLength !== oldLength) {
      // Borrar las banderas insertadas previamente
      this.dom.replaceChildren();

      // Agregar banderas respondidas
      for (let i = 0; i < currLength; i++) {
        this.dom.appendChild(
          elt("img", {
            src: `/tupais/images/flags/${getCountryCodeByName(
              state.game.correctFlags[i]
            )}.svg`,
            className: this.base.flag,
            alt: state.game.correctFlags[i],
          })
        );
      }

      // Agregar espacios que representan las banderas faltantes
      for (let i = currLength; i < state.game.totalAnswers; i++) {
        this.dom.appendChild(elt("div", { className: this.base.filler }));
      }

      this.state = state;
    }
  }
}

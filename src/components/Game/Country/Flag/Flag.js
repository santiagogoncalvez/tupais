import { ACTIONS } from "@constants/action-types.js";

import { getDirection, nextIndex, prevIndex } from "@utils/circular-counter.js";

import htmlString from "@components/Game/Country/Flag/template.html?raw";
import "@components/Game/Country/Flag/style.css";
import {
  base,
  modifiers,
} from "@components/Game/Country/Flag/Flag-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import countriesCca2 from "@data/country-cca2.json";

const flagPath = "/tupais/images/flags/";

const DIRECTIONS = {
  FORWARD: "forward",
  BACKWARD: "backward",
}

export default class Flag extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.flagIndex = 1;
    this.isNewGame = state.game.isNewGame;
    this.dom = this._createDom();
    this._init(state);
  }
  _init(state) {
    this._setFlags(state);
  }

  syncState(state) {
    const flags = this.dom.querySelectorAll("." + this.base.flag);
    let oldIndex = this.state.game.countryIndex;
    let newIndex = state.game.countryIndex;

    if (this.state.game.continent != state.game.continent) {
      // Si el país siguiente no es igual al país actual, es porque se ha reiniciado el juego o se ha cambiado de continente
      this._setFlags(state);
      this.flagIndex = 1; // Reiniciar el índice de la bandera
      this.state = state;
      return;
    }

    let direction = getDirection(
      oldIndex,
      newIndex,
      state.game.countries.length
    );

    if (direction == DIRECTIONS.FORWARD) {
      let oldFlagIndex = this.flagIndex;
      let newFlagIndex = nextIndex(this.flagIndex, 3);

      //Cambiar la imagen del siguiente del siguiente.
      flags[nextIndex(newFlagIndex, 3)].src =
        flagPath +
        `${
          countriesCca2[
            state.game.countries[
              nextIndex(state.game.countryIndex, state.game.countries.length)
            ]
          ]
        }.svg`;

      flags[newFlagIndex].classList.remove(
        this.modifiers.active.flag,
        this.modifiers.animationInLeft.flag
      );
      flags[oldFlagIndex].classList.add(this.modifiers.animationOutLeft.flag);
      flags[newFlagIndex].classList.add(
        this.modifiers.active.flag,
        this.modifiers.animationInRight.flag
      );

      flags[oldFlagIndex].addEventListener(
        "animationend",
        () => {
          flags[oldFlagIndex].classList.remove(
            this.modifiers.active.flag,
            this.modifiers.animationInRight.flag,
            this.modifiers.animationOutLeft.flag
          );

          this.dispatch({ type: ACTIONS.STOP_COUNTRY_ANIMATION });
        },
        { once: true }
      );

      this.flagIndex = newFlagIndex;
    }
    if (direction == DIRECTIONS.BACKWARD) {
      //Cambiar la imagen del anterior del anterior.
      let oldFlagIndex = this.flagIndex;
      let newFlagIndex = prevIndex(this.flagIndex, 3);

      //Cambiar la imagen del siguiente del siguiente.
      flags[prevIndex(newFlagIndex, 3)].src =
        flagPath +
        `${
          countriesCca2[
            state.game.countries[
              prevIndex(state.game.countryIndex, state.game.countries.length)
            ]
          ]
        }.svg`;

      flags[oldFlagIndex].classList.remove(
        this.modifiers.animationInRight.flag
      );
      flags[oldFlagIndex].classList.add(this.modifiers.animationOutRight.flag);
      flags[newFlagIndex].classList.add(
        this.modifiers.active.flag,
        this.modifiers.animationInLeft.flag
      );

      flags[oldFlagIndex].addEventListener(
        "animationend",
        () => {
          flags[oldFlagIndex].classList.remove(
            this.modifiers.active.flag,
            this.modifiers.animationInLeft.flag,
            this.modifiers.animationOutRight.flag
          );

          this.dispatch({ type: ACTIONS.STOP_COUNTRY_ANIMATION });
        },
        { once: true }
      );

      this.flagIndex = newFlagIndex;
    }

    this.state = state;
  }

  _setFlags(state) {
    const flags = this.dom.querySelectorAll("." + this.base.flag);

    // Insertar imágenes
    // Se debe calcular el del medio como el índice de "countryIndex" y el anterior y el siguiente con las funciones de contador circular prevIndex() y nextIndex()
    flags[0].src =
      flagPath +
      `${
        countriesCca2[
          state.game.countries[
            prevIndex(state.game.countryIndex, state.game.countries.length)
          ]
        ]
      }.svg`;

    flags[1].src =
      flagPath +
      `${countriesCca2[state.game.countries[state.game.countryIndex]]}.svg`;

    flags[2].src =
      flagPath +
      `${
        countriesCca2[
          state.game.countries[
            nextIndex(state.game.countryIndex, state.game.countries.length)
          ]
        ]
      }.svg`;

    // Eliminar las clases del elemento activo que las tenga y del elemento anterior

    this.dom
      .querySelector("." + this.modifiers.active.flag)
      ?.classList.remove(
        this.modifiers.active.flag,
        this.modifiers.animationInRight.flag
      );

    this.dom
      .querySelector("." + this.modifiers.animationInLeft.flag)
      ?.classList.remove(this.modifiers.animationInLeft.flag);

    void this.dom.offsetWidth; // ← fuerza reflow
    // Agregar las clases al elemento del medio
    this.dom
      .querySelectorAll("." + this.base.flag)[1]
      .classList.add(
        this.modifiers.active.flag,
        this.modifiers.animationInRight.flag
      );
  }
}

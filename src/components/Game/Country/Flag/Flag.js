import { ACTIONS } from "@constants/action-types.js";
import { getDirection, nextIndex, prevIndex } from "@utils/circular-counter.js";
import htmlString from "@components/Game/Country/Flag/template.html?raw";
import "@components/Game/Country/Flag/style.css";
import { base, modifiers } from "@components/Game/Country/Flag/Flag-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import countriesCca2 from "@data/country-cca2.json";

const flagPath = "/tupais/images/flags/";

const DIRECTIONS = {
  FORWARD: "forward",
  BACKWARD: "backward",
};

export default class Flag extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.flagIndex = 1;
    this.dom = this._createDom();
    this._init(state);
  }

  _init(state) {
    this._setFlags(state);
  }

  syncState(state) {
    const flags = this.dom.querySelectorAll("." + this.base.flag);
    const oldGame = this.state.game;
    const newGame = state.game;

    const oldIndex = oldGame.countryIndex;
    const newIndex = newGame.countryIndex;

    // 🔹 Diferencia de índices (con ajuste circular)
    const total = newGame.countries.length;
    const diff = Math.abs(newIndex - oldIndex);
    const jump = Math.min(diff, total - diff); // soporta movimiento circular

    // 🔹 Si cambió el continente, modo, se inició un nuevo juego o hubo salto grande → reinicializar banderas
    if (newGame.newGameId !== this.lastNewGameId) {
      this._setFlags(state);
      this.flagIndex = 1;
      this.state = state;
      this.lastNewGameId = newGame.newGameId;
      return;
    }

    const direction = getDirection(oldIndex, newIndex, newGame.countries.length);

    if (direction === DIRECTIONS.FORWARD) {
      this._animateForward(flags, oldIndex, newIndex, newGame);
    } else if (direction === DIRECTIONS.BACKWARD) {
      this._animateBackward(flags, oldIndex, newIndex, newGame);
    }

    this.state = state;
  }



  _animateForward(flags, oldIndex, newIndex, game) {
    const oldFlagIndex = this.flagIndex;
    const newFlagIndex = nextIndex(this.flagIndex, 3);

    const nextCountryIndex = nextIndex(newIndex, game.countries.length);
    flags[nextIndex(newFlagIndex, 3)].src =
      flagPath + `${countriesCca2[game.countries[nextCountryIndex]]}.svg`;

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

  _animateBackward(flags, oldIndex, newIndex, game) {
    const oldFlagIndex = this.flagIndex;
    const newFlagIndex = prevIndex(this.flagIndex, 3);

    const prevCountryIndex = prevIndex(newIndex, game.countries.length);
    flags[prevIndex(newFlagIndex, 3)].src =
      flagPath + `${countriesCca2[game.countries[prevCountryIndex]]}.svg`;

    flags[oldFlagIndex].classList.remove(this.modifiers.animationInRight.flag);
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

  _setFlags(state) {
    const { countries, countryIndex } = state.game;
    const flags = this.dom.querySelectorAll("." + this.base.flag);

    // 🔹 Evitar errores si todavía no hay países cargados
    if (!countries?.length) return;

    const prevCountryIndex = prevIndex(countryIndex, countries.length);
    const nextCountryIndex = nextIndex(countryIndex, countries.length);

    flags[0].src = flagPath + `${countriesCca2[countries[prevCountryIndex]]}.svg`;
    flags[1].src = flagPath + `${countriesCca2[countries[countryIndex]]}.svg`;
    flags[2].src = flagPath + `${countriesCca2[countries[nextCountryIndex]]}.svg`;

    // resetear clases
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

    // marcar bandera central como activa
    this.dom
      .querySelectorAll("." + this.base.flag)[1]
      .classList.add(
        this.modifiers.active.flag,
        this.modifiers.animationInRight.flag
      );
  }
}

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

    this._isAnimating = false;
  }

  _init(state) {
    this._setFlags(state);
  }

  _setFlagClass(flagEl, cca2) {
    flagEl.className = `${this.base.flag} fi fi-${cca2}`;
  }

  syncState(state) {
    const flags = this.dom.querySelectorAll("." + this.base.flag);
    const oldGame = this.state.game;
    const newGame = state.game;
    const oldIndex = oldGame.countryIndex;
    const newIndex = newGame.countryIndex;

    const forceUpdate = newGame.newGameId !== this.lastNewGameId;

    if (forceUpdate) {
      this._setFlags(state);
      this.flagIndex = 1;
      this.lastNewGameId = newGame.newGameId;
      this.state = state;
      return;
    }

    if (oldIndex === newIndex) return;

    const direction = getDirection(
      oldIndex,
      newIndex,
      newGame.countries.length,
    );

    if (direction === DIRECTIONS.FORWARD) {
      this._animateForward(flags, oldIndex, newIndex, newGame);
    } else {
      this._animateBackward(flags, oldIndex, newIndex, newGame);
    }

    this.state = state;
  }

  _animateForward(flags, oldIndex, newIndex, game) {
    this._isAnimating = true;
    const oldFlagIndex = this.flagIndex;
    const newFlagIndex = nextIndex(this.flagIndex, 3);

    const nextCountryIndex = nextIndex(newIndex, game.countries.length);
    this._setFlagClass(
      flags[nextIndex(newFlagIndex, 3)],
      countriesCca2[game.countries[nextCountryIndex]],
    );

    flags[oldFlagIndex].classList.add(this.modifiers.animationOutLeft.flag);
    flags[newFlagIndex].classList.add(
      this.modifiers.active.flag,
      this.modifiers.animationInRight.flag,
    );

    flags[oldFlagIndex].addEventListener(
      "animationend",
      () => {
        flags[oldFlagIndex].classList.remove(
          this.modifiers.active.flag,
          this.modifiers.animationOutLeft.flag,
        );
        this._isAnimating = false;
        this.dispatch({ type: ACTIONS.STOP_COUNTRY_ANIMATION });
      },
      { once: true },
    );

    this.flagIndex = newFlagIndex;
  }

  _animateBackward(flags, oldIndex, newIndex, game) {
    this._isAnimating = true;
    const oldFlagIndex = this.flagIndex;
    const newFlagIndex = prevIndex(this.flagIndex, 3);

    const prevCountryIndex = prevIndex(newIndex, game.countries.length);
    this._setFlagClass(
      flags[prevIndex(newFlagIndex, 3)],
      countriesCca2[game.countries[prevCountryIndex]],
    );

    flags[oldFlagIndex].classList.add(this.modifiers.animationOutRight.flag);
    flags[newFlagIndex].classList.add(
      this.modifiers.active.flag,
      this.modifiers.animationInLeft.flag,
    );

    flags[oldFlagIndex].addEventListener(
      "animationend",
      () => {
        flags[oldFlagIndex].classList.remove(
          this.modifiers.active.flag,
          this.modifiers.animationOutRight.flag,
        );
        this._isAnimating = false;
        this.dispatch({ type: ACTIONS.STOP_COUNTRY_ANIMATION });
      },
      { once: true },
    );

    this.flagIndex = newFlagIndex;
  }

  _setFlags(state) {
    const { countries, countryIndex } = state.game;
    const flags = this.dom.querySelectorAll("." + this.base.flag);

    if (!countries?.length) return;

    const prevCountryIndex = prevIndex(countryIndex, countries.length);
    const nextCountryIndex = nextIndex(countryIndex, countries.length);

    this._setFlagClass(flags[0], countriesCca2[countries[prevCountryIndex]]);
    this._setFlagClass(flags[1], countriesCca2[countries[countryIndex]]);
    this._setFlagClass(flags[2], countriesCca2[countries[nextCountryIndex]]);

    this.dom
      .querySelector("." + this.modifiers.active.flag)
      ?.classList.remove(this.modifiers.active.flag);

    void this.dom.offsetWidth;

    flags[1].classList.add(
      this.modifiers.active.flag,
      this.modifiers.animationInRight.flag,
    );
  }
}

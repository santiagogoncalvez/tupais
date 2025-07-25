import htmlString from "@components/Game/Country/Flag/template.html?raw";
import "@components/Game/Country/Flag/style.css";
import {
  base,
  modifiers,
} from "@components/Game/Country/Flag/Flag-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import { getDirection, nextIndex, prevIndex } from "@utils/circular-counter.js";
import countriesCca2 from "@data/country-cca2.json";

const flagPath = "/tupais/images/flags/";

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
    const flags = this.dom.querySelectorAll("." + this.base.flag);

    // Insertar imágenes
    flags[0].src =
      flagPath +
      `${
        countriesCca2[state.game.countries[state.game.countries.length - 1]]
      }.svg`;
    flags[1].src =
      flagPath +
      `${countriesCca2[state.game.countries[state.game.countryIndex]]}.svg`;
    flags[2].src =
      flagPath +
      `${countriesCca2[state.game.countries[state.game.countryIndex + 1]]}.svg`;

    this.dom
      .querySelectorAll("." + this.base.flag)[1]
      .classList.add(
        this.modifiers.active.flag,
        this.modifiers.animationInLeft.flag
      );
  }
  syncState(state) {
    const flags = this.dom.querySelectorAll("." + this.base.flag);
    let oldIndex = this.state.game.countryIndex;
    let newIndex = state.game.countryIndex;
    if (newIndex == oldIndex) return;

    let direction = getDirection(
      oldIndex,
      newIndex,
      state.game.countries.length
    );

    if (direction == "forward") {
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

          this.dispatch({
            ui: {
              country: {
                animation: false,
              },
            },
          });
        },
        { once: true }
      );

      this.flagIndex = newFlagIndex;
    }
    if (direction == "backward") {
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

          this.dispatch({
            ui: {
              country: {
                animation: false,
              },
            },
          });
        },
        { once: true }
      );

      this.flagIndex = newFlagIndex;
    }

    this.state = state;
  }
}

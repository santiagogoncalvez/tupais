// Style
import "@components/Continent-selector/Start-button/Start-button.css";

import elt from "@utils/elt.js";
import {
  base,
  modifiers,
} from "@components/Continent-selector/Start-button/Start-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class StartButton extends BaseComponent {
  constructor(dispatch, getContinentValue) {
    super();
    this.base = base;
    this.modifiers = modifiers;
    this.dom = elt(
      "button",
      {
        className: `${this.base.block}`,
        onclick: () => {
          dispatch({
            ui: {
              settings: { show: false },
              presentation: { show: false },
            },
            game: { continent: getContinentValue() },
          });
        },
        title: "Empezar",
        type: "button",
      },
      elt("span", { className: this.base.span }, "EMPEZAR")
    );
  }
}

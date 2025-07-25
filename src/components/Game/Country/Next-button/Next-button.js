import "@components/Game/Country/Next-button/style.css";
import { base } from "@components/Game/Country/Next-button/Next-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";
import { nextIndex } from "@utils/circular-counter.js";

export default class nextButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.base = base;
    this.dom = elt(
      "button",
      {
        className: this.base.block,
        title: "Siguiente ",
        onclick: () => {
          dispatch({
            ui: {
              country: {
                animation: true,
              },
            },
            game: {
              countryIndex: nextIndex(
                this.state.game.countryIndex,
                this.state.game.countries.length
              ),
              answer: "",
            },
          });
        },
      },
      elt("div", { className: this.base.icon }),
    );
  }
  syncState(state) {
    if (state.ui.country.animation) {
      this.dom.disabled = true;
    } else {
      this.dom.disabled = false;
    }
    this.state = state;
  }
}

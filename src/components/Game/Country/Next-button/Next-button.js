import "@components/Game/Country/Next-button/style.css";
import { nextButtonBase } from "@components/Game/Country/Next-button/Next-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";
import { nextIndex } from "@utils/circular-counter.js";

export default class nextButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.dom = elt(
      "button",
      {
        className: nextButtonBase.block,
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
      elt("div", { className: "country__button-icon--right" })
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

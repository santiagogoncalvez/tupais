import "@components/Game/Country/Previous-button/style.css";
import { previousButtonBase } from "@components/Game/Country/Previous-button/Previous-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";
import { prevIndex } from "@utils/circular-counter.js";

export default class previousButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.dom = elt(
      "button",
      {
        className: previousButtonBase.block,
        title: "Anterior",
        onclick: () => {
          dispatch({
            ui: {
              country: {
                animation: true,
              },
            },
            game: {
              countryIndex: prevIndex(
                this.state.game.countryIndex,
                this.state.game.countries.length
              ),
            },
            answer: "",
          });
        },
      },
      elt("div", { className: "country__button-icon--left" })
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

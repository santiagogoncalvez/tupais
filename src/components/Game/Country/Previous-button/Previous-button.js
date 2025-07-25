import "@components/Game/Country/Previous-button/style.css";
import { base } from "@components/Game/Country/Previous-button/Previous-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";
import { prevIndex } from "@utils/circular-counter.js";

export default class previousButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.base = base;
    this.dom = elt(
      "button",
      {
        className: this.base.block,
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
      elt("div", { className: this.base.icon })
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

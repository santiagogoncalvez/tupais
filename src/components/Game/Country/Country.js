import "@components/Game/Country/style.css";
import { countryBase } from "@components/Game/Country/Country-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import elt from "@utils/elt.js";
import Flag from "@components/Game/Country/Flag/Flag.js";
import PreviousButton from "@components/Game/Country/Previous-button/Previous-button.js";
import NextButton from "@components/Game/Country/Next-button/Next-button.js";

export default class Country extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.base = countryBase;
    this.nextButton = new NextButton(state, dispatch);
    this.flag = new Flag(state, dispatch);
    // this.previousButton = new PreviousButton(state, dispatch);
    this.state = state;
    this.dom = elt(
      "div",
      { className: this.base.block},
      // this.previousButton.dom,
      elt("div", {className: "country__fill"}),
      this.flag.dom,
      this.nextButton.dom
    );
  }

  syncState(state) {
    // this.previousButton.syncState(state);
    this.flag.syncState(state);
    this.nextButton.syncState(state);
  }
}

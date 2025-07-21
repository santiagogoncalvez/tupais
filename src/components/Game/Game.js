import "@components/Game/style.css";
import { gameBase } from "@components/Game/Game-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import Score from "@components/Game/Score/Score.js";
import Country from "@components/Game/Country/Country.js";
import Answer from "@components/Game/Answer/Answer.js";
import Keyboard from "@components/Game/Keyboard/Keyboard.js";
import elt from "@utils/elt.js";

export default class Game extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.state = state;
    this.score = new Score(state, dispatch);
    this.country = new Country(state, dispatch);
    this.answer = new Answer(state);
    this.keyboard = new Keyboard(state, dispatch);
    this.dom = elt(
      "div",
      { className: gameBase.block },
      this.score.dom,
      this.country.dom,
      this.answer.dom,
      this.keyboard.dom
    );
  }

  syncState(state) {
    this.score.syncState(state);
    this.country.syncState(state);
    this.answer.syncState(state);
    this.keyboard.syncState(state);
  }
}

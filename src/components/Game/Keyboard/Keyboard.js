import htmlString from "@components/Game/Keyboard/template.html?raw";
import "@components/Game/Keyboard/style.css";
import { base } from "@components/Game/Keyboard/Keyboard-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Keyboard extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.state = state;
    this.answer = state.game.answer;
    this.dom = this._createDom();
    this._init(dispatch);
  }

  syncState(state) {
    this.answer = state.game.answer;
    this.state = state;
  }

  _init(dispatch) {
    const letterButtons = this.dom.querySelectorAll(
      "." + this.base.letterButton
    );
    const backSpaceButton = this.dom.querySelector(
      "." + this.base.backSpaceButton
    );
    const sendButton = this.dom.querySelector("." + this.base.sendButton);

    for (let button of letterButtons) {
      button.addEventListener("click", () => {
        if (
          this.answer.length ==
          this.state.game.countries[this.state.game.countryIndex].replace(
            /\s+/g,
            ""
          ).length
        )
          return;
        this.answer += button.value;
        dispatch({ game: { answer: this.answer } });
      });
    }
    backSpaceButton.addEventListener("click", () => {
      if (this.state.game.answer.length == 0) return;
      this.answer = this.answer.slice(0, this.answer.length - 1);
      dispatch({ game: { answer: this.answer } });
    });
    sendButton.addEventListener("click", () => {
      dispatch({ game: { sendAnswer: true } });
    });

    window.addEventListener("keydown", (event) => {
      const letter = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "ç",
        "ñ",
      ];

      if (letter.includes(event.key.toLowerCase())) {
        // Las letras en mayusculas también deben ser aceptadas (event.key.toLowerCase())
        if (
          this.answer.length ==
          this.state.game.countries[this.state.game.countryIndex].replace(
            /\s+/g,
            ""
          ).length
        )
          return;
        this.answer += event.key;
        dispatch({ game: { answer: this.answer } });
      }
      if (event.key == "Backspace") {
        if (this.state.game.answer.length == 0) return;
        this.answer = this.answer.slice(0, this.answer.length - 1);
        dispatch({ game: { answer: this.answer } });
      }
      if (event.key == "Enter") {
        dispatch({ game: { sendAnswer: true } });
      }
    });
  }
}

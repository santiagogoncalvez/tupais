import { ACTIONS } from "@constants/action-types.js";

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
    // Desactivar botones
    if (state.game.completed != this.state.game.completed) {
      if (state.game.completed) {
        this._disableOptions(true);
      } else {
        this._disableOptions(false);
      }
    }
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
        dispatch({ type: ACTIONS.SET_ANSWER, payload: this.answer });
      });
    }
    backSpaceButton.addEventListener("click", () => {
      if (this.state.game.answer.length == 0) return;
      this.answer = this.answer.slice(0, this.answer.length - 1);
      dispatch({ type: ACTIONS.SET_ANSWER, payload: this.answer });
    });
    sendButton.addEventListener("click", () => {
      dispatch({ type: ACTIONS.SEND_ANSWER });
    });

    window.addEventListener("keydown", (event) => {
      // No ejecutar nada si no se está en un modo de juego
      const gameRoutes = ["/challenge", "/record", "/time-trial"];
      if (!gameRoutes.includes(this.state.router.currentRoute)) return;

      const letters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ç", "ñ"
      ];

      const key = event.key.toLowerCase(); // normalizamos a minúscula

      // Letras del abecedario
      if (letters.includes(key)) {
        // Buscamos el botón usando minúscula también
        const currLetterBt = this.dom.querySelector(
          `.${this.base.letterButton}[value="${key}"]`
        );
        if (currLetterBt) currLetterBt.click();
      }

      // Borrar
      if (key === "backspace") {
        backSpaceButton.click();
      }

      // Enviar
      if (key === "enter") {
        sendButton.click();
      }
    });
  }

  _disableOptions(isDisabled) {
    const letterButtons = this.dom.querySelectorAll(
      "." + this.base.letterButton
    );
    const backSpaceButton = this.dom.querySelector(
      "." + this.base.backSpaceButton
    );
    const sendButton = this.dom.querySelector("." + this.base.sendButton);

    for (let button of letterButtons) {
      button.disabled = isDisabled;
    }
    backSpaceButton.disabled = isDisabled;
    sendButton.disabled = isDisabled;
  }
}

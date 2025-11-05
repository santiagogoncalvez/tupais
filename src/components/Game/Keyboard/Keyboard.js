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
    this._listeners = []; // ✅ Guardar listeners para destruirlos luego
    this._init(dispatch);
  }

  syncState(state) {
    if (state.game.completed != this.state.game.completed) {
      this._disableOptions(state.game.completed);
    }
    this.answer = state.game.answer;
    this.state = state;
  }

  _init(dispatch) {
    const letterButtons = this.dom.querySelectorAll("." + this.base.letterButton);
    const backSpaceButton = this.dom.querySelector("." + this.base.backSpaceButton);
    const sendButton = this.dom.querySelector("." + this.base.sendButton);

    // ✅ Guardamos los listeners para poder removerlos luego
    for (let button of letterButtons) {
      const fn = () => {
        if (
          this.answer.length ==
          this.state.game.countries[this.state.game.countryIndex].replace(/\s+/g, "").length
        )
          return;
        this.answer += button.value;
        dispatch({ type: ACTIONS.SET_ANSWER, payload: this.answer });
      };
      button.addEventListener("click", fn);
      this._listeners.push({ target: button, type: "click", fn });
    }

    const backFn = () => {
      if (this.state.game.answer.length == 0) return;
      this.answer = this.answer.slice(0, -1);
      dispatch({ type: ACTIONS.SET_ANSWER, payload: this.answer });
    };
    backSpaceButton.addEventListener("click", backFn);
    this._listeners.push({ target: backSpaceButton, type: "click", fn: backFn });

    const sendFn = () => dispatch({ type: ACTIONS.SEND_ANSWER });
    sendButton.addEventListener("click", sendFn);
    this._listeners.push({ target: sendButton, type: "click", fn: sendFn });

    const keyFn = (event) => {
      const gameRoutes = ["/challenge"];
      if (!gameRoutes.includes(decodeURIComponent(this.state.router.currentRoute))) return;

      const letters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ç", "ñ"
      ];
      const key = event.key.toLowerCase();

      if (letters.includes(key)) {
        const currLetterBt = this.dom.querySelector(
          `.${this.base.letterButton}[value="${key}"]`
        );
        if (currLetterBt) currLetterBt.click();
      }

      if (key === "backspace") backSpaceButton.click();
      if (key === "enter") sendButton.click();
    };
    window.addEventListener("keydown", keyFn);
    this._listeners.push({ target: window, type: "keydown", fn: keyFn });
  }

  _disableOptions(isDisabled) {
    const letterButtons = this.dom.querySelectorAll("." + this.base.letterButton);
    const backSpaceButton = this.dom.querySelector("." + this.base.backSpaceButton);
    const sendButton = this.dom.querySelector("." + this.base.sendButton);

    for (let button of letterButtons) {
      button.disabled = isDisabled;
    }
    backSpaceButton.disabled = isDisabled;
    sendButton.disabled = isDisabled;
  }

  // ✅ La nueva función para evitar memory leaks
  destroy() {
    this._listeners.forEach(({ target, type, fn }) => {
      target.removeEventListener(type, fn);
    });
    this._listeners = []; // Limpieza
  }
}

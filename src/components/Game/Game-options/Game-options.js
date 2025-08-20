import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Game/Game-options/template.html?raw";
import "@components/Game/Game-options/style.css";
import { base } from "@components/Game/Game-options/Game-options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import { formatOption } from "@utils/string-parser.js";

export default class GameOptions extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.state = state;
    this.answer = state.game.answer;
    this.dom = this._createDom();
    this._init(state, dispatch);
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

    // Mostrar
    if (
      state.game.modes.multipleChoice.showOptions !=
      this.state.game.modes.multipleChoice.showOptions
    ) {
      if (state.game.modes.multipleChoice.showOptions) {
        this._show(state);
      } else this._hide();
    }

    this.answer = state.game.answer;
    this.state = state;
  }

  _setOptions(state) {
    const letterButtons = this.dom.querySelectorAll(
      "." + this.base.letterButton
    );
    for (let i = 0; i < letterButtons.length; i++) {
      letterButtons[i].value = formatOption(
        state.game.modes.multipleChoice.options[i]
      );
      letterButtons[i].querySelector("." + this.base.buttonText).textContent =
        state.game.modes.multipleChoice.options[i];
    }
  }

  _init(state, dispatch) {
    const letterButtons = this.dom.querySelectorAll(
      "." + this.base.letterButton
    );

    this._setOptions(state);

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
        dispatch({ type: ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE });

        dispatch({
          type: ACTIONS.SHOW_NOTIFICATION,
          payload: this.state.game.lastAnswerType,
        });
      });
    }
  }

  _show(state) {
    const letterButtons = this.dom.querySelectorAll(
      "." + this.base.letterButton
    );

    for (let button of letterButtons) {
      if (document.activeElement === button) {
        button.blur();
      }
    }
    // Animaciones
    // Simulación de abrir/cerrar (ejemplo con tecla "o")
    if (this.dom.classList.contains("hide")) {
      this.dom.classList.remove("hide");
      this.dom.addEventListener(
        "transitionend",
        () => {
          this._setOptions(state);
          this.dom.classList.toggle("show");
        },
        { once: true }
      );
      return;
    } else {
      this._setOptions(state);
      this.dom.classList.toggle("show");
    }
  }
  _hide() {
    // Animaciones
    // Simulación de abrir/cerrar (ejemplo con tecla "o")
    this.dom.classList.toggle("show");
    this.dom.classList.add("hide");
  }

  _disableOptions(isDisabled) {
    const letterButtons = this.dom.querySelectorAll(
      "." + this.base.letterButton
    );

    for (let button of letterButtons) {
      button.disabled = isDisabled;
    }
  }
}

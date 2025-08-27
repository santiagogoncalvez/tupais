import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Game/Game-options/template.html?raw";
import "@components/Game/Game-options/style.css";
import { base } from "@components/Game/Game-options/Game-options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import { formatOption } from "@utils/string-parser.js";
import { normStr } from "@utils/string-parser.js";

export default class GameOptions extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.state = state;
    this.dispatch = dispatch;
    this.answer = state.game.answer;
    this.dom = this._createDom();
    this._init(state, dispatch);
  }

  syncState(state) {
    // Desactivar botones
    if (state.game.completed != this.state.game.completed) {
      if (state.game.completed) {
        this._disableOptions(true);
        this._showCorrectAnswer(state);
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

    if (
      state.ui.gameOptions.animateCorrect !=
      this.state.ui.gameOptions.animateCorrect
    ) {
      if (state.ui.gameOptions.animateCorrect) {
        this._showCorrectAnswer(state, {
          type: ACTIONS.STOP_ANIMATE_CORRECT_OPTION,
        });
      }
    }

    this.answer = state.game.answer;
    this.state = state;
  }

  _setOptions(state) {
    const options = this.dom.querySelectorAll("." + this.base.option);
    for (let i = 0; i < options.length; i++) {
      options[i].value = formatOption(
        state.game.modes.multipleChoice.options[i]
      );
      options[i].querySelector("." + this.base.buttonText).textContent =
        state.game.modes.multipleChoice.options[i];
    }
  }

  _init(state, dispatch) {
    const options = this.dom.querySelectorAll("." + this.base.option);

    this._setOptions(state);

    for (let button of options) {
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

        // Este método va a ejectuar la animación y cuando termine va a enviar las acciones
        dispatch({ type: ACTIONS.SET_ANSWER, payload: this.answer });
        dispatch({ type: ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE });

        dispatch({
          type: ACTIONS.SHOW_NOTIFICATION,
          payload: this.state.game.lastAnswerType,
        });
      });
    }
  }

  _showCorrectAnswer(state, action) {
    // Desabilitar botones
    this._disableOptions(true);

    // Animar
    let selectedOption = this.dom.querySelector(
      `.${this.base.option}[value="${this.answer}"]`
    );
    if (state.game.lastAnswerType === "Correct") {
      selectedOption.classList.add("correct");
    } else {
      console.log("Respuesta incorrecta");
      let correctAnswer = normStr(
        state.game.countries[state.game.countryIndex]
      );
      let correctOption = this.dom.querySelector(
        `.${this.base.option}[value="${correctAnswer}"]`
      );

      correctOption.classList.add("correct");
      selectedOption.classList.add("incorrect");
    }

    // Después de animación
    if (action) {
      setTimeout(() => {
        this.dispatch(action);
      }, 1000);
    }
  }

  _show(state) {
    const options = this.dom.querySelectorAll("." + this.base.option);

    for (let button of options) {
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

    // Eliminar la animación de opciones correctas e incorrectas.
    this.dom.querySelector(".correct")?.classList.remove("correct");
    this.dom.querySelector(".incorrect")?.classList.remove("incorrect");

    // Habilitar botones
    this._disableOptions(false);
  }

  _disableOptions(isDisabled) {
    const options = this.dom.querySelectorAll("." + this.base.option);

    for (let button of options) {
      button.disabled = isDisabled;
    }
  }
}

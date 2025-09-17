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
    // this.syncState(state);

    this.isNewMode = true;
  }

  syncState(state) {
    // Solo nos interesa multiple-choice
    if (state.game.mode !== "multiple-choice") {
      this.state = state;
      return;
    }

    // Detectar cambio de modo
    if (state.game.mode !== this.state.game.mode) {
      console.log("CAMBIO DE MODO A MULTIPLE-CHOICE");
      this.isNewMode = true;
    }

    // Desactivar botones si cambió completion
    if (state.game.completed !== this.state.game.completed) {
      if (state.game.completed) {
        this._disableOptions(true);
        this._showCorrectAnswer(state);
      } else {
        this._disableOptions(false);
      }
    }

    // Mostrar u ocultar opciones si cambió o es un nuevo modo
    const prevShow = this.state.game.modes.multipleChoice.showOptions;
    const currShow = state.game.modes.multipleChoice.showOptions;

    if (currShow !== prevShow || this.isNewMode) {
      if (currShow) this._show(state);
      else this._hide();
      this.isNewMode = false;
    }

    // Animación de respuesta correcta
    if (
      state.ui.gameOptions.animateCorrect !==
      this.state.ui.gameOptions.animateCorrect
    ) {
      if (state.ui.gameOptions.animateCorrect) {
        this._showCorrectAnswer(state, {
          type: ACTIONS.STOP_ANIMATE_CORRECT_OPTION,
        });
      }
    }

    // Actualizar referencia
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
      });
    }
  }

  _showCorrectAnswer(state, action) {
    // Desabilitar botones
    this._disableOptions(true);

    console.log("Tipo de respuesta:", state.game.lastAnswerType);

    // Animar
    let selectedOption = this.dom.querySelector(
      `.${this.base.option}[value="${this.answer}"]`
    );
    if (state.game.lastAnswerType === "Correct") {
      selectedOption?.classList.add("correct");
    }

    let correctAnswer = normStr(
      state.game.countries[state.game.countryIndex]
    );
    let correctOption = this.dom.querySelector(
      `.${this.base.option}[value="${correctAnswer}"]`
    );
    if (state.game.lastAnswerType === "Incorrect") {
      correctOption?.classList.add("correct");
      selectedOption?.classList.add("incorrect");
    }

    if (state.game.lastAnswerType === "Skipped") {
      correctOption?.classList.add("correct");
    }

    // Después de animación
    if (action) {
      setTimeout(() => {
        this.dispatch(action);
      }, 1000);
    }
  }

  _show(state) {
    // Desenfocar botones activos
    this.dom.querySelectorAll("." + this.base.option).forEach(button => {
      if (document.activeElement === button) button.blur();
    });

    // Preparar opciones
    this._setOptions(state);

    // Mostrar
    this.dom.classList.remove("hide");
    this.dom.classList.add("show");

    // Limpiar clases de respuestas anteriores
    this.dom.querySelector(".correct")?.classList.remove("correct");
    this.dom.querySelector(".incorrect")?.classList.remove("incorrect");
  }

  _hide() {
    this.dom.classList.remove("show");
    this.dom.classList.add("hide");

    // Limpiar clases de respuestas anteriores
    this.dom.querySelector(".correct")?.classList.remove("correct");
    this.dom.querySelector(".incorrect")?.classList.remove("incorrect");

    this._disableOptions(false);
  }

  _disableOptions(isDisabled) {
    const options = this.dom.querySelectorAll("." + this.base.option);

    for (let button of options) {
      button.disabled = isDisabled;
    }
  }
}

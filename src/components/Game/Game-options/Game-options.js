import { ANSWER_TYPES } from "@constants/answer-types.js";

import { GAME_MODES } from "@constants/game-modes.js";
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

    this._show(state);

    this.isNewMode = true;
  }

  syncState(state) {
    // Solo nos interesa classic
    if (state.game.mode === GAME_MODES.CHALLENGE) {
      this.state = state;
      return;
    }

    if (state.game.newGameId !== this.state.game.newGameId) {
      this._disableOptions(false);
      this.state = state;
      return;
    }


    // Detectar cambio de modo
    if (state.game.mode !== this.state.game.mode) {
      this.isNewMode = true;
    }

    // --- 🟢 NUEVA PARTE (replica del comportamiento original) ---
    const animationActive = state.ui.country.animation;
    const animateCorrect = state.ui.gameOptions.animateCorrect;
    const gameCompleted = state.game.completed;

    const shouldDisable = animationActive || animateCorrect || gameCompleted;
    this._disableOptions(shouldDisable);
    // --- 🔴 fin de la parte nueva ---

    // Desactivar botones si cambió completed
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
      if (currShow) {
        // Preparar opciones
        this._show(state);
        this._setOptions(state);
      }

      this.isNewMode = false;
    }

    if (state.game.countryIndex != this.state.game.countryIndex) {
      this._setOptions(state);
      this._disableOptions(false);
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

        if (this.state.game.mode === GAME_MODES.CLASSIC) {
          dispatch({ type: ACTIONS.SEND_ANSWER_CLASSIC });
        } else {
          dispatch({ type: ACTIONS.SEND_ANSWER });
        }

        dispatch({ type: ACTIONS.START_COUNTRY_ANIMATION });

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
    if (state.game.lastAnswerType === ANSWER_TYPES.CORRECT) {
      selectedOption?.classList.add("correct");
    }

    let correctAnswer = normStr(
      state.game.countries[state.game.countryIndex]
    );
    let correctOption = this.dom.querySelector(
      `.${this.base.option}[value="${correctAnswer}"]`
    );
    if (state.game.lastAnswerType === ANSWER_TYPES.INCORRECT) {
      correctOption?.classList.add("correct");
      selectedOption?.classList.add("incorrect");
    }

    if (state.game.lastAnswerType === ANSWER_TYPES.SKIPPED) {
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
  }

  _disableOptions(isDisabled) {
    const options = this.dom.querySelectorAll("." + this.base.option);

    for (let button of options) {
      button.disabled = isDisabled;
    }
  }
}

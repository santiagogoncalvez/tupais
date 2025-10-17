import { VISIBILITY_STATES } from "@constants/visibility-states.js";


import htmlString from "@components/Flag-gallery/Flag-list/Sort-dropdown/Options/template.html?raw";

// Styles
import "@components/Flag-gallery/Flag-list/Sort-dropdown/Options/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-list/Sort-dropdown/Options/Options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch, options = {}) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;

    this.option = "name-asc";
    this.dom = this._createDom();
    this.dispatch = dispatch;
    this._init(options);

    // Animations
    this.visibilityState = VISIBILITY_STATES.HIDDEN;
    this._showTimeout = null; // para manejar el timeout de la animación

    this.optionAction = null;


    this.handleClickOutside = (event) => {
      if (!this.dom.contains(event.target)) {
        // this.buttonAction(false);
        this._show(false);
      }
    }
  }

  _init(styleOptions) {
    this._applySize(styleOptions.width, styleOptions.height);
    this._applyPosition(styleOptions.top, styleOptions.right);

    const options = this.dom.querySelectorAll("." + this.base.option);
    let hasMouseMove = true;

    this._assignSelected(true);
    this._showInit();

    for (let option of options) {
      //Eventos de mouse
      option.addEventListener("click", (event) => {
        event.preventDefault();
        this.sendOption(option.dataset.value)
      });

      option.addEventListener("mouseenter", () => {
        let curOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (curOpt)
          curOpt.classList.remove(this.modifiers.selectedOption.option);

        option.classList.add(this.modifiers.selectedOption.option);
      });

      option.addEventListener("mouseleave", () => {
        let curOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (curOpt)
          curOpt.classList.remove(this.modifiers.selectedOption.option);

        option.classList.remove(this.modifiers.selectedOption.option);
      });

      option.addEventListener("mousemove", () => {
        if (hasMouseMove) {
          let currOpt = this.dom.querySelector(
            "." + this.modifiers.selectedOption.option
          );
          currOpt.classList.remove(this.modifiers.selectedOption.option);
          option.classList.add(this.modifiers.selectedOption.option);
          hasMouseMove = false;
        }
      });
    }

    //Eventos de teclado

    this.dom.addEventListener("keydown", (event) => {
      event.stopPropagation();
      // event.stopImmediatePropagation();

      if (event.key == "Tab") {
        event.preventDefault();
      }

      if (event.key == "Escape") {
        this.closeSelector();
      }

      let curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );

      if (event.key == "ArrowDown") {
        event.preventDefault();

        hasMouseMove = true;
        if (curOpt) {
          let next = curOpt.nextElementSibling;
          if (next) {
            curOpt.classList.remove(this.modifiers.selectedOption.option);
            next.classList.add(this.modifiers.selectedOption.option);
          }
        } else {
          options[0].classList.add(this.modifiers.selectedOption.option);
        }
      }

      if (event.key == "ArrowUp") {
        event.preventDefault();

        hasMouseMove = true;
        if (curOpt) {
          let previous = curOpt.previousElementSibling;
          if (previous) {
            curOpt.classList.remove(this.modifiers.selectedOption.option);
            previous.classList.add(this.modifiers.selectedOption.option);
          }
        } else {
          options[options.length - 1].classList.add(
            this.modifiers.selectedOption.option
          );
        }
      }
      if (event.key == "Enter") {
        event.preventDefault();
        let currOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (!curOpt) return;
        this.sendOption(currOpt.dataset.value)
      }
    });

    this.dom.addEventListener("blur", () => {
      this.closeSelector();
    });
  }

  sendOption(selectedOption) {
    this.option = selectedOption;

    this.optionAction(this.option);
    // this.buttonAction(false);
    this._show(false);
  }

  closeSelector() {
    if (this.alreadyClosed) return;
    this.alreadyClosed = true;
  }

  _show(isShow) {
    // cancelar cualquier ejecución previa encolada
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    // --- FORZAR RESET ANTERIOR ---
    this.dom.classList.remove(this.modifiers.show.block);
    this.dom.classList.remove(this.modifiers.display.block);

    if (isShow) {
      window.addEventListener("click", this.handleClickOutside);

      this.visibilityState = VISIBILITY_STATES.SHOWING;
      this.alreadyClosed = false;

      // volver a poner display:block
      this.dom.classList.add(this.modifiers.display.block);

      // flush estilos
      this.dom.offsetHeight;

      // focus inmediato
      this.dom.focus();

      // encolar activación de transición
      this._showTimeout = setTimeout(() => {
        this.dom.classList.add(this.modifiers.show.block);
      }, 0);
    } else {
      window.removeEventListener("click", this.handleClickOutside);

      this.visibilityState = VISIBILITY_STATES.HIDING;

      // encolar desactivación
      this._showTimeout = setTimeout(() => {
        this.dom.classList.remove(this.modifiers.show.block);
      }, 0);
    }
  }

  _showInit() {
    this.dom.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "opacity") return;

      if (this.visibilityState === VISIBILITY_STATES.SHOWING) {
        this.visibilityState = VISIBILITY_STATES.VISIBLE;
      } else if (this.visibilityState === VISIBILITY_STATES.HIDING) {
        this.visibilityState = VISIBILITY_STATES.HIDDEN;
        this.dom.classList.remove(this.modifiers.display.block);
      }
    });
  }

  _getContinent() {
    return this.option;
  }
  _assignSelected(isSelect) {
    // La primera vez que se llama a esta función, isSelect es true pero selectedOption es null, esto pasaría en Presentation. En este caso se asigna "all" como continente por defecto.
    let curOpt;
    if (isSelect) {
      curOpt = this.dom.querySelector(`[data-value="${this.option}"]`);
      curOpt.classList.add(this.modifiers.selectedOption.option);
    }
    if (!isSelect) {
      curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );
      if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);
    }
  }

  setOptionAction(action) {
    this.optionAction = action;
  }

  // setAnimateButtonAction(action) {
  //   this.buttonAction = action;
  // }

  reset(sortingOption = "name-asc") {
    this.option = sortingOption;
    this._assignSelected(false);
    this._assignSelected(true);
  }
}

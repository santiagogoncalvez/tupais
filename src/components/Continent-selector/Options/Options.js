import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Continent-selector/Options/template.html?raw";

// Styles
import "@components/Continent-selector/Options/style.css";

import {
  base,
  modifiers,
} from "@components/Continent-selector/Options/Options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    // Se asigna "all" como continente por defecto si no hay uno seleccionado.
    this.continent = state.ui.continentSelector.selectedOption || "all";
    this.dom = this._createDom();
    this._init(dispatch);

    // Animations
    this.visibilityState = "hidden"; // "hidden" | "showing" | "visible" | "hiding"
  }
  syncState(state) {
    if (
      this.state.ui.continentSelector.options.show !=
      state.ui.continentSelector.options.show
    ) {
      this._show(state.ui.continentSelector.options.show);
      this._assignSelected(state.ui.continentSelector.options.show);
    }
    this.state = state;
  }
  _init(dispatch) {
    const options = this.dom.querySelectorAll("." + this.base.option);
    let hasMouseMove = true;

    this._assignSelected(true);
    this._showInit();

    for (let option of options) {
      //Eventos de mouse
      option.addEventListener("click", (event) => {
        event.preventDefault();
        this.continent = option.dataset.value;
        //* Set continent
        dispatch({
          type: ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS,
        });
        dispatch({
          type: ACTIONS.HIDE_BACKDROP,
        });
        dispatch({
          type: ACTIONS.SET_CONTINENT_SELECTOR_OPTION,
          payload: this.continent,
        });
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
        event.preventDefault();
        // El evento "Esc" de los modales se propaga a Options de continentSelector, lo que permite siempre cerrar las opciones.
        dispatch({
          type: ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS,
        });
        dispatch({
          type: ACTIONS.HIDE_BACKDROP,
        });
        dispatch({
          type: ACTIONS.SET_CONTINENT_SELECTOR_OPTION,
          payload: this.continent,
        });
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
        this.continent = currOpt.dataset.value;
        //* Set continent
        dispatch({
          type: ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS,
        });
        dispatch({
          type: ACTIONS.HIDE_BACKDROP,
        });
        dispatch({
          type: ACTIONS.SET_CONTINENT_SELECTOR_OPTION,
          payload: this.continent,
        });
      }
    });
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
      this.visibilityState = "showing";

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
      this.visibilityState = "hiding";

      // encolar desactivación
      this._showTimeout = setTimeout(() => {
        this.dom.classList.remove(this.modifiers.show.block);
      }, 0);
    }
  }

  _showInit() {
    this.dom.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "opacity") return;

      if (this.visibilityState === "showing") {
        this.visibilityState = "visible";
      } else if (this.visibilityState === "hiding") {
        this.visibilityState = "hidden";
        this.dom.classList.remove(this.modifiers.display.block);
      }
    });
  }

  _getContinent() {
    return this.continent;
  }
  _assignSelected(isSelect) {
    // La primera vez que se llama a esta función, isSelect es true pero selectedOption es null, esto pasaría en Presentation. En este caso se asigna "all" como continente por defecto.
    let curOpt;
    if (isSelect) {
      curOpt = this.dom.querySelector(`[data-value="${this.continent}"]`);
      curOpt.classList.add(this.modifiers.selectedOption.option);
    }
    if (!isSelect) {
      curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );
      if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);
    }
  }
}

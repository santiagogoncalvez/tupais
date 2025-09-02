import { ACTIONS } from "@constants/action-types.js";
import elt from "@utils/elt.js";

import htmlString from "@components/Country-search/Options/template.html?raw";

// Styles
import "@components/Country-search/Options/style.css";

import {
  base,
  modifiers,
} from "@components/Country-search/Options/Options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch, options = {}) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    // Se asigna "all" como continente por defecto si no hay uno seleccionado.
    this.continent = state?.ui?.continentSelector.selectedOption || "all";
    this.dom = this._createDom();
    this.dispatch = dispatch;
    this._init(options);

    // Animations
    this.visibilityState = "hidden"; // "hidden" | "showing" | "visible" | "hiding"
    this._showTimeout = null; // para manejar el timeout de la animación

    this.alreadyClosed = false;

    this.hasMouseMove = true;
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
  _init(styleOptions) {
    // this._applySize(styleOptions.width, styleOptions.height);
    // this._applyPosition(styleOptions.top, styleOptions.right);
    this._showInit();

    const options = this.dom.querySelectorAll("." + this.base.option);

    for (let option of options) {
      this._addOptionEvents(option);
    }

    //Eventos de teclado
    this.dom.addEventListener("keydown", (event) => {
      event.stopPropagation();
      // event.stopImmediatePropagation();

      let curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );

      if (event.key == "Tab") {
        event.preventDefault();
      }

      if (event.key == "Escape") {
        this.closeSelector();
      }

      if (event.key == "ArrowDown") {
        event.preventDefault();
        selectNextOption();
      }

      if (event.key == "ArrowUp") {
        event.preventDefault();
        selectPrevOption();
      }
      if (event.key == "Enter") {
        event.preventDefault();
        let currOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (!curOpt) return;
        this.continent = currOpt.dataset.value;
        //* Set continent
        this.closeSelector();
      }
    });

    this.dom.addEventListener("blur", () => {
      this.closeSelector();
    });
  }

  _addOptionEvents(option) {
    //Eventos de mouse
    option.addEventListener("click", (event) => {
      event.preventDefault();
      this.continent = option.dataset.value;
      //* Set continent
      this.closeSelector();
    });

    option.addEventListener("mouseenter", () => {
      let curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );
      if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);

      option.classList.add(this.modifiers.selectedOption.option);
    });

    option.addEventListener("mouseleave", () => {
      let curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );
      if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);

      option.classList.remove(this.modifiers.selectedOption.option);
    });

    option.addEventListener("mousemove", () => {
      if (this.hasMouseMove) {
        let currOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        currOpt.classList.remove(this.modifiers.selectedOption.option);
        option.classList.add(this.modifiers.selectedOption.option);
        this.hasMouseMove = false;
      }
    });
  }

  selectNextOption() {
    const options = this.dom.querySelectorAll("." + this.base.option);
    let curOpt = this.dom.querySelector(
      "." + this.modifiers.selectedOption.option
    );

    // Caso inicial: no hay nada seleccionado → tomar el primero
    if (!curOpt) {
      if (options.length > 0) {
        options[0].classList.add(this.modifiers.selectedOption.option);
      }
      return;
    }

    // Hay un seleccionado → intentar ir al siguiente
    let next = curOpt.nextElementSibling;
    curOpt.classList.remove(this.modifiers.selectedOption.option);

    if (next) {
      next.classList.add(this.modifiers.selectedOption.option);
    } else {
      // Acá se aplicaría la lógica cuando se pasa del último al siguiente
      // Ejemplo: YouTube
    }
    // Si no hay siguiente → queda sin selección (estado vacío como YouTube)
  }

  selectPrevOption() {
    const options = this.dom.querySelectorAll("." + this.base.option);
    let curOpt = this.dom.querySelector(
      "." + this.modifiers.selectedOption.option
    );

    // Caso inicial: no hay nada seleccionado → tomar el último
    if (!curOpt) {
      if (options.length > 0) {
        options[options.length - 1].classList.add(
          this.modifiers.selectedOption.option
        );
      }
      return;
    }

    // Hay un seleccionado → intentar ir al anterior
    let prev = curOpt.previousElementSibling;
    curOpt.classList.remove(this.modifiers.selectedOption.option);

    // Si hay un anterior → seleccionarlo
    if (prev) {
      prev.classList.add(this.modifiers.selectedOption.option);
    } else {
      // Acá se aplicaría la lógica cuando se pasa del primero al anterior
      // Ejemplo: YouTube
    }
    // Si no hay anterior → queda sin selección
  }

  closeSelector() {
    if (this.alreadyClosed) return;
    this.alreadyClosed = true;

    this.dispatch({ type: ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS });
    this.dispatch({ type: ACTIONS.HIDE_BACKDROP });
    this.dispatch({
      type: ACTIONS.SET_CONTINENT_SELECTOR_OPTION,
      payload: this.continent,
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
      this.alreadyClosed = false;

      // volver a poner display:block
      this.dom.classList.add(this.modifiers.display.block);

      // flush estilos
      this.dom.offsetHeight;

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

  // TODO: Hacer que renderOptions reciba los nombres de opciones y las pinte
  renderOptions(optionNames) {
    const fragment = document.createDocumentFragment();
    for (let name of optionNames) {
      let newOption = elt(
        "div",
        { className: this.base.option },
        elt("span", {}, name)
      );
      newOption.setAttribute("data-value", name);
      this._addOptionEvents(newOption);

      fragment.appendChild(newOption);
    }

    this.dom.appendChild(fragment);
  }
}

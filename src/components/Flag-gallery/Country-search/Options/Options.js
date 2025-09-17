import { ACTIONS } from "@constants/action-types.js";
import elt from "@utils/elt.js";

import htmlString from "@components/Flag-gallery/Country-search/Options/template.html?raw";

// Styles
import "@components/Flag-gallery/Country-search/Options/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Country-search/Options/Options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor() {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    // Se asigna "all" como continente por defecto si no hay uno seleccionado.
    this.country = "";
    this.dom = this._createDom();
    this._init();

    // Animations
    this.visibilityState = "hidden"; // "hidden" | "showing" | "visible" | "hiding"
    this._showTimeout = null; // para manejar el timeout de la animación

    this.alreadyClosed = false;

    this.hasMouseMove = true;

    // Historial de opciones
    // Se actualiza en syncState
    // this.itemHistory = ["Argentina", "Brasil", "Chile", "Colombia", "Perú"];
    this.itemHistory = [];
    this.optionsLimit = 10;
    this.arrayLimit = 10;
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
  _init() {
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
        this.country = currOpt.dataset.value;
        //* Set continent
        this.closeSelector();
      }
    });
  }

  _addOptionEvents(option) {
    //Eventos de mouse
    option.addEventListener("click", () => {
      const input = this.dom.parentElement.querySelector(".country-search__input");
      const searchButton = this.dom.parentElement.querySelector(".country-search__button");

      this.country = option.dataset.value;
      input.value = this.country;
      input.dispatchEvent(new Event("input", { bubbles: true }));

      searchButton.click();

      this.addToHistory(this.country);
      this._show(false);
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
      return options[0].dataset.value;
    }

    // Hay un seleccionado → intentar ir al siguiente
    let next = curOpt.nextElementSibling;
    curOpt.classList.remove(this.modifiers.selectedOption.option);

    if (next) {
      next.classList.add(this.modifiers.selectedOption.option);
      return next.dataset.value;
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
        return options[options.length - 1].dataset.value;
      }
    }

    // Hay un seleccionado → intentar ir al anterior
    let prev = curOpt.previousElementSibling;
    curOpt.classList.remove(this.modifiers.selectedOption.option);

    // Si hay un anterior → seleccionarlo
    if (prev) {
      prev.classList.add(this.modifiers.selectedOption.option);
      return prev.dataset.value;
    } else {
      // Acá se aplicaría la lógica cuando se pasa del primero al anterior
      // Ejemplo: YouTube
    }
    // Si no hay anterior → queda sin selección
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
    return this.country;
  }
  _assignSelected(isSelect) {
    // La primera vez que se llama a esta función, isSelect es true pero selectedOption es null, esto pasaría en Presentation. En este caso se asigna "all" como continente por defecto.
    let curOpt;
    if (isSelect) {
      curOpt = this.dom.querySelector(`[data-value="${this.country}"]`);
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
    if (!optionNames || optionNames.length === 0) {
      return;
    }
    this.dom.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < optionNames.length && i < this.optionsLimit; i++) {
      let newOption = elt(
        "div",
        {
          className: this.base.option,
          tabIndex: 0,
        },
        elt("img", {
          className: "search-options__icon",
          src: "/tupais/icons/search.png",
          alt: `search`,
          loading: "lazy",
          width: "18",
          height: "18",
        }),
        elt("span", {}, optionNames[i])
      );
      newOption.setAttribute("data-value", optionNames[i]);

      fragment.appendChild(newOption);
      this._addOptionEvents(newOption);
    }

    this.dom.appendChild(fragment);
  }

  renderHistoryOptions() {
    this.dom.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let name of this.itemHistory) {
      let newOption = elt(
        "div",
        {
          className: this.base.option,
          tabIndex: 0,
        },
        elt("img", {
          className: "search-options__icon",
          src: "/tupais/icons/history.png",
          alt: `history`,
          loading: "lazy",
          width: "18",
          height: "18",
        }),
        elt("span", {}, name)
      );
      newOption.setAttribute("data-value", name);
      this._addOptionEvents(newOption);

      fragment.appendChild(newOption);
    }

    this.dom.appendChild(fragment);
  }

  renderNoResults() {
    this.dom.innerHTML = "";
    let newOption = elt(
      "div",
      { className: this.base.option + ` ${this.base.option}--not-found` },
      elt("span", {}, "No se encontraron resultados")
    );
    this.dom.appendChild(newOption);
  }

  addToHistory(item) {
    // Evitar duplicados
    if (this.itemHistory.includes(item)) {
      // Mover el item al principio
      this.itemHistory = this.itemHistory.filter((i) => i !== item);
      this.itemHistory.unshift(item);
      return;
    }

    // Agregar al inicio del array
    this.itemHistory.unshift(item);

    // Limitar el tamaño del historial a 10 elementos
    if (this.itemHistory.length > this.arrayLimit) {
      this.itemHistory.pop();
    }
  }
}

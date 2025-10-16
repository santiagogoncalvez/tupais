import { VISIBILITY_STATES } from "@constants/visibility-states.js";

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
import CloseButton from "@components/Button/Close-button/Close-button.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch, countrySearch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;

    this.state = state;
    this.dispatch = dispatch;
    this.countrySearch = countrySearch;
    // Se asigna "all" como continente por defecto si no hay uno seleccionado.
    this.country = "";
    this.dom = this._createDom();
    this._init();

    // Animations
    this.visibilityState = VISIBILITY_STATES.HIDDEN; // "hidden" | "showing" | "visible" | "hiding"
    this._showTimeout = null; // para manejar el timeout de la animación

    this.alreadyClosed = false;

    this.hasMouseMove = true;

    // Historial de opciones
    /*
    {
      value: item,
      exact: fromOption, 
    } 
    fromOPtion: true si vino de click en opción, false si fue fuzzy
    */
    this.itemHistory = [...state.search.flagGalleryHistory];
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
      this._addOptionEvents(option, true);
    }

    this.dom.addEventListener("blur", (event) => {
      this._show(false);
    });
  }

  _addOptionEvents(option, isNormalOption) {
    //Eventos de mouse
    option.addEventListener("click", () => {
      const input = this.dom.parentElement.querySelector(".country-search__input");
      const searchButton = this.dom.parentElement.querySelector(".country-search__button");

      this.country = option.dataset.value;
      input.value = this.country;

      input.dispatchEvent(new Event("input", { bubbles: true }));

      // Opción comun y opción de historial por búsqueda exacta
      if (isNormalOption) this.countrySearch.results = [this.country];

      searchButton.click();

      this.addToHistory(this.country, isNormalOption);

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
      this.visibilityState = VISIBILITY_STATES.SHOWING;
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
        elt("div", {
          className: "search-options__icon--common",
        }),
        elt("span", {}, optionNames[i])
      );
      newOption.setAttribute("data-value", optionNames[i]);

      fragment.appendChild(newOption);
      this._addOptionEvents(newOption, true);
    }

    this.dom.appendChild(fragment);
  }

  renderHistoryOptions() {
    this.dom.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (let item of this.itemHistory) {
      let newOption = elt(
        "div",
        {
          className: this.base.option,
          tabIndex: 0,
        },
        elt("div", {
          className: "search-options__icon--history",
        }),
        elt("span", { className: "search-options__text" }, item.value),
        elt("div", { className: "search-options__close-container" })
      );
      newOption.setAttribute("data-value", item.value);

      const closeButton = new CloseButton(() => { }, () => {
        this.removeHistoryOption(newOption);
      }, {
        centerAbsolute: true
      });
      newOption.querySelector(".search-options__close-container").appendChild(closeButton.dom);

      // Acá se va a ingresar el valor de isNormalOption desde la propiedad "fromOption" del elemento de historial
      this._addOptionEvents(newOption, item.exact);

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

  addToHistory(item, isNormalOption = true) {
    // Evitar duplicados (comparando por value)
    this.itemHistory = this.itemHistory.filter(i => i.value !== item);

    // Agregar al inicio con metadatos
    this.itemHistory.unshift({
      value: item,
      exact: isNormalOption, // true si fue selección exacta, false si vino de búsqueda fuzzy
    });

    // Limitar el tamaño del historial
    if (this.itemHistory.length > this.arrayLimit) {
      this.itemHistory.pop();
    }

    this.dispatch({
      type: ACTIONS.GALLERY_SEARCH_HISTORY_SET,
      payload: this.itemHistory,
    });
  }

  // Remover del historial
  removeHistoryOption(optionEl) {
    // Obtener valor del dataset
    const value = optionEl.getAttribute("data-value");

    // Remover del DOM
    optionEl.remove();

    if (this.dom.children.length == 0) this._show(false);

    // Remover del array de historial
    this.removeFromHistory(value);
  }

  removeFromHistory(value) {
    // Filtrar el array quitando el item
    this.itemHistory = this.itemHistory.filter((i) => i.value !== value);

    // Despachar la actualización para que se guarde en el estado/localStorage
    this.dispatch({
      type: ACTIONS.GALLERY_SEARCH_HISTORY_SET,
      payload: this.itemHistory,
    });
  }
}

import Fuse from 'fuse.js';
import fuseConfig from '@config/fuse-config.js' with { type: 'json' };
// import countriesNames from "@data/country-names.json" with { type: "json" };
import countriesLanguajes from "@data/country-languages.json" with { type: "json" };

import htmlString from "@components/Flag-gallery/Filters-panel-mobile/Country-search/template.html?raw";

// Styles
import "@components/Flag-gallery/Filters-panel-mobile/Country-search/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Filters-panel-mobile/Country-search/Country-search-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import Options from "@components/Flag-gallery/Filters-panel-mobile/Country-search/Options/Options.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";

// import countryNames from "@data/country-names.json" with { type: "json" };

// const fuse = new Fuse(countriesNames, fuseConfig);
const fuse = new Fuse(countriesLanguajes, fuseConfig);

export default class CountrySearch extends BaseComponent {
  constructor(state, dispatch, filterItems) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;

    this.options = new Options(state, dispatch, this);
    this.closeButton = new CloseButton(() => { }, this.clearInput.bind(this), {
      top: "50%",
      right: "10px",
      filter:
        "invert(39%) sepia(6%) saturate(0%) hue-rotate(175deg) brightness(91%) contrast(80%)",
      width: "30px",
      height: "100%",
      transform: "translateY(-50%)",
    });
    this.dom = this._createDom();
    this._init();

    this.searchValue = "";
    this.filterItems = filterItems;

    this.results = [];
  }

  _init() {

    // Oculatar CloseButton al iniciar
    this.closeButton.hide();

    let input = this.dom.querySelector(".country-search-subregion__input");
    input.after(this.closeButton.dom);

    this.dom.appendChild(this.options.dom);

    input.addEventListener("input", () => {
      this.searchValue = input.value;

      // Mostrar opciones
      this.options._show(true);
      this.options.dom.scrollTop = 0;
      this.closeButton.show();

      if (input.value.length === 0) {
        if (this.options.itemHistory.length != 0) {
          this.options.renderHistoryOptions();
        } else {
          this.options._show(false);
        }

        this.closeButton.hide();

        // Resetear lista de items cuando se borra el input completamente
        this.filterItems(countriesLanguajes);

        if (input !== document.activeElement) {
          input.focus();
        }
      } else {
        // Hacer búsqueda con Fuse.js
        const results = fuse.search(this.searchValue);
        if (results.length === 0) {
          this.options.renderNoResults();
        } else {
          this.options.renderOptions(results.map(result => result.item));
        }

        this.results = results.map(result => result.item);
        // console.log(results);

        // Seleccionar la primera opción ya que siempre es la respuesta con más coincidencia al texto ingresado
        if (this.results.length != 0) {
          this.options.dom.querySelector(".search-options-subregion__option").classList.add("search-options-subregion__option--selected");
        }
      }
    });

    input.addEventListener("focus", () => {
      if (input.value.length === 0) {
        this.closeButton.hide();
        // if (this.options.itemHistory.length == 0) {
        //   return;
        // }
        // this.options.renderHistoryOptions();

        this.options.renderOptions(countriesLanguajes);
        this.results = countriesLanguajes;
      }

      this.options._show(true);
    });

    input.addEventListener("blur", (event) => {
      const options = this.dom.querySelector(".search-options-subregion");
      if (
        event.relatedTarget && options.contains(event.relatedTarget)
      ) {
        if (event.relatedTarget === options) {
          input.focus();
        }
        return;
      }

      this.options._show(false);

    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        // input.blur();
        this.options._show(false);
      }

      if (event.key === "Enter") {
        event.preventDefault();

        // Si no hay coincidencias no hacer nada
        if (this.results.length === 0) return;

        const button = this.dom.querySelector(".country-search-subregion__button");

        // TODO: Mejorar esto para que no falle si no hay coincidencias exactas
        // Seleccionar la opción que esté seleccionada (la que tiene la clase .selected)
        // Si no hay ninguna seleccionada, seleccionar la primera

        // input.value = this.results[0];
        input.dispatchEvent(new Event("input", { bubbles: true }));


        button.click();
        input.blur();
        // this.closeButton.show();

        // Resetear el input para la próxima búsqueda y por ser un input de filtros de autocompletado. Cuando se selecciona una opción, el input se limpia y se eleva el filtro a los filtros activos.
        input.value = "";
        input.focus();
        // input.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (event.key === "ArrowUp") {
        // Prevenir que el cursor se mueva al inicio del input por comportamiento nativo
        event.preventDefault();
        input.value = this.options.selectPrevOption() || this.searchValue;
        input.setSelectionRange(input.value.length, input.value.length);
      }

      if (event.key === "ArrowDown") {
        input.value = this.options.selectNextOption() || this.searchValue;
      }
    });

    // Evento del botón
    const searchButton = this.dom.querySelector(".country-search-subregion__button");

    searchButton.addEventListener("click", () => {
      if (input.value.length === 0) return;

      // Ejecutar búsqueda
      // Enviar siempre el primer resultado (el que más coincide).
      // Autocompletado con la primer opción siempre.
      this.filterItems([this.results[0]]);
      // this.options.addToHistory(input.value, false);
    });
  }

  clearInput() {
    let input = this.dom.querySelector(".country-search-subregion__input");
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  syncState(state) {
    this.state = state;
  }

  reset() {
    const input = this.dom.querySelector(".country-search-subregion__input");
    if (input && input.value.trim().length > 0) {
      this.clearInput();
      this.options._show(false);
    }
  }

  setSelected(languages) {
    if (!Array.isArray(languages)) return;

    const input = this.dom.querySelector(".country-search-subregion__input");
    if (!input) return;

    // Mostrar el input con los idiomas seleccionados (solo visual)
    input.value = languages.join(", ");

    // Opcional: mostrar los idiomas activos en la lista (si existieran)
    if (this.options && this.options.dom) {
      const optionNodes = this.options.dom.querySelectorAll(".search-options-subregion__option");
      optionNodes.forEach(opt => {
        const text = opt.textContent.trim();
        if (languages.includes(text)) {
          opt.classList.add("search-options-subregion__option--selected");
        } else {
          opt.classList.remove("search-options-subregion__option--selected");
        }
      });
    }

    // Guardar internamente
    this.results = languages;
  }
}

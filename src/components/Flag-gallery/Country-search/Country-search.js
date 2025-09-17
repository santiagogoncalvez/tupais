import Fuse from 'fuse.js';
import fuseConfig from '@config/fuse-config.js' with { type: 'json' };
import countriesNames from "@data/country-names.json" with { type: "json" };

import htmlString from "@components/Flag-gallery/Country-search/template.html?raw";

// Styles
import "@components/Flag-gallery/Country-search/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Country-search/Country-search-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import Options from "@components/Flag-gallery/Country-search/Options/Options.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";

import countryNames from "@data/country-names.json" with { type: "json" };

const fuse = new Fuse(countriesNames, fuseConfig);

export default class CountrySearch extends BaseComponent {
  constructor(state, dispatch, filterItems) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;

    this.options = new Options({}, () => { }, {});
    this.closeButton = new CloseButton(() => { }, this.clearInput.bind(this), {
      top: "50%",
      right: "45px",
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

    let input = this.dom.querySelector(".country-search__input");
    input.after(this.closeButton.dom);

    // this.options.renderOptions([
    //   "Opcion 1",
    //   "Opcion 2",
    //   "Opcion 3",
    //   "Opcion 4",
    //   "Opcion 5",
    // ]);
    this.dom.appendChild(this.options.dom);

    input.addEventListener("input", () => {
      console.log("input event");
      this.searchValue = input.value;

      // Mostrar opciones
      this.options._show(true);
      this.closeButton.show();

      if (input.value.length === 0) {
        if (this.options.itemHistory.length != 0) {
          this.options.renderHistoryOptions();
        } else {
          this.options._show(false);
        }

        this.closeButton.hide();

        // Resetear lista de items cuando se borra el input completamente
        this.filterItems(countryNames);

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
      }
    });

    input.addEventListener("focus", () => {
      if (input.value.length === 0) {
        if (this.options.itemHistory.length == 0) {
          return;
        }
        this.options.renderHistoryOptions();
      }

      this.options._show(true);
    });

    input.addEventListener("blur", (event) => {
      const options = this.dom.querySelector(".search-options");
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
        const button = this.dom.querySelector(".country-search__button");
        button.click();
        input.blur();
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
    const searchButton = this.dom.querySelector(".country-search__button");

    searchButton.addEventListener("click", () => {
      if (input.value.length === 0) return;

      // Ejecutar búsqueda
      this.filterItems(this.results);
      this.options.addToHistory(input.value);
    });
  }

  clearInput() {
    let input = this.dom.querySelector(".country-search__input");
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  syncState(state) {
    const prevRoute = this.state.router.currentRoute;
    const newRoute = state.router.currentRoute;

    const isGalleryRoot = (route) => route === "/flag-gallery";
    const isGalleryCountry = (route) => route.startsWith("/flag-gallery/");

    const stayingWithinGallery =
      (isGalleryRoot(prevRoute) && isGalleryCountry(newRoute)) ||
      (isGalleryCountry(prevRoute) && isGalleryRoot(newRoute)) ||
      (isGalleryCountry(prevRoute) && isGalleryCountry(newRoute));

    // Si no se está dentro de flag-gallery ↔ país, entonces resetear
    if (prevRoute !== newRoute && !stayingWithinGallery) {
      this.clearInput();
    }

    this.state = state;
  }
}

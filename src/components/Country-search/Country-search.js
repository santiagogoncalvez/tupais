import htmlString from "@components/Country-search/template.html?raw";

// Styles
import "@components/Country-search/style.css";

import {
  base,
  modifiers,
} from "@components/Country-search/Country-search-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import Options from "@components/Country-search/Options/Options.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";

export default class CountrySearch extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.options = new Options({}, () => {}, {});
    this.closeButton = new CloseButton(() => {}, this.clearInput.bind(this), {
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
  }

  _init() {

    // Oculatar CloseButton al iniciar
    this.closeButton.hide();

    let input = this.dom.querySelector(".country-search__input");
    input.addEventListener("focus", (event) => {
      this.options._show(true);
    });
    input.after(this.closeButton.dom);


    this.options.renderOptions([
      "Opcion 1",
      "Opcion 2",
      "Opcion 3",
      "Opcion 4",
      "Opcion 5",
    ]);
    this.dom.appendChild(this.options.dom);

    input.addEventListener("input", (event) => {
      this.options._show(true);
      this.closeButton.show();

      if (input.value.length === 0) {
        this.closeButton.hide();
      }
    });

    input.addEventListener("blur", (event) => {
      this.options._show(false);
    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        // input.blur();
        this.options._show(false);
      }

      if (event.key === "ArrowUp") {
        this.options.selectPrevOption();
      }

      if (event.key === "ArrowDown") {
        this.options.selectNextOption();
      }
    });

    // Evento del botón
    const searchButton = this.dom.querySelector(".country-search__button");
    searchButton.addEventListener("click", () => {
      console.log("searchButton clicked");
    });
  }

  clearInput() {
    let input = this.dom.querySelector(".country-search__input");
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    if (input !== document.activeElement) {
      input.focus();
    }
  }

  syncState(state) {}
}

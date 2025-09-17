import { ACTIONS } from "@constants/action-types.js";

import elt from "@utils/elt.js";

import htmlString from "@components/Flag-gallery/Flag-list/template.html?raw";

// Styles
import "@components/Flag-gallery/Flag-list/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-list/Flag-list-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import countriesCca2 from "@data/country-cca2.json" with { type: "json" };
import countryNames from "@data/country-names.json" with { type: "json" };

import { SORT_TYPES } from "@constants/sort-options.js";

export default class flagList extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;

    this.dom = this._createDom();

    this.optionsLimit = 10;

    this._init();
  }

  _init() {
    // En este punto los items ya están ordenados alfabeticamente A-Z
    this.renderItems(countryNames);
  }


  syncState(state) {
  }

  renderItems(optionNames) {
    if (!optionNames || optionNames.length === 0) {
      return;
    }
    const list = this.dom.querySelector(".flag-list__list");
    list.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < optionNames.length; i++) {
      let newOption = elt(
        "il",
        {
          className: "flag-list__item",
          tabIndex: 0,
        },
        elt("a", {
          className: "flag-list__link",
          href: `/flag-gallery/${optionNames[i]}`,
        },
          elt("img", {
            className: "flag-list__flag-img",
            src: `/tupais/images/flags/${countriesCca2[optionNames[i]]}.svg`,
            alt: `search`,
            loading: "lazy",
            height: "44px",
            width: "100px"
          }),
          elt("span", {}, optionNames[i]))
      );
      newOption.setAttribute("data-value", optionNames[i]);
      
      const link = newOption.querySelector(".flag-list__link");
      link.addEventListener("click", (event) => {
        event.preventDefault(); // evita que recargue
        const route = `/flag-gallery/${optionNames[i]}`;
        this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
      })

      fragment.appendChild(newOption);
    }

    list.appendChild(fragment);
  }

  // TODO: corregir error al filtrar con un solo resultado o mas
  filterItems(keepArray = []) {
    const items = this.dom.querySelectorAll(".flag-list__item");

    // Normalizar strings del array a mantener
    const normalize = str =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const keepNormalized = keepArray.map(normalize);
    let visibleCount = 0;

    items.forEach(item => {
      const value = normalize(item.getAttribute("data-value") || "");

      if (keepNormalized.includes(value)) {
        item.style.display = ""; // mostrar
        visibleCount++;
      } else {
        item.style.display = "none"; // ocultar
      }
    });

    if (visibleCount === 0) {
      this.renderNoResults(true);
    } else {
      this.renderNoResults(false);

    }
  }



  renderNoResults(isRendered) {
    const list = this.dom.querySelector(".flag-list__list");
    const noResultsItem = elt("li", { className: "flag-list__no-results" }, "No se encontraron resultados");
    const existingNoResults = this.dom.querySelector(".flag-list__no-results");

    if (isRendered) {
      if (!existingNoResults) {
        list.appendChild(noResultsItem);
      }
    } else {
      if (existingNoResults) {
        existingNoResults.remove();
      }
    }
  }

  sort(type) {
    if (type === SORT_TYPES.NAME_ASC) {
      this.sortItemsAsc();
    }
    if (type === SORT_TYPES.NAME_DESC) {
      this.sortItemsDesc();

    }
  }

  sortItemsAsc() {
    const items = Array.from(this.dom.querySelectorAll(".flag-list__item"));

    const normalize = str =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    items.sort((a, b) => {
      const nameA = normalize(a.getAttribute("data-value") || "");
      const nameB = normalize(b.getAttribute("data-value") || "");
      return nameA.localeCompare(nameB, "es"); // comparador en español
    });

    // Reinsertar en el DOM en el nuevo orden
    const list = this.dom.querySelector(".flag-list__list");
    items.forEach(item => list.appendChild(item));
  }

  sortItemsDesc() {
    const items = Array.from(this.dom.querySelectorAll(".flag-list__item"));

    const normalize = str =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    items.sort((a, b) => {
      const nameA = normalize(a.getAttribute("data-value") || "");
      const nameB = normalize(b.getAttribute("data-value") || "");
      return nameB.localeCompare(nameA, "es"); // invertido
    });

    const list = this.dom.querySelector(".flag-list__list");
    items.forEach(item => list.appendChild(item));
  }
}

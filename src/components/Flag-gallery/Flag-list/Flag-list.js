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
import {
  getContinent,
  getPopulation,
  getArea
} from "@utils/country-parser.js";


import { SORT_TYPES } from "@constants/sort-options.js";

export default class flagList extends BaseComponent {
  constructor(state, dispatch, scale = 1) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.scale = scale;

    this.dom = this._createDom();

    this.optionsLimit = 10;
    this.sortType = "name-asc";

    this._init();

    this.setScale(scale);
  }

  _init() {
    // En este punto los items ya están ordenados alfabeticamente A-Z
    this.renderItems(countryNames);

    // Si se pasó un scale distinto a 1, alinear al inicio
    if (this.scale !== 1) {
      const list = this.dom.querySelector(".flag-list__list");
      if (list) {
        list.style.justifyContent = "start";
      }
    }
  }


  syncState(state) {
  }

  // TODO: corregir error al filtrar con un solo resultado o mas
  filterItems(keepArray = []) {
    // 1️⃣ Re-renderizar todos los elementos para que existan en el DOM
    this.renderItems(countryNames);

    const items = this.dom.querySelectorAll(".flag-list__item");
    const labels = this.dom.querySelectorAll(".flag-list__continent");

    const normalize = str =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    const keepNormalized = keepArray.map(normalize);
    let visibleCount = 0;

    // 2️⃣ Mostrar/ocultar países
    items.forEach(item => {
      const value = normalize(item.getAttribute("data-value") || "");
      if (keepNormalized.includes(value)) {
        item.style.display = "";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    // 3️⃣ Mostrar/ocultar labels de continentes
    labels.forEach(label => {
      const continent = label.textContent.trim();
      const countriesInContinent = Array.from(items).filter(
        item => item.getAttribute("data-continent") === continent
      );
      const anyVisible = countriesInContinent.some(item => item.style.display !== "none");
      label.style.display = anyVisible ? "" : "none";
    });

    // 4️⃣ No results
    if (visibleCount === 0) this.renderNoResults(true);
    else this.renderNoResults(false);

    // Ordenar
    this.sort(this.sortType);
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

  setScale(scale = 1) {
    this.scale = scale;
    this.dom.style.setProperty("--flag-scale", scale);
  }

  sort(type) {
    this.sortType = type;

    const showExtraInfo = [
      "population-asc",
      "population-desc",
      "area-asc",
      "area-desc",
    ].includes(type);

    // Tomar solo los items visibles
    const items = Array.from(this.dom.querySelectorAll(".flag-list__item"))
      .filter(item => item.style.display !== "none");

    // Obtener los nombres de los items
    const visibleNames = items.map(item => item.getAttribute("data-value"));

    let sortedNames = [...visibleNames];

    switch (type) {
      case "population-asc":
        sortedNames.sort((a, b) => getPopulation(a) - getPopulation(b));
        break;
      case "population-desc":
        sortedNames.sort((a, b) => getPopulation(b) - getPopulation(a));
        break;
      case "area-asc":
        sortedNames.sort((a, b) => getArea(a) - getArea(b));
        break;
      case "area-desc":
        sortedNames.sort((a, b) => getArea(b) - getArea(a));
        break;
      case "name-asc":
        sortedNames.sort((a, b) => a.localeCompare(b, "es"));
        break;
      case "name-desc":
        sortedNames.sort((a, b) => b.localeCompare(a, "es"));
        break;
      case "continent":
        this.renderItemsByContinent(sortedNames);
        return; // ya hace render, no hace falta más
    }

    this.renderItems(sortedNames);

    // Tomar solo los items visibles
    const sortedItems = Array.from(this.dom.querySelectorAll(".flag-list__item"))
      .filter(item => item.style.display !== "none");

    // Activar o desactivar info extra
    sortedItems.forEach(item => {
      if (showExtraInfo) {
        item.classList.add("show-extra");
      } else {
        item.classList.remove("show-extra");
      }
    });
  }


  // Función genérica para ordenar por número (población o superficie)
  sortByNumber(items, attr, asc = true) {
    items.sort((a, b) => {
      const aValue = parseInt(a.getAttribute(attr), 10);
      const bValue = parseInt(b.getAttribute(attr), 10);
      return asc ? aValue - bValue : bValue - aValue;
    });

    const list = this.dom.querySelector(".flag-list__list");
    items.forEach(item => list.appendChild(item));
  }


  renderItems(optionNames) {
    if (!optionNames || optionNames.length === 0) return;
    const list = this.dom.querySelector(".flag-list__list");
    list.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < optionNames.length; i++) {
      fragment.appendChild(this._createFlagItem(optionNames[i]));
    }

    list.appendChild(fragment);
  }

  renderItemsByContinent(optionNames) {
    if (!optionNames || optionNames.length === 0) return;
    const list = this.dom.querySelector(".flag-list__list");
    list.innerHTML = "";

    // Necesitás un mapeo: país -> continente
    // Ejemplo: import countryContinents from "@data/country-continents.json"
    const grouped = {};
    for (let i = 0; i < optionNames.length; i++) {
      const name = optionNames[i];
      const continent = getContinent(name); // helper
      if (!grouped[continent]) grouped[continent] = [];
      grouped[continent].push(name);
    }

    // Ordenar continentes alfabéticamente
    const sortedContinents = Object.keys(grouped).sort((a, b) =>
      a.localeCompare(b, "es")
    );

    const fragment = document.createDocumentFragment();

    for (const continent of sortedContinents) {
      // Subtítulo del continente
      const subtitle = elt("li", { className: "flag-list__continent" }, continent);
      fragment.appendChild(subtitle);

      // Ordenar países alfabéticamente dentro del continente
      const sortedCountries = grouped[continent].sort((a, b) =>
        a.localeCompare(b, "es")
      );

      // Insertar países de ese continente
      for (const c of sortedCountries) {
        fragment.appendChild(this._createFlagItem(c));
      }
    }

    list.appendChild(fragment);
  }


  _createFlagItem(name) {
    const population = getPopulation(name); // número en formato entero
    const area = getArea(name); // número en km²
    const continent = getContinent(name);

    let newOption = elt(
      "li", // corregido 'il' → 'li'
      {
        className: "flag-list__item",
        tabIndex: 0,
      },
      elt("a", {
        className: "flag-list__link",
        href: `#/flag-gallery/${name}`,
      },
        elt("img", {
          className: "flag-list__flag-img",
          src: `/tupais/images/flags/${countriesCca2[name]}.svg`,
          alt: `Bandera de ${name}`,
          loading: "lazy",
          height: "44px",
          width: "100px"
        }),
        elt("span", { className: "flag-list__name" }, name),
        // Información extra (invisible por defecto)
        elt("div", { className: "flag-list__info" },
          elt("div", { className: "flag-list__info-container" }, `Población:`,
            elt("br"),
            elt("span", { className: "flag-list__info-text" }, `${population.toLocaleString()}`)),
          elt("div", { className: "flag-list__info-container" },
            "Área:",
            elt("br"),
            elt("span", { className: "flag-list__info-text" }, `${area.toLocaleString()} km²`)
          ),

        )
      ),
    );
    newOption.setAttribute("data-value", name);
    newOption.setAttribute("data-population", population);
    newOption.setAttribute("data-area", area);
    newOption.setAttribute("data-continent", continent); // <-- clave para el filtrado


    const link = newOption.querySelector(".flag-list__link");
    link.addEventListener("click", () => {
      const route = `/flag-gallery/${name}`;
      this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
    });

    return newOption;
  }


}

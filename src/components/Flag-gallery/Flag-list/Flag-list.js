import { ACTIONS } from "@constants/action-types.js";
import elt from "@utils/elt.js";
import htmlString from "@components/Flag-gallery/Flag-list/template.html?raw";

// Styles
import "@components/Flag-gallery/Flag-list/style.css";

import { base, modifiers } from "@components/Flag-gallery/Flag-list/Flag-list-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import countriesCca2 from "@data/country-cca2.json" with { type: "json" };
import countryNames from "@data/country-names.json" with { type: "json" };
import { getContinent, getPopulation, getArea } from "@utils/country-parser.js";

export default class FlagList extends BaseComponent {
  constructor(state, dispatch, scale = 1) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.scale = scale;

    this.dom = this._createDom();
    this.sortType = "name-asc";

    // Información extra
    this.extraInfoShow = false;

    // 🔹 Estado
    this.allCountries = countryNames;
    this.searchResults = null; // coincidencias del buscador
    this.activeFilters = {};   // { continent: "Europe", ... }

    this.items = [];
    this.labels = [];

    this._init();
    this.setScale(scale);
  }

  _init() {
    this.renderItems(this.allCountries);
    this.items = Array.from(this.dom.querySelectorAll(".flag-list__item"));
    this.labels = Array.from(this.dom.querySelectorAll(".flag-list__continent"));

    if (this.scale !== 1) {
      const list = this.dom.querySelector(".flag-list__list");
      if (list) list.style.justifyContent = "start";
    }
  }

  syncState(state) { }

  // =========================
  // 🔍 Búsqueda
  // =========================
  setSearchResults(results) {
    this.searchResults = Array.isArray(results) ? results : [];
    this.applyAll();
  }

  // =========================
  // 🎛️ Filtros
  // =========================
  applyFilter({ category, value, remove = false }) {
    if (remove) {
      // 🔹 Eliminar solo ese filtro
      if (category === "continent") {
        delete this.activeFilters[category]; // continente único
      } else if (Array.isArray(this.activeFilters[category])) {
        this.activeFilters[category] = this.activeFilters[category].filter(v => v !== value);
        if (this.activeFilters[category].length === 0) {
          delete this.activeFilters[category];
        }
      }
    } else {
      // 🔹 Agregar/activar filtro
      if (category === "continent") {
        this.activeFilters[category] = value;
      } else {
        if (!this.activeFilters[category]) this.activeFilters[category] = [];
        if (!this.activeFilters[category].includes(value)) this.activeFilters[category].push(value);
      }
    }

    this.applyAll();

    // 🔹 Regenerar labels si el orden es por continente
    if (this.sortType === "continent") {
      const visibles = this.items
        .filter(item => item.style.display !== "none")
        .map(item => item.dataset.value);
      this.renderItemsByContinent(visibles);
    }
  }



  // =========================
  // 🔽 Orden
  // =========================
  setSort(type) {
    this.sortType = type;
    this.applyAll();
  }

  // =========================
  // ⚡ Motor principal
  // =========================
  applyAll() {
    // 1️⃣ Base: búsqueda o todos
    let result = this.searchResults ? [...this.searchResults] : [...this.allCountries];

    // 2️⃣ Filtros activos
    if (this.activeFilters.continent) {
      result = result.filter(name => getContinent(name) === this.activeFilters.continent);
    }

    // 3️⃣ Mostrar/ocultar nodos
    let visibleCount = 0;
    let visibleItems = [];

    this.items.forEach(item => {
      const name = item.dataset.value;
      if (result.includes(name)) {
        item.style.display = "";
        visibleItems.push(name);
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    // 4️⃣ Mostrar/ocultar labels
    this.labels.forEach(label => {
      const continent = label.textContent.trim();
      const anyVisible = this.items.some(
        item => item.dataset.continent === continent && item.style.display !== "none"
      );
      label.style.display = anyVisible ? "" : "none";
    });

    // 5️⃣ Ordenar visibles o regenerar labels
    if (this.sortType === "continent") {
      this.renderItemsByContinent(visibleItems);
    } else {
      this.sort(this.sortType, { reRender: false });
    }



    // 🔹 Caso: resultados vacíos
    if (result.length === 0) {
      // Ocultar todos los países
      this.items.forEach(item => (item.style.display = "none"));
      // Ocultar labels
      this.labels.forEach(label => (label.style.display = "none"));
      // Mostrar mensaje de "no results"
      this.renderNoResults(true);
      return;
    } else {
      this.renderNoResults(false);
    }
  }



  // =========================
  // 🛠️ Utilidades
  // =========================
  renderNoResults(isRendered) {
    const list = this.dom.querySelector(".flag-list__list");
    const noResultsItem = elt("li", { className: "flag-list__no-results" }, "No se encontraron resultados");
    const existing = this.dom.querySelector(".flag-list__no-results");

    if (isRendered) {
      if (!existing) list.appendChild(noResultsItem);
    } else {
      if (existing) existing.remove();
    }
  }

  setScale(scale = 1) {
    this.scale = scale;
    this.dom.style.setProperty("--flag-scale", scale);
  }


  sort(type, { reRender = true } = {}) {
    this.sortType = type;

    // 🔹 Si no es por continente, eliminar labels
    if (type !== "continent") {
      this.labels.forEach(label => label.remove());
      this.labels = [];
    }

    const items = this.items.filter(item => item.style.display !== "none");
    let sortedItems = [...items];

    switch (type) {
      case "population-asc":
        sortedItems.sort((a, b) => getPopulation(a.dataset.value) - getPopulation(b.dataset.value));
        this.showExtraInfo(items, true);
        break;
      case "population-desc":
        sortedItems.sort((a, b) => getPopulation(b.dataset.value) - getPopulation(a.dataset.value));
        this.showExtraInfo(items, true);
        break;
      case "area-asc":
        sortedItems.sort((a, b) => getArea(a.dataset.value) - getArea(b.dataset.value));
        this.showExtraInfo(items, true);
        break;
      case "area-desc":
        sortedItems.sort((a, b) => getArea(b.dataset.value) - getArea(a.dataset.value));
        this.showExtraInfo(items, true);
        break;
      case "name-asc":
      case "name-desc":
        sortedItems.sort((a, b) =>
          type === "name-asc"
            ? a.dataset.value.localeCompare(b.dataset.value, "es")
            : b.dataset.value.localeCompare(a.dataset.value, "es")
        );
        this.showExtraInfo(items, false);
        break;
      case "continent":
        if (reRender) this.renderItemsByContinent(sortedItems.map(i => i.dataset.value));
        this.showExtraInfo(items, false);
        return;
    }

    const list = this.dom.querySelector(".flag-list__list");
    sortedItems.forEach(item => list.appendChild(item));
  }

  showExtraInfo(items, show) {
    this.extraInfoShow = show; // 🔹 setear una sola vez
    for (let item of items) {
      if (show) item.classList.add("show-extra");
      else item.classList.remove("show-extra");
    }
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

    this.items = Array.from(this.dom.querySelectorAll(".flag-list__item"));
    this.labels = Array.from(this.dom.querySelectorAll(".flag-list__continent"));
  }

  renderItemsByContinent(optionNames) {
    if (!optionNames || optionNames.length === 0) return;

    const list = this.dom.querySelector(".flag-list__list");

    // 🔹 Ocultar todos los items y labels primero
    this.items.forEach(item => (item.style.display = "none"));
    this.labels.forEach(label => label.remove());

    // 🔹 Agrupar visibles según continentes
    const grouped = {};
    for (let i = 0; i < optionNames.length; i++) {
      const name = optionNames[i];
      const continent = getContinent(name);
      if (!grouped[continent]) grouped[continent] = [];
      grouped[continent].push(name);
    }

    // 🔹 Ordenar continentes
    const sortedContinents = Object.keys(grouped).sort((a, b) =>
      a.localeCompare(b, "es")
    );

    // 🔹 Insertar labels y mostrar países
    sortedContinents.forEach(continent => {
      // Crear subtítulo
      const subtitle = elt("li", { className: "flag-list__continent" }, continent);
      list.appendChild(subtitle);

      const sortedCountries = grouped[continent].sort((a, b) =>
        a.localeCompare(b, "es")
      );

      sortedCountries.forEach(name => {
        const item = this.items.find(i => i.dataset.value === name);
        if (item) {
          item.style.display = "";
          list.appendChild(item);
        }
      });
    });

    // 🔹 Refrescar referencias
    this.items = Array.from(this.dom.querySelectorAll(".flag-list__item"));
    this.labels = Array.from(this.dom.querySelectorAll(".flag-list__continent"));
  }


  _createFlagItem(name) {
    const population = getPopulation(name);
    const area = getArea(name);
    const continent = getContinent(name);

    const newOption = elt(
      "li",
      { className: "flag-list__item", tabIndex: 0 },
      elt(
        "a",
        {
          className: "flag-list__link",
          href: `#/flag-gallery/${name}`,
        },
        elt("img", {
          className: "flag-list__flag-img",
          src: `/tupais/images/flags/${countriesCca2[name]}.svg`,
          alt: `Bandera de ${name}`,
          loading: "lazy",
          height: "44px",
          width: "100px",
        }),
        elt("span", { className: "flag-list__name" }, name),
        elt(
          "div",
          { className: "flag-list__info" },
          elt("div", { className: "flag-list__info-container" }, "Población:", elt("br"), elt("span", { className: "flag-list__info-text" }, `${population.toLocaleString()}`)),
          elt("div", { className: "flag-list__info-container" }, "Área:", elt("br"), elt("span", { className: "flag-list__info-text" }, `${area.toLocaleString()} km²`))
        )
      )
    );

    newOption.setAttribute("data-value", name);
    newOption.setAttribute("data-population", population);
    newOption.setAttribute("data-area", area);
    newOption.setAttribute("data-continent", continent);

    const link = newOption.querySelector(".flag-list__link");
    link.addEventListener("click", () => {
      const route = `/flag-gallery/${name}`;
      this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
    });

    return newOption;
  }
}

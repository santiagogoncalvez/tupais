import htmlString from "@components/Flag-gallery/Filters-panel/template.html?raw";

// Styles
import "@components/Flag-gallery/Filters-panel/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Filters-panel/Filters-panel-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import CountrySearch from "@components/Flag-gallery/Filters-panel/Country-search/Country-search.js";


import elt from "@utils/elt.js";


export default class FiltersPanel extends BaseComponent {
  constructor(state, dispatch, filterAction) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.filterAction = filterAction;
    this.dom = this._createDom();

    this.countrySearch =
      new CountrySearch(
        state,
        dispatch,
        (data) => {
          if (data.length == 1) {
            // 
            this.filterAction({ category: "subregion", value: data[0] });
          }
        }
      );

    this.activeFilters = {}; // objeto que guarda los filtros activos

    this._init();
  }

  _init() {
    const optionsButtons = this.dom.querySelectorAll(".filters-panel__option");

    // Continente
    for (let option of optionsButtons) {
      option.addEventListener("click", () => {
        const category = option.dataset.filterCategory;
        const value = option.dataset.filterValue;

        // 🔹 Si es continente, solo puede haber uno activo
        if (category === "continent") {
          // Quitar highlight de todos los botones de la categoría
          this._resetCategoryButtons(category);
        }

        // Marcar botón como activo
        option.classList.add("active");

        // Guardar el filtro activo
        this.activeFilters[category] = value;

        // Aplicar filtro en el store/lista
        this.filterAction({ category, value });

        // Renderizar chip en el cajón de filtros activos
        this.renderFilterChip(category, value);
      });
    }

    // Subregión
    this.dom.querySelector(".filters-panel__section.subregion").appendChild(this.countrySearch.dom);
  }

  // Quita la clase "active" de todos los botones de la categoría
  _resetCategoryButtons(category) {
    const buttons = this.dom.querySelectorAll(`.filters-panel__option[data-filter-category="${category}"]`);
    buttons.forEach(btn => btn.classList.remove("active"));
  }

  renderFilterChip(category, value) {
    const chipsContainer = this.dom.querySelector(".active-filters");

    // Cada categoría mantiene solo un chip (opcional)
    let existingChip = chipsContainer.querySelector(`.filter-chip[data-category="${category}"]`);
    if (existingChip) existingChip.remove();

    let newChip = elt("span", {
      className: "filter-chip",
    },
      elt("span", { className: "chip-text" }, value),
      elt("button", {
        className: "chip-close",
        onclick: () => {
          newChip.remove();
          delete this.activeFilters[category]; // quitar del objeto de filtros

          // 🔹 Quitar highlight del botón correspondiente
          const button = this.dom.querySelector(`.filters-panel__option[data-filter-category="${category}"][data-filter-value="${value}"]`);
          if (button) button.classList.remove("active");

          this.filterAction({ category, value, remove: true });
        }
      }, "×")
    );

    newChip.setAttribute("data-category", category);
    newChip.setAttribute("data-value", value);

    chipsContainer.appendChild(newChip);
  }
}

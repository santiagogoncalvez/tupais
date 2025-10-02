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

    this.languageSearch = new CountrySearch(state, dispatch, (language) => {
      if (language.length == 1) {
        const category = "languages";
        const value = language[0];

        this._applyCategoryFilter({ category, value, isMulti: true });
      }
    });


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

        this._applyCategoryFilter({ category, value });
      });
    }

    // Toggle "Mostrar más" / "Mostrar menos"
    const toggleButtons = this.dom.querySelectorAll(".filters-panel__toggle");
    toggleButtons.forEach(btn => {
      const optionsContainer = btn.previousElementSibling; // asume que el botón sigue al contenedor
      btn.addEventListener("click", () => {
        const expanded = optionsContainer.classList.toggle("filters-panel__options--expanded");
        btn.querySelector(".filters-panel__toggle-text").textContent = expanded ? "Mostrar menos" : "Mostrar más";
        btn.querySelector(".filters-panel__toggle-icon").textContent = expanded ? "- " : "+ ";

      });
    });

    // Agregar filtro por lenguaje
    this.dom.querySelector(".filters-panel__section--languajes").appendChild(this.languageSearch.dom);
  }

  _applyCategoryFilter({ category, value, isMulti = false }) {
    if (!isMulti) {
      // 🔹 Selección única
      this._resetCategoryButtons(category);

      const option = this.dom.querySelector(
        `.filters-panel__option[data-filter-category="${category}"][data-filter-value="${value}"]`
      );
      if (option) option.classList.add("active");

      this.activeFilters[category] = value;
    } else {
      // 🔹 Selección múltiple
      if (!Array.isArray(this.activeFilters[category])) {
        this.activeFilters[category] = [];
      }

      // toggle
      if (this.activeFilters[category].includes(value)) {
        this.activeFilters[category] = this.activeFilters[category].filter(v => v !== value);
      } else {
        this.activeFilters[category].push(value);
      }

      // 🔹 Resetear visualmente y marcar los activos
      this._resetCategoryButtons(category);
      this.activeFilters[category].forEach(v => {
        const btn = this.dom.querySelector(
          `.filters-panel__option[data-filter-category="${category}"][data-filter-value="${v}"]`
        );
        if (btn) btn.classList.add("active");
      });

      // limpiar si queda vacío
      if (this.activeFilters[category].length === 0) {
        delete this.activeFilters[category];
      }
    }

    // 🔹 Aplicar filtro en el store/lista
    this.filterAction({ category, value });

    // 🔹 Renderizar chip en el cajón de filtros activos
    this.renderFilterChip(category, value);
  }

  // Quita la clase "active" de todos los botones de la categoría
  _resetCategoryButtons(category) {
    const buttons = this.dom.querySelectorAll(`.filters-panel__option[data-filter-category="${category}"]`);
    buttons.forEach(btn => btn.classList.remove("active"));
  }

  renderFilterChip(category, value) {
    const chipsContainer = this.dom.querySelector(".active-filters");

    // 🔹 Si la categoría es multi (ej: languages) permitimos varios chips
    const isMulti = Array.isArray(this.activeFilters[category]);

    if (!isMulti) {
      // Caso selección única: reemplazar chip existente
      let existingChip = chipsContainer.querySelector(
        `.filter-chip[data-category="${category}"]`
      );
      if (existingChip) existingChip.remove();
    } else {
      // Evitar duplicados en multi
      let existingChip = chipsContainer.querySelector(
        `.filter-chip[data-category="${category}"][data-value="${value}"]`
      );
      if (existingChip) return;
    }

    let newChip = elt(
      "span",
      {
        className: "filter-chip",
      },
      elt("span", { className: "chip-text" }, value),
      elt(
        "button",
        {
          className: "chip-close",
          onclick: () => {
            newChip.remove();

            if (isMulti) {
              // 🔹 Quitar solo ese valor del array
              this.activeFilters[category] = this.activeFilters[category].filter(
                v => v !== value
              );
              if (this.activeFilters[category].length === 0) {
                delete this.activeFilters[category];
              }
            } else {
              // 🔹 Selección única
              delete this.activeFilters[category];
            }

            // Quitar highlight del botón correspondiente
            const button = this.dom.querySelector(
              `.filters-panel__option[data-filter-category="${category}"][data-filter-value="${value}"]`
            );
            if (button) button.classList.remove("active");

            this.filterAction({ category, value, remove: true });
          },
        },
        "×"
      )
    );

    newChip.setAttribute("data-category", category);
    newChip.setAttribute("data-value", value);

    chipsContainer.appendChild(newChip);
  }

}

import { ACTIONS } from "@constants/action-types.js";


import htmlString from "@components/Flag-gallery/Filters-panel/template.html?raw";
import "@components/Flag-gallery/Filters-panel/style.css";
import { base, modifiers } from "@components/Flag-gallery/Filters-panel/Filters-panel-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import CountrySearch from "@components/Flag-gallery/Filters-panel/Country-search/Country-search.js";
import Slider from "@components/Flag-gallery/Filters-panel/Slider/Slider.js";
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

    this.activeFilters = {};
    this.multiCategories = ["languages"]; // categorías que permiten selección múltiple

    // 🔹 Language search
    this.languageSearch = new CountrySearch(state, dispatch, (languages) => {
      if (languages.length === 1) {
        this._applyCategoryFilter({ category: "languages", value: languages[0] });
      }
    });
    this.dom.querySelector(".filters-panel__section--languajes").appendChild(this.languageSearch.dom);

    // 🔹 Population slider
    this.sliderPopulation = new Slider(state, dispatch, undefined, undefined, (range) => {
      this._applyCategoryFilter({ category: "population", value: range });
    });
    this.dom.querySelector(".filters-panel__section--population").appendChild(this.sliderPopulation.dom);

    // 🔹 Área slider
    this.sliderArea = new Slider(state, dispatch, 0, 17098242, (range) => {
      this._applyCategoryFilter({ category: "area", value: range });
    }, 10, 10000000, true);
    this.dom.querySelector(".filters-panel__section--area").appendChild(this.sliderArea.dom);

    // 🔹 Botón Limpiar filtros
    this.clearButton = elt("button", { className: "filters-panel__clear" }, "Limpiar filtros");
    this.clearButton.style.display = "none"; // oculto por defecto
    this.clearButton.addEventListener("click", () => this.clearAllFilters());
    this.dom.querySelector(".active-filters-container").appendChild(this.clearButton);

    this._init();
  }

  _init() {
    // Botones de filtros (toggle: primer click agrega, segundo click quita)

    this.dom.querySelectorAll(".filters-panel__option").forEach(option => {
      option.addEventListener("click", () => {
        const category = option.dataset.filterCategory;
        let value = option.dataset.filterValue;
        try { value = JSON.parse(value); } catch { }

        // Si ya está activo → elimina como si fuera chip
        if (option.classList.contains("active")) {
          this._removeCategoryFilter(category, value);
        }
        // Si no está activo → agrega
        else {
          this._applyCategoryFilter({ category, value });
        }
      });
    });


    // Botones de filtros SIN TOGGLE (siempre agrega, no quita)
    // this.dom.querySelectorAll(".filters-panel__option").forEach(option => {
    //   option.addEventListener("click", () => {
    //     const category = option.dataset.filterCategory;
    //     let value = option.dataset.filterValue;
    //     try { value = JSON.parse(value); } catch { }
    //     this._applyCategoryFilter({ category, value });
    //   });
    // });


    // Toggle "Mostrar más/menos"
    this.dom.querySelectorAll(".filters-panel__toggle").forEach(btn => {
      const optionsContainer = btn.previousElementSibling;
      btn.addEventListener("click", () => {
        const expanded = optionsContainer.classList.toggle("filters-panel__options--expanded");
        btn.querySelector(".filters-panel__toggle-text").textContent = expanded ? "Mostrar menos" : "Mostrar más";
        btn.querySelector(".filters-panel__toggle-icon").textContent = expanded ? "- " : "+ ";
      });
    });
  }

  syncState(state) {
    if (!state || !state.filters) return;

    const { filters } = state;

    // Actualizar filtros internos
    this.activeFilters = JSON.parse(JSON.stringify(filters || {}));


    // 🔹 Resetear botones visuales
    this._resetAllButtons();

    // 🔹 3️⃣ Actualizar estado visual (.active) sin alterar la lógica interna
    this._markActiveButtons();


    // 🔹 Activar botones según filtros
    this.renderFilterChips();

    // 🔹 Actualizar visibilidad del botón limpiar
    this._updateClearButton();
  }

  renderFilterChips() {
    const containerFilters = this.dom.querySelector(".active-filters-container");
    containerFilters.style.display = Object.keys(this.activeFilters).length > 0 ? "flex" : "none";

    const container = this.dom.querySelector(".active-filters");
    if (!container) return;

    // 🧹 Limpiar contenido previo
    container.innerHTML = "";

    // 🔹 Si no hay filtros activos, ocultar el contenedor
    if (!this.activeFilters || Object.keys(this.activeFilters).length === 0) {
      container.style.display = "none";
      return;
    }

    container.style.display = "flex";

    // 🔁 Recorrer todos los filtros activos y renderizar chips
    Object.entries(this.activeFilters).forEach(([category, value]) => {
      const values = Array.isArray(value) ? value : [value];

      values.forEach(val => {
        let displayValue = val;

        if (category === "population") {
          displayValue = typeof val === "object"
            ? `${val.min} h - ${val.max} h`
            : val;
        } else if (category === "area") {
          displayValue = typeof val === "object"
            ? `${val.min} km² - ${val.max} km²`
            : val;
        }

        const chip = elt(
          "span",
          {
            className: "filter-chip",
            "data-category": category,
            "data-value": JSON.stringify(val)
          },
          elt("span", { className: "chip-text" }, displayValue),
          elt("button", {
            className: "chip-close",
            onclick: () => this._removeCategoryFilter(category, val)
          }, "×")
        );

        container.appendChild(chip);
      });
    });

    // 🔹 Actualizar visibilidad del botón "Limpiar"
    this._updateClearButton?.();
  }


  _applyCategoryFilter({ category, value }) {
    const isMulti = this.multiCategories.includes(category);

    this._resetCategoryButtons(category);
    if (!isMulti || category === "population") {
      this.activeFilters[category] = value;
    } else {
      if (!Array.isArray(this.activeFilters[category])) this.activeFilters[category] = [];
      if (this.activeFilters[category].includes(value)) {
        this.activeFilters[category] = this.activeFilters[category].filter(v => v !== value);
      } else {
        this.activeFilters[category].push(value);
      }

      if (this.activeFilters[category].length === 0) delete this.activeFilters[category];
    }

    this.filterAction({ category, value });
    this.renderFilterChip(category, value, isMulti);

    // Mostrar/ocultar botón limpiar filtros
    this._updateClearButton();

    // 🔹 3️⃣ Actualizar estado visual (.active) sin alterar la lógica interna
    this._markActiveButtons();


    // 🔹 Actualizar estado global directamente
    this.dispatch({ type: ACTIONS.SET_FILTERS, payload: this.activeFilters });
  }

  _markActiveButtons() {
    Object.entries(this.activeFilters).forEach(([category, value]) => {
      const values = Array.isArray(value) ? value : [value];
      values.forEach(val => {
        const btn = this._findOption(category, val);
        if (btn) btn.classList.add("active");
      });
    });
  }

  _updateClearButton() {
    const chips = this.dom.querySelectorAll(".active-filters .filter-chip");
    this.clearButton.style.display = chips.length > 0 ? "inline-block" : "none";
  }

  clearAllFilters() {
    const chips = Array.from(this.dom.querySelectorAll(".active-filters .filter-chip"));
    chips.forEach(chip => {
      const button = chip.querySelector(".chip-close");
      if (button) button.click(); // dispara la lógica de cada chip
    });
  }

  _findOption(category, value) {
    if (typeof value === "object" && value !== null) {
      return Array.from(this.dom.querySelectorAll(`.filters-panel__option[data-filter-category="${category}"]`))
        .find(b => Number(b.dataset.min) === value.min && Number(b.dataset.max) === value.max);
    }
    return this.dom.querySelector(`.filters-panel__option[data-filter-category="${category}"][data-filter-value="${value}"]`);
  }

  _resetCategoryButtons(category) {
    this.dom.querySelectorAll(`.filters-panel__option[data-filter-category="${category}"]`)
      .forEach(btn => btn.classList.remove("active"));
  }

  renderFilterChip(category, value) {
    const container = this.dom.querySelector(".active-filters-container");
    container.style.display = Object.keys(this.activeFilters).length > 0 ? "flex" : "none";

    const chipsContainer = this.dom.querySelector(".active-filters");
    const isMulti = this.multiCategories.includes(category);

    const valueStr = typeof value === "object" ? JSON.stringify(value) : value;
    let displayValue = value;
    if (category === "population") {
      displayValue = typeof value === "object" ? `${value.min} h - ${value.max} h` : value;
    } else if (category === "area") {
      displayValue = typeof value === "object" ? `${value.min} km² - ${value.max} km²` : value;
    }

    if (!isMulti || category === "population") {
      const existingChips = chipsContainer.querySelectorAll(`.filter-chip[data-category="${category}"]`);
      existingChips.forEach(chip => chip.remove());
    } else {
      const existing = chipsContainer.querySelector(`.filter-chip[data-category="${category}"][data-value='${valueStr}']`);
      if (existing) return;
    }

    const newChip = elt("span", { className: "filter-chip" },
      elt("span", { className: "chip-text" }, displayValue),
      elt("button", {
        className: "chip-close",
        onclick: () => {
          newChip.remove();
          if (isMulti) {
            this.activeFilters[category] = this.activeFilters[category].filter(v => JSON.stringify(v) !== valueStr);
            if (this.activeFilters[category].length === 0) delete this.activeFilters[category];
          } else {
            delete this.activeFilters[category];
          }
          const button = this._findOption(category, value);
          if (button) button.classList.remove("active");
          this.filterAction({ category, value, remove: true });
          if (category === "population") this.sliderPopulation.reset();

          this._updateClearButton();

          // 🔹 Actualizar estado global directamente
          this.dispatch({ type: ACTIONS.SET_FILTERS, payload: this.activeFilters });
        }
      }, "×")
    );

    newChip.setAttribute("data-category", category);
    newChip.setAttribute("data-value", valueStr);

    chipsContainer.appendChild(newChip);

    this._updateClearButton();
  }

  show() {
    this.dom.classList.remove("filters-panel--hidden");
  }

  hide() {
    this.dom.classList.add("filters-panel--hidden");
  }

  _resetAllButtons() {
    this.dom
      .querySelectorAll(".filters-panel__option.active")
      .forEach(btn => btn.classList.remove("active"));
  }

  _removeCategoryFilter(category, value) {
    const isMulti = this.multiCategories.includes(category);

    // 1️⃣ Eliminar del estado
    if (isMulti && Array.isArray(this.activeFilters[category])) {
      this.activeFilters[category] = this.activeFilters[category].filter(v => {
        return typeof value === "object"
          ? JSON.stringify(v) !== JSON.stringify(value)
          : v !== value;
      });
      if (this.activeFilters[category].length === 0) delete this.activeFilters[category];
    } else {
      delete this.activeFilters[category];
    }

    // 2️⃣ Quitar la clase active del botón
    const button = this._findOption(category, value);
    if (button) button.classList.remove("active");

    // 3️⃣ Quitar chip del cajón
    const chipsContainer = this.dom.querySelector(".active-filters");
    const valueStr = typeof value === "object" ? JSON.stringify(value) : value;
    const chip = chipsContainer.querySelector(`.filter-chip[data-category="${category}"][data-value='${valueStr}']`);
    if (chip) chip.remove();

    // 4️⃣ Ejecutar la acción de remover filtro
    this.filterAction({ category, value, remove: true });

    // 5️⃣ Reset sliders si es necesario
    if (category === "population") this.sliderPopulation.reset();
    if (category === "area") this.sliderArea.reset();

    // 6️⃣ Actualizar visibilidad del botón Limpiar
    this._updateClearButton();

    // 🔹 Actualizar estado global directamente
    this.dispatch({ type: ACTIONS.SET_FILTERS, payload: this.activeFilters });
  }


}


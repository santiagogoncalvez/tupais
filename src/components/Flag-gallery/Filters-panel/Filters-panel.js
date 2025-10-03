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
    this.dom.querySelector(".active-filters").after(this.clearButton);

    this._init();
  }

  _init() {
    // Botones de filtros
    this.dom.querySelectorAll(".filters-panel__option").forEach(option => {
      option.addEventListener("click", () => {
        const category = option.dataset.filterCategory;
        let value = option.dataset.filterValue;
        try { value = JSON.parse(value); } catch { }
        this._applyCategoryFilter({ category, value });
      });
    });

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

  _applyCategoryFilter({ category, value }) {
    const isMulti = this.multiCategories.includes(category);

    if (!isMulti || category === "population") {
      this._resetCategoryButtons(category);
      const option = this._findOption(category, value);
      if (option) option.classList.add("active");
      this.activeFilters[category] = value;
    } else {
      if (!Array.isArray(this.activeFilters[category])) this.activeFilters[category] = [];
      if (this.activeFilters[category].includes(value)) {
        this.activeFilters[category] = this.activeFilters[category].filter(v => v !== value);
      } else {
        this.activeFilters[category].push(value);
      }
      this._resetCategoryButtons(category);
      this.activeFilters[category].forEach(v => {
        const btn = this._findOption(category, v);
        if (btn) btn.classList.add("active");
      });
      if (this.activeFilters[category].length === 0) delete this.activeFilters[category];
    }

    this.filterAction({ category, value });
    this.renderFilterChip(category, value, isMulti);

    // Mostrar/ocultar botón limpiar filtros
    this._updateClearButton();
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
        }
      }, "×")
    );

    newChip.setAttribute("data-category", category);
    newChip.setAttribute("data-value", valueStr);

    chipsContainer.appendChild(newChip);

    this._updateClearButton();
  }
}


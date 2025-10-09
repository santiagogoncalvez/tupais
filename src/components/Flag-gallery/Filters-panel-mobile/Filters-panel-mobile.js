import htmlString from "@components/Flag-gallery/Filters-panel-mobile/template.html?raw";
import "@components/Flag-gallery/Filters-panel-mobile/style.css";
import { base, modifiers } from "@components/Flag-gallery/Filters-panel-mobile/Filters-panel-mobile-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import CountrySearch from "@components/Flag-gallery/Filters-panel-mobile/Country-search/Country-search.js";
import Slider from "@components/Flag-gallery/Filters-panel-mobile/Slider/Slider.js";
import CloseButton from "@components/Button/Close-button/Close-button.js";


import elt from "@utils/elt.js";


export default class FiltersPanelMobile extends BaseComponent {
  constructor(state, dispatch, filterAction) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.filterAction = filterAction;
    this.dom = this._createDom();

    // 🔹 Estado persistente de filtros aplicados
    this.activeFilters = {};

    // 🔹 Estado temporal de filtros seleccionados (antes de aplicar)
    this.pendingFilters = {};

    this.multiCategories = ["languages"];

    // 🔹 Language search
    this.languageSearch = new CountrySearch(state, dispatch, (languages) => {
      if (languages.length === 1) {
        this._queueFilter({ category: "languages", value: languages[0] });
      }
    });
    this.dom
      .querySelector(".filters-panel-mobile__section--languajes")
      .appendChild(this.languageSearch.dom);

    // 🔹 Population slider
    this.sliderPopulation = new Slider(
      state,
      dispatch,
      undefined,
      undefined,
      (range) => {
        this._queueFilter({ category: "population", value: range });
      }
    );
    this.dom
      .querySelector(".filters-panel-mobile__section--population")
      .appendChild(this.sliderPopulation.dom);

    // 🔹 Área slider
    this.sliderArea = new Slider(
      state,
      dispatch,
      0,
      17098242,
      (range) => {
        this._queueFilter({ category: "area", value: range });
      },
      10,
      10000000,
      true
    );
    this.dom
      .querySelector(".filters-panel-mobile__section--area")
      .appendChild(this.sliderArea.dom);

    // 🔹 Botones del footer
    this.resetButton = this.dom.querySelector(".filters-panel-mobile__reset");
    this.applyButton = this.dom.querySelector(".filters-panel-mobile__apply");
    this.applyCount = this.dom.querySelector(".filters-panel-mobile__apply-count");

    this.resetButton.addEventListener("click", () =>
      this.clearAllActiveFilters()
    );
    this.applyButton.addEventListener("click", () => this.applyPendingFilters());

    // 🔹 Botón cerrar
    this.closeButton = new CloseButton(dispatch, this.hide.bind(this), {
      top: "10px",
      right: "10px",
    });
    this.dom.prepend(this.closeButton.dom);

    this._init();
  }

  _init() {
    // Botones de filtros
    this.dom
      .querySelectorAll(".filters-panel-mobile__option")
      .forEach((option) => {
        option.addEventListener("click", () => {
          const category = option.dataset.filterCategory;
          let value = option.dataset.filterValue;
          try {
            value = JSON.parse(value);
          } catch { }
          this._queueFilter({ category, value });
        });
      });

    // Toggle "Mostrar más/menos"
    this.dom.querySelectorAll(".filters-panel-mobile__toggle").forEach((btn) => {
      const optionsContainer = btn.previousElementSibling;
      btn.addEventListener("click", () => {
        const expanded = optionsContainer.classList.toggle(
          "filters-panel-mobile__options--expanded"
        );
        btn.querySelector(".filters-panel-mobile__toggle-text").textContent =
          expanded ? "Mostrar menos" : "Mostrar más";
        btn.querySelector(".filters-panel-mobile__toggle-icon").textContent =
          expanded ? "- " : "+ ";
      });
    });
  }

  // 🔹 Agrega un filtro temporal (pending)
  _queueFilter({ category, value }) {
    const isMulti = this.multiCategories.includes(category);

    if (!isMulti || category === "population") {
      this._resetCategoryButtons(category);
      const option = this._findOption(category, value);
      if (option) option.classList.add("active");
      this.pendingFilters[category] = value;
    } else {
      if (!Array.isArray(this.pendingFilters[category]))
        this.pendingFilters[category] = [];
      if (this.pendingFilters[category].includes(value)) {
        this.pendingFilters[category] = this.pendingFilters[category].filter(
          (v) => v !== value
        );
      } else {
        this.pendingFilters[category].push(value);
      }
      this._resetCategoryButtons(category);
      this.pendingFilters[category].forEach((v) => {
        const btn = this._findOption(category, v);
        if (btn) btn.classList.add("active");
      });
      if (this.pendingFilters[category].length === 0)
        delete this.pendingFilters[category];
    }

    this._renderFilterChips();
    this._updateApplyCount();
  }

  // 🔹 Muestra los chips del panel
  _renderFilterChips() {
    const container = this.dom.querySelector(".active-filters");

    container.style.display = Object.keys(this.pendingFilters).length > 0 ? "flex" : "none";

    container.innerHTML = "";

    Object.entries(this.pendingFilters).forEach(([category, value]) => {
      const values = Array.isArray(value) ? value : [value];
      values.forEach((val) => {
        let displayValue = val;
        if (category === "population") {
          displayValue =
            typeof val === "object" ? `${val.min} h - ${val.max} h` : val;
        } else if (category === "area") {
          displayValue =
            typeof val === "object"
              ? `${val.min} km² - ${val.max} km²`
              : val;
        }

        const chip = elt(
          "span",
          {
            className: "filter-chip",
            "data-category": category,
            "data-value": JSON.stringify(val),
          },
          elt("span", { className: "chip-text" }, displayValue),
          elt(
            "button",
            {
              className: "chip-close",
              onclick: () => this._removePendingFilter(category, val),
            },
            "×"
          )
        );
        container.appendChild(chip);
      });
    });
  }

  _removePendingFilter(category, value) {
    const isMulti = this.multiCategories.includes(category);
    const valueStr = JSON.stringify(value);

    if (isMulti && Array.isArray(this.pendingFilters[category])) {
      this.pendingFilters[category] = this.pendingFilters[category].filter(
        (v) => JSON.stringify(v) !== valueStr
      );
      if (this.pendingFilters[category].length === 0)
        delete this.pendingFilters[category];
    } else {
      delete this.pendingFilters[category];
    }

    const button = this._findOption(category, value);
    if (button) button.classList.remove("active");

    if (category === "population") this.sliderPopulation.reset();
    if (category === "area") this.sliderArea.reset();

    this._renderFilterChips();
    this._updateApplyCount();
  }

  // 🔹 Aplica todos los filtros acumulados
  // 🔹 Aplica todos los filtros acumulados (con diff entre active <-> pending)
  applyPendingFilters() {
    const active = this.activeFilters || {};
    const pending = this.pendingFilters || {};

    // categories union
    const cats = new Set([
      ...Object.keys(active),
      ...Object.keys(pending)
    ]);

    cats.forEach(category => {
      const isMulti = this.multiCategories.includes(category);

      const activeVal = active[category];
      const pendingVal = pending[category];

      if (isMulti) {
        const activeArr = Array.isArray(activeVal) ? activeVal : [];
        const pendingArr = Array.isArray(pendingVal) ? pendingVal : [];

        const activeStrs = activeArr.map(v => JSON.stringify(v));
        const pendingStrs = pendingArr.map(v => JSON.stringify(v));

        // Remover los que estaban pero ya no están
        activeArr.forEach((v, i) => {
          if (!pendingStrs.includes(activeStrs[i])) {
            this.filterAction({ category, value: v, remove: true });
          }
        });

        // Agregar los nuevos que no estaban
        pendingArr.forEach((v, i) => {
          if (!activeStrs.includes(pendingStrs[i])) {
            this.filterAction({ category, value: v });
          }
        });
      } else {
        const aStr = (typeof activeVal === "undefined") ? null : JSON.stringify(activeVal);
        const pStr = (typeof pendingVal === "undefined") ? null : JSON.stringify(pendingVal);

        // Caso: estaba y ya no está -> eliminar
        if (aStr !== null && pStr === null) {
          this.filterAction({ category, value: activeVal, remove: true });
        }
        // Caso: no estaba y ahora está -> agregar
        else if (aStr === null && pStr !== null) {
          this.filterAction({ category, value: pendingVal });
        }
        // Caso: cambió -> eliminar lo viejo y añadir lo nuevo
        else if (aStr !== null && pStr !== null && aStr !== pStr) {
          this.filterAction({ category, value: activeVal, remove: true });
          this.filterAction({ category, value: pendingVal });
        }
        // si aStr === pStr -> no hacer nada
      }
    });

    // Actualizar el estado interno del panel a la versión aplicada
    this.activeFilters = JSON.parse(JSON.stringify(pending));

    // Sincronizar UI
    this._syncActiveButtons();
    this._renderFilterChips();
    this._updateApplyCount();

    this.hide();
    
    this._updateFiltersCount();
  }



  // 🔹 Limpia todos los filtros activos y pendientes (footer “Limpiar filtros”)
  clearAllActiveFilters() {
    // 1️⃣ Remover cada filtro aplicado usando filterAction(remove: true)
    Object.keys(this.activeFilters || {}).forEach(category => {
      const current = this.activeFilters[category];
      if (Array.isArray(current)) {
        current.forEach(value => {
          this.filterAction({ category, value, remove: true });
        });
      } else {
        this.filterAction({ category, value: current, remove: true });
      }
    });

    // 2️⃣ Resetar estado del panel
    this.activeFilters = {};
    this.pendingFilters = {};
    this._resetAllButtons();
    this._renderFilterChips();
    this.sliderPopulation.reset();
    this.sliderArea.reset();
    this._updateApplyCount();

    this._updateFiltersCount();
  }


  // 🔹 Sincroniza visualmente los botones activos según activeFilters
  _syncActiveButtons() {
    this._resetAllButtons();
    Object.entries(this.activeFilters).forEach(([category, value]) => {
      const values = Array.isArray(value) ? value : [value];
      values.forEach((val) => {
        const btn = this._findOption(category, val);
        if (btn) btn.classList.add("active");
      });
    });
  }

  // 🔹 Helpers visuales
  _resetAllButtons() {
    this.dom
      .querySelectorAll(".filters-panel-mobile__option.active")
      .forEach((btn) => btn.classList.remove("active"));
  }

  _resetCategoryButtons(category) {
    this.dom
      .querySelectorAll(
        `.filters-panel-mobile__option[data-filter-category="${category}"]`
      )
      .forEach((btn) => btn.classList.remove("active"));
  }

  _findOption(category, value) {
    return this.dom.querySelector(
      `.filters-panel-mobile__option[data-filter-category="${category}"][data-filter-value="${value}"]`
    );
  }

  _updateApplyCount() {
    const total = Object.keys(this.pendingFilters).length;
    this.applyCount.textContent = total > 0 ? ` (${total})` : " (0)";
  }

  show() {
    // Al abrir, sincronizamos filtros activos con los pendientes
    this.pendingFilters = { ...this.activeFilters };
    this._syncActiveButtons();
    this._renderFilterChips();
    this._updateApplyCount();
    this.dom.classList.add("filters-panel-mobile--show");
  }

  hide() {
    this.dom.classList.remove("filters-panel-mobile--show");
  }

  // 🔹 Actualiza el contador visual del botón de filtros
  _updateFiltersCount() {
    const button = document.querySelector(".flag-gallery__filters-mobile-button");
    const countEl = button?.querySelector(".flag-gallery__filters-count");

    if (!button || !countEl) return;

    // Contar filtros activos (de activeFilters)
    let count = 0;
    const filters = this.activeFilters || {};

    Object.values(filters).forEach(val => {
      if (Array.isArray(val)) {
        count += val.length;
      } else if (val && typeof val === "object") {
        // Rango (población, área)
        if (val.min !== undefined && val.max !== undefined) count++;
      } else if (val) {
        count++;
      }
    });

    // Mostrar u ocultar el número
    if (count > 0) {
      button.classList.add("flag-gallery__filters-mobile-button--filtered");
      countEl.textContent = `(${count})`;
      countEl.classList.add("flag-gallery__filters-count--show");
    } else {
      button.classList.remove("flag-gallery__filters-mobile-button--filtered");
      countEl.textContent = "";
      countEl.classList.remove("flag-gallery__filters-count--show");
    }
  }

}

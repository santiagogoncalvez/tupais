import { ACTIONS } from "@constants/action-types.js";


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

    this.activeFilters = {}; // filtros aplicados
    this.pendingFilters = {}; // filtros temporales
    this.multiCategories = ["languages"];
    this._wasCleared = false;

    // Language search
    this.languageSearch = new CountrySearch(state, dispatch, (languages) => {
      if (languages.length === 1) this._queueFilter({ category: "languages", value: languages[0] });
    });
    this.dom.querySelector(".filters-panel-mobile__section--languajes").appendChild(this.languageSearch.dom);

    // Population slider
    this.sliderPopulation = new Slider(state, dispatch, undefined, undefined, (range) => {
      this._queueFilter({ category: "population", value: range });
    });
    this.dom.querySelector(".filters-panel-mobile__section--population").appendChild(this.sliderPopulation.dom);

    // Area slider
    this.sliderArea = new Slider(state, dispatch, 0, 17098242, (range) => {
      this._queueFilter({ category: "area", value: range });
    }, 10, 10000000, true);
    this.dom.querySelector(".filters-panel-mobile__section--area").appendChild(this.sliderArea.dom);

    // Botones footer
    this.resetButton = this.dom.querySelector(".filters-panel-mobile__reset");
    this.applyButton = this.dom.querySelector(".filters-panel-mobile__apply");
    this.applyCount = this.dom.querySelector(".filters-panel-mobile__apply-count");

    this.resetButton.addEventListener("click", () => this._resetPendingFilters());
    this.applyButton.addEventListener("click", () => this._applyPendingFilters());

    // Botón cerrar
    this.closeButton = new CloseButton(dispatch, this._cancel.bind(this), { top: "10px", right: "10px" });
    this.dom.prepend(this.closeButton.dom);

    this._init();
  }

  _init() {
    // Botones de filtros
    this.dom.querySelectorAll(".filters-panel-mobile__option").forEach((option) => {
      option.addEventListener("click", () => {
        const category = option.dataset.filterCategory;
        let value = option.dataset.filterValue;
        try { value = JSON.parse(value); } catch { }

        const isActive = option.classList.contains("active");

        if (isActive) {
          // Si ya está activo, eliminarlo como si fuera un chip
          this._removePendingFilter(category, value);
        } else {
          // Si no está activo, agregarlo
          this._queueFilter({ category, value });
        }
      });
    });

    // Toggle "mostrar más/menos"
    this.dom.querySelectorAll(".filters-panel-mobile__toggle").forEach((btn) => {
      const optionsContainer = btn.previousElementSibling;
      btn.addEventListener("click", () => {
        const expanded = optionsContainer.classList.toggle("filters-panel-mobile__options--expanded");
        btn.querySelector(".filters-panel-mobile__toggle-text").textContent = expanded ? "Mostrar menos" : "Mostrar más";
        btn.querySelector(".filters-panel-mobile__toggle-icon").textContent = expanded ? "- " : "+ ";
      });
    });


    // 🔹 Ocultar el panel automáticamente en pantallas grandes (>815px)
    const handleResize = () => {
      if (window.innerWidth > 815) this._cancel();
    };

    // Ejecutar al iniciar
    handleResize();

    // Escuchar redimensionamientos
    window.addEventListener("resize", handleResize);
  }

  _queueFilter({ category, value }) {
    const isMulti = this.multiCategories.includes(category);

    if (!isMulti || category === "population") {
      this._resetCategoryButtons(category);
      const option = this._findOption(category, value);
      if (option) option.classList.add("active");
      this.pendingFilters[category] = value;
    } else {
      if (!Array.isArray(this.pendingFilters[category])) this.pendingFilters[category] = [];
      if (this.pendingFilters[category].includes(value)) {
        this.pendingFilters[category] = this.pendingFilters[category].filter((v) => v !== value);
      } else {
        this.pendingFilters[category].push(value);
      }
      this._resetCategoryButtons(category);
      this.pendingFilters[category].forEach((v) => {
        const btn = this._findOption(category, v);
        if (btn) btn.classList.add("active");
      });
      if (this.pendingFilters[category].length === 0) delete this.pendingFilters[category];
    }

    this._renderFilterChips();
    this._updateApplyCount();
  }

  _renderFilterChips() {

    const containerFilters = this.dom.querySelector(".active-filters-container");
    containerFilters.style.display = Object.keys(this.pendingFilters).length > 0 ? "flex" : "none";

    const container = this.dom.querySelector(".active-filters");
    container.innerHTML = "";


    Object.entries(this.pendingFilters).forEach(([category, value]) => {
      const values = Array.isArray(value) ? value : [value];
      values.forEach((val) => {
        let displayValue = val;
        if (category === "population") displayValue = typeof val === "object" ? `${val.min} h - ${val.max} h` : val;
        if (category === "area") displayValue = typeof val === "object" ? `${val.min} km² - ${val.max} km²` : val;

        const chip = elt("span", { className: "filter-chip", "data-category": category, "data-value": JSON.stringify(val) },
          elt("span", { className: "chip-text" }, displayValue),
          elt("button", { className: "chip-close", onclick: () => this._removePendingFilter(category, val) }, "×")
        );
        container.appendChild(chip);
      });
    });
  }

  _removePendingFilter(category, value) {
    const isMulti = this.multiCategories.includes(category);
    const valueStr = JSON.stringify(value);

    if (isMulti && Array.isArray(this.pendingFilters[category])) {
      this.pendingFilters[category] = this.pendingFilters[category].filter((v) => JSON.stringify(v) !== valueStr);
      if (this.pendingFilters[category].length === 0) delete this.pendingFilters[category];
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

  // 🔹 Aplica filtros seleccionados en pendingFilters
  _applyPendingFilters() {
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
      }
    });

    // Actualizar estado interno
    this.activeFilters = JSON.parse(JSON.stringify(pending));
    this._wasCleared = false; // reseteamos el flag

    // Sincronizar UI
    this._syncActiveButtons();
    this._renderFilterChips();
    this._updateApplyCount();
    this.hide();
    this._updateFiltersCount();

    this.dispatch({
      type: ACTIONS.SET_FILTERS,
      payload: this.activeFilters,
    });
  }

  // 🔹 Resetea filtros temporales (solo UI)
  _resetPendingFilters() {
    // Solo limpiar visualmente los chips y desactivar botones
    this._resetAllButtons();
    this.pendingFilters = {};
    this._renderFilterChips();
    this.sliderPopulation.reset();
    this.sliderArea.reset();
    this._updateApplyCount();
  }

  // 🔹 Cancelar cambios y cerrar panel
  _cancel() {
    this.pendingFilters = { ...this.activeFilters };
    this._resetAllButtons();
    this._syncActiveButtons();
    this._renderFilterChips();
    this._updateApplyCount();
    this.hide();
  }

  _syncActiveButtons() {
    Object.entries(this.activeFilters).forEach(([category, value]) => {
      const values = Array.isArray(value) ? value : [value];
      values.forEach((val) => {
        const btn = this._findOption(category, val);
        if (btn) btn.classList.add("active");
      });
    });
  }

  _resetAllButtons() {
    this.dom.querySelectorAll(".filters-panel-mobile__option.active").forEach((btn) => btn.classList.remove("active"));
  }

  _resetCategoryButtons(category) {
    this.dom.querySelectorAll(`.filters-panel-mobile__option[data-filter-category="${category}"]`).forEach((btn) => btn.classList.remove("active"));
  }

  _findOption(category, value) {
    return this.dom.querySelector(`.filters-panel-mobile__option[data-filter-category="${category}"][data-filter-value="${value}"]`);
  }

  _updateApplyCount() {
    const total = Object.keys(this.pendingFilters).length;

    if (!this.applyButton) {
      this.applyButton = this.dom.querySelector(".filters-panel__apply");
    }

    if (total > 0) {
      // Mostrar cantidad y habilitar
      this.applyButton.textContent = `Aplicar (${total})`;
    } else {
      // Mostrar solo "Aplicar" y deshabilitar
      this.applyButton.textContent = "Aplicar";
    }
  }


  show() {
    // Siempre reflejar los filtros aplicados como pendientes al abrir
    this.pendingFilters = { ...this.activeFilters };
    this._syncActiveButtons();
    this._renderFilterChips();
    this._updateApplyCount();
    this.dom.classList.add("filters-panel-mobile--show");

    this.dom.querySelector(".filters-panel-mobile__container").scrollTo({ top: 0 });
  }

  hide() {
    this.dom.classList.remove("filters-panel-mobile--show");

  }

  // 🔹 Actualiza contador del botón filtros principal
  _updateFiltersCount() {
    const button = document.querySelector(".flag-gallery__filters-mobile-button");
    const countEl = button?.querySelector(".flag-gallery__filters-count");
    if (!button || !countEl) return;

    let count = 0;
    const filters = this.activeFilters || {};
    Object.values(filters).forEach(val => {
      if (Array.isArray(val)) count += val.length;
      else if (val && typeof val === "object" && val.min !== undefined && val.max !== undefined) count++;
      else if (val) count++;
    });

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

  syncState(state) {
    if (!state || !state.filters) return;

    const { filters } = state;

    // 🧹 1️⃣ Limpiar UI actual (chips + botones activos)
    this._resetAllButtons();

    // 🧩 2️⃣ Actualizar filtros internos
    this.activeFilters = JSON.parse(JSON.stringify(filters || {}));
    this.pendingFilters = JSON.parse(JSON.stringify(filters.pending || this.activeFilters));

    // 🟢 3️⃣ Sincronizar botones activos según los filtros actuales
    this._syncActiveButtons();

    // 💠 4️⃣ Renderizar chips visibles
    this._renderFilterChips();

    // 🔢 5️⃣ Actualizar contadores
    this._updateApplyCount?.();
    this._updateFiltersCount?.();
  }

}

import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Flag-gallery/Flag-list/Sort-dropdown/template.html?raw";

// Styles
import "@components/Flag-gallery/Flag-list/Sort-dropdown/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-list/Sort-dropdown/Sort-dropdown-class-names.js";
import BaseComponent from "@shared/Base-component.js";
import Button from "@components/Flag-gallery/Flag-list/Sort-dropdown/Button/Button.js";
import Options from "@components/Flag-gallery/Flag-list/Sort-dropdown/Options/Options.js";

export default class SortDropdown extends BaseComponent {
  constructor(state, dispatch, sortAction) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.sortAction = sortAction;
    this.dom = this._createDom();

    this.continent = state.game?.continent;
    this.options = new Options(state, dispatch);
    this.button = new Button(state, dispatch, this.options, sortAction);
    this.options.setOptionAction(this.button.setOption.bind(this.button));
    this.options.setAnimateButtonAction(this.button.animateButton.bind(this.button));

    this._init(dispatch);
  }

  syncState(state) {
    const prevRoute = this.state?.router?.currentRoute || "";
    const newRoute = state?.router?.currentRoute || "";

    // 🔹 Si la ruta no cambió, no hacer nada
    if (newRoute === prevRoute) return;

    // --- Helpers ---
    const isGalleryRoot = route => route === "/flag-gallery";
    const isGalleryCountry = route => route.startsWith("/flag-gallery/");

    // 🔹 Determinar si seguimos dentro del mismo contexto de la galería
    const stayingWithinGallery =
      (isGalleryRoot(prevRoute) && isGalleryCountry(newRoute)) ||
      (isGalleryCountry(prevRoute) && isGalleryRoot(newRoute)) ||
      (isGalleryCountry(prevRoute) && isGalleryCountry(newRoute));

    // --- Reset de orden ---
    if (!stayingWithinGallery) {
      // Solo resetear si efectivamente cambiamos de contexto
      this.reset();
    }

    // --- Sincronizar subcomponentes ---
    if (this.button?.syncState) this.button.syncState(state);
    if (this.options?.syncState) this.options.syncState(state);

    // 🔹 Actualizar referencia local
    this.state = state;
  }


  _init() {
    let select = this.dom.querySelector("." + this.base.select);
    select.appendChild(this.button.dom);
    select.appendChild(this.options.dom);
  }
  mountTo(container) {
    if (this.dom.parentElement !== container) {
      container.appendChild(this.dom);
    }
  }

  reset(sortingOption = "name-asc") {
    // console.log("🔁 Reiniciando orden a:", sortingOption);
    if (this.button?.reset) this.button.reset(sortingOption);
    if (this.options?.reset) this.options.reset(sortingOption);
  }
}

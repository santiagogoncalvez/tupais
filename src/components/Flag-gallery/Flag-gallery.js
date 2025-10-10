import { ACTIONS } from "@constants/action-types.js";


import htmlString from "@components/Flag-gallery/template.html?raw";

// Styles
import "@components/Flag-gallery/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-gallery-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import elt from "@utils/elt.js";

import CountrySearch from "@components/Flag-gallery/Country-search/Country-search.js";
import SortDropdown from "@components/Flag-gallery/Flag-list/Sort-dropdown/Sort-dropdown.js";
import FlagList from "@components/Flag-gallery/Flag-list/Flag-list.js";
import FiltersPanel from "@components/Flag-gallery/Filters-panel/Filters-panel.js";
import FiltersPanelMobile from "@components/Flag-gallery/Filters-panel-mobile/Filters-panel-mobile.js";




export default class FlagGallery extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;
    this.dom = this._createDom();


    this.flagList = new FlagList(state, dispatch);
    this.countrySearch = new CountrySearch(state, dispatch, this.flagList.setSearchResults.bind(this.flagList));
    this.sortDropdown = new SortDropdown(state, dispatch, this.flagList.sort.bind(this.flagList));

    this.filtersPanel = new FiltersPanel(state, dispatch, this.flagList.applyFilter.bind(this.flagList));
    this.filtersPanelMobile = new FiltersPanelMobile(state, dispatch, this.flagList.applyFilter.bind(this.flagList));




    this._init();
  }

  _init() {
    const container = this.dom.querySelector(`.flag-gallery__container`);
    const toolBar = this.dom.querySelector(`.flag-gallery__toolbar`);

    this.dom.querySelector(".flag-gallery__store").prepend(
      elt("div", { className: "flag-gallery__search-container" }, this.countrySearch.dom)
    );

    toolBar.prepend(this.sortDropdown.dom);

    container.appendChild(this.flagList.dom);

    this.dom.querySelector(".flag-gallery__store-container").prepend(this.filtersPanel.dom);
    this.dom.querySelector(".flag-gallery__store-container").prepend(this.filtersPanelMobile.dom);


    this.addListenerFilterButton();
  }

  addListenerFilterButton() {
    const filterButton = this.dom.querySelector(".flag-gallery__filters-mobile-button");
    if (!filterButton) return;

    filterButton.addEventListener("click", () => {
      this.filtersPanelMobile.show();
    });
  }

  syncState(state) {
    this.countrySearch.syncState(state);
    this.sortDropdown.syncState(state);

    this.filtersPanel.syncState(state);
    this.filtersPanelMobile.syncState(state);
    this.flagList.syncState(state);
  }

  reset() {
    this.countrySearch.reset();
    this.flagList.reset();

    // Esto provoca un re-render de los filtros, pero es necesario para que se deseleccionen
    this.dispatch({ type: ACTIONS.SET_FILTERS, payload: {} });
  }
}

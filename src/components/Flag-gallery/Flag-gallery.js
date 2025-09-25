import htmlString from "@components/Flag-gallery/template.html?raw";

// Styles
import "@components/Flag-gallery/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-gallery-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import CountrySearch from "@components/Flag-gallery/Country-search/Country-search.js";
import SortDropdown from "@components/Flag-gallery/Flag-list/Sort-dropdown/Sort-dropdown.js";
import FlagList from "@components/Flag-gallery/Flag-list/Flag-list.js";
import ScrollTop from "@components/Flag-gallery/Scroll-top/Scroll-top.js";


export default class FlagGallery extends BaseComponent {
  constructor(state, dispatch, containerScroll) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();

    this.state = state;

    this.flagList = new FlagList(state, dispatch);
    this.countrySearch = new CountrySearch(state, dispatch, this.flagList.filterItems.bind(this.flagList));
    this.sortDropdown = new SortDropdown(state, dispatch, this.flagList.sort.bind(this.flagList));
    this.scrollTop = new ScrollTop(containerScroll);


    this._init();
  }

  _init() {
    const container = this.dom.querySelector(`.flag-gallery__container`);
    container.appendChild(this.countrySearch.dom);
    container.appendChild(this.sortDropdown.dom);
    container.appendChild(this.flagList.dom);
    container.appendChild(this.scrollTop.dom);
  }


  syncState(state) {
    this.countrySearch.syncState(state);
  }
}

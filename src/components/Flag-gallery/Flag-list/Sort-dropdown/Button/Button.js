import htmlString from "@components/Flag-gallery/Flag-list/Sort-dropdown/Button/template.html?raw";

// Styles
import "@components/Flag-gallery/Flag-list/Sort-dropdown/Button/style.css";

import {
  base,
  modifiers,
} from "@components/Flag-gallery/Flag-list/Sort-dropdown/Button/Button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

import { sortOptions } from "@constants/sort-options.js";


export default class Button extends BaseComponent {
  constructor(state, dispatch, options, orderAction) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();

    this.selectedOption = sortOptions["name-asc"];
    this.selectedOptions = options;
    this.orderAction = orderAction;

    this._init(dispatch);
  }

  setOption(sortingOption) {
    this.dom.querySelector("." + this.base.value).textContent =
      `${sortOptions[sortingOption]}`;
    this.orderAction(sortingOption);

    if (document.activeElement != this.dom) {
      this.dom.focus();
    }
  }

  _init() {
    this.dom.querySelector("." + this.base.value).textContent =
      `${this.selectedOption}`;

    this.dom.addEventListener("click", (event) => {
      event.stopImmediatePropagation();

      if (this.selectedOptions.visibilityState !== "visible") {
        this.show(true);
      } else {
        this.show(false);
      }
    });

    this.dom.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        event.preventDefault();
        this.show(true);
      }
    });
  }

  show(isShow) {
    this.animateButton(isShow);
    this.selectedOptions._show(isShow);
  }

  animateButton(isShow) {
    const icon = this.dom.querySelector(".dropdown-button__selector-icon");
    if (isShow) {
      icon.classList.add("dropdown-button__selector-icon--active");
    } else {
      icon.classList.remove("dropdown-button__selector-icon--active");

    }
  }

  setOptionAction(action) {
    this.selectedOptionAction = action;
  }

  reset(sortingOption = "name-asc") {
    this.selectedOption = sortingOption;
    this.dom.querySelector("." + this.base.value).textContent =
      `${sortOptions[this.selectedOption]}`;
  }
}

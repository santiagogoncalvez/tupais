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
  constructor(state, dispatch, orderAction) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.continent = state.game?.continent;
    this.options = new Options(state, dispatch);
    this.button = new Button(state, dispatch, this.options, orderAction);
    this.options.setOptionAction(this.button.setOption.bind(this.button));
    this.options.setAnimateButtonAction(this.button.animateButton.bind(this.button));

    this.dom = this._createDom();
    this._init(dispatch);
    this.dispatch = dispatch;
  }
  syncState(state) {
    if (this.state?.ui.darkMode != state?.ui.darkMode) {
      this._setDarkMode(state?.ui.darkMode);
    }
    this.button.syncState(state);
    this.options.syncState(state);
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
}

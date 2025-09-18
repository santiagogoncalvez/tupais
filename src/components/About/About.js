import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/About/template.html?raw";

// Styles
import "@components/About/style.css";

import { base, modifiers } from "@components/About/About-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class About extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;

    this.dom = this._createDom();

    this._init();
  }

  syncState(state) { }

  _init() {
    const links = this.dom.querySelectorAll(".about__text-link--to-page");

    for (let link of links) {
      link.addEventListener("click", (event) => {
        const route = link.getAttribute("href");
        this.dispatch({ type: ACTIONS.NAVIGATE_TO, payload: route });
      })
    }
  }
}

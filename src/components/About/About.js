import htmlString from "@components/About/template.html?raw";

// Styles
import "@components/About/style.css";

import { base, modifiers } from "@components/About/About-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class About extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
  }

  syncState(state) {}
}

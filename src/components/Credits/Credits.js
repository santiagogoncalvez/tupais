import htmlString from "@components/Credits/template.html?raw";

// Styles
import "@components/Credits/style.css";

import { base, modifiers } from "@components/Credits/Credits-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Credits extends BaseComponent {
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

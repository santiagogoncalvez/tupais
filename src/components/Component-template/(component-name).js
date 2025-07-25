import htmlString from "@components/{PATH}/template.html?raw";

// Styles
import "@components/{PATH}/style.css";

import {
  base,
  modifiers,
} from "@components/";
import BaseComponent from "@shared/Base-component.js";

export default class componentName extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();
    this.syncState(state);
  }

  syncState(state) {
  }
}

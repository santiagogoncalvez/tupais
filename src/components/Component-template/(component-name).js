import htmlString from "PATH/template.html?raw";

// Styles
import "PATH/style.css";

import {
  base,
  modifiers,
} from "PATH";
import BaseComponent from "@shared/Base-component.js";

export default class COMPONENT_NAME extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = this._createDom();
  }

  syncState(state) {
  }
}

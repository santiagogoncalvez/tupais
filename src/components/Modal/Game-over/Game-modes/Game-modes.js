import htmlString from "@Modal/Game-over/Game-modes/template.html?raw";

// Styles
import "@Modal/Game-over/Game-modes/style.css";

import {
  base,
  modifiers,
} from "@Modal/Game-over/Game-modes/Game-modes-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class GameModes extends BaseComponent {
  constructor(state) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dom = this._createDom();
    this.syncState(state);
  }

  syncState(state) {}
}

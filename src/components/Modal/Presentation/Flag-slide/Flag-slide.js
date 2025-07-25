import htmlString from "@Modal/Presentation/Flag-slide/template.html?raw";

// Styles
import "@Modal/Presentation/Flag-slide/style.css";

import { base } from "@Modal/Presentation/Flag-slide/Flag-slide-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class FlagSlide extends BaseComponent {
  constructor() {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.dom = this._createDom();
  }
}

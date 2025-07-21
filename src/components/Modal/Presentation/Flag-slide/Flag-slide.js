import htmlString from "@Modal/Presentation/Flag-slide/template.html?raw";

// Styles
import "@Modal/Presentation/Flag-slide/style.css";

import { flagSlideBase } from "@Modal/Presentation/Flag-slide/Flag-slide-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class FlagSlide extends BaseComponent {
  constructor() {
    super();
    this.htmlString = htmlString;
    this.base = flagSlideBase;
    this.dom = this._createDom();
  }
}

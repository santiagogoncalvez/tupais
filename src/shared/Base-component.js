import { applyClasses, deleteClasses } from "@utils/dom-class-handler.js";

export default class BaseComponent {
  _createDom = () => {
    const template = document.createElement("template");
    template.innerHTML = this.htmlString;
    const clone = template.content.cloneNode(true);
    const component = clone.querySelector("." + this.base.block);
    return component;
  };

  _setDarkMode(isDarkMode) {
    if (isDarkMode) {
      applyClasses(this.dom, this.base, this.modifiers, "darkMode");
    }

    if (!isDarkMode) {
      deleteClasses(this.dom, this.base, this.modifiers, "darkMode");
    }
  }

  // Personalización de estilos
  _applyPosition(top, right) {
    if (top) this.dom.style.top = top;
    if (right) this.dom.style.right = right;
    this.dom.style.position = "absolute";
  }

  _applyFilter(filter) {
    if (filter) {
      this.dom.style.filter = filter;
    }
  }

  _applySize(width, height) {
    if (width) this.dom.style.width = width;
    if (height) this.dom.style.height = height;
  }

  _applyTransform(transform) {
    if (transform) {
      this.dom.style.transform = transform;
    }
  }

  _centerAbsolute() {
    this._applyPosition("50%", null);     // top: 50%
    this.dom.style.left = "50%";          // left: 50%
    this._applyTransform("translate(-50%, -50%)");
  }
}

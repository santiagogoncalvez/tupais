import htmlString from "@components/Scroll-top/template.html?raw";

// Styles
import "@components/Scroll-top/style.css";

import { base, modifiers } from "@components/Scroll-top/Scroll-top-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class ScrollTop extends BaseComponent {
  constructor(elementScroll, scrollThreshold = 200) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.elementScroll = elementScroll;
    this.scrollThreshold = scrollThreshold;

    this.dom = this._createDom();
    this._init();
  }

  _init() {
    if (!this.dom || !this.elementScroll) return;

    this.dom.addEventListener("mouseenter", () => {
      this.dom.classList.add("scroll-top--hover");
    });
    this.dom.addEventListener("mouseleave", () => {
      this.dom.classList.remove("scroll-top--hover");
    });

    // Click para subir
    this.dom.addEventListener("click", () => {
      this.elementScroll.scrollTo({ top: 0, behavior: "smooth" });
      // Reset hover/active al hacer click
      this.dom.classList.remove("active");
      // this.dom.classList.remove("scroll-top--hover");
    });

    // Hover/touch effects
    this.dom.addEventListener("mousedown", () => this.dom.classList.add("active"));
    this.dom.addEventListener("mouseup", () => this.dom.classList.remove("active"));
    this.dom.addEventListener("mouseleave", () => this.dom.classList.remove("active"));

    let ticking = false;

    const onScroll = () => {
      // console.log("scroll", this.elementScroll.scrollTop);
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = this.elementScroll.scrollTop > this.scrollThreshold;

          if (shouldShow) {
            this.dom.classList.add("visible");
          } else {
            this.dom.classList.remove("visible", "active");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    this.elementScroll.addEventListener("scroll", onScroll);

    // Inicializar estado
    onScroll();
  }

  syncState(state) {
    // No hace nada, se maneja por scroll
  }
}

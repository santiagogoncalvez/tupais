import htmlString from "@Modal/Presentation/template.html?raw";

// Styles
import "@Modal/Presentation/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import FlagSlide from "@Modal/Presentation/Flag-slide/Flag-slide.js";

import {
  base,
  modifiers,
} from "@Modal/Presentation/Presentation-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Presentation extends BaseComponent {
  constructor(state, dispatch, continentSelector) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.closeButton = new CloseButton(dispatch, {
      ui: {
        presentation: { show: false },
      },
    });
    this.flagSlide = new FlagSlide();
    this.continentSelector = continentSelector;
    this.dom = this._createDom();
    this._init(dispatch);
  }

  _init() {
    this.dom
      .querySelector("." + this.base.title)
      .insertAdjacentElement("afterend", this.flagSlide.dom);
    this.dom.appendChild(this.closeButton.dom);
    this.dom.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  _activeEvents(isActive) {
    if (!this._escEvent) {
      this._escEvent = (event) => {
        if (event.key == "Escape") {
          event.preventDefault();
          event.stopImmediatePropagation();
          this.dispatch({ ui: { presentation: { show: false } } });
          this.dom.blur();
        }
      };
    }
    if (isActive) {
      window.addEventListener("keydown", this._escEvent);
    } else {
      window.removeEventListener("keydown", this._escEvent);
    }
  }

  syncState(state) {
    if (this.state.ui.presentation.show != state.ui.presentation.show) {
      this._show(state.ui.presentation.show);
      this._activeEvents(state.ui.presentation.show);
      this.isShow = state.ui.presentation.show;
    }
    if (this.state.ui.darkMode != state.ui.darkMode) {
      this._setDarkMode(state.ui.darkMode);
      this.continentSelector._setDarkMode(state.ui.darkMode);
    }
    this.closeButton.syncState(state);
    this.continentSelector.syncState(state);
    this.state = state;
  }

  _show(isShow) {
    if (isShow) {
      if (document.readyState === "interactive") {
        this.dom.classList.add(this.modifiers.display.block);
        // Esperamos un frame para que el navegador pinte el display: flex antes de animar la opacidad
        this.dom.showModal();
        requestAnimationFrame(() => {
          // this.dom.classList.add(this.modifiers.show.block);
          this.dom.classList.add(this.modifiers.fade.in);
        });

        // Insertar elementos cuando se muestra el modal
        const container = this.dom.querySelector("." + this.base.container);
        this.continentSelector.mountTo(container);
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          this._show(true);
        });
      }
    }

    if (!isShow) {
      ///Solo se debe ejecutar si está mostrado
      this.dom.classList.remove(this.modifiers.show.block);
      this.dom.classList.remove(this.modifiers.fade.in);
      this.dom.classList.add(this.modifiers.fade.out);

      this.dom.addEventListener(
        "animationend",
        () => {
          // TODO: esto tarda un poco de más en ejecutarse, resolverlo después convitiendo Settings a un div o buscando otra forma de hacer que se puede abrir Settings de forma más rápida una vez cerrado.
          this.dom.classList.remove(this.modifiers.display.block);
          this.dom.classList.remove(this.modifiers.fade.out);

          this.dom.close();
        },
        { once: true }
      );
    }
  }
}

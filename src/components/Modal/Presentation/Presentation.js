import htmlString from "@Modal/Presentation/template.html?raw";

// Styles
import "@Modal/Presentation/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import FlagSlide from "@Modal/Presentation/Flag-slide/Flag-slide.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

import {
  presentationBase,
  presentationModifiers,
} from "@Modal/Presentation/Presentation-class-names.js";
import { CONTINENTS_NAMES } from "@constants/continents-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class presentation extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = presentationBase;
    this.modifiers = presentationModifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.continent = CONTINENTS_NAMES.ALL;
    this.closeButton = new CloseButton(dispatch, {
      ui: {
        presentation: { show: false },
      },
    });
    this.flagSlide = new FlagSlide();
    this.continentSelector = new ContinentSelector(state, dispatch);
    this.dom = this._createDom();
    this._init(dispatch);
  }

  _init() {
    this.dom
      .querySelector("." + presentationBase.title)
      .insertAdjacentElement("afterend", this.flagSlide.dom);
    this.dom.appendChild(this.closeButton.dom);
    this.dom
      .querySelector("." + this.base.container)
      .appendChild(this.continentSelector.dom);
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
        this.dom.showModal();
        this.dom.classList.add(presentationModifiers.display.block);

        requestAnimationFrame(() => {
          this.dom.classList.add(presentationModifiers.show.block);
        });
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          this._show(true);
        });
      }
    }

    if (!isShow) {
      //Solo se debe ejecutar si está mostrado
      this.dom.classList.remove(presentationModifiers.show.block);
      this.dom.addEventListener(
        "transitionend",
        () => {
          this.dom.classList.remove(presentationModifiers.display.block);
          this.dom.close();
        },
        { once: true }
      );
    }
  }

  _setContinentValue(value) {
    this.continent = value;
  }

  _getContinentValue() {
    return this.continent;
  }
}

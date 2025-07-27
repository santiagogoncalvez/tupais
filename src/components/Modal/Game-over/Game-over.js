import htmlString from "@Modal/Game-over/template.html?raw";

// Styles
import "@Modal/Game-over/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

// Otros
import { base, modifiers } from "@Modal/Game-over/Game-over-class-names.js";
import { CONTINENTS_NAMES } from "@constants/continents-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class GameOver extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.continent = CONTINENTS_NAMES.ALL;
    this.closeButton = new CloseButton(dispatch, {
      ui: {
        gameOver: { show: false },
      },
    });
    this.continentSelector = new ContinentSelector(state, dispatch);
    this.dom = this._createDom();
    this._init(dispatch);
  }

  _init() {
    this.dom.querySelector("." + this.base.container);
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
          this.dispatch({ ui: { gameOver: { show: false } } });
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
    if (this.state.ui.gameOver.show != state.ui.gameOver.show) {
      this._show(state.ui.gameOver.show);
      this._activeEvents(state.ui.gameOver.show);
      this.isShow = state.ui.gameOver.show;
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
      this.dom.showModal();
      this.dom.classList.add(this.modifiers.display.block);
      // Esperamos un frame para que el navegador pinte el display: flex antes de animar la opacidad
      requestAnimationFrame(() => {
        this.dom.classList.add(this.modifiers.show.block);
      });
    }

    if (!isShow) {
      //Solo se debe ejecutar si está mostrado
      this.dom.classList.remove(this.modifiers.show.block);
      this.dom.addEventListener(
        "transitionend",
        () => {
          this.dom.classList.remove(this.modifiers.display.block);
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

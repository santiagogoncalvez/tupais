import htmlString from "@Modal/Game-over/template.html?raw";

// Styles
import "@Modal/Game-over/style.css";

// Components
import CloseButton from "@components/Button/Close-button/Close-button.js";
import Results from "@Modal/Game-over/Results/Results.js";
import GameModes from "@Modal/Game-over/Game-modes/Game-modes.js";

// Otros
import { base, modifiers } from "@Modal/Game-over/Game-over-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class GameOver extends BaseComponent {
  constructor(state, dispatch, continentSelector) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.dispatch = dispatch;
    this.state = state;
    this.isShow = false;
    this.closeButton = new CloseButton(dispatch, {
      ui: {
        gameOver: { show: false },
      },
      game: {
        isNewGame: true,
      },
    });

    // Componente de resultados del juego: Results
    this.results = new Results(state);

    this.gameModes = new GameModes(state);
    this.continentSelector = continentSelector;
    this.dom = this._createDom();
    this._init(dispatch);
  }

  _init() {
    let container = this.dom.querySelector("." + this.base.container);
    this.dom.appendChild(this.closeButton.dom);
    this.dom
      .querySelector("." + this.base.subtitle)
      .insertAdjacentElement("afterend", this.gameModes.dom);
    this.dom
      .querySelector("." + this.base.subtitle)
      .insertAdjacentElement("afterend", this.results.dom);
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
          this.dispatch({
            ui: { gameOver: { show: false } },
            game: {
              isNewGame: true,
            },
          });
          // this.dom.blur();
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
    if (this.isShow != state.ui.gameOver.show) {
      this._show(state.ui.gameOver.show);
      this._activeEvents(state.ui.gameOver.show);
      this.isShow = state.ui.gameOver.show;
    }
    if (this.state.ui.darkMode != state.ui.darkMode) {
      this._setDarkMode(state.ui.darkMode);
      this.continentSelector._setDarkMode(state.ui.darkMode);
    }
    this.closeButton.syncState(state);
    this.results.syncState(state);
    this.continentSelector.syncState(state);
    this.state = state;
  }

  _show(isShow) {
    if (isShow) {
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
    }

    if (!isShow) {
      //Solo se debe ejecutar si está mostrado
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

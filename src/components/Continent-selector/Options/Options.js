import { ACTIONS } from "@constants/action-types.js";
import htmlString from "@components/Continent-selector/Options/template.html?raw";

// Styles
import "@components/Continent-selector/Options/style.css";

import { base, modifiers } from "@components/Continent-selector/Options/Options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch, { autoStart = false, scope = "modal" } = {}) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.scope = scope; // 👈 nuevo
    this.dispatch = dispatch;

    const scopedState = state?.ui?.continentSelector?.[this.scope] || {};
    this.continent = scopedState.selectedOption || "all";

    this.dom = this._createDom();
    this.autoStart = autoStart;

    this.visibilityState = "hidden";
    this._showTimeout = null;
    this.alreadyClosed = false;

    this._init();
    this._showInit();
  }

  _init(styleOptions = {}) {
    this._applySize(styleOptions.width, styleOptions.height);
    this._applyPosition(styleOptions.top, styleOptions.right);

    const optionsEls = this.dom.querySelectorAll("." + this.base.option);
    let hasMouseMove = true;

    this._assignSelected(true);

    for (let option of optionsEls) {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        this.continent = option.dataset.value;
        this.closeSelector();
        this.sendOptionActions();
      });

      option.addEventListener("mouseenter", () => {
        const curOpt = this.dom.querySelector("." + this.modifiers.selectedOption.option);
        if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);
        option.classList.add(this.modifiers.selectedOption.option);
      });

      option.addEventListener("mouseleave", () => {
        const curOpt = this.dom.querySelector("." + this.modifiers.selectedOption.option);
        if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);
        option.classList.remove(this.modifiers.selectedOption.option);
      });

      option.addEventListener("mousemove", () => {
        if (hasMouseMove) {
          const currOpt = this.dom.querySelector("." + this.modifiers.selectedOption.option);
          if (currOpt) currOpt.classList.remove(this.modifiers.selectedOption.option);
          option.classList.add(this.modifiers.selectedOption.option);
          hasMouseMove = false;
        }
      });
    }

    // Manejo de teclado
    this.dom.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Tab") event.preventDefault();

      if (event.key === "Escape") this.closeSelector();

      const curOpt = this.dom.querySelector("." + this.modifiers.selectedOption.option);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        hasMouseMove = true;
        if (curOpt) {
          const next = curOpt.nextElementSibling;
          if (next) {
            curOpt.classList.remove(this.modifiers.selectedOption.option);
            next.classList.add(this.modifiers.selectedOption.option);
          }
        } else {
          optionsEls[0].classList.add(this.modifiers.selectedOption.option);
        }
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        hasMouseMove = true;
        if (curOpt) {
          const prev = curOpt.previousElementSibling;
          if (prev) {
            curOpt.classList.remove(this.modifiers.selectedOption.option);
            prev.classList.add(this.modifiers.selectedOption.option);
          }
        } else {
          optionsEls[optionsEls.length - 1].classList.add(this.modifiers.selectedOption.option);
        }
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const currOpt = this.dom.querySelector("." + this.modifiers.selectedOption.option);
        if (!currOpt) return;
        this.continent = currOpt.dataset.value;
        this.closeSelector();
        this.sendOptionActions();
      }
    });


    // Detectar pérdida de foco total (para accesibilidad con teclado)
    this.dom.addEventListener("focusout", (event) => {
      if (!this.dom.contains(event.relatedTarget)) {
        this.closeSelector();
      }
    });
  }

  closeSelector() {
    if (this.alreadyClosed) return;
    this.alreadyClosed = true;

    this.dispatch({ type: ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS, payload: { target: this.scope } });


    if (!this.autoStart) {
      this.dispatch({ type: ACTIONS.HIDE_BACKDROP, target: this.scope });
    }
  }

  sendOptionActions() {
    this.dispatch({
      type: ACTIONS.SET_CONTINENT_SELECTOR_OPTION,
      payload: {
        continent: this.continent,
        target: this.scope
      }
    });

    if (this.autoStart) {
      this.dispatch({ type: ACTIONS.SET_CONTINENT, payload: this.continent });

      const mode = this.state.game.mode;
      if (mode === "classic") this.dispatch({ type: ACTIONS.NEW_GAME });
      if (mode === "multiple-choice") this.dispatch({ type: ACTIONS.NEW_GAME_MULTIPLE_CHOICE });
      if (mode === "record") this.dispatch({ type: ACTIONS.NEW_GAME_RECORD });
      if (mode === "time-trial") this.dispatch({ type: ACTIONS.NEW_GAME_TIME_TRIAL });
    }
  }

  syncState(state) {
    const prevShow = this.state.ui.continentSelector[this.scope]?.options.show;
    const nextShow = state.ui.continentSelector[this.scope]?.options.show;

    if (prevShow !== nextShow) {
      this._show(nextShow);
      this._assignSelected(nextShow);
    }
    this.state = state;
  }

  _show(isShow) {
    if (this._showTimeout) clearTimeout(this._showTimeout);

    this.dom.classList.remove(this.modifiers.show.block);
    this.dom.classList.remove(this.modifiers.display.block);

    if (isShow) {
      this.visibilityState = "showing";
      this.alreadyClosed = false;
      this.dom.classList.add(this.modifiers.display.block);
      this.dom.offsetHeight;
      this.dom.focus();
      this._showTimeout = setTimeout(() => {
        this.dom.classList.add(this.modifiers.show.block);
      }, 0);
    } else {
      this.visibilityState = "hiding";
      this._showTimeout = setTimeout(() => {
        this.dom.classList.remove(this.modifiers.show.block);
      }, 0);
    }
  }

  _showInit() {
    this.dom.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "opacity") return;
      if (this.visibilityState === "showing") this.visibilityState = "visible";
      else if (this.visibilityState === "hiding") {
        this.visibilityState = "hidden";
        this.dom.classList.remove(this.modifiers.display.block);
      }
    });
  }

  _getContinent() {
    return this.continent;
  }

  _assignSelected(isSelect) {
    const curOpt = this.dom.querySelector("." + this.modifiers.selectedOption.option);
    if (isSelect) {
      const opt = this.dom.querySelector(`[data-value="${this.continent}"]`);
      if (opt) opt.classList.add(this.modifiers.selectedOption.option);
    } else {
      if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);
    }
  }
}

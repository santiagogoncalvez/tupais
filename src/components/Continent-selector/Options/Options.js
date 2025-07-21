import htmlString from "@components/Continent-selector/Options/template.html?raw";

// Styles
import "@components/Continent-selector/Options/style.css";

import {
  optionsBase,
  optionsModifiers,
} from "@components/Continent-selector/Options/Options-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch, setContinent) {
    super();
    this.htmlString = htmlString;
    this.base = optionsBase;
    this.modifiers = optionsModifiers;
    this.state = state;
    this.continent = state.game.continent;
    this.dom = this._createDom();
    this._init(dispatch, setContinent);
  }
  syncState(state) {
    if (
      this.state.ui.settings.continentSelector.options.show !=
      state.ui.settings.continentSelector.options.show
    ) {
      this._show(state.ui.settings.continentSelector.options.show);
      this._assignSelected(state.ui.settings.continentSelector.options.show);
    }
    this.state = state;
  }
  _init(dispatch, setContinent) {
    const options = this.dom.querySelectorAll("." + this.base.option);
    let hasMouseMove = true;

    this._assignSelected(true);
    for (let option of options) {
      //Eventos de mouse
      option.addEventListener("click", () => {
        this.continent = option.dataset.value;
        setContinent(this.continent);
        dispatch({
          ui: {
            settings: { continentSelector: { options: { show: false } } },
            backdrop: { show: false },
          },
        });
      });
      option.addEventListener("mouseenter", () => {
        let curOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (curOpt)
          curOpt.classList.remove(this.modifiers.selectedOption.option);

        option.classList.add(this.modifiers.selectedOption.option);
      });
      option.addEventListener("mouseleave", () => {
        let curOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (curOpt)
          curOpt.classList.remove(this.modifiers.selectedOption.option);

        option.classList.remove(this.modifiers.selectedOption.option);
      });
      option.addEventListener("mousemove", () => {
        if (hasMouseMove) {
          let currOpt = this.dom.querySelector(
            "." + this.modifiers.selectedOption.option
          );
          currOpt.classList.remove(this.modifiers.selectedOption.option);
          option.classList.add(this.modifiers.selectedOption.option);
          hasMouseMove = false;
        }
      });
    }
    //Eventos de teclado
    this.dom.addEventListener("keydown", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (event.key == "Escape") {
        event.preventDefault();
        dispatch({
          ui: {
            settings: { continentSelector: { options: { show: false } } },
            backdrop: { show: false },
          },
        });
      }
      let curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );
      if (event.key == "ArrowDown") {
        hasMouseMove = true;
        if (curOpt) {
          let next = curOpt.nextElementSibling;
          if (next) {
            curOpt.classList.remove(this.modifiers.selectedOption.option);
            next.classList.add(this.modifiers.selectedOption.option);
          }
        } else {
          options[0].classList.add(this.modifiers.selectedOption.option);
        }
      }
      if (event.key == "ArrowUp") {
        hasMouseMove = true;
        if (curOpt) {
          let previous = curOpt.previousElementSibling;
          if (previous) {
            curOpt.classList.remove(this.modifiers.selectedOption.option);
            previous.classList.add(this.modifiers.selectedOption.option);
          }
        } else {
          options[options.length - 1].classList.add(
            this.modifiers.selectedOption.option
          );
        }
      }
      if (event.key == "Enter") {
        let currOpt = this.dom.querySelector(
          "." + this.modifiers.selectedOption.option
        );
        if (!curOpt) return;
        this.continent = currOpt.dataset.value;
        setContinent(this.continent);
        dispatch({
          ui: {
            settings: { continentSelector: { options: { show: false } } },
            backdrop: { show: false },
          },
        });
      }
    });
  }
  _show(isShow) {
    if (isShow) {
      this.dom.classList.add(this.modifiers.display.block);
      requestAnimationFrame(() => {
        this.dom.classList.add(this.modifiers.show.block);
      });
      this.dom.focus();
    }
    if (!isShow) {
      this.dom.classList.remove(this.modifiers.show.block);
      this.dom.addEventListener(
        "transitionend",
        () => {
          this.dom.classList.remove(this.modifiers.display.block);
        },
        { once: true }
      );
    }
  }
  _getContinent() {
    return this.continent;
  }
  _assignSelected(isSelect) {
    let curOpt;
    if (isSelect) {
      curOpt = this.dom.querySelector(`[data-value="${this.continent}"]`);
      curOpt.classList.add(this.modifiers.selectedOption.option);
    }
    if (!isSelect) {
      curOpt = this.dom.querySelector(
        "." + this.modifiers.selectedOption.option
      );
      if (curOpt) curOpt.classList.remove(this.modifiers.selectedOption.option);
    }
  }
}

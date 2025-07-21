import htmlString from "@components/Backdrop/template.html?raw";
//
import "@components/Backdrop/style.css";
import {
  backdropBase,
  backdropModifiers,
} from "@components/Backdrop/Backdrop-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = backdropBase;
    this.modifiers = backdropModifiers;
    this.state = state;
    this.dom = this._createDom();
    this._init(dispatch);
  }

  syncState(state) {
    if (state.ui.backdrop.show != this.state.ui.backdrop.show) {
      this._show(state.ui.backdrop.show);
    }
    this.state = state;
  }

  _init(dispatch) {
    this.dom.addEventListener("click", () => {
      dispatch({
        ui: {
          settings: {
            continentSelector: {
              options: { show: false },
            },
          },
          backdrop: { show: false },
        },
      });
    });
  }

  _show(isShow) {
    if (isShow) {
      this.dom.classList.add(this.modifiers.show.block);
    }
    if (!isShow) {
      this.dom.classList.remove(this.modifiers.show.block);
    }
  }
}

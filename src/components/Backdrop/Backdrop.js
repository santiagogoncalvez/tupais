import { ACTIONS } from "@constants/action-types.js";

import htmlString from "@components/Backdrop/template.html?raw";
//
import "@components/Backdrop/style.css";
import { base, modifiers } from "@components/Backdrop/Backdrop-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class Options extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.htmlString = htmlString;
    this.base = base;
    this.modifiers = modifiers;
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
        type: ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS,
      });
      dispatch({
        type: ACTIONS.HIDE_BACKDROP,
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

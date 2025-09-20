import { ACTIONS } from "@constants/action-types.js";

// Style
import "@components/Continent-selector/Start-button/Start-button.css";

import elt from "@utils/elt.js";
import { base, modifiers } from "@components/Continent-selector/Start-button/Start-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class StartButton extends BaseComponent {
  constructor(state, dispatch, { scope = "modal" } = {}) {
    super();
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dispatch = dispatch;

    this.scope = scope;

    this.dom = elt(
      "button",
      {
        className: this.base.block,
        onclick: () => {
          const continent =
            this.state.ui.continentSelector?.[this.scope]?.selectedOption || "all";

          dispatch({
            type: ACTIONS.START_BUTTON_CLICKED,
            payload: {
              continent: continent,
              target: this.scope,
            },
          });
        },
        title: "Empezar",
        type: "button",
      },
      elt("span", { className: this.base.span }, "EMPEZAR")
    );
  }

  syncState(state) {
    this.state = state;
  }
}

import { ACTIONS } from "@constants/action-types.js";

// Style
import "@components/Continent-selector/Start-button/Start-button.css";

import elt from "@utils/elt.js";
import {
  base,
  modifiers,
} from "@components/Continent-selector/Start-button/Start-button-class-names.js";
import BaseComponent from "@shared/Base-component.js";

export default class StartButton extends BaseComponent {
  constructor(state, dispatch) {
    super();
    this.base = base;
    this.modifiers = modifiers;
    this.state = state;
    this.dom = elt(
      "button",
      {
        className: `${this.base.block}`,
        onclick: () => {
          // Separar la lógica de ui y game y despachar una acción por cada sección del estado
          dispatch({
            type: this.actionType,
          });
          dispatch({
            type: ACTIONS.SET_CONTINENT,
            payload: this.state.ui.continentSelector.selectedOption,
          });
          if (
            this.state.game.mode === "classic" ||
            this.state.game.mode === "multiple-choice"
          ) {
            dispatch({
              type: ACTIONS.NEW_GAME,
            });
          }
          if (this.state.game.mode === "record") {
            dispatch({
              type: ACTIONS.NEW_GAME_RECORD,
            });
          }
          if (this.state.game.mode === "time-trial") {
            dispatch({
              type: ACTIONS.NEW_GAME_TIME_TRIAL,
            });
          }
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
  setActionType(actionType) {
    this.actionType = actionType;
  }
}

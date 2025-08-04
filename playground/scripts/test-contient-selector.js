import "@styles/global.css";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

let state = {
  ui: {
    continentSelector: {
      options: { show: false },
      selectedOption: "all",
    },
    backdrop: {
      show: false,
    },
  },
  game: {
    continent: "americas",
    isNewGame: false,
  },
};

function updateState(state, action) {
  return {
    ui: {
      ...state.ui,
      ...action.ui,
      continentSelector: {
        ...state.ui.continentSelector,
        ...action.ui.continentSelector,
      },
    },
    game: { ...state.game, ...action.game },
  };
}

let continentSelector = new ContinentSelector(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  continentSelector.syncState(state);
}

document.body.prepend(continentSelector.dom);

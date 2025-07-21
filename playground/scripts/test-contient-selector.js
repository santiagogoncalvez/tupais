import "@styles/global.css";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

let state = {
  ui: {
    navbar: { continentSelector: { options: { show: false } } },
    backdrop: {
      show: false,
    },
  },

  game: {
    continent: "americas",
  },
};
function updateState(state, action) {
  return { ui: { ...state.ui, ...action.ui } };
}

let continentSelector = new ContinentSelector(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  continentSelector.syncState(state);
}

document.body.prepend(continentSelector.dom);

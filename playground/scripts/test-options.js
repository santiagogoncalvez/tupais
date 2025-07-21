import "@styles/global.css";
import Backdrop from "@components/Backdrop/Backdrop.js";
import Options from "@components/Continent-selector/Options/Options.js";

let state = {
  ui: {
    navbar: { continentSelector: { options: { show: false } } },
    backdrop: {
      show: false,
    },
  },

  game: {
    continent: "america",
  },
};

function updateState(state, action) {
  return { ui: { ...state.ui, ...action.ui } };
}

let options = new Options(state, dispatch);
let backdrop = new Backdrop(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  options.syncState(state);
  backdrop.syncState(state);
}

document.body.prepend(options.dom);
document.body.appendChild(backdrop.dom);

options.syncState({
  ui: {
    navbar: { continentSelector: { options: { show: true } } },
    backdrop: {
      show: false,
    },
  },

  game: {
    continent: "america",
  },
});

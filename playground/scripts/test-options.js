import "@styles/global.css";
import Backdrop from "@components/Backdrop/Backdrop.js";
import Options from "@components/Continent-selector/Options/Options.js";

let state = {
  ui: {
    continentSelector: {
      options: { show: false },
      selectedOption: null,
    },
    backdrop: {
      show: false,
    },
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
  console.log("State updated:", state);
  options.syncState(state);
  backdrop.syncState(state);
}

document.body.appendChild(options.dom);
document.body.appendChild(backdrop.dom);

dispatch({
  ui: {
    continentSelector: { options: { show: true } },
    backdrop: {
      show: true,
    },
  },
});

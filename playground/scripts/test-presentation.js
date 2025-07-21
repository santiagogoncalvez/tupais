import "@styles/global.css";
import Presentation from "@Modal/Presentation/Presentation.js";

function updateState(state, action) {
  return {
    ui: {
      ...state.ui,
      ...action.ui,
      settings: { ...state.ui.settings, ...action.ui?.settings },
      presentation: { ...state.ui.presentation, ...action.ui?.presentation },
    },
    game: { ...state.game, ...action.game },
  };
}

let state = {
  ui: {
    darkMode: false,
    navbar: {
      show: false,
    },
    settings: {
      show: false,
      continentSelector: {
        options: { show: false },
      },
    },
    presentation: {
      show: false,
      continentSelector: {
        options: { show: false },
      },
    },
    backdrop: { show: false },
  },
  game: {
    continent: "all",
  },
};

let presentation = new Presentation(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  presentation.syncState(state);
}

document.body.appendChild(presentation.dom);

setTimeout(() => {
  dispatch({ ui: { presentation: { show: true } } });
}, 1000);

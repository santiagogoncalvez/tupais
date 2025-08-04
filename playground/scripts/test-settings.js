import "@styles/global.css";
import Settings from "@Modal/Settings/Settings.js";

let state = {
  ui: {
    settings: {
      show: false,
    },
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

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  settings.syncState(state);
}

let settings = new Settings(state, dispatch);

document.body.prepend(settings.dom);

setTimeout(() => {
  dispatch({
    ui: {
      settings: {
        show: true,
      },
    },
  });
}, 1000);

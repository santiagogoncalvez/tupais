import "@styles/global.css";
import "@components/Game/Game.js";
import Game from "@components/Game/Game";

function updateState(state, action) {
  return {
    ui: {
      ...state.ui,
      ...action.ui,
    },
    game: { ...state.game, ...action.game },
  };
}

let state = {
  ui: {
    country: {
      animation: false,
    },
  },
  game: {
    continent: "all",
    countries: [
      "Islas Malvinas",
      "Francia",
      "Argentina",
      "Brasil",
      "Chile",
      "Estados Unidos",
    ],
    countryIndex: 0,
    answer: "",
    sendAnser: false,
  },
};

let game = new Game(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  game.syncState(state);
}

document.body.prepend(game.dom);

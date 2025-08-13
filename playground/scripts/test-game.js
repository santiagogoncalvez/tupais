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
      "Francia",
      "Islas Malvinas",
      "Argentina",
      "Brasil",
      "Chile",
      "Estados Unidos",
    ],
    countryIndex: 0,
    answer: "",
    sendAnswer: false,
    remainingAnswers: 2,
    correctAnswers: 0,
  },
};

let game = new Game(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  game.syncState(state);
}

document.querySelector("main").prepend(game.dom);

dispatch({ game: { continent: "all" } });

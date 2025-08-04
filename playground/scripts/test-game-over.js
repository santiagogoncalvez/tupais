import "@styles/global.css";
import GameOver from "@Modal/Game-over/Game-over.js";

let state = {
  ui: {
    gameOver: {
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
    totalAnswers: 10,
    correctAnswers: 5,
    correctFlags: [],
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
  state = updateState(state, action);
  console.log("Action:\n", action, "\nUpdated state:\n", state);
  gameOver.syncState(state);
}

let gameOver = new GameOver(state, dispatch);

document.body.prepend(gameOver.dom);

setTimeout(() => {
  dispatch({
    ui: {
      gameOver: {
        show: true,
      },
    },
    game: {
      correctAnswers: 10,
      correctFlags: [
        "Islas Malvinas",
        "Francia",
        "Argentina",
        "Brasil",
        "Chile",
        "Colombia",
        "Perú",
        "México",
        "Estados Unidos",
        // "Canadá",
      ],
    },
  });
}, 1000);

import "@styles/global.css";
import GameOver from "@Modal/Game-over/Game-over.js";

let state = {
  ui: {
    gameOver: {
      show: false,
      continentSelector: {
        options: { show: false },
      },
    },
    settings: {
      show: false,
      continentSelector: {
        options: { show: false },
      },
    },
    backdrop: { show: false },
  },
  game: {
    continent: "americas",
  },
};

// TODO: agregar funcion dispatch completa. La que usan otros tests

let gameOver = new GameOver(state, function dispatch(action) {
  console.log("Action: ", action);
});

document.body.prepend(gameOver.dom);

setTimeout(() => {
  gameOver.syncState({
    ui: {
      gameOver: {
        show: true,
        continentSelector: {
          options: { show: false },
        },
      },
      settings: {
        show: false,
        continentSelector: {
          options: { show: false },
        },
      },
      backdrop: { show: false },
    },
    game: {
      continent: "americas",
    },
  });
}, 1000);

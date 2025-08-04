import "@styles/global.css";
import GameModes from "@Modal/Game-over/Game-modes/Game-modes.js";

let state = {};

function updateState(state, action) {
  return {
    ui: {
      ...state.ui,
      ...action.ui,
    },
    game: { ...state.game, ...action.game },
  };
}

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  console.log("Updated state:\n", state);
  gameOver.syncState(state);
}

let gameOver = new GameModes(state, dispatch);

document.body.prepend(gameOver.dom);

setTimeout(() => {
  dispatch({});
}, 1000);

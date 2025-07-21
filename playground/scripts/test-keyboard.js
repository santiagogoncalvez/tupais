import "@styles/global.css";
import Keyboard from "@components/Keyboard/Keyboard.js";

function updateState(state, action) {
  return {
    game: { ...state.game, ...action.game },
  };
}

let state = {
  game: {
    continent: "all",
    answer: "",
    sendAnser: false,
  },
};

let keyboard = new Keyboard(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  keyboard.syncState(state);
}

document.body.appendChild(keyboard.dom);

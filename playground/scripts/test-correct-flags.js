import "@styles/global.css";

import { nextIndex } from "@utils/circular-counter.js";

import CorrectFlags from "@Modal/Game-over/Results/Correct-flags/Correct-flags.js";

function reducer(state, action) {
  return {
    game: {
      ...state.game,
      ...action.game,
    },
  };
}

let state = {
  game: {
    totalAnswers: 10,
    correctFlags: [],
  },
};

let correctFlags = new CorrectFlags(state, dispatch);

function dispatch(action) {
  state = reducer(state, action);

  // console.log("Action:", action);
  // console.log("New state: ", state);
  // console.log("");

  correctFlags.syncState(state);
}

document.body.appendChild(correctFlags.dom);

dispatch({
  game: {
    correctFlags: ["Islas Malvinas", "Francia", "Argentina", "Brasil", "Chile"],
  },
});

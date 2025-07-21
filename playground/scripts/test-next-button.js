import "@styles/global.css";
import NextButton from "@components/Game/Country/Next-button/Next-button.js";

function updateState(state, action) {
  return {
    game: { ...state.game, ...action.game },
  };
}

let state = {
  game: {
    countryIndex: 1,
  },
};

let nextButton = new NextButton(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  nextButton.syncState(state);
}

document.body.prepend(nextButton.dom);

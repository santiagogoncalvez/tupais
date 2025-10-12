import { GAME_MODES } from "@constants/game-modes.js";


import { ACTIONS } from "@constants/action-types.js";

import store from "@store/store.js";

import "@styles/global.css";

import ContinentSelector from "@components/Continent-selector/Continent-selector.js";
import GameOver from "@Modal/Game-over/Game-over.js";


let continentSelector = new ContinentSelector(
  store.getState(),
  store.dispatch.bind(store)
);
let gameOver = new GameOver(
  store.getState(),
  store.dispatch.bind(store),
  continentSelector
);

document.body.querySelector("main").appendChild(gameOver.dom);

function subscribeComponents() {
  store.subscribe(gameOver.syncState.bind(gameOver));
}
subscribeComponents();

store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: GAME_MODES.RECORD });
store.dispatch({ type: ACTIONS.SET_GAME_MODE, payload: GAME_MODES.CHALLENGE });
store.dispatch({ type: ACTIONS.NEW_GAME });
store.dispatch({ type: ACTIONS.OPEN_GAME_OVER });
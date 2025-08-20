import { ACTIONS } from "@constants/action-types.js";

import { createStore, rootReducer, checkGameCompletion } from "@store/store.js";

import "@styles/global.css";

import GameOptions from "@components/Game/Game-options/Game-options.js";

const store = createStore(rootReducer, [checkGameCompletion]);

let gameOptions = new GameOptions(store.getState(), store.dispatch.bind(store));

document.body.querySelector("main").appendChild(gameOptions.dom);

function subscribeComponents() {
  store.subscribe(gameOptions.syncState.bind(gameOptions));
}
subscribeComponents();

setTimeout(() => {
  store.dispatch({ type: ACTIONS.SHOW_OPTIONS_MULTIPLE_CHOICE });
}, 1000);
setTimeout(() => {
  store.dispatch({ type: ACTIONS.HIDE_OPTIONS_MULTIPLE_CHOICE });
}, 3000);
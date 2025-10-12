import { GAME_MODES } from "@constants/game-modes.js";

import store from "@store/store.js";

import { ACTIONS } from "@constants/action-types.js";

import "@styles/global.css";

import Presentation from "@Modal/Presentation/Presentation.js";
import Settings from "@Modal/Settings/Settings.js";
import GameOver from "@Modal/Game-over/Game-over.js";
import Header from "@components/Header/Header.js";
import Game from "@components/Game/Game";
import Notifications from "@components/Notifications/Notifications.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

// Setear el modo actual
store.dispatch({
  type: ACTIONS.SET_GAME_MODE,
  payload: GAME_MODES.CLASSIC,
});

let continentSelector = new ContinentSelector(
  store.getState(),
  store.dispatch.bind(store)
);
let presentation = new Presentation(
  store.getState(),
  store.dispatch.bind(store),
  continentSelector
);
let settings = new Settings(
  store.getState(),
  store.dispatch.bind(store),
  continentSelector
);
let gameOver = new GameOver(
  store.getState(),
  store.dispatch.bind(store),
  continentSelector
);
let header = new Header(store.getState(), store.dispatch.bind(store));
let game = new Game(store.getState(), store.dispatch.bind(store));
let notifications = new Notifications(
  store.getState(),
  store.dispatch.bind(store)
);

document.body.prepend(header.dom);
document.body.appendChild(presentation.dom);
document.body.querySelector("main").appendChild(game.dom);
document.body.appendChild(settings.dom);
document.body.appendChild(gameOver.dom);
document.body.appendChild(notifications.dom);

function subscribeComponents() {
  store.subscribe(presentation.syncState.bind(presentation));
  store.subscribe(settings.syncState.bind(settings));
  store.subscribe(gameOver.syncState.bind(gameOver));
  store.subscribe(header.syncState.bind(header));
  store.subscribe(game.syncState.bind(game));
  store.subscribe(notifications.syncState.bind(notifications));
}
subscribeComponents();

// Acción con nuevo formato de tipo
const state = store.getState();
if (state.ui.firstLaunch) {
  store.dispatch({
    type: ACTIONS.OPEN_PRESENTATION,
  });
} else {
  store.dispatch({
    type: ACTIONS.NEW_GAME_CLASSIC,
  });
}

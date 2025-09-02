import {
  createStore,
  rootReducer,
} from "@store/store.js";

import "@styles/global.css";

import Settings from "@Modal/Settings/Settings.js";
import Header from "@components/Header/Header.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";
import Credits from "@components/Credits/Credits.js";

const store = createStore(rootReducer, []);

// Setear el modo actual

let continentSelector = new ContinentSelector(
  store.getState(),
  store.dispatch.bind(store)
);
let settings = new Settings(
  store.getState(),
  store.dispatch.bind(store),
  continentSelector
);
let header = new Header(store.getState(), store.dispatch.bind(store));
let credits = new Credits(store.getState());

document.body.prepend(header.dom);
document.body.appendChild(credits.dom);
document.body.appendChild(settings.dom);

function subscribeComponents() {
  store.subscribe(settings.syncState.bind(settings));
  store.subscribe(header.syncState.bind(header));
  store.subscribe(credits.syncState.bind(credits));
}
subscribeComponents();

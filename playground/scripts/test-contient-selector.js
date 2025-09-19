import store from "@store/store.js";

import "@styles/global.css";

import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

let continentSelector = new ContinentSelector(
  store.getState(),
  store.dispatch.bind(store),
  { useBackdrop: false, autoStart: false, trueshowLabel: false }
);

document.body.querySelector("main").appendChild(continentSelector.dom);

function subscribeComponents() {
  store.subscribe(continentSelector.syncState.bind(continentSelector));
}
subscribeComponents();
import {
  createStore,
  rootReducer,
  routerMiddleware
} from "@store/store.js";

import "@styles/global.css";

import ContinentSelector from "@components/Continent-selector/Continent-selector.js";
import Settings from "@Modal/Settings/Settings.js";
import Header from "@components/Header/Header.js";

import {
  BASE_PATH
} from "@constants/base-path.js";


const store = createStore(rootReducer, [routerMiddleware]);


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

document.body.prepend(header.dom);
document.body.appendChild(settings.dom);

function subscribeComponents() {
  store.subscribe(settings.syncState.bind(settings));
  store.subscribe(header.syncState.bind(header));
}
subscribeComponents();

window.addEventListener("popstate", () => {
  store.dispatch({ type: "NAVIGATE_TO", payload: location.pathname });
});


//* Hacerlo en el inicio de la app. 
function getCurrentRoute() {
  const path = location.pathname;
  if (path.startsWith(BASE_PATH)) {
    return path.slice(BASE_PATH.length) || "/";
  }
  return "/";
}

store.dispatch({ type: "router/NAVIGATE_TO", payload: getCurrentRoute() }); 
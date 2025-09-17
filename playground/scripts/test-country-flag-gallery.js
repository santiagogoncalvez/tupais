import {
    createStore,
    rootReducer,
    checkSendAnswer,
    checkNewGame,
    checkGameCompleted,
    persistStatsMiddleware,
} from "@store/store.js";
import { ACTIONS } from "@constants/action-types.js";

import "@styles/global.css";


import ContinentSelector from "@components/Continent-selector/Continent-selector.js";
import Settings from "@Modal/Settings/Settings.js";
import Header from "@components/Header/Header.js";
import FlagGallery from "@components/Flag-gallery/Flag-gallery.js";

const store = createStore(rootReducer, [
    checkSendAnswer,
    checkNewGame,
    checkGameCompleted,
    persistStatsMiddleware,
]);

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
let flagGallery = new FlagGallery(store.getState(), store.dispatch.bind(store));

document.body.prepend(header.dom);
document.body.appendChild(settings.dom);
document.querySelector("main").appendChild(flagGallery.dom);

function subscribeComponents() {
    store.subscribe(settings.syncState.bind(settings));
    store.subscribe(header.syncState.bind(header));
    store.subscribe(flagGallery.syncState.bind(flagGallery));
}
subscribeComponents();
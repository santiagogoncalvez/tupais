import ContinentSelector from "@Modal/Settings/Continent-selector/Continent-selector.js";

let state = {
   game: {
      continent: "all",
   },
};

let continentSelector = new ContinentSelector(state, function dispatch(action) {
   console.log("Action: ", action);
});

document.body.prepend(continentSelector.dom);

// darkModeButton._syncState({ui: {darkMode: true}});

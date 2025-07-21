import "@styles/global.css";
import DarkModeButton from "@Modal/Settings/Dark-mode-button/Dark-mode-button.js";

let state = {
  ui: {
    darkMode: false,
  },
};

let darkModeButton = new DarkModeButton(state, function dispatch(action) {
  console.log("Action: ", action);
});

document.body.prepend(darkModeButton.dom);

// darkModeButton.syncState({ui: {darkMode: true}});

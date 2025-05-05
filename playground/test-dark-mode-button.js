import DarkModeButton from "@Modal/Settings/Dark-mode-button/Dark-mode-button.js";

function updateState(state, action) {
   return { ...state, ...action };
}

let state = {
   ui: {
      darkMode: false,
   },
};

let darkModeButton = new DarkModeButton(state, function dispatch(action) {
   console.log("Action: ", action);
});

document.body.prepend(darkModeButton.dom);

// darkModeButton._syncState({ui: {darkMode: true}});

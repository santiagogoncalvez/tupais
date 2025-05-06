import Header from "@layouts/Header/Header.js";
import Footer from "@layouts/Footer/Footer.js";
import Settings from "@Modal/Settings/Settings.js";

function updateState(state, action) {
   return { ui: { ...state.ui, ...action.ui } };
}

let state = {
   ui: {
      darkMode: false,
      navbar: { show: false },
      settings: { show: false },
   },
};

let header = new Header(state, dispatch);
let footer = new Footer(state, dispatch);
let settings = new Settings(state, dispatch);

function dispatch(action) {
   state = updateState(state, action);
   header._syncState(state);
   footer._syncState(state);
   settings._syncState(state);
}

document.body.prepend(header.dom);
document.body.appendChild(footer.dom);
document.body.appendChild(settings.dom);

// setTimeout(() => {
//    settings.dom.classList.add("settings--hidden");
// }, 3000);

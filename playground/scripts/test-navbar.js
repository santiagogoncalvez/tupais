import "@styles/global.css";
import Navbar from "@components/Header/Navbar/Navbar.js";

function updateState(state, action) {
  return { ...state, ...action };
}

let state = {
  ui: {
    navbar: { show: true },
  },
};

let navbar = new Navbar(state, function dispatch(action) {
  state = updateState(state, action);
  navbar.syncState(state);
});

document.body.appendChild(navbar.dom);

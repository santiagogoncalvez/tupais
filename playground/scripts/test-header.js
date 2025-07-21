import "@styles/global.css";
import Header from "@components/Header/Header.js";

let state = {
  ui: {
    darkMode: false,
    navbar: { show: true },
  },
};

let header = new Header(state, function dispatch(action) {
  console.log("Action: ", action);
});

document.body.prepend(header.dom);

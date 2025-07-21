import "@styles/global.css";
import Footer from "@components/Footer/Footer.js";

function updateState(state, action) {
  return { ui: { ...state.ui, ...action.ui } };
}

let state = {
  ui: {
    darkMode: false,
  },
};

let footer = new Footer(state, function dispatch(action) {
  state = updateState(state, action);
  footer.syncState(state);
});

document.body.appendChild(footer.dom);

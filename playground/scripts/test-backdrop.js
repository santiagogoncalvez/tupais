import "@styles/global.css";
import Backdrop from "@components/Backdrop/Backdrop.js";

function updateState(state, action) {
  return { ...state, ...action };
}

let state = {
  ui: {
    backdrop: {
      show: false,
    },
  },
};

let backdrop = new Backdrop(state, function dispatch(action) {
  state = updateState(state, action);
  backdrop.syncState(state);
});
document.body.prepend(backdrop.dom);
backdrop.syncState({
  ui: {
    backdrop: {
      show: true,
    },
  },
});

import "@styles/global.css";
import Settings from "@Modal/Settings/Settings.js";

let state = {
  ui: {
    settings: {
      show: false,
    },
  },
  game: {
    continent: "americas",
  },
};

let settings = new Settings(state, function dispatch(action) {
  console.log("Action: ", action);
});

document.body.prepend(settings.dom);

setTimeout(() => {
  settings.syncState({
    ui: {
      settings: {
        show: true,
      },
    },
  });
}, 1000);

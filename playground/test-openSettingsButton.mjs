import OpenSettingsButton from "@components/Header/OpenSettingsButton/OpenSettingsButton.mjs";

let state = {
   ui: {
      settings: { show: true },
   },
};

let openSettingsButton = new OpenSettingsButton(state, function dispatch(
   action
) {
   console.log("Action: ", action);
});

document.body.appendChild(openSettingsButton.dom);

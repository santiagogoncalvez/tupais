import OpenSettingsButton from "@layouts/Header/OpenSettingsButton/OpenSettingsButton.js";

let openSettingsButton = new OpenSettingsButton(function dispatch(action) {
   console.log("Action: ", action);
});

document.body.appendChild(openSettingsButton.dom);

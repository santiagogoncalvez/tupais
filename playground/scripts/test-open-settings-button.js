import "@styles/global.css";
import OpenSettingsButton from "@components/Header/OpenSettingsButton/OpenSettingsButton.js";

let openSettingsButton = new OpenSettingsButton(function dispatch(action) {
  console.log("Action: ", action);
});

document.body.appendChild(openSettingsButton.dom);

import "@styles/global.css";
import OpenNavbarButton from "@components/Header/OpenNavbarButton/OpenNavbarButton.js";

let openNavbarButton = new OpenNavbarButton(function dispatch(action) {
  console.log("Action: ", action);
});

document.body.appendChild(openNavbarButton.dom);

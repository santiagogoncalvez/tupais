import Header from "@layouts/Header/Header.js";
import Footer from "@layouts/Footer/Footer.js";
import Settings from "@Modal/Settings/Settings.js";

let state = {
   ui: {
      darkMode: false,
      navbar: { show: false },
      settings: { show: false },
   },
};

let dispatch = function dispatch(action) {
   console.log("Action: ", action);
};

let header = new Header(state, dispatch);
let footer = new Footer(state, dispatch);
let settings = new Settings(state, dispatch);

document.body.prepend(header.dom);
document.body.appendChild(footer.dom);
document.body.appendChild(settings.dom);

setTimeout(() => {
   header._syncState({
      ui: {
         darkMode: false,
         navbar: { show: true },
         settings: { show: false },
      },
   });
}, 1000);

setTimeout(() => {
   settings._syncState({
      ui: {
         darkMode: false,
         navbar: { show: true },
         settings: { show: true },
      },
   });
}, 3000);

import Footer from "@layouts/Footer/Footer.js";

function updateState(state, action) {
   return { ...state, ...action };
}

let state = {
   ui: {
      darkMode: false,
   },
};

let footer = new Footer(state, function dispatch() {
   state = updateState(state, action);
   footer.syncState(state);
});

document.body.appendChild(footer.dom);

import Footer from "@components/Footer/Footer.mjs";

function updateState(state, action) {
   return { ...state, ...action };
}

let state = {
   ui: {
      darkMode: true,
   },
};

let footer = new Footer(state, function dispatch() {
   state = updateState(state, action);
   footer.syncState(state);
});

document.body.appendChild(footer.dom);

import Navbar from "@layouts/Header/Navbar/Navbar.js";

function updateState(state, action) {
   return { ...state, ...action };
}

let state = {
   ui: {
      navbar: { show: true },
   },
};

let navbar = new Navbar(state, function dispatch(action) {
   state = updateState(state, action);
   navbar._syncState(state);
});

document.body.appendChild(navbar.dom);

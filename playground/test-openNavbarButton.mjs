import OpenNavbarButton from "@components/Header/OpenNavbarButton/OpenNavbarButton.mjs";


let state = {
   ui: {
      navbar: { show: true },
   },
};

let openNavbarButton = new OpenNavbarButton(state, function dispatch(action) {
   console.log("Action: ", action);
});

document.body.appendChild(openNavbarButton.dom);
import Settings from "@Modal/Settings/Settings.js";

let state = {
   ui: {
      settings: {
         show: false,
      },
   },
};

let settings = new Settings(state, function dispatch(action) {
   console.log("Action: ", action);
});

document.body.prepend(settings.dom);

setTimeout(() => {
   settings._syncState({
      ui: {
         settings: {
            show: true,
         },
      },
   });
}, 1000);

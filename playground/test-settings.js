import Settings from "@Modal/Settings/Settings.js";

let state = {
   ui: {
      settings: {
         show: true,
      },
   },
};

let settings = new Settings(state, function dispatch(action) {
   console.log("Action: ", action);
});

document.body.prepend(settings.dom);

// setTimeout(() => {
//    settings._syncState({
//       ui: {
//          settings: {
//             show: true,
//          },
//       },
//    });

//    setTimeout(() => {
//       settings._syncState({
//          ui: {
//             settings: {
//                show: false,
//             },
//          },
//       });
//    }, 2000);
// }, 1000);

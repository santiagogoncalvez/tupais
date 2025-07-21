import "@styles/global.css";
import Country from "@components/Game/Country/Country.js";

function updateState(state, action) {
  return {
    ui: {
      ...state.ui,
      ...action.ui,
    },
    game: { ...state.game, ...action.game },
  };
}

let state = {
  ui: {
    country: {
      animation: false,
    },
  },
  game: {
    countries: ["Francia", "Argentina", "Brasil", "Chile"],
    countryIndex: 2,
  },
};

let country = new Country(state, dispatch);

function dispatch(action) {
  console.log(action);
  state = updateState(state, action);
  country.syncState(state);
}

document.body.prepend(country.dom);

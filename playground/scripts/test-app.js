import { globalReducer } from "@store/reducers/global-reducer.js";

import "@styles/global.css";

import { ACTIONS } from "@constants/action-types.js";

import { getRandomCountries } from "@utils/country-parser.js";

import Presentation from "@Modal/Presentation/Presentation.js";
import Settings from "@Modal/Settings/Settings.js";
import GameOver from "@Modal/Game-over/Game-over.js";
import Header from "@components/Header/Header.js";
import Game from "@components/Game/Game";
import Notifications from "@components/Notifications/Notifications.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

let state = {
  ui: {
    darkMode: false,
    modals: {
      presentation: {
        show: false,
      },
      settings: {
        show: false,
      },
      gameOver: { show: false },
    },
    navbar: {
      show: false,
    },
    continentSelector: {
      options: { show: false },
      selectedOption: "all",
    },
    backdrop: { show: false },
    country: {
      animation: false,
    },
    // Notificaciones
    notifications: {
      show: false,
      id: null,
      message: "",
    },
  },
  game: {
    continent: "all",
    // Esto es temporal, ya que en un principio se va a abrir Presentation y se va a elegir el continente o este va a estar guardado en el localStorage
    countries: getRandomCountries("all", -1),
    // countries: ["Argentina","Colombia", "Chile"],
    countryIndex: 0,
    answer: "",
    sendAnswer: false,
    correctAnswers: 0,
    correctFlags: [],
    remainingAnswers: 2,
    totalAnswers: 2,
    completed: false,
    won: false,
    isNewGame: false,
  },
};

let continentSelector = new ContinentSelector(state, dispatch);
let presentation = new Presentation(state, dispatch, continentSelector);
let settings = new Settings(state, dispatch, continentSelector);
let gameOver = new GameOver(state, dispatch, continentSelector);
let header = new Header(state, dispatch);
let game = new Game(state, dispatch);
let notifications = new Notifications(state, dispatch);

function dispatch(action) {
  state = globalReducer(state, action);

  console.log("Action:\n", action, "\nNew state:\n", state);

  presentation.syncState(state);
  settings.syncState(state);
  gameOver.syncState(state);
  header.syncState(state);
  game.syncState(state);
  notifications.syncState(state);
}

document.body.prepend(header.dom);
document.body.appendChild(presentation.dom);
document.body.querySelector("main").appendChild(game.dom);
document.body.appendChild(settings.dom);
document.body.appendChild(gameOver.dom);
document.body.appendChild(notifications.dom);

// Acción con nuevo formato de tipo
dispatch({
  type: ACTIONS.OPEN_PRESENTATION,
  payload: true,
});

import "@styles/global.css";

import { nextIndex } from "@utils/circular-counter.js";

import Presentation from "@Modal/Presentation/Presentation.js";
import Settings from "@Modal/Settings/Settings.js";
import GameOver from "@Modal/Game-over/Game-over.js";
import Header from "@components/Header/Header.js";
import Game from "@components/Game/Game";
import ResponseType from "@components/Response-type/Response-type.js";
import ContinentSelector from "@components/Continent-selector/Continent-selector.js";

function normalizar(str) {
  return str.toLowerCase().replace(" ", "");
}

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
function getCorrectAnswersUpdate(state, action) {
  const currentCount = state.game.correctAnswers;
  let def = {
    ui: {
      ...state.ui,
      ...action.ui,
      settings: { ...state.ui.settings },
      presentation: { ...state.ui.presentation },
    },
    game: {
      ...state.game,
      ...action.game,
    },
  };

  let currAnswer = normalizar(state.game?.answer);
  let correctAnswer = normalizar(state.game.countries[state.game.countryIndex]);

  // Verificar el tipo de respuesta
  // *Respuesta completa
  if (currAnswer.length == correctAnswer.length) {
    // *Respuesta correcta
    if (currAnswer == correctAnswer) {
      // console.log("Respuesta correcta");
      def.game.correctFlags = [
        ...def.game.correctFlags,
        def.game.countries[def.game.countryIndex],
      ];
      def.game = {
        ...def.game,
        ...{
          countryIndex: nextIndex(
            state.game.countryIndex,
            state.game.countries.length
          ),
          answer: "",
          sendAnswer: false,
          correctAnswers: currentCount + 1,
          remainingAnswers: state.game.remainingAnswers - 1,
        },
      };
      def.ui = {
        ...def.ui,
        ...{
          responseType: {
            isActive: true,
            message: "Correcto",
          },
        },
      };
    } else {
      // *Respuesta incorrecta pero completa
      // console.log("Respuesta incorrecta");
      def.game = {
        ...def.game,
        ...{
          countryIndex: nextIndex(
            state.game.countryIndex,
            state.game.countries.length
          ),
          answer: "",
          sendAnswer: false,
          correctAnswers: currentCount,
          remainingAnswers: state.game.remainingAnswers - 1,
        },
      };
      def.ui = {
        ...def.ui,
        ...{
          responseType: {
            isActive: true,
            message: "Incorrecto",
          },
        },
      };
    }
  } else {
    // Respuesta incompleta
    // console.log("Repuesta incompleta");
    def.ui = {
      ...def.ui,
      ...{
        sendAnswer: false,
        responseType: {
          isActive: true,
          message: "Respuesta incompleta",
        },
      },
    };
  }

  // Verificar si el juego ha terminado
  if (def.game.remainingAnswers <= 0) {
    // console.log("No quedan respuestas");
    def.game = { ...def.game, completed: true };

    def.ui = { ...def.ui, gameOver: { show: true } };
  }

  // Verificar si el juego ha sido ganado
  if (def.game.correctAnswers >= state.game.totalAnswers) {
    // console.log("Juego ganado");
    def.game = { ...def.game, won: true };
  }

  return def;
}

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
function reducer(state, action) {
  if (action?.game?.sendAnswer) {
    return getCorrectAnswersUpdate(state, action);
  }
  let def = {
    ui: {
      ...state.ui,
      ...action.ui,
      settings: { ...state.ui.settings, ...action.ui?.settings },
      presentation: { ...state.ui.presentation, ...action.ui?.presentation },
      continentSelector: {
        ...state.ui.continentSelector,
        ...action.ui?.continentSelector,
      },
    },
    game: {
      ...state.game,
      ...action.game,
    },
  };

  // Verificar si hay que reiniciar el juego
  if (def.game.isNewGame) {
    def.game = {
      ...def.game,
      correctAnswers: 0,
      correctFlags: [],
      remainingAnswers: def.game.totalAnswers,
      completed: false,
      won: false,
      isNewGame: false,
    };
  }

  return def;
}

let state = {
  ui: {
    darkMode: false,
    navbar: {
      show: false,
    },
    settings: {
      show: false,
    },
    presentation: {
      show: false,
    },
    gameOver: { show: false },
    continentSelector: {
      options: { show: false },
      selectedOption: "all",
    },
    backdrop: { show: false },
    country: {
      animation: false,
    },
    // Notificaciones
    responseType: {
      isActive: false,
      close: false,
      message: "",
    },
  },
  game: {
    continent: "all",
    countries: [
      "Islas Malvinas",
      "Francia",
      "Argentina",
      "Brasil",
      "Chile",
      "Estados Unidos",
    ],
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
let responseType = new ResponseType(dispatch);

function dispatch(action) {
  state = reducer(state, action);

  console.log("Action:\n", action, "\nNew state:\n", state);

  presentation.syncState(state);
  settings.syncState(state);
  gameOver.syncState(state);
  header.syncState(state);
  game.syncState(state);
  responseType.syncState(state);
}

document.body.prepend(header.dom);
document.body.appendChild(presentation.dom);
document.body.querySelector("main").appendChild(game.dom);
document.body.appendChild(settings.dom);
document.body.appendChild(gameOver.dom);
document.body.appendChild(responseType.dom);

dispatch({ ui: { presentation: { show: true } } });
// dispatch({ ui: { gameOver: { show: true } } });

import "@styles/global.css";
import { nextIndex } from "@utils/circular-counter.js";

import Presentation from "@Modal/Presentation/Presentation.js";
import Header from "@components/Header/Header.js";
import Settings from "@Modal/Settings/Settings.js";
import Game from "@components/Game/Game";
import ResponseType from "@components/Response-type/Response-type.js";

function normalizar(str) {
  return str.toLowerCase().replace(" ", "");
}

function getCorrectAnswersUpdate(state) {
  const currentCount = state.game.correctAnswers;
  let def = {
    ui: {
      ...state.ui,
      settings: { ...state.ui.settings },
      presentation: { ...state.ui.presentation },
    },
    game: {
      ...state.game,
    },
  };

  let currAnswer = normalizar(state.game?.answer);
  let correctAnswer = normalizar(state.game.countries[state.game.countryIndex]);

  // Verificar el tipo de respuesta
  // *Respuesta completa
  if (currAnswer.length == correctAnswer.length) {
    // *Respuesta correcta
    if (currAnswer == correctAnswer) {
      console.log("Respuesta correcta");
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
          responseType: {
            isActive: true,
            message: "Correcto",
          },
        },
      };
    } else {
      // *Respuesta incorrecta pero completa
      console.log("Respuesta incorrecta");
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
          responseType: {
            isActive: true,
            message: "Incorrecto",
          },
        },
      };
    }
  } else {
    // Respuesta incompleta
    console.log("Repuesta incompleta");
    def.game = {
      ...def.game,
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
    console.log("No quedan respuestas");
    def.game.completed = true;
  }

  // Verificar si el juego ha sido ganado
  if (def.game.correctAnswers >= state.game.totalAnswers) {
    console.log("Juego ganado");
    def.game.won = true;
  }

  return def;
}

function reducer(state, action) {
  if (action?.game?.sendAnswer) {
    return getCorrectAnswersUpdate(state, action);
  }
  return {
    ui: {
      ...state.ui,
      ...action.ui,
      settings: { ...state.ui.settings, ...action.ui?.settings },
      presentation: { ...state.ui.presentation, ...action.ui?.presentation },
    },
    game: {
      ...state.game,
      ...action.game,
    },
  };
}

let state = {
  ui: {
    darkMode: false,
    navbar: {
      show: false,
    },
    settings: {
      show: false,
      continentSelector: {
        options: { show: false },
      },
    },
    presentation: {
      show: false,
      continentSelector: {
        options: { show: false },
      },
    },
    backdrop: { show: false },
    country: {
      animation: false,
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
    remainingAnswers: 2,
    totalAnswers: 2,
    responseType: {
      isActive: false,
      close: false,
      message: "",
    },
    completed: false,
    won: false,
  },
};

let presentation = new Presentation(state, dispatch);
let header = new Header(state, dispatch);
let settings = new Settings(state, dispatch);
let game = new Game(state, dispatch);
let responseType = new ResponseType(dispatch);

function dispatch(action) {
  state = reducer(state, action);

  // console.log("Action:", action);
  // console.log("New state: ", state);
  // console.log("");
  
  presentation.syncState(state);
  header.syncState(state);
  settings.syncState(state);
  game.syncState(state);
  responseType.syncState(state);
}

document.body.prepend(header.dom);
document.body.appendChild(presentation.dom);
document.body.querySelector("main").appendChild(game.dom);
document.body.appendChild(settings.dom);
document.body.appendChild(responseType.dom);

dispatch({ ui: { presentation: { show: true } } });

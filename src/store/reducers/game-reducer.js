import { ACTIONS } from "@constants/action-types.js";

import { normStr } from "@utils/string-parser.js";
import { prevIndex, nextIndex } from "@utils/circular-counter.js";

import { getRandomCountries } from "@utils/country-parser.js";

function getCorrectAnswersUpdate(game) {
  const currentCount = game.correctAnswers;
  let newState = {
    ...game,
  };

  let currAnswer = normStr(game.answer);
  let correctAnswer = normStr(game.countries[game.countryIndex]);

  // Verificar el tipo de respuesta
  // *Respuesta completa
  if (currAnswer.length == correctAnswer.length) {
    // *Respuesta correcta
    if (currAnswer == correctAnswer) {
      newState.correctFlags = [
        ...newState.correctFlags,
        newState.countries[newState.countryIndex],
      ];
      newState = {
        ...newState,
        ...{
          countryIndex: nextIndex(game.countryIndex, game.countries.length),
          answer: "",
          sendAnswer: false,
          correctAnswers: currentCount + 1,
          remainingAnswers: game.remainingAnswers - 1,
          lastAnswerType: "Correct",
        },
      };
    } else {
      // *Respuesta incorrecta pero completa
      newState = {
        ...newState,
        ...{
          countryIndex: nextIndex(game.countryIndex, game.countries.length),
          answer: "",
          sendAnswer: false,
          correctAnswers: currentCount,
          remainingAnswers: game.remainingAnswers - 1,
          lastAnswerType: "Incorrect",
        },
      };
    }
  } else {
    //* Respuesta incompleta
    newState = {
      ...newState,
      ...{
        sendAnswer: false,
        lastAnswerType: "Incomplete",
      },
    };
  }

  // Verificar si el juego se completó
  if (newState.remainingAnswers <= 0) {
    newState = {
      ...newState,
      // Si el juego se completó restar uno al índice lo que significaría mantener sin cambios el índice para que este aumento lo haga NEW_GAME.
      countryIndex: prevIndex(newState.countryIndex, newState.countries.length),
      completed: true,
    };
  }

  // Verificar si el juego ha sido ganado
  if (newState.correctAnswers >= game.totalAnswers) {
    newState = { ...newState, won: true };
  }

  return newState;
}

export const initialState = {
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
  lastAnswerType: "",
};

const reducerMap = {
  //* GAME
  [ACTIONS.NEW_GAME]: (game) => {
    return {
      ...game,
      correctAnswers: 0,
      answer: "",
      correctFlags: [],
      remainingAnswers: 2,
      countryIndex: nextIndex(game.countryIndex, game.countries.length),
      completed: false,
      won: false,
    };
  },
  [ACTIONS.NEXT_COUNTRY]: (game) => {
    return {
      ...game,
      countryIndex: nextIndex(game.countryIndex, game.countries.length),
      answer: "",
    };
  },
  [ACTIONS.SET_CONTINENT]: (game, action) => {
    let newState = {
      ...game,
    };

    // Modificar el nuevo estado según si el continente cambió
    if (newState.continent != action.payload) {
      newState = {
        ...newState,
        continent: action.payload,
        countries: getRandomCountries(action.payload, -1),
      };
      newState = {
        ...newState,
        countryIndex: newState.countries.length - 1,
      };
    }

    return newState;
  },
  [ACTIONS.SET_ANSWER]: (game, action) => {
    return {
      ...game,
      answer: action.payload,
    };
  },
  [ACTIONS.SEND_ANSWER]: (game) => {
    return getCorrectAnswersUpdate(game);
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function gameReducer(game = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(game, action) : game;
}

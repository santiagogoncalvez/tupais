import { ACTIONS } from "@constants/action-types.js";

import { normStr } from "@utils/string-parser.js";
import { prevIndex, nextIndex } from "@utils/circular-counter.js";

import { getRandomCountries } from "@utils/country-parser.js";

function getAnswers(game) {
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

  return newState;
}

// Multiple choice
function getAnswersChoice(game) {
  const currentCount = game.correctAnswers;
  let newState = {
    ...game,
  };

  let currAnswer = normStr(game.answer);
  let correctAnswer = normStr(game.countries[game.countryIndex]);

  // Verificar el tipo de respuesta
  // *Respuesta correcta
  if (currAnswer == correctAnswer) {
    newState.correctFlags = [
      ...newState.correctFlags,
      newState.countries[newState.countryIndex],
    ];
    newState = {
      ...newState,
      ...{
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
        sendAnswer: false,
        correctAnswers: currentCount,
        remainingAnswers: game.remainingAnswers - 1,
        lastAnswerType: "Incorrect",
      },
    };
  }

  return newState;
}

function getOptions(correct, elements) {
  // Clonamos el array
  const pool = [...elements];

  // Sacamos el correcto si aparece
  const index = pool.indexOf(correct);
  if (index !== -1) pool.splice(index, 1);

  // Mezclamos y tomamos 3
  const randoms = pool.sort(() => Math.random() - 0.5).slice(0, 3);

  // Mezclamos el resultado final con el correcto
  return [correct, ...randoms].sort(() => Math.random() - 0.5);
}

let initState = {
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

// Game-modes
initState.modes = {
  multipleChoice: {
    options: getOptions(initState.countries[0], initState.countries),
    showOptions: false,
  },
};

export const initialState = initState;

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
  [ACTIONS.GAME_COMPLETED]: (game) => {
    return {
      ...game,
      completed: true,
    };
  },
  [ACTIONS.GAME_WON]: (game) => {
    return {
      ...game,
      won: true,
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
    return getAnswers(game);
  },

  // Mode: Multiple choice
  [ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE]: (game) => {
    return getAnswersChoice(game);
  },
  // Mode: Multiple choice
  [ACTIONS.SHOW_OPTIONS_MULTIPLE_CHOICE]: (game) => {
    return {
      ...game,
      modes: {
        ...game.modes,
        multipleChoice: {
          ...game.modes.multipleChoice,
          options: getOptions(
            game.countries[game.countryIndex],
            game.countries
          ),
          showOptions: true,
        },
      },
    };
  },
  [ACTIONS.HIDE_OPTIONS_MULTIPLE_CHOICE]: (game) => {
    return {
      ...game,
      modes: {
        ...game.modes,
        multipleChoice: {
          ...game.modes.multipleChoice,
          showOptions: false,
        },
      },
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function gameReducer(game = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(game, action) : game;
}

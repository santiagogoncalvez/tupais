import { ANSWER_TYPES } from "@constants/answer-types.js";

import { GAME_MODES } from "@constants/game-modes.js";
import { ACTIONS } from "@constants/action-types.js";

import { normStr } from "@utils/string-parser.js";
import { nextIndex } from "@utils/circular-counter.js";

import { shuffle } from "@utils/shuffle.js";

import { getRandomCountries } from "@utils/country-parser.js";

const GAME_TIME_TIMER = 300;
const GAME_TIME_TIMER_MODE_TIME_TRIAL = 10;
const TOTAL_ANSWERS = 10;



function getAnswers(game) {
  const currentCount = game.correctAnswers;
  let newState = {
    ...game,
  };

  const currentFlag = newState.countries[newState.countryIndex];

  //* Respuesta inexistente (NOT ANSWER)
  if (game.answer == null) {
    if (!newState.incorrectFlags.includes(currentFlag)) {
      newState.incorrectFlags = [...newState.incorrectFlags, currentFlag];
    }
    newState = {
      ...newState,
      sendAnswer: false,
      correctAnswers: currentCount,
      lastAnswerType: ANSWER_TYPES.INCORRECT,
    };
    return newState;
  }

  const currAnswer = normStr(game.answer);
  const correctAnswer = normStr(currentFlag);

  // *Respuesta completa
  if (currAnswer.length === correctAnswer.length) {
    if (currAnswer === correctAnswer) {
      // ✅ Respuesta correcta
      // Agregar a correctFlags (sin duplicados)
      if (!newState.correctFlags.includes(currentFlag)) {
        newState.correctFlags = [...newState.correctFlags, currentFlag];
      }

      // 🔹 Eliminar de incorrectFlags si estaba
      newState.incorrectFlags = newState.incorrectFlags.filter(
        (flag) => flag !== currentFlag
      );

      newState = {
        ...newState,
        sendAnswer: false,
        correctAnswers: currentCount + 1,
        lastAnswerType: ANSWER_TYPES.CORRECT,
      };
    } else {
      // ❌ Respuesta incorrecta pero completa
      if (!newState.incorrectFlags.includes(currentFlag)) {
        newState.incorrectFlags = [...newState.incorrectFlags, currentFlag];
      }
      newState = {
        ...newState,
        sendAnswer: false,
        correctAnswers: currentCount,
        lastAnswerType: ANSWER_TYPES.INCORRECT,
      };
    }
  } else {
    //* Respuesta incompleta
    newState = {
      ...newState,
      sendAnswer: false,
      lastAnswerType: ANSWER_TYPES.INCOMPLETE,
    };
  }

  return newState;
}


function newGame(game) {
  return {
    ...game,
    newGameId: Date.now(),
    correctAnswers: 0,
    // Desordenar países
    countries: shuffle(game.countries),
    answer: "",
    correctFlags: [],
    incorrectFlags: [],
    remainingAnswers: TOTAL_ANSWERS,
    totalAnswers: TOTAL_ANSWERS,
    countryIndex: 0,
    completed: false,
    won: false,
    timer: {
      ...game.timer,
      time: GAME_TIME_TIMER,
      // Tiempo inicial en segundos
      initialTime: Date.now(),
    },
    modes: {
      ...game.modes,
      multipleChoice: {
        ...game.modes.multipleChoice,
        showOptions: false,
      },
    }

    /* 
      initState.modes = {
        multipleChoice: {
          options: getOptions(initState.countries[0], initState.countries),
          showOptions: false,
        },
      };
    */
  };
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
    let correctCountry = newState.countries[newState.countryIndex];
    // Agregar país actual a correctFlags
    newState.correctFlags = [...newState.correctFlags, correctCountry];
    newState.incorrectFlags = newState.incorrectFlags.filter(
      (c) => c !== correctCountry
    );

    newState = {
      ...newState,
      ...{
        sendAnswer: false,
        correctAnswers: currentCount + 1,
        remainingAnswers: game.remainingAnswers - 1,
        lastAnswerType: ANSWER_TYPES.CORRECT,
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
        lastAnswerType: ANSWER_TYPES.INCORRECT,
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

let continentStorage = JSON.parse(localStorage.getItem("game.continent")) ?? "all";
let initState = {
  continent: continentStorage,
  // Esto es temporal, ya que en un principio se va a abrir Presentation y se va a elegir el continente o este va a estar guardado en el localStorage
  countries: getRandomCountries(continentStorage, -1),
  // countries: ["Argentina","Colombia", "Chile"],
  countryIndex: 0,
  answer: "",
  sendAnswer: false,
  correctAnswers: 0,
  correctFlags: [],
  incorrectFlags: [],
  remainingAnswers: TOTAL_ANSWERS,
  totalAnswers: TOTAL_ANSWERS,
  completed: false,
  won: false,
  // isNewGame: false,
  newGameId: Date.now(),
  lastAnswerType: ANSWER_TYPES.INCOMPLETE,
  skip: false,
  mode: "", // Modo inicial, classic, record, time-trial
  modes: null,
  timer: {
    time: GAME_TIME_TIMER,
    reset: false,
    initialTime: null,
    finalTime: null,
    discount: false,
    pause: null,
  },
  firstSessionLaunch: true,
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
    return newGame(game);
  },
  [ACTIONS.GAME_COMPLETED]: (game) => {
    return {
      ...game,
      completed: true,
      timer: {
        ...game.timer,
        // Tiempo final en segundos
        finalTime: Date.now(),
      },
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
      skip: false,
    };
  },

  [ACTIONS.NEXT_COUNTRY_CLASSIC]: (game) => {
    return {
      ...game,
      countryIndex: nextIndex(game.countryIndex, game.countries.length),
      // remainingAnswers: game.remainingAnswers - 1,
      answer: "",
      skip: false,
    };
  },

  [ACTIONS.SKIP_COUNTRY]: (game) => {
    return {
      ...game,
      skip: true,
      remainingAnswers: game.remainingAnswers - 1,
    };
  },

  [ACTIONS.SET_CONTINENT]: (game, action) => {
    const continent = action.payload; // 👈 extraemos continent
    let newState = {
      ...game,
    };

    // Modificar el nuevo estado según si el continente cambió
    if (newState.continent !== continent) {
      newState = {
        ...newState,
        continent,
        countries: getRandomCountries(continent, -1),
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
  [ACTIONS.SEND_NOT_ANSWER]: (game) => {
    return getAnswers(game);
  },
  [ACTIONS.SEND_NOT_ANSWER_CLASSIC]: (game) => {
    return {
      ...game,
      ...{
        sendAnswer: false,
        remainingAnswers: game.remainingAnswers - 1,
        lastAnswerType: ANSWER_TYPES.INCORRECT,
      },
    };
  },

  // Mode: Multiple choice
  [ACTIONS.NEW_GAME_CLASSIC]: (game) => {
    let newGameSate = newGame(game)
    const { countries, countryIndex, totalAnswers } = newGameSate;

    const take = Math.min(totalAnswers, countries.length - 1); // no puedo tomar el actual
    const incorrectFlags = Array.from({ length: take }, (_, i) => {
      const idx = (countryIndex + i) % countries.length;
      return countries[idx];
    });

    return {
      ...newGameSate,
      incorrectFlags,     // los 10 siguientes
    };
  },
  [ACTIONS.SEND_ANSWER_CLASSIC]: (game) => {
    return getAnswersChoice(game);
  },
  [ACTIONS.SHOW_OPTIONS_CLASSIC]: (game) => {
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
  [ACTIONS.HIDE_OPTIONS_CLASSIC]: (game) => {
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
  [ACTIONS.SET_GAME_MODE]: (game, action) => {
    return {
      ...game,
      mode: action.payload,
    };
  },

  // Modo record
  [ACTIONS.NEW_GAME_RECORD]: (game) => {
    return {
      ...newGame(game),
      remainingAnswers: game.countries.length,
      totalAnswers: game.countries.length,
    };
  },

  // Modo time-trial
  [ACTIONS.NEW_GAME_TIME_TRIAL]: (game) => {
    const newState = newGame(game);
    return {
      ...newState,
      timer: {
        ...newState.timer,
        time: GAME_TIME_TIMER_MODE_TIME_TRIAL,
      },
    };
  },

  // Timer
  [ACTIONS.RESET_TIMER]: (game, action) => {
    return {
      ...game,
      timer: {
        ...game.timer,
        reset: action.payload,
      },
    };
  },
  [ACTIONS.DISCOUNT_TIMER]: (game) => {
    return {
      ...game,
      timer: {
        ...game.timer,
        discount: !game.timer.discount,
      },
    };
  },
  [ACTIONS.SET_TIMER]: (game, action) => {
    return {
      ...game,
      timer: {
        ...game.timer,
        time: action.payload,
      },
    };
  },
  [ACTIONS.PAUSE_TIMER]: (game) => {
    return {
      ...game,
      timer: {
        ...game.timer,
        pause: true,
      },
    };
  },
  [ACTIONS.CLEAR_PAUSE_TIMER]: (game) => {
    return {
      ...game,
      timer: {
        ...game.timer,
        pause: false,
      },
    };
  },


  [ACTIONS.SET_ANSWER_TYPE]: (game, action) => {
    return {
      ...game,
      lastAnswerType: action.payload,
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function gameReducer(game = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(game, action) : game;
}

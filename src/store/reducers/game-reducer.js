import { ACTIONS } from "@constants/action-types.js";

import { normStr } from "@utils/string-parser.js";
import { nextIndex } from "@utils/circular-counter.js";

import { getRandomCountries } from "@utils/country-parser.js";

const GAME_TIME_TIMER = 600;
const GAME_TIME_TIMER_MODE_TIME_TRIAL = 10;
const TOTAL_ANSWERS = 10;



function getAnswers(game) {
  const currentCount = game.correctAnswers;
  let newState = {
    ...game,
  };

  if (game.answer == null) {
    newState.incorrectFlags = [
      ...newState.incorrectFlags,
      newState.countries[newState.countryIndex],
    ];
    // *Respuesta incorrecta pero completa
    // Esto en el modo clasico comun ahora no resta puntos ni países a. adivinar por el momento.
    newState = {
      ...newState,
      ...{
        sendAnswer: false,
        correctAnswers: currentCount,
        lastAnswerType: "Incorrect",
      },
    };
    return newState;
  }

  let currAnswer = normStr(game.answer);
  let correctAnswer = normStr(game.countries[game.countryIndex]);

  // Verificar el tipo de respuesta
  //* El usuario no respondió. Ocurre cuando se acaba el tiempo.

  // *Respuesta completa
  if (currAnswer.length == correctAnswer.length) {
    // *Respuesta correcta
    if (currAnswer == correctAnswer) {
      // Agregar país actual a correctFlags
      newState.correctFlags = [
        ...newState.correctFlags,
        newState.countries[newState.countryIndex],
      ];
      newState = {
        ...newState,
        ...{
          sendAnswer: false,
          correctAnswers: currentCount + 1,
          // remainingAnswers: game.remainingAnswers - 1,
          lastAnswerType: "Correct",
        },
      };
    } else {
      // Agregar país actual a incorrectFlags
      newState.incorrectFlags = [
        ...newState.incorrectFlags,
        newState.countries[newState.countryIndex],
      ];
      // *Respuesta incorrecta pero completa
      // Esto en el modo clasico comun ahora no resta puntos ni países a. adivinar por el momento.
      newState = {
        ...newState,
        ...{
          sendAnswer: false,
          correctAnswers: currentCount,
          // remainingAnswers: game.remainingAnswers - 1,
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

function newGame(game) {
  return {
    ...game,
    correctAnswers: 0,
    answer: "",
    correctFlags: [],
    incorrectFlags: [],
    remainingAnswers: TOTAL_ANSWERS,
    totalAnswers: TOTAL_ANSWERS,
    countryIndex: nextIndex(game.countryIndex, game.countries.length),
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
  correctFlags: ["Argentina", "Brasil", "Paraguay", "Chile", "Perú"],
  incorrectFlags: ["Colombia", "Venezuela", "Uruguay", "Ecuador", "Bolivia"],
  remainingAnswers: TOTAL_ANSWERS,
  totalAnswers: TOTAL_ANSWERS,
  completed: false,
  won: false,
  isNewGame: false,
  lastAnswerType: "Incomplete",
  skip: false,
  mode: "classic",
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

  [ACTIONS.NEXT_COUNTRY_MULTIPLE_CHOICE]: (game) => {
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
  [ACTIONS.SEND_NOT_ANSWER]: (game) => {
    return getAnswers(game);
  },
  [ACTIONS.SEND_NOT_ANSWER_MULTIPLE_CHOICE]: (game) => {
    return {
      ...game,
      ...{
        sendAnswer: false,
        remainingAnswers: game.remainingAnswers - 1,
        lastAnswerType: "Incorrect",
      },
    };
  },

  // Mode: Multiple choice
  [ACTIONS.NEW_GAME_MULTIPLE_CHOICE]: (game) => {
    // Selecciona la cantidad de países a responder desde countryIndex
    let { countries, countryIndex, totalAnswers } = game;

    // TODO: esto es un parche temporal. Corregir. Esto se hace porque después de crear un juego, se hace la acción de pasar al siguiente país (indice 1) en vez del país de índice 0. Al parecer esto no lo envía ninguna acción en sí pero alguna parte está modificando el índice lo que hace que cuando se inicia un juego se inicie en el país de índice 1, es decir el segundo país. Corregir para que se inicie en el primero (0) y haga la animación de entrada de una bandera además.
    countryIndex = nextIndex(game.countryIndex, game.countries.length);

    const selectedCountries = Array.from({ length: totalAnswers }, (_, i) => {
      // desplazamiento circular
      const idx = (countryIndex + i) % countries.length;
      return countries[idx];
    });

    return {
      ...newGame(game),
      incorrectFlags: selectedCountries,
    };
  },
  [ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE]: (game) => {
    return getAnswersChoice(game);
  },
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

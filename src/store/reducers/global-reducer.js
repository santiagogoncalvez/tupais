import { ACTIONS } from "@constants/action-types.js";

import { normStr } from "@utils/string-parser.js";
import { prevIndex, nextIndex } from "@utils/circular-counter.js";

import { getRandomCountries } from "@utils/country-parser.js";


function getCorrectAnswersUpdate(state) {
  const currentCount = state.game.correctAnswers;
  let def = {
    ...state,
  };

  let currAnswer = normStr(state.game?.answer);
  let correctAnswer = normStr(state.game.countries[state.game.countryIndex]);

  // Verificar el tipo de respuesta
  // *Respuesta completa
  if (currAnswer.length == correctAnswer.length) {
    // *Respuesta correcta
    if (currAnswer == correctAnswer) {
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
          notifications: {
            ...def.ui.notifications,
            message: "Correcto",
          },
        },
      };
    } else {
      // *Respuesta incorrecta pero completa
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
          notifications: {
            ...def.ui.notifications,
            message: "Incorrecto",
          },
        },
      };
    }
  } else {
    //* Respuesta incompleta
    def.ui = {
      ...def.ui,
      ...{
        sendAnswer: false,
        notifications: {
          ...def.ui.notifications,
          message: "Respuesta incompleta",
        },
      },
    };
    def.game = {
      ...def.game,
      ...{
        sendAnswer: false,
      },
    };
  }

  // Verificar si el juego se completó
  if (def.game.remainingAnswers <= 0) {
    def.game = {
      ...def.game,
      // Si el juego se completó restar uno al índice lo que significaría mantener sin cambios el índice para que este aumento lo haga NEW_GAME.
      countryIndex: prevIndex(def.game.countryIndex, def.game.countries.length),
      completed: true,
    };

    // Si el juego terminó mostrar el modal GameOver
    def.ui = {
      ...def.ui,
      modals: {
        ...def.ui.modals,
        gameOver: { show: true },
      },
    };
  }

  // Verificar si el juego ha sido ganado
  if (def.game.correctAnswers >= state.game.totalAnswers) {
    def.game = { ...def.game, won: true };
  }

  return def;
}

const reducerMap = {
  //* UI
  [ACTIONS.OPEN_PRESENTATION]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          presentation: {
            ...state.ui.modals.presentation,
            show: true,
          },
        },
      },
    };
  },
  [ACTIONS.CLOSE_PRESENTATION]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          presentation: {
            ...state.ui.modals.presentation,
            show: false,
          },
        },
      },
    };
  },
  [ACTIONS.OPEN_SETTINGS]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          settings: {
            ...state.ui.modals.settings,
            show: true,
          },
        },
      },
    };
  },
  [ACTIONS.CLOSE_SETTINGS]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          settings: {
            ...state.ui.modals.settings,
            show: false,
          },
        },
      },
    };
  },
  [ACTIONS.TOGGLE_DARK_MODE]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        darkMode: !state.ui.darkMode,
      },
    };
  },
  [ACTIONS.OPEN_GAME_OVER]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          gameOver: {
            ...state.ui.modals.gameOver,
            show: true,
          },
        },
      },
    };
  },
  [ACTIONS.CLOSE_GAME_OVER]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        modals: {
          ...state.ui.modals,
          gameOver: {
            ...state.ui.modals.gameOver,
            show: false,
          },
        },
      },
    };
  },
  [ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        continentSelector: {
          ...state.ui.continentSelector,
          options: {
            show: true,
          },
        },
      },
    };
  },
  [ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        continentSelector: {
          ...state.ui.continentSelector,
          options: {
            show: false,
          },
        },
      },
    };
  },
  [ACTIONS.SHOW_BACKDROP]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        backdrop: { show: true },
      },
    };
  },
  [ACTIONS.HIDE_BACKDROP]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        backdrop: { show: false },
      },
    };
  },
  [ACTIONS.OPEN_NAVBAR]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        navbar: {
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_NAVBAR]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        navbar: {
          show: false,
        },
      },
    };
  },
  [ACTIONS.SHOW_NOTIFICATION]: (state) => {
    // Esta parte del código debe encargarse solo de mostrar
    return {
      ...state,
      ui: {
        ...state.ui,
        notifications: {
          ...state.ui.notifications,
          show: true,
          id: Date.now(),
        },
      },
    };
  },
  [ACTIONS.HIDE_NOTIFICATION]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        notifications: {
          ...state.ui.notifications,
          show: false,
        },
      },
    };
  },
  [ACTIONS.SET_CONTINENT_SELECTOR_OPTION]: (state, action) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        continentSelector: {
          ...state.ui.continentSelector,
          selectedOption: action.payload,
        },
      },
    };
  },
  [ACTIONS.START_COUNTRY_ANIMATION]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        country: {
          ...state.ui.country,
          animation: true,
        },
      },
    };
  },
  [ACTIONS.STOP_COUNTRY_ANIMATION]: (state) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        country: {
          ...state.ui.country,
          animation: false,
        },
      },
    };
  },

  //* GAME
  [ACTIONS.NEW_GAME]: (state) => {
    return {
      ...state,
      // TODO: separar responsabilidad UI "country" y agregar su respectivo despacho en las funciones que mandan una acción NEW_GAME
      game: {
        ...state.game,
        correctAnswers: 0,
        answer: "",
        correctFlags: [],
        remainingAnswers: 2,
        countryIndex: nextIndex(
          state.game.countryIndex,
          state.game.countries.length
        ),
        completed: false,
        won: false,
      },
    };
  },
  [ACTIONS.NEXT_COUNTRY]: (state) => {
    return {
      ...state,
      game: {
        ...state.game,
        countryIndex: nextIndex(
          state.game.countryIndex,
          state.game.countries.length
        ),
        answer: "",
      },
    };
  },
  [ACTIONS.SET_CONTINENT]: (state) => {
    let newState = {
      ...state,
    };

    // Modificar el nuevo estado según si el continente cambió
    if (
      newState.game.continent != newState.ui.continentSelector.selectedOption
    ) {
      newState.game = {
        ...newState.game,
        continent: newState.ui.continentSelector.selectedOption,
        countries: getRandomCountries(
          newState.ui.continentSelector.selectedOption,
          -1
        ),
      };
      newState.game = {
        ...newState.game,
        countryIndex: newState.game.countries.length - 1,
      };
    }

    return newState;
  },
  [ACTIONS.SET_ANSWER]: (state, action) => {
    return {
      ...state,
      game: {
        ...state.game,
        answer: action.payload,
      },
    };
  },
  [ACTIONS.SEND_ANSWER]: (state) => {
    return getCorrectAnswersUpdate(state);
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function globalReducer(state, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(state, action) : state;
}

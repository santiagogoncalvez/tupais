import { ACTIONS } from "@constants/action-types.js";

import {
  uiReducer,
  initialState as uiInit,
} from "@store/reducers/ui-reducer.js";
import {
  gameReducer,
  initialState as gameInit,
} from "@store/reducers/game-reducer.js";
import {
  statsReducer,
  initialState as statsInit,
} from "@store/reducers/stats-reducer.js";

// Estado inicial global
const initialState = {
  ui: uiInit,
  game: gameInit,
  stats: statsInit,
};

export const checkFirstLaunch = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.CLOSE_PRESENTATION) {
    const state = store.getState();
    if (state.ui.firstLaunch) {
      store.dispatch({ type: ACTIONS.SET_FIRST_LAUNCH, payload: false });
      const state = store.getState();
      console.log("Gardar firstLaunch en localStorage");
      localStorage.setItem(
        "ui.firstLaunch",
        JSON.stringify(state.ui.firstLaunch)
      );
    }
  }

  return result;
};

export const checkSendAnswer = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER) {
    const state = store.getState();
    // Verificar si el juego se completo
    if (state.game.correctAnswers == state.game.remainingAnswers) {
      const state = store.getState();
      // Verificar si el juego además se ganó
      if (state.game.correctAnswers >= state.game.totalAnswers) {
        store.dispatch({ type: ACTIONS.GAME_WON });
      }

      store.dispatch({ type: ACTIONS.GAME_COMPLETED });
    } else {
      // Siguiente país de forma común.
      if (state.game.lastAnswerType !== "Incomplete") {
        store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
      }
    }
  }

  return result;
};

export const checkNewGame = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (
    action.type === ACTIONS.NEW_GAME ||
    action.type === ACTIONS.NEW_GAME_MULTIPLE_CHOICE ||
    action.type === ACTIONS.NEW_GAME_RECORD ||
    action.type === ACTIONS.NEW_GAME_TIME_TRIAL
  ) {
    store.dispatch({ type: ACTIONS.RESET_TIMER });
    store.dispatch({ type: ACTIONS.RESET_TIMER });
  }

  return result;
};

export const checkGameCompleted = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.GAME_COMPLETED) {
    // Actualizar Stats
    const state = store.getState();
    if (state.game.won) {
      store.dispatch({ type: ACTIONS.STATS.GAME_WON });
    } else {
      store.dispatch({ type: ACTIONS.STATS.GAME_LOST });
    }

    setTimeout(() => {
      // Abrir modal de juego terminado.
      store.dispatch({ type: ACTIONS.OPEN_GAME_OVER });
    }, 1000);
  }

  return result;
};

// Mode Multiple choice
export const checkSendAnswerMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE) {
    const state = store.getState();
    // Verificar si el juego se completo
    if (state.game.remainingAnswers <= 0) {
      const state = store.getState();
      // Verificar si el juego además se ganó
      if (state.game.correctAnswers == state.game.totalAnswers) {
        store.dispatch({ type: ACTIONS.GAME_WON });
      }

      store.dispatch({ type: ACTIONS.GAME_COMPLETED });
    } else {
      // Siguiente país de forma común.
      store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });

      /* 
      Si no se quiere detectar la animación se tiene que ejecutar desde acá la acción ACTIONS.NEXT_COUNTRY, ya que sino necesita un pequeño delay para poder pintarse de manera adecuada el dom.
      store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
      */
    }
  }

  return result;
};

export const checkSendNotAnswerMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_NOT_ANSWER) {
    // Siguiente país de forma común.
    store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
  }

  return result;
};

export const checkAnimateCorrectMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.STOP_ANIMATE_CORRECT_OPTION) {
    // Esto debe ocurrir después de la animación
    store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
  }

  return result;
};

export const checkNextCountryMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.NEXT_COUNTRY) {
    console.log("Detectando NEXT_COUNTRY");
    store.dispatch({ type: ACTIONS.HIDE_OPTIONS_MULTIPLE_CHOICE });
    setTimeout(() => {
      store.dispatch({ type: ACTIONS.SHOW_OPTIONS_MULTIPLE_CHOICE });
    }, 150);
  }

  return result;
};
export const checkNewGameMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.NEW_GAME_MULTIPLE_CHOICE) {
    store.dispatch({ type: ACTIONS.HIDE_OPTIONS_MULTIPLE_CHOICE });
    setTimeout(() => {
      store.dispatch({ type: ACTIONS.SHOW_OPTIONS_MULTIPLE_CHOICE });
    }, 150);
  }

  return result;
};

// Mode Record
export const checkSendAnswerRecord = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER) {
    const state = store.getState();
    // Verificar si el juego se completo
    if (state.game.lastAnswerType === "Incorrect") {
      store.dispatch({ type: ACTIONS.GAME_COMPLETED });
      return;
    }

    if (state.game.correctAnswers == state.game.remainingAnswers) {
      const state = store.getState();
      // Verificar si el juego además se ganó
      if (state.game.correctAnswers >= state.game.totalAnswers) {
        store.dispatch({ type: ACTIONS.GAME_WON });
      }

      store.dispatch({ type: ACTIONS.GAME_COMPLETED });
    } else {
      // Siguiente país de forma común.
      if (state.game.lastAnswerType !== "Incomplete") {
        store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
      }
    }
  }

  return result;
};

// Modo Time-trial
export const checkSendAnswerTT = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER) {
    const state = store.getState();
    // Verificar si el juego además se ganó
    if (state.game.correctAnswers != state.game.remainingAnswers) {
      if (state.game.lastAnswerType === "Correct") {
        store.dispatch({ type: ACTIONS.RESET_TIMER });
        store.dispatch({ type: ACTIONS.RESET_TIMER });
      }
    }
  }

  return result;
};

export const checkNextCountryTT = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER) {
    const state = store.getState();
    if (state.game.lastAnswerType !== "Correct" || state.game.skip) {
      store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
      store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
    }
  }

  if (action.type === ACTIONS.SKIP_COUNTRY) {
    store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
    store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
  }

  return result;
};

// Stats
export const persistStatsMiddleware = (store) => (next) => (action) => {
  const result = next(action); // deja que el reducer procese
  const state = store.getState();

  // Podés filtrar acciones relevantes (ej: solo STATS/*)
  if (action.type.startsWith("stats/")) {
    localStorage.setItem("stats", JSON.stringify(state.stats));
  }

  return result;
};

// RootReducer manual: delega la acción a cada reducer.
export function rootReducer(state, action) {
  // Reducers independientes
  let nextUi = uiReducer(state.ui, action);
  let nextGame = gameReducer(state.game, action);
  let nextStats = statsReducer(state.stats, action);

  // Retorno del estado combinado
  return {
    ui: nextUi,
    game: nextGame,
    stats: nextStats,
  };
}

// Store simple
export function createStore(reducer, middlewares = []) {
  let state = initialState;
  const listeners = [];

  const store = {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      console.log("Action:\n", action, "\nNew state:\n", state);

      listeners.forEach((listener) => listener(state));
      return action;
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };

  // Apply middlewares
  let dispatch = store.dispatch;
  middlewares
    .slice()
    .reverse()
    .forEach((middleware) => {
      dispatch = middleware(store)(dispatch);
    });
  store.dispatch = dispatch;

  return store;
}

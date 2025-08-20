import { ACTIONS } from "@constants/action-types.js";

import {
  uiReducer,
  initialState as uiInit,
} from "@store/reducers/ui-reducer.js";
import {
  gameReducer,
  initialState as gameInit,
} from "@store/reducers/game-reducer.js";

// Estado inicial global
const initialState = {
  ui: uiInit,
  game: gameInit,
};

// Game middleware
export const checkSendAnswer = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER) {
    const state = store.getState();
    // Verificar si el juego se completo
    if (state.game.remainingAnswers <= 0) {
      store.dispatch({ type: ACTIONS.GAME_COMPLETED });

      const state = store.getState();
      // Verificar si el juego además se ganó
      if (state.game.correctAnswers >= state.game.totalAnswers) {
        store.dispatch({ type: ACTIONS.GAME_WON });
      }
    } else {
      // Siguiente país de forma común.
      console.log("Siguiente país");
      store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
    }
  }

  return result;
};

export const checkGameCompleted = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.GAME_COMPLETED) {
    setTimeout(() => {
      store.dispatch({ type: ACTIONS.OPEN_GAME_OVER });
    }, 1000);
  }

  return result;
};

// Multiple choice
export const checkSendAnswerMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE) {
    const state = store.getState();
    // Verificar si el juego se completo
    if (state.game.remainingAnswers <= 0) {
      store.dispatch({ type: ACTIONS.GAME_COMPLETED });

      const state = store.getState();
      // Verificar si el juego además se ganó
      if (state.game.correctAnswers >= state.game.totalAnswers) {
        store.dispatch({ type: ACTIONS.GAME_WON });
      }
    } else {
      // Siguiente país de forma común.
      console.log("Siguiente país");
      store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
    }
  }

  return result;
};
export const checkNextCountryMC = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.NEXT_COUNTRY) {
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
  if (action.type === ACTIONS.NEW_GAME) {
    store.dispatch({ type: ACTIONS.HIDE_OPTIONS_MULTIPLE_CHOICE });
    setTimeout(() => {
      store.dispatch({ type: ACTIONS.SHOW_OPTIONS_MULTIPLE_CHOICE });
    }, 150);
  }

  return result;
};

// RootReducer manual: delega la acción a cada reducer.
export function rootReducer(state, action) {
  // Reducers independientes
  let nextUi = uiReducer(state.ui, action);
  let nextGame = gameReducer(state.game, action);

  // Retorno del estado combinado
  return {
    ui: nextUi,
    game: nextGame,
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

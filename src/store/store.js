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
export const checkGameCompletion = (store) => (next) => (action) => {
  // Pasamos la acción primero para actualizar el estado
  const result = next(action);

  // Coordinación entre estados
  if (action.type === ACTIONS.SEND_ANSWER) {
    const state = store.getState();
    if (state.game.remainingAnswers <= 0) {
      store.dispatch({ type: ACTIONS.OPEN_GAME_OVER });
    }
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

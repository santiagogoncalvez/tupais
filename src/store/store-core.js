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
routerReducer
import {
    routerReducer,
    initialState as routerInit,
} from "@store/reducers/router-reducer.js";
// Estado inicial global
const initialState = {
    ui: uiInit,
    game: gameInit,
    stats: statsInit,
    router: routerInit
};

// RootReducer manual: delega la acción a cada reducer.
export function rootReducer(state, action) {
    // Reducers independientes
    let nextUi = uiReducer(state.ui, action);
    let nextGame = gameReducer(state.game, action);
    let nextStats = statsReducer(state.stats, action);
    let nextRouter = routerReducer(state.router, action);


    // Retorno del estado combinado
    return {
        ui: nextUi,
        game: nextGame,
        stats: nextStats,
        router: nextRouter
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
            console.log(new Date().toLocaleTimeString(), "\nAction:\n", action, "\nNew state:\n", state);

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
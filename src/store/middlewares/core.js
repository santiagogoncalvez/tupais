import { ACTIONS } from "@constants/action-types.js";
import {
    BASE_PATH
} from "@constants/base-path.js";

// --- Middleware de primer lanzamiento ---
export const checkFirstLaunch = (store) => (next) => (action) => {
    const result = next(action);

    if (action.type === ACTIONS.CLOSE_PRESENTATION) {
        const state = store.getState();
        if (state.ui.firstLaunch) {
            store.dispatch({ type: ACTIONS.SET_FIRST_LAUNCH, payload: false });
            localStorage.setItem("ui.firstLaunch", JSON.stringify(false));
        }
    }

    return result;
};

// --- Middleware para mostrar notificación cuando se envía una respuesta ---
export const checkSendAnswerNotification = (store) => (next) => (action) => {
    const result = next(action);

    if (
        action.type === ACTIONS.SEND_ANSWER ||
        action.type === ACTIONS.SEND_ANSWER_MULTIPLE_CHOICE
    ) {
        const state = store.getState();
        store.dispatch({
            type: ACTIONS.SHOW_NOTIFICATION,
            payload: state.game.lastAnswerType,
        });
    }

    return result;
};

// --- Middleware de juego completado ---
export const checkGameCompleted = (store) => (next) => (action) => {
    const result = next(action);

    if (action.type === ACTIONS.GAME_COMPLETED) {
        const state = store.getState();
        if (state.game.won) {
            store.dispatch({ type: ACTIONS.STATS.GAME_WON });
        } else {
            store.dispatch({ type: ACTIONS.STATS.GAME_LOST });
        }

        setTimeout(() => {
            store.dispatch({ type: ACTIONS.OPEN_GAME_OVER });
        }, 1000);
    }

    return result;
};

// --- Persistencia de stats ---
export const persistStatsMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type.startsWith("stats/")) {
        const state = store.getState();
        localStorage.setItem("stats", JSON.stringify(state.stats));
    }
    return result;
};

// --- Router middleware ---
export const routerMiddleware = (store) => (next) => (action) => {
    if (action.type === ACTIONS.NAVIGATE_TO) {
        // acá podrías agregar logging, analytics, validaciones, etc.
        console.log("[Router]", "Navegando a:", action.payload);
    }
    return next(action);
};

export const checkNewGame = (store) => (next) => (action) => {
    const result = next(action);
    if (
        action.type === ACTIONS.NEW_GAME ||
        action.type === ACTIONS.NEW_GAME_MULTIPLE_CHOICE || action.type === ACTIONS.NEW_GAME_RECORD ||
        action.type === ACTIONS.NEW_GAME_TIME_TRIAL
    ) {
        store.dispatch({ type: ACTIONS.RESET_TIMER, payload: Date.now() });
    }
    return result;
};

// Agrupado
export const coreMiddlewares = [
    checkFirstLaunch,
    checkGameCompleted,
    checkSendAnswerNotification,
    persistStatsMiddleware,
    // routerMiddleware,
    checkNewGame
];

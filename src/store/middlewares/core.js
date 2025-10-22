import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

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
        action.type === ACTIONS.SEND_ANSWER_CLASSIC ||
        action.type === ACTIONS.SKIP_COUNTRY
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

        // Si se sale de la pestaña de la app esto está generando que se abra el modal recién cuando se entre de vuelta, ya que cuando se sale de las pestañas se pausan los setTimeout, entonces esto se activa recién cuando se entra de vuelta.
        // setTimeout(() => {
            store.dispatch({ type: ACTIONS.OPEN_GAME_OVER });
            store.dispatch({ type: ACTIONS.STOP_COUNTRY_ANIMATION });
        // }, 1000);
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

// --- Persistencia de Continent ---
export const persistContinentMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SET_CONTINENT) {
        const state = store.getState();
        localStorage.setItem("game.continent", JSON.stringify(state.game.continent));
    }
    return result;
};

// --- Persistencia de historial de búsquedas ---
export const persistSearchHistoryMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.GALLERY_SEARCH_HISTORY_SET) {
        const state = store.getState();
        localStorage.setItem("search.flagGalleryHistory", JSON.stringify(state.search.flagGalleryHistory));
    }
    return result;
};

// --- Persistencia del Modo oscruro ---
export const persistDarkMode = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.TOGGLE_DARK_MODE) {
        const state = store.getState();
        localStorage.setItem("ui.darkMode", JSON.stringify(state.ui.darkMode));
    }
    return result;
};

// --- Router middleware ---
export const routerMiddleware = (store) => (next) => (action) => {
    if (action.type === ACTIONS.NAVIGATE_TO) {
        // acá podrías agregar logging, analytics, validaciones, etc.
        // console.log("[Router]", "Navegando a:", action.payload);
    }
    return next(action);
};

export const checkNewGame = (store) => (next) => (action) => {
    const result = next(action);
    if (
        action.type === ACTIONS.NEW_GAME ||
        action.type === ACTIONS.NEW_GAME_CLASSIC || action.type === ACTIONS.NEW_GAME_RECORD ||
        action.type === ACTIONS.NEW_GAME_TIME_TRIAL
    ) {
        store.dispatch({ type: ACTIONS.RESET_TIMER, payload: Date.now() });
    }
    return result;
};

export const checkStartButton = (store) => (next) => (action) => {
    if (action.type === ACTIONS.START_BUTTON_CLICKED) {
        const state = store.getState();
        const { continent } = action.payload;

        // Setear continente
        store.dispatch({
            type: ACTIONS.SET_CONTINENT,
            payload: continent,
        });

        // Arrancar juego según modo
        const mode = state.game.mode;
        if (mode === GAME_MODES.CHALLENGE) {
            store.dispatch({ type: ACTIONS.NEW_GAME });
        }
        if (mode === GAME_MODES.CLASSIC) {
            store.dispatch({ type: ACTIONS.NEW_GAME_CLASSIC });
        }
        if (mode === GAME_MODES.RECORD) {
            store.dispatch({ type: ACTIONS.NEW_GAME_RECORD });
        }
        if (mode === GAME_MODES.TIME_TRIAL) {
            store.dispatch({ type: ACTIONS.NEW_GAME_TIME_TRIAL });
        }

        // 🔥 Detectar qué modal está abierto
        const openModal = Object.entries(state.ui.modals).find(
            ([, modal]) => modal.show === true
        );

        if (openModal) {
            const [modalName] = openModal;
            store.dispatch({
                type: ACTIONS.CLOSE_MODAL,
                payload: modalName, // ej: "presentation", "settings", "gameOver"
            });
        }

    }

    return next(action);
};


// Agrupado
export const coreMiddlewares = [
    checkFirstLaunch,
    checkGameCompleted,
    checkSendAnswerNotification,
    persistStatsMiddleware,
    persistContinentMiddleware,
    persistSearchHistoryMiddleware,
    persistDarkMode,
    // routerMiddleware,
    checkStartButton,
    checkNewGame
];

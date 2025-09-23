import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerMC = (store) => (next) => (action) => {
    const result = next(action);
    // TODO: resolver problema al saltear todas las respuestas. Ahora si se sigue apretando se puede saltear de manera infinita y solo puede saltearse hasta el número state.game.totalAnswers.
    if (action.type === ACTIONS.SEND_ANSWER_CLASSIC ||
        action.type === ACTIONS.SKIP_COUNTRY
    ) {
        const state = store.getState();
        if (state.game.mode !== "classic") return result;

        if (state.game.remainingAnswers <= 0) {
            if (state.game.correctAnswers == state.game.totalAnswers) {
                store.dispatch({ type: ACTIONS.GAME_WON });
            }
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        } else {
            store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
        }
    }
    return result;
};

export const checkSendNotAnswerMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_NOT_ANSWER) {
        store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
    }
    return result;
};

export const checkAnimateCorrectMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.STOP_ANIMATE_CORRECT_OPTION) {
        store.dispatch({ type: ACTIONS.NEXT_COUNTRY_CLASSIC });
    }
    return result;
};

export const checkNextCountryMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.NEXT_COUNTRY_CLASSIC) {
        store.dispatch({ type: ACTIONS.HIDE_OPTIONS_CLASSIC });
        setTimeout(() => {
            store.dispatch({ type: ACTIONS.SHOW_OPTIONS_CLASSIC });
        }, 150);
    }
    return result;
};

export const checkNewGameMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.NEW_GAME_CLASSIC) {
        store.dispatch({ type: ACTIONS.HIDE_OPTIONS_CLASSIC });
        setTimeout(() => {
            store.dispatch({ type: ACTIONS.SHOW_OPTIONS_CLASSIC });
        }, 150);
    }
    return result;
};

export const multipleChoiceMiddlewares = [
    checkSendAnswerMC,
    checkSendNotAnswerMC,
    checkAnimateCorrectMC,
    checkNextCountryMC,
    checkNewGameMC,
];

import { ACTIONS } from "@constants/action-types.js";
import { GAME_MODES } from "@constants/game-modes.js";


export const checkSendNotAnswerMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_NOT_ANSWER) {
        const state = store.getState();
        if (state.game.mode === GAME_MODES.CHALLENGE) return result;

        store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
    }
    return result;
};

export const checkAnimateCorrectMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.STOP_ANIMATE_CORRECT_OPTION) {
        const state = store.getState();
        if (state.game.mode === GAME_MODES.CHALLENGE) return result;

        if (state.game.remainingAnswers <= 0) {
            if (state.game.correctAnswers == state.game.totalAnswers) {
                store.dispatch({ type: ACTIONS.GAME_WON });
            }
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        } else {
            store.dispatch({ type: ACTIONS.NEXT_COUNTRY, payload: Date.now() });

        }
    }
    return result;
};

export const checkNextCountryMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.NEXT_COUNTRY) {
        const state = store.getState();
        if (state.game.mode === GAME_MODES.CHALLENGE) return result;

        store.dispatch({ type: ACTIONS.SHOW_OPTIONS_CLASSIC });
    }
    return result;
};

export const checkNewGameMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.NEW_GAME_CLASSIC || action.type === ACTIONS.NEW_GAME_RECORD || action.type === ACTIONS.NEW_GAME_TIME_TRIAL) {
        const state = store.getState();
        if (state.game.mode === GAME_MODES.CHALLENGE) return result;
        
        store.dispatch({ type: ACTIONS.SHOW_OPTIONS_CLASSIC });
    }
    return result;
};

export const multipleChoiceMiddlewares = [
    checkSendNotAnswerMC,
    checkAnimateCorrectMC,
    checkNextCountryMC,
    checkNewGameMC,
];

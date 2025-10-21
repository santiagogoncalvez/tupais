import { ANSWER_TYPES } from "@constants/answer-types.js";
import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerTT = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER_CLASSIC
        ||action.type === ACTIONS.SKIP_COUNTRY
    ) {
        const state = store.getState();
        if (state.game.mode !== GAME_MODES.TIME_TRIAL) return result;

        if (state.game.correctAnswers == state.game.totalAnswers) {
            store.dispatch({ type: ACTIONS.GAME_WON });
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        } else {
            if (state.game.lastAnswerType === ANSWER_TYPES.CORRECT) {
                store.dispatch({ type: ACTIONS.RESET_TIMER, payload: Date.now() });
                // store.dispatch({ type: ACTIONS.NEXT_COUNTRY, payload: Date.now() });
            }
            store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
        }
    }
    return result;
};

export const checkNextCountryTT = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    if (state.game.mode === GAME_MODES.TIME_TRIAL) {
        if (action.type === ACTIONS.SEND_ANSWER_CLASSIC) {
            if (state.game.lastAnswerType !== ANSWER_TYPES.CORRECT || state.game.skip) {
                store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
                store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
            }
        }

        if (action.type === ACTIONS.SKIP_COUNTRY) {
            store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
            store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
        }
    }


    return result;
};

export const timeTrialMiddlewares = [checkSendAnswerTT, checkNextCountryTT];

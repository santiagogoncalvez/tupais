import { ANSWER_TYPES } from "@constants/answer-types.js";

import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswer = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER || action.type === ACTIONS.SKIP_COUNTRY) {
        const state = store.getState();
        if (state.game.mode !== GAME_MODES.CHALLENGE) return result;

        // if (state.game.remainingAnswers <= 0) {
        //     if (state.game.correctAnswers >= state.game.totalAnswers) {
        //         store.dispatch({ type: ACTIONS.GAME_WON });
        //     }
        //     store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        // } else {
        if (state.game.lastAnswerType === ANSWER_TYPES.INCORRECT ||
            state.game.lastAnswerType === ANSWER_TYPES.CORRECT
        ) {
            store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
        }
        // }
    }
    return result;
};

export const checkAnimateCorrectChallenge = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.STOP_ANIMATE_CORRECT_OPTION) {
        const state = store.getState();
        if (state.game.mode !== GAME_MODES.CHALLENGE) return result;

        if (state.game.remainingAnswers <= 0) {
            if (state.game.correctAnswers >= state.game.totalAnswers) {
                store.dispatch({ type: ACTIONS.GAME_WON });
            }
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        } else {
            store.dispatch({ type: ACTIONS.NEXT_COUNTRY, payload: Date.now() });
        }
    }
    return result;
};

export const challengeMiddlewares = [checkSendAnswer, checkAnimateCorrectChallenge];

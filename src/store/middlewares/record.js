import { ANSWER_TYPES } from "@constants/answer-types.js";

import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerRecord = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER) {
        const state = store.getState();
        if (state.game.mode !== GAME_MODES.RECORD) return result;

        if (state.game.lastAnswerType === ANSWER_TYPES.INCORRECT) {
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
            return result;
        }

        if (state.game.correctAnswers == state.game.totalAnswers) {
            store.dispatch({ type: ACTIONS.GAME_WON });
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        } else {
            if (state.game.lastAnswerType !== ANSWER_TYPES.INCOMPLETE) {
                store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
            }
        }
    }
    return result;
};

export const recordMiddlewares = [checkSendAnswerRecord];

import { ANSWER_TYPES } from "@constants/answer-types.js";

import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerRecord = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER_CLASSIC ||
        action.type === ACTIONS.SKIP_COUNTRY) {
        const state = store.getState();
        if (state.game.mode !== GAME_MODES.RECORD) return result;
        store.dispatch({ type: ACTIONS.START_ANIMATE_CORRECT_OPTION });
    }
    return result;
};

export const recordMiddlewares = [
    checkSendAnswerRecord,
];

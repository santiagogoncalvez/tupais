import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerRecord = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER) {
        const state = store.getState();
        if (state.game.mode !== "record") return result;

        if (state.game.lastAnswerType === "Incorrect") {
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
            return result;
        }

        if (state.game.correctAnswers == state.game.remainingAnswers) {
            if (state.game.correctAnswers >= state.game.totalAnswers) {
                store.dispatch({ type: ACTIONS.GAME_WON });
            }
            store.dispatch({ type: ACTIONS.GAME_COMPLETED });
        } else {
            if (state.game.lastAnswerType !== "Incomplete") {
                store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
            }
        }
    }
    return result;
};

export const recordMiddlewares = [checkSendAnswerRecord];

import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswer = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER) {
        const state = store.getState();
        if (state.game.mode !== "classic") return result;

        if (state.game.correctAnswers == state.game.totalAnswers) {
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

export const classicMiddlewares = [checkSendAnswer];

import { GAME_MODES } from "@constants/game-modes.js";

import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerMC = (store) => (next) => (action) => {
    const result = next(action);
    // TODO: resolver problema al saltear todas las respuestas. Ahora si se sigue apretando se puede saltear de manera infinita y solo puede saltearse hasta el número state.game.totalAnswers.
    if (action.type === ACTIONS.SEND_ANSWER_CLASSIC ||
        action.type === ACTIONS.SKIP_COUNTRY
    ) {
        const state = store.getState();
        if (state.game.mode !== GAME_MODES.CLASSIC) return result;

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

export const classicMiddlewares = [
    checkSendAnswerMC,
];

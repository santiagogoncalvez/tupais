import { ACTIONS } from "@constants/action-types.js";

export const checkSendAnswerTT = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.SEND_ANSWER) {
        const state = store.getState();
        if (state.game.mode !== "time-trial") return result;

        if (state.game.correctAnswers != state.game.remainingAnswers) {
            if (state.game.lastAnswerType === "Correct") {
                store.dispatch({ type: ACTIONS.RESET_TIMER, payload: Date.now() });
                store.dispatch({ type: ACTIONS.NEXT_COUNTRY, payload: Date.now() });
            }
        }
    }
    return result;
};

export const checkNextCountryTT = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    if (action.type === ACTIONS.SEND_ANSWER) {
        if (state.game.lastAnswerType !== "Correct" || state.game.skip) {
            store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
            store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
        }
    }

    if (action.type === ACTIONS.SKIP_COUNTRY) {
        store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
        store.dispatch({ type: ACTIONS.DISCOUNT_TIMER });
    }

    return result;
};

export const timeTrialMiddlewares = [checkSendAnswerTT, checkNextCountryTT];

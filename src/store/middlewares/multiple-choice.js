import { ACTIONS } from "@constants/action-types.js";


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
        store.dispatch({ type: ACTIONS.NEXT_COUNTRY });
    }
    return result;
};

export const checkNextCountryMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.NEXT_COUNTRY) {
        store.dispatch({ type: ACTIONS.SHOW_OPTIONS_CLASSIC });
    }
    return result;
};

export const checkNewGameMC = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === ACTIONS.NEW_GAME_CLASSIC || action.type === ACTIONS.NEW_GAME_RECORD) {
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

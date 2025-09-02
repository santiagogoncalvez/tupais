import { ACTIONS } from "@constants/action-types.js";

let initState = JSON.parse(localStorage.getItem("stats")) || {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  currentStreak: 0,
  bestStreak: 0,
};

export const initialState = initState;

const reducerMap = {
  //* GAME
  [ACTIONS.STATS.GAME_WON]: (stats) => {
    let currStreak = stats.currentStreak + 1;
    return {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      gamesWon: stats.gamesWon + 1,
      currentStreak: currStreak,
      bestStreak: currStreak > stats.bestStreak ? currStreak : stats.bestStreak,
    };
  },
  [ACTIONS.STATS.GAME_LOST]: (stats) => {
    return {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      gamesLost: stats.gamesLost + 1,
      currentStreak: 0,
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function statsReducer(stats = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(stats, action) : stats;
}

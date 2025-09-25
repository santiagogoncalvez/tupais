/*
Mayúsculas separadas por guiones bajos (UPPER_SNAKE_CASE)  en el nombre de la constante, y una cadena con minúsculas separadas por barra (lowercase/with-slash) como valor.
Example: const ACTIONS = {
  ADD_TODO: "todo/add",
  REMOVE_TODO: "todo/remove",
  SET_VISIBILITY_FILTER: "visibility/set-filter",
};
*/

export const ACTIONS = {
  //* Ui
  // Ui/Modals
  // Core genérico
  OPEN_MODAL: "ui/modal/open",
  CLOSE_MODAL: "ui/modal/close",
  CLOSE_ALL_MODALS: "ui/modals/all/close",

  // Alias semánticos
  OPEN_PRESENTATION: "ui/modal/presentation/open",
  CLOSE_PRESENTATION: "ui/modal/presentation/close",
  OPEN_SETTINGS: "ui/modal/settings/open",
  CLOSE_SETTINGS: "ui/modal/settings/close",
  OPEN_GAME_OVER: "ui/modal/game-over/open",
  CLOSE_GAME_OVER: "ui/modal/game-over/close",

  TOGGLE_NAVBAR: "ui/navbar/toggle",
  OPEN_NAVBAR: "ui/navbar/open",
  CLOSE_NAVBAR: "ui/navbar/close",
  TOGGLE_DARK_MODE: "ui/dark-mode/toggle",

  // Ui/ContinentSelector
  OPEN_CONTINENT_SELECTOR: "ui/continent-selector/open",
  CLOSE_CONTINENT_SELECTOR: "ui/continent-selector/close",
  SELECT_CONTINENT: "ui/continent-selector/select",
  SHOW_CONTINENT_SELECTOR_OPTIONS: "ui/continent-selector/options/show",
  HIDE_CONTINENT_SELECTOR_OPTIONS: "ui/continent-selector/options/hide",
  SET_CONTINENT_SELECTOR_OPTION: "ui/continent-selector/options/set",
  START_BUTTON_CLICKED: "ui/continent-selector/start/clicked",

  SET_CONTINENT: "game/continent/set",
  SHOW_BACKDROP: "ui/backdrop/show",
  HIDE_BACKDROP: "ui/backdrop/hide",
  START_COUNTRY_ANIMATION: "ui/country/animation/start",
  STOP_COUNTRY_ANIMATION: "ui/country/animation/stop",
  SHOW_NOTIFICATION: "ui/notification/show",
  HIDE_NOTIFICATION: "ui/notification/hide",
  RESET_NOTIFICATION: "ui/notification/reset",

  // Mode classic
  START_ANIMATE_CORRECT_OPTION: "ui/gameOptions/animate-correct/start",
  STOP_ANIMATE_CORRECT_OPTION: "ui/gameOptions/animate-correct/stop",

  SET_FIRST_LAUNCH: "ui/first-launch/set",

  //* Game
  // Game/Answer
  SEND_ANSWER: "game/answer/send",
  SET_ANSWER: "game/answer/set",
  RESET_ANSWER: "game/answer/reset",
  SET_GAME_MODE: "game/mode/set",

  // Mode multiple choice
  NEW_GAME_CLASSIC: "game/new/classic",
  SEND_ANSWER_CLASSIC: "game/answer/classic/send",
  SHOW_OPTIONS_CLASSIC: "game/answer/classic/options/show",
  HIDE_OPTIONS_CLASSIC: "game/answer/classic/options/hide",
  SEND_NOT_ANSWER: "game/answer/not-send",
  SEND_NOT_ANSWER_CLASSIC: "game/answer/not-send/classic",

  // Mode record
  NEW_GAME_RECORD: "game/new/record",

  // Mode time-trial
  NEW_GAME_TIME_TRIAL: "game/new/time-trial",

  // Game/Country
  SET_COUNTRY_INDEX: "game/country/index/set",
  NEXT_COUNTRY: "game/country/index/next",
  NEXT_COUNTRY_CLASSIC: "game/classic/country/index/next",
  SKIP_COUNTRY: "game/country/index/skip",
  PREVIOUS_COUNTRY: "game/country/index/previous",
  RESET_FLAGS: "game/country/flags/reset",

  NEW_GAME: "game/new",
  GAME_COMPLETED: "game/completed",
  GAME_WON: "game/won",
  NEW_CONTINENT: "game/continent/new",

  SET_TOTAL_ANSWERS: "game/total-answers/set",
  ADD_CORRECT_FLAG: "game/flags/add-correct",
  COMPLETE_GAME: "game/complete",
  WIN_GAME: "game/win",
  RESET_GAME: "game/reset",
  SET_COUNTRIES: "game/countries/set",
  SET_COUNTRY_INDEX: "game/country-index/set",

  // Timer
  RESET_TIMER: "game/timer/reset",
  DISCOUNT_TIMER: "game/timer/dicount",
  SET_TIMER: "game/timer/set",
  PAUSE_TIMER: "game/timer/pause",
  CLEAR_PAUSE_TIMER: "game/timer/pause/clear",

  SET_ANSWER_TYPE: "game/last-answer-type/set",


  //* STATS
  // --- acciones de estadísticas ---
  STATS: {
    GAME_WON: "stats/game-won",
    GAME_LOST: "stats/game-lost",
  },


  //* ROUTER
  NAVIGATE_TO: "router/navigate-to",

  //* SEARCH
  GALLERY_SEARCH_HISTORY_SET: "search/flagGalleryHistory/set"
};

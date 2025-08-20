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
  OPEN_PRESENTATION: "ui/modal/presentation/open",
  CLOSE_PRESENTATION: "ui/modal/presentation/close",
  OPEN_SETTINGS: "ui/modal/settings/open",
  CLOSE_SETTINGS: "ui/modal/settings/close",
  OPEN_GAME_OVER: "ui/modal/game-over/open",
  CLOSE_GAME_OVER: "ui/modal/game-over/close",

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

  SET_CONTINENT: "game/continent/set",
  SHOW_BACKDROP: "ui/backdrop/show",
  HIDE_BACKDROP: "ui/backdrop/hide",
  START_COUNTRY_ANIMATION: "ui/country/animation/start",
  STOP_COUNTRY_ANIMATION: "ui/country/animation/stop",
  SHOW_NOTIFICATION: "ui/notification/show",
  HIDE_NOTIFICATION: "ui/notification/hide",
  RESET_NOTIFICATION: "ui/notification/reset",

  //* Game
  // Game/Answer
  SEND_ANSWER: "game/answer/send",
  SET_ANSWER: "game/answer/set",
  RESET_ANSWER: "game/answer/reset",

  // Multiple choice
  SEND_ANSWER_MULTIPLE_CHOICE: "game/answer/multiple-choice/send",
  SHOW_OPTIONS_MULTIPLE_CHOICE: "game/answer/multiple-choice/options/show",
  HIDE_OPTIONS_MULTIPLE_CHOICE: "game/answer/multiple-choice/options/hide",

  // Game/Country
  SET_COUNTRY_INDEX: "game/country/index/set",
  NEXT_COUNTRY: "game/country/index/next",
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
};

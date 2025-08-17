import { ACTIONS } from "@constants/action-types.js";

export const initialState = {
  darkMode: false,
  modals: {
    presentation: {
      show: false,
    },
    settings: {
      show: false,
    },
    gameOver: { show: false },
  },
  navbar: {
    show: false,
  },
  continentSelector: {
    options: { show: false },
    selectedOption: "all",
    showState: "hiding",
  },
  backdrop: { show: false },
  country: {
    animation: false,
  },
  // Notificaciones
  notifications: {
    show: false,
    id: null,
    message: "",
  },
};

// Ahora el objeto state que se pasa es solamente la parte de UI osea lo que antes era state es el objeto que directamente se pasa. Y también hay que sacar el objeto que devuelve una propiedad "ui" ya que el state en sí ya es esa propiedad
const reducerMap = {
  //* UI
  [ACTIONS.OPEN_PRESENTATION]: (ui) => {
    return {
      ...ui,
      modals: {
        ...ui.modals,
        presentation: {
          ...ui.modals.presentation,
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_PRESENTATION]: (ui) => {
    return {
      ...ui,
      modals: {
        ...ui.modals,
        presentation: {
          ...ui.modals.presentation,
          show: false,
        },
      },
    };
  },
  [ACTIONS.OPEN_SETTINGS]: (ui) => {
    return {
      ...ui,
      modals: {
        ...ui.modals,
        settings: {
          ...ui.modals.settings,
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_SETTINGS]: (ui) => {
    return {
      ...ui,
      modals: {
        ...ui.modals,
        settings: {
          ...ui.modals.settings,
          show: false,
        },
      },
    };
  },
  [ACTIONS.TOGGLE_DARK_MODE]: (ui) => {
    return {
      ...ui,
      darkMode: !ui.darkMode,
    };
  },
  [ACTIONS.OPEN_GAME_OVER]: (ui) => {
    return {
      ...ui,
      modals: {
        ...ui.modals,
        gameOver: {
          ...ui.modals.gameOver,
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_GAME_OVER]: (ui) => {
    return {
      ...ui,
      modals: {
        ...ui.modals,
        gameOver: {
          ...ui.modals.gameOver,
          show: false,
        },
      },
    };
  },
  [ACTIONS.OPEN_NAVBAR]: (ui) => {
    return {
      ...ui,
      navbar: {
        show: true,
      },
    };
  },
  [ACTIONS.CLOSE_NAVBAR]: (ui) => {
    return {
      ...ui,
      navbar: {
        show: false,
      },
    };
  },
  [ACTIONS.SHOW_NOTIFICATION]: (ui, action) => {
    // Esta parte del código debe encargarse solo de mostrar
    return {
      ...ui,
      notifications: {
        ...ui.notifications,
        show: true,
        id: Date.now(),
        message: action.payload,
      },
    };
  },
  [ACTIONS.HIDE_NOTIFICATION]: (ui) => {
    return {
      ...ui,
      notifications: {
        ...ui.notifications,
        show: false,
      },
    };
  },

  // Continent-selector
  [ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS]: (ui) => {
    return {
      ...ui,
      continentSelector: {
        ...ui.continentSelector,
        options: {
          show: true,
        },
      },
    };
  },
  [ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS]: (ui) => {
    return {
      ...ui,
      continentSelector: {
        ...ui.continentSelector,
        options: {
          show: false,
        },
      },
    };
  },
  [ACTIONS.SHOW_BACKDROP]: (ui) => {
    return {
      ...ui,
      backdrop: { show: true },
    };
  },
  [ACTIONS.HIDE_BACKDROP]: (ui) => {
    return {
      ...ui,
      backdrop: { show: false },
    };
  },
  [ACTIONS.SET_CONTINENT_SELECTOR_OPTION]: (ui, action) => {
    return {
      ...ui,
      continentSelector: {
        ...ui.continentSelector,
        selectedOption: action.payload,
      },
    };
  },

  // Country
  [ACTIONS.START_COUNTRY_ANIMATION]: (ui) => {
    return {
      ...ui,
      country: {
        ...ui.country,
        animation: true,
      },
    };
  },
  [ACTIONS.STOP_COUNTRY_ANIMATION]: (ui) => {
    return {
      ...ui,
      country: {
        ...ui.country,
        animation: false,
      },
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function uiReducer(ui = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(ui, action) : ui;
}

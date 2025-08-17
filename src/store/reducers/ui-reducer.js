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
  [ACTIONS.OPEN_PRESENTATION]: (state) => {
    return {
      ...state,
      modals: {
        ...state.modals,
        presentation: {
          ...state.modals.presentation,
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_PRESENTATION]: (state) => {
    return {
      ...state,
      modals: {
        ...state.modals,
        presentation: {
          ...state.modals.presentation,
          show: false,
        },
      },
    };
  },
  [ACTIONS.OPEN_SETTINGS]: (state) => {
    return {
      ...state,
      modals: {
        ...state.modals,
        settings: {
          ...state.modals.settings,
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_SETTINGS]: (state) => {
    return {
      ...state,
      modals: {
        ...state.modals,
        settings: {
          ...state.modals.settings,
          show: false,
        },
      },
    };
  },
  [ACTIONS.TOGGLE_DARK_MODE]: (state) => {
    return {
      ...state,
      darkMode: !state.darkMode,
    };
  },
  [ACTIONS.OPEN_GAME_OVER]: (state) => {
    return {
      ...state,
      modals: {
        ...state.modals,
        gameOver: {
          ...state.modals.gameOver,
          show: true,
        },
      },
    };
  },
  [ACTIONS.CLOSE_GAME_OVER]: (state) => {
    return {
      ...state,
      modals: {
        ...state.modals,
        gameOver: {
          ...state.modals.gameOver,
          show: false,
        },
      },
    };
  },
  [ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS]: (state) => {
    return {
      ...state,
      continentSelector: {
        ...state.continentSelector,
        options: {
          show: true,
        },
      },
    };
  },
  [ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS]: (state) => {
    return {
      ...state,
      continentSelector: {
        ...state.continentSelector,
        options: {
          show: false,
        },
      },
    };
  },
  [ACTIONS.SHOW_BACKDROP]: (state) => {
    return {
      ...state,
      backdrop: { show: true },
    };
  },
  [ACTIONS.HIDE_BACKDROP]: (state) => {
    return {
      ...state,
      backdrop: { show: false },
    };
  },
  [ACTIONS.OPEN_NAVBAR]: (state) => {
    return {
      ...state,
      navbar: {
        show: true,
      },
    };
  },
  [ACTIONS.CLOSE_NAVBAR]: (state) => {
    return {
      ...state,
      navbar: {
        show: false,
      },
    };
  },
  [ACTIONS.SHOW_NOTIFICATION]: (state, action) => {
    // Esta parte del código debe encargarse solo de mostrar
    return {
      ...state,
      notifications: {
        ...state.notifications,
        show: true,
        id: Date.now(),
        message: action.payload,
      },
    };
  },
  [ACTIONS.HIDE_NOTIFICATION]: (state) => {
    return {
      ...state,
      notifications: {
        ...state.notifications,
        show: false,
      },
    };
  },
  [ACTIONS.SET_CONTINENT_SELECTOR_OPTION]: (state, action) => {
    return {
      ...state,
      continentSelector: {
        ...state.continentSelector,
        selectedOption: action.payload,
      },
    };
  },
  [ACTIONS.START_COUNTRY_ANIMATION]: (state) => {
    return {
      ...state,
      country: {
        ...state.country,
        animation: true,
      },
    };
  },
  [ACTIONS.STOP_COUNTRY_ANIMATION]: (state) => {
    return {
      ...state,
      country: {
        ...state.country,
        animation: false,
      },
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function uiReducer(state = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(state, action) : state;
}

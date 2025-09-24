import { ACTIONS } from "@constants/action-types.js";

let continentStorage = JSON.parse(localStorage.getItem("game.continent")) ?? "all";
export const initialState = {
  darkMode: false,
  modals: {
    presentation: {
      show: false,
    },
    settings: {
      show: false,
    },
    gameOver: {
      show: false
    },
  },
  navbar: {
    show: false,
  },
  // continentSelector: {
  //   options: { show: false },
  //   selectedOption: "all",
  //   showState: "hiding",
  // },


  continentSelector: {
    game: {
      options: { show: false },
      selectedOption: continentStorage,
      showState: "hiding",
    },
    modal: {
      options: { show: false },
      selectedOption: continentStorage,
      showState: "hiding",
    },
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
  gameOptions: {
    animateCorrect: false,
  },
  firstLaunch: JSON.parse(localStorage.getItem("ui.firstLaunch")) ?? true,
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
        //* Cuando se abre game-over se cierra settings en el caso de que este abierto, para tener un único modal activo.
        settings: {
          ...ui.modals.settings,
          show: false,
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
  [ACTIONS.TOGGLE_NAVBAR]: (ui) => {
    return {
      ...ui,
      navbar: {
        show: !ui.navbar.show,
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
  [ACTIONS.SHOW_CONTINENT_SELECTOR_OPTIONS]: (ui, action) => {
    const scope = action.payload.target;
    return {
      ...ui,
      continentSelector: {
        ...ui.continentSelector,
        [scope]: {
          ...ui.continentSelector[scope],
          options: { show: true },
        },
      },
    };
  },
  [ACTIONS.HIDE_CONTINENT_SELECTOR_OPTIONS]: (ui, action) => {
    const scope = action.payload.target;
    return {
      ...ui,
      continentSelector: {
        ...ui.continentSelector,
        [scope]: {
          ...ui.continentSelector[scope],
          options: { show: false },
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
    const { continent, target } = action.payload;
    return {
      ...ui,
      continentSelector: {
        ...ui.continentSelector,
        [target]: { // 👈 cada scope maneja su propio state
          ...ui.continentSelector[target],
          selectedOption: continent,
        },
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

  [ACTIONS.START_ANIMATE_CORRECT_OPTION]: (ui) => {
    return {
      ...ui,
      gameOptions: {
        ...ui.gameOptions,
        animateCorrect: true,
      },
    };
  },
  [ACTIONS.STOP_ANIMATE_CORRECT_OPTION]: (ui) => {
    return {
      ...ui,
      gameOptions: {
        ...ui.gameOptions,
        animateCorrect: false,
      },
    };
  },

  [ACTIONS.SET_FIRST_LAUNCH]: (ui, action) => {
    return {
      ...ui,
      firstLaunch: action.payload,
    };
  },

  // Modals
  [ACTIONS.OPEN_MODAL]: (ui, action) => ({
    ...ui,
    modals: {
      ...ui.modals,
      [action.payload]: { show: true },
    },
  }),

  [ACTIONS.CLOSE_MODAL]: (ui, action) => ({
    ...ui,
    modals: {
      ...ui.modals,
      [action.payload]: { show: false },
    },
  }),

  [ACTIONS.CLOSE_ALL_MODALS]: (ui) => {
    const closedModals = Object.keys(ui.modals).reduce((acc, key) => {
      acc[key] = { ...ui.modals[key], show: false };
      return acc;
    }, {});

    return {
      ...ui,
      modals: closedModals,
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function uiReducer(ui = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(ui, action) : ui;
}

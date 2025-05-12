export const continentSelectorBase = {
   block: "continent-selector",
   button: {
      block: "continent-selector__button",
      text: "continent-selector__button-text",
   },
   container: {
      block: "continent-selector__options",
      option: "continent-selector__option",
   },
   modalBackdrop: "modal-backdrop",
};

export const continentSelectorModifiers = {
   show: {
      container: {
         block: "continent-selector__options--show",
      },
      modalBackdrop: "modal-backdrop--show",
   },
   display: {
      container: {
         block: "continent-selector__options--display",
      },
   },
   darkMode: {
      block: "continent-selector--dark-mode",
      button: {
         block: "continent-selector__button--dark-mode",
      },
      container: {
         block: "continent-selector__options--dark-mode",
      },
   },
};

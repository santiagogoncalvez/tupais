export const base = {
   block: "sort-dropdown",
   select: "sort-dropdown__select",
   button: {
      block: "sort-dropdown__button",
      text: "sort-dropdown__button-text",
   },
   container: {
      block: "sort-dropdown__options",
      option: "sort-dropdown__option",
   },
   modalBackdrop: "modal-backdrop",
};

export const modifiers = {
   show: {
      container: {
         block: "sort-dropdown__options--show",
      },
      modalBackdrop: "modal-backdrop--show",
   },
   display: {
      container: {
         block: "sort-dropdown__options--display",
      },
   },
   focus: {
      button: {
         block: "sort-dropdown__button--focus",
      },
   },
   darkMode: {
      block: "sort-dropdown--dark-mode",
      button: {
         block: "sort-dropdown__button--dark-mode",
      },
      container: {
         block: "sort-dropdown__options--dark-mode",
      },
   },
   selectedOption: {
      container: {
         option: "sort-dropdown__option--selected",
      },
   },
};

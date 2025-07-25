export const base = {
   block: "navbar",
   list: {
      block: "navbar__list",
      paragraph: "navbar__paragraph",
      item: {
         block: "navbar__item",
         link: "navbar__link",
      },
      icons: "navbar__icon",
   },
   button: {
      block: "navbar__button",
      span: "navbar__icon",
   },
};

export const modifiers = {
   darkMode: {
      block: "navbar--dark-mode",
      list: {
         block: "navbar__list--dark-mode",
         paragraph: "navbar__paragraph--dark-mode",
         item: {
            block: "navbar__item--dark-mode",
            link: "navbar__link--dark-mode",
         },
         icons: "navbar__icon--dark-mode",
      },
      button: {
         block: "navbar__button--dark-mode",
         span: "navbar__icon--dark-mode",
      },
   },
   show: "navbar--show",
};

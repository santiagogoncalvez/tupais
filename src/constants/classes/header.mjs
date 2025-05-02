//TODO: cambiar la propiedad "container" que representa la clase del componente principal a "block",  para que en el caso de que tenga contenedores como elementos les pueda poner "container".
export const headerBase = {
   container: "header",
   div: "header__container",
   openNavbarButton: "header__open-navbar-button",
   title: "header__title",
   openSettingsButton: "header__open-setting-button",
};

export const headerModifiers = {
   darkMode: {
      container: "header--dark-mode",
      div: "header__container--dark-mode",
      openNavbarButton: "header__open-navbar-button--dark-mode",
      title: "header__title--dark-mode",
      openSettingsButton: "header__open-setting-button--dark-mode",
   },
};

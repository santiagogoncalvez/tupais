//TODO: cambiar la propiedad "container" que representa la clase del componente principal a "block",  para que en el caso de que tenga contenedores como elementos les pueda poner "container".
export const headerBase = {
   block: "header",
   container: "header__container",
   title: "header__title",
};

export const headerModifiers = {
   darkMode: {
      block: "header--dark-mode",
      container: "header__container--dark-mode",
      title: "header__title--dark-mode",
   },
};

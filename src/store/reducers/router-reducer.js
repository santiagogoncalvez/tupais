import { ACTIONS } from "@constants/action-types.js";

export const initialState = {
  currentRoute: "/",
};

const reducerMap = {
  //* ROUTER
  [ACTIONS.NAVIGATE_TO]: (router, action) => {
    return {
      ...router,
      currentRoute: action.payload
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function routerReducer(router = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(router, action) : router;
}

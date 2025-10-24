import { ACTIONS } from "@constants/action-types.js";
import { formatCountryForUrl } from "@utils/normalize-route.js";

export const initialState = {
  currentRoute: "/",
  id: Date.now()
};

const reducerMap = {
  //* ROUTER
  [ACTIONS.NAVIGATE_TO]: (router, action) => {
    return {
      ...router,
      currentRoute:
        formatCountryForUrl(action.payload),
      // action.payload,
      id: Date.now(),
    };
  },
};

//* Siempre se tienen que crear nuevo objetos, si se modifican las propiedades internas que hacen referencia a los objetos guardados en cada componente en el proceso de creación del nuevo estado no se van a poder actuzalizar de manera correcta
export function routerReducer(router = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(router, action) : router;
}

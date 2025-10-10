import { ACTIONS } from "@constants/action-types.js";

let initState = {};

export const initialState = initState;

const reducerMap = {
  [ACTIONS.SET_FILTERS]: (filters, action) => {
    const newFilters = action.payload;

    // 🧹 Si el payload es vacío o nulo → limpiar filtros
    if (!newFilters || Object.keys(newFilters).length === 0) {
      return {};
    }

    // 🔹 Reemplazar completamente el objeto de filtros
    return { ...newFilters };
  },
};


export function filtersReducer(filters = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(filters, action) : filters;
}

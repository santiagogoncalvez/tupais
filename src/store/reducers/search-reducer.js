import { ACTIONS } from "@constants/action-types.js";

let history = JSON.parse(localStorage.getItem("search.flagGalleryHistory"));
let initState =
{
  flagGalleryHistory: history ? [...history] : [],
};

export const initialState = initState;

const reducerMap = {
  //* SEARCH
  [ACTIONS.GALLERY_SEARCH_HISTORY_SET]: (search, action) => {
    return {
      ...search,
      flagGalleryHistory: [...action.payload]
    };
  },
};

export function searchReducer(search = initialState, action) {
  const handler = reducerMap[action.type];
  return handler ? handler(search, action) : search;
}

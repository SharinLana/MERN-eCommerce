import * as actionTypes from "../actionTypes/category";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.SAVE_ATTR:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.INSERT_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state, // old state...
        categories: action.payload, // ...and overwritten categories property
      };
    default:
      return state;
  }
};

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
    default:
      return state;
  }
};
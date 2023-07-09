import * as actionTypes from "../actionTypes/cart";

export const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return { value: state.value + 1 + action.someValue };
    default:
      return state;
  }
};

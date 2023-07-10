import * as actionTypes from "../actionTypes/cart";

export const addToCart = () => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_TO_CART,
    someValue: 0,
  });
};

import * as actionTypes from "../actionTypes/cart";
import axios from "axios";

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  console.log(data.product)

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      productId: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0] ?? null,
      count: data.product.count,
      quantity,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

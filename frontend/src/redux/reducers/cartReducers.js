/* eslint-disable no-case-declarations */
import * as actionTypes from "../actionTypes/cart";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;

      const productAlreadyExistsInState = state.cartItems.find(
        (x) => x.productId === productBeingAddedToCart.productId
      );

      // We cannot change the state directly in Classic Redux
      // we can only do that through a separate variable (currentState, in this case)
      const currentState = { ...state };

      if (productAlreadyExistsInState) {
        // To avoid product duplicates in the cart:
        // Find this product in the cartItems array and change the total quantity and
        // total amount accordingly
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItems = state.cartItems.map((item) => {
          if (item.productId === productAlreadyExistsInState.productId) {
            currentState.itemsCount += Number(productBeingAddedToCart.quantity);

            const sum =
              Number(productBeingAddedToCart.quantity) *
              Number(productBeingAddedToCart.price);
            currentState.cartSubtotal += sum;
          } else {
            currentState.itemsCount += Number(item.quantity);
            const sum = Number(item.quantity) * Number(item.price);
            currentState.cartSubtotal += sum;
          }
          return item.productId === productAlreadyExistsInState.productId
            ? productBeingAddedToCart
            : item;
        });
      } else {
        // Re-calculate the total quantity and cart subtotal and add
        // the new product to the array of products
        currentState.itemsCount += Number(productBeingAddedToCart.quantity);
        const sum =
          Number(productBeingAddedToCart.quantity) *
          Number(productBeingAddedToCart.price);
        currentState.cartSubtotal += sum;
        currentState.cartItems = [...state.cartItems, productBeingAddedToCart];
      }
      // return modified state
      return currentState;

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload.productId
        ),
        itemsCount: state.itemsCount - action.payload.quantity,
        cartSubtotal:
          state.cartSubtotal - action.payload.price * action.payload.quantity,
      };
    default:
      return state;
  }
};

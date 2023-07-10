import { LOGIN_USER } from "../actionTypes/user";

export const userRegisterLoginReducer = (state = {}, action) => {
  // "action" comes from the userDispatchers.js, setReduxUserState => payload
  switch (action.type) {
    case LOGIN_USER:
      // if the LOGIN_USER action occurs, change the user state below and return the result
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
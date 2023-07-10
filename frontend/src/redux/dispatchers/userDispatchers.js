import { LOGIN_USER } from "../actionTypes/user";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated
  })
}
import axios from "axios";
import * as actionTypes from "../actionTypes/category";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
    payload: data,
  });
};

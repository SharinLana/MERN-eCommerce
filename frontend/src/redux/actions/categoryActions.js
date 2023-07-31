import axios from "axios";
import * as actionTypes from "../actionTypes/category";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
    payload: data,
  });
};

export const saveAttributeToCatDoc =
  (key, val, categoryChosen) => async (dispatch) => {
    const { data } = await axios.post("/api/categories/attr", {
      key,
      val,
      categoryChosen,
    });
    if (data.categoryUpdated) {
      dispatch({
        type: actionTypes.SAVE_ATTR,
        payload: [...data.categoryUpdated],
      });
    }
  };
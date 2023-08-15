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
    const { data } = await axios.post("/api/categories/attrs", {
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

export const newCategory = (category) => async (dispatch, getState) => {
  const cat = getState().getCategories.categories;
  const { data } = await axios.post("/api/categories", { category });
  if (data.newCategory) {
    // newCategory came from the categoryControllers (it just has the same name as the function itself)
    dispatch({
      type: actionTypes.INSERT_CATEGORY,
      payload: [...cat, data.newCategory],
    });
  }
};

export const deleteCategory = (category) => async (dispatch, getState) => {
  const cat = getState().getCategories.categories;
  const categories = cat.filter((item) => item.name !== category);
  const { data } = await axios.delete(
    "/api/categories/" + encodeURIComponent(category) // use encodeURIComponent(category) in case of slashes in the category name
  );

  if (data.message === "Category has been deleted") {
    dispatch({
      type: actionTypes.DELETE_CATEGORY,
      payload: [...categories]
    });
  }
};

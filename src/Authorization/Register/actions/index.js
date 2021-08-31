import API from "../../../api/index";
import {
  USER_REGISTER,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS
} from "../constants";

export const userRegister = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER });
  try {
    const { data } = await API.post("/users", user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userItem", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data && error.response.data.message,
    });
  }
};

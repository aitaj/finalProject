import API from "../../../api";
import {
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from "../constants";

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });

  try {
    const { data } = await API.post("/users", user);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data, "error");
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data,
    });
  }
};
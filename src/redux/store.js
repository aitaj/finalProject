import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { signinReducer } from "../Authorization/Signin/reducers/index";



// const userInfoFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : {};

// const initialState = {
//   userInfo: userInfoFromLocalStorage,
// };

const reducers = combineReducers({
  userInfo: signinReducer,
});

const store = createStore(
  reducers,
  // initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
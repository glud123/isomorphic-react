import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "@redux/index.js";

export default (defaultState = {}) => {
  return createStore(
    reducer,
    defaultState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

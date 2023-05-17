import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducerBundle from "./reducerBundle";

const getUserInfoFromLocalStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

// set the initial states
const initialState = {
	userLogin: { userInfo: getUserInfoFromLocalStorage },
};

const middleware = [thunk];

// combine reducers from state
const reducer = combineReducers(reducerBundle);

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

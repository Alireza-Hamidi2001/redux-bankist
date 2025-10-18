// import { combineReducers, createStore } from "redux";
import { customerReducer } from "./features/customer/CustomerSlice";
import accountReducer from "./features/account/AccountSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        customer: customerReducer,
        account: accountReducer,
    },
});

// const rootReducer = combineReducers({
//     customer: customerReducer,
//     account: accountReducer,
// });
// const store = createStore(rootReducer);
export default store;

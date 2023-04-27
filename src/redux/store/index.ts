import createRootReducer from "../reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
    return configureStore({
        // eslint-disable-next-line no-restricted-globals
        reducer: createRootReducer(history),
    });
};
export default store;

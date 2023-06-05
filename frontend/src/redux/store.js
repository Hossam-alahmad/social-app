import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers";

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

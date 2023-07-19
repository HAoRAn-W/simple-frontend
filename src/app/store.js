import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import pageReducer from "./slices/page";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    page: pageReducer,
  },
});

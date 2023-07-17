// message is used to wrap auth api response

import { createSlice } from "@reduxjs/toolkit";
import { INIT_CODE } from "../services/MessageCode";

const initialState = {
  code: INIT_CODE,
  message: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.code = action.payload.code;
      state.message = action.payload.message;
    },
    clearMessage: (state) => {
      state.message = {
        code: INIT_CODE,
        message: "",
      };
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions; // used to be called in app
export default messageSlice.reducer; // used in store

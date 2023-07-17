import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import { setMessage } from "./message";
import { SIGNUP_SUCCESSFUL, UNDEFINED_ERROR } from "../services/MessageCode";

const user = JSON.parse(localStorage.getItem("user"));

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const data = await AuthService.signup(username, email, password);
      thunkAPI.dispatch(setMessage(data));
      if (data.code === SIGNUP_SUCCESSFUL) {
        return data;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      const message = error.message || error.toString();
      thunkAPI.dispatch(
        setMessage({ code: UNDEFINED_ERROR, message: message })
      );
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      if (data.username) {
        return { user: data };
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      const message = error.message || error.toString();
      thunkAPI.dispatch(
        setMessage({ code: UNDEFINED_ERROR, message: message })
      );
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? {
      isLoggedIn: true,
      user,
    }
  : {
      isLoggedIn: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;

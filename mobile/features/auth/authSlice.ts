import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import axios from "axios";

interface AuthState {
  loading: boolean;
  error: any;
  user: any | null;
  token: string | null;
}

type loginCredentials = {
  email: string;
  password: string;
};

type registerCredentials = {
  email: string;
  password: string;
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: loginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/user-login", credentials);
      console.log(response.data.data);
      return response.data.data.loggedInUser;
    } catch (error: any) {
      return rejectWithValue({
        message: error?.response?.data?.message || "Failed to login",
      });
    }
  }
);

// Async thunk for signup
export const register = createAsyncThunk(
  "auth/register",
  async (userData: registerCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/user-register", userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error?.response?.data?.message || "Failed to register",
      });
    }
  }
);

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Login Rejected:", action.payload);
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Register Rejected:", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

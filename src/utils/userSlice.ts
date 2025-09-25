import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInterface from "../interface/UserInterface";

export type UserState = {
  user: UserInterface | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
      if (action.payload !== undefined && action.payload !== null) {
        state.isAuthenticated = true;
      }
    },
    clearUser: (state: UserState) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state: UserState) => {
      state.loading = true;
    },
    clearLoading: (state: UserState) => {
      console.log("clearLoading Redux");

      state.loading = false;
    },
    setError: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state: UserState) => {
      state.error = "";
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  clearUser,
  setLoading,
  clearLoading,
  setError,
  clearError,
} = userSlice.actions;

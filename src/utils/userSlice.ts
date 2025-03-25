import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInterface from "../interface/UserInterface";

type UserState = {
  user: UserInterface | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state: UserState) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state: UserState) => {
      state.loading = true;
    },
    clearLoading: (state: UserState) => {
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser, setLoading, clearLoading } =
  userSlice.actions;

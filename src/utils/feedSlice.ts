import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInterface from "../interface/UserInterface";

type FeedState = UserInterface[];
const initialState: FeedState = [];
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state: FeedState, action: PayloadAction<FeedState>) => {
      // state = Array.from(new Set<UserInterface>([...state, ...action.payload]));
      state = action.payload;
      return state;
    },
    removeUserFromFeed: (state: FeedState, action: PayloadAction<string>) => {
      const newArray = state.filter((user) => user._id !== action.payload);
      state = newArray;
      return state;
    },
    clearFeed: (state: FeedState) => {
      state.length = 0;
    },
  },
});
export const { addFeed, clearFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;

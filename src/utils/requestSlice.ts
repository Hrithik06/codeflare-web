import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RequestInterface from "../interface/RequestInterface";

type RequestState = RequestInterface[];
const initialState: RequestState = [];
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state: RequestState, action: PayloadAction<RequestState>) => {
      state = action.payload;
      return state;
    },
    removeRequest: (state: RequestState, action: PayloadAction<string>) => {
      const newArray = state.filter(
        (connReq) => connReq._id !== action.payload,
      );
      state = newArray;
      return state;
    },
    clearRequests: (state) => {
      state.length = 0;
    },
  },
});
export const { addRequests, clearRequests, removeRequest } =
  requestSlice.actions;
export default requestSlice.reducer;

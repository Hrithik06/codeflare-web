import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInterface from "../interface/UserInterface";
interface RequestInterface {
  fromUserId: UserInterface;
  _id: string;
}
type RequestState = RequestInterface[];
const initialState: RequestState = [];
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state: RequestState, action: PayloadAction<RequestState>) => {
      state = action.payload;
      return state;
      console.log(state);
    },
    clearRequests: (state) => {
      state.length = 0;
    },
  },
});
export const { addRequests, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;

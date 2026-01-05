import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBase } from "../interface/UserInterface";

type ConnectionState = UserBase[];
const initialState: ConnectionState = [];
const connectionSlice = createSlice({
	name: "connections",
	initialState,
	reducers: {
		addConnections: (
			state: ConnectionState,
			action: PayloadAction<ConnectionState>,
		) => {
			state = action.payload;
			return state;
		},
		clearConnections: (state: ConnectionState) => {
			state.length = 0;
			return state;
		},
	},
});

export const { addConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;

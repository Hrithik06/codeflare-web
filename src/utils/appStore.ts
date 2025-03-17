import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer
    }
})

// Get the type of our store variable
export type AppStore = typeof appStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default appStore;
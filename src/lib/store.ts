import { configureStore } from "@reduxjs/toolkit";
import linkReducer, { initializeLinksFromDB } from "./linkSlice";

const store = configureStore({
  reducer: {
    links: linkReducer,
  },
});

// Dispatch the initialization thunk when the app starts
store.dispatch(initializeLinksFromDB());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
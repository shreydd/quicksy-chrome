import { configureStore } from "@reduxjs/toolkit";
import linkReducer, { initializeLinksFromDB } from "./linkSlice";
import { CollectionsReducer, initializeCollectionsFromDB } from "./collectionSlice";

const store = configureStore({
  reducer: {
    links: linkReducer,
    collections: CollectionsReducer
  },
});

// Dispatch the initialization thunk when the app starts
store.dispatch(initializeLinksFromDB());
store.dispatch(initializeCollectionsFromDB());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openDB, type IDBPDatabase } from "idb"; // Import idb library
import { v6 as uuidV6 } from "uuid";

export interface Collection {
    title: string;
    description: string;
    links: string[];
  }

export type CollectionItemType = {
  title: string;
  description: string;
  links: string[];
  id: string;
};

export interface CollectionState {
  items: CollectionItemType[];
  db: IDBPDatabase<CollectionItemType> | null; // Type for the IndexedDB database
}

const initialCollectionState: CollectionState = {
  items: [],
  db: null,
};

const COLLECTIONS_DB_NAME = "collectionDatabase";
const COLLECTIONS_OBJECT_STORE_NAME = "collections";

const initializeCollectionsDB = async (): Promise<IDBPDatabase<CollectionItemType>> => {
  const db = await openDB<CollectionItemType>(COLLECTIONS_DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(COLLECTIONS_OBJECT_STORE_NAME)) {
        db.createObjectStore(COLLECTIONS_OBJECT_STORE_NAME, { keyPath: "id" });
      }
    },
  });
  return db;
};

export const initializeCollectionsFromDB = createAsyncThunk(
  "collections/initializeFromDB",
  async () => {
    const db = await initializeCollectionsDB();
    const tx = db.transaction(COLLECTIONS_OBJECT_STORE_NAME, "readonly");
    const store = tx.objectStore(COLLECTIONS_OBJECT_STORE_NAME);
    const allCollections = await store.getAll();
    return { items: allCollections, db }; // Return both items and the db instance
  }
);

export const addCollectionToDB = createAsyncThunk(
  "collections/addToDB",
  async (newCollection: Omit<CollectionItemType, "id">, { getState }) => {
    const state = getState() as { collections: CollectionState };
    if (state.collections.db) {
      const tx = state.collections.db.transaction(
        COLLECTIONS_OBJECT_STORE_NAME,
        "readwrite"
      );
      const store = tx.objectStore(COLLECTIONS_OBJECT_STORE_NAME);

      // Generate an ID for the new collection
      const id = uuidV6();

      // Add the new collection to IndexedDB
      await store.add({ ...newCollection, id });

      // Wait for the transaction to complete
      await tx.done;

      return { ...newCollection, id };
    }
    //  else {
    //   throw new Error("Database not initialized");
    // }
  }
);

export const deleteCollectionFromDB = createAsyncThunk(
  "collections/deleteFromDB",
  async (item: CollectionItemType, { getState }) => {
    const state = getState() as { collections: CollectionState };
    if (state.collections.db) {
      const tx = state.collections.db.transaction(
        COLLECTIONS_OBJECT_STORE_NAME,
        "readwrite"
      );
      const store = tx.objectStore(COLLECTIONS_OBJECT_STORE_NAME);

      // Attempt to delete the item
      await store.delete(item.id);

      // Wait for the transaction to complete
      await tx.done;
      console.log("🚀 ~ collection deleted:", item);

      return item;
    }
  }
);

const collectionSlice = createSlice({
  name: "collections",
  initialState: initialCollectionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeCollectionsFromDB.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.db = action.payload.db; // Store the database instance in the state
    });
    builder.addCase(initializeCollectionsFromDB.rejected, (state, action) => {
      console.error(
        "Failed to initialize collections from IndexedDB:",
        action.error
      );
      state.db = null; // Ensure db is null on failure
    });

    builder.addCase(addCollectionToDB.fulfilled, (state, action) => {
      if (action.payload) {
        state.items.push(action.payload);
      }
    });
    builder.addCase(addCollectionToDB.rejected, (state, action) => {
      console.log(
        "🚀 ~ builder.addCase addCollectionToDB.rejected ~ state:",
        state
      );
      console.error("Failed to add collection to IndexedDB:", action.error);
    });

    builder.addCase(deleteCollectionFromDB.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== (action.payload?.id ?? "")
      );
    });
    builder.addCase(deleteCollectionFromDB.rejected, (state, action) => {
      console.log(
        "🚀 ~ builder.addCase deleteCollectionFromDB.rejected ~ state:",
        state
      );
      console.error("Failed to delete collection from IndexedDB:", action.error);
    });
  },
});

export const CollectionsReducer = collectionSlice.reducer;
// export const { } = collectionSlice.actions; // If you have any sync actions, export them here

// In your store.ts, ensure you import and dispatch the initialization thunk:
// import { configureStore } from "@reduxjs/toolkit";
// import linkReducer, { initializeLinksFromDB } from "./linkSlice";
// import CollectionsReducer, { initializeCollectionsFromDB } from "./collectionSlice";

// const store = configureStore({
//   reducer: {
//     links: linkReducer,
//     collections: CollectionsReducer
//   },
// });

// // Dispatch the initialization thunks when the app starts
// store.dispatch(initializeLinksFromDB());
// store.dispatch(initializeCollectionsFromDB());

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

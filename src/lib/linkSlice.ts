import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openDB, type IDBPDatabase } from "idb"; // Import idb library
import { v6 as uuidV6 } from "uuid";

export type LinkItemType = {
  tag: string;
  link: string;
  id: string;
};

export interface LinkState {
  items: LinkItemType[];
  db: IDBPDatabase<LinkItemType> | null; // Type for the IndexedDB database
}

const initialState: LinkState = {
  items: [],
  db: null,
};

const DB_NAME = "linkDatabase";
const OBJECT_STORE_NAME = "links";

const initializeDB = async (): Promise<IDBPDatabase<LinkItemType>> => {
  const db = await openDB<LinkItemType>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      }
    },
  });
  return db;
};

export const initializeLinksFromDB = createAsyncThunk(
  "links/initializeFromDB",
  async () => {
    const db = await initializeDB();
    const tx = db.transaction(OBJECT_STORE_NAME, "readonly");
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const allLinks = await store.getAll();
    return { items: allLinks, db }; // Return both items and the db instance
  }
);

export const addLinkToDB = createAsyncThunk(
  "links/addToDB",
  async (newLink: Omit<LinkItemType, "id">, { getState }) => {
    const state = getState() as { links: LinkState };
    if (state.links.db) {
      const tx = state.links.db.transaction(OBJECT_STORE_NAME, "readwrite");
      const store = tx.objectStore(OBJECT_STORE_NAME);

      // Generate an ID for the new link
      const id = uuidV6();

      // Add the new link to IndexedDB
      await store.add({ ...newLink, id });

      // Wait for the transaction to complete
      await tx.done;

      return { ...newLink, id };
    }
    //  else {
    //   throw new Error("Database not initialized");
    // }
  }
);

export const deleteLinkFromDB = createAsyncThunk(
  "links/deleteFromDB",
  async (item: LinkItemType, { getState }) => {
    const state = getState() as { links: LinkState };
    if (state.links.db) {
      const tx = state.links.db.transaction(OBJECT_STORE_NAME, "readwrite");
      const store = tx.objectStore(OBJECT_STORE_NAME);

      // Attempt to delete the item
      await store.delete(item.id);

      // Wait for the transaction to complete
      await tx.done;
      console.log("🚀 ~ item deleted:", item);

      return item;
    }
  }
);

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initializeLinksFromDB.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.db = action.payload.db; // Store the database instance in the state
    });
    builder.addCase(initializeLinksFromDB.rejected, (state, action) => {
      console.error("Failed to initialize links from IndexedDB:", action.error);
      state.db = null; // Ensure db is null on failure
    });

    builder.addCase(addLinkToDB.fulfilled, (state, action) => {
      if (action.payload) {
        state.items.push(action.payload);
      }
    });
    builder.addCase(addLinkToDB.rejected, (state, action) => {
      console.log("🚀 ~ builder.addCase addLinkToDB.rejected ~ state:", state);
      console.error("Failed to add link to IndexedDB:", action.error);
    });

    builder.addCase(deleteLinkFromDB.fulfilled, (state, action) => {
      console.log("here");
      state.items = state.items.filter((item) => item.id !== (action.payload?.id ?? ""));
    });
    builder.addCase(deleteLinkFromDB.rejected, (state, action) => {
      console.log(
        "🚀 ~ builder.addCase deleteLinkFromDB.rejected ~ state:",
        state
      );
      console.error("Failed to delete link from IndexedDB:", action.error);
    });
  },
});

// export const { } = linkSlice.actions;
export default linkSlice.reducer;

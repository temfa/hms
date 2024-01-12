import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { mutationApi } from "../api/mutationApi";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist";
import rolesReducer from "../slice/roles";

import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
const reducers = combineReducers({
  [mutationApi.reducerPath]: mutationApi.reducer,
  roles: rolesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["roles"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mutationApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

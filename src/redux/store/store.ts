import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import { setupListeners } from "@reduxjs/toolkit/query";
import { apiServices } from "../services/api/apiService";
import authSlice from "../slice/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [apiServices.reducerPath]: apiServices.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["cart", "favorite", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (get: any) =>
    get({ serializableCheck: false }).concat(apiServices.middleware),
});

export let persistStor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

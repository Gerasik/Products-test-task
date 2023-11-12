import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productSlice from "./features/product/productSlice"
import { productApi } from "./services/product"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  product: productSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: { persistedReducer, [productApi.reducerPath]: productApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

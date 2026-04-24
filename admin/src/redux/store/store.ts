import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"
import { combinedReducers } from "../root.reducer"
import persistStore from "redux-persist/es/persistStore"

let persistConfig = {
key:"root",
storage
}
let persistedReducer = persistReducer(persistConfig,combinedReducers)

export const store = configureStore({
reducer:persistedReducer
})

export let persistor = persistStore(store)
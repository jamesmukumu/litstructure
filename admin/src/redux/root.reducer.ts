import { combineReducers } from "@reduxjs/toolkit";
import adminReducer  from './admin.reducer'


export const combinedReducers = combineReducers({
admin:adminReducer
})
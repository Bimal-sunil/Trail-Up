"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionareReducer from "../features/questionare/questioinareSlice";

const rootReducer = combineReducers({
  questionare: questionareReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

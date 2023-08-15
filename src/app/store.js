import { configureStore, applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import billReducer from '../features/billSlice';
import { devToolsEnhancer } from "redux-devtools-extension";

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  reducer: {
    bill: billReducer,
  },
  devTools: [devToolsEnhancer({ realtime: true })],
  // enhancers: 
})

